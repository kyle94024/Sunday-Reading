import { Archivo_Black, Space_Grotesk, Caveat } from "next/font/google";
import { getAboutData } from "@/app/drafts/data";
import { AboutScrap } from "@/app/drafts/fam-scrap/AboutScrap";
import "@/app/drafts/zf/zf.css";
import "@/app/drafts/fam-scrap/scrapfam.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const revalidate = 60;
export const metadata = { title: "About · Sunday's Shelf" };

export default async function AboutPage() {
  const data = await getAboutData();
  return (
    <div className={`${archivo.variable} ${grotesk.variable} ${hand.variable}`}>
      <AboutScrap
        theme="lilac"
        text={data.about}
        contributors={data.contributors}
        routes={{ home: "/", limbus: "/limbus", about: "/about" }}
        showDrafts={false}
      />
    </div>
  );
}
