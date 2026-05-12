import { getAllBooks, getSiteContentMap, sql } from "@/lib/db";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Contributors } from "@/components/Contributors";
import { LimbusSection } from "@/components/LimbusSection";
import { WiderLibrarySection } from "@/components/WiderLibrarySection";

export const revalidate = 60;

export default async function HomePage() {
  const [books, content, guestRows] = await Promise.all([
    getAllBooks(),
    getSiteContentMap(),
    sql`
      SELECT DISTINCT reviewer_name
      FROM books
      WHERE reviewer_name IS NOT NULL AND reviewer_name <> ''
      ORDER BY reviewer_name
    `,
  ]);

  const limbusBooks = books.filter((b) => b.collection === "limbus");
  const otherBooks = books.filter((b) => b.collection !== "limbus");
  const guests = (guestRows as { reviewer_name: string }[]).map(
    (r) => r.reviewer_name
  );
  const contributors = ["Kyle", ...guests];

  return (
    <>
      <Hero
        name={content.hero_name ?? "Sunday's Shelf"}
        tagline={content.hero_tagline ?? "Book reviews and recommendations"}
      />
      <Intro text={content.intro ?? ""} />
      <Contributors names={contributors} />
      <LimbusSection books={limbusBooks} />
      <WiderLibrarySection books={otherBooks} />
    </>
  );
}
