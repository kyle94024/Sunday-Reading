import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const sql = neon(process.env.DATABASE_URL);

export type BookStatus = "queued" | "reading" | "read";

export type Book = {
  id: number;
  slug: string;
  title: string;
  author: string;
  year_published: number | null;
  cover_url: string | null;
  review: string | null;
  rating: number | null;
  status: BookStatus;
  collection: string | null;
  limbus_sinner: string | null;
  limbus_color: string | null;
  date_read: string | null;
  display_order: number;
  reviewer_name: string | null;
  review_published: boolean;
};

export async function getAllBooks(): Promise<Book[]> {
  const rows = (await sql`
    SELECT id, slug, title, author, year_published, cover_url, review,
           rating, status, collection, limbus_sinner, limbus_color,
           date_read::text, display_order, reviewer_name, review_published
    FROM books
    ORDER BY display_order ASC, id ASC
  `) as Book[];
  return rows;
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const rows = (await sql`
    SELECT id, slug, title, author, year_published, cover_url, review,
           rating, status, collection, limbus_sinner, limbus_color,
           date_read::text, display_order, reviewer_name, review_published
    FROM books WHERE slug = ${slug} LIMIT 1
  `) as Book[];
  return rows[0] ?? null;
}

export async function getSiteContent(key: string): Promise<string | null> {
  const rows = (await sql`
    SELECT value FROM site_content WHERE key = ${key} LIMIT 1
  `) as { value: string }[];
  return rows[0]?.value ?? null;
}

export async function getSiteContentMap(): Promise<Record<string, string>> {
  const rows = (await sql`
    SELECT key, value FROM site_content
  `) as { key: string; value: string }[];
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}
