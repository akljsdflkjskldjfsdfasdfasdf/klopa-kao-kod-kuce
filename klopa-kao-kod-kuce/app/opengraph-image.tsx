import { ImageResponse } from "next/og";
import { config } from "@/lib/config";

// Auto-generisana slika za deljenje (WhatsApp / Viber / Instagram / Twitter).
// Da je zameniš svojom: obriši ovaj fajl i stavi public/og-image.jpg (1200x630),
// pa u app/layout.tsx dodaj openGraph.images: ["/og-image.jpg"].
export const alt = `${config.groom} & ${config.bride} — Pozivnica`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Napomena: koristimo tekst bez kvačica zbog podrazumevanog fonta u ImageResponse.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #6a1b2a 0%, #4e121e 60%, #2b0d15 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 1080,
            height: 500,
            border: "2px solid #c2a14d",
            borderRadius: 18,
            padding: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "#e3ca8e",
            }}
          >
            Sa radoscu vas pozivamo
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 26,
              marginBottom: 26,
              fontSize: 104,
              color: "#fbf6ec",
            }}
          >
            {config.groom}
            <span style={{ color: "#c2a14d", margin: "0 28px" }}>&</span>
            {config.bride}
          </div>

          <div style={{ display: "flex", width: 360, height: 2, background: "#c2a14d" }} />

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 36,
              color: "#e3ca8e",
              letterSpacing: 4,
            }}
          >
            19 · 09 · 2026 — Beograd
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
