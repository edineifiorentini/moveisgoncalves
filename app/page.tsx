import type { Metadata } from "next";
import { CategorySection } from "@/components/home/category-section";
import { FinalCta } from "@/components/home/final-cta";
import { FaqSection } from "@/components/home/faq-section";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { HistorySection } from "@/components/home/history-section";
import { QualitySection } from "@/components/home/quality-section";
import { RepresentativesSection } from "@/components/home/representatives-section";
import { SectionReveal } from "@/components/shared/section-reveal";
import { frequentlyAskedQuestions } from "@/data/seo";
import { absoluteUrl, siteRootUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Móveis Gonçalves | Móveis Modulares desde 1990" },
  description:
    "Móveis modulares para cozinhas, áreas de serviço, quartos e salas. Qualidade, funcionalidade e preço justo, produzidos em Tapira-PR.",
  alternates: { canonical: absoluteUrl("/"), languages: { "pt-BR": absoluteUrl("/") } },
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteRootUrl}#webpage`,
      url: siteRootUrl,
      name: "Móveis Gonçalves | Móveis Modulares desde 1990",
      description:
        "Móveis modulares para cozinhas, áreas de serviço, quartos, salas e escritórios, produzidos em Tapira-PR desde 1990.",
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${siteRootUrl}#website` },
      about: { "@id": `${siteRootUrl}#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/products/cozinha-veneza-ambiente.webp"),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteRootUrl}#perguntas-frequentes`,
      mainEntity: frequentlyAskedQuestions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }} />
      <HeroCarousel />
      <SectionReveal>
        <CategorySection />
      </SectionReveal>
      <SectionReveal>
        <HistorySection />
      </SectionReveal>
      <SectionReveal>
        <QualitySection />
      </SectionReveal>
      <SectionReveal>
        <RepresentativesSection />
      </SectionReveal>
      <SectionReveal>
        <FaqSection />
      </SectionReveal>
      <SectionReveal>
        <FinalCta />
      </SectionReveal>
    </main>
  );
}
