import { CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/cta";
import { HeroAmbient } from "@/components/hero-ambient";
import { AnimatedNumber, FloatingGrid, InteractiveCard, Reveal, StaggerText } from "@/components/motion";
import { ProcessTimeline } from "@/components/process";
import { ServiceCard } from "@/components/service-card";
import { ButtonLink, Card, Container, Eyebrow, Section } from "@/components/ui";
import { advantages, heroMetrics, homeCapabilities, services, site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <HeroAmbient />
        <FloatingGrid />
        <Container className="grid min-h-[calc(100svh-4rem)] gap-12 py-20 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <Reveal>
            <Eyebrow>Full-stack performance marketing / Sri Lanka</Eyebrow>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              <StaggerText text="Every service a modern brand needs to win attention, convert it, and scale." />
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Trillium Labs connects paid growth, creative, websites, social presence and AI automation under one accountable team, without the international agency price tag.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Start an inquiry</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore services
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid gap-4">
              <InteractiveCard>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  The full-stack model
                </p>
                <div className="mt-6 grid gap-4">
                  {homeCapabilities.map((capability) => {
                    const Icon = capability.icon;
                    return (
                      <div key={capability.label} className="flex gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-emerald-300/12 text-emerald-200">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h2 className="font-semibold text-white">{capability.label}</h2>
                          <p className="mt-1 text-sm leading-6 text-slate-400">{capability.body}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              </InteractiveCard>
              <div className="grid grid-cols-3 gap-3">
                {heroMetrics.map((metric) => (
                  <InteractiveCard key={metric.label}>
                    <div className="rounded-lg border border-white/10 bg-black/25 p-4">
                    <p className="text-3xl font-semibold text-white">
                      <AnimatedNumber value={metric.value} />
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{metric.label}</p>
                    </div>
                  </InteractiveCard>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              The work is not the problem. The gaps between owners are.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Ads, creative, landing pages and follow-up often sit with different people. Trillium Labs replaces scattered handoffs with one strategy, one point of contact and one accountable line from the ad to the result.
            </p>
          </div>
          <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">
            {["Split ownership", "Creative bottleneck", "Leaks after the click", "The agency premium"].map((item) => (
              <InteractiveCard key={item}>
                <Card>
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold text-white">{item}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Solved through connected ownership across strategy, production, conversion and reporting.
                  </p>
                </Card>
              </InteractiveCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white/[0.025]">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Services</Eyebrow>
              <h2 className="text-4xl font-semibold tracking-tight text-white">One team replaces five vendors.</h2>
            </div>
            <ButtonLink href="/services" variant="secondary">
              View all services
            </ButtonLink>
          </div>
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-10 max-w-3xl">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-tight text-white">Signal. System. Scale.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Every engagement starts by finding market signal, then building the machine, then compounding what is already proven.
            </p>
          </div>
          <ProcessTimeline compact />
        </Container>
      </Section>

      <Section className="bg-white/[0.025]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Eyebrow>The advantage</Eyebrow>
              <h2 className="text-4xl font-semibold tracking-tight text-white">
                International-standard capability. Local partner economics.
              </h2>
              <p className="mt-5 text-slate-400">{site.description}</p>
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
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
