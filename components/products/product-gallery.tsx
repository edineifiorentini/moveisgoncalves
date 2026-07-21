"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const gallery = [
    product.images.isolated ? { src: product.images.isolated, label: "Produto isolado" } : null,
    product.images.ambient ? { src: product.images.ambient, label: "Produto no ambiente" } : null,
    product.images.internal ? { src: product.images.internal, label: "Vista interna" } : null,
    ...(product.images.details?.map((src, index) => ({ src, label: `Imagem adicional ${index + 1}` })) ?? []),
  ].filter((item): item is { src: string; label: string } => Boolean(item));

  const [active, setActive] = useState(0);
  const selected = gallery[active] ?? gallery[0];

  if (!selected) return null;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-warm)]">
        <Image
          key={selected.src}
          src={selected.src}
          alt={`${selected.label} — ${product.type} ${product.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className={selected.src.includes("isolado") ? "object-contain p-8" : "object-cover"}
        />
      </div>

      {gallery.length > 1 ? (
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4" aria-label="Galeria do produto">
          {gallery.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Mostrar ${image.label.toLowerCase()}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              className={`relative aspect-[4/3] overflow-hidden border bg-[var(--surface-warm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-red)] ${
                active === index ? "border-[var(--brand-red)]" : "border-[var(--border)]"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="160px"
                className={image.src.includes("isolado") ? "object-contain p-2" : "object-cover"}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
