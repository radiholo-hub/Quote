# 學測英文語音：產生方式、核對、商用條款與成本

最後更新：第一階段教學品質驗收後。

> **2026-11 保守發布方案(最新,優先於下方舊敘述):** 音檔來源分三類,記在 `docs/gsat/audio-provenance.json`:
> | 來源 | tier | 用途 | 正式部署 |
> |---|---|---|---|
> | `azure-paid` | S0 付費 | 正式版 | ✅ 唯一會被 `tools/stage_site.sh` 保留的來源 |
> | `azure-free-test` | F0 免費 | 開發、本機試聽、音質檢查(`usage: development-test-only`、`productionApproved: false`) | ❌ 一律移除,不是 production-approved |
> | `edge-tts` | 非官方 | 舊檔(repository 目前的 187 個都是這個,只作歷史保留) | ❌ |
>
> `tools/make_gsat_audio.py` 只用官方 Azure AI Speech,**必須用 `--tier free-test` 或 `--tier paid` 說明金鑰層級(不預設)**;沒有金鑰就停止,不退回 edge-tts,重試不改語速。F0 有速率限制:預設每次請求間隔 3.5 秒,遇 429／503 依 Retry-After 等待後以相同設定重試。F0 每月 50 萬字元,全部 187 段約 9,658 字元(約 1.9%)。
> 流程:`AZURE_SPEECH_KEY`／`AZURE_SPEECH_REGION` → `python3 tools/make_gsat_audio.py --tier free-test --force`(開發試聽) → 日後正式發布前 `--tier paid --force` → `python3 tools/gsat_audio_provenance.py check --require-production` → `python3 tools/verify_gsat_audio.py`。本機預覽整個網站(含 F0 音檔)可設 `GSAT_ALLOW_NONPRODUCTION_AUDIO=1`;在 CI／Cloudflare 設它會直接失敗。
> **目前 repository 的實際狀態(公開版):**
> - `gsat/audio/` 裡的 187 個 mp3 仍是**舊的 edge-tts 檔**(`e5b1840` 起就在公開歷史裡)。來源紀錄 `docs/gsat/audio-provenance.json` 如實登記為 `edge-tts`／`unofficial-not-deployable`／`productionApproved: false`(baseline-edge-tts)。它們只作既有歷史與開發用檔案,**正式部署一律排除**;即使檔案雜湊與舊簽核紀錄相同,也不會讓正式試聽簽核成立。
> - **Azure F0 驗證音檔沒有放入公開 repository。** 187 個 Azure Speech F0 開發測試音檔(en-US-AriaNeural,`azure-free-test`,`productionApproved: false`)只保存在不推送的本機快照分支與 repo 外備份;教師已於 2026-11-10 完成 Q1 的 17 個 F0 音檔人工音質檢查(發音、語速、停頓、音質皆無問題),結果只留在 `docs/gsat/signoffs/115-1.json` 的 `audio.devTestChecks`(`filesInRepository: false`,記錄當時 17 個檔案的 SHA-256)。這是審核歷史,**不是 production 簽核**。
> - **production 最終必須使用 `azure-paid`(付費層 S0)**:用 `--tier paid --force` 重產 → 提交 `gsat/audio/*.mp3` 與來源紀錄 → 教師重新聆聽並以 `approve-audio --confirm-listened` 正式簽核。文字簽核不需重做。
> - **來源防護(程式與測試把關):** (1) 部署只保留 `azure-paid` 且雜湊相符的 mp3;(2) `audio.status: passed` 的每個音檔都必須存在、來源為 `azure-paid`、`productionApproved: true`、且 SHA-256 與簽核紀錄相符,edge-tts／azure-free-test／development-test-only 一律不成立;(3) 公開版檢查(`python3 tools/gsat_audio_provenance.py check-public`,測試 `gsat/tests/test_public_tree.py`):Git 追蹤的檔案不得是 F0 開發測試音檔,來源紀錄不得把現行檔案登記為 `azure-free-test`(簽核裡的 `devTestChecks` 歷史不算);(4) CI `GSAT audio` 流程:`free-test` 只上傳 artifact,**不 commit、不 push**,只有 `paid` 才會提交。
>
> (以下為舊狀態)**狀態:部分已人工試聽(負責人初步聽過部分音檔,沒有明顯問題),尚未全面驗收。** 187 個音檔**不會**因此標為「已通過」:沒有逐段的人工標記就仍是「待審核」;目前沒有問題的音檔**不重新製作**。暫不購買 Azure 付費服務;edge-tts 產生的檔案只供試聽與內部審核,不可作為正式商用語音。
> 縮寫朗讀:`sb.` 唸 somebody、`sth.` 唸 something(清單的 `speak` 欄位;畫面文字不變)。

