'use client';

import { useState } from 'react';
import { LandingHeader } from '@/components/LandingHeader';
import { Footer } from '@/components/Footer';

export default function WhatIsBitcoinPage() {
  const [lecture, setLecture] = useState(false);

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
              <p className="wib-section-label">Introduction</p>
              <h1 className="wib-page-title">What is Bitcoin?</h1>
              <p className="wib-lead">
                Bitcoin (BTC), conceived in 2009 by the enigmatic figure of Satoshi Nakamoto, is not just
                the pioneering cryptocurrency — it is the catalyst that redefined the very concepts of money
                and trust. More than an asset, Bitcoin is a software protocol and a global payments system
                that operates in a decentralised and uninterrupted manner. Its birth marked the beginning of
                the blockchain era, a technology that continues to transform industries on a global scale.
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="wib-toc" aria-label="Table of contents">
              <p className="wib-toc-title">Contents</p>
              <ol className="wib-toc-list">
                <li><a href="#origins">1. Origins of a revolutionary idea</a></li>
                <li><a href="#open-source">2. Open source philosophy and Nakamoto&apos;s legacy</a></li>
                <li><a href="#blockchain">3. Blockchain</a></li>
                <li><a href="#validation">4. The validation process and cryptographic security</a></li>
                <li><a href="#scarcity">5. Digital scarcity and monetary sovereignty</a></li>
                <li><a href="#storage">6. How to store your Bitcoin</a></li>
                <li><a href="#buy">7. Where to buy Bitcoin</a></li>
                <li><a href="#price">8. How is the price of Bitcoin determined?</a></li>
                <li><a href="#religion">9. Bitcoin as the first true religion of the 21st century</a></li>
                <li><a href="#sources">10. Sources &amp; Resources</a></li>
              </ol>
            </nav>

            {/* 3.1 Origins */}
            <section className="wib-section" id="origins">
              <p className="wib-section-label">1.</p>
              <h2 className="wib-section-title">Origins of a revolutionary and decentralised idea</h2>
              <p className="wib-paragraph">
                Bitcoin was born in the wake of the 2008 global financial crisis. In October of that year,
                a person — or possibly a group — using the pseudonym Satoshi Nakamoto published a nine-page
                document titled <em>Bitcoin: A Peer-to-Peer Electronic Cash System</em>. The paper proposed
                a system for electronic transactions that would require no trust in any third party: no banks,
                no governments, no intermediaries of any kind.
              </p>
              <p className="wib-paragraph">
                On January 3rd, 2009, the Bitcoin network came to life with the mining of the very first block
                — the Genesis Block. Embedded in that block was a message: &ldquo;The Times 03/Jan/2009
                Chancellor on brink of second bailout for banks.&rdquo; A timestamp of the world Bitcoin was
                born into. A quiet declaration of intent.
              </p>
              <p className="wib-paragraph">
                The idea itself was not entirely new. Cryptographers and digital privacy advocates had been
                working on digital cash concepts for decades. What made Bitcoin different was the elegant
                solution it offered to the &ldquo;double-spending problem&rdquo; — the challenge of
                preventing someone from spending the same digital money twice, without relying on a trusted
                authority to keep track. Bitcoin solved it with mathematics and consensus, not with banks.
              </p>
            </section>

            {/* 3.2 Open source */}
            <section className="wib-section" id="open-source">
              <p className="wib-section-label">2.</p>
              <h2 className="wib-section-title">Open source philosophy and Nakamoto&apos;s legacy</h2>
              <p className="wib-paragraph">
                Bitcoin is open-source software. Its code is publicly available for anyone in the world to
                read, audit, copy, or improve. This was not merely a technical decision — it was a
                philosophical one. Satoshi could have kept the code private and built a company around it.
                Instead, it was given away freely to the world.
              </p>
              <p className="wib-paragraph">
                Open source means that no single company owns Bitcoin. There is no CEO, no headquarters,
                no customer support line. Development is coordinated voluntarily by contributors across the
                globe. Changes to the protocol can only happen if the broader network agrees — a built-in
                protection against manipulation by any single party.
              </p>
              <p className="wib-paragraph">
                Satoshi is believed to have mined approximately one million BTC in Bitcoin&apos;s earliest
                days. Not a single one of those coins has ever moved. Whether Satoshi has passed away, is
                living in anonymity, or simply chooses not to sell, those coins remain untouched to this day.
                For many in the community, this is the most powerful signal of all: whoever Satoshi was, this
                was never about personal enrichment.
              </p>
              <p className="wib-paragraph">
                Around 2011, Satoshi gradually withdrew from all communications, handing stewardship of the
                project to the developer community before disappearing entirely. The absence only deepened
                the legacy. Bitcoin does not need its creator to survive — and perhaps that was the point.
              </p>
            </section>

            {/* 3.3 Blockchain */}
            <section className="wib-section" id="blockchain">
              <p className="wib-section-label">3.</p>
              <h2 className="wib-section-title">Blockchain</h2>
              <p className="wib-paragraph">
                A blockchain is a distributed digital ledger — a record of transactions that is stored not
                in one place, but simultaneously across thousands of computers around the world. Each
                computer holding a copy is called a node. No single node is in charge. They all hold the
                same information and verify each other.
              </p>
              <p className="wib-paragraph">
                The ledger is organised into blocks. Each block contains a batch of recent transactions, a
                timestamp, and — crucially — a unique digital fingerprint (called a hash) of the block that
                came before it. This is what creates the chain: every block is mathematically linked to its
                predecessor. If you tried to alter a transaction in an old block, its hash would change,
                breaking the link to every block that followed. The network would immediately reject it.
              </p>
              <p className="wib-paragraph">
                This structure makes the Bitcoin blockchain effectively tamper-proof. To rewrite history,
                an attacker would need to redo the computational work of every subsequent block, faster than
                the entire rest of the network combined — an astronomical and practically impossible feat.
              </p>
              <p className="wib-paragraph">
                The blockchain is also fully transparent. Every transaction ever made on Bitcoin is public
                and permanently visible to anyone. There are no hidden transfers, no secret accounts. Privacy
                comes not from secrecy but from pseudonymity: addresses are strings of letters and numbers,
                not names.
              </p>
            </section>

            {/* 3.4 Validation */}
            <section className="wib-section" id="validation">
              <p className="wib-section-label">4.</p>
              <h2 className="wib-section-title">The validation process and cryptographic security</h2>
              <p className="wib-paragraph">
                When you send bitcoin, your transaction is broadcast to the entire network. Thousands of
                nodes receive it and check that it is valid — that you actually have the funds you are
                trying to send, and that your digital signature is authentic. But before it is permanently
                recorded on the blockchain, it must be included in a block. This is where miners come in.
              </p>
              <p className="wib-paragraph">
                Mining is the process of bundling pending transactions into a new block and adding it to
                the chain. To do so, miners must solve a mathematical puzzle: finding a number (called a
                nonce) that, when combined with the block&apos;s data, produces a hash with a very specific
                format. There is no shortcut — miners must try billions of combinations per second until
                one works. This is called Proof of Work.
              </p>
              <p className="wib-paragraph">
                The first miner to find the solution adds the block and earns a reward of newly created
                bitcoin, plus the transaction fees included in that block. This is the only way new bitcoin
                enters circulation. The difficulty of the puzzle adjusts automatically every two weeks so
                that, regardless of how much computing power the network has, blocks are found roughly every
                ten minutes.
              </p>
              <p className="wib-paragraph">
                The cryptographic hash function at the heart of this process has a remarkable property: any
                change to the input — even a single character — produces a completely different output. This
                means that once a block is accepted by the network, its contents are sealed. Altering any
                past transaction would require redoing all the computational work from that point forward,
                while the rest of the world&apos;s miners keep building on top of the honest chain.
              </p>
            </section>

            {/* 3.5 Scarcity */}
            <section className="wib-section" id="scarcity">
              <p className="wib-section-label">5.</p>
              <h2 className="wib-section-title">Digital scarcity and monetary sovereignty</h2>
              <p className="wib-paragraph">
                There will only ever be 21 million bitcoin. This is not a company policy or a government
                regulation — it is written directly into the protocol, enforced by the consensus of every
                node in the network. No authority can increase the supply. No emergency can justify printing
                more. The cap is absolute.
              </p>
              <p className="wib-paragraph">
                This scarcity is engineered through the halving: approximately every four years, the reward
                that miners receive for each new block is cut in half. Bitcoin began with a reward of 50 BTC
                per block. As of 2024, it stands at 3.125 BTC. This process continues until the reward
                approaches zero — at which point miners will be sustained entirely by transaction fees. The
                last bitcoin is projected to be mined around the year 2140.
              </p>
              <p className="wib-paragraph">
                This predictable, diminishing supply stands in sharp contrast to traditional currencies,
                where central banks can expand the money supply at will. Inflation — the silent erosion of
                purchasing power — is a deliberate feature of fiat monetary systems. Bitcoin, by design,
                cannot be inflated. It cannot be confiscated by decree. It exists outside the control of
                any single government, institution, or person.
              </p>
              <p className="wib-paragraph">
                In this sense, Bitcoin represents a new form of monetary sovereignty — the ability for any
                individual, anywhere in the world, to hold and transfer value without asking permission
                from anyone.
              </p>
            </section>

            {/* 3.6 Storage */}
            <section className="wib-section" id="storage">
              <p className="wib-section-label">6.</p>
              <h2 className="wib-section-title">How to store your Bitcoin</h2>
              <p className="wib-paragraph">
                &ldquo;Not your keys, not your coins.&rdquo; This is the first principle of Bitcoin
                custody, and it is worth understanding before you buy a single satoshi.
              </p>
              <p className="wib-paragraph">
                When you buy bitcoin on an exchange and leave it there, you do not truly own bitcoin. You
                own a promise from that exchange to pay you back. Exchanges can be hacked, go bankrupt, or
                freeze withdrawals. This has happened many times. True ownership means controlling your
                own private keys — the cryptographic credentials that prove your right to spend a given
                amount of bitcoin.
              </p>
              <p className="wib-paragraph">
                Wallets are the tools that manage these keys. They come in several forms, each with its
                own trade-off between convenience and security:
              </p>
              <ul className="wib-list">
                <li>
                  <strong>Hot wallets</strong> — software connected to the internet. Mobile apps like
                  BlueWallet or Blockstream Green are convenient for small amounts and everyday use, but
                  carry higher risk due to internet exposure.
                </li>
                <li>
                  <strong>Desktop wallets</strong> — programs like Sparrow Wallet or Electrum, running on
                  your computer. More control and features, suited for intermediate users.
                </li>
                <li>
                  <strong>Hardware wallets</strong> — physical devices like Ledger, Trezor, or Coldcard
                  that store your private keys offline in a dedicated chip. The most secure option for
                  significant amounts, and the recommended approach for long-term storage.
                </li>
              </ul>
              <p className="wib-paragraph">
                Every wallet generates a seed phrase: a list of 12 or 24 ordinary words that serves as the
                master backup of your wallet. Whoever has this phrase can access your funds. Write it down
                on paper, store it somewhere safe and offline, and never share it with anyone. Losing your
                seed phrase means losing your bitcoin — permanently. There is no customer service to call.
              </p>
            </section>

            {/* 3.7 Buy */}
            <section className="wib-section" id="buy">
              <p className="wib-section-label">7.</p>
              <h2 className="wib-section-title">Where to buy Bitcoin</h2>
              <p className="wib-paragraph">
                Bitcoin is bought and sold on exchanges — platforms that match buyers and sellers and
                handle the transaction. The process is straightforward: register an account, verify your
                identity (most regulated exchanges require this), deposit money, and purchase bitcoin at
                the current market price.
              </p>
              <p className="wib-paragraph">
                The most common type are centralised exchanges (CEX): platforms like Coinbase, Kraken, or
                Binance. These are user-friendly and handle the technical complexity for you. When you buy
                on a CEX, the exchange holds your bitcoin in custody — similar to how a bank holds your
                money — until you decide to withdraw it to your own wallet.
              </p>
              <p className="wib-paragraph">
                When choosing an exchange, consider the following:
              </p>
              <ul className="wib-list">
                <li><strong>Regulation and reputation</strong> — is the exchange licensed in your country? How long has it been operating?</li>
                <li><strong>Security record</strong> — has it ever been hacked? How does it protect user funds?</li>
                <li><strong>Fees</strong> — trading fees, withdrawal fees, and currency conversion costs vary significantly between platforms.</li>
                <li><strong>Ease of withdrawal</strong> — you should be able to withdraw your bitcoin to your own wallet at any time.</li>
              </ul>
              <p className="wib-paragraph">
                The golden rule after buying: withdraw to your own wallet. Exchanges are not long-term
                storage. They are a place to convert money into bitcoin — not a place to keep it.
              </p>
            </section>

            {/* 3.8 Price */}
            <section className="wib-section" id="price">
              <p className="wib-section-label">8.</p>
              <h2 className="wib-section-title">How is the price of Bitcoin determined?</h2>
              <p className="wib-paragraph">
                Bitcoin has no central authority setting its price. There is no board of directors, no
                government body, no algorithm that decides what one bitcoin is worth. The price emerges
                entirely from the interaction of buyers and sellers across thousands of exchanges worldwide.
                When more people want to buy than sell, the price rises. When more want to sell than buy,
                it falls.
              </p>
              <p className="wib-paragraph">
                Many factors influence this balance: macroeconomic conditions (inflation, interest rates,
                currency crises), regulatory developments, technological upgrades, institutional adoption,
                media coverage, and broader market sentiment. Bitcoin does not exist in a vacuum — it
                reacts to the world around it, often amplified.
              </p>
              <p className="wib-paragraph">
                The fixed supply plays a fundamental role in long-term price dynamics. With only 21 million
                coins ever available — and millions already estimated lost forever — growing demand against
                a permanently constrained supply is a powerful economic force. But short-term price
                movements are driven as much by speculation, leverage, and human emotion as by any
                fundamental analysis.
              </p>
              <p className="wib-paragraph">
                Bitcoin is highly volatile. Drops of 50% or more within a single cycle are not unusual.
                For long-term investors, this is the price of admission — and historically, the reward for
                patience has been significant. For this reason, understanding strategy matters as much as
                understanding the asset itself. See{' '}
                <a href="/investment-strategies">Investment Strategies</a> for a practical guide.
              </p>
            </section>

            {/* 3.9 Religion */}
            <section className="wib-section" id="religion">
              <p className="wib-section-label">9.</p>
              <h2 className="wib-section-title">Bitcoin as the first true religion of the 21st century</h2>
              <p className="wib-paragraph">
                Every religion is born from a wound. A recognition that something in the world is deeply
                wrong — and a belief that there is a path to something better. Bitcoin is no different.
                Its founding wound is money printing: the quiet, relentless debasement of the currency
                that ordinary people work their whole lives to accumulate. Every unit of currency printed
                without backing is a transfer of wealth from savers to those who control the press. It is
                a form of theft made invisible by complexity. Bitcoiners call it what it is: degeneracy.
                And they have dedicated themselves to ending it.
              </p>
              <p className="wib-paragraph">
                <strong>The sin of centralisation.</strong> Throughout history, every institution granted
                the power to control money has eventually abused it. Not because the people in charge are
                always evil — but because centralised power attracts corruption the way light attracts
                moths. It is structural. Inevitable. When one entity controls the ledger, the ledger
                eventually serves that entity. Bitcoin removes this possibility entirely. There is no
                ledger controller. There is no one to corrupt. The code is the law — immutable,
                transparent, and indifferent to power.
              </p>
              <p className="wib-paragraph">
                <strong>The covenant of equality.</strong> In the Bitcoin network, everyone is equal.
                Your transaction follows the same rules whether you are a billionaire or a student with
                ten euros. No one can be banned from sending or receiving. No one can be deplatformed,
                frozen out, or subjected to different fees because of who they are or where they live.
                The protocol does not discriminate. This is not just a technical property — it is a
                moral one. Bitcoiners are united by the belief that a fairer financial system is possible,
                and that the code they run every day is the closest humanity has ever come to building it.
              </p>
              <p className="wib-paragraph">
                <strong>The promise of hyperbitcoinisation.</strong> At the heart of the Bitcoin
                worldview is a prophecy: that one day, Bitcoin will become the global standard of value.
                Not a speculative asset. Not a niche technology. The foundation of a new monetary order.
                This future — called hyperbitcoinisation — would mean the end of money printing, the end
                of monetary debasement, and the beginning of an era in which governments must earn their
                citizens&apos; money rather than simply create more of it. It is an eschatological vision —
                a promised land — that drives Bitcoiners through every crash, every regulatory attack,
                and every wave of mockery from the mainstream.
              </p>
              <p className="wib-paragraph">
                Whether you call it a religion or not is a matter of definition. What is not up for debate
                is the depth of conviction, the coherence of the worldview, and the scale of the community
                that has organised itself around it. Bitcoin is not just a bet on a technology. It is a
                statement about how the world should work — and a commitment to building it.
              </p>
            </section>

            {/* Sources */}
            <section className="wib-section wib-sources" id="sources">
              <p className="wib-section-label">Further reading</p>
              <h2 className="wib-section-title">Sources &amp; Resources</h2>
              <p className="wib-paragraph">
                Bitcoin is a rabbit hole. The more you learn, the deeper it goes. The following resources
                are a good place to start — some are technical, some are accessible, all are worth your time.
              </p>
              <ul className="wib-sources-list">
                <li>
                  <a href="https://bitcoin.org/en/bitcoin-paper" target="_blank" rel="noopener noreferrer">
                    Bitcoin White Paper
                  </a>{' '}
                  — The original nine-page document by Satoshi Nakamoto that started everything.
                  Required reading.
                </li>
                <li>
                  <a href="https://learnmeabitcoin.com/" target="_blank" rel="noopener noreferrer">
                    Learn Me A Bitcoin
                  </a>{' '}
                  — One of the clearest educational resources available. Covers everything from beginner
                  guides to technical deep-dives, with an interactive blockchain explorer.
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Bitcoin" target="_blank" rel="noopener noreferrer">
                    Wikipedia — Bitcoin
                  </a>{' '}
                  — A broad, well-sourced overview of Bitcoin&apos;s history, technology, and reception.
                </li>
                <li>
                  <a href="https://bitcoin-well.gitbook.io/sovereignty-guide-by-bitcoin-well/wallets" target="_blank" rel="noopener noreferrer">
                    Bitcoin Well — Sovereignty Guide: Wallets
                  </a>{' '}
                  — A practical guide to self-custody, wallet types, and seed phrase security.
                </li>
                <li>
                  <a href="https://bitcointalk.org" target="_blank" rel="noopener noreferrer">
                    Bitcointalk.org
                  </a>{' '}
                  — The original Bitcoin forum, founded by Satoshi Nakamoto. The earliest discussions
                  about Bitcoin are still archived here.
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