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
獨立的純靜態頁面,網址是 `…/gsat/`。內容:
- 歷屆學測英文選擇題(106 至 115 學年度,缺 105),附官方答案,可整份或依題型作答,有錯題本
- 非選擇題(混合題、中譯英、作文)頁面圖片與官方評分原則,供自己對照
- 原創模擬題(`gsat/questions.js`)

試題與評分原則來源為大學入學考試中心,版權屬該單位。

### 新增年度
1. 用 `pdftotext -layout` 把試卷轉成文字,執行 `tools/parse_gsat.py 年度=文字檔 …` 產生 `gsat/exams.js`(格式特殊的圖片題要在腳本的 `IMAGES` 補圖)
2. 把大考中心的「選擇題答案」填進 `gsat/answers.js`(第 1 題起依序的字母,106 至 110 年 56 碼,111 年起 46 碼)
3. 執行 `tools/build_nonmc.py` 重新產生非選擇題圖片與 `gsat/nonmc.js`(需要 poppler)
