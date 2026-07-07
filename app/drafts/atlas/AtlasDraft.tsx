"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import type { Book } from "@/lib/db";
import { romanize, stampDate, yearLabel } from "../util";
import { IntroMd } from "../zf/core";

/* Fixed constellation coordinates — hand-plotted wander across the band. */
const POINTS: [number, number][] = [
  [34, 158], [108, 92], [182, 172], [258, 62], [332, 132], [410, 202],
  [486, 96], [560, 150], [636, 56], [712, 142], [790, 92], [860, 182],
  [926, 112], [986, 160],
];

/* Deterministic background specks (no Math.random → no hydration drift). */
const SPECKS = Array.from({ length: 42 }, (_, i) => {
  const t = ((i * 9301 + 49297) % 233280) / 233280;
  const u = ((i * 7919 + 104729) % 15485863) / 15485863;
  return {
    left: `${(t * 100).toFixed(2)}%`,
    top: `${(u * 100).toFixed(2)}%`,
    size: i % 9 === 0 ? 2.5 : 1.5,
    opacity: 0.25 + (i % 5) * 0.12,
  };
});

function coordFor(i: number): string {
  const ra = `${String((i * 97) % 24).padStart(2, "0")}h ${String((i * 37) % 60).padStart(2, "0")}m`;
  const dec = `${i % 2 ? "−" : "+"}${String((i * 13) % 68).padStart(2, "0")}°`;
  return `RA ${ra} · DEC ${dec}`;
}

function MagRow({ rating, showStar }: { rating: number; showStar: boolean }) {
  const glyphs = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, rating - i));
    return (
      <span
        key={i}
        aria-hidden
        style={{ opacity: 0.18 + fill * 0.82, color: "#d8c08a", fontSize: 15 }}
      >
        ✦
      </span>
    );
  });
  return (
    <span className="inline-flex items-center gap-1.5">
      {glyphs}
      {showStar && (
        <span aria-hidden style={{ color: "#f4d27a", textShadow: "0 0 8px rgba(244,210,122,0.8)" }}>
          ✶
        </span>
      )}
      <span className="smallcaps" style={{ marginLeft: 8, color: "#d8c08a" }}>
        mag {rating.toFixed(1)}
      </span>
    </span>
  );
}

