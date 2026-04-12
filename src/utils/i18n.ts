/**
 * Lightweight i18n utility — no external dependencies.
 *
 * Usage:
 *   import { t, loadTranslations, initLanguage, setLanguage } from '@/utils/i18n';
 *
 *   await loadTranslations('en', 'navbar');
 *   t('navbar.members_zone') // → "Members Zone"
 *
 * Key format: [file].[key]
 *   e.g. "dashboard.title", "navbar.members_zone", "common.save"
 *
 * Fallback chain: currentLanguage → English → raw key (never throws).
 */

type TranslationMap = Record<string, string>;
type LangCache = Record<string, TranslationMap>;
type FullCache = Record<string, LangCache>;

const cache: FullCache = {};

export const SUPPORTED_LANGUAGES = ['en', 'ca', 'es', 'fr', 'de', 'zh'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const TRANSLATION_FILES = [
  'navbar',
  'common',
  'landing',
  'investment-strategies',
  'metrics',
  'become-a-bitcoiner',
  'dashboard',
  'settings',
] as const;
export type TranslationFile = (typeof TRANSLATION_FILES)[number];

const STORAGE_KEY = 'app_language';
let currentLanguage: SupportedLanguage = 'en';

// ─── Language state ──────────────────────────────────────────────────────────

/** Read persisted language from localStorage; falls back to 'en'. Call once on app boot. */
export function initLanguage(): void {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
  if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) {
    currentLanguage = stored;
  }
}

export function getLanguage(): SupportedLanguage {
  return currentLanguage;
}

export function setLanguage(lang: SupportedLanguage): void {
  currentLanguage = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lang);
  }
}

// ─── Loader ──────────────────────────────────────────────────────────────────

/**
 * Lazily loads a single translation file into the cache.
 * Safe to call multiple times — skips if already cached.
 */
export async function loadTranslations(
  lang: SupportedLanguage,
  file: TranslationFile
): Promise<void> {
  if (cache[lang]?.[file]) return;
  try {
    // Dynamic import keeps bundles small — only loads what's needed.
    const mod = await import(`@/translations/${lang}/${file}.json`);
    if (!cache[lang]) cache[lang] = {};
    cache[lang][file] = mod.default ?? mod;
  } catch {
    // Missing file — store empty map so we don't retry endlessly.
    if (!cache[lang]) cache[lang] = {};
    cache[lang][file] = {};
  }
}

/**
 * Preloads all files for a given language in parallel.
 * Useful on language switch to avoid per-key load delays.
 */
export async function loadAllTranslations(lang: SupportedLanguage): Promise<void> {
  await Promise.all(TRANSLATION_FILES.map((file) => loadTranslations(lang, file)));
}

// ─── Translate ────────────────────────────────────────────────────────────────

/**
 * Returns the translation for `key` in the current language.
 *
 * @param key  Namespaced key, e.g. "navbar.members_zone"
 * @returns    Translated string, or the raw key if not found (never throws).
 */
export function t(key: string): string {
  const dot = key.indexOf('.');
  if (dot === -1) return key;

  const file = key.slice(0, dot) as TranslationFile;
  const name = key.slice(dot + 1);

  // 1. Current language
  const value = cache[currentLanguage]?.[file]?.[name];
  if (value !== undefined) return value;

  // 2. English fallback
  const fallback = cache['en']?.[file]?.[name];
  if (fallback !== undefined) return fallback;

  // 3. Raw key (never throw)
  return key;
}