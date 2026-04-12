'use client';

import { LandingHeader } from '@/components/LandingHeader';
import { Footer } from '@/components/Footer';
import { useT } from '@/hooks/useT';

// Icons stay as a static constant — only keys travel to t()
const GUIDE_KEYS = [
  { icon: '😴', titleKey: 'guide_sleep_title', textKey: 'guide_sleep_text' },
  { icon: '📉', titleKey: 'guide_lose_title',  textKey: 'guide_lose_text'  },
  { icon: '🗳️', titleKey: 'guide_vote_title',  textKey: 'guide_vote_text'  },
  { icon: '⏳', titleKey: 'guide_time_title',  textKey: 'guide_time_text'  },
] as const;

export default function InvestmentStrategiesPage() {
  const t = useT('investment-strategies');

  return (
    <>
      <LandingHeader />
      <div className="istrat-shell">

        {/* Section 1 — Investment Guides */}
        <section className="istrat-section">
          <p className="istrat-section-label">{t('guides_label')}</p>
          <h1 className="istrat-section-title">{t('guides_title')}</h1>
          <div className="istrat-principles-grid">
            {GUIDE_KEYS.map((g) => (
              <div key={g.titleKey} className="istrat-principle-card">
                <span className="istrat-principle-icon">{g.icon}</span>
                <h3 className="istrat-principle-title">{t(g.titleKey)}</h3>
                <p className="istrat-principle-text">{t(g.textKey)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 — Investment Strategies */}
        <section className="istrat-section">
          <p className="istrat-section-label">{t('page_label')}</p>
          <h2 className="istrat-section-title">{t('page_title')}</h2>
          <div className="istrat-strategies-list">

            {/* DCA */}
            <div className="istrat-strategy-card card-featured">
              <div className="istrat-strategy-header">
                <div>
                  <h3 className="istrat-strategy-name">{t('strat_a_title')}</h3>
                  <p className="istrat-strategy-subtitle">{t('strat_a_subtitle')}</p>
                </div>
                <span className="istrat-badge istrat-badge-info">{t('strat_a_badge')}</span>
              </div>
              <p className="istrat-strategy-body">{t('strat_a_body_1')}</p>
              <p className="istrat-strategy-body">{t('strat_a_body_2')}</p>
              <div className="istrat-tip">
                <span className="istrat-tip-label">Tip</span>
                {t('strat_a_tip')}
              </div>
            </div>

            {/* Weighted DCA */}
            <div className="istrat-strategy-card">
              <div className="istrat-strategy-header">
                <div>
                  <h3 className="istrat-strategy-name">{t('strat_b_title')}</h3>
                  <p className="istrat-strategy-subtitle">{t('strat_b_subtitle')}</p>
                </div>
                <span className="istrat-badge istrat-badge-warning">{t('strat_b_badge')}</span>
              </div>
              <p className="istrat-strategy-body">{t('strat_b_body_1')}</p>
              <p className="istrat-strategy-body">{t('strat_b_body_2')}</p>
              <p className="istrat-strategy-body">
                <a href="/metrics">{t('strat_b_metrics_link')} &rarr;</a>
              </p>
              <div className="istrat-tip">
                <span className="istrat-tip-label">Tip</span>
                {t('strat_b_tip')}
              </div>
            </div>

            {/* Lump-Sum */}
            <div className="istrat-strategy-card">
              <div className="istrat-strategy-header">
                <div>
                  <h3 className="istrat-strategy-name">{t('strat_c_title')}</h3>
                  <p className="istrat-strategy-subtitle">{t('strat_c_subtitle')}</p>
                </div>
                <span className="istrat-badge istrat-badge-danger">{t('strat_c_badge')}</span>
              </div>
              <p className="istrat-strategy-body">{t('strat_c_body_1')}</p>
              <p className="istrat-strategy-body">{t('strat_c_body_2')}</p>
              <div className="istrat-tip">
                <span className="istrat-tip-label">Tip</span>
                {t('strat_c_tip')}
              </div>
            </div>

            {/* Gold */}
            <div className="istrat-strategy-card">
              <div className="istrat-strategy-header">
                <div>
                  <h3 className="istrat-strategy-name">{t('strat_d_title')}</h3>
                  <p className="istrat-strategy-subtitle">{t('strat_d_subtitle')}</p>
                </div>
                <span className="istrat-badge istrat-badge-muted">{t('strat_d_badge')}</span>
              </div>
              <p className="istrat-strategy-body">{t('strat_d_body_1')}</p>
              <p className="istrat-strategy-body">{t('strat_d_body_2')}</p>
              <div className="istrat-tip">
                <span className="istrat-tip-label">Tip</span>
                {t('strat_d_tip')}
              </div>
            </div>

          </div>
        </section>

      </div>
      <Footer variant="simple" />
    </>
  );
}
