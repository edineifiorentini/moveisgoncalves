import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { navigation, socialLinks } from "@/data/navigation";
import { withBasePath } from "@/lib/site";

export function Footer() {
  const visibleSocialLinks = socialLinks.filter((link) => link.url);

  return (
    <footer id="contato" className="bg-[var(--surface-dark)] text-white">
      <div className="site-container grid gap-12 py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5 lg:col-span-4">
          <Image
            src={withBasePath("/images/logo/moveis-goncalves.png")}
            alt="Móveis Gonçalves"
            width={350}
            height={100}
            className="h-auto w-[190px]"
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
                <Link className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4 lg:col-span-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Contato</p>
          <address className="space-y-3 text-sm not-italic leading-6 text-white/75">
            <p>{company.address}</p>
            <a className="block hover:text-white" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </address>
          {visibleSocialLinks.length ? (
            <ul className="mt-6 flex gap-4">
              {visibleSocialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="site-container flex flex-col gap-3 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© Móveis Gonçalves. Todos os direitos reservados.</p>
          <Link href="/politica-de-privacidade" className="hover:text-white">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
