# 原始題庫私有保存 + 乾淨公開分支:備份、還原與執行前檢查表

> 方向已原則上同意:**原始題庫私有保存,公開分支保持乾淨**。本文件是規劃與「非破壞性檢查」的結果。
> **尚未執行任何刪除、改寫歷史、關閉 PR、變更部署或合併。** 任何破壞性步驟之前,必須先通過 §3 的檢查表。
> 本文件不含任何試題內容。

## 0. 目前凍結的事項
- **停止向公開分支新增任何權利尚未確認的考題及相關素材。** 以 `tools/gsat_exam_freeze.py` + `docs/gsat/exam-freeze.json` 凍結:`gsat/exam/` 目前的 61 個檔案(只有檔名與 sha256),CI 的 `gsat/tests/test_exam_freeze.py` 會在「多了檔案、少了檔案、或原始考題檔內容被改動」時失敗。衍生檔(`explain.js`、`vocab_index.js`、`vocab_reviews.js`)只凍結檔名,因為詳解審核會持續更新它們。
- 要新增或更動考題素材,必須先有負責人明確同意,才能用 `--write` 更新凍結清單。
- 乾淨分支(沒有 `gsat/exam/`)時這個檢查沒有對象,會自動通過。

## 1. 非破壞性檢查結果(撰寫時)
| 檢查 | 結果 |
|---|---|
| 上線分支 `claude/daily-quotes-website-lbh2wi` 有沒有 `gsat/` 內容 | 沒有(`git ls-tree -r origin/claude/daily-quotes-website-lbh2wi --name-only \| grep -c '^gsat/'` = 0) |
| 公開分支裡考題文字是否漏在 `gsat/exam/` 以外 | 用 8 個連續單字比對(21,308 個考題片段 × 91 個非考題檔案):只有 `tools/parse_gsat.py` 內含一題被改寫的題幹(112 年第 44 題地圖題)與 `gsat/data/ext_practice.js` 有一句通用的題型用語(`Which of the following is closest in meaning…`,不是考題內容)。**`parse_gsat.py` 與 `build_nonmc.py` 要歸入私有組**(§2)。 |
| 公開版網站會不會包含考題 | 不會:`tools/stage_site.sh` 預設放空殼;`gsat/tests/test_deploy.py` 驗證 |
| 本機 checkout 是淺層(shallow)複本 | 是。所以**不能**在這個環境製作「完整歷史」的 bundle;備份改成「PR 相對於上線分支的提交 bundle」+ 還原時從 GitHub 取得上線分支(§2),已實際演練成功 |
| 殘留的 PR 參照 | `refs/pull/61/head` 由 GitHub 保留,刪除分支後仍可能經 SHA 取得,需聯絡 GitHub Support(HISTORY_CLEANUP_PLAN.md §5) |
| 誤提交的檔案 | `tools/__pycache__/*.pyc` 已移除並加入 `.gitignore`(普通提交,沒有改寫歷史) |

## 2. 私有備份(已演練)與還原方案
工具:`tools/gsat_backup.py`(不含試題內容,可放公開 repo;產生的備份含試題,必須放在版本庫以外)。

```bash
python3 tools/gsat_backup.py create  --out /私有位置/gsat-backup      # 建立
python3 tools/gsat_backup.py verify  --dir /私有位置/gsat-backup      # 驗證(任何破壞性步驟前必跑,必須通過)
python3 tools/gsat_backup.py restore --dir /私有位置/gsat-backup --to /新的空資料夾   # 示範還原
```
備份內容:
| 檔案 | 內容 |
|---|---|
| `all.bundle` | PR 分支相對於上線分支(`07c0e17`)的全部 Git 提交 |
| `exam-private.tar.gz` | **私有組**:`gsat/exam/` 全部(考題、答案、非選擇題與評分頁面圖片、詳解、出現索引、審核資料)+ `tools/parse_gsat.py`、`tools/build_nonmc.py`(處理試題文字的工具) |
| `source-pdfs.tar.gz`、`SOURCE_PDFS.sha256` | 你提供的大考中心原始 PDF(33 個)與雜湊,可從頭重新產生 `exams.js` 等 |
| `MANIFEST.json` | 私有組每個檔案的 sha256、大小,以及備份的 head 與 base 提交 |
| `SHA256SUMS` | 以上檔案的雜湊 |

