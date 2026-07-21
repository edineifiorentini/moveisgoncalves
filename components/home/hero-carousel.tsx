"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/site-content";
import { ButtonLink } from "@/components/shared/button-link";

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mountedSlides, setMountedSlides] = useState(() => new Set([0]));
  const touchStart = useRef<number | null>(null);

  const showSlide = useCallback((index: number) => {
    const next = (index + heroSlides.length) % heroSlides.length;
    setMountedSlides((current) => new Set(current).add(next));
    setActive(next);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mountRemaining = () => setMountedSlides(new Set(heroSlides.map((_, index) => index)));
    const idleId = window.setTimeout(mountRemaining, 1200);

    if (paused || mediaQuery.matches) return () => window.clearTimeout(idleId);

    const intervalId = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => {
      window.clearTimeout(idleId);
      window.clearInterval(intervalId);
    };
  }, [paused]);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Ambientes Móveis Gonçalves"
      className="relative isolate min-h-[720px] overflow-hidden bg-[#4b4036] pt-[76px] lg:min-h-[800px] lg:pt-[88px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 48) showSlide(active + (distance < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="absolute inset-0 top-[76px] lg:top-[88px]">
        {heroSlides.map((slide, index) =>
          mountedSlides.has(index) ? (
            <Image
              key={slide.src}
              src={slide.src}
              alt={index === active ? slide.alt : ""}
              fill
              sizes="100vw"
              priority={index === 0}
              className={`object-cover transition-opacity duration-[900ms] motion-reduce:transition-none ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectPosition: slide.position }}
            />
          ) : null,
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,17,14,.76)_0%,rgba(20,17,14,.48)_42%,rgba(20,17,14,.08)_72%)]" />
      </div>

      <div className="site-container relative z-10 flex min-h-[644px] items-center py-14 lg:min-h-[712px]">
        <div className="hero-copy-panel max-w-[650px] text-white">
          <p className="eyebrow text-white/75">Móveis modulares desde 1990</p>
          <h1 className="hero-title mt-5 max-w-[12ch] text-balance">
            Levando qualidade e conforto à sua casa.
          </h1>
          <p className="mt-6 max-w-[54ch] text-base leading-7 text-white/82 md:text-lg md:leading-8">
            Móveis modulares para cozinhas, áreas de serviço, quartos e salas, desenvolvidos para trazer mais
            praticidade, organização e beleza para o dia a dia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/produtos">Conheça nossos produtos</ButtonLink>
            <ButtonLink href="/#representantes" variant="light">
              Encontre um representante
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="site-container absolute inset-x-0 bottom-7 z-20 flex items-center justify-between text-white">
        <div className="flex items-center gap-2" aria-label={`Slide ${active + 1} de ${heroSlides.length}`}>
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Mostrar ambiente ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => showSlide(index)}
              className={`h-1 min-w-8 transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                index === active ? "w-14 bg-[var(--brand-red)]" : "w-8 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Ambiente anterior"
            className="grid size-11 place-items-center border border-white/50 bg-black/15 transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
            onClick={() => showSlide(active - 1)}
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Próximo ambiente"
            className="grid size-11 place-items-center border border-white/50 bg-black/15 transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
            onClick={() => showSlide(active + 1)}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {heroSlides[active].alt}
      </p>
    </section>
  );
}
