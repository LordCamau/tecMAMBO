import { ImageResponse } from "next/og";
import { brandGradients } from "@/lib/brand-gradients";
import { siteUrl } from "@/lib/formats";

export const runtime = "edge";
export const alt = "tecMAMBO - Made to be understood.";
export const size = {
  width: 1200,
  height: 630
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
          alignItems: "stretch",
          backgroundColor: brandGradients.fallback,
          backgroundImage: brandGradients.aurora,
          color: "#FFFFFF",
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        <div
          style={{
            width: 760,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
            background: brandGradients.ogScrim
          }}
        >
          <img
            src={`${siteUrl}/brand/tecMAMBO-wp.svg`}
            alt=""
            width="300"
            height="77"
            style={{ objectFit: "contain" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                width: 84,
                height: 6,
                borderRadius: 999,
                background: "#FF8A00"
              }}
            />
            <h1
              style={{
                margin: 0,
                fontSize: 76,
                lineHeight: 0.95,
                letterSpacing: 0,
                fontWeight: 700
              }}
            >
              Made to be understood.
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: 560,
                fontSize: 28,
                lineHeight: 1.25,
                color: "rgba(255, 255, 255, 0.88)"
              }}
            >
              Plain-English technology journalism with depth when you want it.
            </p>
          </div>
        </div>
      </div>
    ),
    size
  );
}
