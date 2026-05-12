"use client";

import { motion } from "motion/react";

export function Contributors({ names }: { names: string[] }) {
  if (names.length === 0) return null;
  return (
    <section className="relative mx-auto max-w-3xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.45em] text-ink-muted/65">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-bright/40" />
          Contributors
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-bright/40" />
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-serif italic text-ink-muted/85">
          {names.map((name, i) => (
            <li key={name} className="inline-flex items-center gap-3">
              <span>{name}</span>
              {i < names.length - 1 && (
                <span aria-hidden className="text-violet-bright/50">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
