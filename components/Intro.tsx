"use client";

import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

export function Intro({ text }: { text: string }) {
  const [showTpov, setShowTpov] = useState(false);

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
        className="dropcap font-serif text-[1.18rem] leading-[1.85] text-ink/90 [&_p]:mb-6"
      >
        <ReactMarkdown
          components={{
            a: ({ href, children }) => {
              if (href === "#tpov") {
                return (
                  <button
                    type="button"
                    onClick={() => setShowTpov((s) => !s)}
                    className="group/lnk inline-flex items-baseline gap-1 italic underline decoration-violet-bright/40 decoration-1 underline-offset-4 transition-colors hover:decoration-violet-glow hover:text-violet-glow"
                  >
                    <span>{children}</span>
                    <span
                      aria-hidden
                      className="not-italic text-[0.8em] text-violet-bright/70 transition-transform group-hover/lnk:translate-y-px"
                    >
                      {showTpov ? "▾" : "▸"}
                    </span>
                  </button>
                );
              }
              return (
                <a
                  href={href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-violet-bright/40 decoration-1 underline-offset-4 transition-colors hover:decoration-violet-glow hover:text-violet-glow"
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>

        <AnimatePresence initial={false}>
          {showTpov && (
            <motion.div
              key="tpov-embed"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-violet-bright/15 bg-violet-deep/15 p-3 backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink-muted/70">
                  <span>Now playing · Mili</span>
                  <a
                    href="https://www.youtube.com/watch?v=G_JfKOjwzwo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted/70 underline decoration-violet-bright/40 underline-offset-2 hover:text-violet-glow"
                  >
                    YouTube ↗
                  </a>
                </div>
                <iframe
                  data-testid="embed-iframe"
                  style={{ borderRadius: 12 }}
                  src="https://open.spotify.com/embed/track/6C3NjslaxrAHpiU9W5XTiV?utm_source=generator"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
