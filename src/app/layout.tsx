import '@/app/globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import { LandingHeader } from '@/components/LandingHeader';
import { TranslationGate } from '@/components/TranslationGate';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'D.Inversions - Bitcoin Portfolio',
  description: 'Track your Bitcoin investments and performance.'
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <TranslationGate>
          <LandingHeader />
          {children}
        </TranslationGate>
      </body>
    </html>
  );
}
