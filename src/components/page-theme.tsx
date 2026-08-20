import type { CSSProperties, ReactNode } from "react";

export type PagePalette = {
  bg: string;
  surface: string;
  border: string;
  accent: string;
  secondary: string;
  highlight: string;
  /** Optional dimmer tone reserved for icon-only / non-text decoration where WCAG's 3:1 (not 4.5:1) threshold applies. Falls back to `secondary`. */
  muted?: string;
  /** Optional value for the `data-theme` attribute on the page's PageTheme wrapper. */
  dataTheme?: string;
  /** Optional page-scoped font overrides (CSS `var(--font-x)` references). Falls back to the site default (Inter / Geist Mono). */
  fontSans?: string;
  fontMono?: string;
};

// The single "Instrument" brand system (near-black canvas, Signal Amber accent,
// Poppins + IBM Plex Mono) — shared by every page so the whole site reads as one identity.
const instrument: PagePalette = {
  bg: "#060608",
  surface: "#0C0D10",
  border: "#22242A",
  accent: "#FFA028",
  secondary: "#FFC169",
  highlight: "#F2F6FF",
  muted: "#8A8F9C",
  dataTheme: "instrument",
  fontSans: "var(--font-poppins)",
  fontMono: "var(--font-plex-mono)",
};

export const pagePalettes = {
  home: instrument,
  services: instrument,
  partnerships: instrument,
  method: instrument,
  contact: instrument,
} satisfies Record<string, PagePalette>;

export function paletteStyle(palette: PagePalette): CSSProperties {
  return {
    "--page-bg": palette.bg,
    "--page-surface": palette.surface,
    "--page-border": palette.border,
    "--page-accent": palette.accent,
    "--page-secondary": palette.secondary,
    "--page-highlight": palette.highlight,
    "--page-muted": palette.muted ?? palette.secondary,
    "--page-font-sans": palette.fontSans ?? "inherit",
    "--page-font-mono": palette.fontMono ?? "var(--font-mono)",
  } as CSSProperties;
}

const routePalettes: Record<string, PagePalette> = {
  "/": pagePalettes.home,
  "/services": pagePalettes.services,
  "/growth-partnerships": pagePalettes.partnerships,
  "/method": pagePalettes.method,
  "/contact": pagePalettes.contact,
};

export function getPaletteForPath(pathname: string): PagePalette | undefined {
  return routePalettes[pathname];
}

export function PageTheme({
  palette,
  className,
  children,
}: {
  palette: PagePalette;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-theme={palette.dataTheme}
      style={paletteStyle(palette)}
      className={className ?? "bg-[var(--page-bg)] font-[family-name:var(--page-font-sans)]"}
    >
      {children}
    </div>
  );
}
