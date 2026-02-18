import { useState, useRef, useEffect } from 'react';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';
import '../../../styles/belloa.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TopNavigationProps {
  isLoggedIn: boolean;
  userName?: string;
  /** Formatted balance value (e.g. 142.50) */
  balance?: number;
  /** ISO currency code shown as the teal label (e.g. "EUR") */
  currency?: string;
  /** id of the currently active nav tab */
  activeTab: string;
  onTabChange?: (tabId: string) => void;
  onLogin?: () => void;
  onRegister?: () => void;
  onDeposit?: () => void;
  onMenuSelect?: (item: string) => void;
}

// ─── Nav items (from Figma) ───────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'sports', label: 'Sports' },
  { id: 'live', label: 'Live' },
  { id: 'casino', label: 'Casino' },
  { id: 'live-casino', label: 'Live Casino' },
  { id: 'esports', label: 'eSports' },
  { id: 'promotions', label: 'Promotions' },
] as const;

// ─── Account menu (from Figma dropdown — 9 items with separators) ─────────────

const ACCOUNT_MENU: { label: string; separator?: boolean }[] = [
  { label: 'My Account' },
  { label: 'My Bets', separator: true },
  { label: 'Transactions', separator: true },
  { label: 'Bonuses', separator: true },
  { label: 'Responsible Gambling', separator: true },
  { label: 'Documents', separator: true },
  { label: 'Notifications', separator: true },
  { label: 'Settings', separator: true },
  { label: 'Log Out', separator: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Circular icon button — used for Mail notification */
function IconButton({ children, onClick, label }: {
  children: React.ReactNode;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="
        bl-flex bl-items-center bl-justify-center
        bl-w-8 bl-h-8 bl-rounded-full
        bl-bg-surface-page
        bl-text-content-secondary
        hover:bl-text-content-primary
        bl-transition-colors bl-duration-150
        bl-flex-shrink-0
      "
    >
      {children}
    </button>
  );
}

/** Vertical rule separator (used between Mail icon and Deposit button) */
function Separator() {
  return (
    <div className="bl-w-px bl-h-4 bl-bg-white/[0.15] bl-flex-shrink-0" aria-hidden />
  );
}

/** Balance pill — teal currency label + amount. Figma: bg action/neutral, rounded-sm */
function BalancePill({
  currency,
  formattedBalance,
  isOpen,
  onClick,
}: {
  currency: string;
  formattedBalance: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      aria-haspopup="true"
      className="
        bl-flex bl-items-center bl-gap-1
        bl-px-2 bl-py-1.5
        bl-bg-action-neutral
        bl-rounded-sm
        hover:bl-opacity-80 bl-transition-opacity bl-duration-150
        bl-flex-shrink-0
      "
    >
      <span className="bl-text-content-accent bl-text-paragraph-xs bl-font-semibold bl-leading-[14px]">
        {currency}
      </span>
      <span className="bl-text-content-primary bl-text-paragraph-xs bl-font-normal bl-leading-[14px]">
        {formattedBalance}
      </span>
      {isOpen
        ? <ChevronUp size={12} className="bl-text-content-subtle bl-flex-shrink-0" />
        : <ChevronDown size={12} className="bl-text-content-subtle bl-flex-shrink-0" />
      }
    </button>
  );
}

/** Balance dropdown — appears below BalancePill. Figma: w-[200px], layer-1 bg */
function BalanceDropdown({
  currency,
  formattedBalance,
}: {
  currency: string;
  formattedBalance: string;
}) {
  return (
    <div
      role="dialog"
      aria-label="Wallet balance"
      className="
        bl-absolute bl-top-full bl-right-0 bl-mt-1
        bl-w-[var(--bl-dropdown-width-lg)]
        bl-bg-surface-layer-1
        bl-border bl-border-border-subtle
        bl-rounded-md bl-overflow-hidden
        bl-shadow-md bl-z-50
      "
    >
      {/* Balance row */}
      <div className="bl-px-3 bl-py-2 bl-text-paragraph-xs bl-leading-[14px]">
        <span className="bl-text-content-subtle bl-font-normal">Balance </span>
        <span className="bl-text-content-primary bl-font-semibold">
          {currency} {formattedBalance}
        </span>
      </div>

      {/* Separator */}
      <div className="bl-h-px bl-bg-border-default" aria-hidden />

      {/* Bonus balance row */}
      <div className="bl-px-3 bl-py-2 bl-text-paragraph-xs bl-leading-[14px]">
        <span className="bl-text-content-subtle bl-font-normal">Bonus balance </span>
        <span className="bl-text-content-primary bl-font-semibold">{currency} 0.00</span>
      </div>
    </div>
  );
}

/** Username pill with avatar initial + chevron. Figma: bg surface/layer-1, rounded-sm */
function AccountPill({
  userName,
  isOpen,
  onClick,
}: {
  userName: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      className="
        bl-flex bl-items-center bl-gap-2
        bl-pl-1 bl-pr-2
        bl-h-8
        bl-bg-surface-layer-1
        bl-rounded-sm
        hover:bl-opacity-80 bl-transition-opacity bl-duration-150
        bl-flex-shrink-0
      "
    >
      {/* Avatar circle — Figma: bg action/primary, text content/on-action */}
      <div
        aria-hidden
        className="
          bl-flex bl-items-center bl-justify-center
          bl-w-6 bl-h-6 bl-rounded-full
          bl-bg-action-primary
          bl-text-content-on-action
          bl-text-[10px] bl-font-semibold
          bl-flex-shrink-0
        "
      >
        {initials(userName)}
      </div>

      <span className="bl-text-content-primary bl-text-paragraph-xs bl-font-normal bl-leading-[14px] bl-max-w-[80px] bl-truncate">
        {userName}
      </span>

      {isOpen
        ? <ChevronUp size={14} className="bl-text-content-subtle bl-flex-shrink-0" />
        : <ChevronDown size={14} className="bl-text-content-subtle bl-flex-shrink-0" />
      }
    </button>
  );
}

/** Account dropdown menu. Figma: w-[163px], border-subtle, rounded-md, 9 items */
function AccountDropdown({ onSelect }: { onSelect?: (item: string) => void }) {
  return (
    <div
      role="menu"
      aria-label="User account menu"
      className="
        bl-absolute bl-top-full bl-right-0 bl-mt-1
        bl-w-[var(--bl-dropdown-width-md)]
        bl-bg-surface-layer-1
        bl-border bl-border-border-subtle
        bl-rounded-md bl-overflow-hidden
        bl-shadow-md bl-z-50
      "
    >
      {ACCOUNT_MENU.map(({ label, separator }, i) => (
        <div key={label}>
          {separator && i > 0 && (
            <div className="bl-h-px bl-bg-border-default" aria-hidden />
          )}
          <button
            role="menuitem"
            onClick={() => onSelect?.(label)}
            className="
              bl-w-full bl-text-left
              bl-px-3 bl-py-[5.5px]
              bl-text-content-primary bl-text-paragraph-sm bl-font-normal
              hover:bl-bg-surface-layer-2
              bl-transition-colors bl-duration-100
            "
          >
            {label}
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TopNavigation({
  isLoggedIn,
  userName = 'User',
  balance = 0,
  currency = 'EUR',
  activeTab,
  onTabChange,
  onLogin,
  onRegister,
  onDeposit,
  onMenuSelect,
}: TopNavigationProps) {
  const [balanceOpen, setBalanceOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const balanceRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useClickOutside(balanceRef, () => setBalanceOpen(false));
  useClickOutside(accountRef, () => setAccountOpen(false));

  const formattedBalance = balance.toFixed(2);

  function toggleBalance() {
    setBalanceOpen((v) => !v);
    setAccountOpen(false);
  }

  function toggleAccount() {
    setAccountOpen((v) => !v);
    setBalanceOpen(false);
  }

  return (
    /* Figma: bg surface/layer-2, h-[72px], border-b rgba(255,255,255,0.06) */
    <header className="bl-w-full bl-bg-surface-layer-2 bl-border-b bl-border-white/[0.06] bl-relative">
      <div className="bl-flex bl-items-center bl-h-[var(--bl-header-height)] bl-px-5 bl-gap-12 bl-max-w-[1440px] bl-mx-auto">

        {/* ── Logo ── Figma: max 218×57 px ── */}
        <div className="bl-flex-shrink-0 bl-h-[var(--bl-header-logo-container-height)] bl-w-[var(--bl-header-logo-container-width)] bl-flex bl-items-center">
          {/*
            Replace this placeholder with:
            <img src={logoSrc} alt="Belloa" className="bl-h-full bl-w-full bl-object-contain" />
          */}
          <span className="bl-text-content-accent bl-text-heading-04 bl-font-semibold bl-tracking-tight">
            Belloa
          </span>
        </div>

        {/* ── Navigation items ── */}
        <nav aria-label="Main navigation" className="bl-flex bl-items-center bl-gap-3 bl-flex-shrink-0">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange?.(id)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'bl-relative bl-px-3 bl-py-1.5 bl-whitespace-nowrap',
                  'bl-text-paragraph-sm bl-font-medium',
                  'bl-transition-colors bl-duration-150',
                  isActive
                    ? 'bl-text-content-accent bl-font-semibold'
                    : 'bl-text-content-secondary hover:bl-text-content-primary',
                ].join(' ')}
              >
                {label}
                {/* Active underline indicator */}
                {isActive && (
                  <span
                    aria-hidden
                    className="
                      bl-absolute bl-bottom-0 bl-left-2 bl-right-2
                      bl-h-[2px] bl-bg-content-accent bl-rounded-full
                    "
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Spacer ── */}
        <div className="bl-flex-1 bl-min-w-0" />

        {/* ── Right-side actions ── */}
        <div className="bl-flex bl-items-center bl-gap-3 bl-flex-shrink-0">

          {isLoggedIn ? (
            /* ── Authenticated state ── */
            <>
              {/* Mail / notifications */}
              <IconButton label="Notifications">
                <Mail size={16} />
              </IconButton>

              {/* Visual separator — Figma: 1px, h-4, rgba(0,0,47,0.15) */}
              <Separator />

              {/* Deposit CTA — Figma: bg action/primary, border-2 white/12, rounded-lg */}
              <button
                onClick={onDeposit}
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-px-3 bl-py-2
                  bl-bg-action-primary
                  bl-border-2 bl-border-white/[0.12]
                  bl-rounded-lg
                  bl-text-content-on-action bl-text-paragraph-sm bl-font-semibold bl-leading-[18px]
                  bl-shadow-xs
                  hover:bl-opacity-90 bl-transition-opacity bl-duration-150
                  bl-flex-shrink-0
                "
              >
                Deposit
              </button>

              {/* Balance pill + dropdown */}
              <div ref={balanceRef} className="bl-relative">
                <BalancePill
                  currency={currency}
                  formattedBalance={formattedBalance}
                  isOpen={balanceOpen}
                  onClick={toggleBalance}
                />
                {balanceOpen && (
                  <BalanceDropdown currency={currency} formattedBalance={formattedBalance} />
                )}
              </div>

              {/* Account pill + dropdown */}
              <div ref={accountRef} className="bl-relative">
                <AccountPill
                  userName={userName}
                  isOpen={accountOpen}
                  onClick={toggleAccount}
                />
                {accountOpen && (
                  <AccountDropdown
                    onSelect={(item) => {
                      setAccountOpen(false);
                      onMenuSelect?.(item);
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            /* ── Guest / Unauthenticated state ── */
            <>
              {/* Login — Figma: bg action/neutral, border border-default, rounded-lg */}
              <button
                onClick={onLogin}
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-px-3.5 bl-py-[10px]
                  bl-bg-action-neutral
                  bl-border bl-border-border-default
                  bl-rounded-lg
                  bl-text-content-secondary bl-text-paragraph-sm bl-font-medium bl-leading-[18px]
                  bl-shadow-xs
                  hover:bl-text-content-primary bl-transition-colors bl-duration-150
                  bl-flex-shrink-0
                "
              >
                Log In
              </button>

              {/* Register — Figma: bg action/primary, border-2 white/12, rounded-lg */}
              <button
                onClick={onRegister}
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-px-3.5 bl-py-[10px]
                  bl-bg-action-primary
                  bl-border-2 bl-border-white/[0.12]
                  bl-rounded-lg
                  bl-text-content-on-action bl-text-paragraph-sm bl-font-semibold bl-leading-[18px]
                  bl-shadow-xs
                  hover:bl-opacity-90 bl-transition-opacity bl-duration-150
                  bl-flex-shrink-0
                "
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
