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
  PostStamp,
  Pushpin,
  SideRails,
  Star,
  Washi,
} from "../zf/core";

export type ScrapTheme = "kraft" | "berry" | "picnic" | "lav";

/* per-theme extras: OpenMoji sprite names (files in public/drafts/om) */
const EXTRAS: Record<
  ScrapTheme,
  { mascots: string[]; doodads: string[]; word: string }
> = {
  kraft: {
    mascots: ["cat", "teddy", "rabbit"],
    doodads: ["blossom", "bow", "tea"],
    word: "glued with too much glue",
  },
  berry: {
    mascots: ["rabbit", "cat", "teddy"],
    doodads: ["strawberry", "bow", "ladybug"],
    word: "strawberry milk & margins",
  },
  picnic: {
    mascots: ["duck", "teddy", "rabbit"],
    doodads: ["butterfly", "sunflower", "basket"],
    word: "packed like a picnic",
  },
  lav: {
    mascots: ["rabbit", "cat", "butterfly"],
    doodads: ["bouquet", "herb", "tulip"],
    word: "pressed like lavender",
  },
};

function HandNote({ children, rotate = -3, size = 21 }: { children: ReactNode; rotate?: number; size?: number }) {
  return (
    <span className="hand doodle-note" style={{ display: "inline-block", transform: `rotate(${rotate}deg)`, fontSize: size }}>
      {children}
    </span>
  );
}

/* ── sidebar widgets (real data, not just confetti) ── */

function WNowReading({ books }: { books: Book[] }) {
  const cur = books.find((b) => b.status === "reading") ?? books.find((b) => b.status === "queued");
  if (!cur) return null;
  return (
    <div className="sw zf-hot" style={{ transform: "rotate(-1.4deg)" }}>
      <span className="sw-tape" />
      <div className="sw-head">on the nightstand</div>
      <Link href="/limbus" className="flex items-center gap-2" style={{ textDecoration: "none", color: "inherit" }}>
        {cur.cover_url && (
          <span className="relative block h-[44px] w-[30px] shrink-0 overflow-hidden border" style={{ borderColor: "color-mix(in oklab, var(--ink) 30%, transparent)" }}>
            <Image src={cur.cover_url} alt="" fill sizes="30px" className="object-cover" />
          </span>
        )}
        <span className="hand" style={{ fontSize: 16, lineHeight: 1.15 }}>{cur.title}</span>
      </Link>
    </div>
  );
}

