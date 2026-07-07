import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style drafts · Sunday's Shelf",
  robots: { index: false, follow: false },
};

// Drafts live outside the (public) group on purpose: no shelf nav, no
// footer, no grain — each draft brings its own chrome so styles can be
// judged on their own terms.
export default function DraftsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
