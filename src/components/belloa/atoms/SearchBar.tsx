import { forwardRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import '../../../styles/belloa.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SearchBarSize = 'md' | 'lg';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant. Default: `md`. */
  size?: SearchBarSize;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Custom placeholder text. Default: "Search..." */
  placeholder?: string;
}

// ─── Style maps ──────────────────────────────────────────────────────────────

/**
 * Figma Obra-shadcn SearchBar specs (same as TextField):
 * lg: px-14 py-10, paragraph-sm (14px), border-1, radius-8
 * md: px-12 py-8, paragraph-sm (14px), border-1, radius-8
 */
const SIZE_CLASSES: Record<SearchBarSize, {
  container: string;
  icon: number;
  text: string;
}> = {
  md: {
    container: 'bl-px-3 bl-py-2 bl-gap-3',
    icon: 18,
    text: 'bl-text-paragraph-sm',
  },
  lg: {
    container: 'bl-px-[14px] bl-py-[10px] bl-gap-3',
    icon: 20,
    text: 'bl-text-paragraph-sm',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  {
    size = 'md',
    onClear,
    placeholder = 'Search...',
    value: controlledValue,
    onChange,
    className = '',
    disabled,
    ...rest
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    onClear?.();
  };

  const sizeConfig = SIZE_CLASSES[size];
  const hasValue = String(value).length > 0;

  const containerClasses = [
    // Layout
    'bl-relative bl-flex bl-items-center',
    sizeConfig.container,
    // Background & border
    'bl-bg-surface-layer-1',
    'bl-border bl-border-border-subtle',
    // Radius - FIXED: rounded-lg (8px) per Figma, not rounded-xl (12px)
    'bl-rounded-lg',
    // Focus state
    'focus-within:bl-border-border-active',
    // Transition
    'bl-transition-colors bl-duration-150',
    // Disabled
    disabled ? 'bl-opacity-40 bl-cursor-not-allowed' : '',
    // Custom classes
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
    <div className={containerClasses}>
      {/* Search icon */}
      <Search
        size={sizeConfig.icon}
        className="bl-text-content-subtle bl-flex-shrink-0"
        aria-hidden
      />

      {/* Input field */}
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        {...rest}
      />

      {/* Clear button (only visible when there's text) */}
      {hasValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="bl-flex-shrink-0 bl-flex bl-items-center bl-justify-center bl-w-6 bl-h-6 bl-rounded-full bl-bg-transparent hover:bl-bg-surface-layer-2 bl-transition-colors bl-duration-150"
          aria-label="Clear search"
        >
          <X
            size={16}
            className="bl-text-content-subtle"
          />
        </button>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;
