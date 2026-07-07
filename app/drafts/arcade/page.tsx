import { Archivo_Black, Space_Grotesk, VT323 } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { ArcadeDraft } from "./ArcadeDraft";
import "../zf/zf.css";
import "./arcade.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const pixel = VT323({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });

export const revalidate = 60;
export const metadata = { title: "Draft · Night Arcade" };

export default async function ArcadePage() {
  const data = await getDraftData();
  return (
    <div className={`${archivo.variable} ${grotesk.variable} ${pixel.variable}`}>
      <ArcadeDraft {...data} />
      <DraftBar />
    </div>
  );
}
