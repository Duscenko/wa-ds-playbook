import { useState, useEffect } from 'react';
import { componentDocs, componentIds } from './data/components';
import { useTheme } from './components/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';

import { IntroductionPage, PrinciplesPage, TokenArchitecturePage } from './pages/GetStarted';
import { ColorPage, TypographyPage, SpacingPage, RadiiPage, ShadowsPage, ChartColorsPage } from './pages/Foundations';
import { ChevronDown } from './components/UI';
import { ComponentsOverview, ComponentDetailPage, PatternsPage } from './pages/DesignSystem';
// Resources pages  
import { ResourcesOverviewPage, FigmaLibraryPage, JsonExportsPage } from './pages/Resources';

/* ─── NAV TREE ────────────────────────────────── */
const NAV = [
  {
    id: 'get-started', label: 'Get Started', children: [
      { id: 'intro', label: 'Introduction' },
      { id: 'principles', label: 'Principles' },
      { id: 'arch', label: 'Token Architecture' },
    ]
  },
  {
    id: 'foundations', label: 'Foundations', children: [
      { id: 'color', label: 'Color' },
      { id: 'typo', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'radii', label: 'Border Radii' },
      { id: 'shadows', label: 'Shadows' },
      { id: 'charts', label: 'Chart Colors' },
    ]
  },
  {
    id: 'components', label: 'Components', children: [
      { id: 'comps', label: 'Overview' },
      ...componentIds.map(cid => ({
        id: 'c-' + cid, label: componentDocs[cid].name, isComponent: true,
      })),
    ]
  },
  {
    id: 'patterns-group', label: 'Patterns', children: [
      { id: 'patterns-navigation', label: 'Navigation' },
      { id: 'patterns-cards', label: 'Cards' },
      { id: 'patterns-forms', label: 'Forms' },
    ]
  },
  {
    id: 'resources', label: 'Resources', children: [
      { id: 'resources-overview', label: 'Overview' },
      { id: 'figma', label: 'Figma Library' },
      { id: 'json', label: 'JSON Exports' },
    ]
  },
];

/* ─── ICONS ───────────────────────────────────── */


