-- SORT landing — lead capture table (SCRUM-67 / SCRUM-63)
-- Run once in the Supabase project you point the landing at.
-- The Pages Function inserts with the service-role key, which bypasses RLS, so we
-- keep RLS ON with no public policies: nobody can read/write leads from the anon key.

create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  name             text not null,
  cafe             text not null,
  poster_subdomain text not null,
  contact          text not null,
  message          text,
  utm_source       text,
  utm_medium       text,
  utm_campaign     text,
  referer          text,
  user_agent       text,
  status           text not null default 'new'   -- new | contacted | onboarding | won | lost
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

alter table public.leads enable row level security;
-- Intentionally no policies: anon/auth roles get nothing; only the service role (used
-- by the Pages Function) can insert. Read leads from the Supabase dashboard or a
-- service-role query.
