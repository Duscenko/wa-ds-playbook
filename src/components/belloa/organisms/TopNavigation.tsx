import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Gift, CircleUser, Search } from 'lucide-react';
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
  onGift?: () => void;
  onSearch?: () => void;
  onMenuSelect?: (item: string) => void;
}

// ─── Nav items (from Figma desktop) ──────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'sports',      label: 'Sports' },
  { id: 'live',        label: 'Live' },
  { id: 'casino',      label: 'Casino' },
  { id: 'live-casino', label: 'Live Casino' },
  { id: 'esports',     label: 'e-Sport' },
  { id: 'promotions',  label: 'Promotions' },
] as const;

// ─── Account menu (from Figma desktop dropdown) ───────────────────────────────

const ACCOUNT_MENU = [
  'Profile',
  'Safer Gambling Tools',
  'Balance',
  'Bonus',
  'Documents',
  'Deposit',
  'Withdraw',
  'Withdrawal requests',
  'Transactions Reports',
  'Logout',
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

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

// ─── Desktop sub-components ───────────────────────────────────────────────────

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
        bl-px-3 bl-py-2
        bl-rounded-lg
        hover:bl-bg-action-neutral
        bl-transition-colors bl-duration-150
        bl-flex-shrink-0
      "
    >
      <span className="bl-text-content-accent bl-text-paragraph-xs bl-font-semibold bl-leading-[16px]">
        {currency}
      </span>
      <span className="bl-text-content-primary bl-text-paragraph-xs bl-font-normal bl-leading-[16px]">
        {formattedBalance}
      </span>
    </button>
  );
}

/** Balance dropdown — Figma: w-[200px], surface/layer-2, 3 rows */
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
        bl-w-[200px]
        bl-bg-surface-layer-2
        bl-border bl-border-border-subtle
        bl-rounded-md bl-overflow-hidden
        bl-shadow-md bl-z-50
      "
    >
      <div className="bl-px-3 bl-h-10 bl-flex bl-items-center bl-border-b bl-border-border-subtle bl-text-paragraph-xs">
        <span className="bl-text-content-primary bl-font-normal">Balance&nbsp;</span>
        <span className="bl-text-content-accent bl-font-semibold">{currency} {formattedBalance}</span>
      </div>
      <div className="bl-px-3 bl-h-10 bl-flex bl-items-center bl-border-b bl-border-border-subtle bl-text-paragraph-xs">
        <span className="bl-text-content-primary bl-font-normal">Bonus balance&nbsp;</span>
        <span className="bl-text-content-accent bl-font-semibold">{currency} 0.00</span>
      </div>
      <div className="bl-h-10 bl-flex bl-items-center bl-text-paragraph-xs">
        <div className="bl-flex bl-items-center bl-justify-center bl-px-2 bl-flex-shrink-0">
          <Gift size={16} className="bl-text-content-accent" />
        </div>
        <span className="bl-text-content-primary bl-font-normal">Free bet balance&nbsp;</span>
        <span className="bl-text-content-accent bl-font-semibold">{currency} 0.00</span>
      </div>
    </div>
  );
}

/** Account button — Figma: circle-user icon + username + chevron, bg surface/layer-1 */
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
        bl-flex bl-items-center bl-gap-1
        bl-px-2 bl-py-2
        bl-bg-surface-layer-1
        bl-rounded-lg
        hover:bl-opacity-80 bl-transition-opacity bl-duration-150
        bl-flex-shrink-0
      "
    >
      <CircleUser size={20} className="bl-text-content-primary bl-flex-shrink-0" />
      <span className="bl-text-content-primary bl-text-paragraph-xs bl-font-normal bl-leading-[16px] bl-max-w-[80px] bl-truncate bl-px-0.5">
        {userName}
      </span>
      {isOpen
        ? <ChevronUp size={20} className="bl-text-content-primary bl-flex-shrink-0" />
        : <ChevronDown size={20} className="bl-text-content-primary bl-flex-shrink-0" />
      }
    </button>
  );
}

