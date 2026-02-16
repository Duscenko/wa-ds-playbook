import { SectionTitle } from '../components/UI';
import { semantic } from '../data/tokens';

export function FigmaLibraryPage() {
  const libraries = [
    { name: 'WA Component Library', desc: 'All shadcn/ui atoms + custom components', type: 'Components' },
    { name: 'WA Variables', desc: 'Primitives, Utility, Semantic token collections', type: 'Variables' },
    { name: 'WA Icons', desc: 'Lucide icon set with custom additions', type: 'Icons' },
  ];

  return (
    <div style={{ maxWidth: 700 }}>
      <SectionTitle sub="Figma files that power the design system">Figma Library</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {libraries.map(lib => (
          <div key={lib.name} style={{
            padding: 18, borderRadius: 10,
            border: '1px solid var(--border)', background: 'var(--bg1)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            transition: 'border-color 150ms', cursor: 'pointer',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{lib.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{lib.desc}</div>
            </div>
            <span style={{
              padding: '3px 10px', borderRadius: 9999, fontSize: 10,
              background: 'var(--accent-bg)', color: 'var(--accent)', fontFamily: 'var(--font-mono)',
            }}>{lib.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function JsonExportsPage() {
  const jsonPreview = JSON.stringify({
    "Content.Primary": { dark: "{neutral-dark.1200}", light: "{neutral-light.1200}" },
    "Content.secondary": { dark: "{neutral-dark.1100}", light: "{neutral-light.1100}" },
    "Action.primary": { dark: "{main-dark.600}", light: "{main-light.900}" },
    "Surface.page": { dark: "{neutral-dark.100}", light: "{neutral-light.100}" },
    "Status.critical-fg": { dark: "{red-dark.1000}", light: "{red-light.1000}" },
  }, null, 2);

  return (
    <div style={{ maxWidth: 700 }}>
      <SectionTitle sub="Token files for build pipelines and dev handoff">JSON Exports</SectionTitle>
      <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6, marginBottom: 20 }}>
        Tokens exported from Figma Variables as JSON. Use these files in your build process to generate CSS variables, Tailwind config, or style dictionaries.
      </p>
      <div style={{
        padding: 20, borderRadius: 10,
        background: '#080808', border: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-hover)',
        overflow: 'auto', lineHeight: 1.7, whiteSpace: 'pre',
      }}>
        {jsonPreview}
      </div>
      <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 12 }}>
        Full JSON export available from Figma Variables panel → Export → JSON.
      </p>
    </div>
  );
}
