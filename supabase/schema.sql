-- =========================================================
-- TRAIN BOLD — Full Production Database Schema
-- Endurance & Hybrid Training Engine (Runna Benchmark)
-- =========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Waitlist Table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  sport_interest TEXT NOT NULL DEFAULT 'HYROX',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist (email);
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert into waitlist" ON public.waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public select from waitlist" ON public.waitlist FOR SELECT TO anon, authenticated USING (true);

-- 3. Athlete Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  preferred_unit TEXT DEFAULT 'km',
  current_5k_time TEXT DEFAULT '20:00',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 4. Campaigns Table (Races & Goal Containers)
CREATE TABLE IF NOT EXISTS public.campaigns (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  location TEXT,
  race_date DATE NOT NULL,
  goal_time TEXT NOT NULL,
  predicted_time TEXT,
  plan_payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_campaigns_user_id ON public.campaigns (user_id);
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own campaigns" ON public.campaigns FOR ALL USING (auth.uid() = user_id);

-- 5. Personal Records (PRs) Table
CREATE TABLE IF NOT EXISTS public.prs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  discipline TEXT NOT NULL,
  benchmark_name TEXT NOT NULL,
  metric_value TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_prs_user_id ON public.prs (user_id);
ALTER TABLE public.prs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own PRs" ON public.prs FOR ALL USING (auth.uid() = user_id);
