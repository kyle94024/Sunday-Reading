"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import {
  createBook,
  updateBook,
  deleteBook,
  uploadCoverImage,
  type BookFormState,
} from "../actions";
import type { Book } from "@/lib/db";

const SINNERS = [
  "Yi Sang",
  "Faust",
  "Don Quixote",
  "Ryōshū",
  "Meursault",
  "Hong Lu",
  "Heathcliff",
  "Ishmael",
  "Rodion",
  "Sinclair",
  "Outis",
  "Gregor",
  "Dante",
];

export function BookForm({ book }: { book?: Book }) {
  const editing = !!book;
  const initial: BookFormState = {};
  const action = editing
    ? updateBook.bind(null, book.id)
    : createBook;
  const [state, formAction, pending] = useActionState<BookFormState, FormData>(
    action,
    initial
  );

  const [review, setReview] = useState(book?.review ?? "");
  const [showPreview, setShowPreview] = useState(false);
  const [color, setColor] = useState(book?.limbus_color ?? "#a855f7");
  const [collection, setCollection] = useState<string>(book?.collection ?? "");
  const [coverUrl, setCoverUrl] = useState(book?.cover_url ?? "");
  const [reviewerName, setReviewerName] = useState(book?.reviewer_name ?? "");
  const [publishReview, setPublishReview] = useState(
    book?.review_published ?? true
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deletePending, startDelete] = useTransition();

  async function handleUpload(file: File) {
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadCoverImage(fd);
      if (res.error) setUploadError(res.error);
      if (res.url) setCoverUrl(res.url);
    } catch (e) {
      setUploadError((e as Error).message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-[0.04em]">
            {editing ? "Edit book" : "New book"}
          </h1>
          {editing && (
            <p className="text-sm text-ink-muted/70">slug · {book.slug}</p>
          )}
        </div>
        <Link href="/admin/books" className="btn btn-ghost">
          ← back
        </Link>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-[180px_1fr]">
          <div className="mx-auto w-[140px] md:mx-0 md:w-full">
            <CoverPreview
              title={book?.title ?? "New book"}
              author={book?.author ?? ""}
              accent={color}
              coverUrl={coverUrl}
            />
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field">
                <span className="label">title *</span>
                <input
                  type="text"
                  name="title"
                  defaultValue={book?.title ?? ""}
                  required
                />
              </label>
              <label className="field">
                <span className="label">author *</span>
                <input
                  type="text"
                  name="author"
                  defaultValue={book?.author ?? ""}
                  required
                />
              </label>
              <label className="field">
                <span className="label">year published</span>
                <input
                  type="number"
                  name="year_published"
                  defaultValue={book?.year_published ?? ""}
                  placeholder="e.g. 1942 (or -800 for BCE)"
                />
              </label>
              <label className="field">
                <span className="label">cover image</span>
                <div className="flex gap-2">
                  <input
                    type="url"
                    name="cover_url"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    placeholder="paste URL or upload →"
                    className="flex-1"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUpload(f);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="btn btn-ghost shrink-0 text-[11px]"
                  >
                    {uploading ? "Uploading…" : "Upload"}
                  </button>
                </div>
                {uploadError && (
                  <span className="mt-1 text-[11px] text-ember">{uploadError}</span>
                )}
                {coverUrl && !uploadError && (
                  <span className="mt-1 truncate text-[10px] text-ink-muted/55">
                    {coverUrl.slice(0, 80)}
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <label className="field">
            <span className="label">status</span>
            <select name="status" defaultValue={book?.status ?? "queued"}>
              <option value="queued">Queued</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </select>
          </label>
          <label className="field">
            <span className="label">rating (0–5)</span>
            <input
              type="number"
              step="0.5"
              min="0"
              max="5"
              name="rating"
              defaultValue={book?.rating ?? ""}
            />
          </label>
          <label className="field">
            <span className="label">date read</span>
            <input
              type="date"
              name="date_read"
              defaultValue={book?.date_read ?? ""}
            />
          </label>
          <label className="field">
            <span className="label">collection</span>
            <select
              name="collection"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
            >
              <option value="">— none (wider library) —</option>
              <option value="limbus">Limbus</option>
            </select>
          </label>
          <label className="field">
            <span className="label">Limbus sinner</span>
            <input
              type="text"
              name="limbus_sinner"
              list="sinners"
              defaultValue={book?.limbus_sinner ?? ""}
              placeholder="only if Limbus"
              disabled={collection !== "limbus"}
            />
            <datalist id="sinners">
              {SINNERS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </label>
          <label className="field">
            <span className="label">accent color</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="!h-9 !w-12 !p-0"
                style={{ background: "transparent" }}
              />
              <input
                type="text"
                name="limbus_color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                pattern="^#[0-9a-fA-F]{6}$"
                className="flex-1"
              />
            </div>
          </label>
          <label className="field">
            <span className="label">display order</span>
            <input
              type="number"
              name="display_order"
              defaultValue={book?.display_order ?? 0}
            />
          </label>
          <label className="field">
            <span className="label">slug</span>
            <input
              type="text"
              name="slug"
              defaultValue={book?.slug ?? ""}
              placeholder="auto-generated"
            />
          </label>
          <label className="field md:col-span-2">
            <span className="label">guest reviewer name</span>
            <input
              type="text"
              name="reviewer_name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="leave blank if Sunday wrote it"
            />
          </label>
        </div>

        <div className="panel space-y-3 p-4">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="review_published"
              checked={publishReview}
              onChange={(e) => setPublishReview(e.target.checked)}
              className="!h-4 !w-4 cursor-pointer accent-violet-bright"
            />
            <div>
              <div className="text-sm font-medium text-ink">
                Publish review on the public site
              </div>
              <div className="text-[12px] text-ink-muted/70">
                Uncheck to keep this as a draft. Draft text is still saved on
                every save — the public site just shows a placeholder until you
                check this box.
              </div>
            </div>
          </label>
        </div>

        <label className="field">
          <span className="flex items-center justify-between">
            <span className="label">
              review (markdown){" "}
              {!publishReview && (
                <span className="ml-2 rounded-full bg-violet-deep/40 px-2 py-0.5 text-[9px] tracking-[0.18em] text-violet-glow">
                  DRAFT
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => setShowPreview((s) => !s)}
              className="btn btn-ghost text-[10px] py-1"
            >
              {showPreview ? "Hide preview" : "Show preview"}
            </button>
          </span>
          <textarea
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What did you think?"
          />
          {showPreview && (
            <div className="mt-3 rounded-lg border border-violet-bright/15 bg-violet-deep/15 p-4 font-serif text-[15px] leading-[1.7] text-ink/90 [&_p]:mb-3">
              {review.trim() ? (
                <ReactMarkdown>{review}</ReactMarkdown>
              ) : (
                <span className="italic text-ink-muted/60">
                  Nothing to preview yet.
                </span>
              )}
            </div>
          )}
        </label>

        {state.error && <div className="toast toast-err">{state.error}</div>}
        {state.ok && (
          <div className="toast toast-ok">Saved. Public site will refresh shortly.</div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-violet-bright/15 pt-5">
          <Link href="/admin/books" className="btn btn-ghost">
            Cancel
          </Link>
          {editing && (
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    `Delete "${book.title}"? This cannot be undone.`
                  )
                ) {
                  startDelete(async () => {
                    await deleteBook(book.id);
                  });
                }
              }}
              disabled={deletePending}
              className="btn btn-danger"
            >
              {deletePending ? "Deleting…" : "Delete"}
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary ml-auto"
            disabled={pending}
          >
            {pending ? "Saving…" : editing ? "Save changes" : "Create book"}
          </button>
        </div>
      </form>
    </div>
  );
}

function CoverPreview({
  title,
  author,
  accent,
  coverUrl,
}: {
  title: string;
  author: string;
  accent: string;
  coverUrl: string;
}) {
  if (coverUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={coverUrl}
        alt=""
        className="aspect-[2/3] w-full rounded-md object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    );
  }
  return (
    <div
      className="relative aspect-[2/3] w-full overflow-hidden rounded-md p-4"
      style={{
        background: `radial-gradient(120% 80% at 30% 20%, ${accent}38 0%, transparent 60%), linear-gradient(150deg, #1a0b2e 0%, #07030f 100%)`,
        boxShadow: `inset 0 0 0 1px ${accent}30`,
      }}
    >
      <div
        className="absolute inset-y-0 left-0 w-2"
        style={{ background: `linear-gradient(90deg, ${accent}55, transparent)` }}
      />
      <div className="relative font-serif text-base leading-tight text-ink/95">
        {title}
      </div>
      <div className="mt-2 h-px w-8" style={{ background: accent }} />
      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-ink-muted/80">
        {author || "author"}
      </div>
    </div>
  );
}
