import { getAllBooks, getSiteContentMap } from "@/lib/db";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { WiderLibrarySection } from "@/components/WiderLibrarySection";

export const revalidate = 60;

export default async function HomePage() {
  const [books, content] = await Promise.all([
    getAllBooks(),
    getSiteContentMap(),
  ]);

  const otherBooks = books.filter(
    (b) => b.collection !== "limbus" && b.review_published !== false
  );

  return (
    <>
      <CosmicBackground />
      <Hero
        name={content.hero_name ?? "Sunday's Shelf"}
        tagline={content.hero_tagline ?? "Book reviews and recommendations"}
      />
      <Intro text={content.intro ?? ""} />
      <WiderLibrarySection books={otherBooks} />
    </>
  );
}
