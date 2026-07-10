"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState, type ReactNode } from "react";
import type { Book } from "@/lib/db";
import { stampDate, yearLabel } from "../util";
import { Expandable, GlyphRating, IntroMd, Marquee, SideRails } from "../zf/core";

export type NewsTheme = "evening" | "gazette" | "digest";

const EDITION: Record<NewsTheme, { paper: string; motto: string; price: string }> = {
  evening: { paper: "the evening edition", motto: "all the books fit to shelve", price: "price: one honest opinion" },
  gazette: { paper: "the sunday gazette", motto: "founded on a comfortable couch", price: "price: two cents, gladly given" },
  digest: { paper: "the reader's digestif", motto: "served warm, after supper", price: "price: one dog-eared page" },
};

/* plain-text snippet for decks and pull quotes */
function snip(md: string | null | undefined, max = 150): string | null {
  if (!md) return null;
  const plain = md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*_>`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const m = plain.match(new RegExp(`^.{40,${max}}?[.!?]`));
  const s = m ? m[0] : plain.slice(0, max - 10);
  return s.length > 25 ? s : null;
}

function byline(book: Book): string {
  return book.reviewer_name
    ? `by guest correspondent ${book.reviewer_name}`
    : "by our sunday correspondent";
}

/* ── margin pieces: photographs and ornaments only, no words ── */

/* a bare morgue-file box of real covers, links to the shelf */
function WShots({ limbus, from }: { limbus: Book[]; from: number }) {
  const three = limbus.filter((b) => b.cover_url).slice(from, from + 3);
  if (!three.length) return null;
  return (
    <div className="mg zf-hot" style={{ padding: 8 }}>
      <Link href="/limbus" className="flex justify-center gap-2" aria-label="The Limbus shelf">
        {three.map((b) => (
          <span key={b.id} className="pic relative block h-[74px] w-[50px]">
            <Image src={b.cover_url!} alt="" fill sizes="50px" className="object-cover" />
          </span>
        ))}
      </Link>
    </div>
  );
}

/* single tall portrait cut, like a filed press photo */
function WPortrait({ limbus, at }: { limbus: Book[]; at: number }) {
  const b = limbus.filter((x) => x.cover_url)[at];
  if (!b) return null;
  return (
    <Link href="/limbus" className="mg zf-hot block" style={{ padding: 8, width: 148 }} aria-label={b.title}>
      <span className="pic relative block h-[186px] w-full">
        <Image src={b.cover_url!} alt="" fill sizes="132px" className="object-cover" />
      </span>
    </Link>
  );
}

/* column-rule ornament: two hairlines and a diamond */
function RuleOrn({ h = 96 }: { h?: number }) {
  return (
    <div
      aria-hidden
      style={{ width: 30, height: h, display: "grid", placeItems: "center", borderLeft: "1px solid var(--line)", borderRight: "1px solid var(--line)" }}
    >
      <span style={{ width: 7, height: 7, background: "var(--accent)", transform: "rotate(45deg)" }} />
    </div>
  );
}

/* ── stories ── */

function VerdictBox({ book }: { book: Book }) {
  const rating = book.rating != null ? Number(book.rating) : null;
  if (rating == null) return null;
  return (
    <div className="verdict inline-block">
      <div className="big" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--accent)" }}>THE VERDICT</div>
      <div className="mt-1 flex items-center gap-2">
        <GlyphRating rating={rating} glyph="★" color="var(--accent2)" size={17} showStar={book.show_star === true} starColor="var(--accent2)" />
        {rating >= 5.1 && <span className="kicker" style={{ fontSize: 10 }}>KEEPER</span>}
      </div>
    </div>
  );
}

function StoryBody({ book, open }: { book: Book; open: boolean }) {
  const finished = stampDate(book.date_read);
  return (
    <Expandable open={open}>
      <div style={{ padding: "0 26px 24px" }}>
        <div className="rule-thin mb-4" />
        {book.summary && (
          <div className="mb-5">
            <div className="big mb-1" style={{ fontSize: 10.5, letterSpacing: "0.16em", color: "var(--soft)" }}>THE STORY SO FAR —</div>
            <div className="prose serif" style={{ fontStyle: "italic" }}><ReactMarkdown>{book.summary}</ReactMarkdown></div>
          </div>
        )}
        {book.review && (
          <div>
            <div className="big mb-1" style={{ fontSize: 10.5, letterSpacing: "0.16em", color: "var(--soft)" }}>FULL REVIEW —</div>
            <div className="prose"><ReactMarkdown>{book.review}</ReactMarkdown></div>
          </div>
        )}
        {finished && (
          <div style={{ fontSize: 11, color: "var(--soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            filed {finished} · sunday's shelf press
          </div>
        )}
      </div>
    </Expandable>
  );
}

function ReadHint({ open }: { open: boolean }) {
  return (
    <span className="big ml-auto shrink-0" style={{ fontSize: 10.5, letterSpacing: "0.14em", color: "var(--accent)" }}>
      {open ? "FOLD PAPER −" : "READ FULL STORY +"}
    </span>
  );
}

function LeadStory({ book, defaultOpen }: { book: Book; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const deck = snip(book.summary, 180) ?? snip(book.review, 180);
  return (
    <article id="story-0" className="story lead" style={{ scrollMarginTop: 20 }}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "24px 26px 18px" }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="kicker">the big review</span>
          <span style={{ fontSize: 11, color: "var(--soft)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{byline(book)}</span>
          <ReadHint open={open} />
        </div>
        <div className="mt-4 flex flex-col gap-6 sm:flex-row">
          {book.cover_url && (
            <span className="pic h-[210px] w-[146px] shrink-0">
              <Image src={book.cover_url} alt="" fill sizes="146px" className="object-cover" />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="big leading-[0.98]" style={{ fontSize: "clamp(1.9rem,5vw,3rem)" }}>
              {book.title}
            </h3>
            <p className="mt-2" style={{ fontSize: 13, color: "var(--soft)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {book.author} · {yearLabel(book.year_published)}
              {book.limbus_sinner ? ` · filed under ${book.limbus_sinner}` : ""}
            </p>
            {deck && (
              <p className="serif mt-3" style={{ fontSize: "1.25rem", lineHeight: 1.4, fontStyle: "italic", color: "color-mix(in oklab, var(--ink) 90%, var(--bg))" }}>
                {deck}
              </p>
            )}
            <div className="mt-4"><VerdictBox book={book} /></div>
          </div>
        </div>
      </button>
      <StoryBody book={book} open={open} />
    </article>
  );
}

function ColumnStory({ book, i }: { book: Book; i: number }) {
  const [open, setOpen] = useState(false);
  const rating = book.rating != null ? Number(book.rating) : null;
  return (
    <article id={`story-${i}`} className="story" style={{ scrollMarginTop: 20 }}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "20px 26px 16px" }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="kicker alt" style={{ fontSize: 10 }}>review no. {String(i + 1).padStart(2, "0")}</span>
          <ReadHint open={open} />
        </div>
        <div className="mt-3 flex items-start gap-5">
          <div className="min-w-0 flex-1">
            <h3 className="big leading-[1.02]" style={{ fontSize: "clamp(1.3rem,3.2vw,1.9rem)" }}>{book.title}</h3>
            <p className="mt-1.5" style={{ fontSize: 12, color: "var(--soft)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {book.author} · {yearLabel(book.year_published)} · {byline(book)}
            </p>
            {rating != null && (
              <div className="mt-2.5 flex items-center gap-2">
                <GlyphRating rating={rating} glyph="★" color="var(--accent2)" size={15} showStar={book.show_star === true} starColor="var(--accent2)" />
                {rating >= 5.1 && <span className="kicker" style={{ fontSize: 9 }}>KEEPER</span>}
              </div>
            )}
          </div>
          {book.cover_url && (
            <span className="pic hidden h-[118px] w-[82px] shrink-0 sm:block">
              <Image src={book.cover_url} alt="" fill sizes="82px" className="object-cover" />
            </span>
          )}
        </div>
      </button>
      <StoryBody book={book} open={open} />
    </article>
  );
}

function BriefStory({ book, i }: { book: Book; i: number }) {
  const [open, setOpen] = useState(false);
  const rating = book.rating != null ? Number(book.rating) : null;
  return (
    <article id={`story-${i}`} className="brief" style={{ scrollMarginTop: 20 }}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "16px 22px 14px" }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="big" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)" }}>■ IN BRIEF</span>
          <ReadHint open={open} />
        </div>
        <h3 className="big mt-2 leading-[1.05]" style={{ fontSize: "clamp(1.1rem,2.6vw,1.45rem)" }}>{book.title}</h3>
        <p className="mt-1" style={{ fontSize: 11.5, color: "var(--soft)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {book.author} · {yearLabel(book.year_published)}
        </p>
        {rating != null && (
          <div className="mt-2">
            <GlyphRating rating={rating} glyph="★" color="var(--accent2)" size={14} showStar={book.show_star === true} starColor="var(--accent2)" />
          </div>
        )}
      </button>
      <StoryBody book={book} open={open} />
    </article>
  );
}

/* ── the page ── */

export function NewsFam({
  theme,
  name,
  tagline,
  intro,
  limbus,
  reviews,
  books,
}: {
  theme: NewsTheme;
  name: string;
  tagline: string;
  intro: string;
  limbus: Book[];
  reviews: Book[];
  books: Book[];
}) {
  const ed = EDITION[theme];
  const rest = reviews.slice(1);

  const leftRail: ReactNode[] = [
    <WShots key="s0" limbus={limbus} from={0} />,
    <RuleOrn key="r0" />,
    <WPortrait key="pt0" limbus={limbus} at={12} />,
    <RuleOrn key="r1" h={70} />,
    <WShots key="s1" limbus={limbus} from={3} />,
  ];
  const rightRail: ReactNode[] = [
    <WPortrait key="pt1" limbus={limbus} at={13} />,
    <RuleOrn key="r2" h={70} />,
    <WShots key="s2" limbus={limbus} from={6} />,
    <RuleOrn key="r3" />,
    <WShots key="s3" limbus={limbus} from={9} />,
  ];

  return (
    <div className={`d-news t-${theme}`}>
      <div className="zf-edge zf-edge-left edge-rules" aria-hidden />
      <div className="zf-edge zf-edge-right edge-rules" aria-hidden />

      <SideRails interactive left={leftRail} right={rightRail} />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--soft)", textTransform: "uppercase" }}>sunday morning edition</span>
          <div className="flex gap-6">
            <Link href="/">HOME</Link>
            <Link href="/limbus">LIMBUS</Link>
            <Link href="/about">ABOUT</Link>
          </div>
        </nav>

        {/* masthead */}
        <header className="mt-6">
          <div className="rule-x" />
          <div className="flex items-center justify-between py-1" style={{ fontSize: 10.5, letterSpacing: "0.12em", color: "var(--soft)", textTransform: "uppercase" }}>
            <span>vol. i · no. {reviews.length}</span>
            <span className="hidden sm:inline">{ed.motto}</span>
            <span>{ed.price}</span>
          </div>
          <div className="rule-thin" />
          <h1 className="mast py-4 text-center leading-none" style={{ fontSize: "clamp(2.6rem,9vw,5rem)", fontWeight: 700 }}>
            {name}
          </h1>
          <div className="rule-double" />
          <p className="py-1.5 text-center" style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--soft)", textTransform: "uppercase" }}>
            {tagline} — {ed.paper}
          </p>
          <div className="rule-x" />
        </header>

        {/* ticker of real headlines */}
        <div className="ticker mt-4">
          <Marquee speed={34}>
            {reviews
              .map((b) => `${b.title.toUpperCase()}${b.rating != null ? ` ★${Number(b.rating).toFixed(1)}` : ""}`)
              .join("  +++  ")}
            {"  +++  "}
          </Marquee>
        </div>

        {/* editor's note */}
        <section className="story mt-10" style={{ padding: "22px 26px 12px" }}>
          <span className="kicker alt">from the editor&rsquo;s desk</span>
          <div className="prose mt-4"><IntroMd text={intro} /></div>
        </section>

        {/* shelf survey */}
        <section className="mt-12">
          <div className="flex flex-wrap items-baseline gap-3">
            <h2><span className="kicker">shelf survey: the limbus fourteen</span></h2>
            <Link href="/limbus" className="big" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textDecoration: "none" }}>
              SEE THE FULL SHELF →
            </Link>
          </div>
          <div className="zf-row" style={{ paddingTop: 16, paddingBottom: 12 }}>
            {limbus.map((b) => (
              <Link key={b.id} href="/limbus" className="pic block h-[132px] w-[92px]" title={`${b.title} — ${b.author}`}>
                {b.cover_url ? (
                  <Image src={b.cover_url} alt="" fill sizes="92px" className="object-cover" />
                ) : (
                  <span className="big flex h-[132px] w-full items-center justify-center p-2 text-center" style={{ fontSize: 10, background: "var(--boxbg)" }}>{b.title}</span>
                )}
              </Link>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "var(--soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            pictured: fourteen volumes awaiting judgment · photographs by staff
          </p>
        </section>

        {/* stories */}
        <section className="mt-12">
          <div className="flex flex-col gap-8">
            {reviews.length > 0 && <LeadStory book={reviews[0]} defaultOpen />}
            <div className="grid gap-8 md:grid-cols-2">
              {rest.map((b, j) =>
                j % 3 === 2 ? (
                  <BriefStory key={b.id} book={b} i={j + 1} />
                ) : (
                  <ColumnStory key={b.id} book={b} i={j + 1} />
                )
              )}
            </div>
          </div>
        </section>

        <footer className="mt-16">
          <div className="rule-x" />
          <p className="py-3 text-center" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--soft)", textTransform: "uppercase" }}>
            sunday&rsquo;s shelf press · corrections: none — we stand by every star
          </p>
          <div className="rule-thin torn" style={{ height: 12 }} />
        </footer>
      </div>
    </div>
  );
}
