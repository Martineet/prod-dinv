'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/services/supabaseClient';

type MemberSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type LoadedSettings = {
  visible: boolean;
  taxes: number;
};

const TAXES_ERROR = 'Taxes must be between 0 and 100';

export function MemberSettingsModal({ isOpen, onClose }: MemberSettingsModalProps) {
  const { user } = useAuth();
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
      if (!user?.email) {
        if (!active) return;
        setError('No active session. Please log in again.');
        setLoading(false);
        return;
      }

      const { data, error: loadError } = await supabase
        .from('members')
        .select('member_id, visibility_summary, taxes')
        .eq('email', user.email)
        .maybeSingle();

      if (!active) return;

      if (loadError || !data) {
        setError(loadError?.message ?? 'Unable to load settings.');
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
  }, [isOpen, user?.email]);

  const taxesValue = useMemo(() => {
    const numeric = Number(taxesInput);
    return Number.isFinite(numeric) ? numeric : NaN;
  }, [taxesInput]);

  const validateTaxes = () => {
    if (!taxesInput.trim()) return TAXES_ERROR;
    if (!Number.isFinite(taxesValue)) return TAXES_ERROR;
    if (taxesValue < 0 || taxesValue > 100) return TAXES_ERROR;
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

    if (!user?.email) {
      setError('No active session. Please log in again.');
      return;
    }

    if (!hasChanges) {
      onClose();
      return;
    }

    setSaving(true);
    const { error: updateError } = await supabase
      .from('members')
      .update({ visibility_summary: visible, taxes: taxesValue / 100 })
      .eq('email', user.email);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay open" onClick={(event) => event.currentTarget === event.target && attemptClose()}>
      <div className="modal">
        <h3>Settings</h3>
        {loading ? (
          <div className="info-msg">Loading settings...</div>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="visibilitySummary">Visible</label>
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
                <span className="toggle-state">{visible ? 'On' : 'Off'}</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="taxesInput">Taxes applied</label>
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
            {saving ? 'Saving...' : 'Close'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
