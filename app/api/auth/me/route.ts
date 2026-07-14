import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getCurrentUser } from "@/lib/services/auth.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, data: user });
}
