import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: company.website, changeFrequency: "monthly", priority: 1 },
    { url: `${company.website}/produtos`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${company.website}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${company.website}/produtos/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticPages, ...productPages];
}
