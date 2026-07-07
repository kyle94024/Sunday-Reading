"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState, type ReactNode } from "react";
import type { Book } from "@/lib/db";
import { jitter, stampDate, yearLabel } from "../util";
import {
  Bear,
  Bow,
  Bunny,
  Butterfly,
  Cat,
  Doily,
  Duck,
  Envelope,
  Expandable,
  Flower,
  GlyphRating,
  Heart,
  IntroMd,
  PostStamp,
  Pushpin,
  SideRails,
  Sprig,
  Star,
  Strawberry,
  Washi,
} from "../zf/core";

export type ScrapTheme = "kraft" | "berry" | "picnic" | "lav";

/* per-theme extras: mascot roster + rail doodads + hero garnish */
const EXTRAS: Record<
  ScrapTheme,
  { mascots: ((i: number) => ReactNode)[]; doodads: ReactNode[]; word: string }
> = {
  kraft: {
    mascots: [
      (i) => <Cat key={i} size={38} color="#4a3550" />,
      (i) => <Bear key={i} size={40} />,
      (i) => <Bunny key={i} size={38} />,
    ],
    doodads: [
      <Flower key="a" size={34} color="#e8a0a8" />,
      <Bow key="b" size={30} color="#e8737f" />,
      <Doily key="c" size={50} />,
    ],
    word: "glued with too much glue",
  },
  berry: {
    mascots: [
      (i) => <Bunny key={i} size={40} cheeks="#e05c74" />,
      (i) => <Cat key={i} size={36} color="#58324a" />,
      (i) => <Bear key={i} size={38} cheeks="#e05c74" />,
    ],
    doodads: [
      <Strawberry key="a" size={30} />,
      <Bow key="b" size={32} color="#e05c74" />,
      <Doily key="c" size={52} />,
    ],
    word: "strawberry milk & margins",
  },
  picnic: {
    mascots: [
      (i) => <Duck key={i} size={38} />,
      (i) => <Bear key={i} size={38} />,
      (i) => <Bunny key={i} size={36} />,
    ],
    doodads: [
      <Butterfly key="a" size={34} color="#9cc3e0" accent="#ecc25c" />,
      <Flower key="b" size={32} color="#ecc25c" center="#e8848f" />,
      <Bow key="c" size={28} color="#5f93bd" />,
    ],
    word: "packed like a picnic",
  },
  lav: {
    mascots: [
      (i) => <Bunny key={i} size={38} cheeks="#c9a8e8" />,
      (i) => <Cat key={i} size={36} color="#46375e" />,
      (i) => <Duck key={i} size={36} />,
    ],
    doodads: [
      <Sprig key="a" size={44} />,
      <Butterfly key="b" size={34} />,
      <Flower key="c" size={32} color="#c9b1e8" center="#f2c14e" />,
    ],
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

function WStats({ books }: { books: Book[] }) {
  const read = books.filter((b) => b.status === "read").length;
  const queued = books.filter((b) => b.status === "queued").length;
  return (
    <div className="sw" style={{ transform: "rotate(1.2deg)" }}>
      <span className="sw-tape" />
      <div className="sw-head">shelf stats</div>
      <div className="hand" style={{ fontSize: 17 }}>
        {read} finished · {queued} waiting
        <br />
        mood: <span style={{ color: "var(--a1)" }}>♥ ♥ ♥ ♥ ♡</span>
      </div>
    </div>
  );
}

function WCalendar() {
  return (
    <div className="sw" style={{ transform: "rotate(-0.8deg)" }}>
      <span className="sw-tape" />
      <div className="sw-head">may 2026</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
        {Array.from({ length: 28 }, (_, i) => (
          <span key={i} style={{ height: 8, borderRadius: 2, background: i === 12 ? "var(--a1)" : "color-mix(in oklab, var(--ink) 14%, transparent)" }} />
        ))}
      </div>
      <div className="hand" style={{ fontSize: 14, marginTop: 4 }}>♥ = review day</div>
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

function CardShell({ children, i, extra }: { children: ReactNode; i: number; extra?: ReactNode }) {
  return (
    <article className="page relative" style={{ transform: `rotate(${jitter(i + 1, 0.7)}deg)` }}>
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
  const mascotFns = EXTRAS[theme].mascots;
  const mascot = (
    <span className="pointer-events-none absolute -top-6 left-5 z-[2]" aria-hidden>
      {mascotFns[i % mascotFns.length](i)}
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
    <CardShell i={i} extra={deco}>
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
          <WNowReading key="w1" books={books} />,
          ex.doodads[0],
          <HandNote key="n1" size={21} rotate={-7}>so good!!</HandNote>,
          <WPhotoStrip key="w2" books={limbus} />,
          ex.mascots[0](901),
        ]}
        right={[
          <WStats key="w1" books={books} />,
          ex.doodads[1],
          <HandNote key="n1" size={21} rotate={6}>cried here →</HandNote>,
          <WCalendar key="w2" />,
          ex.doodads[2],
          ex.mascots[1](902),
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
            <Bow size={36} color="var(--a1)" />
          </span>
          <span className="hung zf-sway" style={{ left: "94%", top: 40, animationDuration: "8s" }}>
            <Envelope size={44} seal="var(--a1)" />
          </span>
        </div>

        <header className="relative mx-auto mt-6 max-w-xl text-center">
          <div className="page stitched relative" style={{ padding: "32px 26px 26px", transform: "rotate(-0.6deg)" }}>
            <span className="absolute -top-2 left-1/2 -translate-x-1/2"><Pushpin size={24} color="var(--a1)" /></span>
            <span className="pointer-events-none absolute -left-5 -top-7" aria-hidden>{ex.mascots[2](903)}</span>
            <span className="absolute -right-3 -bottom-3" aria-hidden><Bow size={34} color="var(--a1)" /></span>
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

        <footer className="hand mt-20 text-center text-[22px]" style={{ color: "color-mix(in oklab, var(--ink) 70%, transparent)" }}>
          {ex.word} ✿ sunday&rsquo;s shelf
        </footer>
      </div>
    </div>
  );
}
