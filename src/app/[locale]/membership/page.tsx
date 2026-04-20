import { getTranslations } from "next-intl/server";
import { MembershipComparison } from "@/components/sections/membership/MembershipComparison";
import styles from "./membership.module.scss";

type MembershipPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function MembershipPage({ params }: MembershipPageProps) {
  const { locale } = await params;
  await getTranslations({ locale, namespace: "membership" });

  return (
    <main className={styles.page} data-page="membership">
      <MembershipComparison />
    </main>
  );
}
