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

const SITE_TITLE = 'D.Inversions - Bitcoin';
const SITE_DESCRIPTION = 'Un cop prenguis la pastilla taronja, ja no hi ha marxa enrere';
const SITE_IMAGE = '/bitcoin-btc-logo.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dinversions.org'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE]
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE]
  }
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
