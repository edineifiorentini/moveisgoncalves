import type { LucideIcon } from "lucide-react";
import { BadgeCheck, Gauge, PanelsTopLeft } from "lucide-react";
import { qualityBenefits } from "@/data/site-content";
import { ButtonLink } from "@/components/shared/button-link";
import { ProductParallaxStack } from "@/components/home/product-parallax-stack";
import { DelayedReveal } from "@/components/react-bits/delayed-reveal";
import { SplitText } from "@/components/react-bits/split-text";

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
          <SplitText
            tag="h2"
            text="Feitos para o dia a dia. Pensados para durar."
            className="section-title mt-4 text-balance"
          />
          <DelayedReveal className="mt-6 space-y-5 text-base leading-7 text-[var(--text-secondary)]" delay={1.22}>
            <p>
              Cada móvel é desenvolvido para unir aproveitamento inteligente de espaço, funcionalidade e bom
              acabamento. O sistema modular permite criar diferentes composições e encontrar soluções adequadas
              para ambientes de diversos tamanhos.
            </p>
            <p>
              Com processos modernos e cuidado em cada etapa, buscamos entregar produtos confiáveis, versáteis e
              com um preço justo.
            </p>
          </DelayedReveal>

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

        <div className="lg:col-span-4">
          <ProductParallaxStack />
        </div>

        <div
          id="sustentabilidade"
          className="section-space scroll-mt-24 bg-[var(--surface-warm)] lg:col-span-4 lg:pl-10 xl:pl-12"
        >
          <p className="eyebrow">Um olhar para o futuro</p>
          <SplitText
            tag="h2"
            text="Crescer também é produzir com mais responsabilidade."
            className="quality-title mt-4 text-balance"
          />
          <DelayedReveal className="mt-6 space-y-5 text-base leading-7 text-[var(--text-secondary)]" delay={1.22}>
            <p>
              Investimos em energia solar para tornar nossa operação mais eficiente e reduzir o impacto ambiental
              da produção.
            </p>
            <p>
              Essa escolha representa a maneira como enxergamos o futuro: continuar evoluindo, utilizando melhor os
              recursos e buscando processos cada vez mais responsáveis.
            </p>
          </DelayedReveal>
          <ButtonLink href="/#historia" className="mt-8">
            Conheça nossa história
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
