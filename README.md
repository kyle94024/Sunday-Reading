# Sunday's Shelf

A personal reading website — book reviews and reflections in deep purple.

Built with Next.js (App Router), Tailwind CSS v4, Framer Motion, and a Neon Postgres database. Hosted on Vercel.

## Stack

- **Next.js 16** (App Router, React Server Components, Server Actions)
- **Tailwind CSS v4** (`@theme` tokens for the violet palette)
- **Motion / Framer Motion** for entrance, hover, page-transition, and expand animations
- **Neon Serverless Postgres** (`@neondatabase/serverless`) for books, site copy, and admin reads/writes
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
OPENAI_API_KEY='sk-...'         # local-only, for bg art generation
ADMIN_PASSWORD='choose-anything' # what you'll type at /admin/login
ADMIN_SECRET='32-byte-hex'        # HMAC key for the admin session cookie
```

Generate a fresh `ADMIN_SECRET` with `openssl rand -hex 32` (or `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).

`OPENAI_API_KEY` is only needed to (re-)generate background art via the local script — it is never read by the deployed site.

## Editing content (admin)

Visit `/admin/login`, enter `ADMIN_PASSWORD`, and you get:

- **Dashboard** (`/admin`) — counts (Limbus / other / read / reading / queued) plus links into Books and Site copy.
- **Books** (`/admin/books`) — table of every entry with filter tabs (All / Limbus / Other). Click any row to edit; the form covers title, author, year, cover URL, status, rating, date read, collection (`limbus` or none), Limbus sinner (with a datalist of the 12), accent color (with a real color picker), display order, slug, and the full markdown review with an inline preview pane. Delete has a confirm dialog. *New book* drops you into the same form, blank.
- **Site copy** (`/admin/content`) — hero name, hero tagline, intro markdown, and about markdown, each with a markdown preview toggle. The hint reminds you that `[*Through Patches of Violet*](#tpov)` is the special hash that toggles the Spotify embed on the intro.

Auth is a single password plus an HMAC-signed cookie ([lib/auth.ts](lib/auth.ts)) — no external auth provider, no DB user table. Sessions last two weeks. Sign out clears the cookie.

After any write, the admin server action calls `revalidatePath('/')` and `revalidatePath('/about')` so the public site picks up the change within seconds.

## Project structure

```
app/
  layout.tsx                   root layout — fonts + html shell
  globals.css                  tailwind + theme tokens
  icon.svg                     favicon
  (public)/
    layout.tsx                 cosmic background, BookShelfNav, footer
    page.tsx                   home — hero + intro + Limbus + wider library
    about/page.tsx             profile / about Sunday
  admin/
    admin.css                  admin-only form styles
    layout.tsx                 admin chrome (logged-in header + sign out)
    actions.ts                 server actions: login, logout, CRUD, content
    page.tsx                   dashboard with counts
    login/{page,LoginForm}.tsx
    books/
      page.tsx                 list w/ filter tabs
      BookForm.tsx             reusable form (new + edit)
      new/page.tsx
      [id]/page.tsx
    content/
      page.tsx                 site_content editor wrapper
      ContentForm.tsx          markdown editor + previews
components/
  CosmicBackground             nebula image + aurora blobs + parallax + twinkling stars + scroll drift
  BookShelfNav                 outlined book spines on a shelf; hover tilt; click → fall + wipe + page transition
  Hero, Intro                  home-page sections
  LimbusSection, WiderLibrarySection
  BookCard, BookCover, RatingPips, TrainGlyph
  AboutContent
lib/
  auth.ts                      HMAC cookie session helpers (server-only)
  db.ts                        Neon client + typed query helpers
scripts/
  migrate.ts                   create tables
  seed.ts                      insert Limbus 12 + site copy
  generate-bg.ts               OpenAI image generation
public/bg/                     cosmos.png, limbus-veil.png, starfield.png
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel, **Import Project** from the GitHub repo. Framework should auto-detect as Next.js.
3. Add environment variables in **Settings → Environment Variables**:
   - `DATABASE_URL` (Neon pooled connection string)
   - `ADMIN_PASSWORD` (admin login password — pick something you'll remember)
   - `ADMIN_SECRET` (random 32-byte hex — `openssl rand -hex 32`)
4. Deploy. Public pages use `export const revalidate = 60`, and admin writes call `revalidatePath` so changes propagate within seconds.

## Schema

```sql
CREATE TABLE books (
  id              SERIAL PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  author          TEXT NOT NULL,
  year_published  INT,
  cover_url       TEXT,
  review          TEXT,                 -- markdown
  rating          NUMERIC(2,1),         -- 0–5
  status          TEXT NOT NULL DEFAULT 'queued', -- queued | reading | read
  collection      TEXT,                 -- 'limbus' or NULL
  limbus_sinner   TEXT,
  limbus_color    TEXT,                 -- hex string, used for card accents
  date_read       DATE,
  display_order   INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE site_content (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Seeded keys: intro, about, hero_name, hero_tagline
```
