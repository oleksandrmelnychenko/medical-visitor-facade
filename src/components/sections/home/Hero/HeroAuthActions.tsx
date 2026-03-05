"use client";

import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import styles from "./Hero.module.scss";

type HeroAuthActionsProps = {
  loginLabel: string;
};

export function HeroAuthActions({ loginLabel }: HeroAuthActionsProps) {
  const { status } = useSession();

  if (status === "authenticated") {
    return null;
  }

  return (
    <Link href="/login" className={styles.heroLoginLink}>
      <User size={16} />
      {loginLabel}
    </Link>
  );
}
