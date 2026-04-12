/**
 * Extrai id da transação e se o webhook indica pagamento concluído.
 * Formato exato depende da Royal Banking — ajuste se o payload for diferente.
 */
const PAID_HINTS = [
  "paid",
  "pago",
  "paga",
  "approved",
  "confirm",
  "success",
  "conclu",
  "liquid",
  "aprov",
  "completed",
];

function norm(s: unknown): string {
  return String(s ?? "")
    .trim()
    .toLowerCase();
}

function looksPaidStatus(s: string): boolean {
  if (!s) return false;
  return PAID_HINTS.some((h) => s.includes(h));
}

function pickId(r: Record<string, unknown>): string | undefined {
  const raw =
    r.idTransaction ??
    r.id_transaction ??
    r.transactionId ??
    r.transaction_id ??
    r.id ??
    r.txId ??
    r.tx_id;
  if (raw == null || raw === "") return undefined;
  return String(raw).trim();
}

function deepFindId(o: unknown, depth = 0): string | undefined {
  if (depth > 6 || o == null) return undefined;
  if (typeof o !== "object") return undefined;
  const r = o as Record<string, unknown>;
  const id = pickId(r);
  if (id) return id;
  for (const v of Object.values(r)) {
    if (typeof v === "object" && v !== null) {
      const inner = deepFindId(v, depth + 1);
      if (inner) return inner;
    }
  }
  return undefined;
}

function deepPaidSignal(o: unknown, depth = 0): boolean {
  if (depth > 6 || o == null) return false;
  if (typeof o !== "object") return false;
  const r = o as Record<string, unknown>;

  const status = norm(r.status ?? r.payment_status ?? r.paymentStatus ?? r.state);
  if (looksPaidStatus(status)) return true;
  if (r.paid === true) return true;
  if (norm(r.event) === "payment.confirmed" || norm(r.event).includes("paid")) return true;

  for (const v of Object.values(r)) {
    if (typeof v === "object" && v !== null && deepPaidSignal(v, depth + 1)) return true;
  }
  return false;
}

export function parseRoyalBankingPixWebhook(payload: unknown): { idTransaction?: string; paid: boolean } {
  if (payload == null || typeof payload !== "object") {
    return { paid: false };
  }
  const idTransaction = deepFindId(payload);
  const paid = deepPaidSignal(payload);
  return { idTransaction, paid };
}
