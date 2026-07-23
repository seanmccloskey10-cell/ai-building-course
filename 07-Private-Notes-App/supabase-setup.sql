-- Dear Diary - database setup
-- ===========================================================================
-- Run this ONCE in your Supabase project, after you've created it:
--   1. Open your project at supabase.com
--   2. Left sidebar -> SQL Editor -> New query
--   3. Paste this whole file in and click RUN
--
-- It creates the table your entries live in, and - the important part - turns
-- on the GUARD (Row Level Security) that makes each person only able to see
-- their own entries. The guard lives here, inside Supabase's servers, not in
-- your JavaScript. That's why your diary stays private even though your anon
-- key is public: the protection isn't in your code for anyone to bypass.
-- ===========================================================================

-- Drop the table if it already exists, so this file is safe to run again.
drop table if exists entries;

-- The table your diary entries are stored in - like a spreadsheet in the cloud.
create table entries (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  user_id uuid references auth.users(id) default auth.uid(),
  title text,
  content text
);

-- Turn ON the guard (Row Level Security). Until a policy says otherwise, this
-- now denies ALL access to the table - locked by default.
alter table entries enable row level security;

-- The one rule the guard enforces: you may only touch rows that are YOURS
-- (where the row's user_id equals your logged-in id). This covers reading,
-- inserting, updating and deleting - all of it, for logged-in users only.
create policy "Users can only see their own entries"
on entries for all to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
