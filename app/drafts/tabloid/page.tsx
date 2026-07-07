import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { TabloidDraft } from "./TabloidDraft";
import "../zf/zf.css";
import "./tabloid.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · Midnight Tabloid" };

export default async function TabloidPage() {
  const data = await getDraftData();
  return (
    <div className={`${archivo.variable} ${grotesk.variable}`}>
      <TabloidDraft {...data} />
      <DraftBar />
    </div>
  );
}
