import { User } from '@supabase/supabase-js';
import { MemberProfile } from '@/lib/types';
import { supabase } from '@/services/supabaseClient';

type CreateMemberOptions = {
  displayName?: string | null;
  email?: string | null;
  visibilitySummary?: boolean;
  taxes?: number;
};

export async function createMemberProfile(user: User, options: CreateMemberOptions = {}) {
  if (!user.id) {
    throw new Error('Missing user id for member profile.');
  }

  const email = options.email ?? user.email ?? '';
  if (!email) {
    throw new Error('Missing email for member profile.');
  }

  const trimmedName = (options.displayName ?? '').trim();
  const fallbackName = email.includes('@') ? email.split('@')[0] : email;

  const { data, error } = await supabase
    .from('members')
    .insert({
      user_id: user.id,
      email,
      display_name: trimmedName || fallbackName || null,
      visibility_summary: options.visibilitySummary ?? true,
      taxes: options.taxes ?? 0
    })
    .select('members_id, display_name, email, visibility_summary, taxes')
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Member profile was not created.');
  return data as MemberProfile;
}
