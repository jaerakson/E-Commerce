import { NextRequest, NextResponse } from "next/server";
import { logout } from "@/lib/services/auth.service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("aether_session")?.value;
  if (token) {
    await logout(token);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("aether_session", "", { path: "/", maxAge: 0 });
  return response;
}
