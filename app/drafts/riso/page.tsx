import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { RisoDraft } from "./RisoDraft";
import "../zf/zf.css";
import "./riso.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · Riso Poster" };

export default async function RisoPage() {
  const data = await getDraftData();
  return (
    <div className={`${archivo.variable} ${grotesk.variable}`}>
      <RisoDraft {...data} />
      <DraftBar />
    </div>
  );
}
