"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState, type ReactNode } from "react";
import type { Book } from "@/lib/db";
import { jitter, stampDate, yearLabel } from "../util";
import {
  Expandable,
  GlyphRating,
  IntroMd,
  Pic,
  SideRails,
  Sparkle,
  Star,
} from "../zf/core";

export type StickTheme = "mix" | "bunny" | "pond" | "honey";

/* per-theme cast: OpenMoji sprite names (files in public/drafts/om).
   lineup marches under the title, mascots pop up on cards. */
export const CAST: Record<
  StickTheme,
  { lineup: string[]; mascots: string[]; doodads: string[]; word: string }
> = {
  mix: {
    lineup: ["chick", "rabbit", "frog", "teddy", "hamster"],
    mascots: ["chick", "frog", "rabbit", "teddy"],
    doodads: ["butterfly", "bow", "blossom", "rainbow", "cupcake", "balloon"],
    word: "stuck on with love",
  },
  bunny: {
    lineup: ["rabbit", "carrot", "hamster", "loveletter", "rabbit"],
    mascots: ["rabbit", "hamster", "cat"],
    doodads: ["carrot", "loveletter", "bow", "clover", "cupcake", "cherries"],
    word: "hopped here honestly",
  },
  pond: {
    lineup: ["frog", "lotus", "duck", "turtle", "frog"],
    mascots: ["frog", "duck", "turtle"],
    doodads: ["lotus", "butterfly", "snail", "mushroom", "sunface", "clover"],
    word: "read by the pond",
  },
  honey: {
    lineup: ["bear", "honeypot", "bee", "teddy", "bee"],
    mascots: ["bear", "bee", "teddy"],
    doodads: ["honeypot", "bee", "sunflower", "cookie", "mushroom", "sunface"],
    word: "sweet as clover honey",
  },
};

/* ── sidebar pieces: images only, no words ── */

/* a die-cut mini sticker of a real cover, links to the shelf */
export function MiniPeel({ book, r = 0 }: { book?: Book; r?: number }) {
  if (!book?.cover_url) return null;
  return (
    <Link
      href="/limbus"
      className="diecut zf-hot block"
      style={{ padding: 6, background: "#fff", transform: `rotate(${r}deg)` }}
      aria-label={book.title}
    >
      <span className="relative block h-[86px] w-[60px] overflow-hidden rounded-[8px]">
        <Image src={book.cover_url} alt="" fill sizes="60px" className="object-cover" />
      </span>
    </Link>
  );
}

/* ── shared card pieces ── */

function StatusChip({ book }: { book: Book }) {
  return (
    <span className={`chip ${book.status === "read" ? "c3" : book.status === "reading" ? "c4" : "c2"}`} style={{ fontSize: 12 }}>
      {book.status === "read" ? "collected ✓" : book.status === "reading" ? "peeling now…" : "still on the sheet"}
    </span>
  );
}

function Blooms({ book }: { book: Book }) {
  const rating = book.rating != null ? Number(book.rating) : null;
  if (rating == null) return null;
  return (
    <div className="mt-2 flex items-center gap-2">
      <GlyphRating rating={rating} glyph="✿" color="var(--a1)" size={19} showStar={book.show_star === true} starColor="#e8b23d" />
      {rating >= 5.1 && <span className="chip rare" style={{ fontSize: 11 }}>RARE ✦</span>}
    </div>
  );
}

function CardBody({ book, open }: { book: Book; open: boolean }) {
  const finished = stampDate(book.date_read);
  return (
    <Expandable open={open}>
      <div style={{ padding: "0 28px 26px" }}>
        <div style={{ borderTop: "2px dashed color-mix(in oklab, var(--ink) 28%, transparent)", marginBottom: 16 }} />
        {book.reviewer_name && (
          <div className="mb-4"><span className="chip c4" style={{ fontSize: 12 }}>guest sticker by {book.reviewer_name} ✎</span></div>
        )}
        {book.summary && (
          <div className="mb-5">
            <span className="chip c2" style={{ fontSize: 12 }}>what&rsquo;s inside</span>
            <div className="prose mt-2"><ReactMarkdown>{book.summary}</ReactMarkdown></div>
          </div>
        )}
        {book.review && (
          <div>
            <span className="chip c1" style={{ fontSize: 12 }}>club notes</span>
            <div className="prose mt-2"><ReactMarkdown>{book.review}</ReactMarkdown></div>
          </div>
        )}
        {finished && (
          <div className="round mt-1 font-bold" style={{ fontSize: 13, opacity: 0.7 }}>finished {finished.toLowerCase()} ✦</div>
        )}
      </div>
    </Expandable>
  );
}

