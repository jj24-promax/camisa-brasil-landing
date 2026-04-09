"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { SectionReveal, SectionShell } from "@/components/landing/section-shell";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Rafael M.",
    text: "Acabamento impecável. Parece peça de coleção.",
    rating: 5,
    profileImageSrc: "/images/testimonials/profiles/1.jpg",
  },
  {
    name: "Juliana C.",
    text: "O caimento valoriza demais. Cor vibrante na medida.",
    rating: 5,
    profileImageSrc: "/images/testimonials/profiles/2.jpg",
  },
  {
    name: "Diego A.",
    text: "Leve, confortável e com presença. Virou minha favorita.",
    rating: 5,
    profileImageSrc: "/images/testimonials/profiles/3.jpg",
  },
  {
    name: "Beatriz L.",
    text: "Qualidade surpreendente pelo preço. Recomendo!",
    rating: 5,
    profileImageSrc: "/images/testimonials/profiles/6.jpg",
  },
  {
    name: "Lucas S.",
    text: "Design moderno, foge do óbvio. Chegou rápido.",
    rating: 5,
    profileImageSrc: "/images/testimonials/profiles/4.jpg",
  },
  {
    name: "Fernanda O.",
    text: "A estampa é muito mais bonita ao vivo. Amei!",
    rating: 5,
    profileImageSrc: "/images/testimonials/profiles/7.jpg",
  },
  {
    name: "Carlos E.",
    text: "Material de primeira, não esquenta. Ótima compra.",
    rating: 5,
    profileImageSrc: "/images/testimonials/profiles/5.jpg",
  },
  {
    name: "Mariana P.",
    text: "Veste super bem, modelagem perfeita. Comprarei de novo.",
    rating: 5,
    profileImageSrc: "/images/testimonials/profiles/8.jpg",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < n ? "fill-gold text-gold" : "fill-white/[0.06] text-white/[0.06]"
          )}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export function SocialProof() {
  return (
    <SectionShell aria-labelledby="reviews-heading" variant="default" grain="low">
      <SectionReveal className="max-w-3xl">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/75">
          Confiança
        </p>
        <h2
          id="reviews-heading"
          className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.06] tracking-tight"
        >
          Quem vestiu,{" "}
          <span className="bg-gradient-to-r from-gold-bright to-gold-muted bg-clip-text text-transparent">
            aprovou
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Depoimentos de quem busca estética, caimento e presença acima da média.
        </p>
      </SectionReveal>

      <div
        className="group relative mt-16 w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex min-w-max animate-scroll-x gap-6 group-hover:[animation-play-state:paused] md:gap-8">
          {[...reviews, ...reviews].map((r, i) => (
            <figure
              key={`${r.name}-${i}`}
              className="glass-dark w-[300px] shrink-0 rounded-2xl p-6 transition-all duration-300 hover:!border-white/[0.12] hover:!shadow-luxe-hover md:w-[340px]"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={r.profileImageSrc}
                    alt={`Foto de perfil de ${r.name}`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold tracking-tight">{r.name}</p>
                  <div className="mt-1">
                    <Stars n={r.rating} />
                  </div>
                </div>
              </div>
              <blockquote className="relative z-10 mt-4 text-[15px] leading-relaxed text-foreground/95">
                {r.text}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}