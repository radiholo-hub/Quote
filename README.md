# 每日佳句

每天一句近百年名人的中英佳句,附台灣國語與英語朗讀、跟著唸錄音。純靜態網站。

- 每天依日期換句;每一輪(句數天)每句恰好出現一次,輪與輪之間順序不同
- 新增句子:在 `quotes.js` 加一行 `{ zh, en, by }`,推送後 GitHub 會自動補錄音檔
- 音檔由 `tools/make_audio.py` 產生(中文 `audio/`、英文 `audio/en/`)

## 部署到 GitHub Pages
1. 預設分支就是目前這個分支,推送後會自動部署(之後若改用 main,請同步修改 `.github/workflows/pages.yml` 的 branches)
2. 到 Settings → Pages → Source 選 **GitHub Actions**
3. `Deploy site` 工作流程會發布到 `https://<帳號>.github.io/Quote/`

錄音(麥克風)和維基百科人像需要透過 https 的獨立網址才能運作。

## 學測英文練習(`gsat/`)
獨立的純靜態頁面,網址是 `…/gsat/`,不影響每日佳句與 Score Rescue。

- **三個入口**:歷屆試題、分類練習、錯題補強(連續答對 2 次才算掌握)
- **歷屆試題有兩種作答方式**:
  - **正式模擬考**:官方 100 分鐘倒數、**不能暫停**(離開頁面時間照常流逝,時間到自動交卷)
  - **自由練習(整份試卷)**:不限時或 60 分鐘(可暫停)
- **作答中不顯示對錯**:所有整份或分類作答都是交卷後才能看答案與詳解;分類練習與錯題補強可改選「學習模式」(每題答完立刻看)
- **手機閱讀**:「回文章」全螢幕看文章、「回題目」回到原位(頁面與文章的捲動位置都保留);綜合測驗、文意選填、篇章結構的空格可直接點擊切換,並顯示已選字母
- **作答進度自動儲存**在瀏覽器(含計時);成績與錯題也只存在這台裝置。瀏覽器存不了資料(如 iOS 無痕模式)時仍可作答
- **計分依年度分開**(`gsat/data/scoring.js`):106–110 選擇題 72 分;111–115 選擇題 62 分 + 混合題 10 分。多選題依試卷封面的官方公式 (n−2k)/n 計分
- **全卷成績單**:選擇題與多選題自動評分;填空簡答、中譯英、作文由學生對照官方評分原則自評。**尚未評分的項目顯示「待自評」,不會被當成 0 分**,全部評完才顯示全卷總分
- **非選擇題**:中譯英、英文作文可輸入並自動儲存;AI 批改尚未提供(預留位置,結果若加入須標示為「AI 建議分數」)
- **來源標示**:每一題、每個寫作頁都標示「歷屆真題」或「原創練習題」,兩者資料與作答紀錄完全分開
- **逐題詳解**(`gsat/exam/explain.js`,schema 2)只在**交卷後**的檢討頁出現,分七層可收合:正確答案 → 解題關鍵 → 選項解析 → 單字與發音 → 衍生字與延伸 → 歷屆出題紀錄 → 延伸練習。內容為原創,審核前一律標示「草稿・待人工審核」;詳解答案與官方答案不符時不會顯示。審核表用 `tools/gsat_review_sheet.py` 產生(含引用的單字詞條與延伸練習)
- **單字資料庫與字族**(`gsat/data/vocab.js`):原字詞形變化(A)、同字族衍生字(B)、語意相關字(C)三類分開管理;單字頁 `#/word/<詞條>`、單字一覽 `#/words`
- **歷屆出現索引**(`gsat/exam/vocab_index.js`,由 `tools/build_vocab_index.py` 逐字計算):出現次數、學年度、題號、位置、是否為正確答案/干擾選項;詞性有疑義的比對標為待審核、不計入。統計規則與核對結果見 [`docs/gsat/VOCAB_INDEX_METHOD.md`](docs/gsat/VOCAB_INDEX_METHOD.md)
- **英文語音**:單字、搭配詞、原創例句、原創文章朗讀(正常/慢速、暫停/繼續/重播)。沿用 Score Rescue 的雜湊命名與 Aria 聲音;同時只播一段;**作答畫面沒有朗讀,正式模擬考進行中被擋下**。音檔由 `tools/make_gsat_audio.py` 產生(PR 分支上由 CI 產生並提交)
- **免費/付費權限掛鉤**(`gsat/access.js`、`GSAT_ACCESS`):只判斷「能不能看這一題」,預設全部開放;沒有價格、訂閱或金流

