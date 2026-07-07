import { Baloo_2, Space_Grotesk } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { StickersDraft } from "./StickersDraft";
import "../zf/zf.css";
import "./stickers.css";

const baloo = Baloo_2({ subsets: ["latin"], variable: "--font-baloo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · Sticker Club" };

export default async function StickersPage() {
  const data = await getDraftData();
  return (
    <div className={`${baloo.variable} ${grotesk.variable}`}>
      <StickersDraft {...data} />
      <DraftBar />
    </div>
  );
}
