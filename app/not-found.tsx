import Link from "next/link";
import { DelayedReveal } from "@/components/react-bits/delayed-reveal";
import { SplitText } from "@/components/react-bits/split-text";

export default function NotFound() {
  return (
    <main id="main-content" className="grid min-h-[70vh] place-items-center px-[var(--gutter)] pt-[var(--header-height)] text-center">
      <div>
        <p className="eyebrow">Página não encontrada</p>
        <SplitText tag="h1" text="Este caminho não existe." className="page-title mt-4" textAlign="center" />
        <DelayedReveal className="mt-5" delay={1.02}>
          <p className="text-[var(--text-secondary)]">Volte à página inicial ou explore nosso catálogo de produtos.</p>
        </DelayedReveal>
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
