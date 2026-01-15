"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import layoutStyles from "@/components/sections/shared/layout.module.scss";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import styles from "./office.module.scss";

export function Office() {
  const t = useTranslations('home.office');

  return (
    <section className={sectionStyles.section}>
      <div className={sectionStyles.container}>
        <SectionHeader
          overline={t('overline')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className={layoutStyles.twoColGrid}>
          {/* Contact Information */}
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className={styles.contactTitle}>{t('location.title')}</h3>
            <p className={styles.contactSubtitle}>{t('location.city')}</p>

            <div className={styles.contactBlock}>
              <h4 className={styles.contactLabel}>{t('address.label')}</h4>
              <p className={styles.contactValue}>
                Albert-Schweitzer-Stra&szlig;e 56<br />
                81735 M&uuml;nchen, Germany
              </p>
            </div>

            <div className={styles.contactBlock}>
              <h4 className={styles.contactLabel}>{t('phone.label')}</h4>
              <p className={styles.contactValue}>+49 (89) 123-4567</p>
            </div>

            <div className={styles.contactBlock}>
              <h4 className={styles.contactLabel}>{t('email.label')}</h4>
              <p className={styles.contactValue}>contact@gmed-health.com</p>
            </div>

            <div className={styles.contactBlock}>
              <h4 className={styles.contactLabel}>{t('hours.label')}</h4>
              <p className={styles.contactValue}>
                {t('hours.weekdays')}<br />
                {t('hours.saturday')}<br />
                {t('hours.sunday')}
              </p>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            className={styles.mapCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.8267263424843!2d11.644499776739594!3d48.09850857122658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75f9a38c5fd9%3A0x10e84c5c6c5c5c5c!2sAlbert-Schweitzer-Stra%C3%9Fe%2056%2C%2081735%20M%C3%BCnchen%2C%20Germany!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
