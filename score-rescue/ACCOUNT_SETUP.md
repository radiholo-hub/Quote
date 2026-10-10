# 登入同步設定(Supabase,免費方案即可)

使用者用 Email 收登入連結(不用密碼),學習進度存在雲端,換裝置自動回來。
**沒設定時,登入按鈕會自動隱藏,網站照舊用本機儲存與備份碼。**

## 步驟(約 10 分鐘)
1. 到 https://supabase.com 註冊,按 **New project** 建立專案(地區選離使用者近的,例如 Tokyo)。
2. 左邊 **SQL Editor** → New query,貼上下面這段並按 Run:
   ```sql
   create table public.progress (
     user_id uuid primary key references auth.users(id) on delete cascade,
     data jsonb not null,
     updated_at timestamptz not null default now()
   );
   alter table public.progress enable row level security;
   create policy "own row select" on public.progress for select using (auth.uid() = user_id);
   create policy "own row insert" on public.progress for insert with check (auth.uid() = user_id);
   create policy "own row update" on public.progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
   ```
   這樣每個人只讀寫得到自己的那一列。
3. 左邊 **Authentication → URL Configuration**:
   - **Site URL** 填 `https://radiholo-hub.github.io/Quote/score-rescue/`
   - **Redirect URLs** 也加上同一個網址。
4. 左邊 **Project Settings → API**,複製 **Project URL** 和 **anon public** key。
5. 打開 `score-rescue/index.html`,找到
   ```js
   const SB_URL='';
   const SB_KEY='';
   ```
   把兩個值貼進去(anon key 本來就是公開用的,放在網頁裡沒問題;**不要**貼 service_role key)。
6. 提交並推送,等 Pages 部署完成。

## 注意
- Supabase 內建寄信有次數限制(免費方案每小時很少),正式營運前請到 **Authentication → SMTP Settings** 接自己的寄信服務(例如 Resend、SendGrid)。
- 付費名單與使用統計的設定,請看 `PAID_SETUP.md`。
- 模擬試題只同步分數,逐題解析需重新測驗取得。
