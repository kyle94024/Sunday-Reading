"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ORIGINALS = [
  { href: "/drafts/catalog", n: "I", label: "Catalog" },
  { href: "/drafts/atlas", n: "II", label: "Atlas" },
  { href: "/drafts/zine", n: "III", label: "Zine" },
  { href: "/drafts/manor", n: "IV", label: "Ex Libris" },
];

const FAMILY = [
  { href: "/drafts/riso", n: "riso", label: "Riso Poster" },
  { href: "/drafts/scrapbook", n: "scrap", label: "Scrapbook" },
  { href: "/drafts/arcade", n: "arcade", label: "Night Arcade" },
  { href: "/drafts/stickers", n: "stick", label: "Sticker Club" },
  { href: "/drafts/tabloid", n: "tabloid", label: "Midnight Tabloid" },
  { href: "/drafts/cassette", n: "tape", label: "Mixtape" },
];

// Neutral floating switcher so it doesn't contaminate any draft's palette.
export function DraftBar() {
  const pathname = usePathname();
  const pill = (d: { href: string; n: string; label: string }) => {
    const active = pathname === d.href;
    return (
      <Link
        key={d.href}
        href={d.href}
        title={d.label}
        className={`rounded-full px-2 py-1 transition ${
          active ? "bg-white text-black" : "hover:bg-white/10 hover:text-white"
        }`}
      >
        {d.n}
      </Link>
    );
  };
  return (
    <nav
      aria-label="Draft switcher"
      className="fixed bottom-4 left-1/2 z-[300] flex max-w-[96vw] -translate-x-1/2 flex-wrap items-center justify-center gap-x-0.5 gap-y-1 rounded-2xl border border-white/20 bg-[#0b0b0e]/90 px-2.5 py-1.5 font-mono text-[11px] text-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur"
    >
      <Link href="/drafts" className="rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-white">
        drafts
      </Link>
      <span className="mx-1 h-4 w-px bg-white/15" />
      {ORIGINALS.map(pill)}
      <span className="mx-1 h-4 w-px bg-white/15" />
      {FAMILY.map(pill)}
      <span className="mx-1 h-4 w-px bg-white/15" />
      <Link href="/" className="rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-white">
        live
      </Link>
    </nav>
  );
}
