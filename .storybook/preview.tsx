import type { Preview } from '@storybook/react-vite';
import { DocsContainer } from '@storybook/blocks';
import { create } from '@storybook/theming/create';
import '../src/styles/belloa.css';

// Dark theme para documentación
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
  colorPrimary: '#0eb39e',
  colorSecondary: '#0eb39e',
});

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

    options: {
      storySort: {
        order: ['Getting Started', 'Overview', 'Belloa', '*'],
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
        return (
          <div 
            className="dark docs-container-wrapper" 
            style={{ 
              background: '#101211', 
              color: '#edeef0', 
              minHeight: '100vh', 
              padding: '2rem',
              colorScheme: 'dark',
            }}
          >
            <style>{`
              .docs-container-wrapper * {
                color: inherit !important;
              }
              .docs-container-wrapper h1,
              .docs-container-wrapper h2,
              .docs-container-wrapper h3,
              .docs-container-wrapper h4,
              .docs-container-wrapper h5,
              .docs-container-wrapper h6 {
                color: #edeef0 !important;
              }
              .docs-container-wrapper p,
              .docs-container-wrapper li,
              .docs-container-wrapper td,
              .docs-container-wrapper th,
              .docs-container-wrapper span,
              .docs-container-wrapper div,
              .docs-container-wrapper a {
                color: #edeef0 !important;
              }
              .docs-container-wrapper code {
                color: #0eb39e !important;
                background: #202221 !important;
                padding: 2px 6px;
                border-radius: 4px;
              }
              .docs-container-wrapper pre {
                background: #202221 !important;
                border: 1px solid rgba(249, 250, 251, 0.07);
              }
              .docs-container-wrapper table {
                border: 1px solid rgba(249, 250, 251, 0.07);
              }
              .docs-container-wrapper th {
                background: #171918 !important;
              }
              .docs-container-wrapper td {
                border-color: rgba(249, 250, 251, 0.07) !important;
              }
            `}</style>
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
