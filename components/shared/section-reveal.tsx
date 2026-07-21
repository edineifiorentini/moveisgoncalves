"use client";

import { useEffect, useRef } from "react";

type SectionRevealProps = {
  children: React.ReactNode;
};

export function SectionReveal({ children }: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      container.dataset.visible = "true";
      return;
    }

    container.dataset.enhanced = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        container.dataset.visible = "true";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="section-reveal">
      {children}
    </div>
  );
}
