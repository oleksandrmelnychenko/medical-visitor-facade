import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ScrollRevealMotion } from "./ScrollRevealMotion";
import styles from "./ScrollReveal.module.scss";

export async function ScrollReveal() {
  const locale = await getLocale();
  const [tCommon, tHome] = await Promise.all([
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "home.scrollReveal" }),
  ]);

  return (
    <ScrollRevealMotion>
      <div className={styles.surface}>
        <h2 className={styles.headline}>{tHome("headline")}</h2>
        <Link href="/apply" prefetch={false} className={styles.cta}>
          <span>{tCommon("requestAppointment")}</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </ScrollRevealMotion>
  );
}
