create extension if not exists pgcrypto;

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  whatsapp text,
  reservation_date date not null,
  reservation_time time not null,
  guest_count integer not null check (guest_count > 0),
  reservation_type text,
  message text,
  language text not null default 'ar',
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'rejected', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.reservations enable row level security;

-- Anonymous visitors can only create reservation requests.
create policy "anon_insert_reservations"
  on public.reservations
  for insert
  to anon
  with check (true);

-- Authenticated admin users can read and update reservations.
create policy "auth_select_reservations"
  on public.reservations
  for select
  to authenticated
  using (true);

create policy "auth_update_reservations"
  on public.reservations
  for update
  to authenticated
  using (true)
  with check (true);
