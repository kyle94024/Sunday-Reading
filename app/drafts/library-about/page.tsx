import { Space_Grotesk } from "next/font/google";
import { getLcData } from "../fam-lc/data";
import { DraftBar } from "../DraftBar";
import { AboutFam } from "../fam-lc/AboutFam";
import "../zf/zf.css";
import "../fam-lc/lcfam.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · About (Library)" };

export default async function LibraryAboutPage() {
  const data = await getLcData();
  return (
    <div className={grotesk.variable}>
      <AboutFam theme="library" text={data.about} contributors={data.contributors} />
      <DraftBar />
    </div>
  );
}
