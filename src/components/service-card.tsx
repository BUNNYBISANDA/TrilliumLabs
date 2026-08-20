import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/lib/content";
import { servicePath } from "@/lib/content";
import { InteractiveCard } from "@/components/motion";
import { Badge, Card } from "@/components/ui";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link href={servicePath(service.slug)} className="group block h-full">
      <InteractiveCard className="h-full">
        <Card className="flex h-full min-h-[31rem] flex-col transition duration-300 group-hover:border-[var(--page-accent,#6ee7b7)]/45 group-hover:bg-white/[0.055]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--page-accent,#6ee7b7)]/12 text-[var(--page-secondary,#a7f3d0)] transition group-hover:scale-110">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-[var(--page-secondary,#a7f3d0)]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{service.category}</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{service.shortTitle}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{service.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.outcomes.slice(0, 2).map((outcome) => (
              <span key={outcome} className="inline-flex items-center gap-1 text-xs text-slate-300">
                <Check className="h-3.5 w-3.5 text-[var(--page-accent,#6ee7b7)]" aria-hidden="true" />
                {outcome}
              </span>
            ))}
          </div>
        </Card>
      </InteractiveCard>
    </Link>
  );
}

export function TierCard({ tier }: { tier: Service["tiers"][number] }) {
  const recommended = Boolean(tier.badge);

  return (
    <InteractiveCard className="h-full" beam={recommended ? "always" : "hover"}>
      <Card className="flex h-full min-h-0 flex-col p-5">
        <div className="flex min-h-14 items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{tier.description}</p>
          </div>
          {tier.badge ? <Badge>{tier.badge}</Badge> : null}
        </div>
        <p className="mt-4 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-emerald-200">
          Pricing scoped on call
        </p>
        <ul className="mt-5 space-y-2.5 text-sm leading-6 text-slate-300">
          {tier.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Card>
    </InteractiveCard>
  );
}
