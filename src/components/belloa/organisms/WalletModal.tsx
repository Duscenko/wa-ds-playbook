import { useState, useRef, useEffect } from 'react';
import { Wallet, X, ChevronDown, ArrowRight, History, Info, Check } from 'lucide-react';
import '../../../styles/belloa.css';

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */

type ActiveTab = 'overview' | 'deposit' | 'withdrawal';

export interface PaymentProvider {
  id: string;
  name: string;
  /** URL to the provider logo (39×28 badge, white bg) */
  logo: string;
}

export interface WalletModalProps {
  balance?: number;
  cashBalance?: number;
  bonus?: number;
  providers?: PaymentProvider[];
  onClose?: () => void;
  onSeeDetails?: () => void;
  onPaymentHistory?: () => void;
  onContinueDeposit?: (provider: PaymentProvider) => void;
  onContinueWithdrawal?: (provider: PaymentProvider) => void;
}

/* ─────────────────────────────────────────────────────────
   Default payment providers
───────────────────────────────────────────────────────── */

const DEFAULT_PROVIDERS: PaymentProvider[] = [
  {
    id: 'net-havale',
    name: 'Net Havale',
    logo: 'https://www.figma.com/api/mcp/asset/18b20239-4cd4-417d-9919-96bddd35d8e7',
  },
  {
    id: 'secure-bank',
    name: 'Secure bank transfer',
    logo: 'https://www.figma.com/api/mcp/asset/f5ec7986-1e58-43c2-b2b1-d1364b50a444',
  },
  {
    id: 'mkarekod',
    name: 'Mkarekod QR',
    logo: 'https://www.figma.com/api/mcp/asset/147a2379-c9ed-4971-a6b5-0f23d28d492a',
  },
  {
    id: 'papara',
    name: 'Papara Plus',
    logo: 'https://www.figma.com/api/mcp/asset/a74178cf-b1d3-4ce0-9752-646982b7562b',
  },
  {
    id: 'kripto',
    name: 'Kripto',
    logo: 'https://www.figma.com/api/mcp/asset/8f400337-941d-4f91-ae98-7c233abd136b',
  },
  {
    id: 'hybrid',
    name: 'Hybridchain',
    logo: 'https://www.figma.com/api/mcp/asset/883fde73-2c2e-44cc-92e4-35397e1b3ef6',
  },
  {
    id: 'ahl',
    name: 'AHL Pay',
    logo: 'https://www.figma.com/api/mcp/asset/44958162-7f17-4213-bcd0-e7b38e072f7a',
  },
];

/* ─────────────────────────────────────────────────────────
   TabBar — segmented control (Overview / Deposit / Withdrawal)
───────────────────────────────────────────────────────── */

