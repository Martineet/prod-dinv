'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useT } from '@/hooks/useT';

const LOCK_ICON = '\u{1F510}';

export function LoginForm() {
  const { signIn, signUp, requestPasswordReset } = useAuth();
  const t = useT('common');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetInfo, setResetInfo] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    const changed = sessionStorage.getItem('pw_changed');
    if (changed) {
      setInfo(t('info_pw_changed_login'));
      sessionStorage.removeItem('pw_changed');
    }
  }, [t]);

  useEffect(() => {
    if (!resetEmail && email) {
      setResetEmail(email);
    }
  }, [email, resetEmail]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    if (isSignup) {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        setError(t('error_email_required'));
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError(t('error_passwords_no_match'));
        setLoading(false);
        return;
      }

      const { error: signUpError, profileError, requiresEmailConfirmation } = await signUp(
        trimmedEmail,
        password,
        displayName
      );
      setLoading(false);

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (profileError) {
        setInfo(t('info_account_pending'));
      } else if (requiresEmailConfirmation) {
        setInfo(t('info_account_email_sent'));
      } else {
        setInfo(t('info_account_created'));
      }

      setIsSignup(false);
      setPassword('');
      setConfirmPassword('');
      setShowReset(false);
      return;
    }

    const { error: signInError } = await signIn(email.trim(), password);
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      if (signInError.message.toLowerCase().includes('invalid login credentials')) {
        setShowReset(true);
        setShowResetForm(false);
        setResetEmail(email.trim());
      }
    }
  };

  const handleResetRequest = async (event: FormEvent) => {
    event.preventDefault();
    setResetError('');
    setResetInfo('');

    const trimmedEmail = resetEmail.trim();
    if (!trimmedEmail) {
      setResetError(t('error_email_required'));
      return;
    }

    setResetLoading(true);
    const { error: resetRequestError } = await requestPasswordReset(trimmedEmail);
    setResetLoading(false);

    if (resetRequestError) {
      setResetError(resetRequestError.message);
      return;
    }

    setResetInfo(t('info_recovery_sent'));
  };

  return (
    <div className="login-form-wrapper">
      <h2 className="section-title">{`${LOCK_ICON} ${isSignup ? t('signup_title') : t('login_title')}`}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {isSignup ? (
          <div className="form-group">
            <label htmlFor="displayName">{t('label_display_name')}</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder={t('placeholder_display_name')}
              autoComplete="name"
            />
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="email">{t('label_email')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="your@email.com"
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{t('label_password')}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder={isSignup ? t('placeholder_password_create') : t('placeholder_password_enter')}
            autoComplete={isSignup ? 'new-password' : 'current-password'}
          />
        </div>
        {isSignup ? (
          <div className="form-group">
            <label htmlFor="confirmPassword">{t('label_confirm_password')}</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              placeholder={t('placeholder_reenter_password')}
              autoComplete="new-password"
            />
          </div>
        ) : null}
        <button type="submit" disabled={loading}>
          {loading ? (isSignup ? t('btn_creating_account') : t('btn_logging_in')) : isSignup ? t('btn_create_account') : t('btn_login')}
        </button>
        <button
          type="button"
          className="signup-placeholder-btn"
          onClick={() => {
            setError('');
            setInfo('');
            setIsSignup((prev) => !prev);
            setShowReset(false);
            setShowResetForm(false);
            setResetError('');
            setResetInfo('');
          }}
        >
          {isSignup ? t('btn_back_to_login') : t('btn_sign_up')}
        </button>
        {error ? <div className="error">{error}</div> : null}
        {info ? <div className="info-msg">{info}</div> : null}
      </form>
      {!isSignup && showReset ? (
        <div className="reset-panel">
          <button
            type="button"
            className="reset-link"
            onClick={() => {
              setResetError('');
              setResetInfo('');
              setShowResetForm(true);
            }}
          >
            {t('btn_reset_password_link')}
          </button>
          {showResetForm ? (
            <form className="reset-form" onSubmit={handleResetRequest}>
              <div className="form-group">
                <label htmlFor="resetEmail">{t('label_recovery_email')}</label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(event) => setResetEmail(event.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>
              <button type="submit" disabled={resetLoading}>
                {resetLoading ? t('btn_sending_email') : t('btn_send_recovery')}
              </button>
              {resetError ? <div className="error">{resetError}</div> : null}
              {resetInfo ? <div className="info-msg">{resetInfo}</div> : null}
            </form>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
