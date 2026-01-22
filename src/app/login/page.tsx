"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./login.module.scss";
import formStyles from "@/components/auth/auth.module.scss";

export default function LoginPage() {
  const t = useTranslations('auth');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: handle form submission
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <div className={pageStyles.page}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            overline={t('overline')}
            title={t('welcomeTitle')}
            subtitle={t('welcomeSubtitle')}
            variant="page"
            titleAs="h1"
          />
          <div className={styles.headerDivider} />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.formSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.formContainer}>
            <form className={formStyles.form} onSubmit={handleSubmit} autoComplete="off">
              {/* Phone field */}
              <div className={formStyles.formGroup}>
                <input
                  id="phone"
                  type="tel"
                  placeholder=" "
                  className={formStyles.input}
                  autoComplete="off"
                />
                <label htmlFor="phone" className={formStyles.label}>
                  {t('phone')}
                </label>
              </div>

              {/* Password field */}
              <div className={formStyles.formGroup}>
                <div className={formStyles.passwordWrapper}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    className={formStyles.input}
                    autoComplete="new-password"
                  />
                  <label htmlFor="password" className={formStyles.label}>
                    {t('password')}
                  </label>
                  <button
                    type="button"
                    className={formStyles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot password link */}
              <Link href="/forgot-password" className={formStyles.forgotPassword}>
                {t('forgotPassword')}
              </Link>

              {/* Submit button */}
              <button type="submit" className={formStyles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? t('signingIn') : t('signIn')}
              </button>

              {/* Confidentiality notice */}
              <p className={formStyles.confidentialityNotice}>
                {t('confidentialityNotice')}
              </p>

              {/* Privacy policy link */}
              <Link href="/privacy-policy" className={formStyles.policyLink}>
                {t('privacyPolicyLink')}
              </Link>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
