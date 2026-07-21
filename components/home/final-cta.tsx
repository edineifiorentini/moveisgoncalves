import Image from "next/image";
import { ButtonLink } from "@/components/shared/button-link";
import { withBasePath } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="bg-[var(--surface-warm)]" aria-labelledby="final-cta-title">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
          <Image
            src={withBasePath("/images/products/comoda-italia-ambiente.webp")}
            alt="Cômoda Itália em um quarto claro"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-[var(--gutter)] py-14 lg:px-[clamp(3rem,7vw,8rem)] lg:py-20">
          <div className="max-w-xl">
            <p className="eyebrow">Para o seu jeito de viver</p>
            <h2 id="final-cta-title" className="section-title mt-4 text-balance">
              Qualidade e funcionalidade para transformar a sua casa.
            </h2>
            <p className="mt-6 text-base leading-7 text-[var(--text-secondary)] md:text-lg">
              Conheça nossa linha de móveis modulares e encontre soluções que combinam com o seu espaço, sua rotina
              e o seu jeito de viver.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/produtos">Conhecer os produtos</ButtonLink>
              <ButtonLink href="/#representantes" variant="secondary">
                Falar com um representante
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
