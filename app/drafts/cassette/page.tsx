import { Archivo_Black, Space_Grotesk, Caveat } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { CassetteDraft } from "./CassetteDraft";
import "../zf/zf.css";
import "./cassette.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const revalidate = 60;
export const metadata = { title: "Draft · Mixtape" };

export default async function CassettePage() {
  const data = await getDraftData();
  return (
    <div className={`${archivo.variable} ${grotesk.variable} ${hand.variable}`}>
      <CassetteDraft {...data} />
      <DraftBar />
    </div>
  );
}
