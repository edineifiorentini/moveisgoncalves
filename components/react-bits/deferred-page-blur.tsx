"use client";

import { useEffect, useState } from "react";
import { GradualBlur } from "./gradual-blur";

export function DeferredPageBlur() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const reveal = () => setVisible(true);
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((eventName) => window.addEventListener(eventName, reveal, { once: true, passive: true }));
    return () => events.forEach((eventName) => window.removeEventListener(eventName, reveal));
  }, [visible]);

  if (!visible) return null;

  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="7rem"
      strength={2}
      divCount={5}
      curve="bezier"
      exponential
      opacity={1}
      zIndex={40}
    />
  );
}

