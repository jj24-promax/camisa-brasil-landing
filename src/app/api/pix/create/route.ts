import { NextResponse } from "next/server";

const GATEWAY_URL = "https://api.royalbanking.com.br/v1/gateway/";

type ClientPayload = {
  name?: string;
  document?: string;
  telefone?: string;
  email?: string;
};

type Body = {
  amount?: number;
  client?: ClientPayload;
  split?: { email?: string; percentage?: string };
};

function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}

function resolveCallbackUrl(): string | null {
  const explicit = process.env.ROYALBANKING_PIX_CALLBACK_URL?.trim();
  if (explicit) return explicit;
  const base = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (base) {
    return `${base.replace(/\/$/, "")}/api/webhooks/royalbanking/pix`;
  }
  return null;
}

export async function POST(request: Request) {
  const apiKey = process.env.ROYALBANKING_API_KEY;
  const callbackUrl = resolveCallbackUrl();

  if (!apiKey?.trim() || !callbackUrl) {
    return NextResponse.json(
      {
        error:
          "Configure ROYALBANKING_PIX_CALLBACK_URL ou NEXT_PUBLIC_APP_URL (ex.: https://seudominio.com) no .env.local",
      },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Corpo JSON inválido" }, { status: 400 });
  }

  const amount = body.amount;
  const c = body.client;
  if (
    amount == null ||
    typeof amount !== "number" ||
    amount <= 0 ||
    !c?.name?.trim() ||
    !c?.document?.trim() ||
    !c?.telefone?.trim() ||
    !c?.email?.trim()
  ) {
    return NextResponse.json(
      { error: "amount e client (name, document, telefone, email) são obrigatórios" },
      { status: 400 }
    );
  }

  const payload: Record<string, unknown> = {
    "api-key": apiKey,
    amount,
    client: {
      name: c.name.trim(),
      document: onlyDigits(c.document),
      telefone: onlyDigits(c.telefone),
      email: c.email.trim(),
    },
    callbackUrl: callbackUrl.trim(),
  };

  if (body.split?.email != null || body.split?.percentage != null) {
    payload.split = {
      ...(body.split.email != null ? { email: body.split.email } : {}),
      ...(body.split.percentage != null ? { percentage: body.split.percentage } : {}),
    };
  }

  const upstream = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await upstream.text();
  let data: unknown;
  try {
    data = JSON.parse(text) as unknown;
  } catch {
    return NextResponse.json(
      { error: "Resposta inválida do gateway", status: upstream.status, raw: text.slice(0, 500) },
      { status: 502 }
    );
  }

  if (!upstream.ok) {
    return NextResponse.json(data, { status: upstream.status });
  }

  return NextResponse.json(data);
}
