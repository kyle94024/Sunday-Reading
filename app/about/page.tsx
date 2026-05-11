import { getSiteContentMap } from "@/lib/db";
import { AboutContent } from "@/components/AboutContent";

export const revalidate = 60;

export default async function AboutPage() {
  const content = await getSiteContentMap();
  return <AboutContent text={content.about ?? ""} name={content.hero_name ?? "Sunday"} />;
}
