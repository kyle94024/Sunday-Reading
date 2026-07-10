"use client";

import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/db";
import { romanize, yearLabel } from "../util";
import { Marquee, SideRails } from "../zf/core";
import { Chain, ClockGlyph, Die, Hex, LC_STATUS, LcTheme, SinIcon, SINS, lcRails, riskClass, sinnerNumeral, sinnerSlug } from "./lc";

/* the book's mark, sans characters: the sinner's canonical numeral in a
   hexagon; Dante gets his clock; the Golden Bough gets a star */
function Emblem({ b, size, color }: { b: Book; size: number; color: string }) {
  const num = sinnerNumeral(b.limbus_sinner);
  const isDante = sinnerSlug(b.limbus_sinner) === "dante";
  return (
    <Hex size={size} color={color} glow={`${color}55`}>
      {isDante ? (
        <ClockGlyph size={size * 0.54} color={color} />
      ) : num ? (
        <span className="display" style={{ fontSize: size * 0.34, color }}>{num}</span>
      ) : (
        <span style={{ fontSize: size * 0.4, color, lineHeight: 1 }}>✦</span>
      )}
    </Hex>
  );
}

const HERO: Record<LcTheme, { kicker: string; title: string; sub: string }> = {
  canto: { kicker: "sunday's shelf presents", title: "The Fourteen Cantos", sub: "the literary works behind Limbus Company, kept and judged faithfully" },
  terminal: { kicker: "limbus transit authority", title: "MEPHISTOPHELES", sub: "express service · fourteen stops through hell · mind the gap" },
  library: { kicker: "the library receives its guests", title: "The Library", sub: "fourteen volumes are expected this evening" },
  dossier: { kicker: "limbus company — reading division", title: "CASE FILES 01–14", sub: "source texts, subjects, and shelf status. handle accordingly." },
};

function Cover({ book, w, h, className = "" }: { book: Book; w: number; h: number; className?: string }) {
  if (!book.cover_url) return null;
  return (
    <span className={`relative block shrink-0 overflow-hidden ${className}`} style={{ width: w, height: h, border: "1px solid var(--line)" }}>
      <Image src={book.cover_url} alt="" fill sizes={`${w}px`} className="object-cover" />
    </span>
  );
}

function statusWord(theme: LcTheme, b: Book) {
  return LC_STATUS[theme][b.status] ?? b.status;
}

/* ── canto: gold-framed opera plates ── */
function CantoPlate({ b, i }: { b: Book; i: number }) {
  const color = b.limbus_color || "#c9a45c";
  return (
    <article className="lc-panel lc-ornate flex items-center gap-6 p-6">
      <span className="floret" style={{ top: 5, left: 8 }}>❖</span>
      <span className="floret" style={{ top: 5, right: 8 }}>❖</span>
      <span className="floret" style={{ bottom: 5, left: 8 }}>❖</span>
      <span className="floret" style={{ bottom: 5, right: 8 }}>❖</span>
      <span className="display hidden w-14 text-center sm:block" style={{ fontSize: 26, color: "var(--gold)", opacity: 0.85 }} aria-hidden>
        {romanize(i + 1)}
      </span>
      <span className="hidden md:block" aria-hidden>
        <Emblem b={b} size={92} color={color} />
      </span>
      <Cover book={b} w={78} h={112} />
      <div className="min-w-0 flex-1">
        <div className="sc" style={{ color }}>{b.limbus_sinner ? `the sinner ${b.limbus_sinner}` : "the golden bough itself"}</div>
        <h3 className="serif mt-1 leading-tight" style={{ fontSize: "clamp(1.3rem,3vw,1.85rem)", color: "var(--ink)" }}>{b.title}</h3>
        <p className="serif mt-1 italic" style={{ color: "var(--soft)", fontSize: "1.02rem" }}>
          {b.author}, {yearLabel(b.year_published)}
        </p>
      </div>
      <span className="seal hidden sm:inline-block">{statusWord("canto", b)}</span>
    </article>
  );
}

