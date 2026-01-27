"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import styles from "./MobileLoginFab.module.scss";

export function MobileLoginFab() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return null;
  }

  return (
    <button
      className={styles.fab}
      onClick={() => router.push("/login")}
      aria-label="Login"
    >
      <User className={styles.icon} />
    </button>
  );
}
