import type { Preview } from '@storybook/react-vite';
import '../src/styles/belloa.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        className="dark"
        style={{ colorScheme: 'dark', background: '#0F172A', minHeight: '100vh', padding: '1rem' }}
      >
        <Story />
      </div>
    ),
  ],

  parameters: {
    layout: 'fullscreen',

    backgrounds: {
      default: 'belloa-dark',
      values: [
        { name: 'belloa-dark',  value: '#0F172A' },
        { name: 'belloa-light', value: '#FCFCFD' },
      ],
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
