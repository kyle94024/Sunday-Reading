import { Pirata_One, Space_Grotesk } from "next/font/google";
import { getLcData } from "../fam-lc/data";
import { DraftBar } from "../DraftBar";
import { LimbusFam } from "../fam-lc/LimbusFam";
import "../zf/zf.css";
import "../fam-lc/lcfam.css";

const gothic = Pirata_One({ weight: "400", subsets: ["latin"], variable: "--font-gothic" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const revalidate = 60;
export const metadata = { title: "Draft · The Fourteen Cantos" };

export default async function CantoPage() {
  const data = await getLcData();
  return (
    <div className={`${gothic.variable} ${grotesk.variable}`}>
      <LimbusFam theme="canto" books={data.limbus} />
      <DraftBar />
    </div>
  );
}
