import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { PagePalette, PageTheme, pagePalettes } from "@/components/page-theme";
import { InstrumentCta, InstrumentSectionHead, InstrumentTicker, ServiceExplorer } from "@/components/instrument";
import { Container, Section } from "@/components/ui";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Trillium Labs services across paid growth, AI creative, websites, social media and automation.",
};

const palette: PagePalette = pagePalettes.services;

const tickerItems = [
  ...services.map((service) => `${service.eyebrow.replace("Service ", "")} · ${service.title}`),
  "METHOD · SIGNAL → SYSTEM → SCALE",
  "MODEL · ONE TEAM · ONE STRATEGY · ONE INVOICE",
];

export default function ServicesPage() {
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
              Performance marketing · All services under one roof
            </p>
            <h1 className="mt-7 max-w-4xl text-[clamp(40px,7vw,84px)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[var(--page-highlight,#F2F6FF)]">
              Five connected service lines built to hand off to each other.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] font-light text-[var(--page-muted,#8A8F9C)]">
              Use one service to solve a focused problem, or bundle them into a full-stack growth partnership. Every
              engagement is scoped and priced on a call.
            </p>
          </Reveal>
        </Container>
      </Section>

      <InstrumentTicker items={tickerItems} />

      <Section>
        <Container>
          <InstrumentSectionHead
            n="01"
            label="The stack"
            title="Five services. One machine."
            note="Select a service to open its scope and tiers. Every engagement is scoped and priced on a call — per client size, sector and competition."
          />
          <ServiceExplorer services={services.map(({ icon: _icon, ...rest }) => rest)} />
        </Container>
      </Section>

      <InstrumentCta n="02" />
    </PageTheme>
  );
}
