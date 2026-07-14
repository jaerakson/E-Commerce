import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { submitInquiry } from "@/lib/services/contact.service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await ensureDb();

  const body = await request.json();
  const { first_name, last_name, email, inquiry_type, message } = body;

  if (!first_name || !last_name || !email || !inquiry_type || !message) {
    return NextResponse.json({ ok: false, error: "All fields are required" }, { status: 400 });
  }

  const inquiry = await submitInquiry({ first_name, last_name, email, inquiry_type, message });
  return NextResponse.json({ ok: true, data: inquiry }, { status: 201 });
}
