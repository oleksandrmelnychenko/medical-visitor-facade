import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getLocalizedMetadata,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/shared/lib/seo";
import { pickMessages } from "@/i18n/pickMessages";
import { LoginForm } from "./LoginForm";

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

type LoginPageRenderProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: LoginPageRenderProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const messages = await pickMessages(safeLocale, ["auth"]);

  return (
    <NextIntlClientProvider locale={safeLocale} messages={messages}>
      <LoginForm />
    </NextIntlClientProvider>
  );
}
