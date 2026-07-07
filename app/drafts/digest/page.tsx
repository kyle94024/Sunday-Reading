import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { NewsFam } from "../fam-news/NewsFam";
import "../zf/zf.css";
import "../fam-news/newsfam.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · Reader's Digestif" };

export default async function DigestPage() {
  const data = await getDraftData();
  return (
    <div className={`${archivo.variable} ${grotesk.variable}`}>
      <NewsFam theme="digest" {...data} />
      <DraftBar />
    </div>
  );
}