/* hand-written table of contents — anchors jump to each review page */
function WContents({ reviews }: { reviews: Book[] }) {
  return (
    <div className="sw zf-hot" style={{ transform: "rotate(1.2deg)" }}>
      <span className="sw-tape" />
      <div className="sw-head">in this album</div>
      <div className="flex flex-col" style={{ gap: 2 }}>
        {reviews.slice(0, 8).map((b, i) => (
          <a
            key={b.id}
            href={`#page-${i}`}
            className="hand block"
            style={{ fontSize: 15.5, lineHeight: 1.25, color: "var(--ink)", textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            <span style={{ color: "var(--a1)", fontWeight: 700 }}>{i + 1}.</span> {b.title}
          </a>
        ))}
      </div>
    </div>
  );
}

function WPhotoStrip({ books }: { books: Book[] }) {
  const three = books.filter((b) => b.cover_url).slice(0, 3);
  if (three.length < 3) return null;
  return (
    <div className="sw zf-hot" style={{ width: 84, padding: 7, transform: "rotate(1.8deg)" }}>
      <span className="sw-tape" />
      <Link href="/limbus" className="flex flex-col gap-1.5">
        {three.map((b) => (
          <span key={b.id} className="relative block h-[52px] w-full overflow-hidden">
            <Image src={b.cover_url!} alt="" fill sizes="70px" className="object-cover" />
          </span>
        ))}
      </Link>
      <div className="hand" style={{ fontSize: 13, textAlign: "center", marginTop: 3 }}>photobooth!</div>
    </div>
  );
}

/* ── three rotating card styles ── */

function CardShell({ children, i, id, extra }: { children: ReactNode; i: number; id?: string; extra?: ReactNode }) {
  return (
    <article id={id} className="page relative" style={{ transform: `rotate(${jitter(i + 1, 0.7)}deg)`, scrollMarginTop: 24 }}>
      {extra}
      {children}
    </article>
  );
}

function MetaRow({ book, open, mascot }: { book: Book; open: boolean; mascot: ReactNode }) {
  return (
    <div className="relative z-[1] flex flex-wrap items-center gap-3" style={{ paddingRight: 8 }}>
      <span className={`label ${book.status === "read" ? "a1" : book.status === "reading" ? "a2" : "a3"}`} style={{ fontSize: 11 }}>
        {book.status === "read" ? "finished!" : book.status === "reading" ? "reading now" : "someday pile"}
      </span>
      {book.reviewer_name && <HandNote rotate={-2} size={19}>✎ {book.reviewer_name} wrote this!</HandNote>}
      <span className="hand ml-auto text-[19px]" style={{ color: "var(--ink)" }}>
        {open ? "fold it up ↑" : "open me ↓"}
      </span>
      {mascot}
    </div>
  );
}

function CardBody({ book, open }: { book: Book; open: boolean }) {
  const finished = stampDate(book.date_read);
  return (
    <Expandable open={open}>
      <div style={{ padding: "0 26px 24px" }}>
        <div style={{ borderTop: "2px dashed color-mix(in oklab, var(--ink) 35%, transparent)", marginBottom: 16 }} />
        {book.summary && (
          <div className="mb-5">
            <HandNote size={22} rotate={-1}>what it&rsquo;s about —</HandNote>
            <div className="prose mt-1"><ReactMarkdown>{book.summary}</ReactMarkdown></div>
          </div>
        )}
        {book.review && (
          <div>
            <HandNote size={22} rotate={1}>dear diary —</HandNote>
            <div className="prose mt-1"><ReactMarkdown>{book.review}</ReactMarkdown></div>
          </div>
        )}
        {finished && <HandNote size={19} rotate={-2}>finished {finished.toLowerCase()} ✿</HandNote>}
      </div>
    </Expandable>
  );
}

function ScrapCard({ book, i, theme, defaultOpen = false }: { book: Book; i: number; theme: ScrapTheme; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const rating = book.rating != null ? Number(book.rating) : null;
  const exceptional = rating != null && rating >= 5.1;
  const kind = i % 3; // 0 taped page · 1 polaroid feature · 2 letter
  const names = EXTRAS[theme].mascots;
  const mascot = (
    <span className="pointer-events-none absolute -top-7 left-5 z-[2]" aria-hidden>
      <Pic name={names[i % names.length]} size={42} />
    </span>
  );

  const ratingRow =
    rating != null ? (
      <div className="mt-1.5">
        <GlyphRating rating={rating} glyph="♥" color="var(--a1)" size={18} showStar={book.show_star === true} starColor="#e0a92e" />
      </div>
    ) : null;

  const deco = (
    <>
      {kind === 0 && (
        <>
          <Washi w={90} h={22} color="color-mix(in oklab, var(--a2) 75%, white)" rotate={-5} className="absolute -top-2.5 left-14" />
          <Washi w={66} h={20} color="color-mix(in oklab, var(--a3) 85%, white)" rotate={5} className="absolute -top-2 right-10" />
        </>
      )}
      {kind === 2 && (
        <>
          <span className="absolute right-5 top-4" aria-hidden><PostStamp size={44} icon="var(--a1)" /></span>
          <span className="postmark" style={{ right: 44, top: 8 }}>SUNDAY<br />POST</span>
        </>
      )}
      {exceptional && (
        <span className="absolute -right-3 -top-4 z-[2] zf-bob" aria-hidden>
          <Star size={42} color="var(--a3)" />
        </span>
      )}
      {mascot}
    </>
  );

  return (
    <CardShell i={i} id={`page-${i}`} extra={deco}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className={`block w-full cursor-pointer text-left ${kind === 0 ? "stitched" : ""}`} style={{ padding: "26px 26px 16px" }}>
        <MetaRow book={book} open={open} mascot={null} />
        {kind === 1 ? (
          /* polaroid feature */
          <div className="mt-4 flex items-start gap-6">
            {book.cover_url && (
              <span className="photo relative w-[124px] shrink-0" style={{ transform: `rotate(${jitter(i + 4, 3)}deg)` }}>
                <span className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2"><Pushpin size={20} color="var(--a1)" /></span>
                <span className="relative block h-[142px] w-full overflow-hidden">
                  <Image src={book.cover_url} alt="" fill sizes="124px" className="object-cover" />
                </span>
                <span className="hand absolute bottom-0 left-0 right-0 text-center text-[15px]">{yearLabel(book.year_published)}</span>
              </span>
            )}
            <div className="min-w-0">
              <h3 className="hand leading-[1.05]" style={{ fontSize: "clamp(1.9rem,4.5vw,2.7rem)", color: "var(--ink)" }}>
                {book.title}
              </h3>
              <p className="mt-1 font-bold" style={{ fontSize: 13, color: "color-mix(in oklab, var(--ink) 75%, transparent)" }}>
                by {book.author}{book.limbus_sinner ? ` — ${book.limbus_sinner}'s book` : ""}
              </p>
              {ratingRow}
            </div>
          </div>
        ) : kind === 2 ? (
          /* letter */
          <div className="mt-4" style={{ paddingRight: 56 }}>
            <p className="hand" style={{ fontSize: 21, color: "color-mix(in oklab, var(--ink) 78%, transparent)" }}>dear reader,</p>
            <h3 className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1.5" style={{ fontSize: "clamp(1.2rem,3vw,1.7rem)" }}>
              {book.title.split(" ").map((w, wi) => (
                <span key={wi} className={`label ${wi % 2 ? "a1" : ""}`} style={{ transform: `rotate(${jitter(wi + i, 1.5)}deg)` }}>{w}</span>
              ))}
            </h3>
            <p className="hand mt-2 text-[20px]" style={{ color: "color-mix(in oklab, var(--ink) 78%, transparent)" }}>
              from {book.author}, {yearLabel(book.year_published)}
            </p>
            {ratingRow}
          </div>
        ) : (
          /* taped page */
          <div className="mt-4 flex items-start gap-6">
            {book.cover_url && (
              <span className="photo relative hidden w-[100px] shrink-0 sm:block" style={{ transform: `rotate(${jitter(i + 4, 3)}deg)`, padding: "6px 6px 18px" }}>
                <span className="relative block h-[112px] w-full overflow-hidden">
                  <Image src={book.cover_url} alt="" fill sizes="100px" className="object-cover" />
                </span>
              </span>
            )}
            <div className="min-w-0">
              <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1.5" style={{ fontSize: "clamp(1.25rem,3.2vw,1.8rem)" }}>
                {book.title.split(" ").map((w, wi) => (
                  <span key={wi} className={`label ${wi % 2 ? "a2" : ""}`} style={{ transform: `rotate(${jitter(wi + i, 1.6)}deg)` }}>{w}</span>
                ))}
              </h3>
              <p className="hand mt-2 text-[20px]" style={{ color: "color-mix(in oklab, var(--ink) 78%, transparent)" }}>
                by {book.author}{book.limbus_sinner ? ` — ${book.limbus_sinner}'s book` : ""}
              </p>
              {ratingRow}
            </div>
          </div>
        )}
      </button>
      <CardBody book={book} open={open} />
    </CardShell>
  );
}

/* ── the page ── */

export function ScrapFam({
  theme,
  name,
  tagline,
  intro,
  limbus,
  reviews,
  books,
}: {
  theme: ScrapTheme;
  name: string;
  tagline: string;
  intro: string;
  limbus: Book[];
  reviews: Book[];
  books: Book[];
}) {
  const ex = EXTRAS[theme];
  const hung = limbus.filter((b) => b.cover_url).slice(0, 5);

  return (
    <div className={`d-scrap2 t-${theme}`}>
      {/* gingham ribbons down the far edges */}
      <div className="zf-edge zf-edge-left edge-gingham" aria-hidden />
      <div className="zf-edge zf-edge-right edge-gingham" aria-hidden />

      <SideRails
        interactive
        left={[
          <WContents key="w1" reviews={reviews} />,
          <Pic key="d0" name={ex.doodads[0]} size={36} />,
          <Pic key="m0" name={ex.mascots[0]} size={46} />,
          <HandNote key="n1" size={21} rotate={-7}>so good!!</HandNote>,
          <Pic key="d1" name={ex.doodads[1]} size={32} />,
          <Pic key="m1" name={ex.mascots[1]} size={44} />,
        ]}
        right={[
          <WNowReading key="w1" books={books} />,
          <Pic key="m2" name={ex.mascots[2]} size={46} />,
          <HandNote key="n2" size={21} rotate={6}>cried here →</HandNote>,
          <WPhotoStrip key="w2" books={limbus} />,
          <Pic key="d2" name={ex.doodads[2]} size={36} />,
          <HandNote key="n3" size={20} rotate={-4}>read this twice ✓</HandNote>,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <HandNote size={22} rotate={-2}>est. 2026 ✿</HandNote>
          <div className="flex gap-6">
            <Link href="/">home</Link>
            <Link href="/limbus">limbus</Link>
            <Link href="/about">about</Link>
          </div>
        </nav>

        {/* hanging string: covers + a bow + an envelope */}
        <div className="string mt-8 hidden sm:block" aria-hidden>
          <svg className="line" viewBox="0 0 800 110" preserveAspectRatio="none">
            <path d="M0 18 Q 400 64 800 14" fill="none" stroke="color-mix(in oklab, var(--ink) 50%, transparent)" strokeWidth="2" />
          </svg>
          {hung.map((b, i) => (
            <span key={b.id} className="photo hung zf-sway" style={{ left: `${6 + i * 16}%`, width: 62, animationDuration: `${6 + (i % 3)}s`, padding: "4px 4px 12px", transform: `rotate(${jitter(i, 5)}deg)` }}>
              <span className="relative block h-[62px] w-full overflow-hidden">
                <Image src={b.cover_url!} alt="" fill sizes="62px" className="object-cover" />
              </span>
            </span>
          ))}
          <span className="hung zf-sway" style={{ left: "88%", animationDuration: "7s" }}>
            <Pic name="bow" size={38} />
          </span>
          <span className="hung zf-sway" style={{ left: "94%", top: 40, animationDuration: "8s" }}>
            <Pic name="loveletter" size={42} />
          </span>
        </div>

        <header className="relative mx-auto mt-6 max-w-xl text-center">
          <div className="page stitched relative" style={{ padding: "32px 26px 26px", transform: "rotate(-0.6deg)" }}>
            <span className="absolute -top-2 left-1/2 -translate-x-1/2"><Pushpin size={24} color="var(--a1)" /></span>
            <span className="pointer-events-none absolute -left-5 -top-8" aria-hidden><Pic name={ex.mascots[1]} size={48} /></span>
            <span className="pointer-events-none absolute -right-3 -bottom-3" aria-hidden><Pic name="bow" size={36} /></span>
            <h1 className="flex flex-wrap items-center justify-center gap-2" style={{ fontSize: "clamp(1.7rem,5.5vw,2.6rem)" }}>
              {name.split(" ").map((w, i) => (
                <span key={i} className={`label ${i % 2 ? "a1" : ""}`} style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>{w}</span>
              ))}
            </h1>
            <p className="hand mt-3 text-[24px]" style={{ color: "color-mix(in oklab, var(--ink) 78%, transparent)" }}>
              {tagline.toLowerCase()} ♡ kept by kyle
            </p>
          </div>
        </header>

        <section className="page lined prose relative mx-auto mt-14 max-w-2xl" style={{ padding: "26px 30px 14px", transform: "rotate(0.35deg)", lineHeight: "27px" }}>
          <Washi w={110} h={24} color="color-mix(in oklab, var(--a1) 60%, white)" rotate={-4} className="absolute -top-3 left-10" />
          <HandNote size={22} rotate={-1}>the story so far —</HandNote>
          <div className="mt-1"><IntroMd text={intro} /></div>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-4">
            <h2><span className="label a2" style={{ fontSize: 15 }}>the limbus fourteen</span></h2>
            <Link href="/limbus" className="hand text-[22px] zf-wiggle" style={{ color: "var(--a1)" }}>see them all →</Link>
          </div>
          <div className="zf-row">
            {limbus.map((b, i) => (
              <Link key={b.id} href="/limbus" className="photo relative" style={{ width: 126, transform: `rotate(${jitter(i, 3.4)}deg)` }}>
                <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
                  <Pushpin size={18} color={["var(--a1)", "var(--a2)", "var(--a3)"][i % 3]} />
                </span>
                {i % 4 === 2 && <Washi w={54} h={16} color="color-mix(in oklab, var(--a3) 80%, white)" rotate={-8} className="absolute -left-3 top-8 z-10" />}
                <span className="relative block h-[140px] w-full overflow-hidden">
                  {b.cover_url ? (
                    <Image src={b.cover_url} alt="" fill sizes="126px" className="object-cover" />
                  ) : (
                    <span className="hand flex h-full w-full items-center justify-center p-2 text-center text-[17px] leading-tight" style={{ background: "color-mix(in oklab, var(--a2) 40%, white)", color: "var(--ink)" }}>{b.title}</span>
                  )}
                </span>
                <span className="hand block pt-1 text-center text-[15px] leading-none" style={{ color: "var(--ink)" }}>{b.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-9">
            <span className="label a1" style={{ fontSize: 15 }}>pages about books</span>{" "}
            <HandNote size={22} rotate={-2}>← the good stuff</HandNote>
          </h2>
          <div className="flex flex-col gap-12">
            {reviews.map((b, i) => (
              <ScrapCard key={b.id} book={b} i={i} theme={theme} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="mt-20 text-center">
          <p className="hand text-[22px]" style={{ color: "color-mix(in oklab, var(--ink) 70%, transparent)" }}>
            {ex.word} ✿ sunday&rsquo;s shelf
          </p>
          <p className="mt-1 text-[11px]" style={{ color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
            critters &amp; props by{" "}
            <a href="https://openmoji.org" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
              OpenMoji
            </a>{" "}
            · CC BY-SA 4.0
          </p>
        </footer>
      </div>
    </div>
  );
}
