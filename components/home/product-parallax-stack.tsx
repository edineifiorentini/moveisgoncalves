"use client";

import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/site";
import { ResponsiveImage } from "@/components/shared/responsive-image";

const environments = [
  {
    src: withBasePath("/images/products/cozinha-veneza-ambiente.webp"),
    alt: "Cozinha Veneza em ambiente decorado",
    depth: 9,
  },
  {
    src: withBasePath("/images/products/roupeiro-paris-ambiente.webp"),
    alt: "Roupeiro Paris em um quarto claro",
    depth: -13,
  },
  {
    src: withBasePath("/images/products/mesa-escrivaninha-suellen-ambiente.webp"),
    alt: "Mesa Suellen em ambiente de trabalho",
    depth: 7,
  },
] as const;

export function ProductParallaxStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const moveLayers = (x: number, y: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
      const depth = Number(layer.dataset.depth ?? 0);
      layer.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => moveLayers(x, y));
  };

  return (
    <div
      ref={containerRef}
      className="product-parallax-stack"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => moveLayers(0, 0)}
      aria-label="Ambientes com produtos Móveis Gonçalves"
    >
      {environments.map((environment, index) => (
        <figure
          key={environment.src}
          data-depth={environment.depth}
          className={`product-parallax-card product-parallax-card-${index + 1}`}
        >
          <ResponsiveImage
            src={environment.src}
            alt={environment.alt}
            sizes="(min-width: 1024px) 30vw, 88vw"
            className="object-cover"
          />
        </figure>
      ))}
      <p className="product-parallax-caption">Ambientes reais do catálogo</p>
    </div>
  );
}
