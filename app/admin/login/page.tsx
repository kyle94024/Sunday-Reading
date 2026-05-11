import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in · Sunday's Shelf" };

export default async function LoginPage() {
  if (await isLoggedIn()) redirect("/admin");
  return (
    <div className="mx-auto mt-16 max-w-sm">
      <div className="panel text-center">
        <h1 className="font-display text-2xl tracking-[0.04em] text-ink">
          Sunday&rsquo;s Shelf{" "}
          <span className="text-gradient-violet">admin</span>
        </h1>
        <p className="mt-2 text-[12px] uppercase tracking-[0.28em] text-ink-muted/70">
          enter password
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
        <a
          href="/"
          className="mt-6 inline-block text-[12px] uppercase tracking-[0.22em] text-ink-muted/60 hover:text-ink"
        >
          ← back to site
        </a>
      </div>
    </div>
  );
}
