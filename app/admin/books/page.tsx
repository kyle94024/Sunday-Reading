import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { getAllBooks } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUS_LABEL = {
  read: "Read",
  reading: "Reading",
  queued: "Queued",
} as const;

const STATUS_TINT = {
  read: "#a78bfa",
  reading: "#fde047",
  queued: "#94a3b8",
} as const;

export default async function AdminBooksList({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  if (!(await isLoggedIn())) redirect("/admin/login");
  const { filter } = await searchParams;
  const all = await getAllBooks();
  const filtered =
    filter === "limbus"
      ? all.filter((b) => b.collection === "limbus")
      : filter === "other"
      ? all.filter((b) => b.collection !== "limbus")
      : all;
  // Published books first; hidden books drop to the bottom. Within each
  // group preserve the existing display_order / id ordering coming from
  // getAllBooks().
  const books = [...filtered].sort((a, b) => {
    const aHidden = a.review_published === false ? 1 : 0;
    const bHidden = b.review_published === false ? 1 : 0;
    if (aHidden !== bHidden) return aHidden - bHidden;
    return (
      (a.display_order ?? 0) - (b.display_order ?? 0) || a.id - b.id
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl tracking-[0.04em]">Books</h1>
        <Link href="/admin/books/new" className="btn btn-primary">
          + New book
        </Link>
      </div>

      <div className="flex items-center gap-1 text-[12px]">
        <FilterPill href="/admin/books" active={!filter} label={`All (${all.length})`} />
        <FilterPill
          href="/admin/books?filter=limbus"
          active={filter === "limbus"}
          label={`Limbus (${all.filter((b) => b.collection === "limbus").length})`}
        />
        <FilterPill
          href="/admin/books?filter=other"
          active={filter === "other"}
          label={`Other (${all.filter((b) => b.collection !== "limbus").length})`}
        />
      </div>

      <div className="panel overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-violet-bright/15 text-[10px] uppercase tracking-[0.2em] text-ink-muted/65">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Author</th>
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Collection</th>
              <th className="px-4 py-3 font-medium text-right">Edit</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr
                key={b.id}
                className="border-b border-violet-bright/5 transition hover:bg-violet-deep/15"
                style={
                  b.review_published === false
                    ? { filter: "saturate(0.35)", opacity: 0.7 }
                    : undefined
                }
                title={
                  b.review_published === false
                    ? "Review is hidden from the public site"
                    : undefined
                }
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/books/${b.id}`}
                    className="font-serif text-base text-ink hover:text-violet-glow"
                  >
                    {b.title}
                  </Link>
                  {b.review && (
                    <span
                      title="Review written"
                      className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-violet-glow"
                    />
                  )}
                  {b.review_published === false && (
                    <span className="ml-2 rounded-full border border-ink-muted/30 px-1.5 py-px text-[9px] uppercase tracking-[0.18em] text-ink-muted/70">
                      Hidden
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-muted/85">{b.author}</td>
                <td className="px-4 py-3 text-ink-muted/65">
                  {b.year_published ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em]"
                    style={{
                      borderColor: `${STATUS_TINT[b.status]}55`,
                      color: STATUS_TINT[b.status],
                      background: `${STATUS_TINT[b.status]}10`,
                    }}
                  >
                    {STATUS_LABEL[b.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-muted/65">
                  {b.collection === "limbus" ? (
                    <span className="text-ember">Limbus · {b.limbus_sinner}</span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/books/${b.id}`}
                    className="btn btn-ghost py-1 text-[11px]"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-ink-muted/65">
                  No books in this filter yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterPill({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 transition ${
        active
          ? "border-violet-bright/60 bg-violet-deep/40 text-ink"
          : "border-transparent text-ink-muted/70 hover:border-violet-bright/30 hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}
