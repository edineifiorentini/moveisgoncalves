"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";
import { withBasePath } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    document.body.style.overflow = "hidden";
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-[var(--border)] bg-[rgba(255,253,250,0.985)]"
          : "border-transparent bg-[rgba(255,253,250,0.96)]"
      }`}
    >
      <div className="site-container relative z-10 flex h-[var(--header-height)] items-center justify-between gap-4 sm:gap-6">
        <Link
          href="/"
          prefetch={false}
          aria-label="Móveis Gonçalves — página inicial"
          className="relative z-10 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)]"
        >
          <Image
            src={withBasePath("/images/logo/moveis-goncalves.webp")}
            alt="Móveis Gonçalves"
            width={350}
            height={100}
            className="h-auto w-[146px] sm:w-[154px] xl:w-[180px]"
            priority
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-6 xl:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/produtos"
          prefetch={false}
          className="hidden min-h-11 items-center bg-[var(--brand-red)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-red-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)] xl:inline-flex"
        >
          Ver produtos
        </Link>

        <button
          ref={triggerRef}
          type="button"
          className="relative z-10 grid size-11 place-items-center border border-[var(--border)] bg-white text-[var(--text-primary)] transition-colors hover:border-[var(--brand-red)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)] xl:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-0 h-[calc(100dvh-var(--header-height))] overflow-y-auto overscroll-contain bg-[var(--surface)] px-[var(--gutter)] xl:hidden"
        >
          <div className="mx-auto flex min-h-full max-w-2xl flex-col py-6 sm:py-8">
            <p className="eyebrow">Navegação</p>
            <nav aria-label="Navegação mobile" className="mt-3 flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="border-b border-[var(--border)] py-3.5 text-xl font-medium tracking-[-0.03em] text-[var(--text-primary)] transition-colors hover:text-[var(--brand-red-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-red)] sm:py-4 sm:text-2xl"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-7">
              <Link
                href="/produtos"
                prefetch={false}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 w-full items-center justify-center bg-[var(--brand-red)] px-6 font-semibold text-white transition-colors hover:bg-[var(--brand-red-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)]"
              >
                Explorar o catálogo
              </Link>
              <a
                href={`mailto:${company.email}`}
                className="mt-4 block break-all text-center text-sm text-[var(--text-secondary)] underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--brand-red-dark)]"
              >
                {company.email}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
