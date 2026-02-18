/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/belloa/**/*.{js,jsx,ts,tsx}',
    './.storybook/**/*.{js,ts}',
  ],

  prefix: 'bl-',

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // Content
        'content-primary':   'var(--bl-content-primary)',
        'content-on-action': 'var(--bl-content-on-action)',
        'content-secondary': 'var(--bl-content-secondary)',
        'content-subtle':    'var(--bl-content-subtle)',
        'content-inverse':   'var(--bl-content-inverse)',
        'content-accent':    'var(--bl-content-accent)',

        // Action
        'action-primary':   'var(--bl-action-primary)',
        'action-neutral':   'var(--bl-action-neutral)',
        'action-secondary': 'var(--bl-action-secondary)',
        'action-disabled':  'var(--bl-action-disabled)',

        // Surface
        'surface-page':    'var(--bl-surface-page)',
        'surface-layer-1': 'var(--bl-surface-layer-1)',
        'surface-layer-2': 'var(--bl-surface-layer-2)',
        'surface-accent':  'var(--bl-surface-accent)',
        'surface-inverse': 'var(--bl-surface-inverse)',
        'surface-overlay': 'var(--bl-surface-overlay)',

        // Border
        'border-default':  'var(--bl-border-default)',
        'border-accent':   'var(--bl-border-accent)',
        'border-subtle':   'var(--bl-border-subtle)',
        'border-active':   'var(--bl-border-active)',
        'border-critical': 'var(--bl-border-critical)',
        'border-warning':  'var(--bl-border-warning)',
        'border-success':  'var(--bl-border-success)',

        // Status
        'status-critical-bg': 'var(--bl-status-critical-bg)',
        'status-critical-fg': 'var(--bl-status-critical-fg)',
        'status-warning-bg':  'var(--bl-status-warning-bg)',
        'status-warning-fg':  'var(--bl-status-warning-fg)',
        'status-success-bg':  'var(--bl-status-success-bg)',
        'status-success-fg':  'var(--bl-status-success-fg)',

        // Belloa brand primitive scale (teal)
        brand: {
          100:  '#0D1514',
          200:  '#111C1B',
          300:  '#0D2D2A',
          400:  '#023B37',
          500:  '#084843',
          600:  '#145750',
          700:  '#1C6961',
          800:  '#207E73',
          900:  '#12A594',
          1000: '#0EB39E',
          1100: '#0BD8B6',
          1200: '#ADF0DD',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'monospace'],
      },

      fontSize: {
        'heading-01':   ['48px', { lineHeight: '52px',   letterSpacing: '-0.094rem', fontWeight: '600' }],
        'heading-02':   ['30px', { lineHeight: '32px',   letterSpacing: '-0.063rem', fontWeight: '600' }],
        'heading-03':   ['24px', { lineHeight: '28.8px', letterSpacing: '-0.063rem', fontWeight: '600' }],
        'heading-04':   ['20px', { lineHeight: '24px',   letterSpacing: '0',         fontWeight: '600' }],
        'paragraph-lg': ['18px', { lineHeight: '22px',   letterSpacing: '0' }],
        'paragraph-md': ['16px', { lineHeight: '20px',   letterSpacing: '0' }],
        'paragraph-sm': ['14px', { lineHeight: '18px',   letterSpacing: '0' }],
        'paragraph-xs': ['12px', { lineHeight: '14px',   letterSpacing: '0' }],
        'monospace':    ['16px', { lineHeight: '24px',   letterSpacing: '0' }],
      },

      spacing: {
        '0x':  '0px',
        '3xs': '2px',
        '2xs': '4px',
        'xs':  '8px',
        'sm':  '12px',
        'md':  '16px',
        'lg':  '20px',
        'xl':  '24px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '48px',
        '5xl': '64px',
      },

      borderRadius: {
        'sharp': '0px',
        'xs':    '2px',
        'sm':    '4px',
        'md':    '6px',
        'lg':    '8px',
        'base':  '10px',
        'xl':    '12px',
        '2xl':   '16px',
        '3xl':   '24px',
        'full':  '9999px',
      },

      boxShadow: {
        '2xs': '0 1px 0 rgba(0,0,0,.03)',
        'xs':  '0 1px 2px rgba(0,0,0,.04)',
        'sm':  '0 2px 4px rgba(0,0,0,.05)',
        'md':  '0 4px 8px -1px rgba(0,0,0,.07)',
        'lg':  '0 10px 15px -3px rgba(0,0,0,.1)',
        'xl':  '0 20px 25px -5px rgba(0,0,0,.12)',
        '2xl': '0 25px 50px -12px rgba(0,0,0,.18)',
      },
    },
  },

  plugins: [],
};
