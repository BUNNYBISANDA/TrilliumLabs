import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta";
import { InteractiveCard } from "@/components/motion";
import { PagePalette, PageTheme, pagePalettes } from "@/components/page-theme";
import { TierCard } from "@/components/service-card";
import { Badge, Card, Container, Eyebrow, Pill, Section } from "@/components/ui";
import { ServiceArt } from "@/components/section-art";
import { getService, serviceSlugs, services } from "@/lib/content";

const palette: PagePalette = pagePalettes.services;

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
    <PageTheme palette={palette}>
      <Section
        className="border-b border-white/10 pb-14 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20"
        style={{ backgroundImage: `linear-gradient(135deg, ${palette.bg}, ${palette.surface})` }}
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(340px,0.72fr)] lg:items-center lg:gap-12">
            <div className="max-w-4xl">
              <Link
                href="/services"
                className="mb-7 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-white"
              >
                Services
              </Link>
              <div className="mb-5 flex flex-wrap items-center gap-3 font-[family-name:var(--page-font-mono,var(--font-mono))] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--page-accent,#6ee7b7)]">
                <span>{service.eyebrow}</span>
                <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                <span className="text-slate-400">{service.category}</span>
              </div>
              <h1 className="max-w-4xl text-[clamp(2.9rem,6vw,5.8rem)] font-semibold leading-[0.96] tracking-tight text-[var(--page-highlight,#f8fafc)]">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{service.detail}</p>
            </div>
            <InteractiveCard>
              <Card className="p-5 sm:p-6">
                <ServiceArt slug={service.slug} className="aspect-[4/3] w-full" />
                <Icon className="mt-6 h-8 w-8 text-[var(--page-accent,#6ee7b7)]" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-semibold text-[var(--page-highlight,#f8fafc)]">{service.summary}</h2>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {service.engagement}
                </p>
              </Card>
            </InteractiveCard>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Service tiers</Eyebrow>
              <h2 className="text-4xl font-semibold tracking-tight text-[var(--page-highlight,#f8fafc)]">Choose the right operating level.</h2>
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
                <InteractiveCard key={outcome}>
                  <Card className="py-4">
                    <p className="font-semibold text-[var(--page-highlight,#f8fafc)]">{outcome}</p>
                  </Card>
                </InteractiveCard>
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
          <div className="grid auto-rows-fr gap-3 md:grid-cols-2 lg:grid-cols-4">
            {services
              .filter((item) => item.slug !== service.slug)
              .map((item) => (
                <InteractiveCard key={item.slug} className="h-full">
                  <Link
                    href={`/services/${item.slug}`}
                    className="flex h-full items-center rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm font-semibold text-slate-200 transition group-hover:border-[var(--page-accent,#6ee7b7)]/50 group-hover:text-[var(--page-highlight,#f8fafc)]"
                  >
                    {item.shortTitle}
                  </Link>
                </InteractiveCard>
              ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </PageTheme>
  );
}
