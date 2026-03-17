import TokenPlayground from './TokenPlayground'

export default {
  title: 'Patterns/Play Layout',
  component: TokenPlayground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**WA Design System — Token Playground**

Interactive demo showing how semantic color tokens resolve across all 10 white-label brands.
Select any brand swatch to see widgets and token palette update in real time.

> ✱ Status tokens (critical / success / warning) use per-brand scale correction:
> dark themes use alpha tints, light themes use low-step pastels.
        `,
      },
    },
  },
}

export const Default = {
  name: 'Token Playground',
  render: () => <TokenPlayground />,
}
