'use client';

import { useState } from 'react';
import { LandingHeader } from '@/components/LandingHeader';
import { Footer } from '@/components/Footer';
import { useT } from '@/hooks/useT';

export default function WhatIsBitcoinPage() {
  const [lecture, setLecture] = useState(false);
  const t = useT('what-is-bitcoin');

  return (
    <>
      <LandingHeader />
      <div className={lecture ? 'lecture-bg' : ''}>
        <main className="wib-shell">
          <div className="wib-content">

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

            {/* Introduction */}
            <div className="wib-intro">
              <p className="wib-section-label">{t('intro_label')}</p>
              <h1 className="wib-page-title">{t('intro_title')}</h1>
              <p className="wib-lead">{t('intro_lead')}</p>
            </div>

            {/* Table of Contents */}
            <nav className="wib-toc" aria-label="Table of contents">
              <p className="wib-toc-title">{t('toc_title')}</p>
              <ol className="wib-toc-list">
                <li><a href="#origins">1. {t('toc_1')}</a></li>
                <li><a href="#open-source">2. {t('toc_2')}</a></li>
                <li><a href="#blockchain">3. {t('toc_3')}</a></li>
                <li><a href="#validation">4. {t('toc_4')}</a></li>
                <li><a href="#scarcity">5. {t('toc_5')}</a></li>
                <li><a href="#storage">6. {t('toc_6')}</a></li>
                <li><a href="#buy">7. {t('toc_7')}</a></li>
                <li><a href="#price">8. {t('toc_8')}</a></li>
                <li><a href="#religion">9. {t('toc_9')}</a></li>
                <li><a href="#sources">10. {t('toc_10')}</a></li>
              </ol>
            </nav>

            {/* 3.1 Origins */}
            <section className="wib-section" id="origins">
              <p className="wib-section-label">1.</p>
              <h2 className="wib-section-title">{t('s1_title')}</h2>
              <p className="wib-paragraph">
                {t('s1_p1_a')} <em>{t('s1_p1_em')}</em>. {t('s1_p1_b')}
              </p>
              <p className="wib-paragraph">{t('s1_p2')}</p>
              <p className="wib-paragraph">{t('s1_p3')}</p>
            </section>

            {/* 3.2 Open source */}
            <section className="wib-section" id="open-source">
              <p className="wib-section-label">2.</p>
              <h2 className="wib-section-title">{t('s2_title')}</h2>
              <p className="wib-paragraph">{t('s2_p1')}</p>
              <p className="wib-paragraph">{t('s2_p2')}</p>
              <p className="wib-paragraph">{t('s2_p3')}</p>
              <p className="wib-paragraph">{t('s2_p4')}</p>
            </section>

            {/* 3.3 Blockchain */}
            <section className="wib-section" id="blockchain">
              <p className="wib-section-label">3.</p>
              <h2 className="wib-section-title">{t('s3_title')}</h2>
              <p className="wib-paragraph">{t('s3_p1')}</p>
              <p className="wib-paragraph">{t('s3_p2')}</p>
              <p className="wib-paragraph">{t('s3_p3')}</p>
              <p className="wib-paragraph">{t('s3_p4')}</p>
            </section>

            {/* 3.4 Validation */}
            <section className="wib-section" id="validation">
              <p className="wib-section-label">4.</p>
              <h2 className="wib-section-title">{t('s4_title')}</h2>
              <p className="wib-paragraph">{t('s4_p1')}</p>
              <p className="wib-paragraph">{t('s4_p2')}</p>
              <p className="wib-paragraph">{t('s4_p3')}</p>
              <p className="wib-paragraph">{t('s4_p4')}</p>
            </section>

            {/* 3.5 Scarcity */}
            <section className="wib-section" id="scarcity">
              <p className="wib-section-label">5.</p>
              <h2 className="wib-section-title">{t('s5_title')}</h2>
              <p className="wib-paragraph">{t('s5_p1')}</p>
              <p className="wib-paragraph">{t('s5_p2')}</p>
              <p className="wib-paragraph">{t('s5_p3')}</p>
              <p className="wib-paragraph">{t('s5_p4')}</p>
            </section>

            {/* 3.6 Storage */}
            <section className="wib-section" id="storage">
              <p className="wib-section-label">6.</p>
              <h2 className="wib-section-title">{t('s6_title')}</h2>
              <p className="wib-paragraph">{t('s6_p1')}</p>
              <p className="wib-paragraph">{t('s6_p2')}</p>
              <p className="wib-paragraph">{t('s6_p3')}</p>
              <ul className="wib-list">
                <li>
                  <strong>{t('s6_hot_title')}</strong> — {t('s6_hot_text')}
                </li>
                <li>
                  <strong>{t('s6_desktop_title')}</strong> — {t('s6_desktop_text')}
                </li>
                <li>
                  <strong>{t('s6_hw_title')}</strong> — {t('s6_hw_text')}
                </li>
              </ul>
              <p className="wib-paragraph">{t('s6_p4')}</p>
            </section>

            {/* 3.7 Buy */}
            <section className="wib-section" id="buy">
              <p className="wib-section-label">7.</p>
              <h2 className="wib-section-title">{t('s7_title')}</h2>
              <p className="wib-paragraph">{t('s7_p1')}</p>
              <p className="wib-paragraph">{t('s7_p2')}</p>
              <p className="wib-paragraph">{t('s7_p3')}</p>
              <ul className="wib-list">
                <li><strong>{t('s7_li_reg_title')}</strong> — {t('s7_li_reg_text')}</li>
                <li><strong>{t('s7_li_sec_title')}</strong> — {t('s7_li_sec_text')}</li>
                <li><strong>{t('s7_li_fees_title')}</strong> — {t('s7_li_fees_text')}</li>
                <li><strong>{t('s7_li_wd_title')}</strong> — {t('s7_li_wd_text')}</li>
              </ul>
              <p className="wib-paragraph">{t('s7_p4')}</p>
            </section>

            {/* 3.8 Price */}
            <section className="wib-section" id="price">
              <p className="wib-section-label">8.</p>
              <h2 className="wib-section-title">{t('s8_title')}</h2>
              <p className="wib-paragraph">{t('s8_p1')}</p>
              <p className="wib-paragraph">{t('s8_p2')}</p>
              <p className="wib-paragraph">{t('s8_p3')}</p>
              <p className="wib-paragraph">
                {t('s8_p4_a')}{' '}
                <a href="/investment-strategies">{t('s8_p4_link')}</a>{' '}
                {t('s8_p4_b')}
              </p>
            </section>

            {/* 3.9 Religion */}
            <section className="wib-section" id="religion">
              <p className="wib-section-label">9.</p>
              <h2 className="wib-section-title">{t('s9_title')}</h2>
              <p className="wib-paragraph">{t('s9_p1')}</p>
              <p className="wib-paragraph">
                <strong>{t('s9_p2_bold')}</strong> {t('s9_p2_text')}
              </p>
              <p className="wib-paragraph">
                <strong>{t('s9_p3_bold')}</strong> {t('s9_p3_text')}
              </p>
              <p className="wib-paragraph">
                <strong>{t('s9_p4_bold')}</strong> {t('s9_p4_text')}
              </p>
              <p className="wib-paragraph">{t('s9_p5')}</p>
            </section>

            {/* Sources */}
            <section className="wib-section wib-sources" id="sources">
              <p className="wib-section-label">{t('sources_label')}</p>
              <h2 className="wib-section-title">{t('sources_title')}</h2>
              <p className="wib-paragraph">{t('sources_intro')}</p>
              <ul className="wib-sources-list">
                <li>
                  <a href="https://bitcoin.org/en/bitcoin-paper" target="_blank" rel="noopener noreferrer">
                    Bitcoin White Paper
                  </a>{' '}
                  — {t('sources_wp_desc')}
                </li>
                <li>
                  <a href="https://learnmeabitcoin.com/" target="_blank" rel="noopener noreferrer">
                    Learn Me A Bitcoin
                  </a>{' '}
                  — {t('sources_learnme_desc')}
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Bitcoin" target="_blank" rel="noopener noreferrer">
                    Wikipedia — Bitcoin
                  </a>{' '}
                  — {t('sources_wiki_desc')}
                </li>
                <li>
                  <a href="https://bitcoin-well.gitbook.io/sovereignty-guide-by-bitcoin-well/wallets" target="_blank" rel="noopener noreferrer">
                    Bitcoin Well — Sovereignty Guide: Wallets
                  </a>{' '}
                  — {t('sources_bw_desc')}
                </li>
                <li>
                  <a href="https://bitcointalk.org" target="_blank" rel="noopener noreferrer">
                    Bitcointalk.org
                  </a>{' '}
                  — {t('sources_btalk_desc')}
                </li>
              </ul>
            </section>

          </div>
        </main>
      </div>
      <Footer variant="simple" />
    </>
  );
}
