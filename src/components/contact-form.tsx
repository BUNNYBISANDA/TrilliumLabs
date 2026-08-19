"use client";

import type { FormEvent } from "react";
import { site } from "@/lib/content";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const service = String(form.get("service") || "").trim();
    const brief = String(form.get("brief") || "").trim();

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
          className="min-h-12 rounded-md border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300"
          placeholder="Your name"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Company
        <input
          name="company"
          className="min-h-12 rounded-md border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300"
          placeholder="Company or brand"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        What do you need?
        <select
          name="service"
          className="min-h-12 rounded-md border border-white/10 bg-black/30 px-4 text-white outline-none transition focus:border-emerald-300"
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
          className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300"
          placeholder="Tell us your goal, current marketing setup and timeline."
        />
      </label>
      <button
        type="submit"
        className="min-h-12 rounded-md bg-emerald-300 px-5 text-sm font-bold text-slate-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-black"
      >
        Open email inquiry
      </button>
    </form>
  );
}
