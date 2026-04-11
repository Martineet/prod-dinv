import { LandingHeader } from '@/components/LandingHeader';
import { Footer } from '@/components/Footer';

export default function BecomeABitcoinerPage() {
  return (
    <>
      <LandingHeader />
      <div className="bbtc-shell">

        {/* Section 1 — Buying Bitcoins */}
        <section className="bbtc-section">
          <p className="bbtc-section-label">Exchanges</p>
          <h1 className="bbtc-section-title">Buying bitcoins</h1>
          <p className="bbtc-section-tagline">selling your fake money</p>
          <p className="bbtc-intro">
            There are different ways to obtain your first bitcoins, the most common way to start
            are the exchanges, they behave like a bank: you create your own account, fill your
            personal information (known as KYC, Know Your Customer) and start operating.
            It&apos;s important to check the reputation and the fees. But remember, not your keys,
            not your coins. Always after some months move your bitcoin to your wallet.
            Don&apos;t trust, verify.
          </p>
          <p className="bbtc-intro">As a starting point, we list these 3 options:</p>

          <div className="bbtc-exchange-list">

            {/* Kraken */}
            <div className="bbtc-exchange-card bbtc-exchange-featured">
              <div className="bbtc-card-header">
                <div>
                  <h3 className="bbtc-card-name">Kraken</h3>
                  <p className="bbtc-card-subtitle">The beginner&apos;s best friend</p>
                </div>
                <span className="istrat-badge istrat-badge-info">Recommended</span>
              </div>
              <p className="bbtc-card-body">
                Easy to set up and robust reputation after years of operating, solid option with
                webpage and app ready to use. Fees are not the most cheap neither the most
                expensive. The first step.
              </p>
              <div className="bbtc-logo-row">
                <a
                  href="https://invite.kraken.com/JDNW/zwkw6eog"
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
                  <h3 className="bbtc-card-name">Coinbase + MEXC</h3>
                  <p className="bbtc-card-subtitle">More complex but low fees</p>
                </div>
                <span className="istrat-badge istrat-badge-warning">Intermediate</span>
              </div>
              <p className="bbtc-card-body">
                If you want a low fee version (comes with some complexity), this is a good option.
                You need to register in both exchanges and buy USDC in Coinbase and transfer it
                to MEXC (pay attention to the network used) and there swap the USDC to bitcoin.
              </p>
              <div className="bbtc-logo-row">
                <a
                  href="https://coinbase.com/join/J7JU4NM?src=android-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bbtc-logo-link"
                >
                  Coinbase &rarr;
                </a>
                <span className="bbtc-logo-plus">+</span>
                <a
                  href="https://promote.mexc.com/r/zTCc2yj40o"
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
                  <h3 className="bbtc-card-name">HODL HODL</h3>
                  <p className="bbtc-card-subtitle">Without traces for those who value privacy</p>
                </div>
                <span className="istrat-badge istrat-badge-muted">Anonymous</span>
              </div>
              <p className="bbtc-card-body">
                In this platform you contact other people like you and make the deal without
                exposing your identity. It&apos;s really important to not reuse addresses and
                &ldquo;forget&rdquo; with who you interacted. Everyone here values their privacy.
                One of the most trustful P2P platforms.
              </p>
              <div className="bbtc-logo-row">
                <a
                  href="https://hodlhodl.com/join/XY7F"
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
        <section className="bbtc-section">
          <p className="bbtc-section-label">Self custody</p>
          <h2 className="bbtc-section-title">Storing your bitcoins</h2>
          <p className="bbtc-section-tagline">protecting your hard money</p>
          <p className="bbtc-intro">
            One of the biggest mantras of the bitcoin community is to store your own bitcoin
            outside the banks. Leaving your bitcoin on the exchange you used makes no sense as
            you&apos;re trusting an intermediary. When starting and for relatively small amounts,
            you shouldn&apos;t worry, but once you start stacking some sats, you have to consider
            storing your bitcoin somewhere else. Not your keys not your coins. It&apos;s
            critically important that when setting up your wallet,{' '}
            <strong>write the seed phrase on paper offline and make a couple of copies, store those
            papers in a trustful place</strong>. If something happens to your wallet, you&apos;ll
            need those 12/24 words to recover access &mdash; if you can&apos;t recover, you lose
            everything. You are your own bank so you have to take care of yourself.
          </p>

          {/* Hardware wallets — 3-col grid */}
          <div className="bbtc-hw-grid">

            <div className="bbtc-hw-card">
              <h3 className="bbtc-card-name">Trezor Safe 3</h3>
              <p className="bbtc-card-subtitle">The basic</p>
              <p className="bbtc-card-body">
                Open source, cheap, robust, you don&apos;t need more. The first step.
              </p>
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
              <h3 className="bbtc-card-name">Ellipal Titan Mini</h3>
              <p className="bbtc-card-subtitle">The offline</p>
              <p className="bbtc-card-body">
                The most secure combination: no USB, no connectivity, no NFC, just scanning QRs
                from your mobile. It&apos;s so secure that you&apos;ll probably forget how to use
                it. Advanced stuff.
              </p>
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
              <h3 className="bbtc-card-name">Tangem Ring</h3>
              <p className="bbtc-card-subtitle">The stylish</p>
              <p className="bbtc-card-body">
                Your ring becomes your wallet by using NFC technology paired with your phone.
                Never lose it, don&apos;t alarm nobody, move millions of euros with your finger.
              </p>
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
          <h3 className="bbtc-subsection-title">Other wallets</h3>
          <div className="bbtc-sw-grid">

            <div className="bbtc-hw-card">
              <h3 className="bbtc-card-name">Bluewallet</h3>
              <p className="bbtc-card-subtitle">Mobile</p>
              <p className="bbtc-card-body">
                Free hot wallet for your mobile. Think of it like your coin&apos;s wallet in
                your pocket. Store conveniently but remember it can be hacked.
              </p>
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
              <h3 className="bbtc-card-name">Wallet of Satoshi</h3>
              <p className="bbtc-card-subtitle">Lightning wallet</p>
              <p className="bbtc-card-body">
                Mobile lightning wallet for bitcoin. Simple to use. Custodial, which means
                you don&apos;t have full control, you trust them. Convenient for quick and cheap payments
                but not for storing large amounts.
              </p>
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
            <span className="bbtc-mantra-text">Not your keys not your coins</span>
          </div>

        </section>

      </div>
      <Footer variant="simple" />
    </>
  );
}