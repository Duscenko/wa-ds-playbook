import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import '../../../styles/belloa.css';
import SearchBar from './SearchBar';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SearchBar> = {
  title: 'Belloa / Atoms / SearchBar',
  component: SearchBar,

  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'belloa-dark',
      values: [
        { name: 'belloa-dark',  value: '#101211' },
        { name: 'belloa-light', value: '#FCFCFD' },
      ],
    },
  },

  argTypes: {
    size: {
      control: 'radio',
      options: ['md', 'lg'],
      description: 'Size variant. `md` matches the Figma spec.',
      table: { category: 'Appearance' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text.',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    value: {
      control: 'text',
      table: { category: 'Content' },
    },
    onClear: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },

  args: {
    placeholder: 'Search...',
    size: 'md',
    onChange: fn(),
    onClear: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 1 · Figma reference — Default ───────────────────────────────────────────

/**
 * Pixel-faithful to the Figma WA-Belloa-Library UI KIT.
 * bg-surface-layer-1 · border-subtle · rounded-xl (12px) · Search icon + placeholder.
 */
export const Default: Story = {
  name: '1 · Default (Figma ref)',
  args: {},
};

// ─── 2 · States ──────────────────────────────────────────────────────────────

export const WithValue: Story = {
  name: '2a · With value (shows clear button)',
  args: {
    value: 'Filled',
  },
};

export const Focused: Story = {
  name: '2b · Focused (teal border)',
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Click the input to see the teal border (`border-active`) on focus.',
      },
    },
  },
};

export const WithText: Story = {
  name: '2c · With text (Casino slots)',
  args: {
    value: 'Casino slots',
  },
};

export const Disabled: Story = {
  name: '2d · Disabled',
  args: {
    disabled: true,
    value: 'Disabled state',
  },
};

// ─── 3 · Sizes ───────────────────────────────────────────────────────────────

export const SizeMedium: Story = {
  name: '3a · Size — md (Figma default)',
  args: {
    size: 'md',
  },
};

export const SizeLarge: Story = {
  name: '3b · Size — lg',
  args: {
    size: 'lg',
  },
};

// ─── 4 · Interactive Examples ────────────────────────────────────────────────

/**
 * Full-width search bar (common pattern in mobile/responsive layouts)
 */
export const FullWidth: Story = {
  name: '4a · Full width',
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * State matrix showing all variants side-by-side
 */
export const StateMatrix: Story = {
  name: '5 · State matrix',
  render: () => (
    <div className="bl-flex bl-flex-col bl-gap-md" style={{ width: 600 }}>
      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">Default (empty)</span>
        <SearchBar />
      </div>
      
      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">With value</span>
        <SearchBar value="Filled" />
      </div>

      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">With text (shows clear)</span>
        <SearchBar value="Casino slots" />
      </div>

      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">Disabled</span>
        <SearchBar disabled value="Disabled" />
      </div>

      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">Size: lg</span>
        <SearchBar size="lg" value="Large search" />
      </div>
    </div>
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: '✦ Playground',
  args: {
    size: 'md',
    placeholder: 'Search...',
    disabled: false,
  },
};
