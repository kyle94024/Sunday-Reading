import { getAllBooks, getSiteContentMap, sql } from "@/lib/db";
import type { Book } from "@/lib/db";

export type DraftData = {
  name: string;
  tagline: string;
  intro: string;
  limbus: Book[];
  reviews: Book[];
  books: Book[]; // everything, for sidebar widgets (now-reading, stats…)
};

// About-page content for page-restyle drafts: the markdown bio plus the
// contributor roster (same query the real /about runs).
export async function getAboutData(): Promise<{ about: string; contributors: string[] }> {
  const [content, guestRows] = await Promise.all([
    getSiteContentMap(),
    sql`
      SELECT DISTINCT reviewer_name
      FROM books
      WHERE reviewer_name IS NOT NULL
        AND reviewer_name <> ''
        AND review_published = TRUE
      ORDER BY reviewer_name
    `,
  ]);
  const guests = (guestRows as { reviewer_name: string }[]).map(
    (r) => r.reviewer_name
  );
  return { about: content.about ?? "", contributors: ["Kyle", ...guests] };
}

// One fetch shape shared by every draft page so all four render the same
// live content — the comparison is purely about styling.
export async function getDraftData(): Promise<DraftData> {
  const [books, content] = await Promise.all([
    getAllBooks(),
    getSiteContentMap(),
  ]);
  const limbus = books
    .filter((b) => b.collection === "limbus")
    .sort((a, b) => a.display_order - b.display_order);
  const reviews = books.filter(
    (b) =>
      b.review_published !== false &&
      !!b.review &&
      b.review.trim().length > 0
  );
  return {
    name: content.hero_name ?? "Sunday's Shelf",
    tagline: content.hero_tagline ?? "Book reviews and recommendations",
    intro: content.intro ?? "",
    limbus,
    reviews,
    books,
  };
}
