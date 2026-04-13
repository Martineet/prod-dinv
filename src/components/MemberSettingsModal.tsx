'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/services/supabaseClient';
import { useT } from '@/hooks/useT';

type MemberSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type LoadedSettings = {
  visible: boolean;
  taxes: number;
};

export function MemberSettingsModal({ isOpen, onClose }: MemberSettingsModalProps) {
  const { user } = useAuth();
  const t = useT('common');
  const [visible, setVisible] = useState(true);
  const [taxesInput, setTaxesInput] = useState('');
  const [initialSettings, setInitialSettings] = useState<LoadedSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    setLoading(true);
    setError('');

    const load = async () => {
      if (!user?.id) {
        if (!active) return;
        setError(t('error_no_session'));
        setLoading(false);
        return;
      }

      const { data, error: loadError } = await supabase
        .from('members')
        .select('members_id, visibility_summary, taxes')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!active) return;

      if (loadError || !data) {
        setError(loadError?.message ?? t('error_unable_load_settings'));
        setLoading(false);
        return;
      }

      const nextVisible = Boolean(data.visibility_summary);
      const taxesValue = Number.isFinite(data.taxes) ? Number(data.taxes) : 0;
      const nextTaxesInput =
        Number.isFinite(taxesValue) && taxesValue >= 0 ? (taxesValue * 100).toString() : '';

      setVisible(nextVisible);
      setTaxesInput(nextTaxesInput);
      setInitialSettings({ visible: nextVisible, taxes: taxesValue });
      setLoading(false);
    };

    load();
    return () => {
      active = false;
    };
  }, [isOpen, user?.id, t]);

  const taxesValue = useMemo(() => {
    const numeric = Number(taxesInput);
    return Number.isFinite(numeric) ? numeric : NaN;
  }, [taxesInput]);

  const validateTaxes = () => {
    if (!taxesInput.trim()) return t('error_taxes_range');
    if (!Number.isFinite(taxesValue)) return t('error_taxes_range');
    if (taxesValue < 0 || taxesValue > 100) return t('error_taxes_range');
    return '';
  };

  const hasChanges = useMemo(() => {
    if (!initialSettings) return false;
    const nextTaxes = Number.isFinite(taxesValue) ? taxesValue / 100 : initialSettings.taxes;
    const taxesChanged = Math.abs(nextTaxes - initialSettings.taxes) > 0.000001;
    return visible !== initialSettings.visible || taxesChanged;
  }, [initialSettings, taxesValue, visible]);

  const attemptClose = async () => {
    if (saving) return;
    setError('');

    if (loading) {
      onClose();
      return;
    }

    if (!initialSettings) {
      onClose();
      return;
    }

    const taxesError = validateTaxes();
    if (taxesError) {
      setError(taxesError);
      return;
    }

    if (!user?.id) {
      setError(t('error_no_session'));
      return;
    }

    if (!hasChanges) {
      onClose();
      return;
    }

    const taxesChanged =
      initialSettings &&
      Number.isFinite(taxesValue) &&
      Math.abs(taxesValue / 100 - initialSettings.taxes) > 0.000001;

    setSaving(true);
    const { error: updateError } = await supabase
      .from('members')
      .update({ visibility_summary: visible, taxes: taxesValue / 100 })
      .eq('user_id', user.id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    if (taxesChanged) {
      window.dispatchEvent(new CustomEvent('member-settings-tax-updated'));
    }
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay open" onClick={(event) => event.currentTarget === event.target && attemptClose()}>
      <div className="modal">
        <h3>{t('settings_title')}</h3>
        {loading ? (
          <div className="info-msg">{t('loading_settings')}</div>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="visibilitySummary">{t('label_visible')}</label>
              <div className="toggle-row">
                <button
                  type="button"
                  id="visibilitySummary"
                  className={`toggle-switch ${visible ? 'on' : ''}`}
                  aria-pressed={visible}
                  onClick={() => setVisible((prev) => !prev)}
                >
                  <span className="toggle-knob" />
                </button>
                <span className="toggle-state">{visible ? t('toggle_on') : t('toggle_off')}</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="taxesInput">{t('label_taxes_applied')}</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  id="taxesInput"
                  min={0}
                  max={100}
                  step={0.01}
                  value={taxesInput}
                  onChange={(event) => setTaxesInput(event.target.value)}
                  placeholder="21"
                  inputMode="decimal"
                />
                <span className="input-suffix">%</span>
              </div>
            </div>
          </>
        )}
        {error ? <div className="error">{error}</div> : null}
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={attemptClose} disabled={saving}>
            {saving ? t('btn_saving') : t('btn_close')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
