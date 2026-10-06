# 解鎖碼驗證服務部署步驟

解鎖碼不再寫在網頁裡,而是放在 Cloudflare Worker 的加密變數,網頁只會問「這個碼對不對」。

## 部署(約 10 分鐘)
1. 註冊免費的 Cloudflare 帳號,安裝 Node.js。
2. 在終端機進入 `score-rescue/worker/`:
   ```
   npm install -g wrangler
   wrangler login
   wrangler deploy
   ```
   完成後會印出網址,像 `https://score-rescue-unlock.<你的帳號>.workers.dev`。
3. 設定解鎖碼(逗號分隔,不分大小寫):
   ```
   wrangler secret put UNLOCK_CODES
   ```
   輸入例如 `RESCUE-A1B2,RESCUE-C3D4`。要新增或作廢,重新執行這行覆蓋即可,不用改網頁。
4. 打開 `score-rescue/index.html`,把 `UNLOCK_API` 改成:
   ```
   https://score-rescue-unlock.<你的帳號>.workers.dev/verify
   ```
5. `wrangler.toml` 的 `ALLOWED_ORIGINS` 要是你網站的網址(只有網域,沒有路徑)。

## 還要知道的限制
- 這只能擋住「看原始碼拿到解鎖碼」。解鎖後的狀態仍存在使用者瀏覽器,Day 2–14 的題目也在同一個檔案裡,懂程式的人仍可直接繞過。要真正保護內容,需要把付費題目移到伺服器、驗證通過才回傳。
- 同一組解鎖碼可以被多人共用。要限制次數,需要 Cloudflare KV 記錄使用情況。
- 建議在 Cloudflare 的 Security → WAF → Rate limiting 為 `/verify` 加上每分鐘次數限制,避免被暴力猜碼。
