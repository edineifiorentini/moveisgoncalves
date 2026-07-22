import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/products/product-catalog";
import { products } from "@/data/products";
import { absoluteUrl, withBasePath } from "@/lib/site";
import { SplitText } from "@/components/react-bits/split-text";

export const metadata: Metadata = {
  title: "Catálogo de Produtos | Móveis Gonçalves",
  description:
    "Conheça a linha de móveis modulares da Móveis Gonçalves para cozinhas, quartos, salas, áreas de serviço e espaços multiuso.",
  alternates: { canonical: absoluteUrl("/produtos") },
};

export default function ProductsPage() {
  return (
    <main id="main-content" className="pt-[var(--header-height)]">
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
            <p className="mt-6 max-w-[60ch] text-base leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
              Explore nossa linha de móveis modulares e filtre por ambiente, tipo, medidas ou acabamento para
              encontrar a solução ideal para sua casa.
            </p>
          </div>
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[300px] lg:col-span-5 lg:min-h-[430px]">
            <div className="absolute inset-y-0 left-[18%] w-px bg-[var(--brand-red)]/35" />
            <div className="absolute inset-x-0 bottom-0 h-[78%] bg-[var(--surface)]" />
            <Image
              src={withBasePath("/images/products/cozinha-veneza-isolado.webp")}
              alt="Cozinha modular Veneza"
              fill
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
