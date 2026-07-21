import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productCategories } from "@/data/site-content";
import { SectionHeading } from "@/components/shared/section-heading";

export function CategorySection() {
  return (
    <section className="section-space bg-[var(--background)]" aria-labelledby="categorias-title">
      <div className="site-container grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 xl:col-span-4">
          <div id="categorias-title">
            <SectionHeading
              eyebrow="Nossos produtos"
              title="Móveis para cada espaço da sua casa."
              description="Explore soluções pensadas para diferentes ambientes e descubra novas possibilidades para compor o seu lar."
            />
          </div>
          <Link
            href="/produtos"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-red-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)]"
          >
            Explorar todos os produtos
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="relative mt-14 hidden h-[310px] max-w-[390px] sm:block" aria-hidden="true">
            <div className="absolute left-0 top-0 h-[76%] w-[66%] overflow-hidden bg-[var(--surface-warm)]">
              <Image
                src="/images/products/kit-onix-alt.webp"
                alt=""
                fill
                sizes="260px"
                className="object-cover object-left"
              />
            </div>
            <div className="absolute bottom-0 right-0 h-[48%] w-[63%] bg-[var(--wood)] wood-grain" />
            <div className="absolute bottom-8 left-8 h-16 w-16 border border-white/75 bg-white/20" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8 xl:col-span-8">
          {productCategories.map((category) => (
            <Link
              key={category.title}
              href={`/produtos?categoria=${category.category}`}
              className="category-card group border border-[var(--border)] bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)]"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden ${
                  category.category === "sala" ? "bg-[var(--surface-warm)]" : "bg-[#d8d1c8]"
                }`}
              >
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                  className={`transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.025] ${
                    category.category === "sala" ? "object-contain p-8" : "object-cover"
                  }`}
                />
              </div>
              <div className="grid min-h-32 grid-cols-[1fr_auto] gap-4 p-5 md:p-6">
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{category.description}</p>
                </div>
                <span className="grid size-9 place-items-center self-end border border-[var(--brand-red)] text-[var(--brand-red)] transition-transform group-hover:translate-x-1">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
