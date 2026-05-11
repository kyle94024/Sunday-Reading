import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!(await isLoggedIn())) redirect("/admin/login");

  const counts = (await sql`
    SELECT
      COUNT(*) FILTER (WHERE collection = 'limbus') AS limbus_count,
      COUNT(*) FILTER (WHERE collection IS DISTINCT FROM 'limbus') AS other_count,
      COUNT(*) FILTER (WHERE status = 'read') AS read_count,
      COUNT(*) FILTER (WHERE status = 'reading') AS reading_count,
      COUNT(*) FILTER (WHERE status = 'queued') AS queued_count
    FROM books
  `) as {
    limbus_count: string;
    other_count: string;
    read_count: string;
    reading_count: string;
    queued_count: string;
  }[];
  const c = counts[0];

  const stats = [
    { label: "Limbus books", value: c.limbus_count },
    { label: "Other books", value: c.other_count },
    { label: "Read", value: c.read_count },
    { label: "Reading", value: c.reading_count },
    { label: "Queued", value: c.queued_count },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl tracking-[0.04em]">
          Welcome back.
        </h1>
        <p className="mt-1 text-sm text-ink-muted/80">
          What would you like to edit?
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="panel py-4 text-center">
            <div className="font-display text-3xl text-gradient-violet">
              {s.value}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-ink-muted/70">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card
          href="/admin/books"
          title="Books"
          description="Add, edit, reorder, or remove book entries — Limbus and beyond."
        />
        <Card
          href="/admin/content"
          title="Site copy"
          description="Edit the intro, about page, and hero text."
        />
      </div>
    </div>
  );
}

function Card({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="panel block transition hover:-translate-y-0.5 hover:border-violet-bright/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl text-ink">{title}</h2>
          <p className="mt-1 text-sm text-ink-muted/85">{description}</p>
        </div>
        <span className="text-xl text-violet-glow opacity-60 transition group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
