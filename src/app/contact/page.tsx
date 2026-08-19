import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { InteractiveCard, Reveal } from "@/components/motion";
import { contactOptions } from "@/lib/content";
import { Card, Container, Eyebrow, Section } from "@/components/ui";
import { ChatArt } from "@/components/section-art";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start an email inquiry with Trillium Labs.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="bg-[linear-gradient(135deg,#050806,#0c1713)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-center">
            <div>
              <Eyebrow>Ready to build your growth engine?</Eyebrow>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Send the goal, current state and service line you want to explore.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Trillium Labs scopes pricing separately to your goals, benchmarked to the local market rather than international agency rates.
              </p>
            </div>
            <ChatArt className="hidden aspect-[4/3] w-full lg:block" />
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
                      <Card className="h-full transition hover:border-emerald-300/50 hover:bg-white/[0.055]">
                        <Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                        <h2 className="mt-5 text-xl font-semibold text-white">{option.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{option.body}</p>
                        <p className="mt-4 text-sm font-semibold text-emerald-200">{option.label}</p>
                      </Card>
                    </InteractiveCard>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Card>
            <h2 className="text-2xl font-semibold text-white">Email inquiry brief</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              This launch version uses an email-first form. Submitting opens your email app with the brief prefilled.
            </p>
            <ContactForm />
          </Card>
        </Container>
      </Section>
    </>
  );
}
