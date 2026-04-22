'use client';

import Image from 'next/image';
import { useT } from '@/hooks/useT';

function BitcoinLogo({ priority = false }: { priority?: boolean }) {
  return (
    <div className="welcome-logo-wrap">
      <Image
        className="welcome-logo-img"
        src="/bitcoin-btc-logo.svg"
        alt="Bitcoin"
        width={72}
        height={72}
        priority={priority}
      />
    </div>
  );
}

export function WelcomeSection() {
  const t = useT('landing');

  return (
    <section className="welcome-section">
      <div className="welcome-inner">
        <BitcoinLogo priority />
        <div className="welcome-text">
          <p className="welcome-paragraph">{t('welcome_text')}</p>
          <p className="welcome-signature">
            <a
              href="https://bitcointalk.org/index.php?topic=375643.0"
              target="_blank"
              rel="noopener noreferrer"
              className="welcome-signature-link"
            >
              {t('welcome_signature')}
            </a>
          </p>
        </div>
        <BitcoinLogo />
      </div>
    </section>
  );
}
