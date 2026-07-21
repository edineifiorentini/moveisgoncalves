import type { Metadata } from "next";
import { CategorySection } from "@/components/home/category-section";
import { FinalCta } from "@/components/home/final-cta";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { HistorySection } from "@/components/home/history-section";
import { QualitySection } from "@/components/home/quality-section";
import { RepresentativesSection } from "@/components/home/representatives-section";

export const metadata: Metadata = {
  title: "Móveis Gonçalves | Móveis Modulares desde 1990",
  description:
    "Móveis modulares para cozinhas, áreas de serviço, quartos e salas. Qualidade, funcionalidade e preço justo, produzidos em Tapira-PR.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroCarousel />
      <CategorySection />
      <HistorySection />
      <QualitySection />
      <RepresentativesSection />
      <FinalCta />
    </main>
  );
}
