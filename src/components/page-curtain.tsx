"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FlaskConical } from "lucide-react";
import { AnimatePresence, motion, motionTheme } from "@/components/motion";

export function PageCurtain() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("Loading");

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || targetAttr) {
        return;
      }

      const url = new URL(href, window.location.href);

      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      setLabel(anchor.textContent?.trim() || "Loading");
      setActive(true);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setActive(false), 520);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="page-curtain"
          className="fixed inset-0 z-[80] grid place-items-center overflow-hidden bg-[#050806]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={motionTheme.transitions.ui}
          aria-live="polite"
          aria-label="Page loading"
        >
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(110,231,183,0.16),transparent)]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
          <motion.div
            className="relative flex flex-col items-center gap-5 text-center"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            transition={motionTheme.transitions.gentle}
          >
            <span className="grid h-16 w-16 place-items-center rounded-lg bg-emerald-300 text-slate-950 shadow-2xl shadow-emerald-300/20">
              <FlaskConical className="h-8 w-8" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                Trillium Labs
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">{label}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
