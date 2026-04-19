-- Content Studio: Supabase Schema
-- Run this in Supabase SQL Editor to set up all tables
-- Compatible with Supabase free tier

-- ============================================================
-- TABLE: posts
-- Main content table. Status determines which tab it appears in.
-- Content Bank = WIP or Ready for Review
-- Posted archive = Posted
-- ============================================================

CREATE TABLE posts (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week               TEXT DEFAULT 'TBD',
  topic              TEXT NOT NULL,
  post_number        TEXT DEFAULT '1 of 1',
  format             TEXT DEFAULT 'TBD',
  thumbnail_text     TEXT NOT NULL,
  hook               TEXT DEFAULT '',
  caption            TEXT DEFAULT '',
  voiceover          TEXT DEFAULT '',
  slides_description TEXT DEFAULT '',
  status             TEXT DEFAULT 'WIP' CHECK (status IN ('WIP', 'Ready for Review', 'Posted')),
  target_date        DATE,
  trending_ref       TEXT DEFAULT '',
  sort_order         INTEGER DEFAULT 0,
  created_at         TIMESTAMPTZ DEFAULT now(),
  updated_at         TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_posts_user_status ON posts(user_id, status);
CREATE INDEX idx_posts_user_week ON posts(user_id, week);

-- ============================================================
-- TABLE: pipeline_items
-- Topic ideas not yet moved to content bank.
-- When moved, a new post is created (status=WIP) and the
-- pipeline_item is deleted.
-- ============================================================

CREATE TABLE pipeline_items (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  topic           TEXT NOT NULL,
  priority        TEXT DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
  rationale       TEXT DEFAULT '',
  hook            TEXT DEFAULT '',
  caption_summary TEXT DEFAULT '',
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_pipeline_user ON pipeline_items(user_id);

-- ============================================================
-- TABLE: strategy_notes
-- Editable brand guideline cards. Seeded with defaults on
-- account creation.
-- ============================================================

CREATE TABLE strategy_notes (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title      TEXT NOT NULL,
  content    TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_strategy_user ON strategy_notes(user_id);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- Each user can only see and modify their own data.
-- ============================================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own posts"
  ON posts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own pipeline"
  ON pipeline_items FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own strategy"
  ON strategy_notes FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- SEED FUNCTION: Call after user signs up to populate defaults
-- Can be triggered via a Supabase Edge Function or client-side
-- ============================================================

CREATE OR REPLACE FUNCTION seed_user_defaults(p_user_id UUID)
RETURNS void AS $$
BEGIN
  -- Seed strategy notes
  INSERT INTO strategy_notes (user_id, title, content, sort_order) VALUES
    (p_user_id, 'Brand Voice', 'Polished but warm. Educational, never directive.', 1),
    (p_user_id, 'Visual Identity', 'Watercolor/sketch illustrations. Warm palette. Talking-head for personal posts.', 2),
    (p_user_id, '3 Posts Per Week', '2 educational + 1 personal/lifestyle. Personal drives 2-3x engagement.', 3),
    (p_user_id, 'Hashtags 2026', 'Instagram caps at 5. Categorize only. 3-5 niche tags. Keyword-rich captions matter more.', 4),
    (p_user_id, 'What Drives Reach', 'Watch time (first 3s). Saves/shares. Keywords. On-screen text. Early engagement. 3x/week.', 5),
    (p_user_id, 'Content Guardrails', 'No medical advice. No patient/consultation/appointment references. Educational only.', 6),
    (p_user_id, 'Status Workflow', 'WIP: edit freely. Ready for Review: content locked. Posted: archived (can move back). Pipeline: defaults to WIP.', 7),
    (p_user_id, 'Exporting', 'Google Sheets: tab-separated paste. Google Docs: formatted text paste.', 8);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- OPTIONAL: Auto-seed on user creation via trigger
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM seed_user_defaults(NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- NOTE: This trigger fires on auth.users which requires the
-- function to be SECURITY DEFINER. Only enable if you want
-- auto-seeding. Otherwise call seed_user_defaults() from
-- client-side after first login.

-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION handle_new_user();
