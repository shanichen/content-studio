# Quick Start: Content Studio

## 1. Set Up Supabase (5 min)

1. Go to [supabase.com](https://supabase.com) → New Project (free tier)
2. Open SQL Editor
3. Paste the entire contents of `001_initial.sql` and run it
4. Go to Settings → API → Copy your **Project URL** and **anon public key**

## 2. Set Up Next.js (5 min)

```bash
npx create-next-app@latest content-studio --typescript --tailwind --app --src-dir
cd content-studio
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## 3. Build

Use `README.md` as the complete feature spec. Use `content-bank.jsx` as the design reference.

Key files to create:
- `lib/supabase.ts` — client init
- `lib/constants.ts` — FORMATS, WEEKS, STATUSES, colors
- `lib/types.ts` — Post, PipelineItem, StrategyNote interfaces
- `app/dashboard/page.tsx` — main app (4 tabs)
- Components: PostCard, PostModal, EditField, PipelineItem, ExportOverlay

## 4. Deploy to Vercel

```bash
git init && git add . && git commit -m "init"
# Push to GitHub, connect to Vercel, add env vars, deploy
```

## Critical Implementation Notes

- **EditField component** must manage its OWN local state (useState inside the component). Parent updates only on Save, not on every keystroke. This prevents cursor jumping on delete/backspace.
- **Content lock logic**: check `status !== 'WIP'` before allowing content field edits. Week/Status/Format/Target Date are always editable.
- **Pipeline → Content Bank**: new post gets `status: 'WIP'`, `week: 'TBD'`, `format: 'TBD'`. Pipeline item is deleted.
- **Posted tab**: filtered by `status = 'Posted'`. Status can be changed back to WIP or Ready for Review.
- **Export**: renders content to a full-screen overlay, user copies to clipboard and pastes into Google Sheets/Docs. No file downloads needed.

## Files in This Package

| File | Purpose |
|------|---------|
| `README.md` | Full product spec, data model, feature list, architecture |
| `001_initial.sql` | Complete Supabase schema — paste into SQL Editor |
| `QUICKSTART.md` | This file |
| `content-bank.jsx` | Working prototype (design reference, keep as-is) |
