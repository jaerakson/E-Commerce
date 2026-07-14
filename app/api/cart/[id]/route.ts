import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getUserIdFromToken } from "@/lib/services/auth.service";
import { updateCartItem, removeCartItem } from "@/lib/services/cart.service";

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
  const { quantity } = body;

  if (typeof quantity !== "number") {
    return NextResponse.json({ ok: false, error: "quantity is required" }, { status: 400 });
  }

  const result = await updateCartItem(params.id, quantity);
  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data: result.item });
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

  const deleted = await removeCartItem(params.id);
  if (!deleted) {
    return NextResponse.json({ ok: false, error: "Cart item not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
