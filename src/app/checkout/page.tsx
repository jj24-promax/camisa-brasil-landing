"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { 
  ChevronLeft, 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Truck, 
  Star, 
  TicketPercent, 
  PenTool, 
  Gift, 
  ShieldAlert, 
  Users, 
  Award, 
  Key,
  Check,
  Timer,
  Mail,
  ShieldEllipsis
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT } from "@/lib/product";
import { cn } from "@/lib/utils";

// Funções de máscara
const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

const maskCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{4})(\d)/, "$1 $2")
    .replace(/(\d{4})(\d)/, "$1 $2")
    .replace(/(\d{4})(\d)/, "$1 $2")
    .replace(/(\d{4})\d+?$/, "$1");
};

const maskExpiry = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\/\d{2})\d+?$/, "$1");
};

const SectionHeader = ({ number, title }: { number: number; title: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy-deep font-bold text-sm">
      {number}
    </div>
    <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">{title}</h2>
  </div>
);

const InputGroup = ({ 
  label, 
  placeholder, 
  type = "text", 
  className, 
  value, 
  onChange,
  maxLength,
  icon: Icon
}: { 
  label: string; 
  placeholder: string; 
  type?: string; 
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  icon?: any;
}) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground pl-1">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />}
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={cn(
          "h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-muted-foreground/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all",
          Icon && "pl-11"
        )}
      />
    </div>
  </div>
);

