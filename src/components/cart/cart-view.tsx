"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

export function CartView() {
  const { cart, updateQuantity, removeFromCart, totalPriceFormatted, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="py-24 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-6 font-display text-2xl font-bold">O seu carrinho está vazio</h2>
        <p className="mt-2 text-muted-foreground">
          Parece que ainda não adicionou nenhum produto.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/products">Ver produtos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-start">
      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
          >
            <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-white/[0.08]">
              <Image
                src={item.imageSrc}
                alt={item.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold text-foreground">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">Tamanho: {item.size}</p>
              <p className="mt-2 text-base font-semibold tabular-nums text-gold-bright">
                {item.priceFormatted}
              </p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="subtle"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="min-w-[2ch] text-center text-base font-semibold tabular-nums">
                  {item.quantity}
                </span>
                <Button
                  type="button"
                  variant="subtle"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                type="button"
                variant="subtle"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-red-400"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remover item"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky top-24 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-gold/[0.07] via-transparent to-transparent p-6 shadow-luxe">
        <h2 className="font-display text-xl font-bold">Resumo do Pedido</h2>
        <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold tabular-nums text-foreground">{totalPriceFormatted}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Envio</span>
            <span className="font-semibold text-foreground">Grátis</span>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="font-display text-lg font-semibold">Total</span>
            <span className="font-display text-2xl font-bold tabular-nums text-gold-bright">
              {totalPriceFormatted}
            </span>
          </div>
        </div>
        <Button size="xl" className="mt-6 w-full">
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}