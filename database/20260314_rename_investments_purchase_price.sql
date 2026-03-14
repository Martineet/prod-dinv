begin;

-- Rename purchase_price to price for consistent terminology.
alter table if exists public.investments
  rename column if exists purchase_price to price;

commit;
