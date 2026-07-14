import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { register } from "@/lib/services/auth.service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await ensureDb();

  const body = await request.json();
  const { email, password, first_name, last_name } = body;

  if (!email || !password || !first_name || !last_name) {
    return NextResponse.json({ ok: false, error: "All fields are required" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ ok: false, error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const result = await register({ email, password, first_name, last_name });

  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
  }

  const response = NextResponse.json({ ok: true, data: result.user });
  response.cookies.set("aether_session", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
