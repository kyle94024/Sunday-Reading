"use client";

import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { Fragment, useMemo, useState, type ReactNode } from "react";

type Embed = {
  marker: string; // hash href, e.g. "#tpov"
  title: string;
  subtitle: string;
  spotifyEmbedUrl: string;
  externalUrl: string;
  externalLabel: string;
};

const EMBEDS: Embed[] = [
  {
    marker: "#lor",
    title: "Library of Ruina · Original Soundtrack",
    subtitle: "Mili",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/album/1OVibN37sJiU2M9cCbL950?utm_source=generator",
    externalUrl:
      "https://open.spotify.com/album/1OVibN37sJiU2M9cCbL950?si=ed3wbXsdQ4ure5vrp8GRwQ",
    externalLabel: "Spotify ↗",
  },
  {
    marker: "#tpov",
    title: "Through Patches of Violet",
    subtitle: "Mili",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/track/6C3NjslaxrAHpiU9W5XTiV?utm_source=generator",
    externalUrl: "https://www.youtube.com/watch?v=G_JfKOjwzwo",
    externalLabel: "YouTube ↗",
  },
];

function Player({ embed }: { embed: Embed }) {
  return (
    <div className="rounded-xl border border-violet-bright/15 bg-violet-deep/15 p-3 backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-ink-muted/70">
        <span className="truncate">
          Now playing · <span className="text-ink-muted">{embed.subtitle}</span>
        </span>
        <a
          href={embed.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 text-ink-muted/70 underline decoration-violet-bright/40 underline-offset-2 hover:text-violet-glow"
        >
          {embed.externalLabel}
        </a>
      </div>
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: 12 }}
        src={embed.spotifyEmbedUrl}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

export function Intro({ text }: { text: string }) {
  // One toggle per embed marker, keyed by marker.
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const paragraphs = useMemo(() => text.split(/\n\n+/), [text]);

  const toggle = (marker: string) =>
    setOpenMap((m) => ({ ...m, [marker]: !m[marker] }));

  const linkComponents = useMemo(
    () => ({
      a: ({
        href,
        children,
      }: {
        href?: string;
        children?: ReactNode;
      }) => {
        const embed = EMBEDS.find((e) => e.marker === href);
        if (embed) {
          const isOpen = !!openMap[embed.marker];
          return (
            <button
              type="button"
              onClick={() => toggle(embed.marker)}
              className="group/lnk inline-flex items-baseline gap-1 italic text-violet-glow underline decoration-violet-bright/55 decoration-1 underline-offset-4 transition-colors hover:text-lavender hover:decoration-violet-glow"
            >
              <span>{children}</span>
              <span
                aria-hidden
                className="not-italic text-[0.8em] text-violet-glow transition-transform group-hover/lnk:translate-y-px"
              >
                {isOpen ? "▾" : "▸"}
              </span>
            </button>
          );
        }
        return (
          <a
            href={href ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-glow underline decoration-violet-bright/55 decoration-1 underline-offset-4 transition-colors hover:text-lavender hover:decoration-violet-glow"
          >
            {children}
          </a>
        );
      },
    }),
    [openMap]
  );

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
        Note from Kyle
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-bright/40" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="dropcap font-serif text-[1.18rem] font-medium leading-[1.85] text-ink [&_p]:mb-6"
      >
        {paragraphs.map((para, idx) => {
          const embedHere = EMBEDS.find((e) => para.includes(`(${e.marker})`));
          return (
            <Fragment key={idx}>
              <ReactMarkdown components={linkComponents}>{para}</ReactMarkdown>
              {embedHere && (
                <AnimatePresence initial={false}>
                  {openMap[embedHere.marker] && (
                    <motion.div
                      key={`embed-${embedHere.marker}`}
                      initial={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginTop: "0.5rem",
                        marginBottom: "1.75rem",
                      }}
                      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <Player embed={embedHere} />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </Fragment>
          );
        })}
      </motion.div>
    </section>
  );
}