function OpenHint({ open }: { open: boolean }) {
  return (
    <span className="round ml-auto shrink-0 font-bold" style={{ fontSize: 14, color: "color-mix(in oklab, var(--a1) 80%, var(--ink))" }}>
      {open ? "stick it back −" : "peel it open +"}
    </span>
  );
}

function StickCard({ book, i, theme, defaultOpen = false }: { book: Book; i: number; theme: StickTheme; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const kind = i % 3; // 0 puffy · 1 die-cut sheet · 2 speech bubble
  const cast = CAST[theme];
  const mascot = cast.mascots[i % cast.mascots.length];

  if (kind === 2) {
    /* mascot + speech bubble */
    return (
      <div id={`stick-${i}`} className="relative flex items-start gap-1 sm:gap-3" style={{ scrollMarginTop: 24 }}>
        <div className="mt-10 hidden w-[64px] shrink-0 text-center sm:block" aria-hidden>
          <span className="zf-hop inline-block"><Pic name={mascot} size={56} /></span>
        </div>
        <article className="bubble min-w-0 flex-1" style={{ transform: `rotate(${jitter(i, 0.5)}deg)` }}>
          <svg className="tail hidden sm:block" viewBox="0 0 26 26" aria-hidden>
            <path d="M24 2 C14 8, 8 14, 2 24 C12 22, 20 18, 24 12 Z" fill="#fff" stroke="rgba(0,0,0,0.28)" strokeWidth="1.4" />
          </svg>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "24px 28px 16px" }}>
            <div className="flex flex-wrap items-center gap-3">
              <StatusChip book={book} />
              <OpenHint open={open} />
            </div>
            <div className="mt-3 flex items-start gap-5">
              {book.cover_url && (
                <span className="relative hidden h-[104px] w-[72px] shrink-0 overflow-hidden rounded-[8px] sm:block" style={{ transform: `rotate(${jitter(i + 3, 3)}deg)`, boxShadow: "0 0 0 3px #fff, 0 0 0 4.4px color-mix(in oklab, var(--ink) 28%, transparent)" }}>
                  <Image src={book.cover_url} alt="" fill sizes="72px" className="object-cover" />
                </span>
              )}
              <div className="min-w-0">
                <h3 className="round font-bold leading-[1.06]" style={{ fontSize: "clamp(1.4rem,3.4vw,2rem)" }}>
                  {book.title}
                </h3>
                <p className="mt-1" style={{ fontSize: 13.5, opacity: 0.8 }}>
                  {book.author}, {yearLabel(book.year_published)}
                  {book.limbus_sinner ? ` · ${book.limbus_sinner}'s pick` : ""}
                </p>
                <Blooms book={book} />
              </div>
            </div>
          </button>
          <CardBody book={book} open={open} />
        </article>
      </div>
    );
  }

  if (kind === 1) {
    /* die-cut sheet */
    return (
      <article id={`stick-${i}`} className="sheet relative" style={{ transform: `rotate(${jitter(i + 1, 0.6)}deg)`, scrollMarginTop: 24 }}>
        <span className="peel" aria-hidden />
        <span className="pointer-events-none absolute -top-7 right-12 z-[2]" aria-hidden><Pic name={mascot} size={44} /></span>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "22px 24px 14px" }}>
          <div className="flex flex-wrap items-center gap-3" style={{ paddingRight: 34 }}>
            <StatusChip book={book} />
            <OpenHint open={open} />
          </div>
          <div className="mt-4 flex flex-wrap items-stretch gap-4">
            {book.cover_url && (
              <span className="diecut shrink-0 p-2">
                <span className="relative block h-[110px] w-[76px] overflow-hidden rounded-[8px]">
                  <Image src={book.cover_url} alt="" fill sizes="76px" className="object-cover" />
                </span>
              </span>
            )}
            <span className="diecut min-w-0 flex-1 px-4 py-3" style={{ minWidth: 200 }}>
              <h3 className="round font-bold leading-[1.06]" style={{ fontSize: "clamp(1.35rem,3.2vw,1.9rem)" }}>{book.title}</h3>
              <p className="mt-1" style={{ fontSize: 13.5, opacity: 0.8 }}>
                {book.author}, {yearLabel(book.year_published)}
                {book.limbus_sinner ? ` · ${book.limbus_sinner}'s pick` : ""}
              </p>
              <Blooms book={book} />
            </span>
          </div>
        </button>
        <CardBody book={book} open={open} />
      </article>
    );
  }

  /* puffy sticker */
  return (
    <article id={`stick-${i}`} className={`stick relative ${["c1", "c2", "c3", "c4"][Math.floor(i / 3) % 4]}`} style={{ transform: `rotate(${jitter(i + 2, 0.7)}deg)`, scrollMarginTop: 24 }}>
      <span className="pointer-events-none absolute -top-7 left-7 z-[2]" aria-hidden><Pic name={mascot} size={44} /></span>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "26px 28px 16px" }}>
        <div className="flex flex-wrap items-center gap-3">
          <StatusChip book={book} />
          <OpenHint open={open} />
        </div>
        <div className="mt-3 flex items-start gap-5">
          {book.cover_url && (
            <span className="relative hidden h-[118px] w-[82px] shrink-0 overflow-hidden rounded-[10px] sm:block" style={{ transform: `rotate(${jitter(i + 5, 3.4)}deg)`, boxShadow: "0 0 0 3.5px #fff, 0 0 0 5px color-mix(in oklab, var(--ink) 28%, transparent), 0 8px 16px -8px color-mix(in oklab, var(--ink) 50%, transparent)" }}>
              <Image src={book.cover_url} alt="" fill sizes="82px" className="object-cover" />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="round font-bold leading-[1.06]" style={{ fontSize: "clamp(1.4rem,3.4vw,2rem)" }}>{book.title}</h3>
            <p className="mt-1" style={{ fontSize: 13.5, opacity: 0.8 }}>
              {book.author}, {yearLabel(book.year_published)}
              {book.limbus_sinner ? ` · ${book.limbus_sinner}'s pick` : ""}
            </p>
            <Blooms book={book} />
          </div>
        </div>
      </button>
      <CardBody book={book} open={open} />
    </article>
  );
}

