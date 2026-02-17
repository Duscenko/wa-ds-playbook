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
    {
      name: 'WA Design System',
      desc: 'Core component library and foundations based on shadcn/ui.',
      link: 'https://www.figma.com/design/wrvnJAE17VDXukPSYeua2r/WA-Design-system--Beta---Obra-shadcn?node-id=272-27980',
      image: '/cover-ds.png',
    },
    {
      name: 'Belloa UI Kit',
      desc: 'Official UI Kit for the Belloa sports betting platform.',
      link: 'https://www.figma.com/design/URIYKbGlC4kZTfVWXgSsDl/WA-Belloa-Library--UI-KIT-?m=auto&node-id=54474-14422',
      image: '/cover-belloa.png',
    },
    {
      name: 'Pick\'em UI Kit',
      desc: 'Fantasy Pick\'em project library and mobile patterns.',
      link: 'https://www.figma.com/design/EEbNps8rzKrdcoKry16iBQ/WA-Fantasy-PickEm--UI-KIT-?m=auto&node-id=3426-47387',
      image: '/cover-pickem.png',
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <SectionTitle sub="Figma files that power the design system">Figma Library</SectionTitle>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20,
        marginTop: 24
      }}>
        {libraries.map(lib => (
          <div
            key={lib.name}
            onClick={() => window.open(lib.link, '_blank')}
            style={{
              borderRadius: 12,
              border: '1px solid var(--border)',
              background: 'var(--bg1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 200ms ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px -12px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Visual Header */}
            <div style={{ height: 160, overflow: 'hidden', background: 'var(--bg2)' }}>
              <img
                src={lib.image}
                alt={lib.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--text)',
                fontFamily: 'var(--font-display)',
                marginBottom: 6
              }}>
                {lib.name}
              </div>
              <div style={{
                fontSize: 13,
                color: 'var(--text3)',
                lineHeight: 1.5,
                marginBottom: 20,
                flex: 1
              }}>
                {lib.desc}
              </div>

              {/* Button */}
              <div style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'var(--bg2)',
                color: 'var(--accent)',
                fontSize: 12,
                fontWeight: 600,
                textAlign: 'center',
                border: '1px solid var(--border)',
                transition: 'all 150ms',
              }}
                onMouseEnter={e => {
                  e.stopPropagation();
                  e.currentTarget.style.background = 'var(--accent-bg)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={e => {
                  e.stopPropagation();
                  e.currentTarget.style.background = 'var(--bg2)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                See Project
              </div>
            </div>
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
