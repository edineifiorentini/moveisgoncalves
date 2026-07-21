import { company } from "@/data/company";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

export const basePath =
  configuredBasePath && configuredBasePath !== "/"
    ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
    : "";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || company.website
).replace(/\/+$/, "");

const siteOrigin = new URL(siteUrl).origin;

export function withBasePath(path: string) {
  if (!basePath || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(withBasePath(path), `${siteOrigin}/`).toString();
}

export const siteRootUrl = absoluteUrl("/");
