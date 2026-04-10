import { PRODUCT } from "@/lib/product";

/**
 * Oferta "Leve 3, Pague 2" — não cumulativa: no máximo uma camisa isenta por pedido,
 * independentemente da quantidade total.
 */
export function leve3Pague2FreeUnitCount(quantity: number): number {
  return quantity >= 3 ? 1 : 0;
}

export function leve3Pague2DiscountCents(
  quantity: number,
  unitPriceCents = PRODUCT.priceCents
): number {
  return leve3Pague2FreeUnitCount(quantity) * unitPriceCents;
}
