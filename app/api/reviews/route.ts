import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getUserIdFromToken } from "@/lib/services/auth.service";
import { getProductReviews, getAllReviews, createReview } from "@/lib/services/review.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await ensureDb();

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id");
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const result = productId
    ? await getProductReviews(productId, { page, limit })
    : await getAllReviews({ page, limit });

  return NextResponse.json({ ok: true, data: result.data, meta: { total: result.total, page: result.page, limit: result.limit } });
}

export async function POST(request: NextRequest) {
  await ensureDb();

  const token = request.cookies.get("aether_session")?.value;
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { product_id, rating, body: reviewBody } = body;

  if (!product_id || !rating || !reviewBody) {
    return NextResponse.json({ ok: false, error: "product_id, rating, and body are required" }, { status: 400 });
  }

  const result = await createReview(userId, { ...body, body: reviewBody });

  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data: result.review }, { status: 201 });
}
