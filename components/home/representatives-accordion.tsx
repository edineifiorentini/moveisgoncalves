"use client";

import { ChevronDown, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { company } from "@/data/company";
import { territories } from "@/data/representatives";
import { AnimatedList } from "@/components/react-bits/animated-list";

function companyWhatsappUrl(representative: string, region: string) {
  const message = encodeURIComponent(
    `Olá! Gostaria de atendimento com ${representative}, representante da região ${region}.`,
  );
  return `${company.whatsappUrl}?text=${message}`;
}

export function RepresentativesAccordion() {
  const [openId, setOpenId] = useState<string | null>(territories[0]?.id ?? null);

  return (
    <div className="border-t border-[var(--border)]">
      {territories.map((territory) => {
        const isOpen = openId === territory.id;
        const panelId = `territory-panel-${territory.id}`;
        return (
          <section key={territory.id} className="border-b border-[var(--border)]">
            <h3>
              <button
                type="button"
                className="group flex min-h-14 w-full items-center justify-between gap-4 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--brand-red)] sm:min-h-16 sm:gap-5 sm:py-4"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : territory.id)}
              >
                <span className="flex items-center gap-3 font-semibold tracking-[-0.02em]">
                  <MapPin aria-hidden="true" className="size-4 text-[var(--brand-red)]" />
                  {territory.region}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 shrink-0 transition-transform motion-reduce:transition-none ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              className={`accordion-grid ${isOpen ? "is-open" : ""}`}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <AnimatedList className="space-y-3 pb-5">
                  {territory.representatives.map((representative) => (
                    <article
                      key={`${territory.id}-${representative.name}`}
                      className="grid gap-3 bg-[var(--surface-warm)] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4"
                    >
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{representative.name}</p>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                          {representative.base ? `${representative.base} · ` : ""}
                          {representative.phone}
                        </p>
                      </div>
                      <a
                        href={companyWhatsappUrl(representative.name, territory.region)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Solicitar atendimento com ${representative.name} pelo WhatsApp oficial da Móveis Gonçalves`}
                        className="group inline-flex min-h-11 items-center justify-center gap-2 border border-[var(--brand-red)] px-4 text-sm font-semibold text-[var(--brand-red-dark)] transition-colors hover:bg-[var(--brand-red)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--brand-red)]"
                      >
                        <MessageCircle
                          aria-hidden="true"
                          className="size-4 transition-transform group-hover:scale-110 motion-reduce:transition-none"
                        />
                        WhatsApp
                      </a>
                    </article>
                  ))}
                </AnimatedList>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
