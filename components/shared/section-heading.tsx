type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

import { DelayedReveal } from "@/components/react-bits/delayed-reveal";
import { SplitText } from "@/components/react-bits/split-text";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <SplitText
        tag="h2"
        text={title}
        className={`section-title mt-4 text-balance ${align === "center" ? "mx-auto" : ""}`}
        textAlign={align}
      />
      {description ? (
        <DelayedReveal className="mt-5" delay={1.12}>
          <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)] md:text-lg">{description}</p>
        </DelayedReveal>
      ) : null}
    </div>
  );
}
