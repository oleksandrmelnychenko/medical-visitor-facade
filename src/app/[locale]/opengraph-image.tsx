import { ImageResponse } from "next/og";
import { getLocalizedMessage, normalizeLanguage } from "@/lib/seo";

export const runtime = "nodejs";

export const alt = "GMED Medical Concierge — Medical Concierge Service";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OpengraphImage({ params }: Props) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);

  const [titleDark, titleMuted, subHeadlineAccent] = await Promise.all([
    getLocalizedMessage(safeLocale, "home.hero.titleDark").catch(() => "GMED Medical Concierge"),
    getLocalizedMessage(safeLocale, "home.hero.titleMuted").catch(() => ""),
    getLocalizedMessage(safeLocale, "home.hero.subHeadlineAccent").catch(() => ""),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #eceef5 0%, #dce0ec 100%)",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "12px 22px",
            border: "1px solid rgba(19, 23, 33, 0.18)",
            borderRadius: "999px",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#0b0e14",
            background: "rgba(19, 23, 33, 0.06)",
          }}
        >
          GMED Medical Concierge
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 74,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.032em",
              color: "#131721",
              maxWidth: 960,
            }}
          >
            <span style={{ color: "#ff5a14" }}>{titleDark}</span>{" "}
            {titleMuted}
          </div>
          {subHeadlineAccent ? (
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                lineHeight: 1.3,
                color: "#4a5160",
                maxWidth: 960,
              }}
            >
              {subHeadlineAccent}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(19, 23, 33, 0.55)",
          }}
        >
          <span>Medical Concierge · Germany</span>
          <span>gmed-health.com</span>
        </div>

        <span
          style={{
            position: "absolute",
            right: 72,
            top: 72,
            width: 10,
            height: 10,
            borderRadius: "999px",
            background: "#ff5a14",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}

