import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/product-grid";
import { PRODUCTS } from "@/lib/products";
import { SectionShell } from "@/components/landing/section-shell";

export default function HomePage() {
  return (
    <>
      <SectionShell
        variant="hero"
        className="min-h-[75vh] !py-20 md:!py-32"
        contentClassName="flex flex-col items-center text-center"
      >
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Não é só vestir.
          <span className="mt-4 block bg-gradient-to-br from-[#f8f0dc] via-[#d9bc82] to-[#8f7348] bg-clip-text text-transparent">
            É impor presença.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Coleção cápsula para quem comanda o ambiente — identidade brasileira, silhueta afiada,
          acabamento de selecionar.
        </p>
        <Button asChild size="xl" className="mt-10">
          <Link href="/products">Ver Coleção Completa</Link>
        </Button>
      </SectionShell>

      <SectionShell
        id="produtos"
        aria-labelledby="products-heading"
        variant="default"
        contentClassName="!py-16 md:!py-24"
      >
        <div className="text-center">
          <h2
            id="products-heading"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Nossas{" "}
            <span className="bg-gradient-to-r from-gold-bright to-gold-muted bg-clip-text text-transparent">
              Edições
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Peças selecionadas que combinam design premium e conforto.
          </p>
        </div>
        <div className="mt-12">
          <ProductGrid products={PRODUCTS} />
        </div>
      </SectionShell>
    </>
  );
}