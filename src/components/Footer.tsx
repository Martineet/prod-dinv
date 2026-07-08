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
          <a href="https://www.kraken.com/prices/bitcoin" target="_blank" rel="noreferrer">
            Kraken API
          </a>
        </p>
      )}
    </div>
  );
}
