import { useState, useEffect, useCallback } from 'react';
import { Wallet, X, ArrowLeft, Shield, CreditCard, Building2 } from 'lucide-react';
import '../../../styles/belloa.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = 'DETAILS' | 'DEPOSIT' | 'WITHDRAW';
type DepositMethod = 'bank' | 'card';

export interface CashierFlowProps {
  /** Current euro balance (e.g. 142.50) */
  balance?: number;
  onClose?: () => void;
  onDepositConfirm?: (amount: number, method: DepositMethod) => void;
  onWithdrawConfirm?: (amount: number, iban: string) => void;
}

// ─── Shared header ────────────────────────────────────────────────────────────

function ScreenHeader({
  title,
  onBack,
  onClose,
}: {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}) {
  return (
    <header className="
      bl-flex bl-items-center bl-justify-between
      bl-px-md bl-py-md
      bl-border-b bl-border-border-subtle
      bl-flex-shrink-0
    ">
      <div className="bl-flex bl-items-center bl-gap-xs">
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="
              bl-flex bl-items-center bl-justify-center
              bl-w-6 bl-h-6 bl-rounded-md
              bl-text-content-subtle
              hover:bl-text-content-primary hover:bl-bg-surface-layer-1
              bl-transition-colors bl-duration-150
            "
          >
            <ArrowLeft size={14} />
          </button>
        ) : (
          <Wallet size={16} className="bl-text-content-accent bl-flex-shrink-0" />
        )}
        <span className="bl-text-content-primary bl-text-paragraph-sm bl-font-semibold">
          {title}
        </span>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close wallet"
          className="
            bl-flex bl-items-center bl-justify-center
            bl-w-6 bl-h-6 bl-rounded-md
            bl-text-content-subtle
            hover:bl-text-content-primary hover:bl-bg-surface-layer-1
            bl-transition-colors bl-duration-150
          "
        >
          <X size={14} />
        </button>
      )}
    </header>
  );
}

// ─── Details (Overview) screen ────────────────────────────────────────────────

function DetailsScreen({
  balance,
  onDeposit,
  onWithdraw,
  onClose,
}: {
  balance: number;
  onDeposit: () => void;
  onWithdraw: () => void;
  onClose?: () => void;
}) {
  const formatted = `€${balance.toFixed(2)}`;

  return (
    <>
      <ScreenHeader title="Wallet" onClose={onClose} />

      {/* Balance */}
      <div className="
        bl-px-md bl-pt-md bl-pb-md
        bl-border-b bl-border-border-subtle
      ">
        <p className="bl-text-content-subtle bl-text-paragraph-xs bl-font-normal bl-mb-[4px]">
          Balance
        </p>
        <div className="bl-flex bl-items-center bl-gap-xs">
          <span className="bl-text-content-primary bl-text-heading-04 bl-font-bold">
            {formatted}
          </span>
          {/* Active status dot — teal glow matches Figma green dot */}
          <span
            aria-label="Account active"
            className="
              bl-inline-block bl-w-2 bl-h-2 bl-rounded-full bl-flex-shrink-0
              bl-bg-status-success-fg
            "
            style={{ boxShadow: '0 0 8px 0 var(--bl-status-success-fg)' }}
          />
        </div>
      </div>

      {/* Quick-action buttons */}
      <div className="bl-flex bl-gap-xs bl-px-md bl-py-sm">
        <button
          onClick={onWithdraw}
          className="
            bl-flex-1 bl-flex bl-items-center bl-justify-center
            bl-py-[11px]
            bl-bg-surface-layer-1 bl-border bl-border-border-subtle
            bl-rounded-lg
            bl-text-content-primary bl-text-paragraph-sm bl-font-semibold
            hover:bl-bg-surface-layer-2 bl-transition-colors bl-duration-150
          "
        >
          Withdraw
        </button>
        <button
          onClick={onDeposit}
          className="
            bl-flex-1 bl-flex bl-items-center bl-justify-center
            bl-py-[11px]
            bl-bg-brand-700
            bl-rounded-lg
            bl-text-brand-1200 bl-text-paragraph-sm bl-font-bold
            hover:bl-bg-brand-600 bl-transition-colors bl-duration-150
          "
        >
          Deposit
        </button>
      </div>

      {/* 2FA security card — Figma: rgba(59,130,246,0.08) bg / rgba(59,130,246,0.2) border */}
      <div className="bl-px-md bl-pb-xs">
        <div className="
          bl-flex bl-items-start bl-gap-xs
          bl-px-sm bl-py-sm
          bl-rounded-lg
          bl-bg-blue-500/[0.08] bl-border bl-border-blue-500/[0.20]
        ">
          <Shield size={14} className="bl-text-blue-400 bl-flex-shrink-0 bl-mt-[2px]" />
          <p className="bl-text-content-secondary bl-text-paragraph-xs bl-leading-relaxed">
            Improve your account security with Two-Factor Authentication
          </p>
        </div>
      </div>

      {/* Enable 2FA button */}
      <div className="bl-px-md bl-pb-md">
        <button className="
          bl-w-full bl-flex bl-items-center bl-justify-center
          bl-py-[11px]
          bl-bg-surface-layer-1 bl-border bl-border-border-subtle
          bl-rounded-lg
          bl-text-content-primary bl-text-paragraph-sm bl-font-medium
          hover:bl-bg-surface-layer-2 bl-transition-colors bl-duration-150
        ">
          Enable 2FA
        </button>
      </div>
    </>
  );
}