## 1. 現有音檔是怎麼產生的
- 內容清單：`tools/build_gsat_audio_manifest.py` 由 `gsat/data/vocab.js`（單字、搭配詞、原創例句）與 `gsat/data/mock.js`（5 篇原創模擬考文章）產生 `gsat/data/audio_manifest.js`。**不含**大考中心試題與文章。
- 產生：`tools/make_gsat_audio.py` 載入既有的 `tools/make_score_rescue_audio.py`（沿用 `sr_hash` 檔名規則與聲音設定）：聲音 `en-US-AriaNeural`；正常速度 `-8%`；慢速 `-35%`（只有文章有慢速版，雜湊文字是 `"slow\n" + 文字`）。
- 有設定 `AZURE_SPEECH_KEY`／`AZURE_SPEECH_REGION` 時走官方 Azure AI Speech；**沒有設定時退回非官方的 edge-tts**。目前這 187 個檔是由 `gsat-audio-preview.yml`（GitHub Actions）在沒有 Azure 金鑰的情況下產生的，**所以是 edge-tts 的試用品，不是正式商用音檔**。
- 程式裡 edge-tts 重試第 3 次起會退回語速 `+0%`（既有程式的行為）。檔案本身看不出語速；時長與字數的關係沒有離群值（見下），文章的慢速/正常時長比一致，所以沒有跡象顯示發生退回，但不能 100% 保證。正式用 Azure 重新產生時應把這個退回行為移除。

## 2. 機器可檢查的核對：`tools/verify_gsat_audio.py`
實際結果（本機 ffprobe/ffmpeg）：

| 項目 | 結果 |
|---|---|
| 清單筆數／`gsat/audio` 內 mp3 數量 | 187／187，無缺檔、無孤兒檔、檔名與文字雜湊全部相符 |
| 單字（正常） | 59 個，1.9–2.2 秒 |
| 片語與搭配詞（正常） | 87 個，2.0–3.0 秒 |
| 例句（正常） | 31 個，2.4–5.4 秒 |
| 文章正常速度 | 5 個，34.3–57.7 秒 |
| 文章慢速 | 5 個，48.5–81.8 秒；慢速/正常時長比皆為 1.42（理論值 0.92/0.65≈1.415） |
| 格式／音量 | 全部是 mp3、無靜音（平均音量 ≥ −38 dB）、無削波 |
| 總大小／總字元 | 5.88 MB／9,633 字元 |

**這些檢查證明「檔案存在、可解碼、長度合理、慢速確實比較慢」，不證明「發音正確、聽起來自然」。** 後者只能由人聆聽(目前是部分完成):用 `tools/gsat_audio_test_page.py` 產生的試聽頁逐段標記。

## 3. 試聽頁
`python3 tools/gsat_audio_test_page.py --out 檔案.html --embed` 產生單一 HTML（mp3 內嵌，約 8 MB），可直接用 iPhone Safari 開啟。六個區塊：單字、衍生字（字族）、片語、例句、文章正常速度、文章慢速。每段可播放／停止／重播，同一時間只播一段；每段可標記「待審核／聽起來正常／有問題」並匯出文字。

## 4. 正式商用語音：服務條款、成本、部署
**以下條款內容來自公開搜尋到的 Microsoft 文件與 Microsoft Q&A 討論，沒有取得 Microsoft Product Terms 的原文；上線前必須由負責人對照正式合約（購買方式不同，適用條款也不同）確認。**

- **edge-tts 不能當商用方案。** 它呼叫的是 Edge 瀏覽器「大聲朗讀」的非公開端點，不是有文件與合約的官方 API；沒有 SLA，也可能隨時被 Microsoft 擋下或改驗證方式。只適合試用與內部使用。
- **Azure AI Speech（官方）**：
  - 免費層（F0）的神經語音每月 0.5 百萬字元；超過要付費層。Q&A 討論的共識是：商用、對外散佈合成音檔應使用付費層，免費層／試用額度不建議商用。
  - 輸入文字必須是你有權使用的內容（我們的單字、例句、原創文章是原創的，沒有問題；**大考中心的試題文章不在朗讀範圍**）。
  - 需要依規定揭露內容是 AI 合成語音；輸出不得用來訓練或改良競爭的語音合成服務。
  - 預建神經語音（如 en-US-AriaNeural）不需要配音員同意書（那是 Custom Neural Voice 才需要）。
- **成本（需以 Azure 價格頁／試算器確認）**：搜尋結果的神經語音單價約每百萬字元 15–16 美元，但官方頁面的數字在搜尋結果中顯示不出來，**不可當作定價**。以目前的資料量估算：
  - 現有 187 段共 9,633 字元，約 0.0096 百萬字元，遠低於免費額度，即使重做幾次也是幾美分。
  - 詞彙側（單字＋搭配詞＋例句）平均每個詞條約 58 字元：500 詞條 ≈ 2.9 萬字元（約 0.4 美元）；1,000 詞條 ≈ 5.8 萬（約 0.9 美元）；3,000 詞條 ≈ 17.3 萬（約 2.6 美元）。
  - 成本幾乎不是問題；主要是授權與條款。
- **部署方式（建議）**：靜態預先產生。以 CI（`gsat-audio-preview.yml` 同樣的作法）用 Azure 金鑰（GitHub Secrets，**不放進網頁、不放進版本庫**）一次性產生 mp3，驗證後提交 `gsat/audio/<hash>.mp3`，網站只讀靜態檔。好處：使用者端沒有金鑰、沒有即時呼叫、沒有隨使用量增加的費用、離線也能播、網站已有「播放失敗時退回裝置語音」。內容更新只會重產有變動的檔（檔名是文字雜湊）。
- 正式啟用前的待辦：取得 Azure 付費訂閱與金鑰 → 移除 edge-tts 重試退回 `+0%` 的行為 → 用 Azure 重產 187 段 → 跑 `verify_gsat_audio.py` → 人工聆聽試聽頁並全部標記 → 在網站加上「AI 合成語音」說明。
