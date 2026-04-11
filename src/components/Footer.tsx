type FooterVariant = 'full' | 'simple' | 'blank';

export function Footer({ variant = 'full' }: { variant?: FooterVariant }) {
  return (
    <div className="footer">
      {variant !== 'blank' && (
        <p>&copy; 2026 <strong>D.Inversions</strong> - All rights reserved</p>
      )}
      {variant === 'full' && (
        <p className="footer-note">
          Bitcoin Portfolio Tracker | Powered by{' '}
          <a href="https://www.coingecko.com/es/monedas/bitcoin" target="_blank" rel="noreferrer">
            CoinGecko API
          </a>
        </p>
      )}
    </div>
  );
}
