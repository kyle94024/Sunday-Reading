import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

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

async function getStoredHash(): Promise<string | null> {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = (await sql`
    SELECT password_hash FROM admin_users WHERE username = 'admin' LIMIT 1
  `) as { password_hash: string }[];
  return rows[0]?.password_hash ?? null;
}

export async function attemptLogin(password: string): Promise<boolean> {
  if (!password) return false;
  const hash = await getStoredHash();
  if (!hash) {
    throw new Error(
      "No admin user found. Run `npm run admin:password -- <password>` to create one."
    );
  }
  const ok = await bcrypt.compare(password, hash);
  if (!ok) return false;
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

export async function verifyCurrentPassword(password: string): Promise<boolean> {
  const hash = await getStoredHash();
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}

export async function changeStoredPassword(newPassword: string): Promise<void> {
  if (newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters.");
  }
  const sql = neon(process.env.DATABASE_URL!);
  const hash = await bcrypt.hash(newPassword, 12);
  await sql`
    UPDATE admin_users SET password_hash = ${hash}, updated_at = NOW()
    WHERE username = 'admin'
  `;
}
