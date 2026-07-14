import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getUserIdFromToken, getAddresses, createAddress } from "@/lib/services/auth.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const addresses = await getAddresses(userId);
  return NextResponse.json({ ok: true, data: addresses });
}

export async function POST(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { line1, city, zip } = body;

  if (!line1 || !city || !zip) {
    return NextResponse.json({ ok: false, error: "line1, city, and zip are required" }, { status: 400 });
  }

  const address = await createAddress(userId, body);
  return NextResponse.json({ ok: true, data: address }, { status: 201 });
}
