"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const motionTheme = {
  transitions: {
    snap: { type: "spring", stiffness: 1218, damping: 70 },
    ui: { type: "spring", stiffness: 305, damping: 33 },
    gentle: { type: "spring", stiffness: 110, damping: 20 },
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
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...motionTheme.transitions.gentle, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <motion.span
      aria-label={text}
      initial={false}
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

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-0.5 origin-left bg-emerald-300"
      style={{ scaleX, width: "100%" }}
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(110, 231, 183, 0.16), transparent 44%)`;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      layout
      onMouseMove={handleMove}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={motionTheme.transitions.ui}
      className={cn("group relative overflow-hidden rounded-lg", className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {beam !== "none" ? <BorderBeam persistent={beam === "always"} /> : null}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export function BorderBeam({ persistent = false }: { persistent?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-lg",
        persistent ? "opacity-100" : "opacity-0 group-hover:opacity-100",
      )}
      style={{
        background:
          "conic-gradient(from 0deg, transparent, transparent, rgba(110,231,183,0.8), transparent, transparent)",
        padding: 1,
        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
      }}
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
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
          "linear-gradient(rgba(110,231,183,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.18) 1px, transparent 1px)",
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
