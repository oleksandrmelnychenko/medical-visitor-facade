import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

const navigation = createNavigation(routing);

const LEGACY_WIZARD_ROUTE_MAP: Record<string, string> = {
  "/login": "/apply?type=returning",
  "/register": "/apply?type=new&step=location",
  "/register/eu/step/role": "/apply?type=new&step=eu-role",
  "/register/eu/step/companion": "/apply?type=new&step=eu-companion",
  "/register/eu/step/form": "/apply?type=new&step=eu-form",
  "/register/eu/step/dob": "/apply?type=new&step=eu-dob",
  "/register/eu/step/contact": "/apply?type=new&step=eu-contact",
  "/register/eu/step/interpreter": "/apply?type=new&step=eu-interpreter",
  "/register/eu/step/address": "/apply?type=new&step=eu-address",
  "/register/eu/step/medical": "/apply?type=new&step=eu-medical",
  "/register/eu/step/travel": "/apply?type=new&step=eu-travel",
  "/register/eu/step/visa": "/apply?type=new&step=eu-visa",
  "/register/outside-eu/step/role": "/apply?type=new&step=outside-role",
  "/register/outside-eu/step/travel": "/apply?type=new&step=outside-travel",
  "/register/outside-eu/step/records": "/apply?type=new&step=outside-records",
  "/register/outside-eu/step/visa": "/apply?type=new&step=outside-visa",
  "/register/outside-eu/step/documents": "/apply?type=new&step=outside-documents",
  "/register/outside-eu/step/info": "/apply?type=new&step=outside-info",
  "/register/outside-eu/patient-information/form": "/apply?type=new&step=outside-form",
  "/register/outside-eu/step/exit-travel": "/apply?type=new&step=outside-exit-travel",
  "/register/outside-eu/step/exit-records": "/apply?type=new&step=outside-exit-records",
};

function normalizeWizardHref<T>(href: T): T {
  if (typeof href !== "string") {
    return href;
  }

  return (LEGACY_WIZARD_ROUTE_MAP[href] ?? href) as T;
}

export const { Link, redirect, usePathname, getPathname } = navigation;

export function useRouter() {
  const router = navigation.useRouter();

  return {
    ...router,
    push(href: Parameters<typeof router.push>[0], options?: Parameters<typeof router.push>[1]) {
      return router.push(normalizeWizardHref(href), options);
    },
    replace(
      href: Parameters<typeof router.replace>[0],
      options?: Parameters<typeof router.replace>[1]
    ) {
      return router.replace(normalizeWizardHref(href), options);
    },
    prefetch(
      href: Parameters<typeof router.prefetch>[0],
      options?: Parameters<typeof router.prefetch>[1]
    ) {
      return router.prefetch(normalizeWizardHref(href), options);
    },
  };
}
