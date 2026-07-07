import { Special_Elite, Courier_Prime, Caveat } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { CatalogDraft } from "./CatalogDraft";
import "./catalog.css";

const typewriter = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-typewriter",
});
const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});
const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
});

export const revalidate = 60;
export const metadata = { title: "Draft I · The Card Catalog" };

export default async function CatalogPage() {
  const data = await getDraftData();
  return (
    <div className={`${typewriter.variable} ${courier.variable} ${hand.variable}`}>
      <CatalogDraft {...data} />
      <DraftBar />
    </div>
  );
}
