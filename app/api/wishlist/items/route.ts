import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getUserIdFromToken } from "@/lib/services/auth.service";
import { getWishlistItems, addToWishlist } from "@/lib/services/wishlist.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const folderParam = searchParams.get("folder_id");
  // undefined = all items, null = unfiled only, string = specific folder
  const folderId = folderParam === null ? undefined : folderParam === "unfiled" ? null : folderParam;

  const items = await getWishlistItems(userId, folderId);
  return NextResponse.json({ ok: true, data: items });
}

export async function POST(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { product_id } = body;

  if (!product_id) {
    return NextResponse.json({ ok: false, error: "product_id is required" }, { status: 400 });
  }

  const result = await addToWishlist(userId, body);

  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
  }

  return NextResponse.json({ ok: true, data: result.item }, { status: 201 });
}
