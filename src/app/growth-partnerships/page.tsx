import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/cta";
import { InteractiveCard, Reveal } from "@/components/motion";
import { Badge, Card, Container, Eyebrow, Section } from "@/components/ui";
import { bundles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Growth Partnerships",
  description: "Bundled Trillium Labs service partnerships with one team, one strategy and one invoice.",
};

export default function GrowthPartnershipsPage() {
  return (
    <>
      <Section className="bg-[linear-gradient(135deg,#050806,#0c1713)]">
        <Container>
          <Eyebrow>Bundled growth partnerships</Eyebrow>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            One monthly partnership for the full-stack advantage.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Bundle services into one coordinated growth engine with a dedicated point of contact, unified reporting and priority turnaround.
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid auto-rows-fr gap-5 lg:grid-cols-3">
            {bundles.map((bundle, index) => (
              <Reveal key={bundle.name} delay={index * 0.08} className="h-full">
                <InteractiveCard className="h-full">
                  <Card className="flex h-full min-h-[28rem] flex-col">
                    <div className="flex min-h-16 items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-white">{bundle.name}</h2>
                        <p className="mt-2 text-slate-400">{bundle.positioning}</p>
                      </div>
                      {bundle.badge ? <Badge>{bundle.badge}</Badge> : null}
                    </div>
                    <ul className="mt-8 space-y-3">
                      {bundle.included.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-slate-300">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 border-t border-white/10 pt-5 text-sm leading-6 text-slate-400">
                      <span className="font-semibold text-white">Best for: </span>
                      {bundle.bestFor}
                    </p>
                  </Card>
                </InteractiveCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
