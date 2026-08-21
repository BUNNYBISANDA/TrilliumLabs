import type { Metadata } from "next";
import { CtaBand } from "@/components/cta";
import { HeroAmbient } from "@/components/hero-ambient";
import { FloatingGrid, Reveal, StaggerText } from "@/components/motion";
import { PagePalette, PageTheme, pagePalettes } from "@/components/page-theme";
import { ServiceCard } from "@/components/service-card";
import { ServicesPentagonLoader } from "@/components/services-pentagon-loader";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Trillium Labs services across paid growth, AI creative, websites, social media and automation.",
};

const palette: PagePalette = pagePalettes.services;

const tickerItems = [
  ...services.map((service) => `${service.category} · ${service.shortTitle}`),
  "SIGNAL → SYSTEM → SCALE",
  "ONE TEAM · ONE STRATEGY · ONE INVOICE",
];

export default function ServicesPage() {
  return (
    <PageTheme palette={palette}>
      <section className="relative isolate overflow-hidden">
        <HeroAmbient />
        <FloatingGrid />
        <Container className="grid gap-6 pb-10 pt-14 sm:pb-14 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10 lg:pb-16 lg:pt-20">
          <Reveal className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[var(--page-accent,#6ee7b7)]/25 bg-[var(--page-accent,#6ee7b7)]/[0.07] px-4 py-2 sm:mb-7">
              <span className="h-2 w-2 rounded-full bg-[var(--page-accent,#6ee7b7)] shadow-[0_0_22px_var(--page-accent,#6ee7b7)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--page-secondary,#a7f3d0)]">
                All services under one roof
              </span>
            </div>

            <h1 className="max-w-4xl text-[2.65rem] font-semibold leading-[0.98] tracking-tight text-[var(--page-highlight,#f8fafc)] sm:text-6xl lg:text-7xl">
              <StaggerText text="Five service lines." />
              <span className="block">
                <span className="text-[var(--page-accent,#6ee7b7)]">One</span>{" "}
                <span className="font-normal italic text-[var(--page-secondary,#a7f3d0)]">connected machine.</span>
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
              Use one service to solve a focused problem, or bundle them into a full-stack growth partnership. Every engagement is scoped and priced on a call.
            </p>

            <div className="mt-6 flex flex-row gap-3 sm:mt-7">
              <ButtonLink href="/contact">Scope it</ButtonLink>
              <ButtonLink href="/growth-partnerships" variant="secondary">
                View partnerships
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ServicesPentagonLoader />
          </Reveal>
        </Container>

        <div className="relative z-10 border-t border-[var(--page-accent,#6ee7b7)]/10 bg-black/25 py-2 backdrop-blur-sm">
          <div className="flex w-max animate-[ticker_30s_linear_infinite]">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center gap-7 whitespace-nowrap px-7 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                <span>{item}</span>
                <span className="text-[var(--page-accent,#6ee7b7)]">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <Container>
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>The stack</Eyebrow>
              <h2 className="text-4xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)]">Every service, in depth.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                Select a service to open its scope, engagement model and tiers. Pricing is benchmarked to the local market and scoped separately to your goals.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-5">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.06} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </PageTheme>
  );
}
