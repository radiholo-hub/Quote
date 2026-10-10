-- 英文助攻隊：付費名單 + 匿名事件計數（在 Supabase → SQL Editor 執行一次）

-- 清掉舊版（解鎖碼方案）若存在
drop function if exists public.redeem_code(text);
drop table if exists public.redeem_log;
drop table if exists public.unlock_codes;
drop table if exists public.entitlements;

-- 付費名單：新增一列 Email = 開通
create table if not exists public.paid_users (
  email text primary key,
  note text,
  created_at timestamptz not null default now()
);

create or replace function public.paid_users_normalize() returns trigger
language plpgsql as $$
begin
  new.email := lower(trim(new.email));
  return new;
end $$;

drop trigger if exists paid_users_normalize on public.paid_users;
create trigger paid_users_normalize before insert or update on public.paid_users
for each row execute function public.paid_users_normalize();

alter table public.paid_users enable row level security;
drop policy if exists "paid_select_own" on public.paid_users;
create policy "paid_select_own" on public.paid_users
  for select to authenticated
  using (email = lower(auth.jwt() ->> 'email'));

-- 匿名事件（只能新增，不能讀）
create table if not exists public.events (
  id bigint generated always as identity primary key,
  name text not null check (name ~ '^[a-z0-9_]{1,40}$'),
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
drop policy if exists "events_insert" on public.events;
create policy "events_insert" on public.events
  for insert to anon, authenticated with check (true);
grant insert on public.events to anon, authenticated;
grant select on public.paid_users to authenticated;

-- events 限流:全站每分鐘最多 60 筆,超過的直接丟掉(不報錯),避免被人灌爆
create or replace function public.events_throttle() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.events where created_at > now() - interval '1 minute') >= 60 then
    return null;
  end if;
  return new;
end $$;

drop trigger if exists events_throttle on public.events;
create trigger events_throttle before insert on public.events
for each row execute function public.events_throttle();
