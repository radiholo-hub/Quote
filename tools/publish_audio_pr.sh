#!/usr/bin/env bash
# 把新產生的音檔開成 PR，在 PR 分支上跑 Score Rescue tests，通過後才合併（由「Generate audio」呼叫）。
#   - 只允許新增或修改 audio/ 與 score-rescue/audio/ 底下的 mp3；有刪檔或其他檔案就停止。
#   - 測試與合併鎖定同一筆提交：測試的 head_sha 必須等於音檔提交，合併時加 --match-head-commit。
#   - 同一筆提交上名為 score-rescue-tests 的檢查必須全部完成且成功（例如有等待人工核准的同名檢查就停止）。
# 需要環境變數：BASE（上線分支）、GITHUB_REPOSITORY、GITHUB_RUN_ID、GITHUB_RUN_ATTEMPT、GITHUB_RUN_NUMBER、GH_TOKEN。
set -euo pipefail

ALLOWED='^(audio|score-rescue/audio)/.+\.mp3$'
CHECK=score-rescue-tests
TESTS=score-rescue-tests.yml
WAIT_RUN=${WAIT_RUN:-36}          # 找測試執行的次數（每次 5 秒）
WAIT_CHECKS=${WAIT_CHECKS:-40}    # 等同名檢查全部完成的次數（每次 15 秒）
POLL=${POLL:-5}

fail() { echo "::error::$*"; exit 1; }

git add -A audio score-rescue/audio
if git diff --cached --quiet; then echo "沒有新的音檔"; exit 0; fi

bad=$(git diff --cached --name-status | awk -v re="$ALLOWED" '!(($1=="A"||$1=="M") && $2 ~ re)')
[ -z "$bad" ] || fail "音檔變更包含不允許的項目（只允許新增或修改 mp3）：$bad"

BR="audio/run-${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}"
git checkout -b "$BR"
git commit -q -m "Generate audio"
SHA=$(git rev-parse HEAD)
git push origin "$BR"
echo "音檔提交：$SHA"

PR=$(gh pr create --base "$BASE" --head "$BR" --title "Generate audio" \
  --body "自動產生的音檔（Generate audio 第 ${GITHUB_RUN_NUMBER} 次執行，提交 ${SHA}）。Score Rescue tests 通過後會自動合併。")
NUM=$(gh pr view "$PR" --json number --jq .number)
echo "PR：$PR"

# 機器人（GITHUB_TOKEN）開的 PR 不會自動觸發 pull_request 測試，所以在 PR 分支上手動啟動
gh workflow run "$TESTS" --ref "$BR"
RUN=""
for _ in $(seq 1 "$WAIT_RUN"); do
  RUN=$(gh run list --workflow "$TESTS" --branch "$BR" --event workflow_dispatch --json databaseId,headSha \
        --jq "[.[] | select(.headSha==\"$SHA\")][0].databaseId // empty" || true)
  [ -n "$RUN" ] && break
  sleep "$POLL"
done
[ -n "$RUN" ] || fail "找不到在提交 $SHA 上執行的測試"
echo "測試執行：$RUN"
gh run watch "$RUN" --exit-status --interval 15 >/dev/null || fail "測試沒有通過，PR 留著等人處理：$PR"
read -r CONC RSHA < <(gh run view "$RUN" --json conclusion,headSha --jq '"\(.conclusion) \(.headSha)"')
[ "$CONC" = success ] && [ "$RSHA" = "$SHA" ] || fail "測試結果 $CONC、提交 $RSHA，與音檔提交 $SHA 不符"

# 同一筆提交上的同名檢查要全部完成且成功
for _ in $(seq 1 "$WAIT_CHECKS"); do
  checks=$(gh api "repos/$GITHUB_REPOSITORY/commits/$SHA/check-runs?check_name=$CHECK&per_page=100" \
           --jq '.check_runs[] | "\(.status) \(.conclusion)"')
  echo "$checks" | grep -qv '^completed ' || break
  sleep 15
done
[ -n "$checks" ] || fail "提交 $SHA 上沒有 $CHECK 檢查"
others=$(echo "$checks" | grep -v '^completed success$' || true)
[ -z "$others" ] || fail "提交 $SHA 上有未完成或未成功的 $CHECK 檢查（可能在等待人工核准）：$others"

# PR 的內容與目前的提交，合併前再確認一次
read -r HEAD BASEREF < <(gh pr view "$PR" --json headRefOid,baseRefName --jq '"\(.headRefOid) \(.baseRefName)"')
[ "$HEAD" = "$SHA" ] || fail "PR 分支已被修改（$HEAD ≠ $SHA）"
[ "$BASEREF" = "$BASE" ] || fail "PR 目標分支不是 $BASE"
files=$(gh api --paginate "repos/$GITHUB_REPOSITORY/pulls/$NUM/files?per_page=100" --jq '.[] | "\(.status) \(.filename)"')
badf=$(echo "$files" | awk -v re="$ALLOWED" '!(($1=="added"||$1=="modified") && $2 ~ re)')
[ -z "$badf" ] || fail "PR 含有不允許的變更：$badf"

gh pr merge "$PR" --merge --delete-branch --match-head-commit "$SHA"
echo "已合併：$PR"
