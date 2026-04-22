import { Metadata } from "next";
import {
  getLocalizedMetadata,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/shared/lib/seo";
import { LoginPageClient } from "./LoginPageClient";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [title, description] = await Promise.all([
    getLocalizedMessage(safeLocale, "auth.signIn"),
    getLocalizedMessage(safeLocale, "auth.welcomeSubtitle"),
  ]);

  return getLocalizedMetadata({
    locale: safeLocale,
    path: "/login",
    title,
    description,
    noIndex: true,
  });
}

export default async function LoginPage() {
  return <LoginPageClient />;
}
