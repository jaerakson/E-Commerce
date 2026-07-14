import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getUserIdFromToken } from "@/lib/services/auth.service";
import { getCart, addToCart, clearCart, computeCartTotals } from "@/lib/services/cart.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const items = await getCart(userId);
  const totals = computeCartTotals(items);
  return NextResponse.json({ ok: true, data: { items, ...totals } });
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

  const result = await addToCart(userId, body);
  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data: result.item }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  await clearCart(userId);
  return NextResponse.json({ ok: true });
}
