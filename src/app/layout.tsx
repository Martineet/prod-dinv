import '@/app/globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { LandingHeader } from '@/components/LandingHeader';
import { TranslationGate } from '@/components/TranslationGate';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'D.Inversions - Bitcoin Portfolio',
  description: 'Track your Bitcoin investments and performance.'
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TranslationGate>
          <LandingHeader />
          {children}
        </TranslationGate>
      </body>
    </html>
  );
}
