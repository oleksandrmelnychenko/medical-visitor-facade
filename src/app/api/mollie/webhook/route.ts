import { NextResponse } from "next/server";
import { getMolliePayment } from "@/lib/mollie";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const paymentId = formData.get("id");

  if (typeof paymentId !== "string" || !paymentId.trim()) {
    return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
  }

  try {
    const payment = await getMolliePayment(paymentId);

    console.info("Mollie webhook received", {
      id: payment.id,
      status: payment.status,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Mollie webhook error:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
