'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { loadTranslations, t as rawT, type TranslationFile } from '@/utils/i18n';

/**
 * Loads a translation namespace for the current language and returns a
 * bound t(key) function. Re-renders the component whenever the language
 * changes and the new translations finish loading.
 *
 * Usage:
 *   const t = useT('become-a-bitcoiner');
 *   <h1>{t('page_title')}</h1>
 */
export function useT(namespace: TranslationFile): (key: string) => string {
  const [lang] = useLanguage();
  const [, setTick] = useState(0);

  useEffect(() => {
    // Load current language + ensure English fallback is always in cache
    Promise.all([
      loadTranslations(lang, namespace),
      loadTranslations('en', namespace),
    ]).then(() => setTick((n) => n + 1));
  }, [lang, namespace]);

  return (key: string) => rawT(`${namespace}.${key}`);
}
