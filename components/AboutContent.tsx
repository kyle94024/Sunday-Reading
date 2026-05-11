"use client";

import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

export function AboutContent({ text, name }: { text: string; name: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative mx-auto max-w-5xl px-6 pt-40 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="mb-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.45em] text-ink-muted/70"
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-bright/60" />
        Profile
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
        {/* Profile column */}
        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative h-44 w-44 overflow-hidden rounded-full glow-ring transition-transform duration-700 hover:scale-[1.04]"
            aria-label="Profile portrait"
          >
            <div
              className="absolute inset-0"
              style={{
                background: hovered
                  ? "conic-gradient(from 200deg, #a855f7, #ec4899, #c084fc, #a855f7)"
                  : "conic-gradient(from 0deg, #6d28d9, #a855f7, #ec4899, #6d28d9)",
                transition: "background 1.5s ease",
                filter: "saturate(110%)",
              }}
            />
            <div
              className="absolute inset-[3px] rounded-full bg-bg flex items-center justify-center"
            >
              <span className="font-display text-6xl text-gradient-violet">
                {name.charAt(0)}
              </span>
            </div>
          </button>
          <h1 className="mt-8 font-display text-4xl tracking-[0.18em] text-gradient-violet">
            {name.toUpperCase()}
          </h1>
          <p className="mt-2 text-[11px] uppercase tracking-[0.4em] text-ink-muted/70">
            Reader · Listener · Slow Walker
          </p>
          <div className="mt-6 h-px w-20 bg-gradient-to-r from-violet-bright/60 to-transparent" />
          <dl className="mt-6 space-y-3 text-sm text-ink-muted/85 font-serif">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted/60">
                Reading
              </dt>
              <dd className="italic">at the speed of soundtracks</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted/60">
                Currently
              </dt>
              <dd className="italic">tracing Limbus' twelve threads</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted/60">
                Begun
              </dt>
              <dd className="italic">school year, 2025</dd>
            </div>
          </dl>
        </motion.aside>

        {/* Body column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-serif text-[1.15rem] leading-[1.85] text-ink/90 [&_p]:mb-6 [&_em]:text-violet-glow [&_em]:not-italic [&_em]:font-medium"
        >
          <h2 className="mb-8 font-display text-3xl text-ink/95">
            <span className="shimmer">Hello —</span>
          </h2>
          <ReactMarkdown>{text}</ReactMarkdown>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Books read", value: "3", sub: "and counting" },
              { label: "On the shelf", value: "9", sub: "from Limbus alone" },
              { label: "Soundtracks", value: "∞", sub: "always running" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-5 text-center transition hover:-translate-y-1"
              >
                <div className="font-display text-4xl text-gradient-violet">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted/70">
                  {stat.label}
                </div>
                <div className="mt-1 font-serif italic text-sm text-ink-muted/80">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
