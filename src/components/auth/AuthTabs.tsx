"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import styles from "./auth.module.scss";

export function AuthTabs() {
  const t = useTranslations("auth");
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className={styles.authContainer}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={cn(styles.tab, activeTab === "login" && styles.active)}
          onClick={() => setActiveTab("login")}
        >
          {t("signIn")}
        </button>
        <button
          type="button"
          className={cn(styles.tab, activeTab === "register" && styles.active)}
          onClick={() => setActiveTab("register")}
        >
          {t("createAccount")}
        </button>
      </div>

      {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
