import { VT323, Space_Grotesk } from "next/font/google";
import { getLcData } from "../fam-lc/data";
import { DraftBar } from "../DraftBar";
import { LimbusFam } from "../fam-lc/LimbusFam";
import "../zf/zf.css";
import "../fam-lc/lcfam.css";

const pixel = VT323({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · Mephistopheles Terminal" };

export default async function TerminalPage() {
  const data = await getLcData();
  return (
    <div className={`${pixel.variable} ${grotesk.variable}`}>
      <LimbusFam theme="terminal" books={data.limbus} />
      <DraftBar />
    </div>
  );
}
