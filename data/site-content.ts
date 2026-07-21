import type { ProductCategory } from "./products";

export const heroSlides = [
  {
    src: "/images/products/cozinha-veneza-ambiente.webp",
    alt: "Cozinha Veneza em ambiente integrado e acolhedor",
    position: "58% center",
  },
  {
    src: "/images/products/kit-caribe-ambiente.webp",
    alt: "Kit Caribe compondo uma cozinha compacta",
    position: "60% center",
  },
  {
    src: "/images/products/roupeiro-paris-ambiente.webp",
    alt: "Roupeiro Paris em um quarto claro",
    position: "64% center",
  },
];

export const productCategories: Array<{
  title: string;
  description: string;
  category: ProductCategory;
  image: string;
  alt: string;
}> = [
  {
    title: "Cozinha e área de serviço",
    description: "Organização para simplificar cada tarefa.",
    category: "cozinha-area-servico",
    image: "/images/products/cozinha-veneza-ambiente.webp",
    alt: "Cozinha modular Veneza",
  },
  {
    title: "Quarto",
    description: "Mais espaço para guardar, descansar e viver.",
    category: "quarto",
    image: "/images/products/roupeiro-paris-ambiente.webp",
    alt: "Roupeiro Paris em ambiente de quarto",
  },
  {
    title: "Sala",
    description: "Funcionalidade que também faz parte da decoração.",
    category: "sala",
    image: "/images/products/painel-monaco-isolado.webp",
    alt: "Painel Mônaco para sala",
  },
  {
    title: "Multiuso e escritório",
    description: "Soluções inteligentes para cada canto.",
    category: "escritorio",
    image: "/images/products/mesa-escrivaninha-suellen-ambiente.webp",
    alt: "Mesa escrivaninha Suellen em ambiente de trabalho",
  },
];

export const historyStats = [
  {
    icon: "calendar",
    title: "Desde 1990",
    description: "Mais de 30 anos de experiência no mercado.",
  },
  {
    icon: "factory",
    title: "2.000 m² de fábrica",
    description: "Estrutura preparada para produzir com mais eficiência.",
  },
  {
    icon: "production",
    title: "Produção moderna",
    description: "Tecnologia aplicada à precisão e ao acabamento.",
  },
  {
    icon: "solar",
    title: "Energia solar",
    description: "Mais responsabilidade e sustentabilidade.",
  },
];

export const qualityBenefits = [
  {
    icon: "function",
    title: "Funcionalidade real",
    description: "Projetos pensados para organizar a rotina e aproveitar melhor o espaço disponível.",
  },
  {
    icon: "efficiency",
    title: "Produção eficiente",
    description: "Máquinas modernas que contribuem para mais precisão e padronização.",
  },
  {
    icon: "quality",
    title: "Qualidade acessível",
    description: "Móveis que equilibram design, praticidade, acabamento e custo-benefício.",
  },
];

export const sustainabilityImage = {
  src: "/images/sustainability/energia-solar.webp",
  alt: "Painéis solares instalados sobre uma cobertura industrial ao pôr do sol",
  credit: "Imagem ilustrativa: Nuno Marques / Unsplash",
  sourceUrl: "https://unsplash.com/photos/black-and-white-solar-panels-0GbrjL3vZF4",
};
