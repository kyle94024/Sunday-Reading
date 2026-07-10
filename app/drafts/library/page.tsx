import { Space_Grotesk } from "next/font/google";
import { getLcData } from "../fam-lc/data";
import { DraftBar } from "../DraftBar";
import { LimbusFam } from "../fam-lc/LimbusFam";
import "../zf/zf.css";
import "../fam-lc/lcfam.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · The Library" };

export default async function LibraryPage() {
  const data = await getLcData();
  return (
    <div className={grotesk.variable}>
      <LimbusFam theme="library" books={data.limbus} />
      <DraftBar />
    </div>
  );
}
