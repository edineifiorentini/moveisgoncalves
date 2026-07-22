import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BorderGlow } from "@/components/react-bits/border-glow";
import { StarBorder } from "@/components/react-bits/star-border";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const variants = {
    primary: "bg-[var(--brand-red)] text-white hover:bg-[var(--brand-red-dark)] border-transparent",
    secondary:
      "border-[var(--brand-red)] text-[var(--brand-red-dark)] hover:bg-[var(--brand-red-soft)]",
    light: "border-white/65 text-white hover:bg-white hover:text-[var(--text-primary)]",
  };

  const link = (
    <Link
      href={href}
      className={`group inline-flex min-h-11 w-full items-center justify-center gap-2 border px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)] sm:px-5 ${variants[variant]}`}
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );

  if (variant === "primary") {
    return (
      <StarBorder className={className} color="#ffb092" speed="6.8s" thickness={1}>
        {link}
      </StarBorder>
    );
  }

  return (
    <BorderGlow
      className={className}
      colors={variant === "light" ? ["#fffdfa", "#dca184", "#c92a00"] : ["#c92a00", "#dca184", "#fffdfa"]}
    >
      {link}
    </BorderGlow>
  );
}
