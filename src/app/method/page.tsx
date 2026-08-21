import type { Metadata } from "next";
import { advantages } from "@/lib/content";
import { AnimatedFaq } from "@/components/animated-faq";
import { CtaBand } from "@/components/cta";
import { HeroAmbient } from "@/components/hero-ambient";
import { MethodOrbit } from "@/components/method-orbit";
import { FloatingGrid, InteractiveCard, Reveal, StaggerText } from "@/components/motion";
import { PagePalette, PageTheme, pagePalettes } from "@/components/page-theme";
import { ProcessTimeline } from "@/components/process";
import { Card, Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Method",
  description: "Trillium Labs works through a repeatable Signal, System, Scale method.",
};

const palette: PagePalette = pagePalettes.method;

export default function MethodPage() {
  return (
    <PageTheme palette={palette}>
      <section className="relative isolate overflow-hidden pb-10 pt-14 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20">
        <HeroAmbient />
        <FloatingGrid />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-center">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[var(--page-accent,#6ee7b7)]/25 bg-[var(--page-accent,#6ee7b7)]/[0.07] px-4 py-2 sm:mb-7">
                <span className="h-2 w-2 rounded-full bg-[var(--page-accent,#6ee7b7)] shadow-[0_0_22px_var(--page-accent,#6ee7b7)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--page-secondary,#a7f3d0)]">
                  How we work
                </span>
              </div>
              <h1 className="max-w-4xl text-[2.65rem] font-semibold leading-[0.98] tracking-tight text-[var(--page-highlight,#f8fafc)] sm:text-6xl lg:text-7xl">
                <StaggerText text="Signal first. System" />
                <span className="block">
                  <span className="text-[var(--page-accent,#6ee7b7)]">second.</span>{" "}
                  <span className="font-normal italic text-[var(--page-secondary,#a7f3d0)]">Scale when it&apos;s earned.</span>
                </span>
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                Every engagement starts at Signal, including for brands already running ads. Skipping it is how budget gets spent on angles the market was never going to reward.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="hidden lg:block">
              <MethodOrbit className="aspect-[4/3] w-full" />
            </Reveal>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <ProcessTimeline cardClassName="border-[var(--page-border,rgba(255,255,255,0.1))] bg-[var(--page-surface,rgba(255,255,255,0.035))]" />
        </Container>
      </Section>
      <Section className="bg-white/[0.025]">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>Why consolidate</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)]">
              The capability of an international agency. The economics of a local partner.
            </h2>
          </Reveal>
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Reveal key={advantage.title} delay={index * 0.08} className="h-full">
                  <InteractiveCard className="h-full">
                    <Card className="flex h-full flex-col border-[var(--page-border,rgba(255,255,255,0.1))] bg-[var(--page-surface,rgba(255,255,255,0.035))]">
                      <Icon className="h-5 w-5 text-[var(--page-accent,#6ee7b7)]" aria-hidden="true" />
                      <h3 className="mt-5 text-lg font-semibold text-[var(--page-highlight,#f8fafc)]">{advantage.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{advantage.body}</p>
                    </Card>
                  </InteractiveCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <AnimatedFaq />
          </Reveal>
        </Container>
      </Section>
      <CtaBand />
    </PageTheme>
  );
}
