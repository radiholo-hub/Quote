#!/usr/bin/env bash
# 把新產生的音檔開成 PR，等正式的 pull_request 測試通過後才合併（由「Generate audio」的 publish 工作呼叫）。
#   - PR 由 GitHub App 開：App 開的 PR 會直接觸發 pull_request 測試，這個測試才能滿足 Ruleset 的必要檢查
#     （workflow_dispatch 觸發的測試即使通過也不算）。
#   - 只允許新增或修改 audio/ 與 score-rescue/audio/ 底下的 mp3；有刪檔或其他檔案就停止。
#   - 測試與合併鎖定同一筆提交：測試的 head_sha 必須等於音檔提交，合併時加 --match-head-commit。
#   - 同一筆提交上名為 score-rescue-tests 的檢查必須全部完成且成功。
# 需要環境變數：BASE（上線分支）、GITHUB_REPOSITORY、GITHUB_RUN_ID、GITHUB_RUN_ATTEMPT、GITHUB_RUN_NUMBER、
#   GH_TOKEN（GITHUB_TOKEN，只用來讀取測試與 PR）、APP_TOKEN（App 權杖，用來推分支、開 PR、合併、刪分支）。
set -euo pipefail

# 用 ENVIRON 傳給 awk：-v 會把反斜線當跳脫字元，讓 \. 變成任意字元
export ALLOWED='^(audio(/[a-z]+)?(/[a-z]+)?|score-rescue/audio)/[A-Za-z0-9_-]+\.mp3$'
CHECK=score-rescue-tests
TESTS=score-rescue-tests.yml
WAIT_RUN=${WAIT_RUN:-36}          # 找測試執行的次數（每次 5 秒）
WAIT_CHECKS=${WAIT_CHECKS:-40}    # 等同名檢查全部完成的次數（每次 15 秒）
POLL=${POLL:-5}

fail() { echo "::error::$*"; exit 1; }
app() { GH_TOKEN="$APP_TOKEN" "$@"; }
[ -n "${APP_TOKEN:-}" ] || fail "缺少 APP_TOKEN"

git add -A audio score-rescue/audio
if git diff --cached --quiet; then echo "沒有新的音檔"; exit 0; fi

bad=$(git diff --cached --name-status | awk '!(($1=="A"||$1=="M") && $2 ~ ENVIRON["ALLOWED"])')
[ -z "$bad" ] || fail "音檔變更包含不允許的項目（只允許新增或修改 mp3）：$bad"

BR="audio/run-${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}"
git checkout -b "$BR"
git commit -q -m "Generate audio"
SHA=$(git rev-parse HEAD)
AUTH=$(printf 'x-access-token:%s' "$APP_TOKEN" | base64 -w0)
echo "::add-mask::$AUTH"
git -c "http.https://github.com/.extraheader=AUTHORIZATION: basic $AUTH" push origin "$BR"
echo "音檔提交：$SHA"

PR=$(app gh pr create --base "$BASE" --head "$BR" --title "Generate audio" \
  --body "自動產生的音檔（Generate audio 第 ${GITHUB_RUN_NUMBER} 次執行，提交 ${SHA}）。Score Rescue tests 通過後會自動合併。")
NUM=$(gh pr view "$PR" --json number --jq .number)
echo "PR：$PR"

# 等 PR 觸發的 pull_request 測試
RUN=""
for _ in $(seq 1 "$WAIT_RUN"); do
  RUN=$(gh run list --workflow "$TESTS" --branch "$BR" --event pull_request --json databaseId,headSha \
        --jq "[.[] | select(.headSha==\"$SHA\")][0].databaseId // empty" || true)
  [ -n "$RUN" ] && break
  sleep "$POLL"
done
[ -n "$RUN" ] || fail "找不到 PR 在提交 $SHA 上觸發的測試，PR 留著等人處理：$PR"
echo "測試執行：$RUN"
gh run watch "$RUN" --exit-status --interval 15 >/dev/null || fail "測試沒有通過，PR 留著等人處理：$PR"
read -r EVT CONC RSHA < <(gh run view "$RUN" --json event,conclusion,headSha --jq '"\(.event) \(.conclusion) \(.headSha)"')
[ "$EVT" = pull_request ] && [ "$CONC" = success ] && [ "$RSHA" = "$SHA" ] \
  || fail "測試事件 $EVT、結果 $CONC、提交 $RSHA，與音檔提交 $SHA 的 pull_request 測試不符"

# 同一筆提交上的同名檢查要全部完成且成功
for _ in $(seq 1 "$WAIT_CHECKS"); do
  checks=$(gh api "repos/$GITHUB_REPOSITORY/commits/$SHA/check-runs?check_name=$CHECK&per_page=100" \
           --jq '.check_runs[] | "\(.status) \(.conclusion)"')
  echo "$checks" | grep -qv '^completed ' || break
  sleep 15
done
[ -n "$checks" ] || fail "提交 $SHA 上沒有 $CHECK 檢查"
others=$(echo "$checks" | grep -v '^completed success$' || true)
[ -z "$others" ] || fail "提交 $SHA 上有未完成或未成功的 $CHECK 檢查：$others"

# PR 的內容與目前的提交，合併前再確認一次
read -r HEAD BASEREF < <(gh pr view "$PR" --json headRefOid,baseRefName --jq '"\(.headRefOid) \(.baseRefName)"')
[ "$HEAD" = "$SHA" ] || fail "PR 分支已被修改（$HEAD ≠ $SHA）"
[ "$BASEREF" = "$BASE" ] || fail "PR 目標分支不是 $BASE"
files=$(gh api --paginate "repos/$GITHUB_REPOSITORY/pulls/$NUM/files?per_page=100" --jq '.[] | "\(.status) \(.filename)"')
badf=$(echo "$files" | awk '!(($1=="added"||$1=="modified") && $2 ~ ENVIRON["ALLOWED"])')
[ -z "$badf" ] || fail "PR 含有不允許的變更：$badf"

app gh pr merge "$PR" --merge --match-head-commit "$SHA"
echo "已合併：$PR"
# 用 API 刪除分支（不在本機切換分支）；刪除失敗不影響已完成的合併
app gh api -X DELETE "repos/$GITHUB_REPOSITORY/git/refs/heads/$BR" >/dev/null \
  || echo "::warning::已合併，但刪除分支 $BR 失敗，請手動刪除"
