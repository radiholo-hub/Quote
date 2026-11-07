# 公開 Git 分支與歷史紀錄清理方案(僅提案,尚未執行)

> 本文件**不含任何試題內容**,只有檔名、提交編號與操作步驟。
> **我不會自行 force push、刪除分支、關閉 PR 或更改 repo 可見性。** 以下任何一步都要你明確同意才會做。

## 1. 現況(皆可用指令重現)

| 項目 | 狀況 | 重現方式 |
|---|---|---|
| repo 可見性 | **公開**;forks 0、stars 0;已啟用 GitHub Pages | `curl -s https://api.github.com/repos/radiholo-hub/Quote` |
| 上線分支 `claude/daily-quotes-website-lbh2wi`(`07c0e17`) | **沒有**任何 `gsat/exam` 內容 | `git log origin/claude/daily-quotes-website-lbh2wi -- gsat/exam gsat/img` 應為空 |
| PR 分支 `claude/stoic-wright-fpdcyc` | **含**未確認授權的內容(57 個檔案、約 5.6 MB,清單見 [CONTENT_INVENTORY.md](CONTENT_INVENTORY.md)) | `git ls-tree -r origin/claude/stoic-wright-fpdcyc --name-only \| grep gsat/exam` |
| 含該內容的提交 | 11 個(下表) | `git log --oneline origin/claude/daily-quotes-website-lbh2wi..origin/claude/stoic-wright-fpdcyc -- gsat/exam gsat/img gsat/exams.js gsat/answers.js gsat/nonmc.js` |
| PR #61 | 開啟中、未合併;GitHub 另外保留 `refs/pull/61/head` | |
| 網站部署 | 沒有部署過這些內容(PR 未合併;合併後 `tools/stage_site.sh` 預設也不發布) | |

受影響的提交(撰寫時):

```
  c284f25 GSAT site: add past exam questions (106-109, 111) parsed from CEEC PDFs; answers pending
  09f6a8b GSAT site: add 112-115 past exams; picture-grid questions as one figure
  affa643 GSAT site: add 110 past exam
  d751bec GSAT site: official answers for 114 and 115; allow 5-option structure questions
  6191b03 GSAT site: official answers for 111-113
  06d9216 GSAT site: non-multiple-choice pages (mixed, translation, essay) with official scoring guides for 111-114
  53aa37c GSAT site: official answers for 106-109; 115 non-multiple-choice scoring guide
  4b3209c GSAT site: 110 answers; scoring guides for 106-108 and 110
  603eeeb GSAT site: 109 non-multiple-choice scoring guide
  e6fe753 GSAT: three entrances, timed mock exams, autosave, wrong-answer mastery; deploy gate for exam content; tests
  85bf6fc GSAT: writing practice (translation, essay, official multi-select scoring), original explanations pilot, README
```

**暴露面**:分支是公開可讀的,任何人可以 clone、瀏覽或 fork。fork 目前是 0;有沒有被 clone 過我查不到(GitHub 的 Insights → Traffic 只有 repo 管理員看得到)。

## 2. 備份(動任何歷史之前)
已產生並交付給你(不放在版本庫內,因為版本庫是公開的):
- `quote-pr61.bundle`:PR 分支相對於上線分支的全部提交(`git bundle`)
- `gsat-backup.tar.gz`:`gsat/`、`tools/`、`docs/` 的完整檔案
- `SHA256SUMS`:兩個檔案的雜湊

還原方式(在任何一台電腦上):
```bash
git clone https://github.com/radiholo-hub/Quote.git restore && cd restore
git fetch ../quote-pr61.bundle claude/stoic-wright-fpdcyc:restored-pr61
git log --oneline restored-pr61 | head
```
**請你把備份存到自己的電腦或私有雲端。** 下方任何方案做完之後,版本庫裡就拿不回這些檔案了。

## 3. 方案比較

