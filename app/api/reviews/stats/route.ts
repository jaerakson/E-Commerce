import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getReviewStats } from "@/lib/services/review.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await ensureDb();

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id") ?? undefined;

  const stats = await getReviewStats(productId);
  return NextResponse.json({ ok: true, data: stats });
}
