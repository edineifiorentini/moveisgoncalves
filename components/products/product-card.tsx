"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [ambientReady, setAmbientReady] = useState(false);
  const [showAmbient, setShowAmbient] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const hasAmbient = Boolean(product.images.ambient);

  useEffect(() => {
    if (!hasAmbient || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAmbientReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px" },
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasAmbient]);

  return (
    <article
      ref={cardRef}
      className="product-card group/card flex h-full flex-col border border-[var(--border)] bg-[var(--surface)]"
      data-show-ambient={showAmbient ? "true" : "false"}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-warm)]">
        {product.images.isolated ? (
          <Image
            src={product.images.isolated}
            alt={`${product.type} ${product.name} em imagem isolada`}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 720px) 50vw, 100vw"
            className="product-image-isolated object-contain p-7 transition-[opacity,transform] duration-500 motion-reduce:transition-none"
          />
        ) : null}
        {hasAmbient && ambientReady ? (
          <Image
            src={product.images.ambient!}
            alt={`${product.type} ${product.name} em ambiente decorado`}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 720px) 50vw, 100vw"
            className="product-image-ambient object-cover opacity-0 transition-[opacity,transform] duration-500 motion-reduce:transition-none"
          />
        ) : null}
        <span className="absolute left-3 top-3 bg-white/92 px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] backdrop-blur-sm">
          {product.type}
        </span>
        {hasAmbient ? (
          <button
            type="button"
            className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 border border-[var(--border)] bg-white/94 px-3 text-xs font-semibold text-[var(--text-primary)] shadow-sm backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-red)] md:hidden"
            aria-pressed={showAmbient}
            onClick={() => setShowAmbient((current) => !current)}
          >
            <Images aria-hidden="true" className="size-4 text-[var(--brand-red)]" />
            {showAmbient ? "Ver produto" : "Ver no ambiente"}
          </button>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
          <Link
            href={`/produtos/${product.slug}`}
            className="focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--brand-red)]"
          >
            {product.name}
          </Link>
        </h2>

        <div className="mt-4 min-h-10">
          {product.finishes.length ? (
            <ul className="flex flex-wrap gap-x-3 gap-y-2" aria-label="Acabamentos disponíveis">
              {product.finishes.map((item) => (
                <li key={item.name} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                  <span
                    className="size-3 border border-black/15"
                    style={{ backgroundColor: item.swatch }}
                    aria-hidden="true"
                  />
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs font-medium text-[var(--text-muted)]">Acabamentos em revisão</p>
          )}
        </div>

        <Link
          href={`/produtos/${product.slug}`}
          className="group mt-6 inline-flex min-h-11 items-center justify-between border-t border-[var(--border)] pt-4 text-sm font-semibold text-[var(--brand-red-dark)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--brand-red)]"
        >
          Ver detalhes
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
