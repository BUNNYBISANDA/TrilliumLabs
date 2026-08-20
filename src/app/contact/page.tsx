import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ContactFlowScene } from "@/components/contact-flow-scene";
import { InteractiveCard, Reveal } from "@/components/motion";
import { PagePalette, PageTheme, pagePalettes } from "@/components/page-theme";
import { contactOptions } from "@/lib/content";
import { Card, Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start an email inquiry with Trillium Labs.",
};

const palette: PagePalette = pagePalettes.contact;

export default function ContactPage() {
  return (
    <PageTheme palette={palette}>
      <Section style={{ backgroundImage: `linear-gradient(135deg, ${palette.bg}, ${palette.surface})` }}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-center">
            <Reveal>
              <Eyebrow>Ready to build your growth engine?</Eyebrow>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Send the goal, current state and service line you want to explore.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
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
      </Section>

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
              <h2 className="text-2xl font-semibold text-white">Email inquiry brief</h2>
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
