begin;

-- Enable RLS for members settings access.
alter table public.members enable row level security;

-- Recreate policies to ensure expected access for settings updates.
drop policy if exists "members_select_own" on public.members;
drop policy if exists "members_update_own" on public.members;

create policy "members_select_own"
  on public.members
  for select
  to authenticated
  using (
    auth.uid() = member_id
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

-- Limit updates to the settings columns only.
revoke update on table public.members from authenticated;
grant select on table public.members to authenticated;
grant update (visibility_summary, taxes) on table public.members to authenticated;

commit;
