"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import { supabase } from "@/lib/supabase";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const pathname = usePathname();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const service = String(form.get("service") || "").trim();
    const brief = String(form.get("brief") || "").trim();

    setState("submitting");

    const { error } = await supabase.from("inquiries").insert({
      name,
      company: company || null,
      service: service || null,
      brief: brief || null,
      source_path: pathname,
    });

    setState(error ? "error" : "success");

    const body = [
      "Hi Trillium Labs,",
      "",
      "I would like to discuss a project.",
      "",
      `Name: ${name || "Not provided"}`,
      `Company: ${company || "Not provided"}`,
      `Service interest: ${service || "Not provided"}`,
      "",
      "Brief:",
      brief || "Not provided",
    ].join("\n");

    const subject = encodeURIComponent("Trillium Labs project inquiry");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Name
        <input
          name="name"
          required
          className="min-h-12 rounded-md border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--page-accent,#6ee7b7)]"
          placeholder="Your name"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Company
        <input
          name="company"
          className="min-h-12 rounded-md border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--page-accent,#6ee7b7)]"
          placeholder="Company or brand"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        What do you need?
        <select
          name="service"
          className="min-h-12 rounded-md border border-white/10 bg-black/30 px-4 text-white outline-none transition focus:border-[var(--page-accent,#6ee7b7)]"
          defaultValue="Bundled partnership"
        >
          <option>Bundled partnership</option>
          <option>Meta Ads</option>
          <option>AI Content Creation</option>
          <option>Websites & Landing Pages</option>
          <option>Social Media Management</option>
          <option>AI Workflow Automation</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Brief
        <textarea
          name="brief"
          rows={6}
          className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--page-accent,#6ee7b7)]"
          placeholder="Tell us your goal, current marketing setup and timeline."
        />
      </label>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="min-h-12 rounded-md bg-[var(--page-accent,#6ee7b7)] px-5 text-sm font-bold text-slate-950 transition hover:bg-[var(--page-secondary,#a7f3d0)] focus:outline-none focus:ring-2 focus:ring-[var(--page-accent,#6ee7b7)] focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? "Sending..." : "Send inquiry"}
      </button>
      {state === "success" ? (
        <p className="text-sm text-[var(--page-accent,#6ee7b7)]">
          Saved. Your email app should also be opening to send the brief directly.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="text-sm text-amber-300">
          We couldn&apos;t save the brief automatically, but your email app is opening so the inquiry still gets to us.
        </p>
      ) : null}
    </form>
  );
}
