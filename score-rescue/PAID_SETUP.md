# 付費與使用統計設定(Supabase)

## 方案
只有一個付費方案:**30 天衝分**(買斷、永久、不自動續訂)。
- 免費:診斷、最弱類別的完整解析、3 題補強、Day 1–3、1 次錯題回顧體驗。
- 付費(登入的 Email 在付費名單裡):Day 4–30 全部 + 3 份模擬試題。
- 價格在 `index.html` 最上面的 `PRICE`:
  ```js
  const PRICE={launch:399,regular:499,promoEnd:'2026-11-30'};
  ```
  優惠到 `promoEnd` 當天(台灣時間 23:59)為止,之後網站自動顯示 `regular`。要延長優惠或調價,改這三個數字即可。
  (網站上的價格只是顯示;實際收款是你在 LINE 告訴買家的金額。)

## 一次性設定
1. Supabase 後台 → **SQL Editor** → New query,貼上 `supabase/setup.sql` 整段,按 Run。
   (會跳出「destructive」提醒是因為檔案裡有 drop policy / drop trigger,正常。)

## 賣出一個時
1. 買家轉帳後在 LINE 回報:**轉帳後五碼 + 要用來登入的 Email**。
2. 你確認到款後,到 Supabase → **Table Editor** → `paid_users` → **Insert row**,填:
   - `email`:買家的 Email(大小寫沒關係,會自動轉小寫)
   - `note`:備註,例如買家 LINE 名稱、金額、日期
3. 告訴買家「已開通,用那個 Email 登入就會自動解鎖」。如果他已經在登入狀態,請他在計畫頁按「重新檢查」或重新整理。

**買家登入的 Email 必須和你登記的完全一致**,所以請他先確認要用哪個 Email。

## 退款 / 收回
Table Editor → `paid_users` → 刪除那一列。他下次登入(或重新整理)就會恢復成免費。

## 看使用統計
SQL Editor 執行:
```sql
-- 各種事件被觸發的次數
select name, count(*) as n from public.events group by name order by n desc;

-- 最近 7 天,每天做診斷、完成 Day 1、開啟付款說明的次數
select date_trunc('day', created_at at time zone 'Asia/Taipei')::date as day, name, count(*) as n
from public.events
where created_at > now() - interval '7 days'
  and name in ('diag_start','diag_done','day_1','day_3','buy_modal_open','login_sent')
group by 1, 2 order by 1 desc, 2;
```
事件名稱:`diag_start` 開始診斷、`diag_done` 完成診斷、`explain_view` 看解析、`drill_start` 開始補強、`day_1`…`day_30` 完成第幾天、`bonus_review_done` 完成錯題回顧體驗、`buy_modal_open` 開啟付款說明、`login_open` / `login_sent` 開啟登入 / 寄出登入信、`exam_start` 開始模擬試題。
同一個分頁(同一次瀏覽)每種事件只記一次;不記錄 Email 或任何個人資料。

## 要知道的限制
- 付費資格由伺服器判斷,使用者無法自己改成已付費。
- 但 **Day 4 之後的題目與模擬試題內容仍寫在網頁檔裡**,懂程式的人可以直接從原始碼取得;要真正保護內容,需要把題目移到伺服器、驗證付費後才傳送。
- `events` 表允許任何人新增(否則匿名使用者無法被統計),所以有人可能灌入垃圾資料;統計數字請當作粗略參考。

## 音檔改用官方 Azure AI Speech(收費前請做)
1. 註冊 Azure → 建立「Speech」資源(定價層選 Free F0 若有提供),記下 **金鑰** 與 **區域**(如 eastasia)。
2. GitHub repo → Settings → Secrets and variables → Actions → New repository secret,新增:
   - `AZURE_SPEECH_KEY`:金鑰
   - `AZURE_SPEECH_REGION`:區域
3. 刪掉 `score-rescue/audio/` 裡的舊 mp3(用 edge-tts 產的),到 Actions → Generate audio → Run workflow 重新產生。
   沒設定這兩個 secret 時,程式會退回非官方 edge-tts,僅適合試用。
4. 價格與免費額度請以 Azure 官網最新為準。

## events 限流
`setup.sql` 已加上「全站每分鐘最多 60 筆」的限制,更新後請在 SQL Editor 再執行一次整份檔案。
