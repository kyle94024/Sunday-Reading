"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { RATING_LEVELS, RatingStar } from "@/components/RatingPips";
import { SideRails } from "../zf/core";
import { LcTheme, aboutRails } from "./lc";

const COPY: Record<
  LcTheme,
  { kicker: string; role: string; contributors: string; ratings: string }
> = {
  canto: { kicker: "dramatis personae", role: "keeper of the cantos", contributors: "the company", ratings: "how the verdicts fall" },
  terminal: { kicker: "operator's license", role: "conductor · route 14", contributors: "crew manifest", ratings: "signal codes" },
  library: { kicker: "the patron's record", role: "patron of the stacks", contributors: "fellow guests", ratings: "how books are weighed" },
  dossier: { kicker: "personnel file — manager K", role: "manager, reading division", contributors: "known associates", ratings: "risk classification key" },
};

function RatingLegend({ theme }: { theme: LcTheme }) {
  return (
    <div className="mt-7 w-full">
      <div className="sc gold">{COPY[theme].ratings}</div>
      <ul className="mt-3 space-y-2">
        {RATING_LEVELS.map((lvl) => (
          <li key={lvl.label} className="flex items-center gap-3">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: lvl.gradient ?? lvl.color, boxShadow: lvl.glow }} />
            <span style={{ fontSize: 13.5, color: "var(--ink)" }}>{lvl.label}</span>
            <span className="ml-auto" style={{ fontSize: 10.5, color: "var(--soft)", letterSpacing: "0.08em" }}>{lvl.range}</span>
          </li>
        ))}
        <li className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid var(--line)" }}>
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center"><RatingStar fill={1} size={15} /></span>
          <span className="italic" style={{ fontSize: 13.5, color: "var(--ink)" }}>and, rarely, beyond</span>
          <span className="ml-auto" style={{ fontSize: 10.5, color: "var(--soft)", letterSpacing: "0.08em" }}>5.0+</span>
        </li>
      </ul>
    </div>
  );
}

export function AboutFam({
  theme,
  text,
  contributors,
}: {
  theme: LcTheme;
  text: string;
  contributors: string[];
}) {
  const rails = aboutRails(theme);
  const copy = COPY[theme];

  const avatar =
    theme === "dossier" ? (
      <span className="photo-d relative inline-block" style={{ transform: "rotate(-3deg)" }}>
        <span className="clip" style={{ left: 16 }} aria-hidden />
        <span className="relative block h-28 w-28 overflow-hidden">
          <Image src="/kyle.jpg" alt="Kyle" fill sizes="112px" className="object-cover" />
        </span>
      </span>
    ) : (
      <span
        className="relative inline-block h-28 w-28 overflow-hidden rounded-full"
        style={{ border: "2px solid var(--gold)", boxShadow: "0 0 0 5px color-mix(in oklab, var(--gold) 20%, transparent), 0 0 40px -8px color-mix(in oklab, var(--gold) 55%, transparent)" }}
      >
        <Image src="/kyle.jpg" alt="Kyle" fill sizes="112px" className="object-cover" />
      </span>
    );

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
            <Link href={`/drafts/${theme}`}>limbus</Link>
            <Link href="/drafts">drafts</Link>
          </div>
        </nav>

        <header className="mt-12">
          <div className="sc gold">{copy.kicker}</div>
          <div className="glowline mt-3 max-w-xs" />
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[270px_1fr] lg:gap-14">
          {/* profile column */}
          <aside className={theme === "dossier" ? "folder p-6 pt-8 self-start" : "lc-panel lc-ornate p-6 self-start"}>
            {theme === "dossier" ? (
              <span className="folder-tab">SUBJECT · K</span>
            ) : (
              <>
                <span className="floret" style={{ top: 5, left: 8 }}>❖</span>
                <span className="floret" style={{ top: 5, right: 8 }}>❖</span>
              </>
            )}
            <div className="flex flex-col items-center text-center">
              {avatar}
              <h1 className="display mt-6" style={{ fontSize: "2.2rem", color: "var(--gold)" }}>Kyle</h1>
              <p className="sc mt-2">{copy.role}</p>
              <div className="glowline mt-5 w-24" />
              <dl className="mt-5 w-full space-y-3 text-left" style={{ fontSize: 13.5 }}>
                <div>
                  <dt className="sc" style={{ fontSize: 9.5 }}>currently reading</dt>
                  <dd style={{ color: "var(--ink)" }}>1950s and beyond</dd>
                </div>
                <div>
                  <dt className="sc" style={{ fontSize: 9.5 }}>started reviewing</dt>
                  <dd style={{ color: "var(--ink)" }}>May 2026</dd>
                </div>
              </dl>
              <RatingLegend theme={theme} />
            </div>
          </aside>

          {/* body column */}
          <div>
            {contributors.length > 0 && (
              <div className="mb-10">
                <div className="sc gold">{copy.contributors}</div>
                <ul className="mt-3 flex flex-wrap gap-2.5">
                  {contributors.map((name) => (
                    <li key={name} className="seal" style={{ color: "var(--ink)" }}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="lc-prose">
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>

            {(theme === "canto" || theme === "library") && (
              <div className="mt-12 flex items-center gap-4 opacity-90" aria-hidden>
                <span style={{ color: "var(--gold)", fontSize: 20, filter: "drop-shadow(0 0 8px color-mix(in oklab, var(--gold) 55%, transparent))" }}>❦</span>
                <div className="glowline flex-1" />
                <span style={{ color: "var(--gold)", fontSize: 14 }}>✦</span>
              </div>
            )}
            {theme === "dossier" && (
              <div className="mt-10 flex items-center gap-3">
                <span className="stamp">reviewed &amp; filed</span>
                <span className="stamp" style={{ borderColor: "var(--gold)", color: "var(--gold)", transform: "rotate(3deg)" }}>do not circulate</span>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 text-center">
          <div className="glowline mx-auto max-w-sm" />
          <p className="sc mt-5">
            the shelf keeps honest accounts ·{" "}
            <Link href="/about" style={{ color: "var(--gold)" }}>the current page</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
