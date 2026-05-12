import { getAllBooks, getSiteContentMap } from "@/lib/db";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { LimbusSection } from "@/components/LimbusSection";
import { WiderLibrarySection } from "@/components/WiderLibrarySection";

export const revalidate = 60;

export default async function HomePage() {
  const [books, content] = await Promise.all([
    getAllBooks(),
    getSiteContentMap(),
  ]);

  const limbusBooks = books.filter((b) => b.collection === "limbus");
  const otherBooks = books.filter((b) => b.collection !== "limbus");

  return (
    <>
      <CosmicBackground />
      <Hero
        name={content.hero_name ?? "Sunday's Shelf"}
        tagline={content.hero_tagline ?? "Book reviews and recommendations"}
      />
      <Intro text={content.intro ?? ""} />
      <LimbusSection books={limbusBooks} />
      <WiderLibrarySection books={otherBooks} />
    </>
  );
}
