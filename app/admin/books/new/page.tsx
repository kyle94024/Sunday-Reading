import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { BookForm } from "../BookForm";

export default async function NewBookPage() {
  if (!(await isLoggedIn())) redirect("/admin/login");
  return <BookForm />;
}
