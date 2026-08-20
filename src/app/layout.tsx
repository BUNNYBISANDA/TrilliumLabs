import type { Metadata } from "next";
import { Geist_Mono, IBM_Plex_Mono, Inter, Poppins } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollProgress } from "@/components/motion";
import { PageCurtain } from "@/components/page-curtain";
import { site } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Used only on pages that opt into the "Instrument" brand system (Services, Partnerships).
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Full-Stack Performance Marketing`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Trillium Labs",
    "Sri Lanka performance marketing",
    "Meta ads",
    "AI content creation",
    "landing pages",
    "workflow automation",
  ],
  openGraph: {
    title: `${site.name} | Full-Stack Performance Marketing`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Full-Stack Performance Marketing`,
    description: site.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${geistMono.variable} ${poppins.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050806] text-slate-100">
        <ScrollProgress />
        <PageCurtain />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
