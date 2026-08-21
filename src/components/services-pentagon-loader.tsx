"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GlossyIcon } from "@/components/glossy-icon";
import { servicePath, services } from "@/lib/content";
import { cn } from "@/lib/utils";

const tones = ["amber", "emerald", "sky", "amber", "emerald"] as const;

const ServicesPentagonScene = dynamic(() => import("@/components/services-pentagon"), {
  ssr: false,
  loading: () => null,
});

function detectWebgl(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function PentagonFallback() {
  const points = services.slice(0, 5).map((service, index) => {
    const angle = -Math.PI / 2 + (index * (Math.PI * 2)) / 5;
    return {
      ...service,
      left: 50 + Math.cos(angle) * 40,
      top: 50 + Math.sin(angle) * 40,
    };
  });
  const outline = points.map((p) => `${p.left}%,${p.top}%`).join(" ");

  return (
    <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[440px]" aria-hidden="false">
      <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
        <polygon points={outline} fill="none" stroke="var(--page-accent,#FFA028)" strokeWidth="1" />
      </svg>
      {points.map((point) => {
        const Icon = point.icon;
        return (
          <Link
            key={point.slug}
            href={servicePath(point.slug)}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${point.left}%`, top: `${point.top}%` }}
          >
            <GlossyIcon
              icon={Icon}
              tone={tones[services.findIndex((s) => s.slug === point.slug) % tones.length]}
              className="h-11 w-11 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {point.shortTitle}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function ServicesPentagonLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // One-time browser capability detection (WebGL support, reduced-motion preference).
    // Must run post-mount to avoid SSR/client markup mismatches — not a derivable render value.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWebglOk(detectWebgl());
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const canRender3d = webglOk === true && inView;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto aspect-square w-full min-w-[280px] max-w-[280px] sm:min-w-[360px] sm:max-w-[360px] lg:min-w-[440px] lg:max-w-[440px]",
      )}
    >
      <div className={cn("absolute inset-0 transition-opacity duration-500", canRender3d ? "opacity-0" : "opacity-100")}>
        <PentagonFallback />
      </div>
      {canRender3d ? (
        <div className="absolute inset-0">
          <ServicesPentagonScene reducedMotion={reducedMotion} />
        </div>
      ) : null}
    </div>
  );
}
