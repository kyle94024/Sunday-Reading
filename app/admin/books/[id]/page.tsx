import { notFound, redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { sql } from "@/lib/db";
import type { Book } from "@/lib/db";
import { BookForm } from "../BookForm";

export const dynamic = "force-dynamic";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isLoggedIn())) redirect("/admin/login");
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (!Number.isFinite(numId)) notFound();
  const rows = (await sql`
    SELECT id, slug, title, author, year_published, cover_url, review,
           rating, status, collection, limbus_sinner, limbus_color,
           date_read::text, display_order, reviewer_name, review_published,
           summary
    FROM books WHERE id = ${numId} LIMIT 1
  `) as Book[];
  const book = rows[0];
  if (!book) notFound();
  return <BookForm book={book} />;
}
