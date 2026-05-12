import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      year_published INT,
      cover_url TEXT,
      review TEXT,
      rating NUMERIC(2,1),
      status TEXT NOT NULL DEFAULT 'queued',
      collection TEXT,
      limbus_sinner TEXT,
      limbus_color TEXT,
      date_read DATE,
      display_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL DEFAULT 'admin',
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS books_collection_idx ON books(collection)`;
  await sql`CREATE INDEX IF NOT EXISTS books_status_idx ON books(status)`;

  // Newer columns added after initial release.
  await sql`ALTER TABLE books ADD COLUMN IF NOT EXISTS reviewer_name TEXT`;
  await sql`ALTER TABLE books ADD COLUMN IF NOT EXISTS review_published BOOLEAN NOT NULL DEFAULT TRUE`;
  await sql`ALTER TABLE books ADD COLUMN IF NOT EXISTS summary TEXT`;

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
