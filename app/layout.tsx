import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { DeferredPageBlur } from "@/components/react-bits/deferred-page-blur";
import { company } from "@/data/company";
import { absoluteUrl, siteRootUrl, withBasePath } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteRootUrl),
  title: {
    default: "Móveis Gonçalves | Móveis Modulares desde 1990",
    template: "%s | Móveis Gonçalves",
  },
  description:
    "Móveis modulares para cozinhas, áreas de serviço, quartos e salas, produzidos em Tapira-PR desde 1990.",
  applicationName: "Móveis Gonçalves",
  authors: [{ name: "Móveis Gonçalves", url: siteRootUrl }],
  creator: "Móveis Gonçalves",
  publisher: "Móveis Gonçalves",
  category: "Móveis modulares",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: siteRootUrl,
    languages: { "pt-BR": siteRootUrl },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "BR-PR",
    "geo.placename": "Tapira",
  },
  icons: {
    icon: absoluteUrl("/favicon.svg"),
    shortcut: absoluteUrl("/favicon.svg"),
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Móveis Gonçalves",
    url: siteRootUrl,
    title: "Móveis Gonçalves | Móveis Modulares desde 1990",
    description:
      "Móveis modulares para cozinhas, áreas de serviço, quartos, salas e escritórios, fabricados em Tapira-PR.",
    images: [
      {
        url: absoluteUrl("/og.png"),
        width: 1200,
        height: 630,
        alt: "Móveis Gonçalves — Móveis modulares desde 1990",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Móveis Gonçalves | Móveis Modulares desde 1990",
    description: "Qualidade, funcionalidade e móveis modulares fabricados em Tapira-PR desde 1990.",
    images: [absoluteUrl("/og.png")],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffdfa",
  colorScheme: "light",
};

const organizationId = `${siteRootUrl}#organization`;
const websiteId = `${siteRootUrl}#website`;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: company.name,
      legalName: company.name,
      url: siteRootUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo/moveis-goncalves.png"),
        width: 350,
        height: 100,
      },
      image: absoluteUrl("/og.png"),
      description:
        "Fabricante de móveis modulares para cozinhas, áreas de serviço, quartos, salas, escritórios e espaços multiuso.",
      foundingDate: String(company.founded),
      foundingLocation: { "@type": "Place", name: "Tapira, Paraná, Brasil" },
      email: company.email,
      telephone: company.phones,
      sameAs: [company.instagram.url],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: company.phones[0],
        contactType: "atendimento ao cliente",
        availableLanguage: "Portuguese",
        areaServed: "BR",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "R. Lapa, 1713",
        addressLocality: "Tapira",
        addressRegion: "PR",
        postalCode: "87830-000",
        addressCountry: "BR",
      },
      knowsAbout: [
        "Móveis modulares",
        "Cozinhas modulares",
        "Móveis para quartos",
        "Móveis para salas",
        "Móveis para escritório",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteRootUrl,
      name: company.name,
      inLanguage: "pt-BR",
      publisher: { "@id": organizationId },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: absoluteUrl("/produtos?busca={search_term_string}"),
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="alternate" type="text/plain" href={withBasePath("/llms.txt")} title="Informações para sistemas de IA" />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <a className="skip-link" href="#main-content">
          Ir para o conteúdo principal
        </a>
        <Header />
        {children}
        <Footer />
        <DeferredPageBlur />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
