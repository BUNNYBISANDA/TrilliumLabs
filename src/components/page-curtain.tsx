"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, motionTheme } from "@/components/motion";
import { getPaletteForPath, paletteStyle } from "@/components/page-theme";
import { useReducedMotion } from "motion/react";

export function PageCurtain() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const palette = getPaletteForPath(pathname);
  const themeStyle = palette ? paletteStyle(palette) : undefined;

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

      setActive(true);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setActive(false), reduceMotion ? 60 : 280);
    return () => window.clearTimeout(timeout);
  }, [pathname, reduceMotion]);

  return (
    <AnimatePresence initial={false}>
      {active ? (
        <motion.div
          key="page-curtain"
          style={themeStyle}
          className="fixed inset-0 z-[80] bg-[#050608]"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 0.92 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={motionTheme.transitions.page}
          aria-live="polite"
          aria-label="Page loading"
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-[var(--page-accent,#6ee7b7)]/45"
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            aria-hidden="true"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