/** Account dropdown — Figma: w-[200px], surface/layer-2, 10 items */
function AccountDropdown({ onSelect }: { onSelect?: (item: string) => void }) {
  return (
    <div
      role="menu"
      aria-label="User account menu"
      className="
        bl-absolute bl-top-full bl-right-0 bl-mt-1
        bl-w-[200px]
        bl-bg-surface-layer-2
        bl-border bl-border-border-subtle
        bl-rounded-md bl-overflow-hidden
        bl-shadow-md bl-z-50
      "
    >
      {ACCOUNT_MENU.map((label, i) => (
        <button
          key={label}
          role="menuitem"
          onClick={() => onSelect?.(label)}
          className={[
            'bl-w-full bl-text-left',
            'bl-px-3 bl-h-10 bl-flex bl-items-center',
            'bl-text-content-primary bl-text-paragraph-xs bl-font-normal',
            'hover:bl-bg-surface-layer-1 bl-transition-colors bl-duration-100',
            i < ACCOUNT_MENU.length - 1 ? 'bl-border-b bl-border-border-subtle' : '',
          ].join(' ')}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Mobile sub-components ────────────────────────────────────────────────────

/** Mobile avatar — Figma: circular, bg-action-primary, first letter of name, notification dot */
function MobileAvatar({ userName, onClick }: { userName: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Account menu"
      className="bl-relative bl-flex-shrink-0 bl-size-8"
    >
      {/* Circle */}
      <span className="
        bl-flex bl-items-center bl-justify-center
        bl-size-8 bl-rounded-full
        bl-bg-action-primary
        bl-text-content-on-action
        bl-text-sm bl-font-medium
      ">
        {getInitial(userName)}
      </span>
      {/* Notification dot */}
      <span
        aria-hidden
        className="
          bl-absolute bl-top-0 bl-right-0
          bl-size-2 bl-rounded-full
          bl-bg-[#f04438]
          bl-border-2 bl-border-surface-layer-1
        "
      />
    </button>
  );
}

/** Mobile balance pill — Figma: bg-action-neutral, h-[30px], € accent + amount */
function MobileBalancePill({
  currency,
  formattedBalance,
}: {
  currency: string;
  formattedBalance: string;
}) {
  // Show currency symbol for known codes, fallback to code
  const symbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency;
  return (
    <div className="
      bl-flex bl-items-center bl-gap-1
      bl-h-[30px] bl-px-3
      bl-bg-action-neutral
      bl-rounded-lg
      bl-flex-shrink-0
    ">
      <span className="bl-text-content-accent bl-text-paragraph-xs bl-font-semibold bl-leading-[16px]">
        {symbol}
      </span>
      <span className="bl-text-content-primary bl-text-paragraph-xs bl-font-semibold bl-leading-[16px]">
        {formattedBalance}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TopNavigation({
  isLoggedIn,
  userName = 'User-name',
  balance = 0,
  currency = 'EUR',
  activeTab,
  onTabChange,
  onLogin,
  onRegister,
  onDeposit,
  onGift,
  onSearch,
  onMenuSelect,
}: TopNavigationProps) {
  const [balanceOpen, setBalanceOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const balanceRef  = useRef<HTMLDivElement>(null);
  const accountRef  = useRef<HTMLDivElement>(null);

  useClickOutside(balanceRef,  () => setBalanceOpen(false));
  useClickOutside(accountRef,  () => setAccountOpen(false));

  const formattedBalance = balance.toFixed(2);

  function toggleBalance() { setBalanceOpen((v) => !v); setAccountOpen(false); }
  function toggleAccount() { setAccountOpen((v) => !v); setBalanceOpen(false); }

  return (
    <header className="bl-w-full bl-bg-surface-layer-1 bl-border-b bl-border-white/[0.06] bl-relative">

      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP  ≥ md  — h-72px, logo + nav tabs + right actions
          ═══════════════════════════════════════════════════════════════ */}
      <div className="
        bl-hidden md:bl-flex
        bl-items-center
        bl-h-[var(--bl-header-height)]
        bl-px-5 bl-gap-12
        bl-max-w-[1440px] bl-mx-auto
      ">

        {/* Logo — Figma: max 218×57 px */}
        <div className="bl-flex-shrink-0 bl-h-[var(--bl-header-logo-container-height)] bl-w-[var(--bl-header-logo-container-width)] bl-flex bl-items-center">
          <span className="bl-text-content-accent bl-text-heading-04 bl-font-semibold bl-tracking-tight">
            Belloa
          </span>
        </div>

        {/* Nav tabs */}
        <nav aria-label="Main navigation" className="bl-flex bl-items-center bl-gap-3 bl-flex-shrink-0">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange?.(id)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'bl-relative bl-px-1 bl-py-1.5 bl-whitespace-nowrap',
                  'bl-text-paragraph-sm bl-font-bold bl-tracking-[0.5px]',
                  'bl-transition-colors bl-duration-150',
                  isActive
                    ? 'bl-text-content-accent'
                    : 'bl-text-content-secondary hover:bl-text-content-primary',
                ].join(' ')}
              >
                {label}
                {isActive && (
                  <span
                    aria-hidden
                    className="bl-absolute bl-bottom-0 bl-left-0 bl-right-0 bl-h-[1.5px] bl-bg-content-accent"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="bl-flex-1 bl-min-w-0" />

        {/* Right actions */}
        <div className="bl-flex bl-items-center bl-gap-3 bl-flex-shrink-0">
          {isLoggedIn ? (
            <>
              {/* Gift icon button */}
              <button
                onClick={onGift}
                aria-label="Gifts and promotions"
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-p-2 bl-bg-action-neutral bl-rounded-lg
                  hover:bl-opacity-80 bl-transition-opacity bl-duration-150 bl-flex-shrink-0
                "
              >
                <Gift size={20} className="bl-text-content-primary" />
              </button>

              {/* Deposit */}
              <button
                onClick={onDeposit}
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-px-3.5 bl-py-[10px]
                  bl-bg-action-primary bl-border bl-border-border-accent
                  bl-rounded-lg
                  bl-text-content-on-action bl-text-paragraph-sm bl-font-semibold bl-leading-[18px]
                  hover:bl-opacity-90 bl-transition-opacity bl-duration-150 bl-flex-shrink-0
                "
              >
                Deposit
              </button>

              {/* Balance + dropdown */}
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

              {/* Account + dropdown */}
              <div ref={accountRef} className="bl-relative">
                <AccountPill userName={userName} isOpen={accountOpen} onClick={toggleAccount} />
                {accountOpen && (
                  <AccountDropdown
                    onSelect={(item) => { setAccountOpen(false); onMenuSelect?.(item); }}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              {/* Log In */}
              <button
                onClick={onLogin}
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-px-3.5 bl-py-[10px]
                  bl-bg-action-neutral bl-rounded-lg
                  bl-text-content-primary bl-text-paragraph-sm bl-font-semibold bl-leading-[18px]
                  hover:bl-opacity-80 bl-transition-opacity bl-duration-150 bl-flex-shrink-0
                "
              >
                Log In
              </button>

              {/* Register */}
              <button
                onClick={onRegister}
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-px-3.5 bl-py-[10px]
                  bl-bg-action-primary bl-border bl-border-border-accent
                  bl-rounded-lg
                  bl-text-content-on-action bl-text-paragraph-sm bl-font-semibold bl-leading-[18px]
                  hover:bl-opacity-90 bl-transition-opacity bl-duration-150 bl-flex-shrink-0
                "
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE  < md  — h-48px, search icon + logo | compact actions
          Figma: w-360px, px-12px, no nav tabs
          ═══════════════════════════════════════════════════════════════ */}
      <div className="
        bl-flex md:bl-hidden
        bl-items-center bl-justify-between
        bl-h-12 bl-px-3
        bl-w-full
      ">

        {/* Left: search + logo */}
        <div className="bl-flex bl-items-center bl-gap-2 bl-flex-shrink-0">
          {/* Search icon — Figma: 28×28px */}
          <button
            onClick={onSearch}
            aria-label="Search"
            className="bl-flex bl-items-center bl-justify-center bl-size-7 bl-text-content-primary"
          >
            <Search size={20} />
          </button>

          {/* Logo — Figma: 110×28 (unauthenticated / variant-1) */}
          <div className="bl-h-7 bl-w-[74px] bl-flex bl-items-center">
            <span className="bl-text-content-accent bl-text-sm bl-font-semibold bl-tracking-tight">
              Belloa
            </span>
          </div>
        </div>

        {/* Right: auth-state actions */}
        <div className="bl-flex bl-items-center bl-gap-2 bl-flex-shrink-0">
          {isLoggedIn ? (
            /* Logged in — Figma: gift + balance + DEPOSIT + avatar */
            <>
              {/* Gift */}
              <button
                onClick={onGift}
                aria-label="Gifts"
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-size-[30px]
                  bl-bg-action-neutral bl-rounded-full
                  bl-text-content-primary
                  hover:bl-opacity-80 bl-transition-opacity bl-duration-150
                "
              >
                <Gift size={20} />
              </button>

              {/* Balance pill */}
              <MobileBalancePill currency={currency} formattedBalance={formattedBalance} />

              {/* DEPOSIT button */}
              <button
                onClick={onDeposit}
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-h-[30px] bl-px-2
                  bl-bg-action-primary bl-border bl-border-border-accent
                  bl-rounded-lg
                  bl-text-content-on-action bl-text-[12px] bl-font-semibold bl-leading-[16px] bl-tracking-[0.5px] bl-uppercase
                  hover:bl-opacity-90 bl-transition-opacity bl-duration-150 bl-flex-shrink-0
                "
              >
                Deposit
              </button>

              {/* Avatar */}
              <MobileAvatar
                userName={userName}
                onClick={() => { setAccountOpen((v) => !v); }}
              />
            </>
          ) : (
            /* Guest — Figma: gift + Log in + Register */
            <>
              {/* Gift */}
              <button
                onClick={onGift}
                aria-label="Gifts"
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-h-[30px] bl-px-2
                  bl-text-content-primary
                  hover:bl-opacity-80 bl-transition-opacity bl-duration-150
                "
              >
                <Gift size={20} />
              </button>

              {/* Log in */}
              <button
                onClick={onLogin}
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-h-[30px] bl-px-2
                  bl-bg-action-neutral bl-rounded-lg
                  bl-text-content-primary bl-text-[12px] bl-font-normal bl-leading-[16px]
                  hover:bl-opacity-80 bl-transition-opacity bl-duration-150 bl-flex-shrink-0
                "
              >
                Log in
              </button>

              {/* Register */}
              <button
                onClick={onRegister}
                className="
                  bl-flex bl-items-center bl-justify-center
                  bl-h-[30px] bl-px-2
                  bl-bg-action-primary bl-border bl-border-border-accent
                  bl-rounded-lg
                  bl-text-content-on-action bl-text-[12px] bl-font-normal bl-leading-[16px]
                  hover:bl-opacity-90 bl-transition-opacity bl-duration-150 bl-flex-shrink-0
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
