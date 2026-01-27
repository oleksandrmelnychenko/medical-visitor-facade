"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { RegisterWizard } from "@/components/auth/RegisterWizard";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./register.module.scss";

export default function RegisterPage() {
  const t = useTranslations('register');

  return (
    <div className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection, styles.heroSection)}>
        <div className={sectionStyles.container}>
          <Link href="/apply" className={styles.backLink}>
            <span className={styles.backArrow}>‹</span> <span className={styles.backText}>{t('back')}</span>
          </Link>
          <SectionHeader
            title={t('registerTitle')}
            subtitle={t('registerSubtitle')}
            variant="page"
            titleAs="h1"
            theme="beige"
          />
          <div className={styles.headerDivider} />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.formSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.formContainer}>
            <RegisterWizard />
          </div>
        </div>
      </section>
    </div>
  );
}