/* ── terminal: departure-board manifest rows ── */
function TerminalRow({ b, i }: { b: Book; i: number }) {
  const lampColor = b.status === "read" ? "#3fd67a" : b.status === "reading" ? "#e8a33d" : "#5a6f60";
  return (
    <li className="lc-row grid grid-cols-[44px_52px_1fr] items-center gap-4 px-4 py-3 sm:grid-cols-[44px_52px_1fr_auto]">
      <span className="display" style={{ fontSize: 24, color: "var(--gold)" }} aria-hidden>{String(i + 1).padStart(2, "0")}</span>
      <Emblem b={b} size={46} color={b.limbus_color || "#e8a33d"} />
      <div className="min-w-0">
        <div className="display truncate" style={{ fontSize: 21, color: "var(--ink)", letterSpacing: "0.03em" }}>{b.title.toUpperCase()}</div>
        <div style={{ fontSize: 11.5, color: "var(--soft)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {b.limbus_sinner ? `passenger · ${b.limbus_sinner}` : "unclaimed cargo"} · {b.author}
        </div>
      </div>
      <span className="hidden items-center gap-2 sm:flex" style={{ color: lampColor }}>
        <span className={`lamp ${b.status === "reading" ? "lc-blink" : ""}`} />
        <span className="display" style={{ fontSize: 16 }}>{statusWord("terminal", b)}</span>
      </span>
    </li>
  );
}

/* ── library: invitation cards ── */
function InvitationCard({ b }: { b: Book }) {
  const color = b.limbus_color || "#b98d54";
  return (
    <article className="lc-panel lc-ornate p-6 text-center">
      <span className="floret" style={{ top: 5, left: 8 }}>✦</span>
      <span className="floret" style={{ top: 5, right: 8 }}>✦</span>
      <div className="flex justify-center">
        <Emblem b={b} size={84} color={b.limbus_color || "#b98d54"} />
      </div>
      <div className="sc mt-4">the library extends its invitation</div>
      <h3 className="display mt-1.5 leading-tight" style={{ fontSize: "1.45rem", color: "var(--ink)" }}>{b.title}</h3>
      <p className="serif mt-1 italic" style={{ color: "var(--soft)" }}>
        {b.author} · {yearLabel(b.year_published)}
      </p>
      <div className="mt-4 flex items-center justify-center gap-2.5">
        <span className="wax" style={{ background: color }} aria-hidden />
        <span className="sc gold">{statusWord("library", b)}</span>
      </div>
    </article>
  );
}

/* ── dossier: manila case files ── */
function CaseFile({ b, i }: { b: Book; i: number }) {
  const rating = b.rating != null ? Number(b.rating) : null;
  return (
    <article className="folder p-5 pt-6">
      <span className="folder-tab">CASE {String(i + 1).padStart(2, "0")}</span>
      <div className="flex flex-wrap items-start gap-5">
        <span className="photo-d relative grid shrink-0 place-items-center" style={{ transform: `rotate(${i % 2 ? 2.5 : -2.5}deg)`, minWidth: 96, minHeight: 96 }}>
          <span className="clip" style={{ left: 14 }} aria-hidden />
          {!b.limbus_sinner ? (
            <span className="relative block overflow-hidden" style={{ width: 84, height: 84 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/drafts/lc/cg-goldenbough.png" alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
            </span>
          ) : i % 2 ? (
            <Emblem b={b} size={64} color="var(--ink)" />
          ) : (
            <Die size={62} pips={(((i / 2) % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6} color="var(--ink)" rotate={i % 4 ? 8 : -8} />
          )}
        </span>
        <Cover book={b} w={62} h={90} className="hidden sm:block" />
        <div className="min-w-0 flex-1" style={{ fontFamily: "var(--font-typewriter), monospace" }}>
          <h3 style={{ fontSize: "1.15rem", letterSpacing: "0.02em" }}>{b.title}</h3>
          <div className="mt-2 space-y-1" style={{ fontSize: 12.5, color: "var(--soft)" }}>
            <div>AUTHOR &nbsp;·&nbsp; {b.author}, {yearLabel(b.year_published)}</div>
            <div>
              SUBJECT &nbsp;·&nbsp;{" "}
              {b.limbus_sinner ? b.limbus_sinner.toUpperCase() : <span className="redact">GOLDEN BOUGH</span>}
            </div>
            <div>RISK &nbsp;&nbsp;&nbsp;·&nbsp; {riskClass(rating)}</div>
          </div>
        </div>
        <span className="stamp self-center">{statusWord("dossier", b)}</span>
      </div>
    </article>
  );
}

/* ── the page ── */
export function LimbusFam({ theme, books }: { theme: LcTheme; books: Book[] }) {
  const hero = HERO[theme];
  const rails = lcRails(theme);

  return (
    <div className={`d-lc t-${theme}`}>
      <div className={`zf-edge zf-edge-left edge-${theme}`} aria-hidden />
      <div className={`zf-edge zf-edge-right edge-${theme}`} aria-hidden />
      <SideRails left={rails.left} right={rails.right} />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="sc">est. 2026</span>
          <div className="flex gap-6">
            <Link href="/">home</Link>
            <Link href={`/drafts/${theme}-about`}>about</Link>
            <Link href="/drafts">drafts</Link>
          </div>
        </nav>

        {/* hero */}
        <header className="mt-12 text-center">
          <div className="sc gold">{hero.kicker}</div>
          <h1 className={`display mt-3 leading-none ${theme === "canto" ? "lc-breathe" : ""}`} style={{ fontSize: theme === "terminal" ? "clamp(2.6rem,8vw,4.6rem)" : "clamp(2.4rem,7vw,4rem)", color: "var(--gold)", textShadow: theme === "dossier" ? "none" : "0 0 34px color-mix(in oklab, var(--gold) 45%, transparent)" }}>
            {hero.title}
          </h1>
          <p className={`mt-3 ${theme === "canto" || theme === "library" ? "serif italic" : ""}`} style={{ color: "var(--soft)", fontSize: theme === "terminal" ? 13 : 15, letterSpacing: theme === "terminal" ? "0.18em" : undefined, textTransform: theme === "terminal" ? "uppercase" : undefined }}>
            {hero.sub}
          </p>

          {theme === "canto" && (
            <div className="mt-8 flex items-center justify-center gap-8" aria-hidden>
              <span className="hidden sm:block"><Chain links={4} size={13} style={{ opacity: 0.75 }} /></span>
              <Hex size={150} glow="rgba(201,164,92,0.6)">
                <ClockGlyph size={82} className="lc-flicker" />
              </Hex>
              <span className="hidden sm:block"><Chain links={4} size={13} style={{ opacity: 0.75 }} /></span>
            </div>
          )}
          {theme === "library" && (
            <div className="mt-6 flex items-center justify-center gap-4" aria-hidden>
              {SINS.map((s, i) => (
                <SinIcon key={s} sin={s} size={i === 3 ? 40 : 30} className="lc-flicker" style={{ animationDelay: `${-i * 0.7}s`, filter: "drop-shadow(0 0 10px rgba(185,141,84,0.6))" }} />
              ))}
            </div>
          )}
          {theme === "dossier" && (
            <div className="mt-5 flex items-center justify-center gap-4">
              <span className="stamp" style={{ transform: "rotate(-6deg)", fontSize: 15 }}>classified</span>
              <span className="stamp" style={{ transform: "rotate(4deg)", borderColor: "var(--gold)", color: "var(--gold)" }}>reading division</span>
            </div>
          )}

          <div className="glowline mx-auto mt-8 max-w-md" />
        </header>

        {theme === "terminal" && (
          <div className="mt-6" style={{ border: "1px solid var(--line)", background: "var(--panel)", color: "var(--gold)" }}>
            <Marquee speed={30} className="display" style={{ fontSize: 18, padding: "6px 0" }}>
              {books.map((b) => b.title.toUpperCase()).join("  ◆  ")}{"  ◆  "}
            </Marquee>
          </div>
        )}

        {/* the fourteen */}
        <section className="mt-12">
          {theme === "canto" && (
            <div className="flex flex-col gap-7">
              {books.map((b, i) => <CantoPlate key={b.id} b={b} i={i} />)}
            </div>
          )}
          {theme === "terminal" && (
            <div className="lc-panel">
              <div className="grid grid-cols-[44px_52px_1fr] gap-4 px-4 py-2 sm:grid-cols-[44px_52px_1fr_auto]" style={{ borderBottom: "2px solid var(--line)" }}>
                {["stop", "face", "volume", "status"].map((h, i) => (
                  <span key={h} className={`sc gold ${i === 3 ? "hidden sm:block" : ""}`}>{h}</span>
                ))}
              </div>
              <ul>{books.map((b, i) => <TerminalRow key={b.id} b={b} i={i} />)}</ul>
            </div>
          )}
          {theme === "library" && (
            <div className="grid gap-7 sm:grid-cols-2">
              {books.map((b) => <InvitationCard key={b.id} b={b} />)}
            </div>
          )}
          {theme === "dossier" && (
            <div className="flex flex-col gap-10">
              {books.map((b, i) => <CaseFile key={b.id} b={b} i={i} />)}
            </div>
          )}
        </section>

        <footer className="mt-16 text-center">
          <div className="glowline mx-auto max-w-sm" />
          <p className="sc mt-5">
            fourteen volumes · one shelf ·{" "}
            <Link href="/limbus" style={{ color: "var(--gold)" }}>the current page</Link>
          </p>
          <p className="mt-2" style={{ fontSize: 10.5, color: "var(--soft)", letterSpacing: "0.08em" }}>
            sin iconography © Project Moon · non-commercial fan shelf
          </p>
        </footer>
      </div>
    </div>
  );
}
