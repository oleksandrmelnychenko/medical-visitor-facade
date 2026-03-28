import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./TrustBanner.module.scss";

export function TrustBanner() {
  const t = useTranslations("appointment.newPatient");

  return (
    <div className={styles.banner}>
      <Lock className={styles.icon} />
      <span className={styles.text}>{t("trustBanner")}</span>
    </div>
  );
}
