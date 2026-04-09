import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { ProductView } from "@/components/products/product-view";
import { SectionShell } from "@/components/landing/section-shell";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <SectionShell contentClassName="!py-16 md:!py-24">
      <ProductView product={product} />
    </SectionShell>
  );
}
</dyad-file>
<dyad-write path="src/app/cart/page.tsx" description="Creating the dedicated shopping cart page.">
import { CartView } from "@/components/cart/cart-view";
import { SectionShell } from "@/components/landing/section-shell";

export default function CartPage() {
  return (
    <SectionShell contentClassName="!py-16 md:!py-24">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Carrinho de{" "}
          <span className="bg-gradient-to-r from-gold-bright to-gold-muted bg-clip-text text-transparent">
            Compras
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Confirme os seus itens e finalize a sua compra.
        </p>
      </div>
      <div className="mt-16">
        <CartView />
      </div>
    </SectionShell>
  );
}