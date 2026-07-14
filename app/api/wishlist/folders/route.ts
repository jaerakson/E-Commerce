import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getUserIdFromToken } from "@/lib/services/auth.service";
import { getFolders, createFolder } from "@/lib/services/wishlist.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const folders = await getFolders(userId);
  return NextResponse.json({ ok: true, data: folders });
}

export async function POST(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ ok: false, error: "Folder name is required" }, { status: 400 });
  }

  const folder = await createFolder(userId, body);
  return NextResponse.json({ ok: true, data: folder }, { status: 201 });
}
