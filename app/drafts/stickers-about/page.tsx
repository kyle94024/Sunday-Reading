import { Baloo_2, Space_Grotesk } from "next/font/google";
import { getAboutData } from "../data";
import { DraftBar } from "../DraftBar";
import { AboutStick } from "../fam-stick/AboutStick";
import "../zf/zf.css";
import "../fam-stick/stickfam.css";

const baloo = Baloo_2({ subsets: ["latin"], variable: "--font-baloo" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · About (Sticker Club)" };

export default async function StickersAboutPage() {
  const data = await getAboutData();
  return (
    <div className={`${baloo.variable} ${grotesk.variable}`}>
      <AboutStick theme="mix" text={data.about} contributors={data.contributors} />
      <DraftBar />
    </div>
  );
}
