# Content Studio — Codex Handoff & Product Spec

## What This Is

A social media content management system for aesthetic plastic surgeons (initially built for @roberttungmd). The working prototype is a React artifact (`content-bank.jsx`) that runs in Claude's artifact environment. This document is the spec to rebuild it as a production Next.js app backed by Supabase (free tier) and deployed on Vercel.

The prototype is the source of truth for all UI, interactions, and data shapes. Keep it as the design reference.

---

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Next.js     │────▶│  Supabase    │     │  Vercel      │
│  (App Router)│◀────│  (Postgres + │     │  (Hosting +  │
│  React 18    │     │   Auth +     │     │   Edge Fns)  │
│  Tailwind    │     │   Storage)   │     │              │
└─────────────┘     └──────────────┘     └──────────────┘
```

**Stack:**
- Frontend: Next.js 14+ (App Router), React 18, Tailwind CSS
- Backend: Supabase (Postgres, Auth, Row Level Security, Realtime)
- Hosting: Vercel (free tier works)
- Auth: Supabase Auth (email/password or magic link)
- No additional backend needed — Supabase client SDK talks directly to Postgres

---

## Data Model

### Table: `posts`

This is the main content table. Every post (across Content Bank, Posted archive) lives here. Status determines which tab it appears in.

```sql
CREATE TABLE posts (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week          TEXT DEFAULT 'TBD',
  topic         TEXT NOT NULL,
  post_number   TEXT DEFAULT '1 of 1',
  format        TEXT DEFAULT 'TBD',
  thumbnail_text TEXT NOT NULL,
  hook          TEXT DEFAULT '',
  caption       TEXT DEFAULT '',
  voiceover     TEXT DEFAULT '',
  slides_description TEXT DEFAULT '',
  status        TEXT DEFAULT 'WIP' CHECK (status IN ('WIP', 'Ready for Review', 'Posted')),
  target_date   DATE,
  trending_ref  TEXT DEFAULT '',
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Index for fast filtering by user + status
CREATE INDEX idx_posts_user_status ON posts(user_id, status);
CREATE INDEX idx_posts_user_week ON posts(user_id, week);

-- Auto-update updated_at
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
```

### Table: `pipeline_items`

Topic ideas that haven't been moved to the content bank yet.

```sql
CREATE TABLE pipeline_items (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id        UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  topic          TEXT NOT NULL,
  priority       TEXT DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
  rationale      TEXT DEFAULT '',
  hook           TEXT DEFAULT '',
  caption_summary TEXT DEFAULT '',
  sort_order     INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_pipeline_user ON pipeline_items(user_id);
```

### Table: `strategy_notes`

Editable brand guidelines per user. Seeded with defaults on account creation.

```sql
CREATE TABLE strategy_notes (
  id        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title     TEXT NOT NULL,
  content   TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_strategy_user ON strategy_notes(user_id);
```

### Row Level Security (RLS)

Every table must have RLS enabled so users can only see their own data.

```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_notes ENABLE ROW LEVEL SECURITY;

-- Policies: users can only CRUD their own rows
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
```

---

## Enums & Constants

These should be defined as TypeScript constants (not DB enums, for flexibility):

```typescript
export const FORMATS = [
  "Carousel (3 slides)",
  "Carousel (4 slides)",
  "Carousel (5 slides)",
  "Reel (voiceover + illustration visuals)",
  "Reel (voiceover + photos)",
  "Reel (talking head)",
  "Reel (talking head + b-roll)",
  "Static Image Post",
  "TBD",
] as const;

export const WEEKS = [
  "TBD",
  "Week 1", "Week 2", "Week 3", "Week 4", "Week 5",
  "Week 6", "Week 7", "Week 8", "Week 9", "Week 10",
] as const;

export const STATUSES = ["WIP", "Ready for Review", "Posted"] as const;

export const STATUS_COLORS = {
  WIP:              { bg: "#FEF3C7", text: "#92400E", border: "#F59E0B" },
  "Ready for Review": { bg: "#DBEAFE", text: "#1E40AF", border: "#3B82F6" },
  Posted:           { bg: "#D1FAE5", text: "#065F46", border: "#10B981" },
} as const;

export const PRIORITY_COLORS = {
  High:   { bg: "#FEE2E2", text: "#991B1B" },
  Medium: { bg: "#FEF3C7", text: "#92400E" },
  Low:    { bg: "#E0E7FF", text: "#3730A3" },
} as const;
```

---

## Feature Spec

### Tab 1: Content Bank

**What it shows:** All posts where `status != 'Posted'`

**Filters:**
- Week dropdown: "All" + WEEKS array
- Status dropdown: "All", "WIP", "Ready for Review"
- Shows count of filtered results

**Post cards:**
- Show: week, post number, status badge, thumbnail text, topic, format, hook (2-line clamp), target date
- Locked posts (Ready for Review) show 🔒 icon and blue-tinted card
- Click opens detail modal

**Detail modal (critical — the core editing UI):**
- Sticky header with: topic, post number, title
- Dropdown controls (always editable, even when locked): Week, Status, Format, Target Date
- Content fields (editable only when status = WIP):
  - Hook (single line, click-to-edit)
  - Thumbnail / Title Text (single line)
  - Caption (multiline, click-to-edit)
  - Voiceover Script (multiline)
  - Visual / Slide Directions (multiline)
  - Trending Reference (single line)
- Each field uses an isolated edit component that manages its own local state to prevent cursor jumping. The parent only updates on Save, not on every keystroke
- Escape cancels edit, Enter saves (single-line fields only)
- Lock banner shows when status is Ready for Review or Posted, with contextual message

**Status change behavior:**
- WIP → Ready for Review: content fields lock, card gets 🔒
- Ready for Review → Posted: post disappears from Content Bank, appears in Posted tab
- Any status can be changed back to any other status via the dropdown
- When changing from Posted → WIP: notification "Moved back to WIP — content is editable"

### Tab 2: Posted (Archive)

**What it shows:** All posts where `status = 'Posted'`

- Same card layout as Content Bank
- Click opens same detail modal
- Status dropdown in modal allows moving back to WIP or Ready for Review
- Green banner: "Posted and archived. Change status above to move back to Content Bank."
- When status changed from Posted → WIP/Ready for Review: post moves back to Content Bank

### Tab 3: Topic Pipeline

**What it shows:** pipeline_items that haven't been moved to posts yet

- Each item is an expandable accordion row
- Collapsed: topic name, rationale, priority badge (High/Medium/Low with colors)
- Expanded: hook preview (italic), caption summary, "Move to Content Bank →" button
- Moving an item: creates a new post with status=WIP, week=TBD, format=TBD, and the hook/caption prefilled. Deletes the pipeline_item.

### Tab 4: Strategy Notes

**What it shows:** Editable brand guideline cards

- Each card has a title and content
- Seeded with defaults on account creation (see DEFAULT_STRATEGY below)
- In the production app, make these editable inline (click to edit, save)

### Export System

**Two export buttons in header:** "Export for Google Sheets" and "Export for Google Docs"

**Flow:**
1. Click export button → enters selection mode
2. Checkboxes appear on all cards across all tabs (Content Bank, Posted, Pipeline)
3. "All" / "None" / "Copy & Export" / "Cancel" controls appear in header
4. On "Copy & Export": renders a full-screen preview of the content
5. "Select All" button highlights all text in preview
6. "Copy to Clipboard" button copies to clipboard
7. User pastes into Google Sheets (tab-separated for Sheets) or Google Docs (formatted plain text for Docs)
8. "Done" returns to main app

**Google Sheets format:** Tab-separated values with headers: Week, Topic, Post #, Format, Thumbnail, Hook, Caption, Voiceover, Visuals, Status, Target Date, Trending. Newlines in fields replaced with " | ".

**Google Docs format:** Plain text with headers, dividers (━━━), and labeled sections per post (HOOK, CAPTION, VOICEOVER, VISUALS, TRENDING).

### Persistence

- All data persists in Supabase Postgres
- Optimistic UI updates with background sync
- Real-time sync via Supabase Realtime (optional, for multi-device)

---

## Content Lock Rules (Critical Business Logic)

This is the most important behavioral rule in the app:

1. **WIP posts:** All content fields are freely editable
2. **Ready for Review posts:** Content fields are visually locked (blue tint, 🔒 icon, non-clickable). Week, Status, Format, and Target Date dropdowns remain editable. Content can only be edited by changing status back to WIP first
3. **Posted posts:** Same lock behavior as Ready for Review. Can be moved back to WIP or Ready for Review via dropdown
4. **Pipeline → Content Bank:** New posts default to WIP status
5. **AI/batch updates (if added later):** Must NEVER modify posts with status "Ready for Review" or "Posted." Only apply changes to WIP posts

---

## Default Seed Data

### Default Strategy Notes

```typescript
const DEFAULT_STRATEGY = [
  { title: "Brand Voice", content: "Polished but warm. Educational, never directive. No humor for now." },
  { title: "Visual Identity", content: "Watercolor/sketch illustrations. Warm palette. Talking-head for personal. @handle watermark." },
  { title: "3 Posts Per Week", content: "2 educational + 1 personal/lifestyle. Personal drives 2-3x engagement." },
  { title: "Hashtags 2026", content: "Instagram caps at 5. Categorize only. 3-5 niche. Keyword-rich captions matter more." },
  { title: "What Drives Reach", content: "Watch time (first 3s). Saves/shares. Keywords. On-screen text. Early engagement. 3x/week." },
  { title: "Guardrails", content: "No medical advice. No patient/consultation/appointment refs. Educational only." },
  { title: "Status Workflow", content: "WIP → edit freely. Ready for Review → content locked. Posted → archived (can move back). Pipeline → defaults to WIP." },
  { title: "Exporting", content: "Google Sheets: tab-separated paste. Google Docs: formatted text paste." },
];
```

---

## Design Tokens

Extracted from the prototype for Tailwind config:

```typescript
// tailwind.config.ts extend
colors: {
  brand: {
    cream:    '#FAF5EE',
    sand:     '#F0E8DD',
    warm:     '#E8DDD0',
    border:   '#D4C5B5',
    muted:    '#9B8B7A',
    text:     '#5C4A3A',
    dark:     '#3A2E24',
    darkest:  '#2C2218',
    gold:     '#C4956A',
    goldDark: '#A87B52',
  },
  status: {
    wipBg:    '#FEF3C7', wipText:    '#92400E', wipBorder:    '#F59E0B',
    reviewBg: '#DBEAFE', reviewText: '#1E40AF', reviewBorder: '#3B82F6',
    postedBg: '#D1FAE5', postedText: '#065F46', postedBorder: '#10B981',
  },
},
fontFamily: {
  display: ['"Source Serif 4"', 'Georgia', 'serif'],
  body:    ['"DM Sans"', 'sans-serif'],
},
```

---

## File Structure (Recommended)

```
content-studio/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Redirect to /dashboard or /login
│   ├── login/page.tsx          # Auth page
│   └── dashboard/
│       ├── page.tsx            # Main app shell with tabs
│       ├── components/
│       │   ├── PostCard.tsx
│       │   ├── PostModal.tsx
│       │   ├── EditField.tsx   # Isolated edit component (cursor-safe)
│       │   ├── PipelineItem.tsx
│       │   ├── StrategyCard.tsx
│       │   ├── ExportOverlay.tsx
│       │   └── Header.tsx
│       └── hooks/
│           ├── usePosts.ts     # Supabase CRUD for posts
│           ├── usePipeline.ts  # Supabase CRUD for pipeline
│           └── useStrategy.ts  # Supabase CRUD for strategy
├── lib/
│   ├── supabase.ts             # Supabase client init
│   ├── constants.ts            # FORMATS, WEEKS, STATUSES, colors
│   └── types.ts                # TypeScript interfaces
├── supabase/
│   └── migrations/
│       └── 001_initial.sql     # Schema from this doc
├── public/
├── tailwind.config.ts
├── package.json
└── .env.local                  # NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## TypeScript Interfaces

```typescript
interface Post {
  id: string;
  user_id: string;
  week: string;
  topic: string;
  post_number: string;
  format: string;
  thumbnail_text: string;
  hook: string;
  caption: string;
  voiceover: string;
  slides_description: string;
  status: 'WIP' | 'Ready for Review' | 'Posted';
  target_date: string | null;
  trending_ref: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface PipelineItem {
  id: string;
  user_id: string;
  topic: string;
  priority: 'High' | 'Medium' | 'Low';
  rationale: string;
  hook: string;
  caption_summary: string;
  sort_order: number;
  created_at: string;
}

interface StrategyNote {
  id: string;
  user_id: string;
  title: string;
  content: string;
  sort_order: number;
}
```

---

## Supabase Setup (Free Tier)

1. Create project at supabase.com
2. Go to SQL Editor, paste the full schema from `001_initial.sql` (provided separately)
3. Enable RLS on all three tables (the SQL above does this)
4. Go to Auth > Settings:
   - Enable Email/Password auth
   - Optionally enable magic link
5. Copy your project URL and anon key to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
6. Install `@supabase/supabase-js` and `@supabase/auth-helpers-nextjs`

## Vercel Deployment

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables (same as `.env.local`)
4. Deploy — zero config needed for Next.js on Vercel

---

## Future Enhancements (Not in MVP)

- Drag-and-drop reordering within weeks
- Image/media upload to Supabase Storage (attach visuals to posts)
- AI-powered caption generation via Anthropic API
- Calendar view (visual week layout)
- Instagram API integration for direct posting
- Team collaboration (share content bank with a social media manager)
- Analytics tracking (which post formats perform best)
- Notification system (reminders to post)
- Mobile-responsive PWA

---

## Prototype Reference

The working prototype is `content-bank.jsx` — a single-file React component that runs in Claude's artifact environment. It contains all 12 seed posts, 12 pipeline items, and the complete UI. Use it as the definitive reference for:

- Exact card layout and spacing
- Modal field ordering and edit behavior
- Status badge colors and lock behavior
- Export preview rendering
- Tab structure and filtering

The prototype uses `window.storage` for persistence. Replace with Supabase client calls in production.
