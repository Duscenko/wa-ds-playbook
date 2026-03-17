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

/* ─── RESOURCES OVERVIEW PAGE ─── */

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
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px -12px rgba(0,0,0,0.5)';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            {/* Visual Header */}
            <div style={{ aspectHeight: '16/9', overflow: 'hidden', background: 'var(--bg2)', position: 'relative', aspectRatio: '16/9' }}>
              <img
                src={lib.image}
                alt={lib.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
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
/* ─── STORYBOOK PAGE ─── */
export function StorybookPage() {
  return (
    <div style={{ width: '100%', maxWidth: 900 }}>
      {/* Visual Cover */}
      <div style={{
        marginBottom: 40,
        borderRadius: 16,
        overflow: 'hidden',
        aspectRatio: '16/7',
        background: 'linear-gradient(135deg, #111113 0%, #212225 100%)',
        border: '1px solid var(--border)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            fontSize: 12, 
            fontWeight: 700, 
            color: 'var(--accent)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            marginBottom: 12
          }}>
            Component Library
          </div>
          <h1 style={{ 
            fontSize: 48, 
            fontWeight: 800, 
            color: '#fff', 
            fontFamily: 'var(--font-display)',
            margin: '0 0 20px 0'
          }}>
            WA TECHNOLOGY
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <div style={{ 
              fontSize: 24, 
              fontWeight: 300, 
              color: 'rgba(255,255,255,0.6)', 
              letterSpacing: '0.3em',
            }}>
              STORYBOOK
            </div>
          </div>
          
          <a 
            href="https://www.chromatic.com/library?appId=69b7d9b662538807801f2c61" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              marginTop: 32,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 24px',
              borderRadius: 8,
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(0, 144, 255, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View Full Storybook (Chromatic)
            <span style={{ fontSize: 16 }}>↗</span>
          </a>
        </div>
      </div>

      <SectionTitle sub="Interactive sandbox for WA Technology UI components">Storybook</SectionTitle>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 24 }}>
        <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7 }}>
          Storybook serves as our centralized, interactive component library. It allows developers and designers to build, test, and document UI components in isolation, ensuring that every element of the WA Design System is functional and consistent across all brands.
        </p>

        {/* Embedded Storybook Iframe */}
        <div style={{
          width: '100%',
          height: 800, // Increased height for better visibility
          borderRadius: 16,
          border: '1px solid var(--border)',
          background: 'var(--bg1)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 300ms ease',
        }}>
          <iframe 
            src="https://main--69b7d9b662538807801f2c61.chromatic.com/iframe.html?id=getting-started-introduction--docs&viewMode=docs"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#000', // Match dark theme while loading
            }}
            title="WA Technology Storybook Embed"
          />
        </div>

        <div style={{ 
          padding: 24, 
          borderRadius: 12, 
          background: 'var(--bg1)', 
          border: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20
        }}>
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>For Developers</h4>
            <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6 }}>
              Browse props, test event handlers, and see real-time code snippets for every atomic component.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>For Designers</h4>
            <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6 }}>
              Inspect visual states, responsiveness, and spacing without touching the main application code.
            </p>
          </div>
        </div>

        <div style={{ 
          marginTop: 12,
          padding: '20px 24px',
          borderRadius: 10,
          background: 'var(--accent-bg)',
          border: '1px solid var(--border-hover)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>Launch Local Sandbox</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>Requires development environment</div>
          </div>
          <code style={{ 
            background: 'rgba(0,0,0,0.3)', 
            padding: '6px 12px', 
            borderRadius: 6, 
            fontSize: 12, 
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)'
          }}>
            npm run storybook
          </code>
        </div>
      </div>
    </div>
  );
}
