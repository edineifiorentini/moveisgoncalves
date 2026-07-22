import { ButtonLink } from "@/components/shared/button-link";
import { DelayedReveal } from "@/components/react-bits/delayed-reveal";
import { SplitText } from "@/components/react-bits/split-text";
import { withBasePath } from "@/lib/site";
import { ResponsiveImage } from "@/components/shared/responsive-image";

export function FinalCta() {
  return (
    <section className="bg-[var(--surface-warm)]" aria-labelledby="final-cta-title">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[520px]">
          <ResponsiveImage
            src={withBasePath("/images/products/comoda-italia-ambiente.webp")}
            alt="Cômoda Itália em um quarto claro"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-[var(--gutter)] py-12 sm:py-14 lg:px-[clamp(3rem,7vw,8rem)] lg:py-20">
          <div className="max-w-xl">
            <p className="eyebrow">Para o seu jeito de viver</p>
            <SplitText
              tag="h2"
              id="final-cta-title"
              text="Qualidade e funcionalidade para transformar a sua casa."
              className="section-title mt-4 text-balance"
            />
            <DelayedReveal className="mt-6" delay={0.24}>
              <p className="text-base leading-7 text-[var(--text-secondary)] md:text-lg">
                Conheça nossa linha de móveis modulares e encontre soluções que combinam com o seu espaço, sua rotina
                e o seu jeito de viver.
              </p>
            </DelayedReveal>
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
