"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { COUNTRY_CODES } from "@/components/sections/request-appointment/wizard/contact-phone";
import styles from "./ContactForm.module.scss";

type Status = "idle" | "submitting" | "success" | "error";

const DEFAULT_COUNTRY_CODE = "+49";

export function ContactForm() {
  const t = useTranslations("home.contactForm");
  const locale = useLocale();

  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const canSubmit =
    name.trim().length > 0 &&
    phone.replace(/\D/g, "").length >= 6 &&
    consent &&
    status !== "submitting";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setMessage("");

    const normalizedPhone = phone.trim().startsWith("+")
      ? phone.trim()
      : `${countryCode}${phone.trim()}`;

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalizedPhone,
          consent,
          locale,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Request failed");
      }

      setStatus("success");
      setMessage(t("success"));
      setName("");
      setPhone("");
      setConsent(false);
    } catch {
      setStatus("error");
      setMessage(t("error"));
    }
  };

  return (
    <section id="contact" className={styles.section} data-home-section="contact">
      <div className={styles.container}>
        {/* <div className={styles.header}>
          <span className={styles.eyebrow}>{t("eyebrow")}</span>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div> */}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-name" className={styles.label}>
              {t("nameLabel")}
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              className={styles.input}
              placeholder={t("namePlaceholder")}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={120}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="contact-phone" className={styles.label}>
              {t("phoneLabel")}
            </label>
            <div className={styles.phoneSurface}>
              <div className={styles.phoneCode}>
                <select
                  aria-label={t("countryCodeLabel")}
                  className={styles.phoneSelect}
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {`${item.flag} ${item.code}`}
                    </option>
                  ))}
                </select>
              </div>
              <input
                id="contact-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                className={styles.phoneInput}
                placeholder={t("phonePlaceholder")}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                maxLength={32}
              />
            </div>
          </div>

          <label className={styles.consentRow}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
            />
            <span className={styles.checkboxBox} aria-hidden="true" />
            <span className={styles.checkboxLabel}>
              {t.rich("consent", {
                privacyLink: (chunks) => (
                  <Link href="/privacy-policy" locale={locale}>
                    {chunks}
                  </Link>
                ),
              })}
            </span>
          </label>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submit}
              disabled={!canSubmit}
            >
              <span>{status === "submitting" ? t("submitting") : t("submit")}</span>
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            {message ? (
              <p
                className={styles.statusMessage}
                data-tone={status === "success" ? "success" : status === "error" ? "error" : undefined}
                role={status === "error" ? "alert" : "status"}
              >
                {message}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
