import { Baloo_2, Space_Grotesk } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { StickFam } from "../fam-stick/StickFam";
import "../zf/zf.css";
import "../fam-stick/stickfam.css";

const baloo = Baloo_2({ subsets: ["latin"], variable: "--font-baloo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · Bunny Mail" };

export default async function BunnyPage() {
  const data = await getDraftData();
  return (
    <div className={`${baloo.variable} ${grotesk.variable}`}>
      <StickFam theme="bunny" {...data} />
      <DraftBar />
    </div>
  );
}