### 著作權與部署(重要)
歷屆試題、答案、評分原則與圖片(`gsat/exam/`)的著作權屬大學入學考試中心,**授權尚未確認,預設不隨網站部署**:`tools/stage_site.sh` 只會放空殼,網站會降級成「導向大考中心官網 + 原創題」。**保守發布方案:權利不明素材不公開**——`GSAT_PUBLISH_EXAMS` 已停用(設成任何非空、非 0 的值,整理腳本會直接失敗),評分文件頁、試題圖片、試題與衍生詳解一律不隨網站部署;`gsat/audio/` 只部署「來源紀錄(`docs/gsat/audio-provenance.json`)為 `azure-paid`(Azure AI Speech 付費層)且雜湊相符」的音檔(免費層 F0 測試音檔與 edge-tts 舊檔都不部署),其餘由播放器改用裝置語音。原創內容放在 `gsat/data/`。

- 單字索引與語音的統計方法、核對結果、待人工確認事項:[`docs/gsat/VOCAB_INDEX_METHOD.md`](docs/gsat/VOCAB_INDEX_METHOD.md)
- 內容來源與權利清單:[`docs/gsat/CONTENT_INVENTORY.md`](docs/gsat/CONTENT_INVENTORY.md)(`python3 tools/gsat_inventory.py` 產生;測試會檢查清單與實際檔案一致)
- 公開分支與歷史紀錄清理方案(僅提案):[`docs/gsat/HISTORY_CLEANUP_PLAN.md`](docs/gsat/HISTORY_CLEANUP_PLAN.md)

### 新增年度
1. 用 `pdftotext -layout` 把試卷轉成文字,執行 `tools/parse_gsat.py 年度=文字檔 …` 產生 `gsat/exam/exams.js`(格式特殊的圖片題要在腳本的 `IMAGES` 補圖)
2. 把大考中心的「選擇題答案」填進 `gsat/exam/answers.js`(第 1 題起依序的字母,106–110 年 56 碼,111 年起 46 碼);111 年起第 49 題多選題的答案與選項數填進 `gsat/exam/mixed.js`
3. 執行 `tools/build_nonmc.py` 重新產生非選擇題圖片與 `gsat/exam/nonmc.js`(需要 poppler)
4. 在 `gsat/data/scoring.js` 確認該年度的題數與配分,重新產生盤點清單(`python3 tools/gsat_inventory.py`),跑 `python3 -m pytest gsat/tests`

### 測試
```bash
pip install -r gsat/tests/requirements.txt
python3 -m pytest gsat/tests
```
測試涵蓋核心計分、題庫資料、多種螢幕寬度的互動與版面、部署閘門、寫作與成績單。iPhone Safari(WebKit)測試在本機沒有 WebKit 時略過;CI 會強制執行。沒有 `gsat/exam/` 內容的乾淨分支,依賴試題的測試會自動略過。

## 學測英文考古題練習站(`exam-en/`)
獨立的純靜態新站,網址 `…/exam-en/`,與每日佳句、`gsat/`、Score Rescue 互不影響。題目為英文、介面為中文。

- 106–115 學年度選擇題(510 題),可依年度、題型(詞彙/綜合測驗/文意選填/篇章結構/閱讀測驗)篩選
- **練習**:答完立即顯示對錯;**考試**:交卷後才看答案,整份試卷 100 分鐘倒數
- 錯題本(連續答對 2 次才算掌握)、最近成績、未完成作答自動續答;資料只存在本機瀏覽器
- 資料由 `python3 tools/build_exam_en.py` 自 `gsat/exam/` 產生(`exam-en/data.js`、`exam-en/img/`)
- 本機預覽:`cd exam-en && python3 -m http.server`
- **著作權**:試題屬大考中心,授權確認前請依上方「著作權與部署」處理;`exam-en/` 尚未加入 Pages 部署流程
