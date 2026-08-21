"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui";
import { AnimatePresence, motion, motionTheme } from "@/components/motion";
import { getPaletteForPath, paletteStyle } from "@/components/page-theme";
import { cn } from "@/lib/utils";

const headerNavigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/method", label: "Method" },
  { href: "/growth-partnerships", label: "Partnerships" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const palette = getPaletteForPath(pathname);
  const themeStyle = palette ? paletteStyle(palette) : undefined;

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      style={themeStyle}
      className="sticky top-0 z-50 border-y border-white/[0.06] bg-[#050608]/95 font-[family-name:var(--page-font-sans,inherit)] backdrop-blur-xl transition-colors"
    >
      <Container className="flex min-h-[76px] max-w-none items-center gap-5 px-5 py-3 sm:px-6 lg:px-10">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="group min-w-0"
          aria-label="Trillium Labs home"
        >
          <span className="flex items-baseline gap-1.5 leading-none">
            <span className="text-[1.68rem] font-black tracking-normal text-white transition group-hover:text-[var(--page-highlight,#f8fafc)] sm:text-[1.8rem]">
              Trillium
            </span>
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.38em] text-slate-500">Labs</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-10 lg:flex">
          <nav className="flex items-center gap-10" aria-label="Main navigation">
            {headerNavigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "py-2 text-[0.9rem] font-medium uppercase tracking-[0.14em] text-slate-400 transition-colors duration-200 hover:text-white",
                    active ? "text-white" : "text-slate-400",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/contact"
            className="inline-flex h-[54px] w-[190px] items-center justify-center border border-white/15 bg-black/10 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:border-white/35 hover:bg-white hover:text-slate-950"
            aria-label="Scope a call with Trillium Labs"
          >
            Scope a call
          </Link>
        </div>

        <div className="ml-auto flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-slate-200 transition hover:border-white/35 hover:text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={motionTheme.transitions.ui}
            className="overflow-hidden border-t border-white/10 bg-[#050608] lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col px-5 py-3 sm:px-6">
              {[...headerNavigation, { href: "/contact", label: "Scope a call" }].map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "border-b border-white/10 px-1 py-4 text-sm font-medium uppercase tracking-[0.2em] transition hover:text-white",
                      active ? "text-[var(--page-secondary,#a7f3d0)]" : "text-slate-200",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
