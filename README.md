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
- **詳解**(`gsat/exam/explain.js`)為原創,審核前一律標示「草稿・待人工審核」;詳解答案與官方答案不符時不會顯示。審核表用 `tools/gsat_review_sheet.py` 產生

### 著作權與部署(重要)
歷屆試題、答案、評分原則與圖片(`gsat/exam/`)的著作權屬大學入學考試中心,**授權尚未確認,預設不隨網站部署**:`tools/stage_site.sh` 只會放空殼,網站會降級成「導向大考中心官網 + 原創題」。確認可公開後,部署時設定環境變數 `GSAT_PUBLISH_EXAMS=1` 才會包含。原創內容放在 `gsat/data/`。

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
