"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Lock, ShieldCheck, CreditCard, QrCode, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT, PRODUCT_IMAGE_MAIN_SRC } from "@/lib/product";
import { cn } from "@/lib/utils";

const SectionHeader = ({ number, title }: { number: number; title: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy-deep font-bold text-sm">
      {number}
    </div>
    <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">{title}</h2>
  </div>
);

const InputGroup = ({ label, placeholder, type = "text", className }: { label: string; placeholder: string; type?: string; className?: string }) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground pl-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-muted-foreground/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
    />
  </div>
);

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");

  return (
    <div className="min-h-screen bg-[#04070d] text-foreground pb-20">
      {/* Banner de Oferta */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-1.5 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
          🔥 Oferta por tempo limitado! Frete Grátis Ativado.
        </p>
      </div>

      <header className="border-b border-white/5 bg-navy-deep/50 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors">
            <ChevronLeft size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Voltar à loja</span>
          </Link>
          <p className="font-display text-xs font-bold tracking-[0.3em] text-gold-bright">ALPHA BRASIL</p>
          <div className="w-24 flex justify-end">
            <Lock size={16} className="text-muted-foreground/40" />
          </div>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-7xl px-5 lg:mt-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Coluna Esquerda: Formulários */}
          <div className="space-y-8">
            {/* Header de Produto (Mobile) */}
            <div className="lg:hidden glass-dark overflow-hidden rounded-2xl p-4 flex gap-4">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg">
                <Image src={PRODUCT_IMAGE_MAIN_SRC} alt={PRODUCT.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-sm font-bold text-white">{PRODUCT.name}</h3>
                <div className="mt-1 flex gap-0.5">
                   {[...Array(5)].map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-gold text-gold" />)}
                </div>
                <p className="mt-1 text-lg font-bold text-gold-bright">{PRODUCT.priceFormatted}</p>
              </div>
            </div>

            {/* Passo 1: Dados Pessoais */}
            <section className="glass-dark rounded-[2rem] p-6 md:p-8">
              <SectionHeader number={1} title="Dados Pessoais" />
              <div className="grid gap-4 md:grid-cols-2">
                <InputGroup label="Nome Completo" placeholder="Digite seu nome completo" className="md:col-span-2" />
                <InputGroup label="E-mail" placeholder="seu@email.com" type="email" />
                <InputGroup label="WhatsApp" placeholder="(00) 00000-0000" />
                <InputGroup label="CPF" placeholder="000.000.000-00" className="md:col-span-2" />
              </div>
            </section>

            {/* Passo 2: Endereço de Entrega */}
            <section className="glass-dark rounded-[2rem] p-6 md:p-8">
              <SectionHeader number={2} title="Endereço de Entrega" />
              <div className="grid gap-4 md:grid-cols-3">
                <InputGroup label="CEP" placeholder="00000-000" />
                <InputGroup label="Cidade" placeholder="Sua cidade" className="md:col-span-2" />
                <InputGroup label="Endereço" placeholder="Rua, Avenida..." className="md:col-span-2" />
                <InputGroup label="Número" placeholder="123" />
                <InputGroup label="Bairro" placeholder="Nome do bairro" />
                <InputGroup label="Complemento" placeholder="Apto, Bloco (Opcional)" className="md:col-span-2" />
              </div>
            </section>

            {/* Passo 3: Pagamento */}
            <section className="glass-dark rounded-[2rem] p-6 md:p-8">
              <SectionHeader number={3} title="Pagamento" />
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button 
                  onClick={() => setPaymentMethod("pix")}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-2xl border p-4 transition-all",
                    paymentMethod === "pix" 
                      ? "border-gold bg-gold/5 ring-1 ring-gold" 
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  )}
                >
                  <QrCode size={24} className={paymentMethod === "pix" ? "text-gold" : "text-muted-foreground"} />
                  <span className={cn("text-xs font-bold uppercase tracking-widest", paymentMethod === "pix" ? "text-gold" : "text-muted-foreground")}>PIX</span>
                </button>
                <button 
                   onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-2xl border p-4 transition-all",
                    paymentMethod === "card" 
                      ? "border-gold bg-gold/5 ring-1 ring-gold" 
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  )}
                >
                  <CreditCard size={24} className={paymentMethod === "card" ? "text-gold" : "text-muted-foreground"} />
                  <span className={cn("text-xs font-bold uppercase tracking-widest", paymentMethod === "card" ? "text-gold" : "text-muted-foreground")}>Cartão</span>
                </button>
              </div>

              {paymentMethod === "pix" ? (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-4 flex gap-4">
                    <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-green-500/20 text-green-500">
                      <QrCode size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Aprovação Imediata</p>
                      <p className="mt-1 text-xs text-muted-foreground">O código PIX será gerado após clicar em "Finalizar Compra"</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 flex items-center gap-4">
                    <ShieldCheck size={18} className="text-gold" />
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Pagamento 100% Seguro</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  <InputGroup label="Número do Cartão" placeholder="0000 0000 0000 0000" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Validade" placeholder="MM/AA" />
                    <InputGroup label="CVV" placeholder="123" />
                  </div>
                  <InputGroup label="Nome no Cartão" placeholder="Como no cartão" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Parcelas</label>
                    <select className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50">
                      <option>1x de {PRODUCT.priceFormatted} sem juros</option>
                      <option>2x de R$ 34,50 sem juros</option>
                      <option>3x de R$ 23,00 sem juros</option>
                    </select>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Coluna Direita: Resumo (Sticky no Desktop) */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="glass-dark rounded-[2rem] p-6 md:p-8">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white mb-6">Resumo do Pedido</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Produto</span>
                  <span className="text-white font-medium">{PRODUCT.shortName} (Tam: M)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Preço Original</span>
                  <span className="text-muted-foreground line-through">R$ 149,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-semibold text-green-500">Desconto (-54%)</span>
                  <span className="text-green-500 font-bold">- R$ 80,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Grátis</span>
                </div>
                <div className="h-px bg-white/10 my-6" />
                <div className="flex justify-between items-end">
                  <span className="font-display text-lg font-bold text-white uppercase tracking-tight">Total</span>
                  <span className="font-display text-3xl font-bold text-gold-bright tracking-tight">{PRODUCT.priceFormatted}</span>
                </div>
              </div>

              <Button size="xl" className="shimmer-btn w-full font-bold uppercase tracking-widest py-8 rounded-2xl">
                Finalizar Compra
              </Button>

              <div className="mt-8 space-y-4 border-t border-white/5 pt-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <ShieldCheck size={16} className="text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Garantia de Satisfação</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Lock size={16} className="text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Checkout Seguro SSL</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Truck size={16} className="text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Entrega Segurada</span>
                </div>
              </div>
            </div>

            <footer className="mt-8 text-center px-4">
              <p className="text-[9px] text-muted-foreground leading-relaxed uppercase tracking-widest">
                Seus dados pessoais serão usados para processar seu pedido, apoiar sua experiência em todo este site e para outros fins descritos em nossa política de privacidade.
              </p>
              <p className="mt-4 text-[9px] text-muted-foreground/50 uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} ALPHA BRASIL · TODOS OS DIREITOS RESERVADOS
              </p>
            </footer>
          </aside>
        </div>
      </main>
    </div>
  );
}