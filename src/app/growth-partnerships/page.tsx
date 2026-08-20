import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { PagePalette, PageTheme, pagePalettes } from "@/components/page-theme";
import {
  InstrumentBundleRows,
  InstrumentCta,
  InstrumentSectionHead,
  InstrumentTermsGrid,
  InstrumentTicker,
} from "@/components/instrument";
import { Container, Section } from "@/components/ui";
import { bundles, terms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Growth Partnerships",
  description: "Bundled Trillium Labs service partnerships with one team, one strategy and one invoice.",
};

const palette: PagePalette = pagePalettes.partnerships;

const tickerItems = [
  ...bundles.map((bundle) => `${bundle.name} · ${bundle.positioning}`),
  "MODEL · ONE TEAM · ONE STRATEGY · ONE INVOICE",
  "PRICING · SCOPED PER CLIENT · BENCHMARKED TO THE 2026 SRI LANKAN MARKET",
];

export default function GrowthPartnershipsPage() {
  return (
    <PageTheme palette={palette}>
      <Section
        className="border-b border-[var(--page-border,#22242A)] pb-16"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 85% -10%, rgba(242,246,255,0.03), transparent 60%)",
        }}
      >
        <Container>
          <Reveal>
            <p className="flex items-center gap-3 font-[family-name:var(--page-font-mono,var(--font-mono))] text-[11px] uppercase tracking-[0.28em] text-[var(--page-muted,#8A8F9C)]">
              <span className="h-px w-8 bg-[var(--page-accent,#FFA028)]" aria-hidden="true" />
              Bundled growth partnerships
            </p>
            <h1 className="mt-7 max-w-4xl text-[clamp(40px,7vw,84px)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[var(--page-highlight,#F2F6FF)]">
              One monthly partnership for the full-stack advantage.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] font-light text-[var(--page-muted,#8A8F9C)]">
              One team, one strategy, one invoice — at a partner rate. Every bundle includes a dedicated point of
              contact, unified reporting and priority turnaround.
            </p>
          </Reveal>
        </Container>
      </Section>

      <InstrumentTicker items={tickerItems} />

      <Section>
        <Container>
          <InstrumentSectionHead
            n="01"
            label="Bundled growth partnerships"
            title="Everything is stronger together."
            note="One monthly partnership — one team, one strategy, one invoice. Every bundle includes a dedicated point of contact, unified reporting and priority turnaround."
          />
          <InstrumentBundleRows bundles={bundles} />
        </Container>
      </Section>

      <Section>
        <Container>
          <InstrumentSectionHead n="02" label="Terms & notes" title="No surprises. In writing." />
          <InstrumentTermsGrid terms={terms} />
        </Container>
      </Section>

      <InstrumentCta n="03" />
    </PageTheme>
  );
}
