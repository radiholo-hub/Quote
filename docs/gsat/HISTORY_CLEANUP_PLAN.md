# 公開 Git 分支與歷史紀錄清理方案(僅提案,尚未執行)

> 本文件**不含任何試題內容**,只有檔名、提交編號與操作步驟。
> **我不會自行 force push、刪除分支、關閉 PR 或更改 repo 可見性。** 以下任何一步都要你明確同意才會做。

> **最新版請看 [PRIVATE_STORAGE_AND_RESTORE.md](PRIVATE_STORAGE_AND_RESTORE.md)**(已原則上同意「原始題庫私有保存 + 乾淨公開分支」;含已演練的備份/還原、執行前檢查表,並把乾淨分支的做法改為「在上線分支上新增一次乾淨提交」,取代下方 §0 步驟 3 與 §4 的 `git filter-repo`)。付費題庫的伺服器端權限規劃見 [PAID_CONTENT_ARCHITECTURE.md](PAID_CONTENT_ARCHITECTURE.md)。

## 0. 第一階段驗收後的更新版建議(最安全、對 Score Rescue 多益影響最小;**尚未執行任何一步**)

**先決條件**:什麼都不做之前,PR #61 維持「不合併、不公開部署」。現在的暴露面只有「PR 分支本身公開可讀」;上線分支 `claude/daily-quotes-website-lbh2wi` 與網站部署都沒有這些內容(`git ls-tree -r origin/claude/daily-quotes-website-lbh2wi --name-only | grep -c '^gsat/'` 為 0)。

**需要被分離的檔案(比 §1 當時更多)**:`gsat/exam/` 下的 `exams.js`、`answers.js`、`nonmc.js`、`mixed.js`、`img/`(含 `img/ns/`)是大考中心內容;`explain.js`(針對真題的詳解、中文翻譯)、`vocab_index.js`(逐字比對出的出現紀錄)、`vocab_reviews.js`(人工審核結果)是**由真題衍生**的內容,權利比照真題未確認,也一併分離。原創內容(`gsat/data/*`、`gsat/audio/*.mp3`、程式、測試、文件)不受影響。公開版 `tools/stage_site.sh` 已經會對上述檔案放空殼(含 `VOCAB_INDEX=null`)。

### 建議做法:「乾淨新分支 + 真題另存私有 repo」,不改寫任何既有歷史
1. **(你)** 確認授權。授權前不做不可逆的事。
2. **(你)** 在 GitHub 新建一個私有 repo(例如 `Quote-gsat-exam`),把你電腦上的 `gsat/exam/` 整個放進去。這一步我可以協助整理檔案,但建立 repo、設定存取要由你做。
3. **(我,新資料夾,不動現有遠端)** 在全新 clone 用 `git filter-repo --refs refs/heads/claude/gsat-clean` 只在**新分支**上移除上述路徑,補回空殼(§4 的步驟,空殼清單要加上 `vocab_index.js`=`window.VOCAB_INDEX=null;`、`vocab_reviews.js`=`window.VOCAB_REVIEWS={};`),推送**新名稱**的分支(不是 force push),開新 PR。依賴真題的測試會自動略過(`needs_exam`),我已用「換成空殼」模擬驗證過。
4. **(你同意後我才做)** 新 PR 的 CI 全過、你看過之後:關閉 PR #61、刪除舊分支。**這一步前,舊分支仍然公開。**
5. **(你)** 向 GitHub Support 申請清除 `refs/pull/61/head` 與舊 SHA 的快取檢視(§5);這是 GitHub 官方文件建議的流程,我無法代辦。
6. 之後要在本機審核或跑完整測試時,把私有 repo 的內容放回 `gsat/exam/`(該目錄已不會被公開版本庫追蹤:新分支加上 `.gitignore` 條目)。

### 對各部分的影響(說明在前,執行在後)
| 項目 | 影響 |
|---|---|
| **Score Rescue 多益網站** | **無影響。** 上線分支與其檔案、既有 `Generate audio` 流程、既有部署都不動。PR 對多益相關檔案的唯一改動是 `tools/stage_site.sh`(多複製 `gsat/` 並加上真題閘門)與 `score-rescue/tests/test_stage_site.py`(對應測試),新分支同樣帶著,不會因為清理而變多或變少。 |
| 每日佳句 | 無影響(沒有檔案變動)。 |
| PR #61 | 保留作為歷史討論;之後由新 PR 取代。舊 PR 的 commit 不會被改寫,所以 PR 上的審查紀錄與 CI 紀錄都還在。 |
| 分支與 SHA | 新分支是新的 SHA(`filter-repo` 改寫的是**新分支自己的**提交),舊 SHA 不再對應;我們文件裡引用的 SHA 要改成新的。 |
| 測試與 CI | `gsat-tests` 在沒有真題內容時會略過依賴真題的測試(數量以模擬當時為準,執行時會顯示);CI 不再驗證詳解與審核表,**真題相關功能的驗證會改成在有私有資料的本機執行**。 |
| 教學審核流程 | 審核表需要真題文字,所以產生審核表要在你的電腦(有私有資料的 `gsat/exam/`)上跑 `tools/gsat_review_sheet.py`;我這邊也一樣,資料不在公開分支上。 |
| 網站部署 | 公開網站只有原創題、單字資料庫(含發音)與導向大考中心官網的連結,真題功能降級,和現在的閘門行為一致。 |
| 已 clone 的副本 | 無法收回;forks 目前為 0,clone 數只有 repo 管理員看得到。 |

### 為什麼不選其他方案(重點)
- **只把 repo 改成私有**:最快,但免費方案的私有 repo 不能用 GitHub Pages,**每日佳句與 Score Rescue 可能因此下線**,對多益影響最大。除非你確認方案可以,否則不建議。
- **在原分支 filter-repo 後 force push**:改寫已公開歷史、PR #61 的 commit 對應會亂、`refs/pull/61/head` 仍殘留;風險最高,且你明確要求不得改寫歷史。
- **只 `git rm`**:歷史裡仍然拿得到檔案,沒有達到目的。

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
