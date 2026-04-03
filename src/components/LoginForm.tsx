'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const LOCK_ICON = '\u{1F510}';

export function LoginForm() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const changed = sessionStorage.getItem('pw_changed');
    if (changed) {
      setInfo('Password updated. Please log in again.');
      sessionStorage.removeItem('pw_changed');
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    if (isSignup) {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        setError('Email is required.');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
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
        setInfo('Account created, but your profile is pending. Please log in after confirmation.');
      } else if (requiresEmailConfirmation) {
        setInfo('Account created. Check your email to confirm your account.');
      } else {
        setInfo('Account created. You can log in now.');
      }

      setIsSignup(false);
      setPassword('');
      setConfirmPassword('');
      return;
    }

    const { error: signInError } = await signIn(email.trim(), password);
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
    }
  };

  return (
    <div className="login-form-wrapper">
      <h2 className="section-title">{`${LOCK_ICON} ${isSignup ? 'Create Account' : 'Member Login'}`}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {isSignup ? (
          <div className="form-group">
            <label htmlFor="displayName">Display name</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder={isSignup ? 'Create a password' : 'Enter your password'}
            autoComplete={isSignup ? 'new-password' : 'current-password'}
          />
        </div>
        {isSignup ? (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
          </div>
        ) : null}
        <button type="submit" disabled={loading}>
          {loading ? (isSignup ? 'Creating account...' : 'Logging in...') : isSignup ? 'Create account' : 'Login'}
        </button>
        <button
          type="button"
          className="signup-placeholder-btn"
          onClick={() => {
            setError('');
            setInfo('');
            setIsSignup((prev) => !prev);
          }}
        >
          {isSignup ? '\u2190 Back to login' : '\u2192 Sign up'}
        </button>
        {error ? <div className="error">{error}</div> : null}
        {info ? <div className="info-msg">{info}</div> : null}
      </form>
    </div>
  );
}
