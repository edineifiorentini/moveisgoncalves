"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
          ? "border-[var(--border)] bg-[rgba(255,253,250,0.96)] backdrop-blur-sm"
          : "border-transparent bg-[rgba(255,253,250,0.92)]"
      }`}
    >
      <div className="site-container flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
        <Link
          href="/"
          aria-label="Móveis Gonçalves — página inicial"
          className="relative z-10 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)]"
        >
          <Image
            src={withBasePath("/images/logo/moveis-goncalves.png")}
            alt="Móveis Gonçalves"
            width={350}
            height={100}
            className="h-auto w-[154px] lg:w-[180px]"
            priority
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-6 xl:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/produtos"
          className="hidden min-h-11 items-center bg-[var(--brand-red)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-red-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)] lg:inline-flex"
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
          className="fixed inset-0 top-[76px] z-0 bg-[var(--surface)] px-[var(--gutter)] py-10 xl:hidden"
        >
          <nav aria-label="Navegação mobile" className="mx-auto flex max-w-xl flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--border)] py-5 text-2xl font-medium tracking-[-0.03em] text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-red)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/produtos"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex min-h-12 items-center justify-center bg-[var(--brand-red)] px-6 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)]"
            >
              Ver produtos
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
