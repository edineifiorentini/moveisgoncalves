import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)] sm:px-5 ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
