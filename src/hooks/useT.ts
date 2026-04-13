'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { isTranslationCached, loadTranslations, t as rawT, type TranslationFile } from '@/utils/i18n';

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
  // Initialise as ready if both namespaces are already in the module-level
  // cache (e.g. navigating back to a page visited earlier in the session).
  const [ready, setReady] = useState(
    () => isTranslationCached(lang, namespace) && isTranslationCached('en', namespace)
  );

  useEffect(() => {
    // If already cached (common after first visit), mark ready immediately
    // without triggering an async load.
    if (isTranslationCached(lang, namespace) && isTranslationCached('en', namespace)) {
      setReady(true);
      return;
    }

    setReady(false);
    Promise.all([
      loadTranslations(lang, namespace),
      loadTranslations('en', namespace),
    ]).then(() => setReady(true));
  }, [lang, namespace]);

  // Return empty strings while loading so raw keys never appear on screen.
  return (key: string) => (ready ? rawT(`${namespace}.${key}`) : '');
}
