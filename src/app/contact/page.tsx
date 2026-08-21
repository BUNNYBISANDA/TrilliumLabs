import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ContactFlowScene } from "@/components/contact-flow-scene";
import { HeroAmbient } from "@/components/hero-ambient";
import { FloatingGrid, InteractiveCard, Reveal, StaggerText } from "@/components/motion";
import { PagePalette, PageTheme, pagePalettes } from "@/components/page-theme";
import { contactOptions } from "@/lib/content";
import { Card, Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Scope a call with Trillium Labs.",
};

const palette: PagePalette = pagePalettes.contact;

export default function ContactPage() {
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
                  Ready to build your growth engine?
                </span>
              </div>
              <h1 className="max-w-4xl text-[2.65rem] font-semibold leading-[0.98] tracking-tight text-[var(--page-highlight,#f8fafc)] sm:text-6xl lg:text-7xl">
                <StaggerText text="Send the goal." />
                <span className="block">
                  <span className="text-[var(--page-accent,#6ee7b7)]">We&apos;ll</span>{" "}
                  <span className="font-normal italic text-[var(--page-secondary,#a7f3d0)]">scope the rest.</span>
                </span>
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                Trillium Labs scopes pricing separately to your goals, benchmarked to the local market rather than international agency rates.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="hidden lg:block">
              <div className="relative overflow-hidden bg-[radial-gradient(circle_at_73%_50%,var(--page-accent,#f1b7aa)_0%,transparent_36%)]">
                <ContactFlowScene className="relative z-10" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid auto-rows-fr gap-5">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Reveal key={option.title} delay={index * 0.08} className="h-full">
                  <Link href={option.href} className="group block">
                    <InteractiveCard className="h-full">
                      <Card className="h-full transition hover:border-[var(--page-accent,#6ee7b7)]/50 hover:bg-white/[0.055]">
                        <Icon className="h-5 w-5 text-[var(--page-accent,#6ee7b7)]" aria-hidden="true" />
                        <h2 className="mt-5 text-xl font-semibold text-white">{option.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{option.body}</p>
                        <p className="mt-4 text-sm font-semibold text-[var(--page-secondary,#a7f3d0)]">{option.label}</p>
                      </Card>
                    </InteractiveCard>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <Card>
              <h2 className="text-2xl font-semibold text-white">Scope a call brief</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Submitting saves your brief with our team and opens your email app with the details prefilled.
              </p>
              <ContactForm />
            </Card>
          </Reveal>
        </Container>
      </Section>
    </PageTheme>
  );
}
