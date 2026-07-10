import { getAllBooks, getSiteContentMap, sql } from "@/lib/db";
import type { Book } from "@/lib/db";

export type LcData = {
  limbus: Book[];
  about: string;
  contributors: string[];
};

// One fetch shared by all limbus/about restyle drafts — same live content
// as the real pages, so the comparison is purely about styling.
export async function getLcData(): Promise<LcData> {
  const [books, content, guestRows] = await Promise.all([
    getAllBooks(),
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
  const limbus = books
    .filter((b) => b.collection === "limbus" && b.review_published !== false)
    .sort((a, b) => a.display_order - b.display_order);
  const guests = (guestRows as { reviewer_name: string }[]).map(
    (r) => r.reviewer_name
  );
  return {
    limbus,
    about: content.about ?? "",
    contributors: ["Kyle", ...guests],
  };
}
