import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import '../../../styles/belloa.css';
import TextField from './TextField';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TextField> = {
  title: 'Belloa / Atoms / TextField',
  component: TextField,

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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url'],
      description: 'Input type.',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'radio',
      options: ['md', 'lg'],
      description: 'Size variant. `lg` is default for forms.',
      table: { category: 'Appearance' },
    },
    status: {
      control: 'radio',
      options: ['default', 'error', 'success'],
      description: 'Visual status state.',
      table: { category: 'Appearance' },
    },
    label: {
      control: 'text',
      description: 'Label text above the input.',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text.',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input.',
      table: { category: 'Content' },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (overrides helperText when status="error").',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    onChange: { table: { disable: true } },
  },

  args: {
    placeholder: 'Enter text...',
    size: 'lg',
    status: 'default',
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 1 · Figma reference — Default ───────────────────────────────────────────

/**
 * Pixel-faithful to the Figma Obra-shadcn TextField spec.
 * bg-surface-layer-1 · border-subtle · rounded-xl (12px).
 */
export const Default: Story = {
  name: '1 · Default (Figma ref)',
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

// ─── 2 · Types ───────────────────────────────────────────────────────────────

export const Email: Story = {
  name: '2a · Email',
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export const Password: Story = {
  name: '2b · Password (with toggle)',
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const Telephone: Story = {
  name: '2c · Telephone',
  args: {
    type: 'tel',
    label: 'Phone',
    placeholder: '+1 (555) 000-0000',
  },
};

// ─── 3 · Status States ───────────────────────────────────────────────────────

export const WithHelperText: Story = {
  name: '3a · With helper text',
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Must be at least 3 characters',
  },
};

export const Error: Story = {
  name: '3b · Error state',
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    status: 'error',
    errorMessage: 'Please enter a valid email address',
  },
};

export const Success: Story = {
  name: '3c · Success state',
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    value: 'user@example.com',
    status: 'success',
    helperText: 'Email verified successfully',
  },
};

export const Disabled: Story = {
  name: '3d · Disabled',
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    value: 'locked@example.com',
    disabled: true,
  },
};

// ─── 4 · Sizes ───────────────────────────────────────────────────────────────

export const SizeMedium: Story = {
  name: '4a · Size — md',
  args: {
    size: 'md',
    label: 'Medium size',
    placeholder: 'Compact input',
  },
};

export const SizeLarge: Story = {
  name: '4b · Size — lg (default)',
  args: {
    size: 'lg',
    label: 'Large size',
    placeholder: 'Default form size',
  },
};

// ─── 5 · Form Example ────────────────────────────────────────────────────────

export const LoginForm: Story = {
  name: '5 · Login form example',
  render: () => (
    <div className="bl-flex bl-flex-col bl-gap-4" style={{ width: 360 }}>
      <TextField
        type="email"
        label="Email"
        placeholder="you@example.com"
      />
      <TextField
        type="password"
        label="Password"
        placeholder="Enter your password"
      />
    </div>
  ),
};

// ─── 6 · State Matrix ────────────────────────────────────────────────────────

export const StateMatrix: Story = {
  name: '6 · State matrix',
  render: () => (
    <div className="bl-flex bl-flex-col bl-gap-md" style={{ width: 400 }}>
      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">Default</span>
        <TextField label="Email" placeholder="Enter email" />
      </div>

      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">With value</span>
        <TextField label="Email" value="user@example.com" />
      </div>

      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">Error state</span>
        <TextField 
          label="Email" 
          value="invalid-email" 
          status="error" 
          errorMessage="Please enter a valid email"
        />
      </div>

      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">Success state</span>
        <TextField 
          label="Email" 
          value="user@example.com" 
          status="success" 
          helperText="Email verified"
        />
      </div>

      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">Password (with toggle)</span>
        <TextField 
          type="password" 
          label="Password" 
          placeholder="Enter password"
        />
      </div>

      <div className="bl-flex bl-flex-col bl-gap-2">
        <span className="bl-text-content-subtle bl-text-paragraph-xs">Disabled</span>
        <TextField 
          label="Email" 
          value="locked@example.com" 
          disabled
        />
      </div>
    </div>
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: '✦ Playground',
  args: {
    type: 'text',
    size: 'lg',
    status: 'default',
    label: 'Label',
    placeholder: 'Enter text...',
    helperText: '',
    errorMessage: '',
    disabled: false,
  },
};
