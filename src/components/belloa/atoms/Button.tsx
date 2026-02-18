import { forwardRef } from 'react';
import '../../../styles/belloa.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. Default: `primary`. */
  variant?: ButtonVariant;
  /** Height / padding scale. Default: `md` (matches Figma spec: px-[14px] py-[10px]). */
  size?: ButtonSize;
  /** Stretches the button to the full width of its container. */
  fullWidth?: boolean;
  /** Icon placed before the label. Accepts any React node (e.g. a Lucide icon). */
  leadingIcon?: React.ReactNode;
  /** Icon placed after the label. */
  trailingIcon?: React.ReactNode;
  /** Renders a spinner and locks interaction. */
  isLoading?: boolean;
  children?: React.ReactNode;
}

// ─── Style maps ──────────────────────────────────────────────────────────────

/**
 * Outer shell classes per variant.
 * The skeuomorphic depth overlay (absolute inset div) is rendered for solid
 * variants (primary, destructive) to match the Figma shadow-xs-skeuomorphic spec.
 */
const VARIANT_BASE: Record<ButtonVariant, string> = {
  primary: [
    'bl-bg-action-primary',
    'bl-border-2 bl-border-white/[0.12]',
    'bl-shadow-xs',
  ].join(' '),

  secondary: [
    'bl-bg-action-neutral',
    'bl-border bl-border-border-default',
    'bl-shadow-xs',
  ].join(' '),

  outline: [
    'bl-bg-transparent',
    'bl-border bl-border-border-default',
    'bl-shadow-xs',
  ].join(' '),

  ghost: [
    'bl-bg-transparent',
    'bl-border bl-border-transparent',
  ].join(' '),

  destructive: [
    'bl-bg-status-critical-fg',
    'bl-border-2 bl-border-white/[0.12]',
    'bl-shadow-xs',
  ].join(' '),
};

/** Text colour per variant */
const VARIANT_TEXT: Record<ButtonVariant, string> = {
  primary: 'bl-text-content-on-action',
  secondary: 'bl-text-content-secondary',
  outline: 'bl-text-content-primary',
  ghost: 'bl-text-content-primary',
  destructive: 'bl-text-content-on-action',
};

/** Hover state per variant */
const VARIANT_HOVER: Record<ButtonVariant, string> = {
  primary: 'hover:bl-opacity-90',
  secondary: 'hover:bl-text-content-primary hover:bl-opacity-90',
  outline: 'hover:bl-bg-surface-layer-2',
  ghost: 'hover:bl-bg-surface-layer-2',
  destructive: 'hover:bl-opacity-90',
};

/** Whether this variant renders the skeuomorphic depth overlay */
const HAS_SKEUO: Record<ButtonVariant, boolean> = {
  primary: true,
  secondary: false,
  outline: false,
  ghost: false,
  destructive: true,
};

/**
 * Size: padding + gap + font-size.
 * md matches Figma exactly: px-[14px] py-[10px], paragraph-sm (14px/18px).
 */
const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'bl-px-3    bl-py-1.5  bl-gap-1   bl-text-paragraph-xs bl-font-semibold',
  md: 'bl-px-[var(--bl-spacing-14)] bl-py-[var(--bl-spacing-10)] bl-gap-1 bl-text-paragraph-sm bl-font-semibold',
  lg: 'bl-px-4    bl-py-3    bl-gap-1.5 bl-text-paragraph-md bl-font-semibold',
};

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ size }: { size: ButtonSize }) {
  const dim = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;
  return (
    <svg
      aria-hidden
      width={dim}
      height={dim}
      viewBox="0 0 16 16"
      fill="none"
      className="bl-animate-spin bl-flex-shrink-0"
    >
      <circle
        cx="8" cy="8" r="6"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    isLoading = false,
    disabled,
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || isLoading;

  const classes = [
    // Layout
    'bl-relative bl-inline-flex bl-items-center bl-justify-center bl-overflow-hidden',
    'bl-rounded-lg bl-transition-all bl-duration-150',
    // Size
    SIZE_CLASSES[size],
    // Variant shell
    VARIANT_BASE[variant],
    // Variant text colour
    VARIANT_TEXT[variant],
    // Hover (only when not disabled)
    !isDisabled ? VARIANT_HOVER[variant] : '',
    // Full width
    fullWidth ? 'bl-w-full' : '',
    // Disabled
    isDisabled
      ? 'bl-opacity-40 bl-cursor-not-allowed'
      : 'bl-cursor-pointer',
    // Caller overrides
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} disabled={isDisabled} className={classes} {...rest}>
      {/* Leading icon or spinner */}
      {isLoading
        ? <Spinner size={size} />
        : leadingIcon && (
          <span aria-hidden className="bl-flex-shrink-0 bl-flex bl-items-center">
            {leadingIcon}
          </span>
        )
      }

      {/* Label — Figma: Text padding wrapper adds px-[2px] */}
      {children && (
        <span className="bl-px-[2px] bl-flex bl-items-center bl-justify-center bl-leading-none">
          {children}
        </span>
      )}

      {/* Trailing icon (hidden while loading) */}
      {!isLoading && trailingIcon && (
        <span aria-hidden className="bl-flex-shrink-0 bl-flex bl-items-center">
          {trailingIcon}
        </span>
      )}

      {/*
        Skeuomorphic depth overlay — matches Figma "shadow-xs-skeuomorphic":
          DROP_SHADOW  0 1px 2px rgba(10,13,18,.05)  ← applied via bl-shadow-xs on shell
          INNER_SHADOW 0  0  0  1px rgba(10,13,18,.18)  ← inner border
          INNER_SHADOW 0 -2px 0  0   rgba(10,13,18,.05)  ← bottom depth
      */}
      {HAS_SKEUO[variant] && (
        <span
          aria-hidden
          className="bl-absolute bl-inset-0 bl-pointer-events-none bl-rounded-[inherit]"
          style={{
            boxShadow: 'var(--bl-shadow-skeuo-inner)',
          }}
        />
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
