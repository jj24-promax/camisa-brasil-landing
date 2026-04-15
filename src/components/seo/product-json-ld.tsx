import {
  GALLERY_IMAGES,
  HERO_IMAGE,
  PRODUCT,
  PRODUCT_SCHEMA_AGGREGATE_RATING,
} from "@/lib/product";
import { absoluteUrl } from "@/lib/site-url";

function productImages(): string[] {
  const urls = new Set<string>();
  urls.add(absoluteUrl(HERO_IMAGE.src));
  for (const img of GALLERY_IMAGES) {
    urls.add(absoluteUrl(img.src));
  }
  return [...urls];
}

export function ProductJsonLd() {
  const price = (PRODUCT.priceCents / 100).toFixed(2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PRODUCT.name,
    description:
      "Camisa premium com identidade brasileira, Cristo Redentor em jacquard e acabamento refinado. Edição Alpha Brasil.",
    sku: PRODUCT.id,
    brand: {
      "@type": "Brand",
      name: PRODUCT.brandName,
    },
    image: productImages(),
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/"),
      priceCurrency: PRODUCT.currency,
      price,
      priceValidUntil: PRODUCT.schemaPriceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: PRODUCT.brandName,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(PRODUCT_SCHEMA_AGGREGATE_RATING.ratingValue),
      bestRating: "5",
      worstRating: "1",
      reviewCount: String(PRODUCT_SCHEMA_AGGREGATE_RATING.reviewCount),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
