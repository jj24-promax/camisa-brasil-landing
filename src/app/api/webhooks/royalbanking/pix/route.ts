import { NextResponse } from "next/server";

import { parseRoyalBankingPixWebhook } from "@/lib/royalbanking-webhook-parse";
import { markPixGatewayPaymentPaid } from "@/lib/supabase/pix-payment-store";

/**
 * URL a usar em ROYALBANKING_PIX_CALLBACK_URL (Cash In).
 * A Royal Banking envia POST quando o Pix é pago; responde 200 rapidamente.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.info("[royalbanking webhook pix]", JSON.stringify(payload));

    const { idTransaction, paid } = parseRoyalBankingPixWebhook(payload);
    if (paid && idTransaction) {
      const r = await markPixGatewayPaymentPaid(idTransaction, payload);
      if (!r.ok) {
        console.warn("[royalbanking webhook pix] não gravou confirmação:", r.error);
      }
    }
  } catch {
    /* corpo vazio ou não-JSON */
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
