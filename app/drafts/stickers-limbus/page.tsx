import { Baloo_2, Space_Grotesk } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { LimbusStick } from "../fam-stick/LimbusStick";
import "../zf/zf.css";
import "../fam-stick/stickfam.css";

const baloo = Baloo_2({ subsets: ["latin"], variable: "--font-baloo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · Limbus (Sticker Club)" };

export default async function StickersLimbusPage() {
  const data = await getDraftData();
  return (
    <div className={`${baloo.variable} ${grotesk.variable}`}>
      <LimbusStick
        theme="mix"
        books={data.limbus}
        tagline="the fourteen literary works behind Project Moon's roster of sinners"
      />
      <DraftBar />
    </div>
  );
}
