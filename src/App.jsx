import { useState, useEffect } from 'react';
import { componentDocs, componentIds } from './data/components';
import { useTheme } from './components/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';

import { IntroductionPage, PrinciplesPage, TokenArchitecturePage } from './pages/GetStarted';
import { ColorPage, TypographyPage, SpacingPage, RadiiPage, ShadowsPage, ChartColorsPage } from './pages/Foundations';
import { TokensPage, ComponentsOverview, ComponentDetailPage, PatternsPage } from './pages/DesignSystem';
import { FigmaLibraryPage, JsonExportsPage } from './pages/Resources';

/* ─── NAV TREE ────────────────────────────────── */
const NAV = [
  { id: 's', label: 'Get Started', children: [
    { id: 'intro',      label: 'Introduction' },
    { id: 'principles', label: 'Principles' },
    { id: 'arch',       label: 'Token Architecture' },
  ]},
  { id: 'f', label: 'Foundations', children: [
    { id: 'color',   label: 'Color' },
    { id: 'typo',    label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radii',   label: 'Border Radii' },
    { id: 'shadows', label: 'Shadows' },
    { id: 'charts',  label: 'Chart Colors' },
  ]},
  { id: 'd', label: 'Design System', children: [
    { id: 'tokens',   label: 'Tokens' },
    { id: 'comps',    label: 'Components' },
    ...componentIds.map(cid => ({
      id: 'c-' + cid, label: componentDocs[cid].name, isComponent: true,
    })),
    { id: 'patterns', label: 'Patterns' },
  ]},
  { id: 'r', label: 'Resources', children: [
    { id: 'figma', label: 'Figma Library' },
    { id: 'json',  label: 'JSON Exports' },
  ]},
];

/* ─── APP ─────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('intro');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expanded, setExpanded] = useState(['s', 'f', 'd', 'r']);

  const { getCSSVars, brand, mode, radius } = useTheme();

  /* ── Inject CSS variables whenever theme changes ── */
  useEffect(() => {
    const vars = getCSSVars();
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [getCSSVars, brand, mode, radius]);

  const toggleSection = (id) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  /* ── Find current breadcrumb ── */
  let currentSection = null;
  let currentChild = null;
  NAV.forEach(s =>
    s.children.forEach(c => {
      if (c.id === page) { currentSection = s; currentChild = c; }
    })
  );

  /* ── Route to page content ── */
  const isComponentPage = page.startsWith('c-');
  const componentKey = isComponentPage ? page.slice(2) : null;

  let content = null;
  if      (isComponentPage && componentKey) content = <ComponentDetailPage componentId={componentKey} />;
  else if (page === 'intro')      content = <IntroductionPage />;
  else if (page === 'principles') content = <PrinciplesPage />;
  else if (page === 'arch')       content = <TokenArchitecturePage />;
  else if (page === 'color')      content = <ColorPage />;
  else if (page === 'typo')       content = <TypographyPage />;
  else if (page === 'spacing')    content = <SpacingPage />;
  else if (page === 'radii')      content = <RadiiPage />;
  else if (page === 'shadows')    content = <ShadowsPage />;
  else if (page === 'charts')     content = <ChartColorsPage />;
  else if (page === 'tokens')     content = <TokensPage />;
  else if (page === 'comps')      content = <ComponentsOverview onNavigate={setPage} />;
  else if (page === 'patterns')   content = <PatternsPage />;
  else if (page === 'figma')      content = <FigmaLibraryPage />;
  else if (page === 'json')       content = <JsonExportsPage />;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: 'var(--bg)', color: 'var(--text)',
      fontFamily: 'var(--font)', transition: 'background 250ms, color 250ms',
    }}>

      {/* ═══ SIDEBAR ═══════════════════════════════ */}
      <aside style={{
        width: sidebarOpen ? 240 : 0, flexShrink: 0,
        transition: 'width 200ms ease', overflow: 'hidden',
        borderRight: '1px solid var(--border)', background: 'var(--bg1)',
      }}>
        <div style={{
          width: 240, height: '100vh', display: 'flex',
          flexDirection: 'column', position: 'sticky', top: 0,
        }}>
          {/* Logo */}
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 'var(--radius)',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-pressed, var(--accent)))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13, color: '#fff',
                fontFamily: 'var(--font-display)',
              }}>W</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)' }}>WA Design System</div>
                <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>v1.0 Playbook</div>
              </div>
            </div>
          </div>

          {/* Nav Tree */}
          <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}>
            {NAV.map(section => {
              const isOpen = expanded.includes(section.id);
              return (
                <div key={section.id} style={{ marginBottom: 4 }}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', padding: '6px 8px',
                      borderRadius: 'var(--radius-sm)', fontSize: 10,
                      fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.08em', color: 'var(--text3)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font)',
                    }}
                  >
                    {section.label}
                    <span style={{
                      fontSize: 9, transition: 'transform 200ms',
                      transform: isOpen ? 'rotate(0)' : 'rotate(-90deg)',
                    }}>▾</span>
                  </button>

                  {isOpen && (
                    <div style={{ marginLeft: 4 }}>
                      {section.children.map(child => {
                        const isActive = page === child.id;
                        return (
                          <button
                            key={child.id}
                            onClick={() => setPage(child.id)}
                            style={{
                              display: 'block', width: '100%', textAlign: 'left',
                              padding: '5px 10px',
                              paddingLeft: child.isComponent ? 22 : 10,
                              borderRadius: 'var(--radius-sm)',
                              fontSize: 13, fontFamily: 'var(--font)',
                              color: isActive
                                ? 'var(--accent)'
                                : child.isComponent ? 'var(--text3)' : 'var(--text2)',
                              background: isActive
                                ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                                : 'transparent',
                              border: 'none', cursor: 'pointer',
                              marginBottom: 1, transition: 'all 120ms',
                            }}
                            onMouseEnter={e => {
                              if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                            }}
                            onMouseLeave={e => {
                              if (!isActive) e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            {child.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div style={{
            padding: '12px 18px', borderTop: '1px solid var(--border)',
            fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-mono)',
          }}>
            WA Technology &copy; 2026
          </div>
        </div>
      </aside>

      {/* ═══ MAIN AREA ═════════════════════════════ */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* ── Header with ThemeSwitcher ── */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 28px', height: 48,
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Collapse toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                width: 28, height: 28, borderRadius: 'var(--radius-sm)',
                background: 'var(--bg2)', border: '1px solid var(--border)',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'var(--text3)',
                fontSize: 11, transition: 'all 120ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>

            {/* Breadcrumb */}
            <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
              {currentSection?.label || ''} / {currentChild?.label || ''}
            </span>
          </div>

          {/* ★ Theme Controls ★ */}
          <ThemeSwitcher />
        </header>

        {/* ── Page Content ── */}
        <div
          className="fade-in"
          key={`${page}-${brand}-${mode}-${radius}`}
          style={{ padding: '36px 44px', flex: 1 }}
        >
          {content}
        </div>
      </main>
    </div>
  );
}
