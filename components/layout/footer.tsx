import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { navigation, socialLinks } from "@/data/navigation";
import { withBasePath } from "@/lib/site";

export function Footer() {
  const visibleSocialLinks = socialLinks.filter((link) => link.url);

  return (
    <footer id="contato" className="bg-[var(--surface-dark)] text-white">
      <div className="site-container grid gap-10 py-12 sm:py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5 lg:col-span-4">
          <Image
            src={withBasePath("/images/logo/moveis-goncalves.webp")}
            alt="Móveis Gonçalves"
            width={350}
            height={100}
            className="h-auto w-[170px] sm:w-[190px]"
          />
          <p className="mt-6 max-w-sm text-sm leading-6 text-white/70">
            Desde 1990, produzindo móveis modulares em Tapira-PR.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé" className="md:col-span-3">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Navegação</p>
          <ul className="space-y-3 text-sm text-white/75">
            {navigation.slice(0, 5).map((item) => (
              <li key={item.href}>
                <Link prefetch={false} className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4 lg:col-span-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Contato</p>
          <address className="space-y-3 text-sm not-italic leading-6 text-white/75">
            <p className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-[var(--brand-red)]" />
              <span>{company.address}</span>
            </p>
            <a className="flex items-center gap-3 hover:text-white" href="tel:+5544991158630">
              <Phone aria-hidden="true" className="size-4 shrink-0 text-[var(--brand-red)]" />
              {company.phones[0]}
            </a>
            <a className="flex items-center gap-3 break-all hover:text-white" href={`mailto:${company.email}`}>
              <Mail aria-hidden="true" className="size-4 shrink-0 text-[var(--brand-red)]" />
              <span>{company.email}</span>
            </a>
          </address>
          {visibleSocialLinks.length ? (
            <ul className="mt-6 flex flex-wrap gap-3">
              {visibleSocialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-3.5 text-sm text-white/75 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
                  >
                    {link.label === "Instagram" ? (
                      <Instagram aria-hidden="true" className="size-4" />
                    ) : (
                      <MessageCircle aria-hidden="true" className="size-4" />
                    )}
                    {link.label === "Instagram" ? company.instagram.handle : link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="site-container flex flex-col gap-3 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© Móveis Gonçalves. Todos os direitos reservados.</p>
          <Link href="/politica-de-privacidade" prefetch={false} className="hover:text-white">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
