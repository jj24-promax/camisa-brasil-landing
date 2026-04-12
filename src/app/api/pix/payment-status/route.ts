import { NextResponse } from "next/server";

import { canPersistPixPaymentStatus, isPixGatewayPaymentPaid } from "@/lib/supabase/pix-payment-store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const transactionId = url.searchParams.get("transactionId")?.trim();
  if (!transactionId) {
    return NextResponse.json({ error: "Parâmetro transactionId é obrigatório." }, { status: 400 });
  }

  const trackingAvailable = canPersistPixPaymentStatus();
  if (!trackingAvailable) {
    return NextResponse.json({
      paid: false,
      trackingAvailable: false,
    });
  }

  const paid = await isPixGatewayPaymentPaid(transactionId);
  return NextResponse.json({ paid, trackingAvailable: true });
}
