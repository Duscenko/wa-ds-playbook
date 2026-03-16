import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'dark',
  
  // Branding
  brandTitle: 'WA Design System',
  brandUrl: 'https://wa-ds-playbook.vercel.app/',
  brandImage: '/logo-wa.svg', // Logo WA Technology
  brandTarget: '_blank',
  
  // Colors
  colorPrimary: '#0eb39e', // Belloa teal
  colorSecondary: '#0eb39e',
  
  // UI
  appBg: '#101211', // surface-page dark
  appContentBg: '#171918', // surface-layer-1
  appBorderColor: 'rgba(249, 250, 251, 0.07)', // border-subtle
  appBorderRadius: 8,
  
  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',
  
  // Text colors
  textColor: '#edeef0', // content-primary
  textInverseColor: '#101211',
  textMutedColor: '#717d79', // content-subtle
  
  // Toolbar
  barTextColor: '#b0b4ba', // content-secondary
  barSelectedColor: '#0eb39e', // teal
  barBg: '#171918', // surface-layer-1
  
  // Form
  inputBg: '#202221', // surface-layer-2
  inputBorder: 'rgba(249, 250, 251, 0.31)', // border-default
  inputTextColor: '#edeef0',
  inputBorderRadius: 8,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});
