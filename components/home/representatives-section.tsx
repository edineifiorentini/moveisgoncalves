import { SectionHeading } from "@/components/shared/section-heading";
import { RepresentativesAccordion } from "./representatives-accordion";

export function RepresentativesSection() {
  return (
    <section id="representantes" className="section-space scroll-mt-24 bg-[var(--background)]">
      <div className="site-container grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-10">
        <SectionHeading
          eyebrow="Atendimento comercial"
          title="Encontre o representante da sua região."
          description="Fale com nossa equipe para conhecer a linha de produtos, consultar disponibilidade e encontrar o atendimento mais próximo."
          className="lg:col-span-4"
        />
        <div className="lg:col-span-8">
          <RepresentativesAccordion />
        </div>
      </div>
    </section>
  );
}
