import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "sunday_admin";
const SESSION_TAG = "v1.ok";

function secret() {
  const s = process.env.ADMIN_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "ADMIN_SECRET is not set (or too short). Add a random 32+ char string to .env.local and Vercel env vars."
    );
  }
  return s;
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

export async function attemptLogin(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not set in env.");
  }
  if (password.length === 0 || password !== expected) return false;
  const c = await cookies();
  c.set(COOKIE, sign(SESSION_TAG), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 2 weeks
  });
  return true;
}

export async function logout() {
  const c = await cookies();
  c.delete(COOKIE);
}

export async function isLoggedIn(): Promise<boolean> {
  const c = await cookies();
  const token = c.get(COOKIE)?.value;
  if (!token) return false;
  try {
    return safeEqualHex(token, sign(SESSION_TAG));
  } catch {
    return false;
  }
}
