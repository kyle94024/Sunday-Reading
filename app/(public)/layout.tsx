import Link from "next/link";

// The lilac pages carry their own nav, footer and background, so the
// public shell stays out of the way — it only keeps the quiet admin
// entrance (the little dot tucked under each page's footer).
export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="relative z-10">{children}</main>
      <div className="relative z-10 -mt-20 flex justify-center pb-8">
        <Link
          href="/admin/login"
          aria-label="admin"
          title="admin"
          className="inline-block h-2 w-2 rounded-full bg-black/10 transition-all duration-500 hover:scale-150 hover:bg-black/40"
        />
      </div>
    </>
  );
}
