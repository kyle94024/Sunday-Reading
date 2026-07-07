import Link from "next/link";

const DRAFTS = [
  {
    href: "/drafts/catalog",
    n: "I",
    name: "The Card Catalog",
    pitch:
      "A midnight library's card drawer: cream index cards, typewriter slips, red rubber stamps, hole punches, a date-due grid.",
    keeps: "the dark purple room",
    changes: "gradients & glass → paper, ink, and stamps",
    palette: ["#f5eedb", "#c1301c", "#191022", "#b98b4e"],
  },
  {
    href: "/drafts/atlas",
    n: "II",
    name: "The Celestial Atlas",
    pitch:
      "A vintage star chart of your reading sky: gold hairlines, a plotted Limbus constellation, observation-log review plates.",
    keeps: "the cosmos identity",
    changes: "glow & blur → engraved instrument precision",
    palette: ["#05060f", "#d8c08a", "#f4efe2", "#30365c"],
  },
  {
    href: "/drafts/zine",
    n: "III",
    name: "The Zine",
    pitch:
      "Photocopier punk: hard offset shadows, stickers and tape, acid highlights, huge grotesque type. Loud and unmistakably human.",
    keeps: "the violet heart",
    changes: "elegance → energy; soft glow → hard edges",
    palette: ["#6d28d9", "#d9ff3d", "#f7f5ef", "#0b0a0c"],
  },
  {
    href: "/drafts/manor",
    n: "IV",
    name: "Ex Libris",
    pitch:
      "A private library bookplate: candlelight, gold tooling, a shelf of leather spines, wax seals, antique Fell type.",
    keeps: "the bookish romance",
    changes: "neon violet → aubergine, brass & candle-warmth",
    palette: ["#171019", "#c9a45c", "#8c2f26", "#2a1a2e"],
  },
];

export const metadata = { title: "Style drafts · Sunday's Shelf" };

export default function DraftsIndex() {
  return (
    <div className="min-h-screen bg-[#0b0812] px-6 py-20 text-[#efeaf6]">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/40">
          Style drafts · unlisted
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-[0.02em] sm:text-5xl">
          Four ways Sunday&rsquo;s Shelf could feel
        </h1>
        <p className="mt-4 max-w-xl font-serif text-lg text-white/70">
          Same live content, four personalities. Click through — books,
          reviews, and ratings are pulled from the real database. Pick one, or
          point at the pieces you like and we&rsquo;ll cross-breed.
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {DRAFTS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-2xl text-white/35">
                  {d.n}
                </span>
                <h2 className="font-display text-2xl tracking-[0.02em] sm:text-3xl">
                  {d.name}
                </h2>
                <span className="ml-auto flex gap-1.5">
                  {d.palette.map((c) => (
                    <span
                      key={c}
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ background: c }}
                    />
                  ))}
                </span>
              </div>
              <p className="mt-3 max-w-2xl font-serif text-[1.05rem] leading-relaxed text-white/75">
                {d.pitch}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                keeps {d.keeps} · {d.changes}
                <span className="ml-3 inline-block text-white/60 transition group-hover:translate-x-1 group-hover:text-white">
                  visit →
                </span>
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] text-white/35">
          These pages are noindex and not linked from the site — safe to leave
          up while deciding.
        </p>
      </div>
    </div>
  );
}
