"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "lucide-react";
import styles from "./MobileLoginFab.module.scss";

export function MobileLoginFab() {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === "authenticated" || pathname === "/login") {
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
