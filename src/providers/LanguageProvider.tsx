"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

type Locale = 'de' | 'en' | 'ru';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
  initialMessages: Record<string, unknown>;
}

export function LanguageProvider({
  children,
  initialLocale = 'de',
  initialMessages
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [messages, setMessages] = useState<Record<string, unknown>>(initialMessages);

  const setLocale = async (newLocale: Locale) => {
    // Load new messages
    const newMessages = await import(`../messages/${newLocale}.json`);
    setMessages(newMessages.default);
    setLocaleState(newLocale);

    // Save to cookie for server-side persistence
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
  };

  useEffect(() => {
    // Check for saved locale in cookie on mount
    const savedLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] as Locale | undefined;

    if (savedLocale && savedLocale !== locale) {
      setLocale(savedLocale);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Berlin">
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}
