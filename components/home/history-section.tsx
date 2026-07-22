import type { LucideIcon } from "lucide-react";
import { CalendarDays, Factory, ScanLine, SunMedium } from "lucide-react";
import { historyStats } from "@/data/site-content";
import { DelayedReveal } from "@/components/react-bits/delayed-reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const statIcons: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  factory: Factory,
  production: ScanLine,
  solar: SunMedium,
};

export function HistorySection() {
  return (
    <section id="historia" className="section-space scroll-mt-24 bg-[var(--surface-warm)]">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <SectionHeading
            eyebrow="Nossa história"
            title="Uma história construída com trabalho, evolução e confiança."
            className="lg:col-span-4"
          />
          <DelayedReveal className="space-y-5 text-base leading-7 text-[var(--text-secondary)] lg:col-span-4">
            <p>
              Em 1990, a Móveis Gonçalves iniciou sua trajetória em Tapira, no Paraná, em uma estrutura de apenas
              80 m² e com produção artesanal. O que começou pequeno cresceu com dedicação, investimento e
              compromisso com as famílias que levam nossos móveis para dentro de casa.
            </p>
            <p>
              Hoje, contamos com uma fábrica de aproximadamente 2.000 m², equipada com máquinas modernas que
              proporcionam mais precisão, eficiência e qualidade em cada etapa da produção.
            </p>
          </DelayedReveal>
          <DelayedReveal
            className="space-y-5 text-base leading-7 text-[var(--text-secondary)] lg:col-span-4"
            delay={0.68}
          >
            <p>
              Mesmo com toda essa evolução, mantemos o princípio que orienta nosso trabalho desde o início:
              oferecer móveis funcionais, bem construídos e acessíveis, capazes de valorizar o lar e facilitar a
              rotina.
            </p>
          </DelayedReveal>
        </div>

        <div className="mt-10 grid border-y border-[var(--border)] sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {historyStats.map((stat) => {
            const Icon = statIcons[stat.icon];
            return (
              <article
                key={stat.title}
                className="group border-b border-[var(--border)] px-0 py-6 last:border-b-0 sm:px-6 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.4}
                  className="size-8 origin-center text-[var(--brand-red)] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none"
                />
                <h3 className="mt-5 font-semibold tracking-[-0.02em]">{stat.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{stat.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
