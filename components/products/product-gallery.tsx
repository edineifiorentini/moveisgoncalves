"use client";

import { Search } from "lucide-react";
import { useRef, useState } from "react";
import type { Product } from "@/data/products";
import { ResponsiveImage } from "@/components/shared/responsive-image";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const zoomFrameRef = useRef<HTMLDivElement>(null);
  const gallery = [
    product.images.isolated ? { src: product.images.isolated, label: "Produto isolado" } : null,
    product.images.ambient ? { src: product.images.ambient, label: "Produto no ambiente" } : null,
    product.images.internal ? { src: product.images.internal, label: "Vista interna" } : null,
    ...(product.images.details?.map((src, index) => ({ src, label: `Imagem adicional ${index + 1}` })) ?? []),
  ].filter((item): item is { src: string; label: string } => Boolean(item));

  const [active, setActive] = useState(0);
  const selected = gallery[active] ?? gallery[0];

  if (!selected) return null;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    zoomFrameRef.current?.style.setProperty("--zoom-x", `${x}%`);
    zoomFrameRef.current?.style.setProperty("--zoom-y", `${y}%`);
    zoomFrameRef.current?.setAttribute("data-zooming", "true");
  };

  const handlePointerLeave = () => {
    zoomFrameRef.current?.removeAttribute("data-zooming");
  };

  return (
    <div>
      <div
        ref={zoomFrameRef}
        className="product-gallery-frame relative aspect-[4/3] overflow-hidden bg-[var(--surface-warm)]"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <ResponsiveImage
          key={selected.src}
          src={selected.src}
          alt={`${selected.label} — ${product.type} ${product.name}`}
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className={`product-gallery-main ${selected.src.includes("isolado") ? "object-contain p-5 sm:p-8" : "object-cover"}`}
        />
        <span className="product-gallery-zoom-hint" aria-hidden="true">
          <Search className="size-4" />
          Passe o cursor para ampliar
        </span>
      </div>

      {gallery.length > 1 ? (
        <div className="mt-2.5 grid grid-cols-3 gap-2.5 sm:mt-3 sm:grid-cols-4 sm:gap-3" aria-label="Galeria do produto">
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
              <ResponsiveImage
                src={image.src}
                alt=""
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
