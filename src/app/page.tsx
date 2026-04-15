import type { Metadata } from "next";
import { HomePageClient } from "./home-page-client";
import { ProductJsonLd } from "@/components/seo/product-json-ld";
import { PRODUCT, HERO_IMAGE } from "@/lib/product";

export const metadata: Metadata = {
  title: `Alpha Brasil | ${PRODUCT.name} — ${PRODUCT.priceFormatted}`,
  description:
    "Camisa premium Brasil com Cristo Redentor em jacquard, acabamento de coleção e envio para todo o país. Garantia de 7 dias, compra segura e pagamento por PIX ou cartão.",
  keywords: [
    "Alpha Brasil",
    "camisa Brasil",
    "camisa estilizada",
    "camisa jacquard",
    "edição limitada",
    "camisa premium",
    "Brasil",
    "Cristo Redentor camisa",
  ],
  authors: [{ name: "Alpha Brasil" }],
  creator: "Alpha Brasil",
  publisher: "Alpha Brasil",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Alpha Brasil",
    title: `Alpha Brasil | ${PRODUCT.name}`,
    description:
      "Peça exclusiva com visual noturno e alto valor percebido. Jacquard premium, depoimentos reais e garantia de 7 dias.",
    images: [
      {
        url: HERO_IMAGE.src,
        width: 1200,
        height: 1200,
        alt: HERO_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Alpha Brasil | ${PRODUCT.name}`,
    description: "Camisa premium com identidade brasileira. Edição Alpha Brasil.",
    images: [HERO_IMAGE.src],
  },
  category: "Apparel & Accessories",
};

export default function HomePage() {
  return (
    <>
      <ProductJsonLd />
      <HomePageClient />
    </>
  );
}
