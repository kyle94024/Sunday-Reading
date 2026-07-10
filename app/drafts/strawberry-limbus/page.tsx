import { Archivo_Black, Space_Grotesk, Caveat } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { LimbusScrap } from "../fam-scrap/LimbusScrap";
import "../zf/zf.css";
import "../fam-scrap/scrapfam.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const revalidate = 60;
export const metadata = { title: "Draft · Limbus (Strawberry)" };

export default async function StrawberryLimbusPage() {
  const data = await getDraftData();
  return (
    <div className={`${archivo.variable} ${grotesk.variable} ${hand.variable}`}>
      <LimbusScrap
        theme="berry"
        books={data.limbus}
        tagline="the fourteen literary works behind Project Moon's roster of sinners"
      />
      <DraftBar />
    </div>
  );
}
