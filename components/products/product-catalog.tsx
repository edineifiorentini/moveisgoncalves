"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useMemo, useState } from "react";
import {
  categoryLabels,
  numericDimension,
  type Product,
  type ProductCategory,
} from "@/data/products";
import { ProductCard } from "./product-card";

const categories: Array<{ value: "all" | ProductCategory; label: string }> = [
  { value: "all", label: "Todos" },
  ...Object.entries(categoryLabels).map(([value, label]) => ({ value: value as ProductCategory, label })),
];

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const inRange = (value: number, range: string) => {
  if (!range) return true;
  const [minimum, maximum] = range.split(":").map(Number);
  return value >= minimum && value <= maximum;
};

type ProductCatalogProps = {
  products: Product[];
};

export function ProductCatalog({ products }: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(12);

  const query = searchParams.get("busca") ?? "";
  const category = searchParams.get("categoria") ?? "all";
  const type = searchParams.get("tipo") ?? "";
  const selectedFinish = searchParams.get("acabamento") ?? "";
  const width = searchParams.get("largura") ?? "";
  const height = searchParams.get("altura") ?? "";
  const order = searchParams.get("ordem") ?? "catalogo";

  const typeOptions = useMemo(
    () => Array.from(new Set(products.map((product) => product.type))).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [products],
  );
  const finishOptions = useMemo(
    () =>
      Array.from(new Set(products.flatMap((product) => product.finishes.map((item) => item.name)))).sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [products],
  );

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "catalogo") next.set(key, value);
    else next.delete(key);
    setVisibleCount(12);
    startTransition(() => router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false }));
  };

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const searchable = normalize(`${product.name} ${product.type}`);
      const matchesQuery = !query || searchable.includes(normalize(query));
      const matchesCategory = category === "all" || product.category === category;
      const matchesType = !type || product.type === type;
      const matchesFinish = !selectedFinish || product.finishes.some((item) => item.name === selectedFinish);
      const matchesWidth = product.dimensions.some((dimension) => inRange(numericDimension(dimension.width), width));
      const matchesHeight = product.dimensions.some((dimension) => inRange(numericDimension(dimension.height), height));
      return matchesQuery && matchesCategory && matchesType && matchesFinish && matchesWidth && matchesHeight;
    });

    return filtered.toSorted((a, b) => {
      if (order === "nome") return a.name.localeCompare(b.name, "pt-BR");
      const widthA = Math.min(...a.dimensions.map((dimension) => numericDimension(dimension.width)));
      const widthB = Math.min(...b.dimensions.map((dimension) => numericDimension(dimension.width)));
      if (order === "menor-largura") return widthA - widthB;
      if (order === "maior-largura") return widthB - widthA;
      return a.catalogPage - b.catalogPage;
    });
  }, [products, query, category, type, selectedFinish, width, height, order]);

  const hasFilters = Boolean(query || category !== "all" || type || selectedFinish || width || height || order !== "catalogo");
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const clearFilters = () => {
    setVisibleCount(12);
    startTransition(() => router.replace(pathname, { scroll: false }));
  };

  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--surface)]" aria-label="Filtros do catálogo">
        <div className="site-container py-8 md:py-10">
          <div className="relative">
            <label htmlFor="product-search" className="sr-only">
              Busque por nome ou tipo de móvel
            </label>
            <Search aria-hidden="true" className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(event) => updateParam("busca", event.target.value)}
              placeholder="Busque por nome ou tipo de móvel"
              className="min-h-14 w-full border border-[var(--border)] bg-[var(--background)] pl-12 pr-4 text-base text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--brand-red)]"
            />
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Categorias de produtos">
            {categories.map((item) => {
              const selected = category === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => updateParam("categoria", item.value)}
                  className={`min-h-11 shrink-0 border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-red)] ${
                    selected
                      ? "border-[var(--brand-red)] bg-[var(--brand-red)] text-white"
                      : "border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-[var(--brand-red)]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <FilterSelect label="Tipo" value={type} onChange={(value) => updateParam("tipo", value)}>
              <option value="">Todos os tipos</option>
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect label="Acabamento" value={selectedFinish} onChange={(value) => updateParam("acabamento", value)}>
              <option value="">Todos os acabamentos</option>
              {finishOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect label="Largura" value={width} onChange={(value) => updateParam("largura", value)}>
              <option value="">Todas as larguras</option>
              <option value="0:0.60">Até 0,60 m</option>
              <option value="0.61:1.20">De 0,61 a 1,20 m</option>
              <option value="1.21:99">Acima de 1,20 m</option>
            </FilterSelect>
            <FilterSelect label="Altura" value={height} onChange={(value) => updateParam("altura", value)}>
              <option value="">Todas as alturas</option>
              <option value="0:1">Até 1,00 m</option>
              <option value="1.01:1.80">De 1,01 a 1,80 m</option>
              <option value="1.81:99">Acima de 1,80 m</option>
            </FilterSelect>
            <FilterSelect label="Ordenar" value={order} onChange={(value) => updateParam("ordem", value)}>
              <option value="catalogo">Ordem do catálogo</option>
              <option value="nome">Nome de A a Z</option>
              <option value="menor-largura">Menor largura</option>
              <option value="maior-largura">Maior largura</option>
            </FilterSelect>
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--background)]" aria-labelledby="catalog-results-title">
        <div className="site-container">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <SlidersHorizontal aria-hidden="true" className="size-4" />
                Catálogo
              </p>
              <h2 id="catalog-results-title" className="mt-2 text-xl font-semibold tracking-[-0.025em]">
                {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
              </h2>
            </div>
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--brand-red-dark)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--brand-red)]"
              >
                <X aria-hidden="true" className="size-4" />
                Limpar filtros
              </button>
            ) : null}
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {filteredProducts.length} resultados no catálogo.
          </p>

          {visibleProducts.length ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {visibleCount < filteredProducts.length ? (
                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((current) => current + 12)}
                    className="min-h-12 border border-[var(--brand-red)] px-7 text-sm font-semibold text-[var(--brand-red-dark)] transition-colors hover:bg-[var(--brand-red-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)]"
                  >
                    Carregar mais
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
              <h3 className="text-2xl font-medium tracking-[-0.03em]">Nenhum móvel encontrado</h3>
              <p className="mx-auto mt-3 max-w-lg text-[var(--text-secondary)]">
                Ajuste a busca ou remova alguns filtros para ver outras opções do catálogo.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 min-h-11 bg-[var(--brand-red)] px-5 text-sm font-semibold text-white"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
};

function FilterSelect({ label, value, onChange, children }: FilterSelectProps) {
  const id = `filter-${label.toLowerCase().replaceAll(" ", "-")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full border border-[var(--border)] bg-white px-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-red)]"
      >
        {children}
      </select>
    </div>
  );
}
