import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta";
import { TierCard } from "@/components/service-card";
import { Badge, Card, Container, Eyebrow, Pill, Section } from "@/components/ui";
import { getService, serviceSlugs, services } from "@/lib/content";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.shortTitle,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      <Section className="bg-[linear-gradient(135deg,#050806,#0c1713)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <Eyebrow>{service.eyebrow} / {service.category}</Eyebrow>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{service.detail}</p>
            </div>
            <Card>
              <Icon className="h-8 w-8 text-emerald-300" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-semibold text-white">{service.summary}</h2>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {service.engagement}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Service tiers</Eyebrow>
              <h2 className="text-4xl font-semibold tracking-tight text-white">Choose the right operating level.</h2>
            </div>
            <Pill>Pricing scoped separately</Pill>
          </div>
          <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.tiers.map((tier) => (
              <TierCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white/[0.025]">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Outcomes</Eyebrow>
            <div className="grid gap-3">
              {service.outcomes.map((outcome) => (
                <Card key={outcome} className="py-4">
                  <p className="font-semibold text-white">{outcome}</p>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Add-ons</Eyebrow>
            <div className="flex flex-wrap gap-3">
              {service.addOns.map((addOn) => (
                <Badge key={addOn}>{addOn}</Badge>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>More services</Eyebrow>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {services
              .filter((item) => item.slug !== service.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm font-semibold text-slate-200 transition hover:border-emerald-300/50 hover:text-white"
                >
                  {item.shortTitle}
                </Link>
              ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
