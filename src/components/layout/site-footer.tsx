import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-gradient-to-b from-transparent to-[#04070d]/90 py-14 text-center">
      <div className="flex justify-center gap-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <Link href="#" className="transition-colors hover:text-gold">
          Envios
        </Link>
        <Link href="#" className="transition-colors hover:text-gold">
          Trocas
        </Link>
        <Link href="#" className="transition-colors hover:text-gold">
          Contacto
        </Link>
      </div>
      <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        © {new Date().getFullYear()} Brasil Estilizada Store
      </p>
      <p className="mx-auto mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground/85">
        Pagamento Pix integrado em breve ao fluxo de checkout.
      </p>
    </footer>
  );
}