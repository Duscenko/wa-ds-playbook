import { SectionTitle } from '../components/UI';
import primitives from '../data/primitives.json';
import semanticColors from '../data/semantic-colors.json';
import utility from '../data/utility.json';
import borderRadii from '../data/border-radii.json';
import borderRadiiAbsolute from '../data/border-radii---absolute.json';
import shadows from '../data/shadows.json';
import spacing from '../data/spacing.json';
import spacingAbsolute from '../data/spacing---absolute.json';
import typescale from '../data/typescale.json';

const handleDownload = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

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
  const resources = [
    { name: 'Primitives', filename: 'primitives.json', data: primitives, type: 'Base' },
    { name: 'Semantic Colors', filename: 'semantic-colors.json', data: semanticColors, type: 'Colors' },
    { name: 'Utility Tokens', filename: 'utility.json', data: utility, type: 'Tokens' },
    { name: 'Border Radii', filename: 'border-radii.json', data: borderRadii, type: 'Foundations' },
    { name: 'Shadows', filename: 'shadows.json', data: shadows, type: 'Foundations' },
    { name: 'Spacing', filename: 'spacing.json', data: spacing, type: 'Foundations' },
    { name: 'Typography Scale', filename: 'typescale.json', data: typescale, type: 'Foundations' },
  ];

  return (
    <div style={{ maxWidth: 700 }}>
      <SectionTitle sub="Token files for build pipelines and dev handoff">JSON Exports</SectionTitle>
      <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6, marginBottom: 24 }}>
        Tokens exported from Figma Variables as JSON. Use these files in your build process to generate CSS variables, Tailwind config, or style dictionaries.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
        {resources.map(res => (
          <div key={res.name} style={{
            padding: 18, borderRadius: 10,
            border: '1px solid var(--border)', background: 'var(--bg1)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            transition: 'border-color 150ms', cursor: 'pointer',
          }}
            onClick={() => handleDownload(res.data, res.filename)}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{res.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{res.filename}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                padding: '3px 10px', borderRadius: 9999, fontSize: 10,
                background: 'var(--bg2)', color: 'var(--text3)', fontFamily: 'var(--font-mono)', border: '1px solid var(--border)'
              }}>{res.type}</span>
              <span style={{ fontSize: 14, color: 'var(--accent)' }}>↓</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text3)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Token Preview</div>
        <div style={{
          padding: 20, borderRadius: 10,
          background: '#080808', border: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-hover)',
          overflow: 'auto', lineHeight: 1.7, whiteSpace: 'pre', maxHeight: 300,
        }}>
          {JSON.stringify(semanticColors, null, 2).slice(0, 1000)}...
        </div>
        <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 12 }}>
          Full JSON export available from Figma Variables panel → Export → JSON.
        </p>
      </div>
    </div>
  );
}
