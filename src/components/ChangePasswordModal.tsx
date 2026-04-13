'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/hooks/useAuth';
import { useT } from '@/hooks/useT';

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const { changePassword } = useAuth();
  const t = useT('common');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setLoading(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError(t('error_pw_min_6'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('error_passwords_no_match'));
      return;
    }

    if (!currentPassword) {
      setError(t('error_enter_current_pw'));
      return;
    }

    setLoading(true);

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess(t('info_pw_updated_logging_out'));
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error_unable_update_pw'));
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay open" onClick={(event) => event.currentTarget === event.target && handleClose()}>
      <div className="modal">
        <h3>{t('change_pw_title')}</h3>
        <div className="form-group">
          <label htmlFor="currentPassword">{t('label_current_pw')}</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            placeholder={t('placeholder_enter_current_pw')}
            autoComplete="current-password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">{t('label_new_pw')}</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder={t('placeholder_min_6_chars')}
            autoComplete="new-password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">{t('label_confirm_new_pw')}</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder={t('placeholder_repeat_pw')}
            autoComplete="new-password"
          />
        </div>
        {error ? <div className="error">{error}</div> : null}
        {success ? <div className="info-msg">{success}</div> : null}
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={handleClose} disabled={loading}>
            {t('btn_cancel')}
          </button>
          <button type="button" onClick={handleSave} disabled={loading}>
            {loading ? t('btn_saving') : t('btn_save')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
