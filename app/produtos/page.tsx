import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/products/product-catalog";
import { products } from "@/data/products";
import { absoluteUrl, withBasePath } from "@/lib/site";
import { DelayedReveal } from "@/components/react-bits/delayed-reveal";
import { SplitText } from "@/components/react-bits/split-text";
import { ResponsiveImage } from "@/components/shared/responsive-image";

export const metadata: Metadata = {
  title: "Catálogo de Produtos",
  description:
    "Conheça a linha de móveis modulares da Móveis Gonçalves para cozinhas, quartos, salas, áreas de serviço e espaços multiuso.",
  alternates: { canonical: absoluteUrl("/produtos"), languages: { "pt-BR": absoluteUrl("/produtos") } },
  openGraph: {
    title: "Catálogo de Produtos | Móveis Gonçalves",
    description: "Móveis modulares para cozinhas, quartos, salas, áreas de serviço, escritórios e espaços multiuso.",
    url: absoluteUrl("/produtos"),
    images: [absoluteUrl("/og.png")],
  },
};

const catalogSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl("/produtos")}#catalogo`,
  url: absoluteUrl("/produtos"),
  name: "Catálogo de produtos Móveis Gonçalves",
  description: "Catálogo de móveis modulares para cozinhas, quartos, salas, áreas de serviço e escritórios.",
  inLanguage: "pt-BR",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/produtos/${product.slug}`),
      name: `${product.type} ${product.name}`,
      image: product.images.ambient ? absoluteUrl(product.images.ambient) : absoluteUrl(product.images.isolated ?? "/og.png"),
    })),
  },
};

export default function ProductsPage() {
  return (
    <main id="main-content" className="pt-[var(--header-height)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }} />
      <section className="relative overflow-hidden bg-[var(--surface-warm)]">
        <div className="site-container grid min-h-[520px] items-center gap-8 py-12 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="relative z-10 lg:col-span-7">
            <p className="eyebrow">Catálogo de produtos</p>
            <SplitText
              tag="h1"
              text="Encontre o móvel certo para cada ambiente."
              className="page-title mt-5 max-w-[13ch] text-balance"
              threshold={0.02}
            />
            <DelayedReveal className="mt-6" delay={0.26}>
              <p className="max-w-[60ch] text-base leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
                Explore nossa linha de móveis modulares e filtre por ambiente, tipo, medidas ou acabamento para
                encontrar a solução ideal para sua casa.
              </p>
            </DelayedReveal>
          </div>
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[300px] lg:col-span-5 lg:min-h-[430px]">
            <div className="absolute inset-y-0 left-[18%] w-px bg-[var(--brand-red)]/35" />
            <div className="absolute inset-x-0 bottom-0 h-[78%] bg-[var(--surface)]" />
            <ResponsiveImage
              src={withBasePath("/images/products/cozinha-veneza-isolado.webp")}
              alt="Cozinha modular Veneza"
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="translate-y-[12%] object-contain p-5"
            />
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="site-container min-h-[500px] py-16" aria-label="Carregando catálogo" />}>
        <ProductCatalog products={products} />
      </Suspense>
    </main>
  );
}
