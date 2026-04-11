import { LandingHeader } from '@/components/LandingHeader';
import { Footer } from '@/components/Footer';

export default function TributePage() {
  return (
    <>
      <LandingHeader />
      <main className="tribute-shell">
        <div className="tribute-content">

          {/* Header */}
          <div className="tribute-header">
            <div className="tribute-logo-wrap">
              <img src="/bitcoin-btc-logo.svg" alt="Bitcoin" className="tribute-logo" />
            </div>
            <h1 className="tribute-title">Tribute</h1>
            <p className="tribute-subtitle">In the name of the chain, the block, and the holy hash</p>
          </div>

          {/* Section I — The Genesis Block */}
          <section className="tribute-section">
            <h2 className="tribute-section-title">I. The Genesis Block</h2>
            <p className="tribute-paragraph">
              It all started on 03/01/2009, when Satoshi Nakamoto set the genesis block in our world.
              In the beginning, there was chaos — central banks printing money without restraint, governments
              bailing out the very institutions that had brought the world to its knees. And from that chaos,
              a single block was born. Block zero. The foundation of everything.
            </p>
            <p className="tribute-paragraph">
              Satoshi did not merely write code. He wrote a manifesto. Buried inside the genesis block,
              immutable and eternal, is a message that shall never be erased from the ledger of history:
            </p>
            <blockquote className="tribute-embed-quote">
              &ldquo;The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.&rdquo;
            </blockquote>
            <p className="tribute-paragraph">
              These words were not chosen at random. They were a declaration. A timestamp of humanity&apos;s failure,
              sealed forever into the first block of a new monetary order. The old world had crumbled under the
              weight of its own corruption, and Satoshi planted his flag in its ruins.
            </p>
            <p className="tribute-paragraph">
              The genesis block carried 50 BTC — a reward deliberately made unspendable, as if to say: this is
              not about profit. This is about principle. And in the six days that passed before the next block
              was mined, some saw the echo of Genesis itself — creation unfolding in silence, one block at a time.
            </p>
            <p className="tribute-paragraph">
              To this day, believers from every corner of the earth send satoshis to the address of the genesis block —
              not to move them, not to spend them, but as an act of gratitude. A digital offering. A tithe to the
              protocol that set us free. You may witness these tributes at the address that started it all:
            </p>
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
            <p className="tribute-paragraph">
              Every satoshi sent there is a prayer. Every transaction, a confession of faith.
            </p>
            <div className="tribute-commandment">
              <span className="tribute-commandment-text">Verify, don&apos;t trust</span>
            </div>
          </section>

          {/* Section II — The Promise */}
          <section className="tribute-section">
            <h2 className="tribute-section-title">II. The Promise</h2>
            <p className="tribute-paragraph">
              Bitcoin was born as a promise. A promise that real money — truly free money — is possible.
              For millennia, those who controlled the printing press controlled the world. Every new bill
              printed in secret is a silent tax on those who hold savings. A theft without a thief, a crime
              without a court.
            </p>
            <p className="tribute-paragraph">
              Money printing is not a neutral act. When a government creates currency from nothing, it dilutes
              the purchasing power of every worker who spent years accumulating savings. The baker, the nurse,
              the teacher — they did not consent. They were never asked. And yet their wealth was diminished
              so that institutions deemed &ldquo;too big to fail&rdquo; could survive their own recklessness.
            </p>
            <p className="tribute-paragraph">
              Bitcoin breaks this covenant of corruption. It is governed not by the whims of men, but by
              mathematics. Its supply is fixed — 21 million coins, no more, no less — written not in ink
              but in code, enforced not by armies but by consensus. No president, no central bank, no
              parliament can change it. The protocol does not negotiate.
            </p>
            <p className="tribute-paragraph">
              In a world of hard money, prices stop rising without reason. The things we need to live —
              food, shelter, healthcare — cease to be made artificially expensive by monetary debasement.
              And in a world where war must be financed by the people who fight it, governments must
              convince their citizens before marching them into battle. War becomes expensive in the
              truest sense. Peace becomes cheaper.
            </p>
            <p className="tribute-paragraph">
              This is the promise of Bitcoin. Not merely an investment. A reformation of the social contract
              between citizens and the state. A separation of money and power, as sacred and as necessary
              as any separation of church and state before it.
            </p>
            <div className="tribute-commandment">
              <span className="tribute-commandment-text">Not your keys, not your coins</span>
            </div>
          </section>

          {/* Section III — The Journey */}
          <section className="tribute-section">
            <h2 className="tribute-section-title">III. The Journey</h2>
            <p className="tribute-paragraph">
              The path was never meant to be easy. Those who expected comfort were not paying attention.
              The journey of the true bitcoiner is one of endurance — of watching the number fall and
              choosing to stay, of watching the world mock and choosing to believe.
            </p>
            <p className="tribute-paragraph">
              Volatility is not a flaw. It is the toll. It is the price the market charges for the
              privilege of holding sound money before the rest of the world understands its value.
              Every crash is a test of conviction. Every bear market a pilgrimage through the desert.
              And like the desert, it ends — not for those who turned back, but for those who kept walking.
            </p>
            <p className="tribute-paragraph">
              Every great discipline demands sacrifice. Nothing of worth is earned without cost. The ascetic
              who endures cold knows something the comfortable man does not. The warrior who trains in
              darkness is ready when the light comes. Bitcoin demands the same: sit with the discomfort.
              Watch the price drop. Do not sell. The protocol rewards patience with a ferocity that no
              other asset in history has matched. No pain, no sovereignty.
            </p>
            <p className="tribute-paragraph">
              HODL is not a meme. It is a practice. A discipline. The HODLer does not react — they
              observe, they breathe, and they hold. The DCA practitioner does not try to time the
              market — they buy every month, in rain and in storm, in bull and in bear, because they
              understand that in the long arc of Bitcoin&apos;s existence, the price of entry matters less
              than the fact of entry.
            </p>
            <p className="tribute-paragraph">
              The weak give up. The faithful remain. And those who remain inherit the fruits of a
              network that grows stronger with every block, with every new believer, with every nation
              that tries to stop it and fails.
            </p>
            <div className="tribute-commandment">
              <span className="tribute-commandment-text">HODL</span>
            </div>
          </section>

          {/* Section IV — The Bitcoin Pizza Day */}
          <section className="tribute-section">
            <h2 className="tribute-section-title">IV. The Bitcoin Pizza Day</h2>
            <p className="tribute-paragraph">
              On the 22nd of May, 2010, a transaction was made that history would never forget.
              Ten thousand bitcoin were exchanged for two pizzas — the first time the protocol had
              ever been used to purchase something tangible in the real world.
            </p>
            <p className="tribute-paragraph">
              No one laughed at the time. There was nothing to laugh at. The world did not yet believe
              Bitcoin could hold value — most assumed it never would. The man who made that purchase
              was not reckless. He was a pioneer. He simply wanted to prove that the network could
              work — that value could move between people without a bank, without permission, without
              intermediary. And it did. Two pizzas confirmed what a white paper had only promised.
            </p>
            <p className="tribute-paragraph">
              History would later call it the most expensive pizza ever bought. But that framing
              misses the point entirely. No one was HODLing then. No one foresaw the price. What
              mattered was the proof — that Bitcoin was not a theory. It was money. Real, functioning,
              borderless money. And the man who spent it became a cornerstone of the movement, not
              despite the transaction, but because of it.
            </p>
            <p className="tribute-paragraph">
              Every year on May 22nd, the community remembers. Not with mourning for the coins spent,
              but with gratitude for the act of faith that gave Bitcoin its first heartbeat in the
              physical world. All great things start small. Bitcoin began with two pizzas.
            </p>
            <div className="tribute-commandment">
              <span className="tribute-commandment-text">Stay humble, stack sats</span>
            </div>
          </section>

          {/* Section V — The Martyrs */}
          <section className="tribute-section">
            <h2 className="tribute-section-title">V. The Martyrs</h2>
            <p className="tribute-paragraph">
              No faith is built without sacrifice. And Bitcoin has its martyrs — those who gave
              everything, willingly or not, so that the network could find its way.
            </p>
            <p className="tribute-paragraph">
              There are the early believers who mined thousands of coins on laptops, then discarded
              hard drives when Bitcoin seemed like nothing. There are those who wrote seed phrases
              on scraps of paper now lost to floods, fires, and the carelessness of youth. There are
              the ones who locked themselves out of wallets holding fortunes they could not reach,
              staring at a string of characters they had forgotten, one wrong digit separating them
              from liberation.
            </p>
            <p className="tribute-paragraph">
              There are those who traded on Silk Road, believing in financial freedom before the law
              caught up with the dream. There are the victims of Mt. Gox — hundreds of thousands
              of believers who woke one morning to find their exchange had crumbled, their coins gone,
              their trust shattered. There are those who were hacked, phished, and scammed by the
              wolves that circle every new frontier.
            </p>
            <p className="tribute-paragraph">
              And yet — the network survived. Every attack, every scandal, every obituary written by
              those who declared Bitcoin dead, was answered by the same thing: the next block. And the
              one after that. And the one after that. The blockchain did not mourn. It continued.
            </p>
            <p className="tribute-paragraph">
              The martyrs paid the price of early faith. Their sacrifice, whether chosen or imposed,
              helped forge a network battle-tested and unbroken. We remember them. We build on what
              they lost.
            </p>
            <div className="tribute-commandment">
              <span className="tribute-commandment-text">Bitcoin, not shitcoins</span>
            </div>
          </section>

          {/* Section VI — The Cypherpunks */}
          <section className="tribute-section">
            <h2 className="tribute-section-title">VI. The Cypherpunks</h2>
            <p className="tribute-paragraph">
              With Satoshi, there were the cypherpunks. They did not seek fame. They sought freedom.
              In mailing lists and encrypted messages, they dreamed of a world where privacy was a
              right, not a privilege — where cryptography could protect the individual from the
              overreach of states and corporations.
            </p>
            <p className="tribute-paragraph">
              So this tribute is for all of them. For the cypherpunks who dreamed. For the miners who
              kept the blocks coming when Bitcoin was worth nothing and the electricity bill was real.
              For the developers who wrote code they would never profit from. For the evangelists who
              explained Bitcoin to a skeptical world one conversation at a time. For the HODLers who
              refused to sell when everyone told them to. For the martyrs who lost. For the curious
              who became believers. For the believers who became proof.
            </p>
            <p className="tribute-paragraph">
              You are the church with no walls, the congregation with no clergy, the faith with no
              doctrine except the code. You are the reason Bitcoin lives. You are the reason it will
              continue to live long after all of us have gone.
            </p>
            <div className="tribute-commandment">
              <span className="tribute-commandment-text">Run your own node</span>
            </div>
          </section>

          {/* Closing verse */}
          <p className="tribute-closing-verse">
            The genesis block still stands. The network still runs. And every ten minutes, a new
            block is found — a new verse added to the scripture of the longest chain.
          </p>

          {/* Signature */}
          <div className="tribute-signature">
            <p className="tribute-signature-line">A random bitcoiner</p>
            <p className="tribute-signature-line tribute-signature-ff">FF</p>
          </div>

        </div>
      </main>
      <Footer variant="blank" />
    </>
  );
}