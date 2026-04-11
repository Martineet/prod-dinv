import { LandingHeader } from '@/components/LandingHeader';
import { Footer } from '@/components/Footer';

const PRINCIPLES = [
  {
    icon: '😴',
    title: 'Sleep on it',
    text: "If an investment keeps you up at night or makes you anxious, it's too much for you right now. Protecting your peace is also a strategy.",
  },
  {
    icon: '💸',
    title: 'Only invest money you can afford to lose',
    text: 'Base your investment on potential losses, not gains. Never invest money meant for rent, food, or bills.',
  },
  {
    icon: '🗳️',
    title: 'Investing is a vote',
    text: 'Where you put your money is a statement. Invest in what you believe in. Money invested in war fuels war. Money invested in clean energy fuels clean energy.',
  },
  {
    icon: '⏳',
    title: 'Time in the market beats timing the market',
    text: "Nobody knows the highs and lows. Invest regularly, wait patiently, and let your money work for you.",
  },
];

export default function InvestmentStrategiesPage() {
  return (
    <>
      <LandingHeader />
      <div className="istrat-shell">

        {/* Section 1 — Investment Guides */}
        <section className="istrat-section">
          <p className="istrat-section-label">Before you start</p>
          <h1 className="istrat-section-title">Investment Guides</h1>
          <div className="istrat-principles-grid">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="istrat-principle-card">
                <span className="istrat-principle-icon">{p.icon}</span>
                <h3 className="istrat-principle-title">{p.title}</h3>
                <p className="istrat-principle-text">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 — Investment Strategies */}
        <section className="istrat-section">
          <p className="istrat-section-label">How to invest</p>
          <h2 className="istrat-section-title">Investment Strategies</h2>
          <div className="istrat-strategies-list">

            {/* DCA */}
            <div className="istrat-strategy-card istrat-strategy-featured">
              <div className="istrat-strategy-header">
                <div>
                  <h3 className="istrat-strategy-name">DCA — Dollar Cost Averaging</h3>
                  <p className="istrat-strategy-subtitle">The beginner&apos;s best friend</p>
                </div>
                <span className="istrat-badge istrat-badge-info">Recommended</span>
              </div>
              <p className="istrat-strategy-body">
                Pick a fixed affordable monthly amount (e.g. 50€). Buy bitcoin with it every month,
                regardless of price. Some months you get more bitcoin, some less — it evens out over
                time. No market knowledge needed. Just patience and discipline. Hodl for more than 5 years.
              </p>
              <div className="istrat-tip">
                <span className="istrat-tip-label">Tip</span>
                Be boring about it. Set a reminder, buy, and move on. Don&apos;t check the price every day.
              </div>
            </div>

            {/* Weighted DCA */}
            <div className="istrat-strategy-card">
              <div className="istrat-strategy-header">
                <div>
                  <h3 className="istrat-strategy-name">Weighted DCA — DCA v2</h3>
                  <p className="istrat-strategy-subtitle">Same idea, smarter execution</p>
                </div>
                <span className="istrat-badge istrat-badge-warning">Intermediate</span>
              </div>
              <p className="istrat-strategy-body">
                Same as DCA but adapt the monthly amount based on market conditions. Set a range
                (e.g. 0€–100€/month). When bitcoin looks cheap based on metrics like RSI under 30,
                fear in the market, or few addresses in profit (see the{' '}
                <a href="/metrics">Metrics page</a>
                ), invest more. When bitcoin is breaking records, invest less or even nothing.
                In deep crashes, temporarily increase significantly using spare investment funds —
                not emergency money. Don&apos;t aim for the exact bottom.
              </p>
              <div className="istrat-tip">
                <span className="istrat-tip-label">Tip</span>
                You&apos;re not timing the market — just being smart about how much you put in.
              </div>
            </div>

            {/* Lump-Sum */}
            <div className="istrat-strategy-card">
              <div className="istrat-strategy-header">
                <div>
                  <h3 className="istrat-strategy-name">Lump-Sum — All-in at the lows</h3>
                  <p className="istrat-strategy-subtitle">High risk, high reward — not for beginners</p>
                </div>
                <span className="istrat-badge istrat-badge-danger">Advanced</span>
              </div>
              <p className="istrat-strategy-body">
                Wait for a major crash, then invest a large amount at once. Great in theory, very hard
                emotionally in practice. Requires knowing at least one full bitcoin cycle (~4 years).
                Without experience, it&apos;s easy to buy too early, panic sell, or miss the window.
                This is closer to trading than investing — look for dedicated courses outside this page
                if you want to learn it.
              </p>
              <div className="istrat-tip">
                <span className="istrat-tip-label">Tip</span>
                Most people are better off with DCA. Lump-sum sounds great in hindsight, but it&apos;s brutal in real time.
              </div>
            </div>

            {/* Gold */}
            <div className="istrat-strategy-card">
              <div className="istrat-strategy-header">
                <div>
                  <h3 className="istrat-strategy-name">Gold — The classic safe haven</h3>
                  <p className="istrat-strategy-subtitle">For those who prefer stability over volatility</p>
                </div>
                <span className="istrat-badge istrat-badge-muted">Alternative</span>
              </div>
              <p className="istrat-strategy-body">
                If bitcoin feels too volatile, that&apos;s valid — but doing nothing isn&apos;t safe either.
                Inflation quietly erodes your savings every year. Gold has been a trusted store of value
                for thousands of years. Buy physical gold as a hedge. For details on how to invest in gold,
                look for platforms specialised in that.
              </p>
              <div className="istrat-tip">
                <span className="istrat-tip-label">Tip</span>
                That said — keep at least a little bitcoin. You know why 😉
              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer variant="simple" />
    </>
  );
}