function TabBar({
  active,
  onChange,
}: {
  active: ActiveTab;
  onChange: (tab: ActiveTab) => void;
}) {
  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'overview',   label: 'Overview'   },
    { id: 'deposit',    label: 'Deposit'    },
    { id: 'withdrawal', label: 'Withdrawal' },
  ];

  return (
    <div
      role="tablist"
      className="bl-flex bl-gap-xs bl-px-xl bl-py-md bl-border-b bl-border-border-subtle"
    >
      {tabs.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={[
              'bl-flex-1 bl-flex bl-items-center bl-justify-center',
              'bl-px-xl bl-py-[10px]',
              'bl-rounded-xl bl-border',
              'bl-text-paragraph-sm bl-font-medium',
              'bl-whitespace-nowrap',
              'bl-transition-colors bl-duration-150',
              isActive
                ? 'bl-bg-action-secondary bl-border-border-active bl-text-content-accent'
                : 'bl-bg-action-neutral   bl-border-border-subtle  bl-text-content-secondary hover:bl-opacity-80',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   OverviewPanel — balance card + stats row
───────────────────────────────────────────────────────── */

function OverviewPanel({
  balance,
  cashBalance,
  bonus,
  onSeeDetails,
}: {
  balance: number;
  cashBalance: number;
  bonus: number;
  onSeeDetails?: () => void;
}) {
  const fmt = (n: number): string => `€${n.toFixed(2)}`;

  return (
    <div
      role="tabpanel"
      aria-label="Overview"
      className="bl-flex bl-flex-col bl-gap-2xl bl-px-xl bl-pt-xl bl-pb-2xl"
    >
      {/* Balance card */}
      <div className="bl-bg-surface-layer-1 bl-border bl-border-border-subtle bl-rounded-xl bl-p-xl bl-flex bl-flex-col bl-gap-[4px]">
        <span
          className="bl-text-paragraph-xs bl-font-normal bl-text-content-secondary"
          style={{ opacity: 0.9 }}
        >
          Available to Withdraw
        </span>
        <span className="bl-text-heading-02 bl-font-semibold bl-text-content-primary">
          {fmt(balance)}
        </span>
      </div>

      {/* Stats row */}
      <div className="bl-flex bl-gap-xl bl-items-start bl-border-t bl-border-border-subtle bl-pt-[13px]">

        {/* Cash Balance */}
        <div className="bl-flex-1 bl-flex bl-flex-col bl-gap-[6px]">
          <span
            className="bl-text-paragraph-xs bl-font-normal bl-text-content-subtle"
            style={{ opacity: 0.8 }}
          >
            CASH BALANCE
          </span>
          <span className="bl-text-heading-04 bl-font-semibold bl-text-content-secondary">
            {fmt(cashBalance)}
          </span>
        </div>

        {/* Bonus */}
        <div className="bl-flex-1 bl-flex bl-flex-col bl-gap-[6px] bl-items-center">
          <span
            className="bl-text-paragraph-xs bl-font-normal bl-text-content-subtle bl-text-center"
            style={{ opacity: 0.8 }}
          >
            BONUS
          </span>
          <span className="bl-text-heading-04 bl-font-semibold bl-text-content-secondary bl-text-center">
            {bonus === 0 ? '€.00' : fmt(bonus)}
          </span>
        </div>

        {/* Pending */}
        <div className="bl-flex-1 bl-flex bl-flex-col bl-gap-[6px] bl-items-end">
          <span
            className="bl-text-paragraph-xs bl-font-normal bl-text-content-subtle bl-text-right"
            style={{ opacity: 0.8 }}
          >
            PENDING
          </span>
          <button
            onClick={onSeeDetails}
            className="
              bl-text-paragraph-sm bl-font-medium bl-text-content-subtle
              bl-underline bl-decoration-solid bl-text-right
              hover:bl-text-content-secondary
              bl-transition-colors bl-duration-150
            "
          >
            See details
          </button>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SelectorControl — the combobox trigger (3 visual states)

   State 1 — empty   : subtle border, bank placeholder icon, secondary text
   State 2 — open    : active (teal) border, chevron rotated 180°
   State 3 — selected: success (green) border on both control & badge,
                       two-line label ("Selected" + method name bold)
───────────────────────────────────────────────────────── */

function SelectorControl({
  selected,
  isOpen,
  onClick,
  onKeyDown,
  controlId,
  menuId,
}: {
  selected: PaymentProvider | null;
  isOpen: boolean;
  onClick: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  controlId?: string;
  menuId?: string;
}) {
  const borderClass = isOpen
    ? 'bl-border-border-active'
    : selected
      ? 'bl-border-border-success'
      : 'bl-border-border-subtle';

  const badgeBorderClass = selected && !isOpen
    ? 'bl-border-border-success'
    : 'bl-border-border-subtle';

  return (
    <div
      id={controlId}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={menuId}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={[
        'bl-flex bl-items-center bl-h-[61px]',
        'bl-bg-action-neutral bl-border',
        borderClass,
        'bl-rounded-lg bl-shadow-xs',
        'bl-overflow-hidden bl-cursor-pointer bl-select-none',
        'bl-transition-colors bl-duration-150',
      ].join(' ')}
    >
      {/* Left decoration: badge + right divider */}
      <div className="bl-flex bl-items-center bl-self-stretch bl-pr-[14px] bl-py-sm bl-border-r bl-border-border-subtle bl-flex-shrink-0">
        <div
          className={[
            'bl-w-[39px] bl-h-[28px] bl-bg-[#FFFFFD]',
            'bl-border',
            badgeBorderClass,
            'bl-rounded-md bl-overflow-hidden',
            'bl-flex bl-items-center bl-justify-center bl-flex-shrink-0',
            'bl-transition-colors bl-duration-150',
          ].join(' ')}
        >
          {selected ? (
            <img
              src={selected.logo}
              alt={selected.name}
              className="bl-w-[32px] bl-max-h-[24px] bl-object-contain bl-block"
            />
          ) : (
            /* Bank/building icon placeholder */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3L2 9H22L12 3Z" stroke="#888" strokeWidth="1.5" strokeLinejoin="round" />
              <rect x="4"  y="10" width="2" height="7" rx="0.5" fill="#888" />
              <rect x="8"  y="10" width="2" height="7" rx="0.5" fill="#888" />
              <rect x="12" y="10" width="2" height="7" rx="0.5" fill="#888" />
              <rect x="16" y="10" width="2" height="7" rx="0.5" fill="#888" />
              <rect x="2"  y="17" width="20" height="2" rx="0.5" fill="#888" />
            </svg>
          )}
        </div>
      </div>

      {/* Text + chevron */}
      <div className="bl-flex bl-items-center bl-gap-md bl-flex-1 bl-min-w-0 bl-px-[14px] bl-py-[10px]">
        <div className="bl-flex-1 bl-min-w-0 bl-flex bl-flex-col bl-gap-[4px]">
          {/* "Selected" sub-label: only visible when a value is chosen */}
          {selected && (
            <span className="bl-text-paragraph-xs bl-font-normal bl-text-content-secondary">
              Selected
            </span>
          )}
          <span
            className={[
              'bl-truncate',
              selected
                ? 'bl-text-paragraph-md bl-font-semibold bl-text-content-primary'
                : 'bl-text-paragraph-sm bl-font-normal   bl-text-content-secondary',
            ].join(' ')}
          >
            {selected ? selected.name : 'Select your pay method'}
          </span>
        </div>
        <ChevronDown
          size={24}
          aria-hidden
          className={[
            'bl-flex-shrink-0 bl-text-content-secondary',
            'bl-transition-transform bl-duration-200',
            isOpen ? 'bl-rotate-180' : 'bl-rotate-0',
          ].join(' ')}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   ProviderMenu — dropdown listbox
───────────────────────────────────────────────────────── */

function ProviderMenu({
  menuId,
  providers,
  selected,
  onSelect,
}: {
  menuId?: string;
  providers: PaymentProvider[];
  selected: PaymentProvider | null;
  onSelect: (p: PaymentProvider) => void;
}) {
  return (
    <div
      id={menuId}
      role="listbox"
      aria-label="Payment methods"
      className="
        bl-flex bl-flex-col
        bl-bg-surface-layer-2
        bl-border bl-border-border-active
        bl-rounded-lg bl-p-[2px]
        bl-shadow-md bl-overflow-hidden
      "
    >
      {providers.map((provider) => {
        const isSelected = selected?.id === provider.id;
        return (
          <button
            key={provider.id}
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect(provider)}
            className={[
              'bl-flex bl-items-center bl-gap-sm',
              'bl-min-h-[36px] bl-px-sm bl-py-[7.5px]',
              'bl-rounded-md bl-border-0 bl-w-full bl-text-left',
              'bl-transition-colors bl-duration-100',
              isSelected
                ? 'bl-bg-action-secondary'
                : 'bl-bg-transparent hover:bl-bg-action-neutral',
            ].join(' ')}
          >
            <div className="bl-w-[39px] bl-h-[28px] bl-bg-white bl-rounded-md bl-overflow-hidden bl-flex bl-items-center bl-justify-center bl-flex-shrink-0">
              <img
                src={provider.logo}
                alt={provider.name}
                className="bl-w-[32px] bl-max-h-[24px] bl-object-contain bl-block"
              />
            </div>
            <span className="bl-flex-1 bl-min-w-0 bl-text-paragraph-sm bl-font-normal bl-text-content-primary bl-truncate">
              {provider.name}
            </span>
            <Check
              size={20}
              aria-hidden
              className={[
                'bl-flex-shrink-0 bl-text-content-accent',
                'bl-transition-opacity bl-duration-100',
                isSelected ? 'bl-opacity-100' : 'bl-opacity-0',
              ].join(' ')}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PaymentPanel — shared layout for Deposit and Withdrawal tabs
───────────────────────────────────────────────────────── */

function PaymentPanel({
  label,
  providers,
  infoText,
  onContinue,
  onPaymentHistory,
}: {
  label: string;
  providers: PaymentProvider[];
  infoText: string;
  onContinue?: (provider: PaymentProvider) => void;
  onPaymentHistory?: () => void;
}) {
  const [isOpen, setIsOpen]     = useState(false);
  const [selected, setSelected] = useState<PaymentProvider | null>(null);
  const stackRef                = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside the selector stack
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (isOpen && stackRef.current && !stackRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen]);

  function handleSelect(provider: PaymentProvider) {
    setSelected(provider);
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(v => !v); }
    if (e.key === 'Escape' && isOpen)       { e.preventDefault(); setIsOpen(false);   }
  }

  const controlId = `${label}-selector`;
  const menuId    = `${label}-menu`;

  return (
    <div
      role="tabpanel"
      aria-label={label}
      className="bl-flex bl-flex-col bl-gap-2xl bl-px-xl bl-pt-2xl bl-pb-4xl"
    >
      {/* ── Content group ── */}
      <div className="bl-flex bl-flex-col bl-gap-xl">

        {/* Payment method field */}
        <div className="bl-flex bl-flex-col bl-gap-[4px]">
          <span className="bl-flex bl-items-center bl-h-[21px] bl-text-paragraph-xs bl-font-medium bl-text-content-subtle bl-uppercase">
            Payment Method
          </span>

          {/* Selector stack: control + dropdown */}
          <div ref={stackRef} className="bl-flex bl-flex-col bl-gap-xs">
            <SelectorControl
              controlId={controlId}
              menuId={menuId}
              selected={selected}
              isOpen={isOpen}
              onClick={() => setIsOpen(v => !v)}
              onKeyDown={handleKeyDown}
            />
            {isOpen && (
              <ProviderMenu
                menuId={menuId}
                providers={providers}
                selected={selected}
                onSelect={handleSelect}
              />
            )}
          </div>
        </div>

        {/* Payment History button */}
        <button
          onClick={onPaymentHistory}
          className="
            bl-flex bl-items-center bl-justify-center bl-gap-[4px]
            bl-w-full bl-px-[14px] bl-py-[10px]
            bl-bg-action-neutral bl-border bl-border-border-subtle
            bl-rounded-xl
            bl-text-paragraph-md bl-font-semibold bl-text-content-secondary
            hover:bl-opacity-80 bl-transition-opacity bl-duration-150
          "
        >
          <History size={20} aria-hidden className="bl-flex-shrink-0 bl-text-content-secondary" />
          <span className="bl-px-[2px]">Payment History</span>
        </button>

        {/* Info alert */}
        <div className="bl-flex bl-items-center bl-gap-sm bl-px-md bl-py-sm bl-bg-surface-layer-1 bl-border bl-border-border-subtle bl-rounded-lg">
          <div className="bl-pt-[2px] bl-flex-shrink-0">
            <Info size={16} aria-hidden className="bl-text-content-subtle" />
          </div>
          <p className="bl-text-paragraph-xs bl-font-normal bl-text-content-secondary">
            {infoText}
          </p>
        </div>

      </div>

      {/* Continue button */}
      <button
        onClick={() => selected && onContinue?.(selected)}
        className="
          bl-flex bl-items-center bl-justify-center bl-gap-[6px]
          bl-w-full bl-px-[18px] bl-py-sm
          bl-bg-action-primary bl-border bl-border-border-accent
          bl-rounded-xl
          bl-text-paragraph-md bl-font-semibold bl-text-content-on-action
          hover:bl-opacity-90 bl-transition-opacity bl-duration-150
        "
      >
        <span className="bl-px-[2px]">Continue</span>
        <ArrowRight size={20} aria-hidden className="bl-flex-shrink-0" />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   WalletModal — root organism
───────────────────────────────────────────────────────── */

export function WalletModal({
  balance      = 5450,
  cashBalance  = 5450,
  bonus        = 0,
  providers    = DEFAULT_PROVIDERS,
  onClose,
  onSeeDetails,
  onPaymentHistory,
  onContinueDeposit,
  onContinueWithdrawal,
}: WalletModalProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wallet"
      className="
        bl-w-[520px]
        bl-bg-surface-layer-2
        bl-border bl-border-border-subtle
        bl-rounded-2xl
        bl-shadow-[0px_20px_25px_rgba(13,45,42,0.10),0px_8px_10px_rgba(0,0,0,0.15)]
        bl-flex bl-flex-col bl-overflow-hidden
        bl-font-sans
      "
    >
      {/* ── Shared header (139px) ── */}
      <div className="bl-flex bl-flex-col bl-h-[139px] bl-flex-shrink-0">

        {/* Title bar */}
        <div className="bl-flex bl-items-center bl-justify-between bl-px-xl bl-pt-md bl-pb-[17px] bl-border-b bl-border-border-subtle">
          <div className="bl-flex bl-items-center bl-gap-[10px]">
            <Wallet size={24} aria-hidden className="bl-text-content-accent bl-flex-shrink-0" />
            <span className="bl-text-heading-04 bl-font-semibold bl-text-content-primary">
              Wallet
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wallet"
            className="
              bl-flex bl-items-center bl-justify-center
              bl-w-9 bl-h-9 bl-p-xs bl-rounded-lg
              bl-text-content-secondary
              hover:bl-bg-action-neutral
              bl-transition-colors bl-duration-150
            "
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        {/* Segmented tab control */}
        <TabBar active={activeTab} onChange={setActiveTab} />

      </div>

      {/* ── Tab panels (conditional render) ── */}

      {activeTab === 'overview' && (
        <OverviewPanel
          balance={balance}
          cashBalance={cashBalance}
          bonus={bonus}
          onSeeDetails={onSeeDetails}
        />
      )}

      {activeTab === 'deposit' && (
        <PaymentPanel
          label="deposit"
          providers={providers}
          infoText="Funds arrive in 2–3 business days. No fees applied."
          onContinue={onContinueDeposit}
          onPaymentHistory={onPaymentHistory}
        />
      )}

      {activeTab === 'withdrawal' && (
        <PaymentPanel
          label="withdrawal"
          providers={providers}
          infoText="Withdrawals are processed in 1–2 business days. No fees applied."
          onContinue={onContinueWithdrawal}
          onPaymentHistory={onPaymentHistory}
        />
      )}

    </div>
  );
}

export default WalletModal;
