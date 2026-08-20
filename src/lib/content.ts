import {
  ArrowUpRight,
  BadgeDollarSign,
  Bot,
  BrainCircuit,
  Clapperboard,
  Globe2,
  Layers3,
  LineChart,
  Mail,
  Megaphone,
  Orbit,
  Share2,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const site = {
  name: "Trillium Labs",
  email: "admin.trillium@gmail.com",
  url: "https://trilliumlabs.com",
  tagline: "Full-stack performance marketing from Sri Lanka.",
  description:
    "Every service a modern brand needs to win attention, convert it, and scale under one roof, without the international agency premium.",
};

export const currentYear = new Date().getFullYear();

export type Tier = {
  name: string;
  description: string;
  badge?: string;
  features: string[];
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  eyebrow: string;
  summary: string;
  detail: string;
  icon: LucideIcon;
  engagement: string;
  tiers: Tier[];
  addOns: string[];
  outcomes: string[];
};

export type Bundle = {
  name: string;
  badge?: string;
  positioning: string;
  included: string[];
  bestFor: string;
};

export type ProcessStep = {
  name: string;
  stage: string;
  summary: string;
  outputs: string[];
};

export const services: Service[] = [
  {
    slug: "meta-ads",
    title: "Meta Advertisements & Campaign Management",
    shortTitle: "Meta Ads",
    category: "Paid Growth",
    eyebrow: "Service 01",
    icon: Target,
    engagement: "Monthly retainer. Ad spend paid separately to Meta.",
    summary:
      "Qualified leads and sales from Facebook and Instagram, built and optimised by a performance team.",
    detail:
      "Campaign architecture, audience research, pixel and event setup, creative testing, retargeting and reporting stay connected to the same commercial goal.",
    tiers: [
      {
        name: "Launch",
        description: "Starting paid ads, done right.",
        features: [
          "Two campaign objectives and up to four ad sets",
          "Audience research and targeting setup",
          "Monthly build and optimisation",
          "Pixel, events setup and monthly performance report",
        ],
      },
      {
        name: "Growth",
        badge: "Most popular",
        description: "Scaling leads with testing.",
        features: [
          "Up to five campaigns with multiple ad sets",
          "A/B creative and audience testing",
          "Retargeting and lead-generation funnels",
          "Weekly optimisation with bi-weekly reporting",
        ],
      },
      {
        name: "Scale",
        description: "Full-funnel at volume.",
        features: [
          "Full-funnel, multi-campaign strategy",
          "Advanced audiences and lookalikes",
          "Conversion-rate optimisation",
          "Dedicated strategist, weekly call and priority testing library",
        ],
      },
      {
        name: "Add-ons",
        description: "Campaign support extras.",
        features: [
          "Ad creative production",
          "Landing page build",
          "One-off campaign launch",
          "Scoped separately to the campaign goal",
        ],
      },
    ],
    addOns: ["Ad creative production", "Landing page build", "One-off campaign launch"],
    outcomes: ["Clear acquisition strategy", "Better-tested creative", "Lead and sales reporting"],
  },
  {
    slug: "ai-content",
    title: "AI Content Creation",
    shortTitle: "AI Content",
    category: "Creative & Video",
    eyebrow: "Service 02",
    icon: Sparkles,
    engagement: "Monthly content engine. One-time packs available.",
    summary:
      "A steady stream of premium, on-brand, scroll-stopping creative produced at AI speed.",
    detail:
      "Human creative direction keeps the brand sharp while AI-assisted production increases the number of angles, variations and formats that can be tested.",
    tiers: [
      {
        name: "Launch",
        description: "The content starter.",
        features: [
          "Five static creatives per month",
          "One concept direction",
          "One revision round per asset",
          "Ad-ready and post-ready formats",
        ],
      },
      {
        name: "Growth",
        badge: "Most popular",
        description: "Content plus motion.",
        features: [
          "Fifteen creatives per month",
          "Up to three short motion or video edits",
          "Two concept directions",
          "Ad-ready test variations and two revision rounds",
        ],
      },
      {
        name: "Scale",
        description: "Always-on creative engine.",
        features: [
          "Twenty-five creatives per month",
          "Six motion or video pieces",
          "Multiple concept directions",
          "Full ad-creative testing library with priority turnaround",
        ],
      },
      {
        name: "Creative Packs",
        description: "One-time production batches.",
        features: [
          "Content Sprint with ten static creatives",
          "Brand Creative Kit with reusable templates",
          "Reel edits, long-form edits and extra units",
          "Fully AI-generated video available",
        ],
      },
    ],
    addOns: ["Content sprint", "Brand creative kit", "Static design", "Reel edits", "AI-generated video"],
    outcomes: ["More angles tested", "Faster asset cycles", "Consistent premium presence"],
  },
  {
    slug: "websites",
    title: "Websites & Landing Page Designs",
    shortTitle: "Websites",
    category: "Conversion",
    eyebrow: "Service 03",
    icon: Globe2,
    engagement: "One-time project. Optional monthly care plan.",
    summary:
      "Conversion-focused sites and landing pages engineered to capture the traffic your campaigns send.",
    detail:
      "The page, copy, analytics and lead capture are built as one conversion path so campaign insight can improve the site quickly.",
    tiers: [
      {
        name: "Essential",
        description: "Landing page.",
        features: [
          "Single high-converting, mobile-responsive page",
          "Lead-capture form and analytics",
          "Conversion copy support",
          "Delivery target of five to seven working days",
        ],
      },
      {
        name: "Starter",
        description: "Single-page business site.",
        features: [
          "Single page with custom UI/UX",
          "On-page SEO foundations and lead capture",
          "Speed and analytics setup",
          "Delivery target of one to four weeks",
        ],
      },
      {
        name: "Professional",
        badge: "Most popular",
        description: "Multi-page business site.",
        features: [
          "Up to six pages with custom UI/UX",
          "Self-edit CMS option",
          "On-page SEO, lead capture and speed optimisation",
          "Thirty days post-launch support",
        ],
      },
      {
        name: "Bespoke",
        description: "Custom build.",
        features: [
          "Ten or more pages or advanced features",
          "E-commerce, booking, API or CRM integrations",
          "Custom design system",
          "Scoping workshop and staged delivery",
        ],
      },
    ],
    addOns: ["Care and hosting", "Long-form copywriting", "E-commerce module", "Multilingual support"],
    outcomes: ["Campaign-ready pages", "Measured conversion path", "Fast and responsive launch"],
  },
  {
    slug: "social-media",
    title: "Social Media Page Management",
    shortTitle: "Social Media",
    category: "Presence",
    eyebrow: "Service 04",
    icon: Share2,
    engagement: "Monthly retainer. Content included. Ad spend separate.",
    summary:
      "An always-on, premium social presence planned, posted, grown and engaged daily.",
    detail:
      "Content calendars, publishing, engagement and reporting keep your brand visible while the paid and creative teams learn from what the audience responds to.",
    tiers: [
      {
        name: "Launch",
        description: "Presence, established.",
        features: [
          "Facebook and Instagram management",
          "Five static posts and two short videos per month",
          "Captions, hashtags and profile setup",
          "Basic community management and monthly report",
        ],
      },
      {
        name: "Growth",
        badge: "Most popular",
        description: "Consistent growth.",
        features: [
          "Two to three platforms",
          "Fifteen static posts and five short videos per month",
          "Content calendar and stories",
          "Active engagement, DM handling and monthly strategy review",
        ],
      },
      {
        name: "Scale",
        description: "Full social department.",
        features: [
          "Three to four platforms",
          "Twenty-five posts per month including video",
          "Full community management",
          "Influencer or UGC coordination and bi-weekly reporting",
        ],
      },
      {
        name: "Add-ons",
        description: "Extend the monthly presence.",
        features: [
          "Extra posts",
          "Additional platforms",
          "Paid ad management",
          "Scoped around campaign or growth goals",
        ],
      },
    ],
    addOns: ["Extra posts", "Additional platforms", "Paid ad management"],
    outcomes: ["Consistent posting rhythm", "Stronger engagement", "Unified organic and paid insight"],
  },
  {
    slug: "automation",
    title: "Internal Workflow Automations with AI",
    shortTitle: "AI Automation",
    category: "Automation",
    eyebrow: "Service 05",
    icon: Bot,
    engagement: "One-time build. Optional monthly retainer.",
    summary:
      "Repetitive work across lead handling, content pipelines, reporting and internal ops running accurately around the clock.",
    detail:
      "Trillium connects the tools your team already uses, adds AI where it saves real time, and documents the system so the workflow keeps working after handover.",
    tiers: [
      {
        name: "Essential",
        description: "Single automation.",
        features: [
          "One workflow fully automated",
          "Example: lead to CRM to WhatsApp or email",
          "Setup, testing and handover",
          "Documentation included",
        ],
      },
      {
        name: "Professional",
        badge: "Most popular",
        description: "Automation suite.",
        features: [
          "Three to four connected workflows",
          "Lead, content and reporting flows",
          "AI integration built in",
          "Documentation and team training",
        ],
      },
      {
        name: "Bespoke",
        description: "Custom AI system.",
        features: [
          "Multi-channel automation",
          "Custom AI agents or chatbot",
          "Complex tool integrations",
          "Discovery workshop and phased build",
        ],
      },
      {
        name: "Care",
        description: "Ongoing automation support.",
        features: [
          "Automation monitoring and maintenance",
          "Optimisation, support and minor changes",
          "New workflows each month",
          "Priority AI Ops Partner support",
        ],
      },
    ],
    addOns: ["Automation Care", "AI Ops Partner", "New monthly workflows", "Priority support"],
    outcomes: ["Faster lead response", "Lower manual admin", "Documented AI-enabled workflows"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    stage: "Stage 01",
    name: "Signal",
    summary:
      "Audit, positioning and proof of demand. Find what the market already responds to before spending on volume.",
    outputs: ["Audience map", "Offer positioning", "Creative angles", "Measurement plan"],
  },
  {
    stage: "Stage 02",
    name: "System",
    summary:
      "Build the machine: campaign architecture, creative library, conversion path and tracking as one connected asset.",
    outputs: ["Live campaigns", "Landing pages", "Creative testing matrix", "Reporting rhythm"],
  },
  {
    stage: "Stage 03",
    name: "Scale",
    summary:
      "Compound the proven work through weekly optimisation, structured testing and automation.",
    outputs: ["Expanded audiences", "Refreshed creative cycles", "Automated ops", "Performance readouts"],
  },
];

export const bundles: Bundle[] = [
  {
    name: "Growth Partner",
    positioning: "One coordinated growth engine.",
    included: ["Meta Ads - Growth", "AI Content - Growth", "Social Management - Launch"],
    bestFor: "Brands ready to connect paid acquisition, creative output and organic presence under one owner.",
  },
  {
    name: "Scale Partner",
    badge: "Most popular",
    positioning: "Your outsourced growth department.",
    included: ["Meta Ads - Scale", "AI Content - Scale", "Social Management - Growth", "Automation Care"],
    bestFor: "Teams that need weekly momentum, priority turnaround and unified reporting across the growth stack.",
  },
  {
    name: "Bespoke Partner",
    positioning: "Built around your goals.",
    included: ["Any combination of services", "Scoped to goals and budget", "Discovery call", "Tailored delivery model"],
    bestFor: "Companies with a specific launch, funnel, automation or market expansion goal.",
  },
];

export const terms = [
  {
    title: "Currency & tax",
    body: "All prices are quoted in LKR, exclusive of any applicable taxes.",
  },
  {
    title: "Ad spend & third-party costs",
    body: "Meta ad budget, hosting, domains, AI tool licences and paid stock are not included, billed at cost or paid directly by the client.",
  },
  {
    title: "Retainers",
    body: "Billed monthly, with a recommended minimum three-month commitment so optimisation can compound.",
  },
  {
    title: "Projects",
    body: "Billed 50% on confirmation, 50% on delivery. Larger builds can be staged.",
  },
  {
    title: "Revisions",
    body: "Rounds beyond those stated, and work outside the agreed scope, are quoted separately.",
  },
  {
    title: "Pricing",
    body: "Market-benchmarked and scoped per client, adjusted for size, sector and competition. Full pricing shared on the call.",
  },
];

export const advantages = [
  {
    title: "No agency layers",
    body: "You work directly with the people producing the work, without an account-management tier billed back to you.",
    icon: Layers3,
  },
  {
    title: "No international overhead",
    body: "Global-standard strategy and creative run from Sri Lanka, without offshore rates or currency premiums built into every hour.",
    icon: BadgeDollarSign,
  },
  {
    title: "AI-accelerated production",
    body: "More creative tested per rupee, with human direction and brand judgement kept in the loop.",
    icon: BrainCircuit,
  },
  {
    title: "Built to compound",
    body: "Retainers carry optimisation forward so every month builds on the last instead of restarting.",
    icon: LineChart,
  },
];

export const faqs = [
  {
    question: "If it costs less, what is missing?",
    answer:
      "Layers, not capability. Trillium removes overhead from account-management layers, offshore rates and subcontracted margins.",
  },
  {
    question: "Why use AI-assisted creative?",
    answer:
      "It lets the team test more angles per rupee while direction, taste and brand judgement stay human throughout.",
  },
  {
    question: "How fast do results come?",
    answer:
      "The deck sets the expectation as signal in weeks, with compounding from month three rather than instant promises.",
  },
  {
    question: "How do engagements work?",
    answer:
      "Clients can use a monthly retainer, bundled partnership or one-time project. Pricing is scoped separately to goals.",
  },
];

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/growth-partnerships", label: "Partnerships" },
  { href: "/method", label: "Method" },
  { href: "/contact", label: "Contact" },
];

export const heroMetrics = [
  { value: "5", label: "service lines" },
  { value: "3", label: "ways to engage" },
  { value: "1", label: "accountable team" },
];

export const homeCapabilities = [
  { label: "Attention", body: "Meta advertising and social media page management.", icon: Megaphone },
  { label: "Conversion", body: "Ad creative, video, landing pages and websites.", icon: Clapperboard },
  { label: "Leverage", body: "Workflow automation, AI systems, reporting and content engines.", icon: Workflow },
];

export const contactOptions = [
  {
    title: "Email the team",
    body: "Send a brief and Trillium Labs can scope the right service or partnership.",
    href: `mailto:${site.email}?subject=Trillium%20Labs%20project%20inquiry`,
    label: site.email,
    icon: Mail,
  },
  {
    title: "Need one service?",
    body: "Start with ads, creative, web, social or automation and add the rest when the signal is clear.",
    href: "/services",
    label: "View services",
    icon: ArrowUpRight,
  },
  {
    title: "Need the whole engine?",
    body: "Bundle services into one team, one strategy, one invoice and one reporting rhythm.",
    href: "/growth-partnerships",
    label: "View bundles",
    icon: Orbit,
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function servicePath(slug: string) {
  return `/services/${slug}`;
}

export const serviceSlugs = services.map((service) => service.slug);
