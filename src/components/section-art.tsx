import type { ComponentType, ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";

function ArtFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(160deg,rgba(20,36,28,0.55),rgba(5,8,6,0.85))]",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.14]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="art-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#6ee7b7" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#art-grid)" />
      </svg>
      {children}
    </div>
  );
}

const stroke = "#6ee7b7";
const strokeDim = "rgba(110,231,183,0.35)";
const faint = "rgba(255,255,255,0.12)";

export function DashboardArt(props: SVGProps<SVGSVGElement> & { className?: string }) {
  const { className, ...rest } = props;
  return (
    <ArtFrame className={className}>
      <svg viewBox="0 0 400 260" className="relative h-full w-full" {...rest}>
        <rect x="20" y="24" width="150" height="26" rx="6" fill="rgba(110,231,183,0.12)" />
        <text x="34" y="41" fontSize="12" fill={stroke} fontFamily="monospace">
          CAMPAIGN REACH
        </text>
        <g stroke={faint} strokeWidth="1">
          <line x1="30" y1="200" x2="380" y2="200" />
          <line x1="30" y1="70" x2="30" y2="200" />
        </g>
        <polyline
          points="30,170 80,150 130,160 180,110 230,120 280,70 330,85 380,50"
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          points="30,170 80,150 130,160 180,110 230,120 280,70 330,85 380,50 380,200 30,200"
          fill="rgba(110,231,183,0.08)"
        />
        {[
          [30, 170],
          [130, 160],
          [230, 120],
          [330, 85],
          [380, 50],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#050806" stroke={stroke} strokeWidth="2" />
        ))}
        <g fontFamily="monospace" fontSize="10" fill="rgba(148,163,184,0.9)">
          <rect x="260" y="24" width="120" height="30" rx="6" fill="rgba(255,255,255,0.04)" stroke={faint} />
          <text x="270" y="38" fill={stroke} fontWeight={700}>
            +186%
          </text>
          <text x="270" y="50">
            CTR vs last cycle
          </text>
        </g>
      </svg>
    </ArtFrame>
  );
}

export function BrowserArt(props: SVGProps<SVGSVGElement> & { className?: string }) {
  const { className, ...rest } = props;
  return (
    <ArtFrame className={className}>
      <svg viewBox="0 0 400 260" className="relative h-full w-full" {...rest}>
        <rect x="18" y="18" width="364" height="224" rx="10" fill="rgba(255,255,255,0.03)" stroke={faint} />
        <rect x="18" y="18" width="364" height="30" rx="10" fill="rgba(255,255,255,0.04)" />
        <circle cx="34" cy="33" r="4" fill="rgba(255,255,255,0.25)" />
        <circle cx="48" cy="33" r="4" fill="rgba(255,255,255,0.25)" />
        <circle cx="62" cy="33" r="4" fill="rgba(255,255,255,0.25)" />
        <rect x="90" y="27" width="180" height="12" rx="6" fill="rgba(255,255,255,0.06)" />
        <rect x="38" y="66" width="150" height="14" rx="3" fill="rgba(110,231,183,0.5)" />
        <rect x="38" y="88" width="220" height="8" rx="3" fill={faint} />
        <rect x="38" y="102" width="180" height="8" rx="3" fill={faint} />
        <rect x="38" y="122" width="70" height="24" rx="6" fill={stroke} />
        {[38, 148, 258].map((x) => (
          <g key={x}>
            <rect x={x} y="168" width="94" height="66" rx="6" fill="rgba(255,255,255,0.04)" stroke={faint} />
            <rect x={x + 10} y="178" width="40" height="6" rx="3" fill="rgba(110,231,183,0.45)" />
            <rect x={x + 10} y="192" width="74" height="6" rx="3" fill={faint} />
            <rect x={x + 10} y="204" width="60" height="6" rx="3" fill={faint} />
          </g>
        ))}
      </svg>
    </ArtFrame>
  );
}

export function ContentGridArt(props: SVGProps<SVGSVGElement> & { className?: string }) {
  const { className, ...rest } = props;
  const tiles = [
    { x: 20, y: 20, w: 110, h: 90, play: true },
    { x: 138, y: 20, w: 110, h: 60, play: false },
    { x: 256, y: 20, w: 124, h: 90, play: true },
    { x: 20, y: 118, w: 78, h: 60, play: false },
    { x: 106, y: 88, w: 142, h: 90, play: true },
    { x: 256, y: 118, w: 124, h: 60, play: false },
    { x: 20, y: 186, w: 220, h: 54, play: false },
    { x: 248, y: 186, w: 132, h: 54, play: true },
  ];
  return (
    <ArtFrame className={className}>
      <svg viewBox="0 0 400 260" className="relative h-full w-full" {...rest}>
        {tiles.map((tile, index) => (
          <g key={index}>
            <rect
              x={tile.x}
              y={tile.y}
              width={tile.w}
              height={tile.h}
              rx="8"
              fill={index % 3 === 0 ? "rgba(110,231,183,0.1)" : "rgba(255,255,255,0.035)"}
              stroke={faint}
            />
            {tile.play ? (
              <polygon
                points={`${tile.x + tile.w / 2 - 6},${tile.y + tile.h / 2 - 9} ${tile.x + tile.w / 2 - 6},${tile.y + tile.h / 2 + 9} ${tile.x + tile.w / 2 + 10},${tile.y + tile.h / 2}`}
                fill={stroke}
              />
            ) : (
              <rect
                x={tile.x + 10}
                y={tile.y + tile.h - 18}
                width={tile.w - 40}
                height="6"
                rx="3"
                fill="rgba(148,163,184,0.5)"
              />
            )}
          </g>
        ))}
      </svg>
    </ArtFrame>
  );
}