function Constellation({ books }: { books: Book[] }) {
  return (
    <Link href="/limbus" className="figlink block">
      <svg
        viewBox="0 0 1020 260"
        className="w-full"
        role="img"
        aria-label="The Limbus Fourteen, charted"
      >
        <polyline
          className="constellation-line"
          points={POINTS.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke="#d8c08a"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeDasharray="1 5"
        />
        {books.slice(0, POINTS.length).map((b, i) => {
          const [x, y] = POINTS[i];
          const rating = b.rating != null ? Number(b.rating) : 0;
          const r = 2.6 + (b.status === "read" ? 2.2 : 0) + rating * 0.35;
          return (
            <g key={b.id} className="constellation-star">
              <title>{`${romanize(i + 1)} · ${b.title} — ${b.author}`}</title>
              {r > 4.4 && (
                <>
                  <line x1={x - r * 2.4} y1={y} x2={x + r * 2.4} y2={y} stroke="#d8c08a" strokeOpacity="0.45" strokeWidth="0.7" />
                  <line x1={x} y1={y - r * 2.4} x2={x} y2={y + r * 2.4} stroke="#d8c08a" strokeOpacity="0.45" strokeWidth="0.7" />
                </>
              )}
              <circle cx={x} cy={y} r={r} fill="#ece6d6" fillOpacity="0.92" />
              <circle cx={x} cy={y} r={r + 3} fill="none" stroke="#d8c08a" strokeOpacity="0.25" strokeWidth="0.6" />
              <text
                x={x + r + 6}
                y={y + 4}
                fontSize="10"
                fill="#a89f88"
                style={{ fontFamily: "var(--font-cinzel), serif", letterSpacing: "0.12em" }}
              >
                {romanize(i + 1)}
              </text>
            </g>
          );
        })}
      </svg>
    </Link>
  );
}

function Plate({
  book,
  n,
  defaultOpen = false,
}: {
  book: Book;
  n: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const rating = book.rating != null ? Number(book.rating) : null;
  const observed = stampDate(book.date_read);

  return (
    <article className="plate">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="block w-full cursor-pointer text-left"
        style={{ padding: "26px 30px 20px" }}
      >
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
          <span className="smallcaps">obs. № {String(n).padStart(3, "0")}</span>
          <span className="smallcaps">{coordFor(n)}</span>
          <span className="smallcaps" style={{ color: "#d8c08a" }}>
            [ {book.status === "read" ? "observed" : book.status === "reading" ? "in progress" : "awaiting skies"} ]
          </span>
          <span className="smallcaps ml-auto">{open ? "fold −" : "unfold +"}</span>
        </div>

        <div className="mt-4 flex items-start gap-6">
          {book.cover_url && (
            <span className="coverframe hidden shrink-0 sm:block">
              <span className="relative block h-[132px] w-[88px] overflow-hidden">
                <Image src={book.cover_url} alt="" fill sizes="88px" className="object-cover" style={{ filter: "saturate(0.85)" }} />
              </span>
            </span>
          )}
          <div className="min-w-0">
            <h3 className="display text-[clamp(1.3rem,3vw,1.9rem)] tracking-[0.06em]" style={{ color: "#ece6d6" }}>
              {book.title}
            </h3>
            <p className="italic" style={{ color: "#a89f88", fontSize: "1.05rem" }}>
              {book.author} · {yearLabel(book.year_published)}
              {book.limbus_sinner ? ` · under the sign of ${book.limbus_sinner}` : ""}
            </p>
            {rating != null && (
              <div className="mt-3">
                <MagRow rating={rating} showStar={book.show_star === true} />
              </div>
            )}
          </div>
        </div>
      </button>

      <div
        className="atlas-expand"
        style={{ maxHeight: open ? 4000 : 0, opacity: open ? 1 : 0 }}
        aria-hidden={!open}
      >
        <div style={{ padding: "0 30px 26px" }}>
          <div className="rule smallcaps mb-5" style={{ color: "#a89f88" }}>
            ✦
          </div>

          {book.reviewer_name && (
            <p className="smallcaps mb-4" style={{ color: "#d8c08a" }}>
              observed by {book.reviewer_name}
            </p>
          )}

          {book.summary && (
            <div className="mb-6">
              <div className="smallcaps mb-2">the argument —</div>
              <div className="prose" style={{ fontSize: "1.08rem", color: "#cfc7b2" }}>
                <ReactMarkdown>{book.summary}</ReactMarkdown>
              </div>
            </div>
          )}

          {book.review && (
            <div>
              <div className="smallcaps mb-2">the observation —</div>
              <div className="prose">
                <ReactMarkdown>{book.review}</ReactMarkdown>
              </div>
            </div>
          )}

          {observed && (
            <p className="smallcaps mt-2" style={{ color: "#a89f88" }}>
              logged {observed} · from this desk
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function AtlasDraft({
  name,
  tagline,
  intro,
  limbus,
  reviews,
}: {
  name: string;
  tagline: string;
  intro: string;
  limbus: Book[];
  reviews: Book[];
}) {
  return (
    <div className="d-atlas">
      {/* fixed background specks */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        {SPECKS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              background: "#ece6d6",
            }}
          />
        ))}
      </div>

      <div className="sheet">
        <span className="corner" style={{ top: 8, left: 10 }}>✦</span>
        <span className="corner" style={{ top: 8, right: 10 }}>✦</span>
        <span className="corner" style={{ bottom: 8, left: 10 }}>✦</span>
        <span className="corner" style={{ bottom: 8, right: 10 }}>✦</span>

        {/* nav */}
        <nav className="nav flex items-center justify-between">
          <span className="smallcaps" style={{ color: "#d8c08a" }}>MMXXVI</span>
          <div className="flex gap-8">
            <Link href="/">Home</Link>
            <Link href="/limbus">Limbus</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>

        {/* masthead */}
        <header className="mt-14 text-center">
          <svg viewBox="0 0 120 120" className="mx-auto mb-6 h-20 w-20" aria-hidden>
            <circle cx="60" cy="60" r="54" fill="none" stroke="#d8c08a" strokeOpacity="0.5" strokeWidth="1" />
            <circle cx="60" cy="60" r="40" fill="none" stroke="#d8c08a" strokeOpacity="0.3" strokeWidth="0.7" strokeDasharray="2 4" />
            <circle cx="60" cy="60" r="2.4" fill="#d8c08a" />
            <line x1="60" y1="4" x2="60" y2="20" stroke="#d8c08a" strokeOpacity="0.6" strokeWidth="1" />
            <line x1="60" y1="100" x2="60" y2="116" stroke="#d8c08a" strokeOpacity="0.6" strokeWidth="1" />
            <line x1="4" y1="60" x2="20" y2="60" stroke="#d8c08a" strokeOpacity="0.6" strokeWidth="1" />
            <line x1="100" y1="60" x2="116" y2="60" stroke="#d8c08a" strokeOpacity="0.6" strokeWidth="1" />
            {Array.from({ length: 24 }, (_, i) => {
              const a = (i / 24) * Math.PI * 2;
              // toFixed keeps server/client output byte-identical (no float drift)
              const x1 = (60 + Math.cos(a) * 50).toFixed(2);
              const y1 = (60 + Math.sin(a) * 50).toFixed(2);
              const x2 = (60 + Math.cos(a) * 54).toFixed(2);
              const y2 = (60 + Math.sin(a) * 54).toFixed(2);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d8c08a" strokeOpacity="0.5" strokeWidth="0.7" />;
            })}
          </svg>
          <div className="smallcaps" style={{ color: "#d8c08a" }}>carta lectoris</div>
          <h1 className="display mt-3 text-[clamp(2rem,6vw,3.6rem)] tracking-[0.14em]" style={{ color: "#ece6d6" }}>
            {name.toUpperCase()}
          </h1>
          <p className="mt-3 text-[1.25rem] italic" style={{ color: "#a89f88" }}>
            {tagline} — an atlas of read &amp; unread skies
          </p>
          <div className="rule mx-auto mt-6 max-w-md">◆</div>
        </header>

        {/* intro */}
        <section className="mx-auto mt-14 max-w-2xl">
          <div className="prose">
            <IntroMd text={intro} />
          </div>
        </section>

        {/* constellation */}
        <section className="mt-16">
          <div className="rule smallcaps mb-2" style={{ color: "#d8c08a" }}>
            fig. 1
          </div>
          <Constellation books={limbus} />
          <p className="mt-1 text-center text-[1.02rem] italic" style={{ color: "#a89f88" }}>
            The Limbus Fourteen, as charted from this desk. Brighter bodies have
            been visited; the rest await clear evenings. —{" "}
            <Link href="/limbus" className="underline decoration-dotted underline-offset-4" style={{ color: "#d8c08a" }}>
              full chart
            </Link>
          </p>
        </section>

        {/* observation plates */}
        <section className="mt-16">
          <div className="rule smallcaps mb-8" style={{ color: "#d8c08a" }}>
            the observations
          </div>
          <div className="flex flex-col gap-7">
            {reviews.map((b, i) => (
              <Plate key={b.id} book={b} n={i + 1} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="smallcaps mt-20 text-center" style={{ color: "#a89f88" }}>
          ☾ compiled under clear skies · sunday&rsquo;s shelf
        </footer>
      </div>
    </div>
  );
}