| | 做法 | 優點 | 風險／代價 | 可逆? |
|---|---|---|---|---|
| **A. 暫時改為私有** | Settings → General → Danger Zone → Change repository visibility | 立刻停止公開;不動歷史 | **免費方案的私有 repo 不能用 GitHub Pages,每日佳句與 Score Rescue 網站可能下線**(請先確認你的方案);forks 為 0,影響小 | 是 |
| **B. 內容分離到私有 repo(長期建議)** | 新建私有 repo 存 `gsat/exam/`;公開 repo 只留原創內容與空殼 | 之後不會再誤公開;授權確認後再決定是否回到公開 | 要維護兩個 repo;部署時要從私有 repo 取檔(需要你設定存取金鑰) | 是 |
| **C. 乾淨新分支 + 刪除舊分支** | 在全新 clone 用 `git filter-repo` 清出沒有該內容的新分支,開新 PR,關閉 PR #61,刪除舊分支 | 不需要 force push 既有分支;PR #61 的審查紀錄可保留在舊 PR | 刪除前舊分支仍公開;GitHub 上仍可能經由舊 SHA 網址或 `refs/pull/61/head` 看到內容(見 §5) | 刪除後不可逆(但有備份) |
| **D. 在原分支 filter-repo 後 force push** | 改寫 `claude/stoic-wright-fpdcyc` 歷史 | 分支名不變 | 改寫已公開歷史;PR #61 的 commit 對應會亂;**仍殘留 `refs/pull/61/head`**;不建議 | 否 |

## 4. 建議順序
1. **你先確認授權**:向大考中心確認網路公開轉載的規定(我連不到 ceec.edu.tw,無法替你查)。
2. **確認授權前,降低暴露**:能接受時用 **A**;不能接受(Pages 會下線)就走 **C**。
3. **長期**:採 **B**,原創內容公開、真題內容在私有 repo,授權確認後再決定要不要公開部署。

### 方案 C 的具體步驟(全部在新資料夾操作,不動現有工作目錄與遠端)
```bash
# 0. 確認備份已存好
git clone https://github.com/radiholo-hub/Quote.git quote-clean && cd quote-clean
git checkout -b claude/gsat-clean origin/claude/stoic-wright-fpdcyc

# 1. 只在這個新分支上清歷史(--refs 限定改寫範圍),移除所有曾出現過的路徑
pip install git-filter-repo
git filter-repo --force --refs refs/heads/claude/gsat-clean \
  --path gsat/exam --path gsat/img --path gsat/exams.js --path gsat/answers.js --path gsat/nonmc.js --invert-paths

# 2. 補回空殼(讓網站與測試照常運作;內容與 tools/stage_site.sh 公開版相同)
mkdir -p gsat/exam
echo 'window.EXAMS=[];'  > gsat/exam/exams.js    ; echo 'window.ANSWERS={};' > gsat/exam/answers.js
echo 'window.NONMC={};'  > gsat/exam/nonmc.js    ; echo 'window.EXPLAIN={};' > gsat/exam/explain.js
echo 'window.MIXED={};'  > gsat/exam/mixed.js
python3 tools/gsat_inventory.py                    # 重新產生盤點清單(此時 exam/ 只剩空殼)
git add -A && git commit -m "GSAT: replace exam content with empty stubs (rights unconfirmed)"

# 3. 驗證:歷史裡不能再有任何 exam 內容
git log --all --oneline -- gsat/exam | cat           # 只應看到空殼那一個提交
git rev-list --all --objects | grep -E 'gsat/(exam/(img|exams)|img)' || echo "沒有殘留"
python3 -m pytest gsat/tests -q                       # 依賴試題的測試會自動略過

# 4. 推送「新名稱」的分支(不是 force push),開新 PR
git remote add origin https://github.com/radiholo-hub/Quote.git
git push -u origin claude/gsat-clean
```
之後(**需要你同意**):關閉 PR #61 → 刪除分支 `claude/stoic-wright-fpdcyc` → 依 §5 處理殘留。

我已在複製出來的資料夾模擬過「拿掉 exam 內容、換成空殼」的情況:完整測試套件結果見最終報告(依賴試題的測試會自動略過,其餘照常通過)。

## 5. 刪除之後仍可能殘留的東西
- 依 GitHub 官方文件「Removing sensitive data from a repository」,刪除分支或 force push 後,舊提交可能仍可經由 commit SHA 網址、PR 的隱藏 ref(`refs/pull/61/head`)或快取檢視取得,直到 GitHub 回收;要徹底移除,需**聯絡 GitHub Support** 請他們清除快取檢視與 PR 參照。請以官方文件當下的說明為準(我在這個環境查不到最新版)。
- 已經有人 clone 或 fork 的副本無法收回(目前 forks = 0)。

## 6. 需要你決定
1. 授權狀況與時程?
2. 在確認前要採 A(暫時私有,先確認 Pages 方案)還是 C(乾淨新分支)?
3. 是否同意之後依方案刪除舊分支、關閉 PR #61?
4. 長期是否採 B(私有 repo 放真題)?
