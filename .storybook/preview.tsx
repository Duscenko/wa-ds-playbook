import type { Preview } from '@storybook/react-vite';
import { DocsContainer } from '@storybook/blocks';
import '../src/styles/belloa.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    
    backgrounds: {
      default: 'dark',
      values: [
        { 
          name: 'dark',  
          value: '#101211' // Belloa surface-page dark
        },
      ],
    },
    
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    
    actions: { argTypesRegex: '^on[A-Z].*' },
    
    docs: {
      toc: true,
      container: ({ children, context }) => {
        const { create } = require('@storybook/theming/create');
        const darkTheme = create({
          base: 'dark',
          appBg: '#101211',
          appContentBg: '#171918',
          textColor: '#edeef0',
          textInverseColor: '#101211',
          barBg: '#171918',
          barTextColor: '#b0b4ba',
          inputBg: '#202221',
          inputTextColor: '#edeef0',
        });
        
        return (
          <div className="dark" style={{ background: '#101211', color: '#edeef0', minHeight: '100vh', padding: '2rem' }}>
            <DocsContainer context={context} theme={darkTheme}>
              {children}
            </DocsContainer>
          </div>
        );
      },
    },
  },

  // DARK MODE ONLY - Always dark
  decorators: [
    (Story) => (
      <div
        className="dark"
        style={{
          colorScheme: 'dark',
          background: '#101211',
          minHeight: '100vh',
          padding: '2rem',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
