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
export function ResourcesOverviewPage({ onNavigate }) {
  const resources = [
    {
      id: 'figma',
      title: 'Figma Libraries',
      desc: 'Production-ready component libraries and UI kits for all WA brands',
      icon: '🎨',
      color: 'var(--accent)',
      items: ['WA Design System', 'Belloa UI Kit', 'Pick\'em UI Kit'],
    },
    {
      id: 'json',
      title: 'JSON Token Exports',
      desc: 'Design tokens exported as JSON for build pipelines and style dictionaries',
      icon: '{ }',
      color: 'var(--green)',
      items: ['Primitives', 'Semantic Colors', 'Utility Tokens', 'Spacing & Typography'],
    },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 900 }}>
      {/* Hero Section */}
      <div style={{
        marginBottom: 48,
        padding: '64px 40px',
        borderRadius: 16,
        background: 'linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%)',
        border: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--border-subtle) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.4,
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 14px',
            borderRadius: 9999,
            background: 'var(--accent-bg)',
            border: '1px solid var(--accent)',
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 20,
          }}>
            Design Resources
          </div>

          <h1 style={{
            fontSize: 42,
            fontWeight: 700,
            color: 'var(--text)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            WA Design System<br />Resources Hub
          </h1>

          <p style={{
            fontSize: 16,
            color: 'var(--text2)',
            lineHeight: 1.7,
            maxWidth: 600,
          }}>
            Access Figma libraries, download token exports, and integrate the design system into your workflow. Everything you need to build consistent, accessible interfaces.
          </p>
        </div>

        {/* Accent decoration */}
        <div style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          opacity: 0.15,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Resource Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
      }}>
        {resources.map(resource => (
          <div
            key={resource.id}
            onClick={() => onNavigate(resource.id)}
            style={{
              padding: 28,
              borderRadius: 12,
              border: '1px solid var(--border)',
              background: 'var(--bg1)',
              cursor: 'pointer',
              transition: 'all var(--transition-slow)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = resource.color;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Icon */}
            <div style={{
              fontSize: 48,
              marginBottom: 20,
              opacity: 0.9,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: resource.color,
            }}>
              {resource.icon}
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--text)',
              fontFamily: 'var(--font-display)',
              marginBottom: 10,
              letterSpacing: '-0.3px',
            }}>
              {resource.title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: 14,
              color: 'var(--text3)',
              lineHeight: 1.6,
              marginBottom: 20,
            }}>
              {resource.desc}
            </p>

            {/* Items list */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              marginBottom: 24,
            }}>
              {resource.items.map((item, i) => (
                <div key={i} style={{
                  fontSize: 12,
                  color: 'var(--text2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <div style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: resource.color,
                    opacity: 0.6,
                  }} />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              color: resource.color,
            }}>
              Explore
              <span style={{ fontSize: 14 }}>→</span>
            </div>

            {/* Subtle background decoration */}
            <div style={{
              position: 'absolute',
              bottom: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${resource.color} 0%, transparent 70%)`,
              opacity: 0.06,
              pointerEvents: 'none',
            }} />
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div style={{
        marginTop: 48,
        padding: 24,
        borderRadius: 10,
        background: 'var(--bg1)',
        border: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 20,
      }}>
        {[
          { label: 'Component Libraries', value: '3' },
          { label: 'Token Files', value: '7' },
          { label: 'Brand Themes', value: '6' },
          { label: 'Active Users', value: '12+' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--accent)',
              fontFamily: 'var(--font-display)',
              marginBottom: 4,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: 11,
              color: 'var(--text3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
            margin: 0
          }}>
            WA TECHNOLOGY
          </h1>
          <div style={{ 
            fontSize: 24, 
            fontWeight: 300, 
            color: 'rgba(255,255,255,0.6)', 
            letterSpacing: '0.3em',
            marginTop: -4
          }}>
            STORYBOOK
          </div>
        </div>
      </div>

      <SectionTitle sub="Interactive sandbox for WA Technology UI components">Storybook</SectionTitle>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
        <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7 }}>
          Storybook serves as our centralized, interactive component library. It allows developers and designers to build, test, and document UI components in isolation, ensuring that every element of the WA Design System is functional and consistent across all brands.
        </p>

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
