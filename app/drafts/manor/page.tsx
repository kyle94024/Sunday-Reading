import { IM_Fell_English } from "next/font/google";
import { getDraftData } from "../data";
import { DraftBar } from "../DraftBar";
import { ManorDraft } from "./ManorDraft";
import "./manor.css";

const fell = IM_Fell_English({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fell",
});

export const revalidate = 60;
export const metadata = { title: "Draft IV · Ex Libris" };

export default async function ManorPage() {
  const data = await getDraftData();
  return (
    <div className={fell.variable}>
      <ManorDraft {...data} />
      <DraftBar />
    </div>
  );
}
