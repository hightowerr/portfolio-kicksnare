import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Kicksnare — Websites and digital products that grow revenue";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a1a14",
          color: "#f5f1eb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#ff5e00",
            marginBottom: 32,
          }}
        >
          Kicksnare
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 32,
          }}
        >
          Websites and digital products that grow revenue
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            lineHeight: 1.5,
            color: "#c0bdb8",
          }}
        >
          Product design + growth engineering. Done in six weeks.
        </div>
      </div>
    ),
    { ...size }
  );
}
