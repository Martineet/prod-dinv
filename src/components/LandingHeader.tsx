'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChangePasswordModal } from '@/components/ChangePasswordModal';
import { MemberSettingsModal } from '@/components/MemberSettingsModal';
import { SettingsMenu } from '@/components/SettingsMenu';
import { formatMoneyRounded } from '@/lib/format';
import { useAuth } from '@/hooks/useAuth';
import { useBtcPrice } from '@/hooks/useBtcPrice';

const EUR = '\u20AC';

const NAV_LINKS = [
  { label: 'What is Bitcoin?', href: '/what-is-bitcoin' },
  { label: 'Investment strategies', href: '/investment-strategies' },
  { label: 'Metrics', href: '/metrics' },
  { label: 'Buy Bitcoin', href: '/buy-bitcoin' },
  { label: 'Tribute', href: '/tribute' },
];

export function LandingHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { session, loading, signOut } = useAuth();
  const { price: btcPrice } = useBtcPrice();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const displayPrice = btcPrice ? `${formatMoneyRounded(btcPrice)} ${EUR}` : `-- ${EUR}`;
  const isLoggedIn = !loading && Boolean(session);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handler = (e: globalThis.MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !hamburgerRef.current?.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMobileMenuOpen]);

  const openMembersZone = () => {
    setIsMobileMenuOpen(false);
    if (pathname !== '/') {
      sessionStorage.setItem('open_members_zone', '1');
      router.push('/');
      return;
    }
    window.dispatchEvent(new CustomEvent('open-members-zone'));
  };

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetPath = isLoggedIn ? '/dashboard' : '/';
    if (pathname !== targetPath) {
      router.push(targetPath);
    }
  };

  return (
    <header className="landing-top-nav" role="banner">
      <div className="landing-top-nav-left">
        <div className="nav-brand-logo" aria-hidden="true">
          <img src="/log1.png" alt="" />
        </div>
        <a
          href={isLoggedIn ? '/dashboard' : '/'}
          className="header-title nav-title-link"
          onClick={handleBrandClick}
        >
          D.Inversions
        </a>
        <div id="headerBtcPrice" className="header-btc-price">
          {displayPrice}
        </div>
      </div>

      {/* Desktop nav links */}
      <nav className="landing-top-nav-middle" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-link${pathname === link.href ? ' nav-link-active' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Desktop right: Members Zone or account settings */}
      <div className="landing-top-nav-right">
        {isLoggedIn ? (
          <SettingsMenu
            onSettings={() => setIsSettingsOpen(true)}
            onChangePassword={() => setIsChangePasswordOpen(true)}
            onLogout={() => signOut()}
          />
        ) : (
          <button type="button" className="members-zone-btn" onClick={openMembersZone}>
            Members Zone
          </button>
        )}
      </div>

      {/* Mobile hamburger button */}
      <button
        ref={hamburgerRef}
        type="button"
        className={`nav-hamburger${isMobileMenuOpen ? ' is-open' : ''}`}
        onClick={() => setIsMobileMenuOpen((v) => !v)}
        aria-label="Toggle navigation"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="nav-hamburger-line" />
        <span className="nav-hamburger-line" />
        <span className="nav-hamburger-line" />
      </button>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div ref={menuRef} className="nav-mobile-menu" role="navigation" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-mobile-link${pathname === link.href ? ' nav-mobile-link-active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="nav-mobile-separator" />
          {isLoggedIn ? (
            <SettingsMenu
              onSettings={() => { setIsSettingsOpen(true); setIsMobileMenuOpen(false); }}
              onChangePassword={() => { setIsChangePasswordOpen(true); setIsMobileMenuOpen(false); }}
              onLogout={() => signOut()}
            />
          ) : (
            <button type="button" className="members-zone-btn" onClick={openMembersZone}>
              Members Zone
            </button>
          )}
        </div>
      )}

      {/* Modals — rendered once regardless of mobile/desktop */}
      <MemberSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <ChangePasswordModal isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
    </header>
  );
}
