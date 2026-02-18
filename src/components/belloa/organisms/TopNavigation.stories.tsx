import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import '../../../styles/belloa.css';
import TopNavigation from './TopNavigation';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TopNavigation> = {
  title: 'Belloa / Organisms / TopNavigation',
  component: TopNavigation,

  parameters: {
    // Full-bleed: the nav bar manages its own width
    layout: 'fullscreen',

    // Set canvas to Belloa dark surface so the bar reads correctly
    backgrounds: {
      default: 'belloa-dark',
      values: [
        { name: 'belloa-dark',  value: '#101211' }, // --bl-surface-page (dark)
        { name: 'belloa-light', value: '#FCFCFD' }, // --bl-surface-page (light)
      ],
    },
  },

  // ── Controls ──────────────────────────────────────────────────────────────
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description: 'Toggles between guest and authenticated UI.',
      table: { category: 'State' },
    },
    activeTab: {
      control: 'select',
      options: ['sports', 'live', 'casino', 'live-casino', 'esports', 'promotions'],
      description: 'Which nav tab renders with the teal active indicator.',
      table: { category: 'State' },
    },
    userName: {
      control: 'text',
      description: 'Display name shown in the account pill (logged-in only).',
      table: { category: 'User' },
    },
    balance: {
      control: { type: 'number', step: 0.01 },
      description: 'Wallet balance surfaced next to the currency label.',
      table: { category: 'User' },
    },
    currency: {
      control: 'text',
      description: 'ISO 4217 currency code (e.g. EUR, USD, BTC).',
      table: { category: 'User' },
    },
    // Hide callback props from the controls panel — use Actions tab instead
    onTabChange:  { table: { disable: true } },
    onLogin:      { table: { disable: true } },
    onRegister:   { table: { disable: true } },
    onDeposit:    { table: { disable: true } },
    onMenuSelect: { table: { disable: true } },
  },

  // ── Shared actions (logged in the Storybook Actions panel) ────────────────
  args: {
    onTabChange:  fn(),
    onLogin:      fn(),
    onRegister:   fn(),
    onDeposit:    fn(),
    onMenuSelect: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 1 · Guest — Log In / Register ───────────────────────────────────────────

/**
 * Default unauthenticated state.
 * Right side shows **Log In** (outline) and **Register** (teal primary) buttons.
 * No mail icon, no balance pill, no account pill.
 */
export const LoggedOut: Story = {
  name: '1 · Guest — Log In / Register',
  args: {
    isLoggedIn: false,
    activeTab: 'sports',
  },
};

// ─── 2 · Authenticated — Balance & Profile ────────────────────────────────────

/**
 * Full logged-in state.
 * Right side shows: **Mail** icon → separator → **Deposit** CTA → **EUR 142.50** balance pill
 * → **Sofia K.** account pill with avatar initial.
 *
 * Click the balance pill or the account pill to open their dropdowns.
 */
export const LoggedIn: Story = {
  name: '2 · Authenticated — Balance & Profile',
  args: {
    isLoggedIn: true,
    userName:   'Sofia K.',
    balance:    142.50,
    currency:   'EUR',
    activeTab:  'sports',
  },
};

/**
 * Zero-balance edge case — common on first login before a deposit.
 */
export const LoggedInZeroBalance: Story = {
  name: '2b · Authenticated — Zero Balance',
  args: {
    isLoggedIn: true,
    userName:   'New User',
    balance:    0,
    currency:   'EUR',
    activeTab:  'promotions',
  },
};

/**
 * Long username — verifies the `bl-max-w-[80px] bl-truncate` clamp on the account pill.
 */
export const LoggedInLongName: Story = {
  name: '2c · Authenticated — Long Username',
  args: {
    isLoggedIn: true,
    userName:   'Aleksandr Volkov',
    balance:    9_999.99,
    currency:   'USD',
    activeTab:  'live',
  },
};

// ─── 3 · Responsive — Narrow Viewport ────────────────────────────────────────

/**
 * Renders both states at a tablet-width viewport (768 px) to expose any
 * overflow or wrapping issues before mobile-specific breakpoints are added.
 *
 * Switch between stories in this group using the Controls panel.
 */
export const ResponsiveGuest: Story = {
  name: '3 · Responsive — Guest (768 px)',
  args: {
    isLoggedIn: false,
    activeTab:  'casino',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const ResponsiveLoggedIn: Story = {
  name: '3b · Responsive — Authenticated (768 px)',
  args: {
    isLoggedIn: true,
    userName:   'Sofia K.',
    balance:    142.50,
    currency:   'EUR',
    activeTab:  'casino',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// ─── Playground ───────────────────────────────────────────────────────────────

/**
 * All controls unlocked — use the Controls panel to tweak every prop live.
 */
export const Playground: Story = {
  name: '✦ Playground',
  args: {
    isLoggedIn: true,
    userName:   'Sofia K.',
    balance:    142.50,
    currency:   'EUR',
    activeTab:  'sports',
  },
};
