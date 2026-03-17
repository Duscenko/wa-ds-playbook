import { useState, useEffect } from 'react';
import { useTheme } from './components/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import { PanelLeft, Hand, Beaker, Layers, Palette, Type, Maximize, CornerUpRight, Copy, PieChart, PenTool, FileJson, LayoutTemplate } from 'lucide-react';
import TokenPlayground from './components/TokenPlayground/TokenPlayground';

import { IntroductionPage, PrinciplesPage, TokenArchitecturePage } from './pages/GetStarted';
import { ColorPage, TypographyPage, SpacingPage, RadiiPage, ShadowsPage, ChartColorsPage } from './pages/Foundations';
import { ChevronDown } from './components/UI';
// Resources pages  
// Resources pages  
import { FigmaLibraryPage, JsonExportsPage, StorybookPage } from './pages/Resources';

/* ─── NAV TREE ────────────────────────────────── */
const NAV = [
  {
    id: 'get-started', label: 'Get Started', children: [
      { id: 'intro', label: 'Introduction', icon: Hand },
      { id: 'principles', label: 'Principles', icon: Beaker },
      { id: 'arch', label: 'Token Architecture', icon: Layers },
    ]
  },
  {
    id: 'foundations', label: 'Foundations', children: [
      { id: 'color', label: 'Color', icon: Palette },
      { id: 'typo', label: 'Typography', icon: Type },
      { id: 'spacing', label: 'Spacing', icon: Maximize },
      { id: 'radii', label: 'Border Radii', icon: CornerUpRight },
      { id: 'shadows', label: 'Shadows', icon: Copy },
      { id: 'charts', label: 'Chart Colors', icon: PieChart },
    ]
  },
  {
    id: 'patterns', label: 'Patterns', children: [
      { id: 'play-layout', label: 'Play Layout', icon: LayoutTemplate },
    ]
  },
  {
    id: 'resources', label: 'Resources', children: [
      { id: 'storybook', label: 'Storybook', icon: Layers },
      { id: 'figma', label: 'Figma Library', icon: PenTool },
      { id: 'json', label: 'JSON Exports', icon: FileJson },
    ]
  },
];

/* ─── ICONS ───────────────────────────────────── */


/* ─── APP ─────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('intro');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Force initial state: All sections expanded
  const [expanded, setExpanded] = useState(['get-started', 'foundations', 'patterns', 'resources']);
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
    
    // Navigate to storybook when opening Resources section
    if (id === 'resources' && !expanded.includes(id)) {
      setPage('storybook');
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

  let content = null;
  if (page === 'intro') content = <IntroductionPage />;
  else if (page === 'principles') content = <PrinciplesPage />;
  else if (page === 'arch') content = <TokenArchitecturePage />;
  else if (page === 'color') content = <ColorPage />;
  else if (page === 'typo') content = <TypographyPage />;
  else if (page === 'spacing') content = <SpacingPage />;
  else if (page === 'radii') content = <RadiiPage />;
  else if (page === 'shadows') content = <ShadowsPage />;
  else if (page === 'charts') content = <ChartColorsPage />;
  else if (page === 'play-layout') content = <TokenPlayground />;
  else if (page === 'storybook') content = <StorybookPage />;
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
        position: 'sticky', top: 0, height: '100vh',
      }}>
        <div style={{
          width: 240, height: '100vh', display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Logo */}
          <div style={{ height: 69, padding: '0 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img
                src="/logo-watech.png"
                alt="WA Tech Logo"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius)',
                  objectFit: 'contain'
                }}
              />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--text)' }}>WA Design System</div>
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
                                gap: 8,
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: 13, fontFamily: 'var(--font)',
                                color: isActive || isSubChildActive
                                  ? '#ffffff'
                                  : 'var(--text2)',
                                background: isActive || isSubChildActive
                                  ? 'var(--accent)'
                                  : 'transparent',
                                border: 'none', cursor: 'pointer',
                                marginBottom: 2, transition: 'all 120ms',
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
                              {child.icon && <child.icon size={16} strokeWidth={1.5} color={isActive || isSubChildActive ? '#ffffff' : 'var(--text3)'} />}
                              <span style={{ flex: 1, fontWeight: isActive || isSubChildActive ? 500 : 400 }}>{child.label}</span>
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
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', height: 69,
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
          backdropFilter: 'blur(12px)',
        }}>
          {/* Left: Sidebar Toggle + Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: 6,
                background: 'transparent', border: '1px solid transparent',
                cursor: 'pointer', color: 'var(--text2)', transition: 'all 150ms'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--bg2)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.color = 'var(--text2)';
              }}
            >
              <PanelLeft size={18} />
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)', fontFamily: 'var(--font)' }}>
              {currentSection ? (
                <>
                  <span style={{ fontWeight: 500 }}>{currentSection.label}</span>
                  <span style={{ color: 'var(--border)' }}>/</span>
                  <span style={{ color: currentSubChild ? 'var(--text2)' : 'var(--text)', fontWeight: currentSubChild ? 400 : 500 }}>
                    {currentChild?.label}
                  </span>
                  {currentSubChild && (
                    <>
                      <span style={{ color: 'var(--border)' }}>/</span>
                      <span style={{ color: 'var(--text)', fontWeight: 500 }}>{currentSubChild.label}</span>
                    </>
                  )}
                </>
              ) : (
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>Playbook</span>
              )}
            </div>
          </div>

          {/* ★ Theme Controls ★ */}
          <ThemeSwitcher searchValue={searchQuery} onSearchChange={setSearchQuery} />
        </header>

        {/* ── Page Content ── */}
        <div
          className="fade-in"
          key={`${page}-${mode}`}
          style={{ padding: page === 'play-layout' ? 0 : '36px 44px', flex: 1 }}
        >
          {content}
        </div>
      </main>
    </div>
  );
}
