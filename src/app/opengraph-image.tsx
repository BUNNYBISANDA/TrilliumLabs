import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} | Full-Stack Performance Marketing`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 20%, rgba(52,211,153,0.28), transparent 45%), linear-gradient(135deg, #050806 0%, #07110d 48%, #0d1715 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#6ee7b7",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#ffffff",
              }}
            >
              Trillium
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "#6ee7b7",
              }}
            >
              Labs
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: -1,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          Every service a modern brand needs to win attention, convert it, and scale.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 26,
            color: "#94a3b8",
          }}
        >
          Full-stack performance marketing from Sri Lanka
        </div>
      </div>
    ),
    { ...size },
  );
}
