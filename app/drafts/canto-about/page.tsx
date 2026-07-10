import { Pirata_One, Space_Grotesk } from "next/font/google";
import { getLcData } from "../fam-lc/data";
import { DraftBar } from "../DraftBar";
import { AboutFam } from "../fam-lc/AboutFam";
import "../zf/zf.css";
import "../fam-lc/lcfam.css";

const gothic = Pirata_One({ weight: "400", subsets: ["latin"], variable: "--font-gothic" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · About (Cantos)" };

export default async function CantoAboutPage() {
  const data = await getLcData();
  return (
    <div className={`${gothic.variable} ${grotesk.variable}`}>
      <AboutFam theme="canto" text={data.about} contributors={data.contributors} />
      <DraftBar />
    </div>
  );
}
