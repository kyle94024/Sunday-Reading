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
        — Books —
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30, letterSpacing: "0.2em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[clamp(2.25rem,6.5vw,5rem)] leading-[1.02] text-gradient-violet max-w-[92vw]"
      >
        {name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
        className="mt-6 font-serif text-2xl italic text-ink-muted/90 sm:text-3xl"
      >
        {tagline}
      </motion.p>

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
