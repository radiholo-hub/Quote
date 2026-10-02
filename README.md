# 每日佳句

每天一句近百年名人的中英佳句,附台灣國語與英語朗讀、跟著唸錄音。純靜態網站。

- 每天依日期換句;每一輪(句數天)每句恰好出現一次,輪與輪之間順序不同
- 新增句子:在 `quotes.js` 加一行 `{ zh, en, by }`,推送後 GitHub 會自動補錄音檔
- 音檔由 `tools/make_audio.py` 產生(中文 `audio/`、英文 `audio/en/`)

## 部署到 GitHub Pages
1. 把分支合併到 `main`
2. 到 Settings → Pages → Source 選 **GitHub Actions**
3. `Deploy site` 工作流程會發布到 `https://<帳號>.github.io/Quote/`

錄音(麥克風)和維基百科人像需要透過 https 的獨立網址才能運作。
