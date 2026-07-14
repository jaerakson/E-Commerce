import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getCollections } from "@/lib/services/product.service";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureDb();
  const collections = await getCollections();
  return NextResponse.json({ ok: true, data: collections });
}
