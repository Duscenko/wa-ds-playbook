import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Plus, ArrowRight, Download, Trash2 } from 'lucide-react';
import '../../../styles/belloa.css';
import Button from './Button';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: 'Belloa / Atoms / Button',
  component: Button,

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
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
      description: 'Visual style.',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Height / padding scale. `md` matches the Figma spec.',
      table: { category: 'Appearance' },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to container width.',
      table: { category: 'Appearance' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows spinner and disables interaction.',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    children: {
      control: 'text',
      table: { category: 'Content' },
    },
    leadingIcon:  { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },

  args: {
    children: 'Button CTA',
    size: 'md',
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 1 · Figma reference — Primary ───────────────────────────────────────────

/**
 * Pixel-faithful to the Figma node 58046-92508.
 * bg-action-primary · border-2 white/12 · skeuomorphic depth overlay.
 */
export const Primary: Story = {
  name: '1 · Primary (Figma ref)',
  args: { variant: 'primary' },
};

// ─── 2 · All variants ────────────────────────────────────────────────────────

export const Secondary: Story = {
  name: '2a · Secondary',
  args: { variant: 'secondary' },
};

export const Outline: Story = {
  name: '2b · Outline',
  args: { variant: 'outline' },
};

export const Ghost: Story = {
  name: '2c · Ghost',
  args: { variant: 'ghost' },
};

export const Destructive: Story = {
  name: '2d · Destructive',
  args: { variant: 'destructive', children: 'Delete account' },
};

// ─── 3 · Sizes ───────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: '3a · Size — sm',
  args: { variant: 'primary', size: 'sm', children: 'Small' },
};

export const SizeMedium: Story = {
  name: '3b · Size — md  (Figma default)',
  args: { variant: 'primary', size: 'md' },
};

export const SizeLarge: Story = {
  name: '3c · Size — lg',
  args: { variant: 'primary', size: 'lg', children: 'Large' },
};

// ─── 4 · Icons ───────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  name: '4a · Leading icon',
  args: {
    variant: 'primary',
    children: 'Deposit',
    leadingIcon: <Plus size={16} />,
  },
};

export const WithTrailingIcon: Story = {
  name: '4b · Trailing icon',
  args: {
    variant: 'outline',
    children: 'Continue',
    trailingIcon: <ArrowRight size={16} />,
  },
};

export const WithBothIcons: Story = {
  name: '4c · Both icons',
  args: {
    variant: 'secondary',
    children: 'Download',
    leadingIcon:  <Download size={16} />,
    trailingIcon: <ArrowRight size={14} />,
  },
};

// ─── 5 · States ──────────────────────────────────────────────────────────────

export const Loading: Story = {
  name: '5a · Loading',
  args: { variant: 'primary', isLoading: true },
};

export const Disabled: Story = {
  name: '5b · Disabled',
  args: { variant: 'primary', disabled: true },
};

export const FullWidth: Story = {
  name: '5c · Full width',
  args: { variant: 'primary', fullWidth: true },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

// ─── 6 · Variant matrix ──────────────────────────────────────────────────────

/**
 * All 5 variants side-by-side at md size — useful for visual regression.
 */
export const VariantMatrix: Story = {
  name: '6 · Variant matrix',
  render: () => (
    <div className="bl-flex bl-flex-col bl-gap-xs">
      {(['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const).map(
        (variant) => (
          <div key={variant} className="bl-flex bl-items-center bl-gap-md">
            <span className="bl-text-content-subtle bl-text-paragraph-xs bl-w-[90px] bl-text-right bl-shrink-0">
              {variant}
            </span>
            <Button variant={variant}>Button CTA</Button>
            <Button variant={variant} disabled>Disabled</Button>
            <Button variant={variant} isLoading>Loading</Button>
            <Button variant={variant} leadingIcon={<Plus size={14} />}>With icon</Button>
          </div>
        ),
      )}
    </div>
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: '✦ Playground',
  args: {
    variant:   'primary',
    size:      'md',
    fullWidth: false,
    isLoading: false,
    disabled:  false,
    children:  'Button CTA',
  },
};
