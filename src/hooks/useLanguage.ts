'use client';

import { useEffect, useState } from 'react';
import {
  getLanguage,
  initLanguage,
  setLanguage,
  type SupportedLanguage,
} from '@/utils/i18n';

/**
 * Returns the current UI language and a setter that persists it and
 * triggers a re-render of every component that subscribes to this hook.
 *
 * SSR-safe: always starts as 'en' on the server/first render, then
 * updates to the stored/detected language after mount — no hydration mismatch.
 */
export function useLanguage(): [SupportedLanguage, (lang: SupportedLanguage) => void] {
  const [lang, setLang] = useState<SupportedLanguage>('en');

  useEffect(() => {
    // Initialise on first mount (reads localStorage + auto-detects)
    initLanguage();
    setLang(getLanguage());

    const handler = (e: Event) => {
      setLang((e as CustomEvent<SupportedLanguage>).detail);
    };
    window.addEventListener('language-changed', handler);
    return () => window.removeEventListener('language-changed', handler);
  }, []);

  return [lang, setLanguage];
}