/* ─── APP ─────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('intro');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Force initial state: Get Started open, others closed
  const [expanded, setExpanded] = useState(['get-started']);
  const [expandedSubs, setExpandedSubs] = useState([]);

  const { getCSSVars, mode } = useTheme();

  /* ── Inject CSS variables whenever theme changes ── */
  useEffect(() => {
    const vars = getCSSVars();
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [getCSSVars, mode]);

  const toggleSection = (id) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
    
    // Navigate to overview when opening Resources section
    if (id === 'resources' && !expanded.includes(id)) {
      setPage('resources-overview');
    }
  };

  /* ── Find current breadcrumb ── */
  let currentSection = null;
  let currentChild = null;
  let currentSubChild = null;
  NAV.forEach(s => {
    s.children.forEach(c => {
      if (c.id === page) {
        currentSection = s;
        currentChild = c;
      } else if (c.children) {
        c.children.forEach(sub => {
          if (sub.id === page) {
            currentSection = s;
            currentChild = c;
            currentSubChild = sub;
          }
        });
      }
    });
  });

  /* ── Route to page content ── */
  const isComponentPage = page.startsWith('c-');
  const componentKey = isComponentPage ? page.slice(2) : null;
  const isPatternSubcategory = page.startsWith('patterns-');
  const patternCategory = isPatternSubcategory ? page.replace('patterns-', '') : null;

  let content = null;
  if (isComponentPage && componentKey) content = <ComponentDetailPage componentId={componentKey} />;
  else if (page === 'intro') content = <IntroductionPage />;
  else if (page === 'principles') content = <PrinciplesPage />;
  else if (page === 'arch') content = <TokenArchitecturePage />;
  else if (page === 'color') content = <ColorPage />;
  else if (page === 'typo') content = <TypographyPage />;
  else if (page === 'spacing') content = <SpacingPage />;
  else if (page === 'radii') content = <RadiiPage />;
  else if (page === 'shadows') content = <ShadowsPage />;
  else if (page === 'charts') content = <ChartColorsPage />;
  else if (page === 'comps') content = <ComponentsOverview onNavigate={setPage} />;
  else if (isPatternSubcategory) content = <PatternsPage category={patternCategory} />;
  else if (page === 'patterns') content = <PatternsPage />;
  else if (page === 'resources-overview') content = <ResourcesOverviewPage onNavigate={setPage} />;
  else if (page === 'figma') content = <FigmaLibraryPage />;
  else if (page === 'json') content = <JsonExportsPage />;

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
              <img
                src="/logo-wa.png"
                alt="WA Logo"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius)',
                  objectFit: 'contain'
                }}
              />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)' }}>WA Design System</div>
                <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>v1.0 Playbook</div>
              </div>
            </div>
          </div>

          {/* Nav Tree */}
          <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
            {NAV.map(section => {
              const isOpen = expanded.includes(section.id);
              return (
                <div key={section.id} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)', fontSize: 11,
                      fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: 'var(--text3)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font)',
                      transition: 'all 150ms',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; }}
                  >
                    {section.label}
                    <ChevronDown rotated={isOpen} />
                  </button>

                  {isOpen && (
                    <div style={{ marginTop: 4 }}>
                      {section.children.map(child => {
                        const isActive = page === child.id;
                        const hasSubChildren = child.children && child.children.length > 0;
                        const isSubChildActive = hasSubChildren && child.children.some(sub => sub.id === page);
                        const subExpanded = expandedSubs.includes(child.id);

                        return (
                          <div key={child.id}>
                            <button
                              onClick={() => {
                                if (hasSubChildren) {
                                  setExpandedSubs(prev =>
                                    prev.includes(child.id)
                                      ? prev.filter(id => id !== child.id)
                                      : [...prev, child.id]
                                  );
                                } else {
                                  setPage(child.id);
                                }
                              }}
                              style={{
                                display: 'flex', width: '100%', textAlign: 'left',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '6px 12px',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: 13, fontFamily: 'var(--font)',
                                color: isActive || isSubChildActive
                                  ? 'var(--accent)'
                                  : 'var(--text2)',
                                background: isActive || isSubChildActive
                                  ? 'var(--accent-subtle)'
                                  : 'transparent',
                                border: 'none', cursor: 'pointer',
                                marginBottom: 1, transition: 'all 120ms',
                              }}
                              onMouseEnter={e => {
                                if (!isActive && !isSubChildActive) {
                                  e.currentTarget.style.background = 'var(--bg2)';
                                  e.currentTarget.style.color = 'var(--text)';
                                }
                              }}
                              onMouseLeave={e => {
                                if (!isActive && !isSubChildActive) {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = 'var(--text2)';
                                }
                              }}
                            >
                              <span>{child.label}</span>
                              {hasSubChildren && (
                                <ChevronDown size={14} rotated={subExpanded} />
                              )}
                            </button>
                            {hasSubChildren && subExpanded && (
                              <div style={{ marginLeft: 12, marginTop: 2, borderLeft: '1px solid var(--border)' }}>
                                {child.children.map(subChild => {
                                  const isSubActive = page === subChild.id;
                                  return (
                                    <button
                                      key={subChild.id}
                                      onClick={() => setPage(subChild.id)}
                                      style={{
                                        display: 'block', width: '100%', textAlign: 'left',
                                        padding: '5px 12px',
                                        paddingLeft: 16,
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: 12, fontFamily: 'var(--font)',
                                        color: isSubActive ? 'var(--accent)' : 'var(--text3)',
                                        background: isSubActive
                                          ? 'var(--accent-subtle)'
                                          : 'transparent',
                                        border: 'none', cursor: 'pointer',
                                        marginBottom: 1, transition: 'all 120ms',
                                      }}
                                      onMouseEnter={e => {
                                        if (!isSubActive) e.currentTarget.style.color = 'var(--text2)';
                                      }}
                                      onMouseLeave={e => {
                                        if (!isSubActive) e.currentTarget.style.color = 'var(--text3)';
                                      }}
                                    >
                                      {subChild.label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
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
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          padding: '16px 28px', height: 64,
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
          backdropFilter: 'blur(12px)',
        }}>
          {/* ★ Theme Controls ★ */}
          <ThemeSwitcher searchValue={searchQuery} onSearchChange={setSearchQuery} />
        </header>

        {/* ── Page Content ── */}
        <div
          className="fade-in"
          key={`${page}-${mode}`}
          style={{ padding: '36px 44px', flex: 1 }}
        >
          {content}
        </div>
      </main>
    </div>
  );
}
