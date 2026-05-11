"use client";

import { motion } from "motion/react";

type HeroProps = { name: string; tagline: string };

export function Hero({ name, tagline }: HeroProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-8 text-[11px] uppercase tracking-[0.5em] text-ink-muted/70"
      >
        books · 2025 —
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30, letterSpacing: "0.6em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-none tracking-[0.18em] text-gradient-violet"
      >
        {name.toUpperCase()}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
        className="mt-6 font-serif text-2xl italic text-ink-muted/90 sm:text-3xl"
      >
        {tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.5 }}
        className="mt-12 flex items-center gap-3 text-[11px] uppercase tracking-[0.45em] text-ink-muted/60"
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent via-violet-bright/60 to-transparent" />
        12 limbus books + everything else
        <span className="h-px w-12 bg-gradient-to-r from-transparent via-violet-bright/60 to-transparent" />
      </motion.div>

      <motion.a
        href="#intro"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.8, duration: 1 },
          y: { delay: 2, duration: 2.4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-10 text-ink-muted/70 hover:text-ink transition"
        aria-label="Scroll down"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M12 4v16m0 0l-7-7m7 7l7-7" strokeLinecap="round" />
        </svg>
      </motion.a>
    </section>
  );
}
