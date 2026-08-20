"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const rings = [
  { size: "88%", tiltX: 68, tiltZ: -8, duration: 22, opacity: 0.85 },
  { size: "64%", tiltX: 58, tiltZ: 14, duration: 16, opacity: 0.55 },
  { size: "40%", tiltX: 72, tiltZ: -20, duration: 11, opacity: 0.35 },
];

const stageLabels = [
  { label: "Signal", start: -142, radius: "clamp(7rem, 14vw, 11rem)", duration: 18 },
  { label: "System", start: -4, radius: "clamp(8rem, 16vw, 12rem)", duration: 21 },
  { label: "Scale", start: 134, radius: "clamp(6.5rem, 13vw, 10rem)", duration: 24 },
];

export function MethodOrbit({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative overflow-visible",
        className,
      )}
      style={{
        perspective: "1000px",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-[-16%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--page-accent, #6ee7b7) 18%, transparent), transparent 58%)",
        }}
      />

      <div className="absolute inset-0 grid place-items-center" style={{ transformStyle: "preserve-3d" }}>
        {rings.map((ring, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border-2"
            style={{
              width: ring.size,
              aspectRatio: "1 / 1",
              borderColor: "var(--page-accent, #6ee7b7)",
              opacity: ring.opacity,
              transformStyle: "preserve-3d",
              rotateX: ring.tiltX,
              rotateZ: ring.tiltZ,
            }}
            animate={reduceMotion ? undefined : { rotateY: 360 }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
          >
            <motion.span
              className="absolute h-2.5 w-2.5 rounded-full"
              style={{
                top: "-2px",
                left: "50%",
                background: "var(--page-highlight, #a7f3d0)",
                boxShadow: "0 0 12px var(--page-highlight, #a7f3d0)",
              }}
            />
          </motion.div>
        ))}

        <motion.div
          className="relative h-4 w-4 rounded-full"
          style={{
            background: "var(--page-accent, #6ee7b7)",
            boxShadow: "0 0 36px var(--page-accent, #6ee7b7)",
          }}
          animate={reduceMotion ? undefined : { scale: [1, 1.2, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {stageLabels.map((stage) => (
        <motion.div
          key={stage.label}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotate: stage.start }}
          animate={reduceMotion ? undefined : { rotate: stage.start + 360 }}
          transition={{ duration: stage.duration, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) translateX(${stage.radius})`,
            }}
          >
            <motion.span
              className="block rounded-full border border-[var(--page-border,rgba(255,255,255,0.15))] bg-black/30 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--page-highlight,#f8fafc)] shadow-lg shadow-black/30 backdrop-blur-sm"
              initial={{ rotate: -stage.start }}
              animate={reduceMotion ? undefined : { rotate: -(stage.start + 360) }}
              transition={{ duration: stage.duration, repeat: Infinity, ease: "linear" }}
            >
              {stage.label}
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
