import { userRepo, addressRepo } from "../repositories";
import { hashSync, compareSync } from "bcryptjs";
import { v4 as uuid } from "uuid";
import type { UserPublic, Address } from "../repositories/interfaces";
import { cookies } from "next/headers";
import { getClient } from "../db/connection";

const SESSION_COOKIE = "aether_session";
const SALT_ROUNDS = 10;

async function sessionSet(token: string, userId: string): Promise<void> {
  const client = getClient();
  await client.execute({
    sql: `INSERT OR REPLACE INTO sessions (token, user_id, expires_at)
          VALUES (?, ?, datetime('now', '+7 days'))`,
    args: [token, userId],
  });
}

async function sessionGet(token: string): Promise<string | undefined> {
  const client = getClient();
  const result = await client.execute({
    sql: `SELECT user_id FROM sessions WHERE token = ? AND expires_at > datetime('now')`,
    args: [token],
  });
  return result.rows[0]?.user_id as string | undefined;
}

async function sessionDelete(token: string): Promise<void> {
  const client = getClient();
  await client.execute({ sql: `DELETE FROM sessions WHERE token = ?`, args: [token] });
}

function toPublic(user: import("../repositories/interfaces").User): UserPublic {
  const { password_hash, ...rest } = user;
  return rest;
}

export async function register(input: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}): Promise<{ user: UserPublic; token: string } | { error: string }> {
  const existing = await userRepo.findByEmail(input.email);
  if (existing) {
    return { error: "Email already registered" };
  }

  const user = await userRepo.create({
    id: uuid(),
    email: input.email,
    password_hash: hashSync(input.password, SALT_ROUNDS),
    first_name: input.first_name,
    last_name: input.last_name,
    phone: null,
    avatar_url: null,
    oauth_provider: null,
    oauth_id: null,
  });

  const token = uuid();
  await sessionSet(token, user.id);

  return { user: toPublic(user), token };
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<{ user: UserPublic; token: string } | { error: string }> {
  const user = await userRepo.findByEmail(input.email);
  if (!user) {
    return { error: "Invalid email or password" };
  }

  if (!compareSync(input.password, user.password_hash)) {
    return { error: "Invalid email or password" };
  }

  const token = uuid();
  await sessionSet(token, user.id);

  return { user: toPublic(user), token };
}

export async function logout(token: string): Promise<void> {
  await sessionDelete(token);
}

export async function getCurrentUser(token: string | undefined): Promise<UserPublic | null> {
  if (!token) return null;
  const userId = await sessionGet(token);
  if (!userId) return null;

  const user = await userRepo.findById(userId);
  if (!user) return null;
  return toPublic(user);
}

export function getSessionToken(): string | undefined {
  try {
    const cookieStore = cookies();
    return cookieStore.get(SESSION_COOKIE)?.value;
  } catch {
    return undefined;
  }
}

export async function getUserIdFromToken(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  return (await sessionGet(token)) ?? null;
}

export async function updateProfile(
  userId: string,
  data: { first_name?: string; last_name?: string; phone?: string; avatar_url?: string },
): Promise<UserPublic | null> {
  const user = await userRepo.update(userId, data);
  if (!user) return null;
  return toPublic(user);
}

// ── Address helpers ─────────────────────────────────────

export async function getAddresses(userId: string): Promise<Address[]> {
  return addressRepo.findByUserId(userId);
}

export async function createAddress(
  userId: string,
  data: { label?: string; line1: string; line2?: string; city: string; state?: string; zip: string; country?: string; is_default?: boolean },
): Promise<Address> {
  return addressRepo.create({
    id: uuid(),
    user_id: userId,
    label: data.label ?? null,
    line1: data.line1,
    line2: data.line2 ?? null,
    city: data.city,
    state: data.state ?? null,
    zip: data.zip,
    country: data.country ?? "US",
    is_default: data.is_default ? 1 : 0,
  });
}

export async function updateAddress(id: string, data: Partial<Address>): Promise<Address | null> {
  return addressRepo.update(id, data);
}

export async function deleteAddress(id: string): Promise<boolean> {
  return addressRepo.delete(id);
}

// ── OAuth ────────────────────────────────────────────────

export async function findOrCreateOAuthUser(
  provider: string,
  oauthId: string,
  profile: { email: string; first_name: string; last_name: string; avatar_url?: string },
): Promise<{ user: UserPublic; token: string }> {
  // 1. oauth_id로 기존 유저 찾기
  let user = await userRepo.findByOAuthId(provider, oauthId);

  if (!user) {
    // 2. 같은 이메일 유저가 있으면 oauth 정보 연결
    const existing = await userRepo.findByEmail(profile.email);
    if (existing) {
      user = await userRepo.update(existing.id, {
        oauth_provider: provider,
        oauth_id: oauthId,
        avatar_url: profile.avatar_url ?? existing.avatar_url,
      }) as import("../repositories/interfaces").User;
    } else {
      // 3. 신규 유저 생성 (password_hash 빈 문자열)
      user = await userRepo.create({
        id: uuid(),
        email: profile.email,
        password_hash: "",
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: null,
        avatar_url: profile.avatar_url ?? null,
        oauth_provider: provider,
        oauth_id: oauthId,
      });
    }
  }

  const token = uuid();
  await sessionSet(token, user!.id);

  return { user: toPublic(user!), token };
}
