'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  isTranslationCached,
  loadTranslations,
  t as rawT,
  type SupportedLanguage,
  type TranslationFile,
} from '@/utils/i18n';

/**
 * Loads a translation namespace for the current language and returns a
 * bound t(key) function. Re-renders the component whenever the language
 * changes and the new translations finish loading.
 *
 * Returns empty strings until translations are ready so raw keys never
 * flash on screen during the initial load.
 *
 * Usage:
 *   const t = useT('become-a-bitcoiner');
 *   <h1>{t('page_title')}</h1>
 */
export function useT(namespace: TranslationFile): (key: string) => string {
  const [lang] = useLanguage();

  // Tracks which language is fully loaded in the cache for this namespace.
  // useLanguage always starts as 'en' (SSR-safe), so initialising to 'en'
  // when English is already cached lets rawT serve the right language on the
  // very first render (rawT reads the module-level currentLanguage, not lang).
  const [loadedLang, setLoadedLang] = useState<SupportedLanguage | null>(
    () => (isTranslationCached('en', namespace) ? 'en' : null)
  );

  useEffect(() => {
    if (isTranslationCached(lang, namespace) && isTranslationCached('en', namespace)) {
      setLoadedLang(lang);
      return;
    }

    Promise.all([
      loadTranslations(lang, namespace),
      loadTranslations('en', namespace),
    ]).then(() => setLoadedLang(lang));
  }, [lang, namespace]);

  // Only serve translations when loadedLang matches the current lang.
  // A mismatch means either nothing is loaded yet (null) or the previous
  // language's load resolved but the new language isn't cached yet — both
  // cases return '' to avoid raw-key or wrong-language flashes.
  return (key: string) => (loadedLang === lang ? rawT(`${namespace}.${key}`) : '');
}
