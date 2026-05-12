"use client";

import { motion } from "motion/react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

export function AboutContent({
  text,
  contributors,
}: {
  text: string;
  contributors?: string[];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-32 sm:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="mb-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.45em] text-violet-deep/80"
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-deep/70" />
        Profile
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
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
            className="group relative h-28 w-28 overflow-hidden rounded-full transition-transform duration-700 hover:scale-[1.04]"
            style={{
              boxShadow:
                "0 0 0 1px rgba(168,85,247,0.35), 0 10px 40px -10px rgba(168,85,247,0.45), 0 0 60px -20px rgba(192,132,252,0.55)",
            }}
            aria-label="Kyle"
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
            <div className="absolute inset-[3px] overflow-hidden rounded-full bg-bg">
              <Image
                src="/kyle.jpg"
                alt="Kyle"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>
          </button>
          <h1
            className="mt-7 font-display text-4xl tracking-[0.04em]"
            style={{ color: "#1a0a3a" }}
          >
            Kyle
          </h1>
          <p className="mt-2 text-[11px] uppercase tracking-[0.4em] text-violet-deep/85">
            Student · Reader of fiction
          </p>
          <div className="mt-5 h-px w-20 bg-gradient-to-r from-violet-deep/60 to-transparent" />
          <dl className="mt-5 space-y-3 text-sm font-serif text-violet-deep">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-deep/75">
                Reading
              </dt>
              <dd>fiction, mostly</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-deep/75">
                Currently
              </dt>
              <dd>working through Limbus</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-deep/75">
                Started
              </dt>
              <dd>school year, 2025</dd>
            </div>
          </dl>
        </motion.aside>

        {/* Body column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-serif text-[1.18rem] font-medium leading-[1.85] [&_p]:mb-6"
          style={{ color: "#1a0a3a" }}
        >
          {contributors && contributors.length > 0 && (
            <div className="mb-12 flex flex-col items-start gap-3">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.45em] text-violet-deep/80">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-deep/65" />
                Contributors
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-deep/65" />
              </div>
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 font-serif italic text-violet-deep">
                {contributors.map((name, i) => (
                  <li key={name} className="inline-flex items-center gap-3">
                    <span>{name}</span>
                    {i < contributors.length - 1 && (
                      <span aria-hidden className="text-violet-deep/55">
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2
                  className="mb-6 mt-12 font-display text-3xl tracking-[0.04em] first:mt-0 sm:text-4xl"
                  style={{ color: "#1a0a3a" }}
                >
                  {children}
                </h2>
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        </motion.div>
      </div>
    </div>
  );
}
