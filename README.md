# Sunday Reading

A personal reading website — book reviews and reflections in deep purple.

Built with Next.js (App Router), Tailwind CSS v4, Framer Motion, and a Neon Postgres database. Hosted on Vercel.

## Stack

- **Next.js 16** (App Router, React Server Components)
- **Tailwind CSS v4** (`@theme` tokens for the violet palette)
- **Motion / Framer Motion** for entrance, hover, and expand animations
- **Neon Serverless Postgres** (`@neondatabase/serverless`) for books + site copy
- **OpenAI Images (gpt-image-1)** for the cosmic background art (one-shot script, output committed under `public/bg/`)

## Local development

```bash
# 1. Copy env template and fill in credentials
cp .env.example .env.local

# 2. Install
npm install

# 3. Create tables and seed initial content (Limbus 12 + intro/about copy)
npm run db:migrate
npm run db:seed

# 4. (Optional) Re-generate background art (uses OpenAI credits)
npm run bg:generate          # skips if files exist
FORCE=1 npm run bg:generate  # regenerate

# 5. Run dev server
npm run dev
```

Required env vars in `.env.local`:

```
DATABASE_URL='postgresql://...neon.tech/neondb?sslmode=require'
OPENAI_API_KEY='sk-...'
```

`OPENAI_API_KEY` is only needed to (re-)generate background art via the local script — it is never read by the deployed site.

## Project structure

```
app/
  layout.tsx          root layout — fonts, nav, cosmic background
  page.tsx            home — hero + intro + Limbus + wider library
  about/page.tsx      profile / about Sunday
components/
  CosmicBackground    nebula image + aurora blobs + parallax + twinkling stars
  Navigation          fixed header w/ blur on scroll
  Hero                Italiana wordmark + tagline
  Intro               drop-cap markdown prose
  LimbusSection       crimson veil + train marquee + sinner-tinted cards
  WiderLibrarySection grid of non-Limbus books
  BookCard            expandable card with status, rating, review
  BookCover           stylized placeholder cover (or real image)
  RatingPips          rounded pip rating display
  TrainGlyph          decorative SVG train
  AboutContent        profile column + body + stats
lib/db.ts             Neon client + typed query helpers
scripts/
  migrate.ts          create tables
  seed.ts             insert Limbus 12 + site copy
  generate-bg.ts      OpenAI image generation
public/bg/            cosmos.png, limbus-veil.png, starfield.png
```

## Editing content

Most text lives in the Neon DB so it can be tweaked without redeploying:

- Intro paragraph → `site_content` row keyed `intro`
- About body → `site_content` row keyed `about`
- Hero name / tagline → `hero_name`, `hero_tagline`
- Books → `books` table (slug, title, author, year_published, review, rating, status, collection, limbus_sinner, limbus_color, cover_url)

You can edit rows directly in the Neon console, or rerun `npm run db:seed` after editing `scripts/seed.ts` (the seed uses `ON CONFLICT DO UPDATE` so it's safe to re-run).

To add a new non-Limbus book, insert a row with `collection = NULL` (or anything other than `'limbus'`).

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel, **Import Project** from the GitHub repo. Framework should auto-detect as Next.js.
3. Add environment variables in **Settings → Environment Variables**:
   - `DATABASE_URL` (the Neon pooled connection string)
4. Deploy. The pages use `export const revalidate = 60` so changes in the DB show up within a minute without redeploying.
