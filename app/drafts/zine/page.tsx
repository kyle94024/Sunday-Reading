import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { ZineDraft } from "./ZineDraft";
import "./zine.css";

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const revalidate = 60;
export const metadata = { title: "Draft III · The Zine" };

export default async function ZinePage() {
  const data = await getDraftData();
  return (
    <div className={`${archivo.variable} ${grotesk.variable}`}>
      <ZineDraft {...data} />
      <DraftBar />
    </div>
  );
}
