import { userRepo, addressRepo } from "../repositories";
import { hashSync, compareSync } from "bcryptjs";
import { v4 as uuid } from "uuid";
import type { UserPublic, Address } from "../repositories/interfaces";
import { cookies } from "next/headers";

const SESSION_COOKIE = "aether_session";
const SALT_ROUNDS = 10;

// In-memory session store (포트폴리오용. 프로덕션에서는 DB/Redis 사용)
// globalThis를 사용하여 Next.js dev 모드에서 모듈 재컴파일 시 세션 유실 방지
const globalSessions = globalThis as unknown as { __aether_sessions?: Map<string, string> };
if (!globalSessions.__aether_sessions) {
  globalSessions.__aether_sessions = new Map<string, string>();
}
const sessions = globalSessions.__aether_sessions;

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
  sessions.set(token, user.id);

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
  sessions.set(token, user.id);

  return { user: toPublic(user), token };
}

export function logout(token: string): void {
  sessions.delete(token);
}

export async function getCurrentUser(token: string | undefined): Promise<UserPublic | null> {
  if (!token) return null;
  const userId = sessions.get(token);
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
  return sessions.get(token) ?? null;
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
  sessions.set(token, user!.id);

  return { user: toPublic(user!), token };
}
