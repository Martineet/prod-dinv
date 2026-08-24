'use client';

import { LandingHeader } from '@/components/LandingHeader';
import { Footer } from '@/components/Footer';
import { useReferrals } from '@/hooks/useReferrals';
import { useT } from '@/hooks/useT';

export default function BecomeABitcoinerPage() {
  const t  = useT('become-a-bitcoiner');
  const tc = useT('common');
  const { data: referrals } = useReferrals();

  return (
    <>
      <LandingHeader />
      <div className="bbtc-shell">

        {/* Table of Contents */}
        <nav className="wib-toc" aria-label="Table of contents">
          <p className="wib-toc-title">{t('toc_title')}</p>
          <ol className="wib-toc-list">
            <li><a href="#buying">1. {t('toc_1')}</a></li>
            <li><a href="#storing">2. {t('toc_2')}</a></li>
          </ol>
        </nav>

        {/* Section 1 — Buying Bitcoins */}
        <section className="bbtc-section" id="buying">
          <p className="bbtc-section-label">{t('page_label')}</p>
          <h1 className="bbtc-section-title">{t('page_title')}</h1>
          <p className="bbtc-section-tagline">{t('page_subtitle')}</p>
          <p className="bbtc-intro">{t('page_intro')}</p>

          <div className="bbtc-exchange-list">

            {/* Kraken */}
            <div className="bbtc-exchange-card card-featured">
              <div className="bbtc-card-header">
                <div>
                  <h3 className="bbtc-card-name">{t('exchange_kraken_title')}</h3>
                  <p className="bbtc-card-subtitle">{t('exchange_kraken_subtitle')}</p>
                </div>
                <span className="istrat-badge istrat-badge-info">{tc('recommended')}</span>
              </div>
              <p className="bbtc-card-body">{t('exchange_kraken_body')}</p>
              <div className="bbtc-logo-row">
                <a
                  href={referrals['kraken']?.link ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bbtc-logo-link"
                >
                  Kraken &rarr;
                </a>
              </div>
            </div>

            {/* Coinbase + MEXC */}
            <div className="bbtc-exchange-card">
              <div className="bbtc-card-header">
                <div>
                  <h3 className="bbtc-card-name">{t('exchange_coinbase_title')}</h3>
                  <p className="bbtc-card-subtitle">{t('exchange_coinbase_subtitle')}</p>
                </div>
                <span className="istrat-badge istrat-badge-warning">{tc('intermediate')}</span>
              </div>
              <p className="bbtc-card-body">{t('exchange_coinbase_body')}</p>
              <div className="bbtc-logo-row">
                <a
                  href={referrals['coinbase']?.link ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bbtc-logo-link"
                >
                  Coinbase &rarr;
                </a>
                <span className="bbtc-logo-plus">+</span>
                <a
                  href={referrals['mexc']?.link ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bbtc-logo-link"
                >
                  MEXC &rarr;
                </a>
              </div>
            </div>

            {/* HODL HODL */}
            <div className="bbtc-exchange-card">
              <div className="bbtc-card-header">
                <div>
                  <h3 className="bbtc-card-name">{t('exchange_hodlhodl_title')}</h3>
                  <p className="bbtc-card-subtitle">{t('exchange_hodlhodl_subtitle')}</p>
                </div>
                <span className="istrat-badge istrat-badge-anon">{tc('anonymous')}</span>
              </div>
              <p className="bbtc-card-body">{t('exchange_hodlhodl_body')}</p>
              <div className="bbtc-logo-row">
                <a
                  href={referrals['hodlhodl']?.link ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bbtc-logo-link"
                >
                  HODL HODL &rarr;
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Section 2 — Storing Bitcoins */}
        <section className="bbtc-section" id="storing">
          <p className="bbtc-section-label">{t('custody_label')}</p>
          <h2 className="bbtc-section-title">{t('custody_title')}</h2>
          <p className="bbtc-section-tagline">{t('custody_subtitle')}</p>
          <p className="bbtc-intro">{t('custody_intro')}</p>

          {/* Hardware wallets — 3-col grid */}
          <div className="bbtc-hw-grid">

            <div className="bbtc-hw-card card-featured">
              <div className="bbtc-card-header">
                <div>
                  <h3 className="bbtc-card-name">{t('wallet_trezor_title')}</h3>
                  <p className="bbtc-card-subtitle">{t('wallet_trezor_subtitle')}</p>
                </div>
                <span className="istrat-badge istrat-badge-info">{tc('recommended')}</span>
              </div>
              <p className="bbtc-card-body">{t('wallet_trezor_body')}</p>
              <div className="bbtc-logo-row">
                <a
                  href="https://trezor.io/trezor-safe-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bbtc-logo-link"
                >
                  Trezor &rarr;
                </a>
              </div>
            </div>

            <div className="bbtc-hw-card">
              <h3 className="bbtc-card-name">{t('wallet_ellipal_title')}</h3>
              <p className="bbtc-card-subtitle">{t('wallet_ellipal_subtitle')}</p>
              <p className="bbtc-card-body">{t('wallet_ellipal_body')}</p>
              <div className="bbtc-logo-row">
                <a
                  href="https://www.ellipal.com/products/ellipal-titan-mini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bbtc-logo-link"
                >
                  Ellipal &rarr;
                </a>
              </div>
            </div>

            <div className="bbtc-hw-card">
              <h3 className="bbtc-card-name">{t('wallet_tangem_title')}</h3>
              <p className="bbtc-card-subtitle">{t('wallet_tangem_subtitle')}</p>
              <p className="bbtc-card-body">{t('wallet_tangem_body')}</p>
              <div className="bbtc-logo-row">
                <a
                  href="https://tangem.com/en-GB/ring/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bbtc-logo-link"
                >
                  Tangem &rarr;
                </a>
              </div>
            </div>

          </div>

          {/* Other wallets */}
          <h3 className="bbtc-subsection-title">{t('wallet_other_title')}</h3>
          <div className="bbtc-sw-grid">

            <div className="bbtc-hw-card">
              <h3 className="bbtc-card-name">{t('wallet_bluewallet_title')}</h3>
              <p className="bbtc-card-subtitle">{t('wallet_bluewallet_subtitle')}</p>
              <p className="bbtc-card-body">{t('wallet_bluewallet_body')}</p>
              <div className="bbtc-logo-row">
                <a
                  href="https://play.google.com/store/apps/details?id=io.bluewallet.bluewallet&hl=en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bbtc-logo-link"
                >
                  Bluewallet &rarr;
                </a>
              </div>
            </div>

            <div className="bbtc-hw-card">
              <h3 className="bbtc-card-name">{t('wallet_satoshi_title')}</h3>
              <p className="bbtc-card-subtitle">{t('wallet_satoshi_subtitle')}</p>
              <p className="bbtc-card-body">{t('wallet_satoshi_body')}</p>
              <div className="bbtc-logo-row">
                <a
                  href="https://play.google.com/store/search?q=wallet%20of%20satoshi&c=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bbtc-logo-link"
                >
                  Wallet of Satoshi &rarr;
                </a>
              </div>
            </div>

          </div>

          {/* Final mantra */}
          <div className="bbtc-mantra">
            <span className="bbtc-mantra-text">{tc('not_your_keys')}</span>
          </div>

        </section>

      </div>
      <Footer variant="simple" />
    </>
  );
}
