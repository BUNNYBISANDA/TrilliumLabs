import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/cta";
import { GlossyIcon } from "@/components/glossy-icon";
import { HeroAmbient } from "@/components/hero-ambient";
import { AnimatedNumber, FloatingGrid, InteractiveCard, Reveal, StaggerText } from "@/components/motion";
import { PagePalette, PageTheme, pagePalettes } from "@/components/page-theme";
import { ProcessTimeline } from "@/components/process";
import { ProofPanel } from "@/components/proof-panel";
import { ServicesPentagonLoader } from "@/components/services-pentagon-loader";
import { ButtonLink, Card, Container, Eyebrow, Section } from "@/components/ui";
import { advantages, heroMetrics, homeCapabilities, site } from "@/lib/content";

const capabilityTones = ["amber", "emerald", "sky"] as const;

const palette: PagePalette = pagePalettes.home;

const heroTicker = [
  "PAID GROWTH",
  "CREATIVE & VIDEO",
  "WEBSITES",
  "SOCIAL PRESENCE",
  "AI AUTOMATION",
  "REPORTING",
];

export default function Home() {
  return (
    <PageTheme palette={palette}>
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
        <HeroAmbient />
        <FloatingGrid />
        <Container className="grid flex-1 gap-6 py-6 sm:py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10 lg:py-12">
          <Reveal className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[var(--page-accent,#6ee7b7)]/25 bg-[var(--page-accent,#6ee7b7)]/[0.07] px-4 py-2 sm:mb-7">
              <span className="h-2 w-2 rounded-full bg-[var(--page-accent,#6ee7b7)] shadow-[0_0_22px_var(--page-accent,#6ee7b7)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--page-secondary,#a7f3d0)]">
                Full-stack performance marketing / Sri Lanka
              </span>
            </div>

            <h1 className="max-w-5xl text-[2.65rem] font-semibold leading-[0.98] tracking-tight text-[var(--page-highlight,#f8fafc)] sm:text-6xl lg:text-7xl">
              <StaggerText text="Win attention." />
              <StaggerText text="Convert it." />
              <span className="block">
                <span className="text-[var(--page-accent,#6ee7b7)]">Then scale</span>{" "}
                <span className="font-normal italic text-[var(--page-secondary,#a7f3d0)]">everything.</span>
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
              Paid growth, creative, websites, social presence and AI automation, one accountable team, without the international agency price tag.
            </p>

            <div className="mt-6 flex flex-row gap-3 sm:mt-7">
              <ButtonLink href="/contact">Scope it</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore services
              </ButtonLink>
            </div>

            <div className="mt-7 grid grid-cols-3 border-l border-[var(--page-accent,#6ee7b7)]/15 sm:mt-9">
              {heroMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="min-w-0 border-r border-[var(--page-accent,#6ee7b7)]/15 px-3 py-2 sm:px-6 sm:first:pl-5"
                >
                  <p className="text-3xl font-bold text-[var(--page-highlight,#f8fafc)] sm:text-3xl">
                    <AnimatedNumber value={metric.value} />
                  </p>
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.16em]">{metric.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:justify-self-end">
            <div className="grid w-full max-w-2xl gap-2.5 sm:gap-4 lg:grid-cols-1">
              <p className="pl-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--page-accent,#6ee7b7)] lg:col-auto">
                The full-stack model
              </p>
              <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-4">
              {homeCapabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <InteractiveCard key={capability.label} className="h-full">
                    <div className="flex h-full min-h-20 flex-col items-center justify-center gap-2 rounded-[1.1rem] border border-white/10 bg-[linear-gradient(150deg,rgba(20,36,28,0.76),rgba(8,16,12,0.86))] p-3 text-center backdrop-blur-xl transition duration-[220ms] ease-out group-hover:border-white/20 group-hover:bg-white/[0.05] sm:gap-5 sm:p-5 lg:min-h-0 lg:flex-row lg:items-start lg:justify-start lg:p-6 lg:text-left">
                      <span className="text-[0.65rem] font-semibold text-[var(--page-accent,#6ee7b7)] sm:text-sm lg:pt-1">0{index + 1}</span>
                      <GlossyIcon icon={Icon} tone={capabilityTones[index]} className="h-9 w-9 sm:h-11 sm:w-11" />
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xs font-semibold text-[var(--page-highlight,#f8fafc)] sm:text-xl">{capability.label}</h2>
                        <p className="mt-1 hidden text-xs leading-5 text-slate-400 sm:mt-2 sm:block sm:text-sm sm:leading-6">
                          {capability.body}
                        </p>
                      </div>
                      <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-[var(--page-accent,#6ee7b7)]/40 transition group-hover:text-[var(--page-secondary,#a7f3d0)] lg:mt-1 lg:block" />
                    </div>
                  </InteractiveCard>
                );
              })}
              </div>
            </div>
          </Reveal>
        </Container>

        <div className="relative z-10 border-t border-[var(--page-accent,#6ee7b7)]/10 bg-black/25 py-2 backdrop-blur-sm">
          <div className="flex w-max animate-[ticker_26s_linear_infinite]">
            {[...heroTicker, ...heroTicker, ...heroTicker, ...heroTicker].map((item, index) => (
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
            <Eyebrow>The problem</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)] sm:text-5xl">
              The work is not the problem. The gaps between owners are.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Ads, creative, landing pages and follow-up often sit with different people. Trillium Labs replaces scattered handoffs with one strategy, one point of contact and one accountable line from the ad to the result.
            </p>
          </Reveal>
          <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">
            {["Split ownership", "Creative bottleneck", "Leaks after the click", "The agency premium"].map((item, index) => (
              <Reveal key={item} delay={index * 0.08} className="h-full">
                <InteractiveCard className="h-full">
                  <Card className="flex h-full flex-col">
                    <CheckCircle2 className="h-5 w-5 text-[var(--page-accent,#6ee7b7)]" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-semibold text-[var(--page-highlight,#f8fafc)]">{item}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Solved through connected ownership across strategy, production, conversion and reporting.
                    </p>
                  </Card>
                </InteractiveCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white/[0.025]">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
            <Reveal>
              <Eyebrow>Services</Eyebrow>
              <h2 className="text-4xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)] sm:text-5xl">
                One team replaces five vendors.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                Five connected service lines orbiting one strategy. Hover a point to preview a service, click to open its full scope and tiers.
              </p>
              <div className="mt-8">
                <ButtonLink href="/services" variant="secondary">
                  View all services
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <ServicesPentagonLoader />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="mb-10 max-w-3xl">
            <Eyebrow>Reporting</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)]">You always know what&apos;s working.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              No dashboards to chase or monthly PDF exports. A live view of what&apos;s converting, updated every week.
            </p>
          </Reveal>
          <Reveal>
            <InteractiveCard>
              <Card className="p-0">
                <ProofPanel />
              </Card>
            </InteractiveCard>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="mb-10 max-w-3xl">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)]">Signal. System. Scale.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Every engagement starts by finding market signal, then building the machine, then compounding what is already proven.
            </p>
          </Reveal>
          <ProcessTimeline compact />
        </Container>
      </Section>

      <Section className="bg-white/[0.025]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <Eyebrow>The advantage</Eyebrow>
              <h2 className="text-4xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)]">
                International-standard capability. Local partner economics.
              </h2>
              <p className="mt-5 text-slate-400">{site.description}</p>
            </Reveal>
            <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <Reveal key={advantage.title} delay={index * 0.08} className="h-full">
                    <InteractiveCard className="h-full">
                      <Card className="flex h-full flex-col">
                        <Icon className="h-5 w-5 text-[var(--page-accent,#6ee7b7)]" aria-hidden="true" />
                        <h3 className="mt-5 text-lg font-semibold text-[var(--page-highlight,#f8fafc)]">{advantage.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{advantage.body}</p>
                      </Card>
                    </InteractiveCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </PageTheme>
  );
}
