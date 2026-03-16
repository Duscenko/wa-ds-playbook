import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import '../../../styles/belloa.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TextFieldType = 'text' | 'email' | 'password' | 'tel' | 'url';
export type TextFieldSize = 'md' | 'lg';
export type TextFieldStatus = 'default' | 'error' | 'success';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Input type. Default: `text`. */
  type?: TextFieldType;
  /** Size variant. Default: `lg` (matches Figma Obra-shadcn specs). */
  size?: TextFieldSize;
  /** Visual status state. */
  status?: TextFieldStatus;
  /** Label text above the input. */
  label?: string;
  /** Helper text below the input. */
  helperText?: string;
  /** Error message (overrides helperText when status='error'). */
  errorMessage?: string;
}

// ─── Style maps ──────────────────────────────────────────────────────────────

/**
 * Figma Obra-shadcn TextField specs:
 * lg: px-14 py-10, paragraph-sm (14px), border-1, radius-8
 * md: px-12 py-8, paragraph-sm (14px), border-1, radius-8
 */
const SIZE_CLASSES: Record<TextFieldSize, { container: string; text: string }> = {
  md: {
    container: 'bl-px-3 bl-py-2',
    text: 'bl-text-paragraph-sm',
  },
  lg: {
    container: 'bl-px-[14px] bl-py-[10px]',
    text: 'bl-text-paragraph-sm',
  },
};

const STATUS_BORDER: Record<TextFieldStatus, string> = {
  default: 'bl-border-border-subtle focus-within:bl-border-border-active',
  error: 'bl-border-border-critical focus-within:bl-border-border-critical',
  success: 'bl-border-border-success focus-within:bl-border-border-success',
};

// ─── Component ────────────────────────────────────────────────────────────────

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    type = 'text',
    size = 'lg',
    status = 'default',
    label,
    helperText,
    errorMessage,
    className = '',
    disabled,
    ...rest
  },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const sizeConfig = SIZE_CLASSES[size];
  const displayMessage = status === 'error' && errorMessage ? errorMessage : helperText;

  const containerClasses = [
    'bl-relative bl-flex bl-items-center',
    sizeConfig.container,
    'bl-bg-surface-layer-1',
    'bl-border',
    STATUS_BORDER[status],
    // FIXED: rounded-lg (8px) per Figma, not rounded-xl (12px)
    'bl-rounded-lg',
    'bl-transition-colors bl-duration-150',
    disabled ? 'bl-opacity-40 bl-cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'bl-flex-1',
    'bl-bg-transparent',
    'bl-border-none',
    'bl-outline-none',
    'bl-text-content-primary',
    'placeholder:bl-text-content-subtle',
    sizeConfig.text,
    disabled ? 'bl-cursor-not-allowed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bl-flex bl-flex-col bl-gap-2 bl-w-full">
      {/* Label */}
      {label && (
        <label className="bl-text-paragraph-sm bl-font-medium bl-text-content-primary">
          {label}
        </label>
      )}

      {/* Input container */}
      <div className={containerClasses}>
        <input
          ref={ref}
          type={inputType}
          disabled={disabled}
          className={inputClasses}
          {...rest}
        />

        {/* Password toggle */}
        {isPassword && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bl-flex-shrink-0 bl-flex bl-items-center bl-justify-center bl-w-6 bl-h-6 bl-rounded-full bl-bg-transparent hover:bl-bg-surface-layer-2 bl-transition-colors bl-duration-150"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={18} className="bl-text-content-subtle" />
            ) : (
              <Eye size={18} className="bl-text-content-subtle" />
            )}
          </button>
        )}
      </div>

      {/* Helper text / Error message */}
      {displayMessage && (
        <p
          className={[
            'bl-text-paragraph-xs',
            status === 'error' ? 'bl-text-status-critical-fg' : 'bl-text-content-subtle',
          ].join(' ')}
        >
          {displayMessage}
        </p>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';
export default TextField;
