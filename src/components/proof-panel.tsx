import { DashboardArt } from "@/components/section-art";
import { AnimatedNumber } from "@/components/motion";
import { cn } from "@/lib/utils";

type Tone = "emerald" | "amber" | "sky";

const dotTone: Record<Tone, string> = {
  emerald: "bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.7)]",
  amber: "bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.7)]",
  sky: "bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.7)]",
};

const metrics: { tone: Tone; label: string; value: string; suffix?: string }[] = [
  { tone: "emerald", label: "Leads delivered / month", value: "128" },
  { tone: "sky", label: "Response rate", value: "94", suffix: "%" },
  { tone: "amber", label: "Avg. time to first reply", value: "6", suffix: "m" },
];

export function ProofPanel() {
  return (
    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sample reporting view</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">One dashboard. Every result, in one place.</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Illustrative view of the weekly reporting cadence every engagement gets, swapped for your live numbers from week one.
        </p>
        <div className="mt-6 grid gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <span className={cn("h-2 w-2 rounded-full", dotTone[metric.tone])} aria-hidden="true" />
                <span className="text-sm text-slate-300">{metric.label}</span>
              </div>
              <span className="text-lg font-bold text-white">
                <AnimatedNumber value={metric.value} />
                {metric.suffix}
              </span>
            </div>
          ))}
        </div>
      </div>
      <DashboardArt className="aspect-[4/3] w-full" />
    </div>
  );
}