`verify` 檢查:雜湊、bundle 完整、**從 GitHub 全新取得上線分支後接上 bundle,還原出的私有組與 MANIFEST 逐檔相同**、tar 內容相同、與目前工作目錄相同(檔案或 head 不同就判定「備份已過期」)。
演練結果(head `be4a2ec`):63 個私有檔案、bundle 10.4 MB、tar 5.1 MB;`verify` 通過;`restore` 到新資料夾後 63 個檔案 0 個不符,且工作樹與 head 一致。

**請把備份存到你自己的電腦與一個私有雲端(至少兩份),並在你那邊也跑一次 `verify`。** 備份的 head 會隨新提交過期,破壞性步驟前要重新 `create` 並 `verify`。

### 還原方案(出了問題怎麼回去)
1. 舊分支與 PR #61 在「你確認新分支與新 PR 都沒問題」之前**不刪、不關**;所有新動作都是新增(新分支、新 PR、新私有 repo),可以隨時放棄。
2. 即使之後刪了舊分支:`restore` 可以從備份重建「PR 分支 + 完整私有組」(上面的指令);也可以把私有組直接放回任何新 clone 的 `gsat/exam/`。
3. 私有 repo 本身也是一份備份(§4 步驟 2)。

## 3. 執行前檢查表(全部打勾才能做任何刪除、改寫歷史、關閉 PR、變更部署)
- [ ] 負責人書面同意要做的具體步驟(逐步,不是概括同意)
- [ ] `gsat_backup.py create` 在**目前 head** 重新建立,且 `verify` 通過
- [ ] 備份已複製到至少兩處負責人自己控制的私有位置,並在那邊 `verify` 通過
- [ ] 在全新資料夾 `restore` 演練成功(0 個不符)
- [ ] 私有 repo 已建立、私有組已推送、負責人確認只有自己(或指定人)能存取
- [ ] 新乾淨分支已推送、新 PR 的 CI 全過、負責人看過
- [ ] 公開版 `stage_site.sh` 產出沒有任何考題內容(`test_deploy.py`)
- [ ] 確認 Pages/Cloudflare 部署來源仍是上線分支,沒有被變更;Score Rescue 與每日佳句的測試(`score-rescue-tests`)全過
- [ ] 授權狀況已決定(尚未確認前,公開分支維持乾淨)

## 4. 建議的執行順序(每一步都先說明,等你同意才做)
1. 你:建立私有 repo(例如 `Quote-gsat-exam`),我協助整理要放的檔案(私有組)。我不能替你建立 repo(這個工作階段不允許建立 repo)。
2. 你:把私有組推到私有 repo,並確認存取權限。
3. 我(新資料夾、不動遠端):**建立乾淨分支的方式改為「在上線分支上新增一次乾淨的提交」**,而不是 `git filter-repo`:
   ```bash
   git clone https://github.com/radiholo-hub/Quote.git quote-clean && cd quote-clean
   git checkout -b claude/gsat-clean origin/claude/daily-quotes-website-lbh2wi
   git checkout origin/claude/stoic-wright-fpdcyc -- .                # 取回 PR 的最終內容
   git rm -r -q --cached gsat/exam tools/parse_gsat.py tools/build_nonmc.py   # 私有組不進公開分支
   # 補回空殼與 .gitignore 條目(gsat/exam/ 之後不再被追蹤),跑 tools/gsat_inventory.py
   git commit -m "GSAT: score rescue English practice (exam material kept private)"
   ```
   優點:歷史是「上線分支 + 一個乾淨提交」,**不可能殘留**舊提交裡的考題文字(`filter-repo` 只能移除路徑,若曾有考題文字出現在別的檔案的歷史裡就會殘留);不需要任何 force push。代價:新分支沒有 PR #61 的逐次提交歷史(舊 PR 仍保留那些紀錄)。
4. 我:推送新名稱分支、開新 PR、確認 CI 全過(依賴考題的測試自動略過,`needs_exam`)。
5. 你確認後(**需要你明確同意**):關閉 PR #61、刪除舊分支;你向 GitHub Support 申請清除 `refs/pull/61/head` 與舊 SHA 快取。

## 5. 對 Score Rescue 多益網站與每日佳句的影響
無。上線分支、部署設定、既有 `Generate audio` 流程都不動;PR 對多益相關檔案的唯一改動是 `tools/stage_site.sh` 與 `score-rescue/tests/test_stage_site.py`,新分支同樣帶著。每一步之前都會先跑 `score-rescue-tests`。
