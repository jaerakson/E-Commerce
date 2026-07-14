import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getProducts } from "@/lib/services/product.service";
import type { ProductFilter } from "@/lib/repositories/interfaces";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await ensureDb();

  const { searchParams } = request.nextUrl;

  const filter: ProductFilter = {};
  if (searchParams.get("category")) filter.category = searchParams.get("category")!;
  if (searchParams.get("material")) filter.material = searchParams.get("material")!;
  if (searchParams.get("collection_id")) filter.collection_id = searchParams.get("collection_id")!;
  if (searchParams.get("search")) filter.search = searchParams.get("search")!;
  if (searchParams.get("badge")) filter.badge = searchParams.get("badge")!;
  if (searchParams.get("min_price")) filter.min_price = Number(searchParams.get("min_price"));
  if (searchParams.get("max_price")) filter.max_price = Number(searchParams.get("max_price"));
  if (searchParams.get("sort")) filter.sort = searchParams.get("sort") as ProductFilter["sort"];

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100);

  const result = await getProducts(filter, { page, limit });

  return NextResponse.json({
    ok: true,
    data: result.data,
    meta: { total: result.total, page: result.page, limit: result.limit },
  });
}
