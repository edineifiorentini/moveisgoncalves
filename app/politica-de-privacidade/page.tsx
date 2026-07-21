import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | Móveis Gonçalves",
  description: "Saiba como o site institucional da Móveis Gonçalves trata informações de navegação e contato.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="pt-[76px] lg:pt-[88px]">
      <article className="site-container max-w-4xl py-16 md:py-24">
        <p className="eyebrow">Privacidade</p>
        <h1 className="page-title mt-5 text-balance">Política de Privacidade</h1>
        <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">
          Esta página explica, de forma simples, como o site institucional da Móveis Gonçalves lida com informações
          durante a navegação.
        </p>

        <div className="prose-content mt-12 space-y-10">
          <section>
            <h2>1. Informações fornecidas por você</h2>
            <p>
              O site não possui cadastro, compra online ou formulário de pagamento. Quando você escolhe entrar em
              contato por e-mail ou por um canal externo, as informações são enviadas diretamente pelo serviço
              escolhido e usadas para responder à sua solicitação.
            </p>
          </section>
          <section>
            <h2>2. Dados técnicos de navegação</h2>
            <p>
              Serviços de hospedagem podem registrar informações técnicas necessárias para segurança e
              funcionamento, como endereço de rede, tipo de navegador, páginas acessadas e horário da solicitação.
            </p>
          </section>
          <section>
            <h2>3. Links externos</h2>
            <p>
              Links para e-mail, representantes ou outras plataformas seguem as políticas de privacidade dos
              respectivos serviços. Antes de enviar dados pessoais, confira as condições apresentadas por eles.
            </p>
          </section>
          <section>
            <h2>4. Contato</h2>
            <p>
              Para esclarecer dúvidas sobre privacidade, escreva para{" "}
              <a href="mailto:moveisgoncalves@hotmail.com">moveisgoncalves@hotmail.com</a>.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex min-h-11 items-center border border-[var(--brand-red)] px-5 text-sm font-semibold text-[var(--brand-red-dark)]"
        >
          Voltar à página inicial
        </Link>
      </article>
    </main>
  );
}
