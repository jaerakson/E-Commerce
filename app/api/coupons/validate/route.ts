import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getUserIdFromToken } from "@/lib/services/auth.service";
import { validateCoupon } from "@/lib/services/order.service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { code } = body;

  if (!code) {
    return NextResponse.json({ ok: false, error: "Coupon code is required" }, { status: 400 });
  }

  const result = await validateCoupon(code);

  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data: result.coupon });
}
