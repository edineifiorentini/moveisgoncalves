"use client";

import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/site";
import { ResponsiveImage } from "@/components/shared/responsive-image";

const spotlightProducts = [
  {
    slug: "kit-onix",
    name: "Ônix",
    type: "Kit de cozinha",
    image: withBasePath("/images/products/kit-onix-isolado.webp"),
  },
  {
    slug: "roupeiro-paris",
    name: "Paris",
    type: "Roupeiro",
    image: withBasePath("/images/products/roupeiro-paris-isolado.webp"),
  },
  {
    slug: "multiuso-roma",
    name: "Roma",
    type: "Multiuso",
    image: withBasePath("/images/products/multiuso-roma-isolado.webp"),
  },
  {
    slug: "mesa-escrivaninha-suellen",
    name: "Suellen",
    type: "Mesa escrivaninha",
    image: withBasePath("/images/products/mesa-escrivaninha-suellen-isolado.webp"),
  },
  {
    slug: "cozinha-veneza",
    name: "Veneza",
    type: "Cozinha",
    image: withBasePath("/images/products/cozinha-veneza-isolado.webp"),
  },
] as const;

export function ProductSpotlight() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [manualPaused, setManualPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const activeRef = useRef(0);
  const cleanupRef = useRef<number | null>(null);
  const paused = manualPaused || hovered;

  const selectProduct = useCallback((next: number) => {
    if (next === activeRef.current) return;
    setPrevious(activeRef.current);
    activeRef.current = next;
    setActive(next);
    if (cleanupRef.current !== null) window.clearTimeout(cleanupRef.current);
    cleanupRef.current = window.setTimeout(() => setPrevious(null), 820);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || reducedMotion.matches) return;

    const intervalId = window.setInterval(() => {
      selectProduct((activeRef.current + 1) % spotlightProducts.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [paused, selectProduct]);

  useEffect(
    () => () => {
      if (cleanupRef.current !== null) window.clearTimeout(cleanupRef.current);
    },
    [],
  );

  const activeProduct = spotlightProducts[active];

  return (
    <div
      className="product-spotlight"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-roledescription="carrossel"
      aria-label="Destaques do catálogo"
    >
      <Link
        href={`/produtos/${activeProduct.slug}`}
        prefetch={false}
        className="product-spotlight-link focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)]"
        aria-label={`Conhecer ${activeProduct.type} ${activeProduct.name}`}
      >
        {spotlightProducts.map((product, index) =>
          index === active || index === previous ? (
            <ResponsiveImage
              key={product.slug}
              src={product.image}
              alt={index === active ? `${product.type} ${product.name}` : ""}
              sizes="(min-width: 1024px) 390px, (min-width: 640px) 55vw, 100vw"
              className={`product-spotlight-image object-contain ${index === active ? "is-active" : ""}`}
            />
          ) : null,
        )}
      </Link>

      <div className="product-spotlight-meta">
        <div aria-live={paused ? "polite" : "off"}>
          <p>{activeProduct.type}</p>
          <h3>{activeProduct.name}</h3>
        </div>
        <button
          type="button"
          className="product-spotlight-control"
          onClick={() => setManualPaused((current) => !current)}
          aria-label={manualPaused ? "Continuar troca automática" : "Pausar troca automática"}
        >
          {manualPaused ? (
            <Play aria-hidden="true" className="size-4" />
          ) : (
            <Pause aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>

      <div className="product-spotlight-dots" aria-label="Escolher produto em destaque">
        {spotlightProducts.map((product, index) => (
          <button
            key={product.slug}
            type="button"
            aria-label={`Mostrar ${product.name}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => selectProduct(index)}
            className={index === active ? "is-active" : ""}
          />
        ))}
      </div>
    </div>
  );
}
