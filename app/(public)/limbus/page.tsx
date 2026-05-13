import { getAllBooks } from "@/lib/db";
import { LimbusBackground } from "@/components/LimbusBackground";
import { LimbusSection } from "@/components/LimbusSection";

export const revalidate = 60;
export const metadata = {
  title: "Limbus Company · Sunday's Shelf",
  description:
    "The fourteen literary works behind Project Moon's Limbus Company.",
};

export default async function LimbusPage() {
  const books = await getAllBooks();
  const limbusBooks = books.filter((b) => b.collection === "limbus");

  return (
    <>
      <LimbusBackground />
      <LimbusSection books={limbusBooks} />
    </>
  );
}
