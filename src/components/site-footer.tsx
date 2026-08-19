"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { AnimatePresence, InteractiveCard, motion, motionTheme } from "@/components/motion";
import { Container } from "@/components/ui";
import { currentYear, navigation, services, site } from "@/lib/content";

const wordmark = "TRILLIUM LABS";

export function SiteFooter() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const body = [
      "Hi Trillium Labs,",
      "",
      "I would like to start a project inquiry.",
      email ? `Reply email: ${email}` : "Reply email: Not provided",
    ].join("\n");

    setStatus("sent");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "Trillium Labs project inquiry",
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050806]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"
        initial={false}
        whileInView={{ scaleX: [0.2, 1], opacity: [0.2, 1] }}
        viewport={{ once: true }}
        transition={motionTheme.transitions.gentle}
      />

      <Container className="py-14">
        <LightWordmark text={wordmark} />

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.75fr_0.75fr_1fr]">
          <div>
            <p className="text-lg font-semibold text-white">{site.name}</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{site.description}</p>
            <a
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200"
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
                <span className="grid h-10 w-10 place-items-center rounded-md bg-emerald-300/10 text-emerald-200">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Quick inquiry</p>
                  <p className="text-xs text-slate-500">Open a prefilled email</p>
                </div>
              </div>
              <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
                <input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="min-h-11 rounded-md border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300"
                />
                <button
                  type="submit"
                  className="relative min-h-11 overflow-hidden rounded-md bg-emerald-300 px-4 text-sm font-bold text-slate-950 transition hover:bg-emerald-200"
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
                        "Start inquiry"
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
    </footer>
  );
}

function LightWordmark({ text }: { text: string }) {
  return (
    <motion.div
      aria-label={text}
      className="mb-12 flex max-w-full flex-nowrap overflow-hidden whitespace-nowrap text-[clamp(2.7rem,10.5vw,9rem)] font-black leading-none tracking-normal"
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
                      "rgba(110,231,183,0.95)",
                      "rgba(255,255,255,0.075)",
                    ],
                    textShadow: [
                      "0 0 0 rgba(110,231,183,0)",
                      "0 0 34px rgba(110,231,183,0.85)",
                      "0 0 0 rgba(110,231,183,0)",
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
            <span className="h-px w-0 bg-emerald-300 transition-all group-hover:w-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
