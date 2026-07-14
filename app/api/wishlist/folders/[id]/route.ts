import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getUserIdFromToken } from "@/lib/services/auth.service";
import { updateFolder, deleteFolder } from "@/lib/services/wishlist.service";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const folder = await updateFolder(params.id, body);

  if (!folder) {
    return NextResponse.json({ ok: false, error: "Folder not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: folder });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const deleted = await deleteFolder(params.id);
  if (!deleted) {
    return NextResponse.json({ ok: false, error: "Folder not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
