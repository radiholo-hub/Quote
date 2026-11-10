# 單字索引與語音:統計方法、核對結果與待確認事項

> 本文件**不含任何試題文字**,只有統計規則、數字與流程。數字由程式從題庫計算,不是 AI 推測;文件中的表格由同一份資料產生。

## 1. 資料結構(都是結構化資料,不寫死在 HTML)

| 檔案 | 內容 | 性質 |
|---|---|---|
| `gsat/data/vocab.js` | 單字資料庫:59 個詞條、字族、片語。每個詞條有詞性、中文、**A 詞形變化**(`forms`)、**B 同字族**(`family`)、**C 語意相關**(`rel`:同義/反義/相似字辨析)、搭配詞、原創例句 | 原創、可公開 |
| `gsat/exam/explain.js` | 逐題詳解(schema 2),**只引用詞條 id**,字義與詞性只在詞條定義一次 | 原創、針對真題 |
| `gsat/data/ext_practice.js` | 原創延伸練習(20 題),全部 `status: draft` | 原創、待審核 |
| `gsat/exam/vocab_index.js` | 歷屆出現索引(含年度、題號、位置、角色,不含試題文字) | 由真題計算,權利比照試題未確認 |
| `gsat/exam/vocab_reviews.js` | 人工審核結果(紀錄編號 → 確認/排除、審核者) | 審核資料 |
| `gsat/data/audio_manifest.js` | 要朗讀的原創內容清單(187 段:{'word': 59, 'phrase': 87, 'sentence': 31, 'passage': 10}) | 原創 |
| `gsat/audio/<雜湊>.mp3` | 語音檔(沿用 Score Rescue 的雜湊命名與 Aria 聲音) | 原創 |

三類關係**分開管理**:`communicate`(原字)的詞形只有 communicate / communicates / communicated / communicating(A);`communication`、`communicative`、`communicator` 是各自的詞條(B);`express`、`convey`、`interact` 只出現在 `rel`(C)。測試會檢查詞形不重複、語意相關字不是字族成員、也不在任何詞形裡。

## 2. 統計規則

出現次數由 `tools/build_vocab_index.py` 逐字計算,規則如下:

1. **只比對 A 類詞形。** 字族衍生字與語意相關字各有自己的詞條與次數,**不併入原字**;同義字不計入同字族。
2. **位置分四種:** 題幹、選項(正確答案/干擾選項)、文章。角色只依官方答案判定;**出現在文章裡的字不稱為「考過的答案」**。
3. **一篇文章即使供多題共用,只算一次**(以題組為單位)。同一個字在同一篇文章出現多次,分開報告「原文次數」與「涉及題組數」。
4. 文意選填的字庫、篇章結構的選項句子是整個題組共用的,**每個選項只算一次**(對應它是哪一個空格的答案;沒用到的算干擾選項)。
5. **詞性或字義無法由程式判斷的比對一律標「待審核」,不計入已確認次數**:詞條宣告有其他詞性的詞形(例如 `tight` 也可作副詞)、位於連字號複合詞內(例如 well-known 裡的 known)。人工確認或排除後(`vocab_reviews.js`,必須有審核者姓名)才會改變統計;**AI 不會自行決定**。
6. 範圍:106–110 與 111–115 學年度的選擇題 510 題、85 個題目單位(單題或題組);混合題與非選擇題不在內。**只統計單字庫已建檔的 59 個詞條,不是全部單字**。
7. **歷屆出現次數只說明過去題庫的紀錄,不代表未來的出題機率。** 目前沒有提供「高頻單字排行榜」;若之後製作,必須標明統計範圍(哪些詞條、哪些年度)與上述規則。

## 3. 核對結果

