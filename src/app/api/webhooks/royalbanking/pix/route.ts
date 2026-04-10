import { NextResponse } from "next/server";

/**
 * URL a usar em ROYALBANKING_PIX_CALLBACK_URL (Cash In).
 * A Royal Banking envia POST quando o Pix é pago; responde 200 rapidamente.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    // TODO: validar assinatura se a Royal Banking documentar; atualizar pedido por idTransaction/status
    console.info("[royalbanking webhook pix]", JSON.stringify(payload));
  } catch {
    /* corpo vazio ou não-JSON */
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
