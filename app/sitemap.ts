import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/produtos"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/politica-de-privacidade"), changeFrequency: "yearly", priority: 0.2 },
  ];
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/produtos/${product.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticPages, ...productPages];
}
