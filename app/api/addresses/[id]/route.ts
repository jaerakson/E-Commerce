import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getUserIdFromToken, updateAddress, deleteAddress } from "@/lib/services/auth.service";

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
  const address = await updateAddress(params.id, body);

  if (!address) {
    return NextResponse.json({ ok: false, error: "Address not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: address });
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

  const deleted = await deleteAddress(params.id);

  if (!deleted) {
    return NextResponse.json({ ok: false, error: "Address not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
