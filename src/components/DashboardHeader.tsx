'use client';

import { useT } from '@/hooks/useT';

type DashboardHeaderProps = {
  displayName: string;
};

export function DashboardHeader({ displayName }: DashboardHeaderProps) {
  const t = useT('dashboard');

  return (
    <div className="header">
      <h1 className="welcome">{t('welcome').replace('{name}', displayName)}</h1>
    </div>
  );
}
