-- Score Rescue 付費方案:解鎖碼 + 使用者資格
-- 在 Supabase 後台 SQL Editor 貼上整段執行(可重複執行)。
-- 重點:使用者只能「讀」自己的資格;資格只能由 redeem_code() 寫入,瀏覽器端無法自己改。

create table if not exists public.unlock_codes (
  code        text primary key,
  plan        text not null check (plan in ('14','30')),
  note        text,
  used_by     uuid references auth.users(id) on delete set null,
  used_at     timestamptz,
  created_at  timestamptz not null default now()
);

create table if not exists public.entitlements (
  user_id     uuid not null references auth.users(id) on delete cascade,
  plan        text not null check (plan in ('14','30')),
  code        text,
  granted_at  timestamptz not null default now(),
  primary key (user_id, plan)
);

create table if not exists public.redeem_log (
  id       bigserial primary key,
  user_id  uuid not null,
  ok       boolean not null,
  at       timestamptz not null default now()
);

alter table public.unlock_codes enable row level security;
alter table public.entitlements enable row level security;
alter table public.redeem_log   enable row level security;

-- 解鎖碼與兌換紀錄:完全不開放給網站端(沒有任何 policy = 全部拒絕)
revoke all on public.unlock_codes from anon, authenticated;
revoke all on public.redeem_log   from anon, authenticated;
revoke all on sequence public.redeem_log_id_seq from anon, authenticated;

-- 資格:登入使用者只能讀自己的,不能寫
revoke all on public.entitlements from anon, authenticated;
grant select on public.entitlements to authenticated;
drop policy if exists "own entitlements select" on public.entitlements;
create policy "own entitlements select" on public.entitlements
  for select to authenticated using (auth.uid() = user_id);

-- 兌換函式:要登入、一碼一次、失敗太多次暫時鎖住
create or replace function public.redeem_code(p_code text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid  uuid := auth.uid();
  v_code text := upper(trim(coalesce(p_code, '')));
  v_plan text;
begin
  if v_uid is null then return 'not_logged_in'; end if;

  if (select count(*) from public.redeem_log
       where user_id = v_uid and not ok and at > now() - interval '1 hour') >= 10 then
    return 'too_many';
  end if;

  update public.unlock_codes
     set used_by = v_uid, used_at = now()
   where code = v_code and used_by is null
   returning plan into v_plan;

  if v_plan is null then
    insert into public.redeem_log(user_id, ok) values (v_uid, false);
    if exists (select 1 from public.unlock_codes where code = v_code) then
      return 'used';
    end if;
    return 'invalid';
  end if;

  insert into public.entitlements(user_id, plan, code)
  values (v_uid, v_plan, v_code)
  on conflict (user_id, plan) do nothing;
  insert into public.redeem_log(user_id, ok) values (v_uid, true);
  return 'ok:' || v_plan;
end;
$$;

revoke all on function public.redeem_code(text) from public, anon;
grant execute on function public.redeem_code(text) to authenticated;
