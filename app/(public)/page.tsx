import { getAllBooks, getSiteContentMap } from "@/lib/db";
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
