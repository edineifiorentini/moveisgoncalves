import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { GradualBlur } from "@/components/react-bits/gradual-blur";
import { company } from "@/data/company";
import { absoluteUrl, siteRootUrl } from "@/lib/site";
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
    template: "%s",
  },
  description:
    "Móveis modulares para cozinhas, áreas de serviço, quartos e salas, produzidos em Tapira-PR desde 1990.",
  icons: {
    icon: absoluteUrl("/images/logo/moveis-goncalves.png"),
    shortcut: absoluteUrl("/images/logo/moveis-goncalves.png"),
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Móveis Gonçalves",
    url: siteRootUrl,
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
    images: [absoluteUrl("/og.png")],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: siteRootUrl,
  foundingDate: String(company.founded),
  email: company.email,
  telephone: company.phones,
  sameAs: [company.instagram.url],
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Lapa, 1713",
    addressLocality: "Tapira",
    addressRegion: "PR",
    postalCode: "87830-000",
    addressCountry: "BR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} antialiased`}>
        <a className="skip-link" href="#main-content">
          Ir para o conteúdo principal
        </a>
        <Header />
        {children}
        <Footer />
        <GradualBlur
          target="page"
          position="bottom"
          height="7rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
          zIndex={40}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
