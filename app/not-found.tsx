import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="grid min-h-[70vh] place-items-center px-[var(--gutter)] pt-[76px] text-center lg:pt-[88px]">
      <div>
        <p className="eyebrow">Página não encontrada</p>
        <h1 className="page-title mt-4">Este caminho não existe.</h1>
        <p className="mt-5 text-[var(--text-secondary)]">Volte à página inicial ou explore nosso catálogo de produtos.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link className="inline-flex min-h-11 items-center bg-[var(--brand-red)] px-5 font-semibold text-white" href="/">
            Página inicial
          </Link>
          <Link className="inline-flex min-h-11 items-center border border-[var(--brand-red)] px-5 font-semibold text-[var(--brand-red-dark)]" href="/produtos">
            Ver produtos
          </Link>
        </div>
      </div>
    </main>
  );
}
