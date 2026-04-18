'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  loadAllTranslations,
  isTranslationCached,
  TRANSLATION_FILES,
  type SupportedLanguage,
} from '@/utils/i18n';

/**
 * Waits until all translations for the current language (and English as
 * fallback) are fully loaded before rendering any children. While loading,
 * returns null so only the body background is visible — no layout shift,
 * no wrong-language flash, no raw-key flash.
 *
 * On SPA navigation the module-level cache is already populated, so the
 * synchronous check in useState resolves immediately and children render
 * without any blank frame.
 */
function allCached(lang: SupportedLanguage): boolean {
  return TRANSLATION_FILES.every(
    (f) => isTranslationCached(lang, f) && isTranslationCached('en', f),
  );
}

export function TranslationGate({ children }: { children: React.ReactNode }) {
  const [lang] = useLanguage();
  const [ready, setReady] = useState(() => allCached(lang));

  useEffect(() => {
    if (allCached(lang)) {
      setReady(true);
      return;
    }

    setReady(false);
    let cancelled = false;

    Promise.all([loadAllTranslations(lang), loadAllTranslations('en')]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [lang]);

  if (!ready) return null;
  return <>{children}</>;
}
