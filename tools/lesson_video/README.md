# 課程示範影片（題目動畫＋AI 旁白）

把課程腳本（`lesson1.json` 這類檔案）做成 1920×1080 的 mp4：題目畫面依旁白切換，先停幾秒讓學生想，再圈出判斷依據，最後揭曉答案。

- `lesson1.json`：免費第 1 課完整影片（開場、判斷觀念、四個示範、-ed／-ing 補充、片尾前測宣傳），內容依《免費第1課 錄影逐字稿 v1》。每個 cue 有 `view`（畫面）與 `say`（旁白），`pause` 是思考倒數、`hold` 是念完後多停留的秒數
- `scene.html`：畫面版型。字級以手機直向看 16:9 影片為準
- `make_video.py`：產生旁白、截圖、合成影片

## 旁白
中文用 `zh-TW-HsiaoChenNeural`，英文單字與句子改用 `en-US-AriaNeural`（和網站英文發音同一個聲音），分段產生後接起來。
目前用 edge-tts 試做；正式上架前可改用 Azure AI Speech（同一組聲音），做法同 `tools/make_score_rescue_audio.py`。

## 怎麼產生
- 開 PR 改到這個資料夾時，GitHub Actions「Lesson video」會自動產生影片，到該次執行的 Artifacts 下載 `lesson-videos`
- 自己電腦：`pip install edge-tts playwright && python -m playwright install chromium`，再執行
  `python3 tools/lesson_video/make_video.py tools/lesson_video/lesson1.json out/lesson1.mp4`
- 只檢查畫面：加 `--silent`，不產生旁白，依字數估計每段長度
