import type { PRODUCTS, SIZES } from "@/lib/products";

export type Size = (typeof SIZES)[number];

export type Product = (typeof PRODUCTS)[number];

export type CartItem = {
  id: string; // Combination of product ID and size
  productId: string;
  name: string;
  imageSrc: string;
  priceCents: number;
  priceFormatted: string;
  size: Size;
  quantity: number;
};