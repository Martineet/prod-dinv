create table if not exists public.referrals (
  name text primary key,
  link text not null,
  updated_date timestamptz not null default now()
);

alter table public.referrals enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'referrals'
      and policyname = 'Allow read referrals'
  ) then
    create policy "Allow read referrals"
      on public.referrals
      for select
      to authenticated, anon
      using (true);
  end if;
end $$;

create or replace function public.set_referrals_updated_date()
returns trigger as $$
begin
  new.updated_date = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists referrals_set_updated_date on public.referrals;

create trigger referrals_set_updated_date
before update on public.referrals
for each row
execute function public.set_referrals_updated_date();

insert into public.referrals (name, link) values
  ('kraken',   'https://invite.kraken.com/JDNW/0l5dmdhe'),
  ('coinbase', 'https://coinbase.com/join/J7JU4NM?src=android-link'),
  ('mexc',     'https://promote.mexc.com/r/zTCc2yj40o'),
  ('hodlhodl', 'https://hodlhodl.com/join/XY7F')
on conflict (name) do nothing;
