import type { Metadata } from "next";
import { CtaBand } from "@/components/cta";
import { ServiceCard } from "@/components/service-card";
import { Container, Eyebrow, Section } from "@/components/ui";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Trillium Labs services across paid growth, AI creative, websites, social media and automation.",
};

export default function ServicesPage() {
  return (
    <>
      <Section className="bg-[linear-gradient(135deg,#050806,#0c1713)]">
        <Container>
          <Eyebrow>Capabilities & services</Eyebrow>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Five connected service lines built to hand off to each other.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Use one service to solve a focused problem or bundle them into a full-stack growth partnership.
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
