import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "moveisgoncalves";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const basePath = configuredBasePath ?? (isGitHubPages ? `/${repositoryName}` : "");

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isGitHubPages,
  images: {
    // The catalog already ships responsive WebP assets. Serving them directly
    // also keeps the local vinext preview aligned with the static Pages build.
    unoptimized: true,
  },
};

export default nextConfig;
