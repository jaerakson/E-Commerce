import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getCollectionBySlug } from "@/lib/services/product.service";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } },
) {
  await ensureDb();

  const result = await getCollectionBySlug(params.slug);

  if (!result) {
    return NextResponse.json({ ok: false, error: "Collection not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: result });
}
