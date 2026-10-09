# 付費方案與解鎖碼(Supabase)

## 方案規則
| | 免費 | 14 天方案 NT$299 | 30 天方案 NT$499 |
|---|---|---|---|
| 診斷、3 題解析、3 題補強 | ✅ | ✅ | ✅ |
| 每日練習 | Day 1 | 14 天路線全部 | 30 天路線全部 |
| 模擬試題 | ❌ | 第 1 份 | 第 1、2、3 份 |

- 兩個方案各自獨立,買 30 天不會得到 14 天路線的進度(兩條路線的進度分開記錄)。
- 買斷、永久可用,不提供升級補差價。
- 資格綁在「登入的 Email 帳號」上,換裝置登入就在。

## 一次性設定
1. Supabase 後台 → **SQL Editor** → New query,貼上 `supabase/entitlements.sql` 整段,按 Run。
   (會跳出「destructive」提醒是因為檔案裡有 drop policy,正常。)

## 賣出一個方案時
1. 產生解鎖碼。SQL Editor 執行(把數量與方案改成你要的):
   ```sql
   insert into public.unlock_codes (code, plan, note)
   select upper(substr(replace(gen_random_uuid()::text,'-',''),1,4) || '-' ||
                substr(replace(gen_random_uuid()::text,'-',''),1,4) || '-' ||
                substr(replace(gen_random_uuid()::text,'-',''),1,4)),
          '14', '備註,例如買家 LINE 名稱'
   from generate_series(1, 1)
   returning code, plan;
   ```
   `'14'` 改成 `'30'` 就是 30 天方案;`generate_series(1, 5)` 一次產生 5 組。
2. 買家轉帳並在 LINE 回報後,把產生的解鎖碼傳給他。
3. 買家登入網站 → 學習計畫頁 → 輸入解鎖碼。**一組碼只能用一次**,綁定登入的帳號。

## 常用查詢
```sql
-- 還沒用掉的碼
select code, plan, note from public.unlock_codes where used_by is null order by created_at desc;
-- 誰買了什麼
select u.email, e.plan, e.granted_at from public.entitlements e join auth.users u on u.id = e.user_id order by e.granted_at desc;
-- 退款/收回資格
delete from public.entitlements where user_id = (select id from auth.users where email = 'xxx@example.com') and plan = '14';
```

## 要知道的限制
- 資格由伺服器管理,使用者無法自己改成已付費;解鎖碼也無法從網頁原始碼看到。
- 但 **Day 2 之後的題目、模擬試題內容本身仍寫在網頁檔裡**,懂程式的人可以直接從原始碼取得。要真正保護內容,需要把題目移到伺服器、驗證資格後才傳送。
- 兌換碼失敗太多次(1 小時 10 次)會暫時鎖住,避免有人暴力猜碼;所以請用隨機長碼,不要用好猜的字串。
