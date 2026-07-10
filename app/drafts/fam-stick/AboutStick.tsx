"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { RATING_LEVELS, RatingStar } from "@/components/RatingPips";
import { Pic, SideRails, Sparkle, Star } from "../zf/core";
import { CAST } from "./StickFam";
import { STICK_ROUTES } from "./LimbusStick";
import type { StickTheme } from "./StickFam";

function RatingLegend() {
  return (
    <div className="mt-6 w-full text-left">
      <span className="chip c1" style={{ fontSize: 11 }}>how i rate</span>
      <ul className="mt-3 space-y-2">
        {RATING_LEVELS.map((lvl) => (
          <li key={lvl.label} className="flex items-center gap-3">
            <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: lvl.gradient ?? lvl.color, boxShadow: `${lvl.glow}, 0 0 0 2px #fff` }} />
            <span className="round font-bold" style={{ fontSize: 13.5 }}>{lvl.label.toLowerCase()}</span>
            <span className="ml-auto" style={{ fontSize: 10.5, opacity: 0.65 }}>{lvl.range}</span>
          </li>
        ))}
        <li className="flex items-center gap-3 pt-2" style={{ borderTop: "2px dashed color-mix(in oklab, var(--ink) 26%, transparent)" }}>
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center"><RatingStar fill={1} size={15} /></span>
          <span className="round font-bold" style={{ fontSize: 13.5 }}>and, rarely, beyond</span>
          <span className="ml-auto" style={{ fontSize: 10.5, opacity: 0.65 }}>5.0+</span>
        </li>
      </ul>
    </div>
  );
}

export function AboutStick({ theme, text, contributors }: { theme: StickTheme; text: string; contributors: string[] }) {
  const cast = CAST[theme];
  const routes = STICK_ROUTES[theme];
  return (
    <div className={`d-stick2 t-${theme}`}>
      <div className="zf-edge zf-edge-left edge-scallop-left" aria-hidden />
      <div className="zf-edge zf-edge-right edge-scallop-right" aria-hidden />

      <SideRails
        left={[
          <Pic key="m0" name={cast.mascots[0]} size={64} />,
          <Star key="s0" size={28} color="var(--a4)" />,
          <Pic key="d0" name={cast.doodads[3]} size={50} />,
          <Pic key="m1" name={cast.mascots[1]} size={56} flip />,
          <Pic key="d1" name={cast.doodads[0]} size={44} />,
          <Sparkle key="k0" size={26} color="var(--a1)" />,
          <Pic key="d2" name={cast.doodads[4]} size={46} />,
          <Pic key="m2" name={cast.mascots[2 % cast.mascots.length]} size={60} />,
        ]}
        right={[
          <Pic key="d0" name={cast.doodads[5]} size={50} />,
          <Pic key="m0" name={cast.mascots[2 % cast.mascots.length]} size={62} flip />,
          <Sparkle key="k0" size={24} color="var(--a3)" />,
          <Pic key="d1" name={cast.doodads[1]} size={44} />,
          <Pic key="m1" name={cast.mascots[0]} size={56} flip />,
          <Star key="s0" size={26} color="var(--a2)" />,
          <Pic key="d2" name={cast.doodads[2]} size={48} />,
          <Pic key="m2" name={cast.mascots[1]} size={56} />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="chip c4" style={{ fontSize: 12 }}>est. 2026 ✦</span>
          <div className="flex gap-2">
            <Link href={routes.home}>home</Link>
            <Link href={routes.limbus}>limbus</Link>
            <Link href="/drafts">drafts</Link>
          </div>
        </nav>

        <header className="mt-10">
          <h1 className="flex flex-wrap items-center gap-3">
            <span className="chip c1" style={{ fontSize: 16 }}>about me</span>
            <span className="round font-bold" style={{ fontSize: 15, opacity: 0.75 }}>club president, membership card no. 001</span>
          </h1>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          {/* membership card */}
          <aside className="stick relative self-start p-6 text-center" style={{ transform: "rotate(-0.8deg)" }}>
            <span className="pointer-events-none absolute -right-4 -top-7" aria-hidden><Pic name={cast.mascots[2 % cast.mascots.length]} size={48} /></span>
            <div className="flex justify-center">
              <span className="relative inline-block h-[124px] w-[124px] overflow-hidden rounded-[18px]" style={{ boxShadow: "0 0 0 4px #fff, 0 0 0 5.5px color-mix(in oklab, var(--ink) 30%, transparent), 0 10px 22px -10px color-mix(in oklab, var(--ink) 42%, transparent)", transform: "rotate(2deg)" }}>
                <Image src="/kyle.jpg" alt="Kyle" fill sizes="124px" className="object-cover" />
              </span>
            </div>
            <h2 className="round mt-4 font-bold" style={{ fontSize: 34 }}>Kyle</h2>
            <div className="mt-1"><span className="chip c3" style={{ fontSize: 11 }}>fiction aficionado</span></div>
            <dl className="mt-5 space-y-3 text-left">
              <div>
                <dt className="chip c2" style={{ fontSize: 9.5 }}>currently reading</dt>
                <dd className="round mt-1 font-bold" style={{ fontSize: 15 }}>1950s and beyond</dd>
              </div>
              <div>
                <dt className="chip c2" style={{ fontSize: 9.5 }}>started reviewing</dt>
                <dd className="round mt-1 font-bold" style={{ fontSize: 15 }}>may 2026</dd>
              </div>
            </dl>
            <RatingLegend />
          </aside>

          {/* the note */}
          <div>
            {contributors.length > 0 && (
              <div className="mb-8">
                <span className="chip c2" style={{ fontSize: 11 }}>club members</span>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {contributors.map((name, i) => (
                    <span key={name} className={`chip ${["c1", "c3", "c4"][i % 3]}`} style={{ fontSize: 12, transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <section className="stick prose relative" style={{ padding: "28px 32px 18px", transform: "rotate(0.4deg)" }}>
              <span className="pointer-events-none absolute -top-7 right-8" aria-hidden><Pic name={cast.mascots[0]} size={48} /></span>
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="round font-bold" style={{ fontSize: 24, color: "color-mix(in oklab, var(--a1) 80%, var(--ink))", margin: "1em 0 0.4em" }}>{children}</h2>
                  ),
                }}
              >
                {text}
              </ReactMarkdown>
            </section>
          </div>
        </div>

        <footer className="mt-20 text-center">
          <p className="round font-bold" style={{ fontSize: 16, opacity: 0.7 }}>
            signed with a sticker ✦ sunday&rsquo;s shelf
          </p>
          <p className="mt-1" style={{ fontSize: 11, opacity: 0.55 }}>
            critters by{" "}
            <a href="https://openmoji.org" target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>OpenMoji</a>{" "}
            · CC BY-SA 4.0
          </p>
        </footer>
      </div>
    </div>
  );
}
