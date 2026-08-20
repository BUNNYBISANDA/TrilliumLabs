"use client";

import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/content";
import type { Bundle, Service } from "@/lib/content";
import { cn } from "@/lib/utils";

const mono = "font-[family-name:var(--page-font-mono,var(--font-mono))]";

export function InstrumentEyebrow({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className={cn(mono, "flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[var(--page-muted,#8A8F9C)]")}>
      <span className="text-[var(--page-accent,#FFA028)]">{n}</span>
      {children}
    </p>
  );
}

export function InstrumentSectionHead({
  n,
  label,
  title,
  note,
}: {
  n: string;
  label: string;
  title: string;
  note?: string;
}) {
  return (
    <Reveal className="mb-16 flex flex-wrap items-baseline justify-between gap-6">
      <div>
        <InstrumentEyebrow n={n}>{label}</InstrumentEyebrow>
        <h2 className="mt-4 max-w-xl text-[clamp(34px,5vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--page-highlight,#F2F6FF)]">
          {title}
        </h2>
      </div>
      {note ? (
        <p className={cn(mono, "max-w-[260px] text-right text-[11px] leading-[1.8] text-[var(--page-muted,#8A8F9C)]/70")}>{note}</p>
      ) : null}
    </Reveal>
  );
}

export function InstrumentTicker({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-[var(--page-border,#22242A)] bg-[var(--page-surface,#0C0D10)]">
      <div className="inline-flex animate-[ticker_42s_linear_infinite] py-3">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              mono,
              "border-r border-[var(--page-border,#17181D)] px-8 text-[11px] tracking-[0.06em] text-[var(--page-muted,#8A8F9C)]",
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

type SerializableService = Omit<Service, "icon">;

export function ServiceExplorer({ services }: { services: SerializableService[] }) {
  const [active, setActive] = useState(0);
  const service = services[active];

  return (
    <Reveal>
      <div className="grid border border-[var(--page-border,#22242A)] bg-[var(--page-surface,#0C0D10)] lg:grid-cols-[minmax(300px,420px)_1fr]">
        <div
          role="tablist"
          aria-label="Services"
          className="flex flex-col border-b border-[var(--page-border,#22242A)] lg:border-b-0 lg:border-r"
        >
          {services.map((s, index) => {
            const isActive = index === active;
            return (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                className={cn(
                  "flex w-full items-center gap-3 border-b border-[var(--page-border,#17181D)] px-7 py-6 text-left transition-all last:border-b-0",
                  isActive
                    ? "bg-black/25 pl-9 text-[var(--page-highlight,#F2F6FF)] shadow-[inset_3px_0_0_var(--page-accent,#FFA028)]"
                    : "text-[var(--page-muted,#8A8F9C)] hover:bg-black/15 hover:pl-9 hover:text-[var(--page-highlight,#F2F6FF)]",
                )}
              >
                <span className={cn(mono, "text-[11px] text-[var(--page-muted,#8A8F9C)]/60")}>
                  {s.eyebrow.replace("Service ", "")}
                </span>
                <span className="flex-1 text-[15px] font-medium">{s.shortTitle}</span>
                <span
                  className={cn(
                    mono,
                    "shrink-0 text-[10px] uppercase tracking-[0.1em]",
                    isActive ? "text-[var(--page-accent,#FFA028)]" : "text-[var(--page-muted,#8A8F9C)]/60",
                  )}
                >
                  {s.engagement.split(".")[0]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="min-h-[420px] p-8 sm:p-11" role="tabpanel">
          <p className={cn(mono, "text-[11px] uppercase tracking-[0.2em] text-[var(--page-accent,#FFA028)]")}>
            {service.eyebrow} · {service.engagement}
          </p>
          <h3 className="mt-3 text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.02em] text-[var(--page-highlight,#F2F6FF)]">
            {service.title}
          </h3>
          <p className="mt-3 max-w-xl text-[15px] text-[var(--page-muted,#8A8F9C)]">{service.summary}</p>

          <div key={service.slug} className="mt-9 grid border border-[var(--page-border,#22242A)] sm:grid-cols-3">
            {service.tiers.slice(0, 3).map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "border-b border-[var(--page-border,#22242A)] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
                  tier.badge ? "bg-black/20 shadow-[inset_0_3px_0_var(--page-accent,#FFA028)]" : "",
                )}
              >
                <p
                  className={cn(
                    mono,
                    "text-[11px] uppercase tracking-[0.14em]",
                    tier.badge ? "text-[var(--page-accent,#FFA028)]" : "text-[var(--page-muted,#8A8F9C)]",
                  )}
                >
                  {tier.name}
                  {tier.badge ? ` · ${tier.badge}` : ""}
                </p>
                <p className={cn(mono, "mt-2 text-[10px] text-[var(--page-muted,#8A8F9C)]/60")}>{tier.description}</p>
                <ul className="mt-3 space-y-1.5 text-[12.5px] leading-[1.7] text-[var(--page-muted,#8A8F9C)]">
                  {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className={cn(mono, "mt-6 text-[11px] leading-[1.8] text-[var(--page-muted,#8A8F9C)]/70")}>
            Add-ons: {service.addOns.join(" · ")}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function InstrumentBundleRows({ bundles }: { bundles: Bundle[] }) {
  return (
    <div className="divide-y divide-[var(--page-border,#17181D)] border border-[var(--page-border,#22242A)] bg-[var(--page-surface,#0C0D10)]">
      {bundles.map((bundle, index) => (
        <Reveal key={bundle.name} delay={index * 0.06}>
          <div className="grid items-center gap-6 px-8 py-8 transition-colors hover:bg-black/15 sm:grid-cols-[1.1fr_2fr_auto]">
            <div>
              <p className="text-[19px] font-semibold tracking-[-0.01em] text-[var(--page-highlight,#F2F6FF)]">{bundle.name}</p>
              <p className={cn(mono, "mt-1 text-[10.5px] uppercase tracking-[0.08em] text-[var(--page-muted,#8A8F9C)]/70")}>
                {bundle.positioning}
              </p>
            </div>
            <p className="text-[13px] leading-[1.7] text-[var(--page-muted,#8A8F9C)]">
              {bundle.included.join(" · ")}. {bundle.bestFor}
            </p>
            <span
              className={cn(
                mono,
                "shrink-0 justify-self-start border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] sm:justify-self-end",
                bundle.badge
                  ? "border-[var(--page-accent,#FFA028)] text-[var(--page-accent,#FFA028)]"
                  : "border-[var(--page-border,#22242A)] text-[var(--page-muted,#8A8F9C)]",
              )}
            >
              {bundle.badge ?? "Discovery call"}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function InstrumentTermsGrid({ terms }: { terms: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-px border border-[var(--page-border,#22242A)] bg-[var(--page-border,#22242A)] sm:grid-cols-3">
      {terms.map((term) => (
        <div key={term.title} className="bg-[var(--page-surface,#0C0D10)] p-7 transition-colors hover:bg-black/15">
          <h4 className={cn(mono, "text-[11px] uppercase tracking-[0.18em] text-[var(--page-accent,#FFA028)]")}>{term.title}</h4>
          <p className="mt-3 text-[13px] text-[var(--page-muted,#8A8F9C)]">{term.body}</p>
        </div>
      ))}
    </div>
  );
}

export function InstrumentCta({ n = "05" }: { n?: string }) {
  return (
    <section className="border-t border-[var(--page-border,#22242A)] px-6 py-24 sm:px-10">
      <Reveal>
        <InstrumentEyebrow n={n}>Ready to build your growth engine?</InstrumentEyebrow>
        <h2 className="mt-7 text-[clamp(40px,7vw,90px)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[var(--page-highlight,#F2F6FF)]">
          Let&apos;s scope it
          <br />
          <span className="text-transparent [-webkit-text-stroke:1px_var(--page-muted,#4A4E58)]">on a call.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-8">
        <a
          href={`mailto:${site.email}?subject=Scope%20a%20call`}
          className={cn(
            mono,
            "inline-block bg-[var(--page-accent,#FFA028)] px-9 py-4 text-[12px] font-medium uppercase tracking-[0.14em] text-[#060608] transition-transform hover:-translate-y-0.5",
          )}
        >
          Scope a call
        </a>
        <p className={cn(mono, "max-w-[340px] text-[11px] leading-[1.8] text-[var(--page-muted,#8A8F9C)]")}>
          One call. Your goals, our stack, a clear scope — pricing included, no obligation.
        </p>
      </Reveal>
    </section>
  );
}
