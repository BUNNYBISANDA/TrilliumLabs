import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "emerald" | "amber" | "sky";

const toneStyles: Record<Tone, { glow: string; ring: string; surface: string; icon: string }> = {
  emerald: {
    glow: "bg-emerald-300/35",
    ring: "border-emerald-300/25",
    surface: "from-emerald-300/25 via-emerald-300/5 to-transparent",
    icon: "text-emerald-200",
  },
  amber: {
    glow: "bg-amber-300/35",
    ring: "border-amber-300/25",
    surface: "from-amber-300/25 via-amber-300/5 to-transparent",
    icon: "text-amber-200",
  },
  sky: {
    glow: "bg-sky-300/35",
    ring: "border-sky-300/25",
    surface: "from-sky-300/25 via-sky-300/5 to-transparent",
    icon: "text-sky-200",
  },
};

export function GlossyIcon({
  icon: Icon,
  tone = "emerald",
  className,
}: {
  icon: LucideIcon;
  tone?: Tone;
  className?: string;
}) {
  const styles = toneStyles[tone];

  return (
    <span className={cn("relative grid shrink-0 place-items-center", className)}>
      <span aria-hidden="true" className={cn("absolute inset-0 rounded-xl blur-md", styles.glow)} />
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-xl border bg-gradient-to-b shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-6px_10px_rgba(0,0,0,0.45)]",
          styles.ring,
          styles.surface,
        )}
      />
      <Icon className={cn("relative h-1/2 w-1/2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]", styles.icon)} aria-hidden="true" />
    </span>
  );
}
