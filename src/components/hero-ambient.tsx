"use client";

import { motion, useReducedMotion } from "motion/react";

export function HeroAmbient() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#050806_0%,#07110d_48%,#0d1715_100%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute h-[30rem] w-[30rem] rounded-full bg-emerald-300/18 blur-3xl"
        initial={{ x: "-12%", y: "-12%", scale: 0.92 }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-12%", "34%", "18%", "-8%", "-12%"],
                y: ["-12%", "2%", "28%", "10%", "-12%"],
                scale: [0.92, 1.06, 0.88, 1],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute h-[20rem] w-[20rem] rounded-full bg-teal-300/10 blur-3xl"
        initial={{ right: "8%", top: "16%" }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -80, 40, 0],
                y: [0, 80, -40, 0],
                scale: [1, 0.86, 1.08, 1],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050806] to-transparent" />
    </div>
  );
}
