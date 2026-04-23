"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import formStyles from "@/shared/ui/form/Form.module.scss";
import { cn } from "@/shared/lib/cn";
import { validateEmail, validateName } from "@/features/apply/wizard/validation";
import styles from "./Contact.module.scss";

type Status = "idle" | "submitting" | "success" | "error";
type FieldKey = "name" | "email" | "phone";

function validatePhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 6;
}

export function Contact() {
  const t = useTranslations("home.contact");
  const locale = useLocale();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const feedbackTimersRef = useRef<{ hide?: ReturnType<typeof setTimeout>; clear?: ReturnType<typeof setTimeout> }>({});
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    name: false,
    email: false,
    phone: false,
  });

  const clearFeedbackTimers = () => {
    if (feedbackTimersRef.current.hide) clearTimeout(feedbackTimersRef.current.hide);
    if (feedbackTimersRef.current.clear) clearTimeout(feedbackTimersRef.current.clear);
    feedbackTimersRef.current = {};
  };

  useEffect(() => clearFeedbackTimers, []);

  const showFeedback = (text: string, nextStatus: Status) => {
    clearFeedbackTimers();
    setStatus(nextStatus);
    setFeedback(text);
    setFeedbackVisible(true);
    feedbackTimersRef.current.hide = setTimeout(() => {
      setFeedbackVisible(false);
      feedbackTimersRef.current.clear = setTimeout(() => {
        setFeedback("");
        setStatus("idle");
      }, 400);
    }, 10000);
  };

  const nameValid = validateName(name);
  const emailValid = validateEmail(email);
  const phoneValid = validatePhone(phone);
  const canSubmit = nameValid && emailValid && phoneValid && status !== "submitting";

  const showNameError = touched.name && !nameValid;
  const showEmailError = touched.email && !emailValid;
  const showPhoneError = touched.phone && !phoneValid;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      setTouched({ name: true, email: true, phone: true });
      return;
    }

    clearFeedbackTimers();
    setStatus("submitting");
    setFeedback("");
    setFeedbackVisible(false);

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTouched({ name: false, email: false, phone: false });
      showFeedback(t("success"), "success");
    } catch {
      showFeedback(t("error"), "error");
    }
  };

  return (
    <section id="contact" className={styles.section} data-home-section="contact">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{t("eyebrow")}</span>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="contact-name" className={formStyles.label}>
              {t("nameLabel")}
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              className={cn(formStyles.simpleInput, showNameError && formStyles.inputError)}
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              aria-invalid={showNameError}
              aria-describedby={showNameError ? "contact-name-error" : undefined}
              required
              maxLength={120}
            />
            {showNameError ? (
              <span id="contact-name-error" className={formStyles.fieldError}>
                {t("nameError")}
              </span>
            ) : null}
          </div>

          <div className={styles.row}>
            <div className={formStyles.simpleFormGroup}>
              <label htmlFor="contact-email" className={formStyles.label}>
                {t("emailLabel")}
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                className={cn(formStyles.simpleInput, showEmailError && formStyles.inputError)}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                aria-invalid={showEmailError}
                aria-describedby={showEmailError ? "contact-email-error" : undefined}
                required
                maxLength={160}
              />
              {showEmailError ? (
                <span id="contact-email-error" className={formStyles.fieldError}>
                  {t("emailError")}
                </span>
              ) : null}
            </div>

            <div className={formStyles.simpleFormGroup}>
              <label htmlFor="contact-phone" className={formStyles.label}>
                {t("phoneLabel")}
              </label>
              <input
                id="contact-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                className={cn(formStyles.simpleInput, showPhoneError && formStyles.inputError)}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                aria-invalid={showPhoneError}
                aria-describedby={showPhoneError ? "contact-phone-error" : undefined}
                required
                maxLength={32}
              />
              {showPhoneError ? (
                <span id="contact-phone-error" className={formStyles.fieldError}>
                  {t("phoneError")}
                </span>
              ) : null}
            </div>
          </div>

          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="contact-message" className={formStyles.label}>
              {t("messageLabel")}
            </label>
            <textarea
              id="contact-message"
              rows={4}
              className={cn(formStyles.simpleInput, styles.textarea)}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={2000}
            />
          </div>

          <button
            type="submit"
            className={styles.submit}
            aria-busy={status === "submitting"}
          >
            <span>{status === "submitting" ? t("submitting") : t("submit")}</span>
            <ArrowRight aria-hidden="true" />
          </button>

          {feedback ? (
            <p
              className={cn(
                styles.feedback,
                feedbackVisible && styles.feedbackEnter,
                status === "success" && styles.feedbackSuccess,
                status === "error" && styles.feedbackError,
              )}
              role={status === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {feedback}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
