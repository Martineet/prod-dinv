import { supabase } from '@/services/supabaseClient';
import { Investment, MemberProfile, Portfolio, PortfolioSummary } from '@/lib/types';

export async function getMemberProfileByUserId(userId: string): Promise<MemberProfile | null> {
  const { data, error } = await supabase
    .from('members')
    .select('members_id, display_name, email, visibility_summary, taxes')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return data as MemberProfile;
}

export async function getPortfoliosByMembersId(membersId: string): Promise<Portfolio[]> {
  const { data, error } = await supabase
    .from('portfolios')
    .select('portfolios_id, members_id, name')
    .eq('members_id', membersId)
    .order('name', { ascending: true });

  if (error) throw error;
  return (data ?? []) as Portfolio[];
}

export async function getInvestmentsByPortfoliosId(portfoliosId: string): Promise<Investment[]> {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('portfolios_id', portfoliosId)
    .order('date_swap', { ascending: true });

  if (error) throw error;
  return (data ?? []) as Investment[];
}

export async function getPortfolioSummary(): Promise<PortfolioSummary | null> {
  const { data, error } = await supabase.rpc('get_portfolio_summary');

  if (error) throw error;
  if (!data) return null;
  return data as PortfolioSummary;
}
