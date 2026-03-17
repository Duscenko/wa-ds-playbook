import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import '../../../styles/belloa.css';
import TopNavigation from './TopNavigation';

// ─── Custom viewports ─────────────────────────────────────────────────────────

const VIEWPORTS = {
  desktop1440: {
    name: 'Desktop 1440',
    styles: { width: '1440px', height: '900px' },
    type: 'desktop',
  },
  mobile360: {
    name: 'Mobile 360',
    styles: { width: '360px', height: '800px' },
    type: 'mobile',
  },
  tablet768: {
    name: 'Tablet 768',
    styles: { width: '768px', height: '1024px' },
    type: 'tablet',
  },
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TopNavigation> = {
  title: 'Belloa / Organisms / TopNavigation',
  component: TopNavigation,

  parameters: {
    layout: 'fullscreen',

    viewport: {
      viewports: VIEWPORTS,
      defaultViewport: 'desktop1440',
    },

    backgrounds: {
      default: 'belloa-dark',
      values: [
        { name: 'belloa-dark',  value: '#101211' },
        { name: 'belloa-light', value: '#FCFCFD' },
      ],
    },

    docs: {
      description: {
        component:
          'Top navigation bar for Belloa. Fully responsive — desktop (≥768px) shows logo + nav tabs + actions; mobile (<768px) shows search + logo + compact actions. Four Figma states: Unauthenticated, Logged, Balance (dropdown), My Account (dropdown).',
      },
    },
  },

  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description: 'Toggle between guest and authenticated UI.',
      table: { category: 'State' },
    },
    activeTab: {
      control: 'select',
      options: ['sports', 'live', 'casino', 'live-casino', 'esports', 'promotions'],
      description: 'Active navigation tab (desktop only).',
      table: { category: 'State' },
    },
    userName: {
      control: 'text',
      description: 'User display name.',
      table: { category: 'User' },
    },
    balance: {
      control: { type: 'number', step: 0.01 },
      description: 'Wallet balance.',
      table: { category: 'User' },
    },
    currency: {
      control: 'text',
      description: 'Currency code (EUR, USD…).',
      table: { category: 'User' },
    },
    onTabChange:  { table: { disable: true } },
    onLogin:      { table: { disable: true } },
    onRegister:   { table: { disable: true } },
    onDeposit:    { table: { disable: true } },
    onGift:       { table: { disable: true } },
    onSearch:     { table: { disable: true } },
    onMenuSelect: { table: { disable: true } },
  },

  args: {
    onTabChange:  fn(),
    onLogin:      fn(),
    onRegister:   fn(),
    onDeposit:    fn(),
    onGift:       fn(),
    onSearch:     fn(),
    onMenuSelect: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Desktop stories (1440px canvas) ─────────────────────────────────────────

export const DesktopGuest: Story = {
  name: 'Desktop · 1 Guest (Unauthenticated)',
  args: {
    isLoggedIn: false,
    activeTab: 'sports',
  },
  parameters: {
    viewport: { defaultViewport: 'desktop1440' },
    docs: { description: { story: 'Figma state: Unauthenticated — Log In + Register buttons.' } },
  },
};

export const DesktopLogged: Story = {
  name: 'Desktop · 2 Logged In',
  args: {
    isLoggedIn: true,
    userName:   'Sofia K.',
    balance:    142.50,
    currency:   'EUR',
    activeTab:  'sports',
  },
  parameters: {
    viewport: { defaultViewport: 'desktop1440' },
    docs: { description: { story: 'Figma state: Logged — Gift + Deposit + Balance + Account pill.' } },
  },
};

export const DesktopBalanceOpen: Story = {
  name: 'Desktop · 3 Balance Dropdown',
  args: {
    isLoggedIn: true,
    userName:   'Sofia K.',
    balance:    10000.00,
    currency:   'EUR',
    activeTab:  'sports',
  },
  parameters: {
    viewport: { defaultViewport: 'desktop1440' },
    docs: { description: { story: 'Figma state: Balance — click the EUR amount to open the balance dropdown (Balance / Bonus balance / Free bet balance).' } },
  },
};

export const DesktopAccountOpen: Story = {
  name: 'Desktop · 4 My Account Dropdown',
  args: {
    isLoggedIn: true,
    userName:   'Sofia K.',
    balance:    142.50,
    currency:   'EUR',
    activeTab:  'sports',
  },
  parameters: {
    viewport: { defaultViewport: 'desktop1440' },
    docs: { description: { story: 'Figma state: My Account — click the account pill to open the dropdown (Profile → Logout).' } },
  },
};

// ─── Mobile stories (360px canvas) ───────────────────────────────────────────

export const MobileGuest: Story = {
  name: 'Mobile · 1 Guest (Unauthenticated)',
  args: {
    isLoggedIn: false,
    activeTab: 'sports',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile360' },
    docs: { description: { story: 'Figma mobile state: Unauthenticated — search + logo | Gift + Log in + Register.' } },
  },
};

export const MobileLoggedIn: Story = {
  name: 'Mobile · 2 Logged In',
  args: {
    isLoggedIn: true,
    userName:   'Sofia K.',
    balance:    10000.00,
    currency:   'EUR',
    activeTab:  'sports',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile360' },
    docs: { description: { story: 'Figma mobile state: Logged in-1 — search + logo | Gift + Balance + DEPOSIT + Avatar.' } },
  },
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: '✦ Playground',
  args: {
    isLoggedIn: true,
    userName:   'Sofia K.',
    balance:    142.50,
    currency:   'EUR',
    activeTab:  'sports',
  },
  parameters: {
    viewport: { defaultViewport: 'desktop1440' },
  },
};
