import { CheckCircle2 } from "lucide-react";
import { InteractiveCard, Reveal } from "@/components/motion";
import { processSteps } from "@/lib/content";
import { Card, Eyebrow } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ProcessTimeline({
  compact = false,
  cardClassName,
}: {
  compact?: boolean;
  cardClassName?: string;
}) {
  return (
    <div className="grid auto-rows-fr gap-5 lg:grid-cols-3">
      {processSteps.map((step, index) => (
        <Reveal key={step.name} delay={index * 0.08} className="h-full">
          <InteractiveCard className="h-full">
            <Card className={cn("relative flex h-full min-h-[18rem] flex-col overflow-hidden", cardClassName)}>
              <div className="absolute right-5 top-5 text-6xl font-black text-white/[0.035]">
                0{index + 1}
              </div>
              <Eyebrow>{step.stage}</Eyebrow>
              <h3 className="text-2xl font-semibold text-[var(--page-highlight,#fff)]">{step.name}</h3>
              <p className="mt-4 flex-1 text-sm leading-6 text-slate-400">{step.summary}</p>
              {!compact ? (
                <ul className="mt-6 space-y-2">
                  {step.outputs.map((output) => (
                    <li key={output} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-[var(--page-accent,#6ee7b7)]" aria-hidden="true" />
                      {output}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Card>
          </InteractiveCard>
        </Reveal>
      ))}
    </div>
  );
}
