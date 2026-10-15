-- =========================================================
-- TRAIN BOLD — Supabase Database Migration
-- Phase 1 Foundation: Early Access Waitlist & Campaigns
-- =========================================================

-- 1. Create the Waitlist Table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  sport_interest TEXT NOT NULL DEFAULT 'HYROX',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for fast lookup by email
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist (email);

-- 2. Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anyone (public/anonymous) to sign up for early access
CREATE POLICY "Allow public insert into waitlist"
  ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. Policy: Allow reading waitlist entries
CREATE POLICY "Allow public select from waitlist"
  ON public.waitlist
  FOR SELECT
  TO anon, authenticated
  USING (true);
