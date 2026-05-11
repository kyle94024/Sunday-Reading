"use client";

import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";

export function Intro({ text }: { text: string }) {
  return (
    <section
      id="intro"
      className="relative mx-auto max-w-3xl px-6 pb-28 pt-12 sm:pt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="mb-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.45em] text-ink-muted/70"
      >
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-bright/40" />
        How this started
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-bright/40" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="dropcap font-serif text-[1.18rem] leading-[1.85] text-ink/90 [&_p]:mb-6 [&_em]:text-violet-glow [&_em]:not-italic [&_em]:font-medium"
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </motion.div>
    </section>
  );
}
