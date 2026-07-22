import { MessageCircleQuestion } from "lucide-react";
import { frequentlyAskedQuestions } from "@/data/seo";
import { SectionHeading } from "@/components/shared/section-heading";

export function FaqSection() {
  return (
    <section className="section-space border-t border-[var(--border)] bg-[var(--surface)]" aria-labelledby="faq-title">
      <div className="site-container grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Informações essenciais"
            title="Perguntas frequentes sobre a Móveis Gonçalves."
            description="Respostas diretas sobre a fábrica, os produtos e o atendimento."
          />
        </div>
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)] lg:col-span-8">
          {frequentlyAskedQuestions.map((item, index) => (
            <article key={item.question} className="grid gap-3 py-6 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-5 sm:py-7">
              <span className="grid size-11 place-items-center bg-[var(--brand-red-soft)] text-[var(--brand-red)]" aria-hidden="true">
                <MessageCircleQuestion className="size-5" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
                  <span className="mr-2 text-sm tabular-nums text-[var(--brand-red)]">{String(index + 1).padStart(2, "0")}</span>
                  {item.question}
                </h3>
                <p className="mt-2 max-w-[68ch] text-sm leading-6 text-[var(--text-secondary)] sm:text-base sm:leading-7">
                  {item.answer}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

