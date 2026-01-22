"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import styles from "./mobileLoginFab.module.scss";

export function MobileLoginFab() {
  const { status } = useSession();
  const router = useRouter();

  // Don't show if user is already logged in
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
