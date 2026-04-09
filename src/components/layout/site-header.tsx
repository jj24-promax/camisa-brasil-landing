"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

export function SiteHeader() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.05] bg-[hsl(222,48%,3%)]/82 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 font-display text-lg font-extrabold tracking-widest text-foreground transition-opacity hover:opacity-90"
        >
          BRASIL
          <span className="text-gold">·</span>
          STORE
        </Link>
        <nav className="hidden items-center space-x-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Início
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Produtos
          </Link>
        </nav>
        <div className="flex items-center">
          <Link
            href="/cart"
            className="relative rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Ver carrinho (${cartCount} ${cartCount === 1 ? "item" : "itens"})`}
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-bright text-xs font-bold text-navy-deep">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}