/* ── the page ── */

export function StickFam({
  theme,
  name,
  tagline,
  intro,
  limbus,
  reviews,
  books,
}: {
  theme: StickTheme;
  name: string;
  tagline: string;
  intro: string;
  limbus: Book[];
  reviews: Book[];
  books: Book[];
}) {
  const cast = CAST[theme];
  const got = limbus.filter((b) => b.status === "read").length;
  const shots = limbus.filter((b) => b.cover_url).slice(7, 11); // rail mini-stickers

  return (
    <div className={`d-stick2 t-${theme}`}>
      <div className="zf-edge zf-edge-left edge-scallop-left" aria-hidden />
      <div className="zf-edge zf-edge-right edge-scallop-right" aria-hidden />

      <SideRails
        interactive
        left={[
          <Pic key="m0" name={cast.mascots[0]} size={68} />,
          <Star key="s0" size={30} color="var(--a4)" />,
          <MiniPeel key="p0" book={shots[0]} r={-4} />,
          <Pic key="d0" name={cast.doodads[0]} size={46} />,
          <Pic key="m1" name={cast.mascots[1]} size={58} flip />,
          <Pic key="d3" name={cast.doodads[3]} size={44} />,
          <Sparkle key="k0" size={26} color="var(--a1)" />,
          <MiniPeel key="p1" book={shots[1]} r={3} />,
          <Pic key="d1" name={cast.doodads[1]} size={40} />,
          <Pic key="d4" name={cast.doodads[4]} size={42} flip />,
          <Pic key="m2" name={cast.mascots[2 % cast.mascots.length]} size={62} />,
        ]}
        right={[
          <MiniPeel key="p2" book={shots[2]} r={4} />,
          <Pic key="m2" name={cast.mascots[2 % cast.mascots.length]} size={64} flip />,
          <Pic key="d2" name={cast.doodads[2]} size={46} />,
          <Star key="s1" size={26} color="var(--a2)" />,
          <Pic key="l0" name={cast.lineup[0]} size={56} />,
          <Pic key="d5" name={cast.doodads[5]} size={44} />,
          <MiniPeel key="p3" book={shots[3]} r={-3} />,
          <Pic key="d3b" name={cast.doodads[0]} size={38} flip />,
          <Sparkle key="k1" size={28} color="var(--a3)" />,
          <Pic key="d4b" name={cast.doodads[3]} size={40} flip />,
          <Pic key="m1" name={cast.mascots[1]} size={58} />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="chip c4" style={{ fontSize: 12 }}>est. 2026 ✦</span>
          <div className="flex gap-2">
            <Link href="/">home</Link>
            <Link href="/limbus">limbus</Link>
            <Link href="/about">about</Link>
          </div>
        </nav>

        <header className="mx-auto mt-12 max-w-xl">
          <div className="stick relative px-7 py-9 text-center sm:px-12" style={{ transform: "rotate(-0.6deg)" }}>
            <span className="pointer-events-none absolute -top-5 -left-3 zf-bob" aria-hidden><Star size={40} color="var(--a4)" /></span>
            <span className="pointer-events-none absolute -right-2 -bottom-4 zf-bob zf-d2" aria-hidden><Sparkle size={30} color="var(--a1)" /></span>
            <span className="chip c1" style={{ fontSize: 12 }}>{theme === "mix" ? "official sticker club" : theme === "bunny" ? "bunny mail book club" : theme === "pond" ? "pond-side reading society" : "honey jar book club"}</span>
            <h1 className="round mt-3 font-bold leading-[0.98]" style={{ fontSize: "clamp(2.4rem,7vw,3.6rem)" }}>
              {name}
            </h1>
            <p className="mt-2" style={{ fontSize: 15, opacity: 0.8 }}>{tagline.toLowerCase()} · membership: one (1) kyle</p>
            <div className="mt-5 flex items-end justify-center gap-4" aria-hidden>
              {cast.lineup.map((m, i) => (
                <span key={i} className={`zf-hop zf-d${i % 4}`} style={{ display: "inline-block" }}>
                  <Pic name={m} size={i === 0 || i === 4 ? 42 : 48} />
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="stick relative mx-auto mt-14 max-w-2xl" style={{ padding: "26px 30px 16px", transform: "rotate(0.4deg)" }}>
          <span className="pointer-events-none absolute -top-6 right-8" aria-hidden><Pic name={cast.doodads[0]} size={40} /></span>
          <span className="chip c2" style={{ fontSize: 12 }}>a note from the club president</span>
          <div className="prose mt-3"><IntroMd text={intro} /></div>
        </section>

        <section className="mt-16">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h2><span className="chip c1" style={{ fontSize: 13 }}>the limbus fourteen</span></h2>
            <span className="round font-bold" style={{ fontSize: 14, opacity: 0.75 }}>{got}/{limbus.length || 14} peeled — collect them all!</span>
            <Link href="/limbus" className="round ml-auto font-bold zf-wiggle" style={{ fontSize: 14, color: "color-mix(in oklab, var(--a1) 80%, var(--ink))" }}>
              open the album →
            </Link>
          </div>
          <div className="sheet relative" style={{ padding: "22px 20px 18px" }}>
            <span className="peel" aria-hidden />
            <div className="flex flex-wrap justify-center gap-4">
              {limbus.map((b, i) => (
                <Link key={b.id} href="/limbus" className="diecut block p-1.5" style={{ transform: `rotate(${jitter(i, 2.4)}deg)` }} title={`${b.title} — ${b.author}`}>
                  <span className="relative block h-[92px] w-[64px] overflow-hidden rounded-[9px]">
                    {b.cover_url ? (
                      <Image src={b.cover_url} alt="" fill sizes="64px" className="object-cover" style={b.status !== "read" ? { filter: "saturate(0.35) opacity(0.75)" } : undefined} />
                    ) : (
                      <span className="round flex h-full w-full items-center justify-center p-1 text-center font-bold" style={{ fontSize: 10, background: "color-mix(in oklab, var(--a2) 40%, white)" }}>{b.title}</span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-8 flex items-center gap-3">
            <span className="chip c3" style={{ fontSize: 13 }}>review stickers</span>
            <span className="round font-bold" style={{ fontSize: 14, opacity: 0.75 }}>peel one open ↓</span>
          </h2>
          <div className="flex flex-col gap-12">
            {reviews.map((b, i) => (
              <StickCard key={b.id} book={b} i={i} theme={theme} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="mt-20 text-center">
          <p className="round font-bold" style={{ fontSize: 16, opacity: 0.7 }}>
            {cast.word} ✦ sunday&rsquo;s shelf
          </p>
          <p className="mt-1" style={{ fontSize: 11, opacity: 0.55 }}>
            critters by{" "}
            <a href="https://openmoji.org" target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>
              OpenMoji
            </a>{" "}
            · CC BY-SA 4.0
          </p>
        </footer>
      </div>
    </div>
  );
}
