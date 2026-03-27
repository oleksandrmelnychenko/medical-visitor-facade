"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

type HeaderSwitchProps = {
  main: ReactNode;
  auth: ReactNode;
};

export function HeaderSwitch({ main, auth }: HeaderSwitchProps) {
  const pathname = usePathname();
  return pathname === "/login" ? auth : main;
}
