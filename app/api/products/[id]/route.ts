import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getProductById, getProductBySlug } from "@/lib/services/product.service";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  await ensureDb();

  const { id } = params;

  // Try by ID first, then by slug
  const product = (await getProductById(id)) ?? (await getProductBySlug(id));

  if (!product) {
    return NextResponse.json({ ok: false, error: "Product not found" }, { status: 404 });
  }

  const data = {
    ...product,
    sizes: product.sizes ? JSON.parse(product.sizes as string) : null,
    colors: product.colors ? JSON.parse(product.colors as string) : null,
  };

  return NextResponse.json({ ok: true, data });
}
