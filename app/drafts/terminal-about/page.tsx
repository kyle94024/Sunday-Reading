import { VT323, Space_Grotesk } from "next/font/google";
import { getLcData } from "../fam-lc/data";
import { DraftBar } from "../DraftBar";
import { AboutFam } from "../fam-lc/AboutFam";
import "../zf/zf.css";
import "../fam-lc/lcfam.css";

const pixel = VT323({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · About (Terminal)" };

export default async function TerminalAboutPage() {
  const data = await getLcData();
  return (
    <div className={`${pixel.variable} ${grotesk.variable}`}>
      <AboutFam theme="terminal" text={data.about} contributors={data.contributors} />
      <DraftBar />
    </div>
  );
}