// ─── Deposit screen ───────────────────────────────────────────────────────────

function DepositScreen({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm?: (amount: number, method: DepositMethod) => void;
}) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<DepositMethod>('bank');

  const parsed = parseFloat(amount);
  const isValid = !isNaN(parsed) && parsed > 0;

  function handleConfirm() {
    if (isValid) onConfirm?.(parsed, method);
  }

  return (
    <>
      <ScreenHeader title="Deposit" onBack={onBack} />

      <div className="bl-flex bl-flex-col bl-gap-md bl-px-md bl-py-md">

        {/* Amount input */}
        <div>
          <label className="
            bl-block
            bl-text-content-subtle bl-text-paragraph-xs bl-font-normal
            bl-mb-[6px]
          ">
            Amount
          </label>
          <div className="bl-relative">
            <span className="
              bl-absolute bl-left-3 bl-top-1/2 -bl-translate-y-1/2
              bl-text-content-subtle bl-text-paragraph-sm bl-select-none bl-pointer-events-none
            ">
              €
            </span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="
                bl-w-full
                bl-bg-surface-layer-1 bl-border bl-border-border-subtle
                bl-rounded-lg
                bl-pl-7 bl-pr-sm bl-py-[11px]
                bl-text-content-primary bl-text-paragraph-sm
                placeholder:bl-text-content-subtle
                focus:bl-outline-none focus:bl-border-border-active
                bl-transition-colors bl-duration-150
              "
            />
          </div>
        </div>

        {/* Payment method selector */}
        <div>
          <p className="
            bl-text-content-subtle bl-text-paragraph-xs bl-font-normal
            bl-mb-xs
          ">
            Payment Method
          </p>
          <div className="bl-flex bl-gap-xs">
            {(
              [
                { id: 'bank', label: 'Bank Transfer', icon: <Building2 size={14} /> },
                { id: 'card', label: 'Card', icon: <CreditCard size={14} /> },
              ] as { id: DepositMethod; label: string; icon: React.ReactNode }[]
            ).map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setMethod(id)}
                className={[
                  'bl-flex-1 bl-flex bl-items-center bl-justify-center bl-gap-[6px]',
                  'bl-py-[10px] bl-rounded-lg bl-border',
                  'bl-text-paragraph-xs bl-font-semibold',
                  'bl-transition-colors bl-duration-150',
                  method === id
                    ? 'bl-bg-surface-accent bl-border-border-accent bl-text-content-accent'
                    : 'bl-bg-surface-layer-1 bl-border-border-subtle bl-text-content-subtle hover:bl-text-content-primary',
                ].join(' ')}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm */}
        <button
          disabled={!isValid}
          onClick={handleConfirm}
          className="
            bl-w-full bl-flex bl-items-center bl-justify-center
            bl-py-[11px]
            bl-bg-brand-700
            bl-rounded-lg
            bl-text-brand-1200 bl-text-paragraph-sm bl-font-bold
            hover:bl-bg-brand-600 bl-transition-colors bl-duration-150
            disabled:bl-opacity-40 disabled:bl-cursor-not-allowed
          "
        >
          Confirm Deposit
        </button>
      </div>
    </>
  );
}

// ─── Withdraw screen ──────────────────────────────────────────────────────────