export function ChatArt(props: SVGProps<SVGSVGElement> & { className?: string }) {
  const { className, ...rest } = props;
  return (
    <ArtFrame className={className}>
      <svg viewBox="0 0 400 260" className="relative h-full w-full" {...rest}>
        <rect x="40" y="20" width="230" height="40" rx="20" fill="rgba(255,255,255,0.045)" stroke={faint} />
        <circle cx="62" cy="40" r="12" fill="rgba(110,231,183,0.3)" />
        <rect x="82" y="32" width="90" height="7" rx="3.5" fill="rgba(255,255,255,0.5)" />
        <rect x="82" y="44" width="150" height="6" rx="3" fill={faint} />

        <rect x="90" y="76" width="220" height="46" rx="18" fill="rgba(110,231,183,0.14)" stroke={strokeDim} />
        <rect x="108" y="90" width="184" height="7" rx="3.5" fill="rgba(255,255,255,0.55)" />
        <rect x="108" y="103" width="120" height="6" rx="3" fill="rgba(110,231,183,0.4)" />

        <rect x="40" y="138" width="190" height="46" rx="18" fill="rgba(255,255,255,0.045)" stroke={faint} />
        <rect x="58" y="152" width="150" height="7" rx="3.5" fill="rgba(255,255,255,0.5)" />
        <rect x="58" y="165" width="90" height="6" rx="3" fill={faint} />

        <g transform="translate(0,200)">
          <circle cx="60" cy="20" r="16" fill="rgba(255,255,255,0.04)" stroke={faint} />
          <path d="M53 20l5 5 9-11" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="120" cy="20" r="16" fill="rgba(255,255,255,0.04)" stroke={faint} />
          <path
            d="M112 22c2 4 5 6 8 6s6-2 8-6"
            fill="none"
            stroke="rgba(148,163,184,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="220" y="4" width="140" height="32" rx="16" fill="rgba(110,231,183,0.12)" stroke={strokeDim} />
          <text x="238" y="25" fontFamily="monospace" fontSize="12" fill={stroke}>
            +2.4k engagements
          </text>
        </g>
      </svg>
    </ArtFrame>
  );
}

export function FlowArt(props: SVGProps<SVGSVGElement> & { className?: string }) {
  const { className, ...rest } = props;
  const nodes = [
    { x: 46, y: 130, label: "Lead" },
    { x: 160, y: 60, label: "CRM" },
    { x: 160, y: 200, label: "AI check" },
    { x: 280, y: 130, label: "Notify" },
    { x: 366, y: 130, label: "Report" },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
  ];
  return (
    <ArtFrame className={className}>
      <svg viewBox="0 0 400 260" className="relative h-full w-full" {...rest}>
        <g stroke={strokeDim} strokeWidth="1.5">
          {edges.map(([a, b], index) => (
            <line
              key={index}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
            />
          ))}
        </g>
        {nodes.map((node, index) => (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy={node.y}
              r="26"
              fill={index === 0 || index === 4 ? "rgba(110,231,183,0.16)" : "rgba(255,255,255,0.04)"}
              stroke={index === 0 || index === 4 ? stroke : faint}
              strokeWidth="1.5"
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="10"
              fill="rgba(226,232,240,0.85)"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </ArtFrame>
  );
}

export function PulseArt(props: SVGProps<SVGSVGElement> & { className?: string }) {
  const { className, ...rest } = props;
  return (
    <ArtFrame className={className}>
      <svg viewBox="0 0 400 260" className="relative h-full w-full" {...rest}>
        <g transform="translate(200,130)">
          {[110, 78, 46].map((r) => (
            <circle key={r} r={r} fill="none" stroke={strokeDim} strokeWidth="1" />
          ))}
          <circle r="8" fill={stroke} />
          {[
            [96, -20],
            [-70, 40],
            [50, 78],
            [-96, -18],
          ].map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r="5" fill="rgba(110,231,183,0.7)" />
          ))}
          <line x1="0" y1="0" x2="96" y2="-20" stroke={strokeDim} strokeWidth="1" />
          <line x1="0" y1="0" x2="-70" y2="40" stroke={strokeDim} strokeWidth="1" />
          <line x1="0" y1="0" x2="50" y2="78" stroke={strokeDim} strokeWidth="1" />
          <line x1="0" y1="0" x2="-96" y2="-18" stroke={strokeDim} strokeWidth="1" />
        </g>
      </svg>
    </ArtFrame>
  );
}

const serviceArt: Record<string, ComponentType<SVGProps<SVGSVGElement> & { className?: string }>> = {
  "meta-ads": DashboardArt,
  "ai-content": ContentGridArt,
  websites: BrowserArt,
  "social-media": ChatArt,
  automation: FlowArt,
};

export function ServiceArt({ slug, className }: { slug: string; className?: string }) {
  const Art = serviceArt[slug] ?? PulseArt;
  return <Art className={className} />;
}