const ORDER_BUMPS = [
  { id: "personalization", title: "Personalização Nome + Número", offer: "Adicione seu nome e número favorito nas costas com a fonte oficial da edição.", priceCents: 2990, icon: PenTool },
  { id: "luxury_box", title: "Embalagem de Luxo Alpha Collector", offer: "Adicione nossa caixa premium com acabamento em hot-stamping dourado e papel seda.", priceCents: 1990, icon: Gift },
  { id: "shipping_insurance", title: "Seguro Entrega Blindada", offer: "Proteção total contra roubo ou extravio + Prioridade máxima no despacho.", priceCents: 990, icon: ShieldAlert },
];

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [selectedBumps, setSelectedBumps] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
    cpf: "",
    cep: "",
    city: "",
    address: "",
    number: "",
    neighborhood: "",
    complement: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    cardName: ""
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const searchParams = useSearchParams();
  const quantity = parseInt(searchParams.get("q") || "1", 10);
  
  const toggleBump = (id: string) => {
    setSelectedBumps(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const pricing = useMemo(() => {
    const unitPrice = PRODUCT.priceCents;
    const subtotal = unitPrice * quantity;
    const freeItems = Math.floor(quantity / 3);
    const itemDiscount = freeItems * unitPrice;
    const bumpsTotal = ORDER_BUMPS.filter(b => selectedBumps.includes(b.id)).reduce((sum, b) => sum + b.priceCents, 0);
    const total = subtotal - itemDiscount + bumpsTotal;
    const format = (cents: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);

    return { subtotal, discount: format(itemDiscount), discountValue: itemDiscount, bumpsTotal, total: format(total), quantity };
  }, [quantity, selectedBumps]);

  const handleInputChange = (field: keyof typeof formData, value: string, maskFn?: (v: string) => string) => {
    setFormData(prev => ({ ...prev, [field]: maskFn ? maskFn(value) : value }));
  };

  const handleFinalize = () => {
    if (paymentMethod === "card") {
      toast.error("Sistema de Cartão indisponível, refaça a compra via Pix por gentileza!", {
        duration: 5000,
        icon: '⚠️',
        style: {
          borderRadius: '12px',
          background: '#060a12',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '14px',
          fontWeight: '600'
        }
      });
      return;
    }
    toast.success("Gerando seu código Pix de pagamento...");
  };

  return (
    <div className="min-h-screen bg-[#04070d] text-foreground pb-20">
      {/* Barra de Urgência Superior */}
      <div className="sticky top-0 z-50 flex items-center justify-center gap-3 bg-gradient-to-r from-gold-deep via-gold to-gold-deep py-2 text-navy-deep shadow-lg">
        <Timer size={14} className="animate-pulse" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Garanta o desconto especial agora! <span className="ml-2 font-mono tabular-nums">{formatTime(timeLeft)}</span>
        </p>
      </div>

      <header className="border-b border-white/5 bg-navy-deep/50 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors">
            <ChevronLeft size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Voltar</span>
          </Link>
          <p className="font-display text-xs font-bold tracking-[0.3em] text-gold-bright">ALPHA BRASIL</p>
          <Lock size={16} className="text-muted-foreground/40" />
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-7xl px-5 lg:mt-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-8">
            {/* Banner de Aquisição */}
            <div className="glass-dark flex items-center justify-between rounded-2xl px-6 py-4">
              <div className="flex items-center gap-3">
                <Truck className="text-gold" size={20} />
                <p className="text-xs font-bold uppercase tracking-widest text-white/90">Você está adquirindo:</p>
              </div>
              <p className="text-xs font-bold text-gold-bright">{PRODUCT.name} ({quantity} un)</p>
            </div>

            <section className="glass-dark rounded-[2rem] p-6 md:p-8">
              <SectionHeader number={1} title="Dados Pessoais" />
              <div className="grid gap-4 md:grid-cols-2">
                <InputGroup label="Nome Completo" placeholder="Digite seu nome completo" className="md:col-span-2" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                <InputGroup label="E-mail" placeholder="seu@email.com" type="email" icon={Mail} value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                <InputGroup label="Confirmar E-mail" placeholder="Repita seu e-mail" type="email" icon={Mail} value={formData.confirmEmail} onChange={(e) => handleInputChange("confirmEmail", e.target.value)} />
                <InputGroup label="WhatsApp" placeholder="(00) 00000-0000" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value, maskPhone)} maxLength={15} />
                <InputGroup label="CPF ou CNPJ" placeholder="000.000.000-00" value={formData.cpf} onChange={(e) => handleInputChange("cpf", e.target.value, maskCPF)} maxLength={14} />
              </div>
            </section>

            <section className="glass-dark rounded-[2rem] p-6 md:p-8">
              <SectionHeader number={2} title="Pagamento" />
              <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                <button onClick={() => setPaymentMethod("card")} className={cn("flex flex-col items-center gap-2 rounded-xl border py-3 transition-all", paymentMethod === "card" ? "border-gold bg-gold/5 ring-1 ring-gold" : "border-white/5 bg-white/[0.02] hover:border-white/10")}>
                  <CreditCard size={18} className={paymentMethod === "card" ? "text-gold" : "text-muted-foreground/60"} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Cartão</span>
                </button>
                <button onClick={() => setPaymentMethod("pix")} className={cn("flex flex-col items-center gap-2 rounded-xl border py-3 transition-all", paymentMethod === "pix" ? "border-gold bg-gold/5 ring-1 ring-gold" : "border-white/5 bg-white/[0.02] hover:border-white/10")}>
                  <QrCode size={18} className={paymentMethod === "pix" ? "text-gold" : "text-muted-foreground/60"} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">PIX</span>
                </button>
                <div className="flex cursor-not-allowed flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.01] py-3 opacity-40">
                  <ShieldCheck size={18} className="text-muted-foreground/60" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Boleto</span>
                </div>
                <div className="flex cursor-not-allowed flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.01] py-3 opacity-40">
                  <Users size={18} className="text-muted-foreground/60" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">PicPay</span>
                </div>
              </div>

              {paymentMethod === "pix" ? (
                <div className="space-y-4 rounded-2xl bg-white/[0.02] p-6 border border-white/5">
                  <div className="flex items-center gap-2 text-gold-bright mb-4">
                    <QrCode size={20} />
                    <p className="text-sm font-bold uppercase tracking-widest">Instruções do Pix</p>
                  </div>
                  {[
                    { step: "01.", text: "Pagamento em segundos, sem complicações." },
                    { step: "02.", text: "Basta escanear o QR Code que iremos gerar sua compra." },
                    { step: "03.", text: "O PIX é 100% seguro e processado instantaneamente." }
                  ].map((inst) => (
                    <div key={inst.step} className="flex gap-4">
                      <span className="font-display font-bold text-gold">{inst.step}</span>
                      <p className="text-sm text-muted-foreground leading-relaxed">{inst.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4">
                  <InputGroup label="Número do Cartão" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={(e) => handleInputChange("cardNumber", e.target.value, maskCardNumber)} maxLength={19} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Validade" placeholder="MM/AA" value={formData.cardExpiry} onChange={(e) => handleInputChange("cardExpiry", e.target.value, maskExpiry)} maxLength={5} />
                    <InputGroup label="CVV" placeholder="123" value={formData.cardCVV} onChange={(e) => handleInputChange("cardCVV", e.target.value.replace(/\D/g, ""))} maxLength={4} />
                  </div>
                  <InputGroup label="Nome no Cartão" placeholder="Como no cartão" value={formData.cardName} onChange={(e) => handleInputChange("cardName", e.target.value)} />
                </div>
              )}
            </section>

            <section className="glass-dark overflow-hidden rounded-[2rem] p-0">
              <div className="bg-green-600/10 px-6 py-2 border-b border-green-500/20">
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">🔥 APROVEITE!</span>
              </div>
              <div className="p-6 md:p-8">
                <SectionHeader number={3} title="Compre Junto" />
                <p className="mb-6 text-[11px] font-medium text-muted-foreground">
                  <span className="text-green-400 font-bold">59% das pessoas</span> que compraram também se interessaram por:
                </p>
                <div className="grid gap-3">
                  {ORDER_BUMPS.map((bump) => {
                    const isSelected = selectedBumps.includes(bump.id);
                    return (
                      <button key={bump.id} onClick={() => toggleBump(bump.id)} className={cn("group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all", isSelected ? "border-gold/60 bg-gold/10 ring-1 ring-gold/40" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]")}>
                        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5", isSelected ? "text-gold" : "text-muted-foreground/40")}><bump.icon size={24} /></div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-white">{bump.title}</h4>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{bump.offer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-gold-bright uppercase">+ {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(bump.priceCents / 100)}</p>
                          <div className={cn("ml-auto mt-2 flex h-5 w-5 items-center justify-center rounded border", isSelected ? "bg-gold border-gold" : "border-white/10")}>{isSelected && <Check size={12} className="text-navy-deep font-bold" />}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="glass-dark rounded-[2rem] p-6 md:p-8">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white mb-6">Resumo da Compra</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal ({pricing.quantity} un)</span><span className="text-white">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(pricing.subtotal / 100)}</span></div>
                {pricing.discountValue > 0 && <div className="flex justify-between text-sm text-green-400 font-bold"><span>Oferta Especial</span><span>- {pricing.discount}</span></div>}
                {selectedBumps.length > 0 && <div className="flex justify-between text-sm text-gold font-bold"><span>Adicionais</span><span>+ {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(pricing.bumpsTotal / 100)}</span></div>}
                <div className="flex justify-between text-sm font-bold"><span className="text-muted-foreground">Frete</span><span className="text-green-400 uppercase tracking-widest text-[10px]">Grátis</span></div>
                <div className="h-px bg-white/10 my-6" />
                <div className="flex justify-between items-end"><span className="font-display text-lg font-bold text-white">Total Hoje:</span><span className="font-display text-3xl font-bold text-gold-bright tracking-tight">{pricing.total}</span></div>
              </div>
              <Button size="xl" onClick={handleFinalize} className="shimmer-btn w-full font-bold uppercase tracking-widest py-8 rounded-2xl">Finalizar Compra</Button>
              
              <div className="mt-6 flex flex-col items-center gap-3">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  <ShieldCheck size={12} /> Pagamento 100% Seguro
                </p>
                <div className="flex items-center gap-4 opacity-30 grayscale">
                  <Image src="/images/alpha-brasil-gold-logo.png" alt="Visa" width={30} height={20} className="object-contain" />
                  <Image src="/images/alpha-brasil-gold-logo.png" alt="Master" width={30} height={20} className="object-contain" />
                  <QrCode size={18} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-5 mt-20 text-center">
        <div className="flex flex-col items-center gap-6 border-t border-white/5 pt-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">E-mail de suporte: contato@alphabrasil.com.br</p>
          <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 border border-green-500/20">
            <ShieldEllipsis size={14} className="text-green-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Compra 100% Segura</span>
          </div>
          <div className="mt-4 flex flex-col items-center gap-2 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
             <div className="h-10 w-24 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">RA 1000</div>
             <p className="text-[8px] uppercase tracking-widest">Verificado pelo ReclameAqui</p>
          </div>
        </div>
      </footer>
    </div>
  );
}