"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { RegisterWizard } from "@/components/auth/RegisterWizard";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./register.module.scss";

export default function RegisterPage() {
  const t = useTranslations('auth');

  return (
    <div className={pageStyles.page}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            overline="Первый шаг"
            title="Начните свой путь к здоровью"
            subtitle="Заполните анкетные данные, чтобы персональный консультант GMED связался с Вами"
            variant="page"
            titleAs="h1"
          />

          {/* Benefits */}
          <div className={styles.benefits}>
            <div className={styles.benefitItem}>
              <Check className={styles.benefitIcon} />
              <span>Персональные рекомендации по программам лечения</span>
            </div>
            <div className={styles.benefitItem}>
              <Check className={styles.benefitIcon} />
              <span>Консьерж-сервис: отели, трансферы, переводчики</span>
            </div>
            <div className={styles.benefitItem}>
              <Check className={styles.benefitIcon} />
              <span>Организация лечения в ведущих клиниках</span>
            </div>
          </div>

          <div className={styles.headerDivider} />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.formSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.formContainer}>
            <RegisterWizard />

            {/* Link to login */}
            <p className={styles.switchText}>
              {t('alreadyHaveAccount')}{' '}
              <Link href="/login" className={styles.switchLink}>
                {t('signInLink')}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
