'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/services/supabaseClient';

const RESET_ICON = '\u{1F511}';

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<'checking' | 'ready' | 'no-session' | 'updated'>('checking');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initRecovery = async () => {
      setError('');
      setInfo('');
      setStatus('checking');

      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            throw exchangeError;
          }
        } else if (url.hash) {
          const hashParams = new URLSearchParams(url.hash.replace('#', ''));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');

          if (accessToken && refreshToken) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            if (sessionError) {
              throw sessionError;
            }
          }
        }

        const { data } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (data.session) {
          setStatus('ready');
        } else {
          setStatus('no-session');
          setInfo('Reset link is invalid or expired. Please request a new reset email.');
        }

        if (url.hash) {
          window.history.replaceState({}, document.title, `${url.pathname}${url.search}`);
        }
      } catch (err) {
        if (!isMounted) return;
        const message = err instanceof Error ? err.message : 'Failed to validate reset link.';
        setError(message);
        setStatus('no-session');
      }
    };

    initRecovery();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdatePassword = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setInfo('');

    if (!password) {
      setError('Please enter a new password.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    sessionStorage.setItem('pw_changed', '1');
    await supabase.auth.signOut();
    setStatus('updated');
  };

  return (
    <div className="container landing-body">
      <div className="login-form-wrapper">
        <h2 className="section-title">{`${RESET_ICON} Reset Password`}</h2>

        {status === 'checking' ? <div className="loading">Validating reset link...</div> : null}

        {status === 'ready' ? (
          <form className="login-form" onSubmit={handleUpdatePassword}>
            <div className="form-group">
              <label htmlFor="newPassword">New password</label>
              <input
                type="password"
                id="newPassword"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a new password"
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm new password</label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter your new password"
                autoComplete="new-password"
              />
            </div>
            <button type="submit" disabled={saving}>
              {saving ? 'Updating password...' : 'Update password'}
            </button>
            {error ? <div className="error">{error}</div> : null}
            {info ? <div className="info-msg">{info}</div> : null}
          </form>
        ) : null}

        {status === 'updated' ? (
          <div className="login-form">
            <p className="info-msg">Password updated. Please log in again.</p>
            <Link className="reset-link" href="/">
              Return to login
            </Link>
          </div>
        ) : null}

        {status === 'no-session' ? (
          <div className="login-form">
            {error ? <div className="error">{error}</div> : null}
            {info ? <div className="info-msg">{info}</div> : null}
            <Link className="reset-link" href="/">
              Back to login
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
