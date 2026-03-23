# Members Settings RLS Archive (2026-03-23)

This archive contains the RLS policy setup needed for user-editable member settings.

## What this enables
- Users can read only their own row in `public.members`.
- Users can update only their own settings (`visibility_summary`, `taxes`).
- Updates are restricted to the settings columns only.

## SQL to apply
```sql
begin;

alter table public.members enable row level security;

drop policy if exists "members_select_own" on public.members;
drop policy if exists "members_update_own" on public.members;

create policy "members_select_own"
  on public.members
  for select
  to authenticated
  using (
    email = auth.email()
  );

create policy "members_update_own"
  on public.members
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.members m
      where m.member_id = members.member_id
        and m.email = auth.email()
    )
  )
  with check (
    exists (
      select 1
      from public.members m
      where m.member_id = members.member_id
        and m.email = auth.email()
    )
  );

revoke update on table public.members from authenticated;
grant select on table public.members to authenticated;
grant update (visibility_summary, taxes) on table public.members to authenticated;

commit;
```

## Note about column names
If your column is named `visible` instead of `visibility_summary`, replace
`visibility_summary` with `visible` in the SQL above.
