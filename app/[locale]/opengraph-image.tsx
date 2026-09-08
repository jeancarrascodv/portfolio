import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.name;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const role = siteConfig.role[safeLocale];
  const available =
    safeLocale === "es"
      ? "Disponible para nuevas oportunidades"
      : "Available for new opportunities";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#1b3028",
          backgroundImage:
            "radial-gradient(600px 600px at 80% -10%, rgba(217,239,147,0.12), transparent 60%), radial-gradient(500px 500px at 0% 100%, rgba(189,207,138,0.08), transparent 55%)",
          color: "#f1f3e4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#1b3028",
              background: "linear-gradient(135deg, #d9ef93, #bdcf8a)",
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#b8c8ae" }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#d9ef93" }} />
            {available}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              backgroundImage: "linear-gradient(110deg, #d9ef93, #bdcf8a)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 34, color: "#f1f3e4", marginTop: 8 }}>{role}</div>
        </div>

        <div style={{ fontSize: 26, color: "#b8c8ae" }}>{siteConfig.url.replace("https://", "")}</div>
      </div>
    ),
    { ...size },
  );
}
