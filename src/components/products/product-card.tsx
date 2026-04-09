"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type ProductCardProps = {
  product: Product;
  index: number;
};

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 group-hover:border-white/[0.1] group-hover:shadow-luxe-hover">
          <div className="relative aspect-square">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
          <div className="p-4">
            <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
              {product.name}
            </h3>
            <p className="mt-2 text-lg font-semibold tabular-nums text-gold-bright">
              {product.priceFormatted}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}