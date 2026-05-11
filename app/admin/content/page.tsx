import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { getSiteContentMap } from "@/lib/db";
import { ContentForm } from "./ContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  if (!(await isLoggedIn())) redirect("/admin/login");
  const content = await getSiteContentMap();
  return (
    <ContentForm
      initial={{
        hero_name: content.hero_name ?? "Sunday's Shelf",
        hero_tagline: content.hero_tagline ?? "Book reviews and recommendations",
        intro: content.intro ?? "",
        about: content.about ?? "",
      }}
    />
  );
}
