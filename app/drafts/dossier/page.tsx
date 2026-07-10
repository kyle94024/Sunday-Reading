import { Special_Elite, Courier_Prime } from "next/font/google";
import { getLcData } from "../fam-lc/data";
import { DraftBar } from "../DraftBar";
import { LimbusFam } from "../fam-lc/LimbusFam";
import "../zf/zf.css";
import "../fam-lc/lcfam.css";

const typewriter = Special_Elite({ weight: "400", subsets: ["latin"], variable: "--font-typewriter" });
const courier = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-courier" });

export const revalidate = 60;
export const metadata = { title: "Draft · Case Files" };

export default async function DossierPage() {
  const data = await getLcData();
  return (
    <div className={`${typewriter.variable} ${courier.variable}`}>
      <LimbusFam theme="dossier" books={data.limbus} />
      <DraftBar />
    </div>
  );
}
