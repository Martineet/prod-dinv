'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import type { SupportedLanguage } from '@/utils/i18n';

// Alphabetical by label in their own language; Arabic last per design spec.
const LANGUAGES: { code: SupportedLanguage; label: string; display: string }[] = [
  { code: 'ca', label: 'Català',    display: 'CA' },
  { code: 'de', label: 'Deutsch',   display: 'DE' },
  { code: 'en', label: 'English',   display: 'EN' },
  { code: 'es', label: 'Español',   display: 'ES' },
  { code: 'fr', label: 'Français',  display: 'FR' },
  { code: 'ru', label: 'Русский',   display: 'RU' },
  { code: 'zh', label: '中文',       display: 'ZH' },
  { code: 'ar', label: 'العربية',   display: 'AR' },
];

const GlobeIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

type Props = {
  /** 'desktop' — globe icon only; 'mobile' — globe + 2-letter code */
  variant: 'desktop' | 'mobile';
  /** Callback so the parent can close the mobile menu after a selection */
  onSelect?: () => void;
};

export function LanguagePicker({ variant, onSelect }: Props) {
  const [lang, changeLang] = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    changeLang(code);
    setOpen(false);
    onSelect?.();
  };

  const currentDisplay = LANGUAGES.find((l) => l.code === lang)?.display ?? 'EN';

  return (
    <div
      ref={wrapperRef}
      className={`lang-picker-wrapper lang-picker--${variant}`}
    >
      <button
        type="button"
        className="lang-picker-btn"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <GlobeIcon />
        {variant === 'mobile' && (
          <span className="lang-picker-code">{currentDisplay}</span>
        )}
      </button>

      <div
        className={`lang-picker-dropdown${open ? ' open' : ''}`}
        role="listbox"
        aria-label="Language"
      >
        {LANGUAGES.map(({ code, label, display }) => (
          <button
            key={code}
            type="button"
            role="option"
            aria-selected={code === lang}
            className={`lang-picker-item${code === lang ? ' active' : ''}`}
            onClick={() => handleSelect(code)}
          >
            <span className="lang-picker-item-code">{display}</span>
            <span className="lang-picker-item-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
