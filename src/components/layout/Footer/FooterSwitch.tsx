"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

type FooterSwitchProps = {
  main: ReactNode;
  auth: ReactNode;
};

export function FooterSwitch({ main, auth }: FooterSwitchProps) {
  const pathname = usePathname();
  return pathname === "/login" ? auth : main;
}
