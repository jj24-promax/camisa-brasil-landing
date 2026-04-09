import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { AmbientBackground } from "@/components/landing/ambient-background";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart-context";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brasil Estilizada Store | Edições Especiais",
  description:
    "Loja oficial de camisas premium com identidade brasileira, acabamento refinado e presença marcante. Edições limitadas.",
  keywords: [
    "camisa Brasil",
    "camisa estilizada",
    "edição especial",
    "camisa premium",
    "Brasil",
    "loja",
    "e-commerce",
  ],
  openGraph: {
    title: "Brasil Estilizada Store",
    description: "Peças exclusivas com visual noturno e alto valor percebido.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#060a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${sans.variable} ${display.variable} font-sans min-h-[100dvh] bg-transparent text-foreground antialiased`}
      >
        <CartProvider>
          <AmbientBackground />
          <div className="relative z-10 flex min-h-[100dvh] flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}