function WithdrawScreen({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm?: (amount: number, iban: string) => void;
}) {
  const [amount, setAmount] = useState('');
  const [iban, setIban] = useState('');

  const parsed = parseFloat(amount);
  const isValid = !isNaN(parsed) && parsed > 0 && iban.trim().length > 0;

  function handleConfirm() {
    if (isValid) onConfirm?.(parsed, iban.trim());
  }

  return (
    <>
      <ScreenHeader title="Withdraw" onBack={onBack} />

      <div className="bl-flex bl-flex-col bl-gap-md bl-px-md bl-py-md">

        {/* Amount input */}
        <div>
          <label className="
            bl-block
            bl-text-content-subtle bl-text-paragraph-xs bl-font-normal
            bl-mb-[6px]
          ">
            Amount
          </label>
          <div className="bl-relative">
            <span className="
              bl-absolute bl-left-3 bl-top-1/2 -bl-translate-y-1/2
              bl-text-content-subtle bl-text-paragraph-sm bl-select-none bl-pointer-events-none
            ">
              €
            </span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="
                bl-w-full
                bl-bg-surface-layer-1 bl-border bl-border-border-subtle
                bl-rounded-lg
                bl-pl-7 bl-pr-sm bl-py-[11px]
                bl-text-content-primary bl-text-paragraph-sm
                placeholder:bl-text-content-subtle
                focus:bl-outline-none focus:bl-border-border-active
                bl-transition-colors bl-duration-150
              "
            />
          </div>
        </div>

        {/* Destination IBAN */}
        <div>
          <label className="
            bl-block
            bl-text-content-subtle bl-text-paragraph-xs bl-font-normal
            bl-mb-[6px]
          ">
            Destination IBAN
          </label>
          <input
            type="text"
            placeholder="DE89 3704 0044 0532 0130 00"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            className="
              bl-w-full
              bl-bg-surface-layer-1 bl-border bl-border-border-subtle
              bl-rounded-lg
              bl-px-sm bl-py-[11px]
              bl-text-content-primary bl-text-paragraph-sm bl-font-mono
              placeholder:bl-text-content-subtle
              focus:bl-outline-none focus:bl-border-border-active
              bl-transition-colors bl-duration-150
            "
          />
        </div>

        {/* Confirm */}
        <button
          disabled={!isValid}
          onClick={handleConfirm}
          className="
            bl-w-full bl-flex bl-items-center bl-justify-center
            bl-py-[11px]
            bl-bg-surface-layer-1 bl-border bl-border-border-subtle
            bl-rounded-lg
            bl-text-content-primary bl-text-paragraph-sm bl-font-bold
            hover:bl-bg-surface-layer-2 bl-transition-colors bl-duration-150
            disabled:bl-opacity-40 disabled:bl-cursor-not-allowed
          "
        >
          Confirm Withdrawal
        </button>
      </div>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

// ─── Transition duration (ms) ─────────────────────────────────────────────────
const TRANSITION_MS = 160;

export function CashierFlow({
  balance = 0,
  onClose,
  onDepositConfirm,
  onWithdrawConfirm,
}: CashierFlowProps) {
  const [screen, setScreen] = useState<Screen>('DETAILS');
  // Controls opacity + translateX so screens slide in on mount / fade out on exit
  const [visible, setVisible] = useState(false);

  // Fade-in on first render
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Fade-out → swap screen → fade-in
  const navigate = useCallback((next: Screen) => {
    setVisible(false);
    setTimeout(() => {
      setScreen(next);
      setVisible(true);
    }, TRANSITION_MS);
  }, []);

  const transitionStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(6px)',
    transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
  };

  return (
    /* Figma: bg surface/layer-2, rounded-[16px], border rgba(255,255,255,0.07), shadow xl */
    <div className="
      bl-w-full bl-max-w-[320px]
      bl-bg-surface-layer-2
      bl-border bl-border-border-subtle
      bl-rounded-2xl
      bl-shadow-[0px_24px_64px_0px_rgba(0,0,0,0.65)]
      bl-overflow-hidden
      bl-font-sans
    ">
      <div style={transitionStyle}>
        {screen === 'DETAILS' && (
          <DetailsScreen
            balance={balance}
            onDeposit={() => navigate('DEPOSIT')}
            onWithdraw={() => navigate('WITHDRAW')}
            onClose={onClose}
          />
        )}
        {screen === 'DEPOSIT' && (
          <DepositScreen
            onBack={() => navigate('DETAILS')}
            onConfirm={onDepositConfirm}
          />
        )}
        {screen === 'WITHDRAW' && (
          <WithdrawScreen
            onBack={() => navigate('DETAILS')}
            onConfirm={onWithdrawConfirm}
          />
        )}
      </div>
    </div>
  );
}

export default CashierFlow;
