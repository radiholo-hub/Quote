-- 詞性小課第 4～7 課（完整方案）的私有儲存空間。在 Supabase → SQL Editor 執行一次。
-- 先執行過 setup.sql（要有 public.paid_users 表）。

-- 1. 不公開的儲存桶：沒有公開網址，只能用登入後的身分讀取
insert into storage.buckets (id, name, public)
values ('lessons', 'lessons', false)
on conflict (id) do update set public = false;

-- 2. 只有付費名單裡的帳號可以讀（下載課程內容、取得影片的限時網址）
--    paid_users 本身的規則只讓登入者看到自己那一列，所以這裡的 exists 只會在「自己的 Email 在名單裡」時成立。
drop policy if exists "lessons_paid_read" on storage.objects;
create policy "lessons_paid_read" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'lessons'
    and exists (
      select 1 from public.paid_users p
      where p.email = lower(auth.jwt() ->> 'email')
    )
  );

-- 不建立 insert／update／delete 規則：學生不能上傳或修改。
-- 檔案由管理者在 Storage 頁面手動上傳（管理後台不受這些規則限制）。

-- 檢查（應該看到 lessons、public = false）
select id, public from storage.buckets where id = 'lessons';
