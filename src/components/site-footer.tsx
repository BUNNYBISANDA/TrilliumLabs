"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { AnimatePresence, InteractiveCard, motion, motionTheme } from "@/components/motion";
import { Container } from "@/components/ui";
import { getPaletteForPath, paletteStyle } from "@/components/page-theme";
import { currentYear, navigation, services, site } from "@/lib/content";
import { hexToRgb } from "@/lib/utils";

const wordmark = "TRILLIUM LABS";

export function SiteFooter() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const pathname = usePathname();
  const palette = getPaletteForPath(pathname);
  const themeStyle = palette ? paletteStyle(palette) : undefined;
  const glowColor = hexToRgb(palette?.accent ?? "#6ee7b7");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const body = [
      "Hi Trillium Labs,",
      "",
      "I would like to scope a call.",
      email ? `Reply email: ${email}` : "Reply email: Not provided",
    ].join("\n");

    setStatus("sent");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "Trillium Labs scope a call",
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <footer
      style={themeStyle}
      className="relative overflow-hidden border-t border-white/10 bg-[var(--page-bg,#050806)] font-[family-name:var(--page-font-sans,inherit)] transition-colors"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--page-accent,#6ee7b7)]/70 to-transparent"
        initial={false}
        whileInView={{ scaleX: [0.2, 1], opacity: [0.2, 1] }}
        viewport={{ once: true }}
        transition={motionTheme.transitions.gentle}
      />

      <LightWordmark text={wordmark} glowColor={glowColor} />

      <div className="relative z-10">
        <Container className="py-14">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.75fr_0.75fr_1fr]">
            <div>
              <p className="text-lg font-semibold text-white">{site.name}</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{site.description}</p>
              <a
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--page-secondary,#a7f3d0)]"
                href={`mailto:${site.email}`}
              >
                {site.email}
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <FooterLinks title="Explore" links={navigation} />
            <FooterLinks
              title="Services"
              links={services.slice(0, 5).map((service) => ({
                href: `/services/${service.slug}`,
                label: service.shortTitle,
              }))}
            />

            <InteractiveCard beam="hover">
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--page-accent,#6ee7b7)]/10 text-[var(--page-secondary,#a7f3d0)]">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Scope a call</p>
                    <p className="text-xs text-slate-500">Open a prefilled email</p>
                  </div>
                </div>
                <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className="min-h-11 rounded-md border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--page-accent,#6ee7b7)]"
                  />
                  <button
                    type="submit"
                    className="relative min-h-11 overflow-hidden rounded-md bg-[var(--page-accent,#6ee7b7)] px-4 text-sm font-bold text-slate-950 transition hover:bg-[var(--page-secondary,#a7f3d0)]"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={status}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={motionTheme.transitions.ui}
                        className="inline-flex items-center justify-center gap-2"
                      >
                        {status === "sent" ? (
                          <>
                            <Check className="h-4 w-4" />
                            Email ready
                          </>
                        ) : (
                          "Scope it"
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </form>
              </div>
            </InteractiveCard>
          </div>
        </Container>

        <Container className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {currentYear} Trillium Labs. All services under one roof.</p>
          <p>Performance marketing / Creative / Web / Automation</p>
        </Container>
      </div>
    </footer>
  );
}

function LightWordmark({ text, glowColor }: { text: string; glowColor: [number, number, number] }) {
  const [r, g, b] = glowColor;

  return (
    <motion.div
      aria-label={text}
      className="pointer-events-none absolute left-1/2 top-10 z-0 flex max-w-full -translate-x-1/2 select-none flex-nowrap overflow-hidden whitespace-nowrap text-[clamp(2.5rem,10vw,9rem)] font-black leading-none tracking-normal sm:top-14"
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.045 } },
      }}
    >
      {text.split("").map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${letter}-${index}`}
          className={letter === " " ? "inline-block w-[0.28em] shrink-0" : "relative inline-block shrink-0 text-white/[0.055]"}
          variants={{
            visible:
              letter === " "
                ? {}
                : {
                    color: [
                      "rgba(255,255,255,0.055)",
                      `rgba(${r},${g},${b},0.95)`,
                      "rgba(255,255,255,0.075)",
                    ],
                    textShadow: [
                      `0 0 0 rgba(${r},${g},${b},0)`,
                      `0 0 34px rgba(${r},${g},${b},0.85)`,
                      `0 0 0 rgba(${r},${g},${b},0)`,
                    ],
                  },
          }}
          transition={{
            duration: 1.1,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 5,
            delay: index * 0.045,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{title}</p>
      <div className="mt-4 grid gap-3">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group inline-flex w-fit items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <span className="h-px w-0 bg-[var(--page-accent,#6ee7b7)] transition-all group-hover:w-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
