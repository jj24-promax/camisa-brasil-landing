import { ProductGrid } from "@/components/products/product-grid";
import { PRODUCTS } from "@/lib/products";
import { SectionShell } from "@/components/landing/section-shell";

export default function ProductsPage() {
  return (
    <SectionShell contentClassName="!py-16 md:!py-24">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Coleção{" "}
          <span className="bg-gradient-to-r from-gold-bright to-gold-muted bg-clip-text text-transparent">
            Completa
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Explore todas as nossas peças exclusivas, desenhadas para quem tem atitude.
        </p>
      </div>
      <div className="mt-16">
        <ProductGrid products={PRODUCTS} />
      </div>
    </SectionShell>
  );
}