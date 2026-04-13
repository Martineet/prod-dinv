'use client';

import { useEffect, useRef, useState } from 'react';
import { useT } from '@/hooks/useT';

type SettingsMenuProps = {
  onSettings: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
};

const GEAR_ICON = '\u2699\uFE0F';
const SETTINGS_ICON = '\u2699\uFE0F';
const KEY_ICON = '\u{1F511}';
const DOOR_ICON = '\u{1F6AA}';

export function SettingsMenu({ onSettings, onChangePassword, onLogout }: SettingsMenuProps) {
  const t = useT('common');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="settings-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="settings-btn"
        title={t('menu_settings')}
        aria-label={t('menu_settings')}
        onClick={() => setOpen((prev) => !prev)}
      >
        {GEAR_ICON}
      </button>
      <div className={`settings-dropdown ${open ? 'open' : ''}`}>
        <button
          type="button"
          className="settings-item"
          onClick={() => {
            setOpen(false);
            onSettings();
          }}
        >
          {`${SETTINGS_ICON} ${t('menu_settings')}`}
        </button>
        <button
          type="button"
          className="settings-item"
          onClick={() => {
            setOpen(false);
            onChangePassword();
          }}
        >
          {`${KEY_ICON} ${t('menu_change_password')}`}
        </button>
        <div className="settings-divider" />
        <button
          type="button"
          className="settings-item danger"
          onClick={() => {
            setOpen(false);
            onLogout();
          }}
        >
          {`${DOOR_ICON} ${t('menu_logout')}`}
        </button>
      </div>
    </div>
  );
}
