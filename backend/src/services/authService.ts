import { db } from "../db/kysely";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(email: string, password: string) {
  const existing = await db.selectFrom("users").selectAll().where("email", "=", email).executeTakeFirst();
  if (existing) return { error: "email_in_use" } as const;
  const hash = await bcrypt.hash(password, 10);
  const inserted = await db
    .insertInto("users")
    .values({ email, password_hash: hash, created_at: new Date() })
    .returningAll()
    .executeTakeFirst();
  if (!inserted) return { error: "register_failed" } as const;
  const token = jwt.sign({ sub: String(inserted.id) }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });
  return { token } as const;
}

export async function login(email: string, password: string) {
  const user = await db.selectFrom("users").selectAll().where("email", "=", email).executeTakeFirst();
  if (!user) return { error: "invalid_login" } as const;
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return { error: "invalid_login" } as const;
  const token = jwt.sign({ sub: String(user.id) }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });
  return { token } as const;
}