| 核對方式 | 結果 |
|---|---|
| **A. 獨立重算(原始試卷文字)**:不看題庫資料,直接用正規表示式數 106–115 年試卷 PDF 轉出的文字(只取選擇題部分),逐詞條逐學年比對索引的(已確認 + 待審核 + 已排除)次數(`tools/verify_vocab_index.py`) | 590 個「詞條 × 學年」、原始文字共 124 次,**0 筆不一致** |
| **B. 獨立重算(瀏覽器內另一套程式)**:`test_real_index_matches_an_independent_recount_per_entry_and_year` 用另一份 JavaScript 實作,直接數題庫文字,和索引逐項比對。CI 每次都會跑 | 通過 |
| **C. 每筆紀錄可追溯**:`test_every_record_traces_back_to_its_source_question` 逐筆檢查:年度、題號/題組存在;位置(題幹/選項字母/文章段落)的文字真的含有紀錄的詞形;角色與官方答案一致 | 117 筆全部通過 |
| **D. 統計規則**:用人工合成的小題庫逐條驗證(共用文章只算一次、字族與同義字不合併、詞性疑義與連字號複合詞待審核、人工審核才能改變統計、AI 無法審核…) | 通過 |

已確認 **74** 次;待審核 **45** 筆(其中 `pos` 詞性疑義 44 筆、`compound` 連字號複合詞 1 筆),合計 50 次未計入。

### 示範字族:communicate

| 詞條 | 已確認 | 題幹 | 正確答案 | 干擾選項 | 文章原文(篇/題組) | 學年度 | 待審核 |
|---|---:|---:|---:|---:|---:|---|---:|
| communicate (v.) | 1 | 0 | 1 | 0 | 0(0) | 115 | 0 |
| communication (n.) | 1 | 0 | 0 | 1 | 0(0) | 114 | 0 |
| communicative (adj.) | 0 | 0 | 0 | 0 | 0(0) | — | 0 |
| communicator (n.) | 0 | 0 | 0 | 0 | 0(0) | — | 0 |

真實紀錄:`communicate` 只出現在 **115 學年度第 12 題**(綜合測驗,選項 (C),正確答案);`communication` 只出現在 114 學年度(干擾選項)。兩者的次數各自計算,不合併。

### 文章與選項分開計算的例子:consumption

| 詞條 | 已確認 | 題幹 | 正確答案 | 干擾選項 | 文章原文(篇/題組) | 學年度 | 待審核 |
|---|---:|---:|---:|---:|---:|---|---:|
| consumption (n.) | 8 | 0 | 1 | 2 | 5(2) | 110, 113, 114, 115 | 0 |

(文章原文 5 次分布在 2 篇文章/題組;同一篇文章供多題共用只算一篇。)

### 其他示範詞條

| 詞條 | 已確認 | 題幹 | 正確答案 | 干擾選項 | 文章原文(篇/題組) | 學年度 | 待審核 |
|---|---:|---:|---:|---:|---:|---|---:|
| tight (adj.) | 0 | 0 | 0 | 0 | 0(0) | — | 3 |
| dread (v.) | 0 | 0 | 0 | 0 | 0(0) | — | 1 |
| elbow (v.) | 0 | 0 | 0 | 0 | 0(0) | — | 1 |
| grave (adj.) | 0 | 0 | 0 | 0 | 0(0) | — | 1 |
| passion (n.) | 1 | 0 | 1 | 0 | 0(0) | 115 | 0 |
| vacancy (n.) | 1 | 0 | 1 | 0 | 0(0) | 115 | 0 |

`tight`、`dread`、`elbow`、`grave` 的「已確認 0」不是沒出現,而是出現的比對都因為詞性有疑義而**待審核**(例如 `tight` 3 筆),需要老師確認後才會計入。

## 4. 待人工確認的內容(程式與 AI 都不能代替)

