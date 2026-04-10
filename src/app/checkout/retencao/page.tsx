"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  markRetentionOfferSeen,
  tryCommitRetentionVisitFromCheckout,
  getOrInitRetentionDeadline,
  clearRetentionDeadline,
  setRetentionDiscountAccepted,
  clearRetentionDiscount,
  RETENTION_PERCENT,
} from "@/lib/checkout-retention-storage";
import { cn } from "@/lib/utils";

function formatMmSs(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return {
    mm: m.toString().padStart(2, "0"),
    ss: r.toString().padStart(2, "0"),
    raw: `${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`,
  };
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

function RetencaoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qs = searchParams.toString();
  const backToCheckout = qs ? `/checkout?${qs}` : "/checkout";

  const [deadlineMs, setDeadlineMs] = useState<number | null>(null);
  const [nowLeft, setNowLeft] = useState(0);

  useEffect(() => {
    tryCommitRetentionVisitFromCheckout();
    const d = getOrInitRetentionDeadline();
    setDeadlineMs(d);
  }, []);

  useEffect(() => {
    if (deadlineMs == null) return;
    const tick = () => setNowLeft(Math.max(0, deadlineMs - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadlineMs]);

  const expired = deadlineMs != null && nowLeft <= 0;
  const time = deadlineMs == null ? null : formatMmSs(nowLeft);

  const handleAccept = () => {
    if (deadlineMs == null || Date.now() >= deadlineMs) return;
    markRetentionOfferSeen();
    setRetentionDiscountAccepted(deadlineMs);
    router.push(backToCheckout);
  };

  const handleDecline = () => {
    markRetentionOfferSeen();
    clearRetentionDiscount();
    clearRetentionDeadline();
    router.push("/");
  };

  return (
    <motion.div
      className="relative min-h-[100dvh] overflow-hidden bg-[#04070d] pb-20 text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Atmosfera */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,hsl(38_32%_16%/0.35),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[42vh] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,hsl(222_48%_8%/0.5),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.35]" aria-hidden />

      <header className="relative z-10 border-b border-white/[0.06] bg-[#04070d]/72 backdrop-blur-2xl">
        <div className="mx-auto flex h-[3.75rem] max-w-5xl items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            onClick={() => markRetentionOfferSeen()}
            className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground/90 transition-colors hover:text-gold-bright"
          >
            Início
          </Link>
          <p className="font-display text-[11px] font-bold tracking-[0.32em] text-gold-bright">ALPHA BRASIL</p>
          <Lock size={15} className="text-muted-foreground/35" strokeWidth={1.5} aria-hidden />
        </div>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100dvh-3.75rem)] max-w-2xl flex-col justify-center px-5 py-12 md:px-8 md:py-16">
        <motion.div
          className="relative"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Moldura luminosa */}
          <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-b from-gold/25 via-gold/[0.07] to-transparent opacity-80 blur-sm" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#070b14]/95 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />

            <div className="px-6 pb-10 pt-12 md:px-12 md:pb-12 md:pt-14">
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center font-display text-[10px] font-semibold uppercase tracking-[0.42em] text-gold/80"
              >
                Oferta exclusiva de saída
              </motion.p>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 text-balance text-center font-display text-[clamp(1.2rem,4.2vw,1.85rem)] font-extrabold uppercase leading-[1.2] tracking-[0.06em] text-white"
              >
                Espere —{" "}
                <span className="bg-gradient-to-r from-gold-bright via-gold to-gold-muted bg-clip-text text-transparent">
                  {RETENTION_PERCENT}% OFF
                </span>{" "}
                no seu pedido
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-6 max-w-[26rem] text-center text-[15px] leading-[1.65] text-muted-foreground md:text-base"
              >
                Conclua sua compra nos próximos 10 minutos e garanta{" "}
                <span className="font-semibold text-white/95">{RETENTION_PERCENT}% de desconto</span> no valor total do
                pedido.
              </motion.p>

              {/* Destaque do desconto */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-10 flex max-w-sm flex-col items-center rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.09] to-transparent px-8 py-8 text-center"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/75">Economia imediata</span>
                <p className="mt-2 font-display text-[clamp(3rem,12vw,4.25rem)] font-extrabold leading-none tracking-tight text-gold-bright">
                  {RETENTION_PERCENT}%
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  sobre o total do pedido
                </p>
              </motion.div>

              {/* Contador */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "mx-auto mt-10 max-w-md rounded-2xl border px-6 py-6 md:px-8",
                  expired
                    ? "border-white/[0.08] bg-white/[0.02]"
                    : "border-white/[0.1] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                )}
              >
                <div className="flex items-center justify-center gap-2 text-gold/90">
                  <Clock className="h-4 w-4 shrink-0 opacity-90" strokeWidth={1.5} aria-hidden />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em]">Tempo para aproveitar</span>
                </div>

                {!expired && time ? (
                  <div className="mt-4 flex items-center justify-center gap-3 md:gap-4">
                    <div className="flex min-w-[4.5rem] flex-col items-center rounded-xl border border-white/[0.08] bg-[#060a12]/90 px-4 py-3 md:min-w-[5rem] md:py-4">
                      <span className="font-mono text-3xl font-bold tabular-nums text-white md:text-[2.15rem]">
                        {time.mm}
                      </span>
                      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        min
                      </span>
                    </div>
                    <span className="pb-6 font-display text-2xl font-light text-gold/50">:</span>
                    <div className="flex min-w-[4.5rem] flex-col items-center rounded-xl border border-white/[0.08] bg-[#060a12]/90 px-4 py-3 md:min-w-[5rem] md:py-4">
                      <span className="font-mono text-3xl font-bold tabular-nums text-white md:text-[2.15rem]">
                        {time.ss}
                      </span>
                      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        seg
                      </span>
                    </div>
                  </div>
                ) : (
                  <p
                    className={cn(
                      "mt-4 text-center font-mono text-3xl font-bold tabular-nums md:text-[2.15rem]",
                      expired ? "text-muted-foreground line-through" : "text-white"
                    )}
                  >
                    {deadlineMs == null ? "—" : time?.raw}
                  </p>
                )}

                {expired && (
                  <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
                    O tempo desta oferta encerrou. Você ainda pode continuar comprando na loja com as condições
                    habituais.
                  </p>
                )}
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 flex flex-col gap-3"
              >
                {!expired ? (
                  <>
                    <Button
                      type="button"
                      size="xl"
                      className="shimmer-btn h-[3.35rem] w-full text-[13px] font-bold uppercase tracking-[0.12em] shadow-[0_0_40px_-12px_hsl(var(--gold)/0.45)] md:h-16 md:text-sm"
                      onClick={handleAccept}
                    >
                      Finalizar com {RETENTION_PERCENT}% OFF
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="h-12 w-full border-white/[0.12] bg-transparent text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-white/20 hover:bg-white/[0.04] hover:text-foreground"
                      onClick={handleDecline}
                    >
                      Não, continuar saindo
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    size="xl"
                    variant="subtle"
                    className="w-full font-bold uppercase tracking-[0.1em]"
                    asChild
                  >
                    <Link href="/" onClick={() => markRetentionOfferSeen()}>
                      Ir para a loja
                    </Link>
                  </Button>
                )}
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="mt-10 text-center text-[10px] uppercase tracking-[0.28em] text-muted-foreground/65"
          >
            Experiência segura · Oferta mostrada uma vez nesta sessão
          </motion.p>
        </motion.div>
      </main>
    </motion.div>
  );
}

export default function RetencaoPage() {
  return (
    <Suspense fallback={<RetencaoFallback />}>
      <RetencaoContent />
    </Suspense>
  );
}

function RetencaoFallback() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-5 bg-[#04070d] px-6">
      <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <p className="font-display text-[10px] font-bold uppercase tracking-[0.32em] text-gold-bright/90">
        A preparar a sua oferta
      </p>
      <div className="h-0.5 w-28 animate-pulse rounded-full bg-gold/25" />
    </div>
  );
}
