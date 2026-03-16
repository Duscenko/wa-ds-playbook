import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import '../../../styles/belloa.css';
import TopNavigation from './TopNavigation';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TopNavigation> = {
  title: 'Belloa / Organisms / TopNavigation',
  component: TopNavigation,

  parameters: {
    // Full-bleed layout for navigation component
    layout: 'fullscreen',
    
    // Belloa backgrounds
    backgrounds: {
      default: 'belloa-dark',
      values: [
        { name: 'belloa-dark',  value: '#101211' },
        { name: 'belloa-light', value: '#FCFCFD' },
      ],
    },
    
    // Docs configuration
    docs: {
      description: {
        component: 'Top navigation bar for Belloa iGaming platform. Includes tabs, authentication state, and user account management.',
      },
    },
  },

  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description: 'Toggles between guest and authenticated UI.',
      table: { category: 'State' },
    },
    activeTab: {
      control: 'select',
      options: ['sports', 'live', 'casino', 'live-casino', 'esports', 'promotions'],
      description: 'Active navigation tab.',
      table: { category: 'State' },
    },
    userName: {
      control: 'text',
      description: 'User display name (logged-in only).',
      table: { category: 'User' },
    },
    balance: {
      control: { type: 'number', step: 0.01 },
      description: 'Wallet balance.',
      table: { category: 'User' },
    },
    currency: {
      control: 'text',
      description: 'Currency code (EUR, USD, BTC).',
      table: { category: 'User' },
    },
    onTabChange:  { table: { disable: true } },
    onLogin:      { table: { disable: true } },
    onRegister:   { table: { disable: true } },
    onDeposit:    { table: { disable: true } },
    onMenuSelect: { table: { disable: true } },
  },

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

// ─── Stories ──────────────────────────────────────────────────────────────────

export const LoggedOut: Story = {
  name: '1 · Guest State',
  args: {
    isLoggedIn: false,
    activeTab: 'sports',
  },
};

export const LoggedIn: Story = {
  name: '2 · Authenticated State',
  args: {
    isLoggedIn: true,
    userName:   'Sofia K.',
    balance:    142.50,
    currency:   'EUR',
    activeTab:  'sports',
  },
};

export const ResponsiveTablet: Story = {
  name: '3 · Responsive (Tablet)',
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
