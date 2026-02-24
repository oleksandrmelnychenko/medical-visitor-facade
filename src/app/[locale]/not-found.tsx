"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import pageStyles from "@/styles/page.module.scss";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main
      className={pageStyles.page}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 1.5rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(4rem, 10vw, 8rem)",
          fontWeight: 300,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--foreground)",
          marginBottom: "1rem",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
          fontWeight: 500,
          color: "var(--foreground)",
          marginBottom: "0.75rem",
        }}
      >
        {t("title")}
      </p>
      <p
        style={{
          color: "var(--muted-foreground)",
          fontSize: "1rem",
          maxWidth: "28rem",
          lineHeight: 1.6,
          marginBottom: "2.5rem",
        }}
      >
        {t("description")}
      </p>
      <Link
        href="/"
        className={pageStyles.buttonOutline}
      >
        {t("backHome")}
      </Link>
    </main>
  );
}
