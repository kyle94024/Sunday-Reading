"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Item = { href: string; n: string; label: string };
type Group = { id: string; label: string; items: Item[] };

const GROUPS: Group[] = [
  {
    // the whole-site picnic set: home + limbus + about in one style
    id: "site",
    label: "picnic·site",
    items: [
      { href: "/drafts/picnic", n: "home", label: "Picnic Day · Home" },
      { href: "/drafts/picnic-limbus", n: "limbus", label: "Picnic Day · Limbus" },
      { href: "/drafts/picnic-about", n: "about", label: "Picnic Day · About" },
    ],
  },
  {
    id: "scrap",
    label: "scrap",
    items: [
      { href: "/drafts/scrapbook", n: "kraft", label: "Scrapbook · Kraft" },
      { href: "/drafts/strawberry", n: "berry", label: "Strawberry Milk" },
      { href: "/drafts/picnic", n: "picnic", label: "Picnic Day" },
      { href: "/drafts/lavender", n: "lav", label: "Pressed Lavender" },
    ],
  },
  {
    id: "stick",
    label: "stick",
    items: [
      { href: "/drafts/stickers", n: "mix", label: "Sticker Club · Mix" },
      { href: "/drafts/bunny", n: "bunny", label: "Bunny Mail" },
      { href: "/drafts/pond", n: "pond", label: "Frog Pond" },
      { href: "/drafts/honey", n: "honey", label: "Honey Jar" },
    ],
  },
  {
    id: "press",
    label: "press",
    items: [
      { href: "/drafts/tabloid", n: "eve", label: "Evening Edition" },
      { href: "/drafts/gazette", n: "gaz", label: "Sunday Gazette" },
      { href: "/drafts/digest", n: "dig", label: "Reader's Digestif" },
    ],
  },
  {
    id: "zine",
    label: "zine",
    items: [
      { href: "/drafts/zine", n: "zine", label: "The Zine" },
      { href: "/drafts/riso", n: "riso", label: "Riso Poster" },
      { href: "/drafts/arcade", n: "arcade", label: "Night Arcade" },
      { href: "/drafts/cassette", n: "tape", label: "Mixtape" },
    ],
  },
  {
    id: "r1",
    label: "r1",
    items: [
      { href: "/drafts/catalog", n: "I", label: "Card Catalog" },
      { href: "/drafts/atlas", n: "II", label: "Celestial Atlas" },
      { href: "/drafts/zine", n: "III", label: "The Zine" },
      { href: "/drafts/manor", n: "IV", label: "Ex Libris" },
    ],
  },
];

// Neutral floating switcher so it doesn't contaminate any draft's palette.
// Group tabs on the left, current group's drafts expanded on the right.
export function DraftBar() {
  const pathname = usePathname();
  const [picked, setPicked] = useState<string | null>(null);
  const current =
    picked ??
    GROUPS.find((g) => g.items.some((i) => i.href === pathname))?.id ??
    "scrap";
  const group = GROUPS.find((g) => g.id === current)!;

  return (
    <nav
      aria-label="Draft switcher"
      className="fixed bottom-4 left-1/2 z-[300] flex max-w-[96vw] -translate-x-1/2 flex-wrap items-center justify-center gap-x-0.5 gap-y-1 rounded-2xl border border-white/20 bg-[#0b0b0e]/90 px-2.5 py-1.5 font-mono text-[11px] text-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur"
    >
      <Link href="/drafts" className="rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-white">
        drafts
      </Link>
      <span className="mx-1 h-4 w-px bg-white/15" />
      {GROUPS.map((g) => (
        <button
          key={g.id}
          type="button"
          onClick={() => setPicked(g.id)}
          className={`cursor-pointer rounded-full px-2 py-1 transition ${
            g.id === current ? "bg-white/20 text-white" : "hover:bg-white/10 hover:text-white"
          }`}
        >
          {g.label}
        </button>
      ))}
      <span className="mx-1 h-4 w-px bg-white/15" />
      {group.items.map((d) => {
        const active = pathname === d.href;
        return (
          <Link
            key={`${group.id}-${d.href}`}
            href={d.href}
            title={d.label}
            className={`rounded-full px-2 py-1 transition ${
              active ? "bg-white text-black" : "hover:bg-white/10 hover:text-white"
            }`}
          >
            {d.n}
          </Link>
        );
      })}
      <span className="mx-1 h-4 w-px bg-white/15" />
      <Link href="/" className="rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-white">
        live
      </Link>
    </nav>
  );
}
