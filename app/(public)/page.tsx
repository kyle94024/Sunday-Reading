import { Archivo_Black, Space_Grotesk, Caveat } from "next/font/google";
import { getDraftData } from "@/app/drafts/data";
import { ScrapFam } from "@/app/drafts/fam-scrap/ScrapFam";
import "@/app/drafts/zf/zf.css";
import "@/app/drafts/fam-scrap/scrapfam.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const revalidate = 60;

export default async function HomePage() {
  const data = await getDraftData();
  return (
    <div className={`${archivo.variable} ${grotesk.variable} ${hand.variable}`}>
      <ScrapFam theme="lilac" {...data} />
    </div>
  );
}
