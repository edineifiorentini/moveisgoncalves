import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { BadgeCheck, Gauge, PanelsTopLeft } from "lucide-react";
import { qualityBenefits, sustainabilityImage } from "@/data/site-content";
import { ButtonLink } from "@/components/shared/button-link";

const benefitIcons: Record<string, LucideIcon> = {
  function: PanelsTopLeft,
  efficiency: Gauge,
  quality: BadgeCheck,
};

export function QualitySection() {
  return (
    <section id="qualidade" className="scroll-mt-24 bg-[var(--surface)]">
      <div className="site-container grid lg:grid-cols-12">
        <div className="section-space border-b border-[var(--border)] lg:col-span-4 lg:border-b-0 lg:border-r lg:pr-12">
          <p className="eyebrow">Qualidade em cada detalhe</p>
          <h2 className="section-title mt-4 text-balance">Feitos para o dia a dia. Pensados para durar.</h2>
          <div className="mt-6 space-y-5 text-base leading-7 text-[var(--text-secondary)]">
            <p>
              Cada móvel é desenvolvido para unir aproveitamento inteligente de espaço, funcionalidade e bom
              acabamento. O sistema modular permite criar diferentes composições e encontrar soluções adequadas
              para ambientes de diversos tamanhos.
            </p>
            <p>
              Com processos modernos e cuidado em cada etapa, buscamos entregar produtos confiáveis, versáteis e
              com um preço justo.
            </p>
          </div>

          <div className="mt-10 space-y-7">
            {qualityBenefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon];
              return (
                <article key={benefit.title} className="grid grid-cols-[44px_1fr] gap-4">
                  <span className="grid size-11 place-items-center bg-[var(--brand-red-soft)] text-[var(--brand-red)]">
                    <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-[-0.02em]">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{benefit.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <figure
          id="sustentabilidade"
          className="relative min-h-[480px] scroll-mt-24 overflow-hidden bg-[#24302e] lg:col-span-4 lg:min-h-full"
        >
          <Image
            src={sustainabilityImage.src}
            alt={sustainabilityImage.alt}
            fill
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-black/65 px-5 py-3 text-xs text-white/80 backdrop-blur-sm">
            <a className="underline underline-offset-3" href={sustainabilityImage.sourceUrl}>
              {sustainabilityImage.credit}
            </a>
          </figcaption>
        </figure>

        <div className="section-space bg-[var(--surface-warm)] lg:col-span-4 lg:pl-12">
          <p className="eyebrow">Um olhar para o futuro</p>
          <h2 className="section-title mt-4 text-balance">Crescer também é produzir com mais responsabilidade.</h2>
          <div className="mt-6 space-y-5 text-base leading-7 text-[var(--text-secondary)]">
            <p>
              Investimos em energia solar para tornar nossa operação mais eficiente e reduzir o impacto ambiental
              da produção.
            </p>
            <p>
              Essa escolha representa a maneira como enxergamos o futuro: continuar evoluindo, utilizando melhor os
              recursos e buscando processos cada vez mais responsáveis.
            </p>
          </div>
          <ButtonLink href="/#historia" className="mt-8">
            Conheça nossa história
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
