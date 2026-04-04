'use client';

import { useCallback, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/services/supabaseClient';
import { createMemberProfile } from '@/services/members';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  }, []);

  const signUp = useCallback(async (email: string, password: string, displayName?: string) => {
    const trimmedEmail = email.trim();
    const trimmedName = displayName?.trim() ?? '';
    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: trimmedName ? { data: { display_name: trimmedName } } : undefined
    });

    if (error) {
      return { error, profileError: null, requiresEmailConfirmation: false };
    }

    const user = data.user ?? data.session?.user ?? null;
    let profileError: Error | null = null;

    if (user) {
      try {
        await createMemberProfile(user, { displayName: trimmedName, email: trimmedEmail });
      } catch (err) {
        profileError = err instanceof Error ? err : new Error('Failed to create member profile.');
      }
    }

    return { error: null, profileError, requiresEmailConfirmation: !data.session };
  }, []);

  const signOut = useCallback(async () => {
    return supabase.auth.signOut();
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return { data: null, error: new Error('Email is required.') };
    }

    const redirectTo =
      typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined;

    return supabase.auth.resetPasswordForEmail(trimmedEmail, redirectTo ? { redirectTo } : undefined);
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user as User | null;

    if (!user?.email) {
      throw new Error('No active session. Please log in again.');
    }

    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword
    });

    if (reauthError) throw reauthError;

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;

    sessionStorage.setItem('pw_changed', '1');
    await supabase.auth.signOut();
  }, []);

  return {
    session,
    user: session?.user ?? null,
    loading,
    signIn,
    signUp,
    signOut,
    requestPasswordReset,
    changePassword
  };
}