1. **45 筆詞性有疑義的比對**:用 `python3 tools/gsat_vocab_review_sheet.py --out <版本庫以外的資料夾>` 產生待審核表(含題目上下文),審核後填入 `gsat/exam/vocab_reviews.js`,再執行 `python3 tools/build_vocab_index.py`。待審核最多的詞條:impact-n(10), escape-v(6), official-adj(5), stress-v(4), tight-adj(3), struggle-v(3), gravity-n(2), crash-v(2)。
2. **所有詞條(status: draft)**:中文解釋、搭配詞、原創例句、同義/反義與相似字辨析,都是 AI 撰寫的草稿。
3. **10 題詳解與 20 題延伸練習**:全部待審核。審核表:`python3 tools/gsat_review_sheet.py --out <版本庫以外的資料夾>`(含引用的詞條一併審核)。
4. **語音**:機器檢查只驗證了檔案有效、時長合理、音量正常。負責人已初步試聽部分音檔,沒有明顯問題,但**尚未全面驗收**,187 個檔不會因此全部標為已通過;沒有逐段標記的仍是「待審核」(見 AUDIO_PRODUCTION.md)。
5. **語音服務授權**:目前 187 個音檔是用**非官方的 edge-tts(僅限試用)**產生的,來源紀錄標為非官方,**部署時不會被包含**。`tools/make_gsat_audio.py` 已改成只使用官方 Azure AI Speech(沒有金鑰就停止,不退回 edge-tts),並須用 `--tier free-test`(F0,開發試聽,不可正式部署)或 `--tier paid`(S0,正式版)指定層級;詳見 `AUDIO_PRODUCTION.md`。
6. **歷屆試題與出現索引的使用權利**仍待確認。公開部署預設不含 `gsat/exam/`(包含 `vocab_index.js`);單字頁、發音、延伸練習等原創內容不受影響。

## 5. 語音架構

- **沿用既有做法**:檔名 = `sr_hash(文字).mp3`(與 `tools/make_score_rescue_audio.py` 同一個函式,測試比對網頁端與清單的雜湊完全相同);聲音 en-US-AriaNeural;只用官方 Azure AI Speech(舊的 edge-tts 檔不部署);播放用 `new Audio('audio/<雜湊>.mp3')`,找不到檔案才退回裝置語音(並在畫面上說明)。
- **慢速版**:雜湊文字為 `"slow\n" + 文字`,語速 −35%(正常 −8%)。
- **播放規則**:同時只播一段;再按同一個喇叭就停止;文章朗讀有播放/暫停/繼續/重新播放與正常/慢速;**作答畫面沒有朗讀,正式模擬考進行中(截止時間前)任何朗讀都被擋下**。
- **文章朗讀只提供原創文章**:歷屆試題的文章朗讀,等使用權利確認後才開放(音檔清單不含任何試題文字,測試會檢查)。
- **音檔怎麼產生**:`tools/build_gsat_audio_manifest.py` → `gsat/data/audio_manifest.js`;`tools/make_gsat_audio.py` → `gsat/audio/`。`.github/workflows/gsat-audio-preview.yml` 現在只能手動啟動(可選 force),需要 Azure secrets,沒有就直接失敗;產生階段只有唯讀權限;提交階段只接受 `gsat/audio/<雜湊>.mp3`、`docs/gsat/audio-provenance.json` 與 `docs/gsat/signoffs/*.json`。
- **合併後**:請把 `gsat/audio` 併入既有的 `Generate audio` 流程(需修改 `audio.yml` 的 paths 與步驟、`tools/audio_changes.sh` / `publish_audio_pr.sh` 的允許路徑、`tools/check_audio_complete.py`)。**這次沒有動 Score Rescue 既有的音檔流程。**

## 6. 免費/付費權限

`gsat/access.js` 只提供「這一題能不能看」的判斷(`canView`),設定在 `gsat/data/config.js` 的 `GSAT_ACCESS`:`mode: 'open'`(預設,全部開放)或 `'tiered'`(依年度或題目標為 free / premium,搭配 `entitlements.premium`)。歷屆出題紀錄的「查看題目」遵守這個判斷;沒有權限的題目仍列出年度、題號與角色(紀錄本身),但不顯示題目內容,直接輸入網址也看不到。**沒有價格、訂閱或金流。**
