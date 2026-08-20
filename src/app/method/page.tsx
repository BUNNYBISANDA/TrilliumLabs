import type { Metadata } from "next";
import { advantages } from "@/lib/content";
import { AnimatedFaq } from "@/components/animated-faq";
import { CtaBand } from "@/components/cta";
import { MethodOrbit } from "@/components/method-orbit";
import { InteractiveCard, Reveal } from "@/components/motion";
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
      <Section style={{ backgroundImage: `linear-gradient(135deg, ${palette.bg}, ${palette.surface})` }}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-center">
            <Reveal>
              <Eyebrow>How we work</Eyebrow>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)] sm:text-6xl">
                Signal first. System second. Scale only when the market has answered.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Every engagement starts at Signal, including for brands already running ads. Skipping it is how budget gets spent on angles the market was never going to reward.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="hidden lg:block">
              <MethodOrbit className="aspect-[4/3] w-full" />
            </Reveal>
          </div>
        </Container>
      </Section>
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
                    <Card className="border-[var(--page-border,rgba(255,255,255,0.1))] bg-[var(--page-surface,rgba(255,255,255,0.035))]">
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
