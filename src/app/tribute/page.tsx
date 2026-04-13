'use client';

import { useState } from 'react';
import { LandingHeader } from '@/components/LandingHeader';
import { Footer } from '@/components/Footer';
import { useT } from '@/hooks/useT';

export default function TributePage() {
  const [lecture, setLecture] = useState(false);
  const t = useT('tribute');

  return (
    <>
      <LandingHeader />
      <div className={lecture ? 'lecture-bg' : ''}>
        <main className="tribute-shell">
          <div className="tribute-content">

            {/* Lecture mode toggle */}
            <div className="lecture-toggle-bar">
              <button
                type="button"
                className={`lecture-toggle-btn${lecture ? ' active' : ''}`}
                onClick={() => setLecture((v) => !v)}
              >
                <span className="lecture-toggle-icon">📖</span>
              </button>
            </div>

            {/* Header */}
            <div className="tribute-header">
              <div className="tribute-logo-wrap">
                <img src="/bitcoin-btc-logo.svg" alt="Bitcoin" className="tribute-logo" />
              </div>
              <h1 className="tribute-title">{t('title')}</h1>
              <p className="tribute-subtitle">{t('subtitle')}</p>
            </div>

            {/* Section I — The Genesis Block */}
            <section className="tribute-section">
              <h2 className="tribute-section-title">{t('s1_title')}</h2>
              <p className="tribute-paragraph">{t('s1_p1')}</p>
              <p className="tribute-paragraph">{t('s1_p2')}</p>
              <blockquote className="tribute-embed-quote">{t('s1_blockquote')}</blockquote>
              <p className="tribute-paragraph">{t('s1_p3')}</p>
              <p className="tribute-paragraph">{t('s1_p4')}</p>
              <p className="tribute-paragraph">{t('s1_p5')}</p>
              <p className="tribute-address-block">
                <a
                  href="https://www.blockchain.com/explorer/addresses/btc/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tribute-address-link"
                >
                  1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                </a>
              </p>
              <p className="tribute-paragraph">{t('s1_p6')}</p>
              <div className="tribute-commandment">
                <span className="tribute-commandment-text">{t('s1_commandment')}</span>
              </div>
            </section>

            {/* Section II — The Promise */}
            <section className="tribute-section">
              <h2 className="tribute-section-title">{t('s2_title')}</h2>
              <p className="tribute-paragraph">{t('s2_p1')}</p>
              <p className="tribute-paragraph">{t('s2_p2')}</p>
              <p className="tribute-paragraph">{t('s2_p3')}</p>
              <p className="tribute-paragraph">{t('s2_p4')}</p>
              <p className="tribute-paragraph">{t('s2_p5')}</p>
              <div className="tribute-commandment">
                <span className="tribute-commandment-text">{t('s2_commandment')}</span>
              </div>
            </section>

            {/* Section III — The Journey */}
            <section className="tribute-section">
              <h2 className="tribute-section-title">{t('s3_title')}</h2>
              <p className="tribute-paragraph">{t('s3_p1')}</p>
              <p className="tribute-paragraph">{t('s3_p2')}</p>
              <p className="tribute-paragraph">{t('s3_p3')}</p>
              <p className="tribute-paragraph">{t('s3_p4')}</p>
              <p className="tribute-paragraph">{t('s3_p5')}</p>
              <div className="tribute-commandment">
                <span className="tribute-commandment-text">{t('s3_commandment')}</span>
              </div>
            </section>

            {/* Section IV — The Bitcoin Pizza Day */}
            <section className="tribute-section">
              <h2 className="tribute-section-title">{t('s4_title')}</h2>
              <p className="tribute-paragraph">{t('s4_p1')}</p>
              <p className="tribute-paragraph">{t('s4_p2')}</p>
              <p className="tribute-paragraph">{t('s4_p3')}</p>
              <p className="tribute-paragraph">{t('s4_p4')}</p>
              <div className="tribute-commandment">
                <span className="tribute-commandment-text">{t('s4_commandment')}</span>
              </div>
            </section>

            {/* Section V — The Martyrs */}
            <section className="tribute-section">
              <h2 className="tribute-section-title">{t('s5_title')}</h2>
              <p className="tribute-paragraph">{t('s5_p1')}</p>
              <p className="tribute-paragraph">{t('s5_p2')}</p>
              <p className="tribute-paragraph">{t('s5_p3')}</p>
              <p className="tribute-paragraph">{t('s5_p4')}</p>
              <p className="tribute-paragraph">{t('s5_p5')}</p>
              <div className="tribute-commandment">
                <span className="tribute-commandment-text">{t('s5_commandment')}</span>
              </div>
            </section>

            {/* Section VI — The Cypherpunks */}
            <section className="tribute-section">
              <h2 className="tribute-section-title">{t('s6_title')}</h2>
              <p className="tribute-paragraph">{t('s6_p1')}</p>
              <p className="tribute-paragraph">{t('s6_p2')}</p>
              <p className="tribute-paragraph">{t('s6_p3')}</p>
              <div className="tribute-commandment">
                <span className="tribute-commandment-text">{t('s6_commandment')}</span>
              </div>
            </section>

            {/* Closing verse */}
            <p className="tribute-closing-verse">{t('closing_verse')}</p>

            {/* Signature */}
            <div className="tribute-signature">
              <p className="tribute-signature-line">{t('signature_line')}</p>
              <p className="tribute-signature-line tribute-signature-ff">FF</p>
            </div>

          </div>
        </main>
      </div>
      <Footer variant="blank" />
    </>
  );
}
