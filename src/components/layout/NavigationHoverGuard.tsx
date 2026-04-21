"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function NavigationHoverGuard() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    document.body.classList.add("no-hover");

    const clear = () => {
      document.body.classList.remove("no-hover");
    };

    const timeoutId = window.setTimeout(clear, 300);
    window.addEventListener("mousemove", clear, { once: true });
    window.addEventListener("touchstart", clear, { once: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("mousemove", clear);
      window.removeEventListener("touchstart", clear);
      document.body.classList.remove("no-hover");
    };
  }, [pathname]);

  return null;
}
