"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type DelayedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
};

export function DelayedReveal({
  children,
  className = "",
  delay = 0.24,
  distance = 8,
  amount = 0.2,
}: DelayedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animation = element.animate(
          [
            { opacity: 0, transform: `translateY(${distance}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 440,
            delay: delay * 1000,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          },
        );
        observer.disconnect();
      },
      { threshold: Math.min(Math.max(amount, 0.01), 0.5), rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [amount, delay, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
