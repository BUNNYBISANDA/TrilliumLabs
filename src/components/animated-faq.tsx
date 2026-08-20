"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion, motionTheme } from "@/components/motion";
import { faqs } from "@/lib/content";

export function AnimatedFaq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid gap-3">
      {faqs.map((faq, index) => {
        const isOpen = open === index;

        return (
          <motion.div
            layout
            key={faq.question}
            className="overflow-hidden rounded-lg border border-[var(--page-border,rgba(255,255,255,0.1))] bg-[var(--page-surface,rgba(255,255,255,0.035))]"
            transition={motionTheme.transitions.ui}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-[var(--page-highlight,#fff)]"
              aria-expanded={isOpen}
            >
              {faq.question}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[var(--page-accent,#6ee7b7)]/10 text-[var(--page-muted,var(--page-secondary,#a7f3d0))]">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                  animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                  exit={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                  transition={motionTheme.transitions.ui}
                >
                  <p className="px-5 pb-5 text-sm leading-6 text-slate-400">{faq.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
