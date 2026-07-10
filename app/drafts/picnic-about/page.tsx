import { Archivo_Black, Space_Grotesk, Caveat } from "next/font/google";
import { getAboutData } from "../data";
import { DraftBar } from "../DraftBar";
import { AboutScrap } from "../fam-scrap/AboutScrap";
import "../zf/zf.css";
import "../fam-scrap/scrapfam.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const revalidate = 60;
export const metadata = { title: "Draft · About (Picnic)" };

export default async function PicnicAboutPage() {
  const data = await getAboutData();
  return (
    <div className={`${archivo.variable} ${grotesk.variable} ${hand.variable}`}>
      <AboutScrap theme="picnic" text={data.about} contributors={data.contributors} />
      <DraftBar />
    </div>
  );
}
