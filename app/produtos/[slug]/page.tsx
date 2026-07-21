import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductCard } from "@/components/products/product-card";
import { ButtonLink } from "@/components/shared/button-link";
import { categoryLabels, productBySlug, products } from "@/data/products";
import { absoluteUrl } from "@/lib/site";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) return {};
  const socialImage = product.images.ambient ?? product.images.isolated;

  return {
    title: `${product.name} | Móveis Gonçalves`,
    description: `Conheça o ${product.name}, suas medidas e acabamentos disponíveis.`,
    alternates: { canonical: absoluteUrl(`/produtos/${product.slug}`) },
    openGraph: {
      title: `${product.name} | Móveis Gonçalves`,
      description: `Conheça o ${product.name}, suas medidas e acabamentos disponíveis.`,
      images: socialImage ? [absoluteUrl(socialImage)] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    category: categoryLabels[product.category],
    image: [product.images.isolated, product.images.ambient]
      .filter((image): image is string => Boolean(image))
      .map(absoluteUrl),
    brand: { "@type": "Brand", name: "Móveis Gonçalves" },
    additionalProperty: product.dimensions.flatMap((dimension) => [
      { "@type": "PropertyValue", name: "Altura", value: dimension.height },
      { "@type": "PropertyValue", name: "Largura", value: dimension.width },
      { "@type": "PropertyValue", name: "Profundidade", value: dimension.depth },
    ]),
  };

  return (
    <main id="main-content" className="pt-[var(--header-height)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="site-container py-6 sm:py-8 md:py-12">
        <nav aria-label="Caminho de navegação" className="mb-6 sm:mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]">
            <li>
              <Link href="/" className="hover:text-[var(--brand-red-dark)]">
                Início
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4" />
            </li>
            <li>
              <Link href="/produtos" className="hover:text-[var(--brand-red-dark)]">
                Produtos
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4" />
            </li>
            <li aria-current="page" className="font-medium text-[var(--text-primary)]">
              {product.name}
            </li>
          </ol>
        </nav>

        <section className="grid min-w-0 gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14" aria-labelledby="product-title">
          <div className="min-w-0 lg:col-span-7">
            <ProductGallery product={product} />
          </div>
          <div className="min-w-0 lg:col-span-5 lg:pt-4">
            <p className="eyebrow">{categoryLabels[product.category]}</p>
            <h1 id="product-title" className="page-title mt-4 text-balance">
              {product.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-[var(--text-secondary)]">{product.type}</p>
            <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">
              {product.description ??
                "Uma solução modular desenvolvida para aproveitar melhor o espaço, facilitar a organização e integrar-se a diferentes estilos de ambiente."}
            </p>

            <div className="mt-9 border-t border-[var(--border)] pt-7">
              <h2 className="text-lg font-semibold tracking-[-0.02em]">Medidas disponíveis</h2>
              <div className="mt-4 min-w-0 overflow-x-auto">
                <table className="responsive-table w-full table-fixed border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
                      {product.dimensions.some((dimension) => dimension.label) ? <th className="py-3 pr-4 font-semibold">Modelo</th> : null}
                      <th className="py-3 pr-4 font-semibold">Altura</th>
                      <th className="py-3 pr-4 font-semibold">Largura</th>
                      <th className="py-3 font-semibold">Profundidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.dimensions.map((dimension, index) => (
                      <tr key={`${dimension.width}-${index}`} className="border-b border-[var(--border)]">
                        {product.dimensions.some((item) => item.label) ? <td className="py-3 pr-4">{dimension.label ?? "—"}</td> : null}
                        <td className="py-3 pr-4">{dimension.height}</td>
                        <td className="py-3 pr-4">{dimension.width}</td>
                        <td className="py-3">{dimension.depth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold tracking-[-0.02em]">Acabamentos</h2>
              {product.finishes.length ? (
                <ul className="mt-4 flex flex-wrap gap-3">
                  {product.finishes.map((item) => (
                    <li key={item.name} className="flex min-h-11 items-center gap-2 border border-[var(--border)] px-3 text-sm">
                      <span className="size-4 border border-black/15" style={{ backgroundColor: item.swatch }} aria-hidden="true" />
                      {item.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-[var(--text-secondary)]">Informação de acabamento em revisão.</p>
              )}
            </div>

            <p className="mt-6 text-xs text-[var(--text-muted)]">Informações conforme a página {product.catalogPage} do catálogo fornecido.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/#representantes">Falar com um representante</ButtonLink>
              <ButtonLink href="/produtos" variant="secondary">
                Voltar aos produtos
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>

      {related.length ? (
        <section className="section-space border-t border-[var(--border)] bg-[var(--background)]" aria-labelledby="related-title">
          <div className="site-container">
            <p className="eyebrow">Você também pode gostar</p>
            <h2 id="related-title" className="section-title mt-4">
              Produtos relacionados
            </h2>
            <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
