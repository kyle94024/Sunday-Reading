"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DRAFTS = [
  { href: "/drafts/catalog", n: "I", label: "Catalog" },
  { href: "/drafts/atlas", n: "II", label: "Atlas" },
  { href: "/drafts/zine", n: "III", label: "Zine" },
  { href: "/drafts/manor", n: "IV", label: "Ex Libris" },
];

// Neutral floating switcher so it doesn't contaminate any draft's palette.
export function DraftBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Draft switcher"
      className="fixed bottom-4 left-1/2 z-[300] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-[#0b0b0e]/90 px-2 py-1.5 font-mono text-[11px] text-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur"
    >
      <Link
        href="/drafts"
        className="rounded-full px-2.5 py-1 transition hover:bg-white/10 hover:text-white"
      >
        drafts
      </Link>
      <span className="mx-0.5 h-4 w-px bg-white/15" />
      {DRAFTS.map((d) => {
        const active = pathname === d.href;
        return (
          <Link
            key={d.href}
            href={d.href}
            title={d.label}
            className={`rounded-full px-2.5 py-1 transition ${
              active
                ? "bg-white text-black"
                : "hover:bg-white/10 hover:text-white"
            }`}
          >
            {d.n}
          </Link>
        );
      })}
      <span className="mx-0.5 h-4 w-px bg-white/15" />
      <Link
        href="/"
        className="rounded-full px-2.5 py-1 transition hover:bg-white/10 hover:text-white"
      >
        live site
      </Link>
    </nav>
  );
}
