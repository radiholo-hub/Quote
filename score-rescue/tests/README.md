# Score Rescue 自動測試

用瀏覽器（Playwright）實際操作網站，檢查付費權限、免費加練額度、續做、升降級、挑戰練習、保留題規則，以及主要畫面與文案。

## 什麼時候會跑
GitHub Actions 的「Score Rescue tests」會在以下情況自動執行：
- 有 PR 改到 `score-rescue/index.html`、`score-rescue/tests/`、`tools/make_score_rescue_audio.py`
- 上述檔案合併到上線分支
- 在 Actions 頁面手動執行（Run workflow）

## 自己在電腦上跑
```bash
pip install -r score-rescue/tests/requirements.txt
python -m playwright install chromium
python -m pytest score-rescue/tests -q
```

## 做法
- 測試會把 `index.html` 複製成 `score-rescue/.test-index.html`，掛上 `window.__t` 讓測試讀寫內部狀態，跑完自動刪除。
- Supabase 由假伺服器代替，不會連到真的資料庫，也不會寫入任何資料；付費與否由測試指定。
- 音檔：只檢查網頁會念的文字都在產生音檔的收集清單裡；不檢查 mp3 是否已存在，因為新題目的音檔是合併後才產生。

## 檔案
| 檔案 | 檢查內容 |
|---|---|
| `test_access.py` | 付費狀態來自伺服器；免費版只到 Day 3，加練、挑戰、模擬試題只限付費 |
| `test_free_trial.py` | Day 1 免費加練一次：額度、續做原本那組、保留題目、重整與重新診斷、雲端合併、方案介紹 |
| `test_redo.py` | 免費重做只複習舊題、題數不足、沒有可複習的題；付費重做優先出新題 |
| `test_levels.py` | 升降級規則（連續兩組 4/5 升級、0–1/5 降級、舊題與補強題不計入）、再診斷維持第一次的組合 |
| `test_challenge.py` | 挑戰練習的開放條件、剩餘題數門檻、進度與結果、不降級、不重複計分、中途離開 |
| `test_extra_practice.py` | 付費「再練 5 題」、新題不足時的提示、不推進天數 |
| `test_review.py` | 錯題回顧：有錯題直接開始、沒有錯題先說明 |
| `test_reserved.py` | 保留題與模擬試題題目不進日常練習；重測才優先用保留題 |
| `test_ui.py` | 難度標示、完成頁錯題與「查看解析」、閱讀朗讀、手機標題、首頁文案 |
| `test_audio_texts.py` | 網頁會念的文字都在音檔收集清單裡，前端與 Python 的雜湊一致 |
