# Token Playground — Integration Guide v2

## Changes in this version
- **Sticky header fixed** — `overflow: clip` replaces `hidden` on `.tp-root`
  `overflow: hidden` creates a containing block that breaks `position: sticky` on children.
  `overflow: clip` visually clips the same way but does NOT create a scroll container.
- **Half-circle swatches** — each swatch SVG shows left=neutral surface (`sp`), right=brand accent (`gs`)
- **Custom sport icons** — inline SVG paths from WA Design System (Football, Basketball, Tennis, Volleyball)
  `fill` is driven by CSS (`currentColor`) so active/inactive states work automatically.

## Files

| File | Purpose |
|---|---|
| `TokenPlayground.jsx` | React component |
| `TokenPlayground.css` | Scoped styles, all vars `--pg-*` |
| `TokenPlayground.stories.jsx` | Storybook 8 story → PATTERNS / Play Layout |

## Integration steps (same as before)

1. Copy `TokenPlayground.jsx` + `TokenPlayground.css` to `src/components/TokenPlayground/`
2. Copy `TokenPlayground.stories.jsx` next to them
3. `npm install lucide` if vanilla lucide isn't installed yet (lucide-react is separate)

## Sticky in Storybook context

The component header will sticky-scroll within whatever container Storybook puts it in.
If Storybook uses `layout: 'fullscreen'` (already set in the story) the sticky will
attach to the viewport. If it uses a padded canvas, add:

```css
/* In your storybook preview styles if needed */
.sb-main-padded { overflow: auto; }
```

## Sticky in Playbook React SPA context

The component is rendered inside a scrollable route container. Sticky will work
as long as no ancestor between `.tp-root` and the scroll container has `overflow: hidden`.
If it doesn't stick, check the parent route wrapper and ensure it uses `overflow: auto`
or `overflow: scroll`, not `overflow: hidden`.

## Status token fix (same as v1)

| Token | Brand | Was (❌) | Now (✅) |
|---|---|---|---|
| `status/critical-background` | belloa-light | `red-light.1100` = `#cd2b31` | `red-light.300` = `#ffefef` |
| `status/critical-background` | superbetin | `red-light.1000` = `#dc3d43` | `red-light.300` = `#ffefef` |
| `status/success-background` | belloa-light | `green-light.1100` = `#18794e` | `green-light.300` = `#e9f9ee` |
| `status/success-background` | superbetin | `green-light.1100` = `#18794e` | `green-light.300` = `#e9f9ee` |

Apply these fixes to the source JSON tokens in Luckino before the next export.
