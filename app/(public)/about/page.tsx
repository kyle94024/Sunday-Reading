import { getSiteContentMap, sql } from "@/lib/db";
import { AboutBackground } from "@/components/AboutBackground";
import { AboutContent } from "@/components/AboutContent";

export const revalidate = 60;

export default async function AboutPage() {
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
  const contributors = ["Kyle", ...guests];
  return (
    <>
      <AboutBackground />
      <AboutContent text={content.about ?? ""} contributors={contributors} />
    </>
  );
}
