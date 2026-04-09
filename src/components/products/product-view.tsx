"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import type { Product, Size } from "@/lib/types";
import { SIZES } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

type ProductViewProps = {
  product: Product;
};

export function ProductView({ product }: ProductViewProps) {
  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
  };

  return (
    <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/[0.08] shadow-luxe">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 45vw"
            priority
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((img) => (
            <button
              key={img}
              onClick={() => setActiveImage(img)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border transition-all",
                activeImage === img
                  ? "border-gold/80 ring-2 ring-gold/50 ring-offset-2 ring-offset-background"
                  : "border-white/[0.1] hover:border-gold/50"
              )}
            >
              <Image
                src={img}
                alt={`${product.name} thumbnail`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-4 font-display text-3xl font-semibold tabular-nums text-gold-bright">
          {product.priceFormatted}
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-10">
          <h3 className="text-sm font-medium text-muted-foreground">Tamanho</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={cn(
                  "relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl text-sm font-semibold tracking-wider transition-all duration-300",
                  selectedSize === s
                    ? "text-navy-deep shadow-gold-soft"
                    : "border border-white/[0.15] bg-white/[0.04] text-muted-foreground hover:border-gold/40 hover:text-foreground"
                )}
              >
                {selectedSize === s && <span className="absolute inset-0 bg-gold-shine" />}
                <span className="relative z-10">{s}</span>
              </button>
            ))}
          </div>
        </div>

        <Button size="xl" className="mt-10 w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2.5 h-5 w-5" />
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
}