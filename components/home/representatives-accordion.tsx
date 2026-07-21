"use client";

import { ChevronDown, MapPin, MessageCircle, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { territories } from "@/data/representatives";

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
                <div className="space-y-3 pb-5">
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
                      {representative.validated && representative.whatsappUrl ? (
                        <a
                          href={representative.whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Falar com ${representative.name} pelo WhatsApp`}
                          className="inline-flex min-h-11 items-center justify-center gap-2 border border-[var(--brand-red)] px-4 text-sm font-semibold text-[var(--brand-red-dark)]"
                        >
                          <MessageCircle aria-hidden="true" className="size-4" />
                          WhatsApp
                        </a>
                      ) : (
                        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)]">
                            <ShieldAlert aria-hidden="true" className="size-4 text-[var(--brand-red)]" />
                            Contato em revisão
                          </span>
                          <button
                            type="button"
                            disabled
                            aria-label={`WhatsApp de ${representative.name} indisponível enquanto o contato é revisado`}
                            className="inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 border border-[var(--border)] bg-white px-4 text-sm font-semibold text-[var(--text-muted)]"
                          >
                            <MessageCircle aria-hidden="true" className="size-4" />
                            WhatsApp
                          </button>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
