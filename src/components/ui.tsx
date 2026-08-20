import Link from "next/link";
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <section style={style} className={cn("py-20 sm:py-24", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--page-accent,#6ee7b7)]">
      {children}
    </p>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Magnetic className="inline-flex">
      <Link
        href={href}
        className={cn(
          "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-md px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--page-accent,#6ee7b7)] focus:ring-offset-2 focus:ring-offset-black",
          variant === "primary"
            ? "bg-[var(--page-accent,#6ee7b7)] text-slate-950 hover:bg-[var(--page-secondary,#a7f3d0)]"
            : "border border-white/15 bg-white/[0.03] text-white hover:border-[var(--page-highlight,#fcd34d)]/60 hover:bg-[var(--page-highlight,#fcd34d)]/[0.08] hover:text-[var(--page-highlight,#fcd34d)]",
          className,
        )}
      >
        <span className="absolute inset-0 translate-y-full bg-white/25 transition-transform duration-300 group-hover:translate-y-0" />
        <span className="relative">{children}</span>
        <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </Magnetic>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[var(--page-accent,#6ee7b7)]/25 bg-[var(--page-accent,#6ee7b7)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--page-secondary,#a7f3d0)]">
      {children}
    </span>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-[var(--page-accent,#6ee7b7)] px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-950">
      {children}
    </span>
  );
}

export function Card({
  className,
  children,
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20",
        className,
      )}
    >
      {children}
    </div>
  );
}
