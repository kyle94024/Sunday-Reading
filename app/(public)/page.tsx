import { getAllBooks, getSiteContentMap } from "@/lib/db";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { CoverCarousel } from "@/components/CoverCarousel";
import { WiderLibrarySection } from "@/components/WiderLibrarySection";

export const revalidate = 60;

export default async function HomePage() {
  const [books, content] = await Promise.all([
    getAllBooks(),
    getSiteContentMap(),
  ]);

  // "All book reviews": every published book outside Limbus, PLUS Limbus
  // books that have an actual written review. Limbus books without a
  // review stay scoped to the /limbus shelf.
  const otherBooks = books.filter((b) => {
    if (b.review_published === false) return false;
    if (b.collection !== "limbus") return true;
    return !!b.review && b.review.trim().length > 0;
  });

  const limbusBooks = books
    .filter((b) => b.collection === "limbus")
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <>
      <CosmicBackground />
      <Hero
        name={content.hero_name ?? "Sunday's Shelf"}
        tagline={content.hero_tagline ?? "Book reviews and recommendations"}
      />
      <Intro text={content.intro ?? ""} />
      <CoverCarousel
        books={limbusBooks}
        eyebrow="The point of departure"
        title="The Limbus Fourteen"
        href="/limbus"
      />
      <WiderLibrarySection books={otherBooks} />
    </>
  );
}
