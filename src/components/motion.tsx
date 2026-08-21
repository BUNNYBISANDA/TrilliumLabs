"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "motion/react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getPaletteForPath } from "@/components/page-theme";
import { cn } from "@/lib/utils";

export const motionTheme = {
  transitions: {
    snap: { type: "spring", stiffness: 1218, damping: 70 },
    ui: { type: "spring", stiffness: 305, damping: 33 },
    gentle: { type: "spring", stiffness: 110, damping: 20 },
    reveal: { duration: 0.5, ease: "easeOut" },
    page: { duration: 0.24, ease: "easeOut" },
    lively: { type: "spring", stiffness: 622, damping: 17 },
    ambient: { type: "spring", stiffness: 43, damping: 13 },
  },
  stagger: { tight: 0.04, base: 0.08, relaxed: 0.15 },
  travel: { hover: 4, enter: 24, section: 48 },
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px", amount: 0.18 }}
      transition={{ ...motionTheme.transitions.reveal, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-label={text}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: motionTheme.stagger.tight } },
      }}
      className={cn("block", className)}
    >
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={motionTheme.transitions.gentle}
          className="mr-[0.24em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, motionTheme.transitions.ui);
  const pathname = usePathname();
  const palette = getPaletteForPath(pathname);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-0.5 origin-left bg-[var(--page-accent,#6ee7b7)]"
      style={{
        scaleX,
        width: "100%",
        ...(palette ? ({ "--page-accent": palette.accent } as CSSProperties) : {}),
      }}
      aria-hidden="true"
    />
  );
}

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, motionTheme.transitions.ui);
  const springY = useSpring(y, motionTheme.transitions.ui);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function InteractiveCard({
  children,
  className,
  beam = "hover",
}: {
  children: ReactNode;
  className?: string;
  beam?: "hover" | "always" | "none";
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      layout
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn(
        "group relative rounded-lg transition-[background-color,box-shadow] duration-[220ms] ease-out hover:bg-white/[0.015] hover:shadow-[0_14px_34px_rgba(0,0,0,0.24)]",
        className,
      )}
    >
      {beam !== "none" ? <BorderBeam persistent={beam === "always"} /> : null}
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}

export function BorderBeam({ persistent = false }: { persistent?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-lg border transition-colors duration-[220ms] ease-out",
        persistent
          ? "border-white/[0.14] group-hover:border-white/[0.24]"
          : "border-transparent group-hover:border-white/[0.18]",
      )}
    />
  );
}

export function FloatingGrid() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.28, 0.08]);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{
        y: reduceMotion ? 0 : y,
        opacity,
        backgroundImage:
          "linear-gradient(color-mix(in srgb, var(--page-accent, #6ee7b7) 18%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--page-accent, #6ee7b7) 18%, transparent) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "linear-gradient(to bottom, transparent, black 18%, black 65%, transparent)",
      }}
    />
  );
}

export function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const numeric = Number(value);
  const count = useMotionValue(Number.isFinite(numeric) ? numeric : 0);
  const spring = useSpring(count, motionTheme.transitions.gentle);
  const rounded = useTransform(spring, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (isInView && Number.isFinite(numeric)) {
      count.set(numeric);
    }
  }, [count, isInView, numeric]);

  return (
    <span ref={ref}>
      {Number.isFinite(numeric) ? <motion.span>{rounded}</motion.span> : value}
    </span>
  );
}

export { AnimatePresence, motion };
