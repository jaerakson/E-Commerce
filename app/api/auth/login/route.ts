import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { login } from "@/lib/services/auth.service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await ensureDb();

  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "Email and password are required" }, { status: 400 });
  }

  const result = await login({ email, password });

  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, data: result.user });
  response.cookies.set("aether_session", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
