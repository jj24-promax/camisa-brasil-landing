"use client";

import type { ReactNode } from "react";
import { CheckoutTransitionProvider } from "@/components/navigation/checkout-transition-provider";

export function Providers({ children }: { children: ReactNode }) {
  return <CheckoutTransitionProvider>{children}</CheckoutTransitionProvider>;
}
