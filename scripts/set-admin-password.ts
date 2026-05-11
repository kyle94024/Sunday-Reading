import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  const password = process.argv[2] ?? process.env.INIT_ADMIN_PASSWORD;
  if (!password) {
    console.error(
      "Usage:\n  npm run admin:password -- <password>\nor set INIT_ADMIN_PASSWORD in .env.local"
    );
    process.exit(1);
  }
  if (password.length < 6) {
    console.error("Password must be at least 6 characters.");
    process.exit(1);
  }
  const hash = await bcrypt.hash(password, 12);
  await sql`
    INSERT INTO admin_users (username, password_hash)
    VALUES ('admin', ${hash})
    ON CONFLICT (username) DO UPDATE SET
      password_hash = EXCLUDED.password_hash,
      updated_at = NOW()
  `;
  console.log("Admin password updated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
