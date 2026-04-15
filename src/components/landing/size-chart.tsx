"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal, SectionShell } from "@/components/landing/section-shell";
import { SIZE_GUIDE_ROWS, recommendSizeFromBustCm } from "@/lib/size-guide";
import type { Size } from "@/lib/types";
import { cn } from "@/lib/utils";

const BUST_MIN = 84;
const BUST_MAX = 130;
const DEFAULT_BUST = 98;

export function SizeChart() {
  const [bustCm, setBustCm] = useState(DEFAULT_BUST);

  const guide = useMemo(() => recommendSizeFromBustCm(bustCm), [bustCm]);
  const activeSize: Size | null = guide?.size ?? null;

  const guideSentence = useMemo(() => {
    if (!guide) {
      return "Ajuste o medidor acima para ver o tamanho sugerido para o seu busto.";
    }
    const suffix = guide.ambiguous
      ? " (você está no limite entre dois tamanhos; indicamos o maior para caimento mais solto.)"
      : "";
    return `Se você tem ${bustCm} cm de busto, seu tamanho é ${guide.size}.${suffix}`;
  }, [bustCm, guide]);

  return (
    <SectionShell
      id="tabela-tamanhos"
      aria-labelledby="sizes-heading"
      variant="soft"
      grain="off"
      className="scroll-mt-32"
      contentClassName="mx-auto max-w-4xl !px-5 md:!px-10"
    >
      <SectionReveal className="text-center">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/75">
          Fit
        </p>
        <h2
          id="sizes-heading"
          className="mt-4 font-display text-[clamp(2.25rem,4vw,3rem)] font-bold leading-tight tracking-tight"
        >
          Tabela de{" "}
          <span className="bg-gradient-to-r from-gold-bright to-gold-muted bg-clip-text text-transparent">
            medidas
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted-foreground">
          Medidas aproximadas em centímetros. Use o medidor para ver na hora qual tamanho combina com o seu busto.
        </p>
      </SectionReveal>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] via-white/[0.02] to-transparent p-5 shadow-luxe backdrop-blur-sm md:p-8"
      >
        <p className="text-center font-display text-[11px] font-bold uppercase tracking-[0.25em] text-gold/90">
          Seu busto em cm
        </p>
        <div className="mt-4 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="relative flex-1">
            <input
              type="range"
              min={BUST_MIN}
              max={BUST_MAX}
              step={1}
              value={bustCm}
              onChange={(e) => setBustCm(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-gold"
              aria-valuemin={BUST_MIN}
              aria-valuemax={BUST_MAX}
              aria-valuenow={bustCm}
              aria-label="Medida do busto em centímetros"
            />
          </div>
          <div className="flex items-center justify-center gap-2 sm:w-40 sm:shrink-0 sm:flex-col sm:justify-center">
            <label className="sr-only" htmlFor="bust-cm-input">
              Busto (cm)
            </label>
            <input
              id="bust-cm-input"
              type="number"
              inputMode="numeric"
              min={BUST_MIN}
              max={BUST_MAX}
              value={bustCm}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isFinite(v)) return;
                setBustCm(Math.min(BUST_MAX, Math.max(BUST_MIN, Math.round(v))));
              }}
              className="w-20 rounded-xl border border-white/[0.12] bg-navy-deep/80 px-3 py-2 text-center font-display text-lg font-bold tabular-nums text-gold-bright outline-none ring-gold/30 focus-visible:ring-2"
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">cm</span>
          </div>
        </div>
        <p
          className="mt-5 text-center text-sm font-medium leading-relaxed text-white/95 md:text-base"
          role="status"
          aria-live="polite"
        >
          {guideSentence}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 overflow-x-auto overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] shadow-luxe backdrop-blur-sm transition-shadow duration-300 hover:border-white/[0.09] hover:shadow-luxe-hover"
      >
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.03]">
              <th className="px-6 py-5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Tamanho
              </th>
              <th className="px-6 py-5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Busto
              </th>
              <th className="px-6 py-5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Comprimento
              </th>
              <th className="px-6 py-5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Ombro
              </th>
            </tr>
          </thead>
          <tbody>
            {SIZE_GUIDE_ROWS.map((row) => {
              const isActive = activeSize === row.size;
              return (
                <tr
                  key={row.size}
                  className={cn(
                    "border-b border-white/[0.04] transition-colors last:border-0",
                    isActive
                      ? "bg-gold/[0.12] ring-1 ring-inset ring-gold/25"
                      : "hover:bg-white/[0.025]"
                  )}
                >
                  <td className="px-6 py-5">
                    <span
                      className={cn(
                        "inline-flex min-w-[2.75rem] items-center justify-center rounded-lg border px-2.5 py-1.5 font-display text-sm font-bold tabular-nums transition-transform duration-300",
                        isActive
                          ? "border-gold/50 bg-gradient-to-b from-gold/25 to-gold/10 text-gold-bright shadow-[0_0_20px_-6px_rgba(212,175,55,0.45)]"
                          : "border-gold/30 bg-gradient-to-b from-gold/12 to-gold/5 text-gold-bright hover:scale-[1.02]"
                      )}
                    >
                      {row.size}
                    </span>
                  </td>
                  <td className="px-6 py-5 tabular-nums text-muted-foreground">{row.bustDisplay} cm</td>
                  <td className="px-6 py-5 tabular-nums text-muted-foreground">{row.lengthLabel} cm</td>
                  <td className="px-6 py-5 tabular-nums text-muted-foreground">{row.shoulderLabel} cm</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
      <p className="mx-auto mt-6 max-w-lg text-center text-xs leading-relaxed text-muted-foreground">
        Em dúvida entre dois tamanhos, prefira o maior para caimento mais solto.
      </p>
    </SectionShell>
  );
}
