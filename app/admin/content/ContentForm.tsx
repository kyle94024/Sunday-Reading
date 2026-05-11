"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  updateSiteContent,
  type ContentFormState,
} from "../actions";

type Initial = {
  hero_name: string;
  hero_tagline: string;
  intro: string;
  about: string;
};

const initial: ContentFormState = {};

export function ContentForm({ initial: data }: { initial: Initial }) {
  const [state, action, pending] = useActionState<ContentFormState, FormData>(
    updateSiteContent,
    initial
  );

  const [intro, setIntro] = useState(data.intro);
  const [about, setAbout] = useState(data.about);
  const [introPreview, setIntroPreview] = useState(false);
  const [aboutPreview, setAboutPreview] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-[0.04em]">Site copy</h1>
          <p className="text-sm text-ink-muted/70">
            Everything stored in <code className="text-violet-glow">site_content</code>.
          </p>
        </div>
        <Link href="/admin" className="btn btn-ghost">
          ← back
        </Link>
      </div>

      <form action={action} className="space-y-6">
        <div className="panel space-y-4">
          <h2 className="font-display text-xl text-ink">Hero</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field">
              <span className="label">name (big text)</span>
              <input
                type="text"
                name="hero_name"
                defaultValue={data.hero_name}
                required
              />
            </label>
            <label className="field">
              <span className="label">tagline (italic line)</span>
              <input
                type="text"
                name="hero_tagline"
                defaultValue={data.hero_tagline}
                required
              />
            </label>
          </div>
        </div>

        <MarkdownPanel
          title="Intro (front page prologue)"
          name="intro"
          value={intro}
          setValue={setIntro}
          preview={introPreview}
          togglePreview={() => setIntroPreview((p) => !p)}
          hint="Supports markdown. External links open in new tab. Use `[Through Patches of Violet](#tpov)` for the Spotify toggle."
        />

        <MarkdownPanel
          title="About (about page body)"
          name="about"
          value={about}
          setValue={setAbout}
          preview={aboutPreview}
          togglePreview={() => setAboutPreview((p) => !p)}
        />

        {state.error && <div className="toast toast-err">{state.error}</div>}
        {state.ok && (
          <div className="toast toast-ok">
            Saved. Public site will refresh shortly.
          </div>
        )}

        <div className="flex items-center justify-end gap-3 border-t border-violet-bright/15 pt-5">
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function MarkdownPanel({
  title,
  name,
  value,
  setValue,
  preview,
  togglePreview,
  hint,
}: {
  title: string;
  name: string;
  value: string;
  setValue: (v: string) => void;
  preview: boolean;
  togglePreview: () => void;
  hint?: string;
}) {
  return (
    <div className="panel space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-ink">{title}</h2>
          {hint && (
            <p className="mt-1 text-[12px] text-ink-muted/70">{hint}</p>
          )}
        </div>
        <button
          type="button"
          onClick={togglePreview}
          className="btn btn-ghost text-[11px] py-1"
        >
          {preview ? "Hide preview" : "Show preview"}
        </button>
      </div>
      <textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="min-h-[220px]"
      />
      {preview && (
        <div className="rounded-lg border border-violet-bright/15 bg-violet-deep/15 p-5 font-serif text-[15px] leading-[1.7] text-ink/90 [&_p]:mb-4">
          {value.trim() ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <span className="italic text-ink-muted/60">Nothing to preview yet.</span>
          )}
        </div>
      )}
    </div>
  );
}
