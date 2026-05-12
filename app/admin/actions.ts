"use server";

import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  attemptLogin,
  changeStoredPassword,
  isLoggedIn,
  logout,
  verifyCurrentPassword,
} from "@/lib/auth";

const sql = neon(process.env.DATABASE_URL!);

// ───────── Auth actions ─────────

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = (formData.get("password") as string | null) ?? "";
  const ok = await attemptLogin(password);
  if (!ok) return { error: "Wrong password." };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

export type ChangePasswordState = { error?: string; ok?: boolean };

export async function changePasswordAction(
  _prev: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  await ensureAuth();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (!current || !next) return { error: "Both fields are required." };
  if (next !== confirm) return { error: "New passwords don't match." };
  if (next.length < 6) return { error: "New password must be at least 6 characters." };
  if (next === current) return { error: "New password must differ from current." };
  const ok = await verifyCurrentPassword(current);
  if (!ok) return { error: "Current password is wrong." };
  try {
    await changeStoredPassword(next);
  } catch (err) {
    return { error: (err as Error).message };
  }
  return { ok: true };
}

// ───────── Helpers ─────────

async function ensureAuth() {
  if (!(await isLoggedIn())) {
    redirect("/admin/login");
  }
}

function refreshPublicPages() {
  revalidatePath("/");
  revalidatePath("/about");
}

function nullIfEmpty(value: FormDataEntryValue | null): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  return s.length === 0 ? null : s;
}

function intOrNull(value: FormDataEntryValue | null): number | null {
  const s = nullIfEmpty(value);
  if (s == null) return null;
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : null;
}

function floatOrNull(value: FormDataEntryValue | null): number | null {
  const s = nullIfEmpty(value);
  if (s == null) return null;
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : null;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ───────── Book actions ─────────

export type BookFormState = { error?: string; ok?: boolean };

function readBookForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const slug =
    nullIfEmpty(formData.get("slug")) ?? slugify(title || `book-${Date.now()}`);
  const collection = nullIfEmpty(formData.get("collection"));
  const status =
    (nullIfEmpty(formData.get("status")) as "queued" | "reading" | "read" | null) ??
    "queued";
  return {
    title,
    author,
    slug,
    year_published: intOrNull(formData.get("year_published")),
    cover_url: nullIfEmpty(formData.get("cover_url")),
    review: nullIfEmpty(formData.get("review")),
    rating: floatOrNull(formData.get("rating")),
    status,
    collection,
    limbus_sinner: nullIfEmpty(formData.get("limbus_sinner")),
    limbus_color: nullIfEmpty(formData.get("limbus_color")),
    date_read: nullIfEmpty(formData.get("date_read")),
    display_order: intOrNull(formData.get("display_order")) ?? 0,
    reviewer_name: nullIfEmpty(formData.get("reviewer_name")),
    review_published: formData.get("review_published") === "on",
  };
}

export async function createBook(
  _prev: BookFormState,
  formData: FormData
): Promise<BookFormState> {
  await ensureAuth();
  const b = readBookForm(formData);
  if (!b.title || !b.author) {
    return { error: "Title and author are required." };
  }
  try {
    await sql`
      INSERT INTO books
        (slug, title, author, year_published, cover_url, review, rating,
         status, collection, limbus_sinner, limbus_color, date_read,
         display_order, reviewer_name, review_published)
      VALUES
        (${b.slug}, ${b.title}, ${b.author}, ${b.year_published},
         ${b.cover_url}, ${b.review}, ${b.rating}, ${b.status},
         ${b.collection}, ${b.limbus_sinner}, ${b.limbus_color},
         ${b.date_read}, ${b.display_order}, ${b.reviewer_name},
         ${b.review_published})
    `;
  } catch (err) {
    return { error: (err as Error).message };
  }
  refreshPublicPages();
  revalidatePath("/admin/books");
  redirect("/admin/books");
}

export async function updateBook(
  id: number,
  _prev: BookFormState,
  formData: FormData
): Promise<BookFormState> {
  await ensureAuth();
  const b = readBookForm(formData);
  if (!b.title || !b.author) {
    return { error: "Title and author are required." };
  }
  try {
    await sql`
      UPDATE books SET
        slug = ${b.slug},
        title = ${b.title},
        author = ${b.author},
        year_published = ${b.year_published},
        cover_url = ${b.cover_url},
        review = ${b.review},
        rating = ${b.rating},
        status = ${b.status},
        collection = ${b.collection},
        limbus_sinner = ${b.limbus_sinner},
        limbus_color = ${b.limbus_color},
        date_read = ${b.date_read},
        display_order = ${b.display_order},
        reviewer_name = ${b.reviewer_name},
        review_published = ${b.review_published},
        updated_at = NOW()
      WHERE id = ${id}
    `;
  } catch (err) {
    return { error: (err as Error).message };
  }
  refreshPublicPages();
  revalidatePath("/admin/books");
  revalidatePath(`/admin/books/${id}`);
  return { ok: true };
}

// ───────── Image upload (Vercel Blob) ─────────

export type UploadCoverResult = { url?: string; error?: string };

export async function uploadCoverImage(
  formData: FormData
): Promise<UploadCoverResult> {
  await ensureAuth();
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      error:
        "BLOB_READ_WRITE_TOKEN is not set. Enable Vercel Blob in your project, then `vercel env pull` to get the token locally.",
    };
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file selected." };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: "Max file size is 5 MB." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "File must be an image." };
  }
  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-60);
    const blob = await put(`covers/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return { url: blob.url };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

export async function deleteBook(id: number) {
  await ensureAuth();
  await sql`DELETE FROM books WHERE id = ${id}`;
  refreshPublicPages();
  revalidatePath("/admin/books");
  redirect("/admin/books");
}

// ───────── Site content actions ─────────

export type ContentFormState = { error?: string; ok?: boolean };

export async function updateSiteContent(
  _prev: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  await ensureAuth();
  const entries: { key: string; value: string }[] = [];
  for (const k of ["intro", "about", "hero_name", "hero_tagline"] as const) {
    const v = formData.get(k);
    if (v != null) entries.push({ key: k, value: String(v) });
  }
  try {
    for (const e of entries) {
      await sql`
        INSERT INTO site_content (key, value)
        VALUES (${e.key}, ${e.value})
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
      `;
    }
  } catch (err) {
    return { error: (err as Error).message };
  }
  refreshPublicPages();
  revalidatePath("/admin/content");
  return { ok: true };
}
