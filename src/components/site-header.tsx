"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, Mail, Menu, X } from "lucide-react";
import { navigation, site } from "@/lib/content";
import { Container } from "@/components/ui";
import { AnimatePresence, motion, motionTheme } from "@/components/motion";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050806]/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-5">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3"
          aria-label="Trillium Labs home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-md bg-emerald-300 text-slate-950">
            <FlaskConical className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-bold uppercase tracking-[0.22em] text-white">Trillium</span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-emerald-200">
              Labs
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition hover:bg-white/5 hover:text-white",
                  active ? "bg-emerald-300/10 text-emerald-200" : "text-slate-300",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${site.email}?subject=Trillium%20Labs%20project%20inquiry`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-slate-200 transition hover:border-emerald-300/70 hover:text-emerald-200 md:w-auto md:gap-2 md:px-4"
            aria-label="Email Trillium Labs"
            title="Email Trillium Labs"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span className="hidden text-sm font-semibold md:inline">Inquire</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-slate-200 transition hover:border-emerald-300/70 hover:text-emerald-200 md:hidden"
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
            className="overflow-hidden border-t border-white/10 bg-[#050806] md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col px-5 py-3 sm:px-6">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-2 py-3 text-base font-medium transition hover:bg-white/5 hover:text-white",
                      active ? "text-emerald-200" : "text-slate-200",
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
