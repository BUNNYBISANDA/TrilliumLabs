import type { Metadata } from "next";
import { Check, Layers3, Sparkles, Workflow } from "lucide-react";
import { CtaBand } from "@/components/cta";
import { GlossyIcon } from "@/components/glossy-icon";
import { HeroAmbient } from "@/components/hero-ambient";
import { FloatingGrid, InteractiveCard, Reveal, StaggerText } from "@/components/motion";
import { PagePalette, PageTheme, pagePalettes } from "@/components/page-theme";
import { Badge, ButtonLink, Card, Container, Eyebrow, Section } from "@/components/ui";
import { bundles, terms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Growth Partnerships",
  description: "Bundled Trillium Labs service partnerships with one team, one strategy and one invoice.",
};

const palette: PagePalette = pagePalettes.partnerships;

const bundleIcons = [Layers3, Sparkles, Workflow];
const bundleTones = ["amber", "emerald", "sky"] as const;

const tickerItems = [
  ...bundles.map((bundle) => `${bundle.name} · ${bundle.positioning}`),
  "ONE TEAM · ONE STRATEGY · ONE INVOICE",
  "PRICING SCOPED PER CLIENT",
];

export default function GrowthPartnershipsPage() {
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
                Bundled growth partnerships
              </span>
            </div>

            <h1 className="max-w-4xl text-[2.65rem] font-semibold leading-[0.98] tracking-tight text-[var(--page-highlight,#f8fafc)] sm:text-6xl lg:text-7xl">
              <StaggerText text="One partnership." />
              <span className="block">
                <span className="text-[var(--page-accent,#6ee7b7)]">Full-stack</span>{" "}
                <span className="font-normal italic text-[var(--page-secondary,#a7f3d0)]">advantage.</span>
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
              One team, one strategy, one invoice, at a partner rate. Every bundle includes a dedicated point of contact, unified reporting and priority turnaround.
            </p>

            <div className="mt-6 flex flex-row gap-3 sm:mt-7">
              <ButtonLink href="/contact">Scope a call</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore services
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:justify-self-end">
            <div className="grid w-full max-w-2xl gap-2.5 sm:gap-4 lg:grid-cols-1">
              <p className="pl-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--page-accent,#6ee7b7)] lg:col-auto">
                The three bundles
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:gap-4">
                {bundles.map((bundle, index) => {
                  const Icon = bundleIcons[index % bundleIcons.length];
                  return (
                    <InteractiveCard key={bundle.name}>
                      <div className="flex min-h-16 items-center gap-4 rounded-[1.1rem] border border-white/10 bg-[linear-gradient(150deg,rgba(20,36,28,0.76),rgba(8,16,12,0.86))] p-4 backdrop-blur-xl transition duration-[220ms] ease-out group-hover:border-white/20 group-hover:bg-white/[0.05] sm:p-5">
                        <GlossyIcon icon={Icon} tone={bundleTones[index % bundleTones.length]} className="h-9 w-9 sm:h-11 sm:w-11" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm font-semibold text-[var(--page-highlight,#f8fafc)] sm:text-lg">{bundle.name}</h2>
                            {bundle.badge ? <Badge>{bundle.badge}</Badge> : null}
                          </div>
                          <p className="mt-1 hidden text-xs leading-5 text-slate-400 sm:block sm:text-sm">{bundle.positioning}</p>
                        </div>
                      </div>
                    </InteractiveCard>
                  );
                })}
              </div>
            </div>
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
          <Reveal className="max-w-3xl">
            <Eyebrow>Bundled growth partnerships</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)] sm:text-5xl">
              Everything is stronger together.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              One monthly partnership, one team, one strategy, one invoice. Every bundle includes a dedicated point of contact, unified reporting and priority turnaround.
            </p>
          </Reveal>
          <div className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-3">
            {bundles.map((bundle, index) => (
              <Reveal key={bundle.name} delay={index * 0.08} className="h-full">
                <InteractiveCard className="h-full" beam={bundle.badge ? "always" : "hover"}>
                  <Card className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold text-white">{bundle.name}</h3>
                      {bundle.badge ? <Badge>{bundle.badge}</Badge> : null}
                    </div>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--page-accent,#6ee7b7)]">
                      {bundle.positioning}
                    </p>
                    <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-6 text-slate-300">
                      {bundle.included.map((item) => (
                        <li key={item} className="flex gap-3">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--page-accent,#6ee7b7)]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm leading-6 text-slate-400">{bundle.bestFor}</p>
                  </Card>
                </InteractiveCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="terms" className="scroll-mt-28 bg-white/[0.025]">
        <Container>
          <Reveal className="mb-10 max-w-3xl">
            <Eyebrow>Terms & notes</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)]">No surprises. In writing.</h2>
          </Reveal>
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
            {terms.map((term, index) => (
              <Reveal key={term.title} delay={index * 0.06} className="h-full">
                <InteractiveCard className="h-full">
                  <Card className="h-full">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--page-accent,#6ee7b7)]">
                      {term.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{term.body}</p>
                  </Card>
                </InteractiveCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </PageTheme>
  );
}
