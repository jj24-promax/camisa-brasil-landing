import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pós-compra | Alpha Brasil",
  description: "Ofertas exclusivas após a sua compra na Alpha Brasil.",
  robots: { index: false, follow: false },
};

export default function PosCompraLayout({ children }: { children: ReactNode }) {
  return children;
}
