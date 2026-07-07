import { Cinzel } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { AtlasDraft } from "./AtlasDraft";
import "./atlas.css";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

export const revalidate = 60;
export const metadata = { title: "Draft II · The Celestial Atlas" };

export default async function AtlasPage() {
  const data = await getDraftData();
  return (
    <div className={cinzel.variable}>
      <AtlasDraft {...data} />
      <DraftBar />
    </div>
  );
}
