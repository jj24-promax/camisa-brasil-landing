"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

function ObrigadoContent() {
  const searchParams = useSearchParams();
  const vip = searchParams.get("vip") === "1";
  const card = searchParams.get("card") === "1";

  return (
    <motion.div
      className="min-h-[100dvh] bg-[#04070d] pb-20 text-foreground"
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="border-b border-white/5 bg-navy-deep/50 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5">
          <span className="w-12" aria-hidden />
          <p className="font-display text-xs font-bold tracking-[0.3em] text-gold-bright">ALPHA BRASIL</p>
          <Lock size={16} className="text-muted-foreground/40" aria-hidden />
        </div>
      </header>

      <div className="pointer-events-none absolute inset-x-0 top-16 h-72 bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,hsl(38_30%_22%/0.35),transparent)]" />

      <main className="relative mx-auto mt-12 max-w-lg px-5 md:mt-20 md:max-w-xl">
        <div className="glass-dark rounded-[2rem] px-6 py-12 text-center md:px-12 md:py-14">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
            <Check className="h-8 w-8 text-green-400" strokeWidth={2.5} aria-hidden />
          </div>
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.42em] text-gold/75">
            Pedido confirmado
          </p>
          <h1 className="mt-4 font-display text-[clamp(1.5rem,5vw,2rem)] font-extrabold uppercase leading-tight tracking-tight text-white">
            Obrigado pela sua compra
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Recebemos o seu pedido com sucesso. Você receberá atualizações por e-mail e pode acompanhar cada etapa até a entrega.
          </p>

          {(vip || card) && (
            <ul className="mx-auto mt-8 max-w-sm space-y-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4 text-left text-[13px] text-muted-foreground">
              {vip && (
                <li className="flex gap-2">
                  <span className="text-gold-bright">✓</span>
                  <span>Fila VIP de produção incluída no seu pedido.</span>
                </li>
              )}
              {card && (
                <li className="flex gap-2">
                  <span className="text-gold-bright">✓</span>
                  <span>Card colecionável da edição reservado para envio com a peça.</span>
                </li>
              )}
            </ul>
          )}

          <Button asChild size="xl" className="mt-10 w-full font-bold uppercase tracking-[0.1em]">
            <Link href="/">Voltar à loja</Link>
          </Button>
        </div>
      </main>
    </motion.div>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense fallback={<ObrigadoFallback />}>
      <ObrigadoContent />
    </Suspense>
  );
}

function ObrigadoFallback() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#04070d] px-6">
      <div className="h-0.5 w-24 animate-pulse rounded-full bg-gold/30" />
    </div>
  );
}
