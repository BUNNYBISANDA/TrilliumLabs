import { site } from "@/lib/content";
import { InteractiveCard } from "@/components/motion";
import { ButtonLink, Container } from "@/components/ui";

export function CtaBand() {
  return (
    <section className="border-y border-[var(--page-accent,#6ee7b7)]/20 bg-[var(--page-accent,#6ee7b7)] text-slate-950">
      <InteractiveCard>
        <Container className="grid gap-6 py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Ready to build your growth engine?</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Scope the service mix, launch path and first measurable signal.
            </h2>
          </div>
          <ButtonLink
            href={`mailto:${site.email}?subject=Trillium%20Labs%20project%20inquiry`}
            variant="secondary"
            className="border-slate-950/20 bg-slate-950 text-white hover:bg-slate-900"
          >
            Email Trillium Labs
          </ButtonLink>
        </Container>
      </InteractiveCard>
    </section>
  );
}
