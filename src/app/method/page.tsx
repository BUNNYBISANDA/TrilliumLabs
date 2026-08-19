import type { Metadata } from "next";
import { advantages } from "@/lib/content";
import { AnimatedFaq } from "@/components/animated-faq";
import { CtaBand } from "@/components/cta";
import { InteractiveCard } from "@/components/motion";
import { ProcessTimeline } from "@/components/process";
import { Card, Container, Eyebrow, Section } from "@/components/ui";
import { PulseArt } from "@/components/section-art";

export const metadata: Metadata = {
  title: "Method",
  description: "Trillium Labs works through a repeatable Signal, System, Scale method.",
};

export default function MethodPage() {
  return (
    <>
      <Section className="bg-[linear-gradient(135deg,#050806,#0c1713)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-center">
            <div>
              <Eyebrow>How we work</Eyebrow>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Signal first. System second. Scale only when the market has answered.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Every engagement starts at Signal, including for brands already running ads. Skipping it is how budget gets spent on angles the market was never going to reward.
              </p>
            </div>
            <PulseArt className="hidden aspect-[4/3] w-full lg:block" />
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <ProcessTimeline />
        </Container>
      </Section>
      <Section className="bg-white/[0.025]">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Why consolidate</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              The capability of an international agency. The economics of a local partner.
            </h2>
          </div>
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
            {advantages.map((advantage) => {
              const Icon = advantage.icon;
              return (
                <InteractiveCard key={advantage.title}>
                  <Card>
                    <Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-semibold text-white">{advantage.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{advantage.body}</p>
                  </Card>
                </InteractiveCard>
              );
            })}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Eyebrow>FAQ</Eyebrow>
          <AnimatedFaq />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
