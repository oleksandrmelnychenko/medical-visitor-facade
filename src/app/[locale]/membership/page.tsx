import { getTranslations } from "next-intl/server";
import { MembershipComparison } from "@/components/sections/membership/MembershipComparison";
import styles from "./membership.module.scss";

type MembershipPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function MembershipPage({ params }: MembershipPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "membership" });

  return (
    <div className={styles.page}>
      <MembershipComparison />
    </div>
  );
}
