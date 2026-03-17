import { useState, useRef, useEffect } from 'react';
import { brands, utility, semantic, resolveToken, spacing, radii, typography, shadows, chartColors } from '../data/tokens';
import { semanticRoles } from '../data/semantic-roles';
import { useTheme } from '../components/ThemeContext';
import { CopyBadge, SectionTitle, TabBar, ChevronDown } from '../components/UI';

/**
 * Renders a grid of color swatches for a given scale.
 * It identifies if a color is an RGBA alpha value or a standard Hex code.
 */
function SwatchGrid({ scale, label }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>{label}</div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {Object.entries(scale).map(([step, hex]) => (
          <CopyBadge key={step} text={hex}>
            <div style={{ width: 56, textAlign: 'center' }}>
              <div style={{
                width: 56,
                height: 40,
                borderRadius: 'var(--radius-sm)',
                background: hex,
                border: '1px solid var(--border)'
              }} />
              <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 3, fontFamily: 'var(--font-mono)' }}>{step}</div>
              <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                {typeof hex === 'string' && hex.startsWith('rgba') ? 'alpha' : hex}
              </div>
            </div>
          </CopyBadge>
        ))}
      </div>
    </div>
  );
}

/* ─── Local Dropdown (Styled for Foundations) ─── */
function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const current = options.find(o => o.id === value);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 10px', height: 32,
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg2)', // Elevated background
          border: '1px solid var(--border)',
          cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font)',
          color: 'var(--text)', transition: 'all 120ms',
        }}
      >
        {current?.dot && (
          <span style={{
            width: 8, height: 8, borderRadius: 9999,
            background: current.dot, flexShrink: 0,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
          }} />
        )}
        {label && <span style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', marginRight: 2 }}>{label}</span>}
        <span style={{ fontWeight: 600 }}>{current?.label || value}</span>
        <ChevronDown size={14} rotated={open} color="var(--text3)" />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0,
          zIndex: 100, background: 'var(--bg1)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: 4, minWidth: 180,
          boxShadow: '0 4px 12px -2px rgba(0,0,0,0.2), 0 10px 30px -4px rgba(0,0,0,0.4)',
        }}>
          {options.map(o => (
            <button
              key={o.id}
              onClick={() => { onChange(o.id); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                border: 'none', textAlign: 'left',
                background: value === o.id ? 'var(--bg3)' : 'transparent',
                color: value === o.id ? 'var(--text)' : 'var(--text2)',
                cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font)',
              }}
            >
              {o.dot && <span style={{ width: 8, height: 8, borderRadius: 9999, background: o.dot }} />}
              <span style={{ flex: 1 }}>{o.label}</span>
              {value === o.id && <span style={{ fontSize: 10 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Brand & Mode Switcher Component ─── */
function BrandSwitcher({ brand, mode }) {
  const { setBrand, setMode } = useTheme();

  const brandOptions = Object.entries(brands).map(([key, data]) => ({
    id: key,
    label: data.label,
    dot: data.color
  }));

  const modeOptions = [
    { id: 'dark', label: 'Dark', dot: '#777b84' },
    { id: 'light', label: 'Light', dot: '#ffd60a' },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 0',
    }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginRight: 4 }}>
        Viewing Environment:
      </div>
      <Dropdown label="" value={brand} options={brandOptions} onChange={setBrand} />
      <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
      <Dropdown label="" value={mode} options={modeOptions} onChange={setMode} />
    </div>
  );
}

/* ─── JSON Export Component ─── */
function JsonExportPage() {
  const { brand } = useTheme();

  const downloadJSON = (filename, data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getBrandData = () => {
    const b = brands[brand] || brands['wa-default'];
    return {
      brand: b.label,
      color: b.color,
      primitives: b.primitives,
      utility: { ...utility, ...b.utilityOverrides },
      semantic: semantic
    };
  };

  const activeData = getBrandData();

  const cards = [
    { title: 'Full Bundle', desc: 'Complete token set for this brand.', data: activeData, suffix: 'tokens' },
    { title: 'Primitives', desc: 'Raw color palette scales.', data: activeData.primitives, suffix: 'primitives' },
    { title: 'Utilities', desc: 'Functional & shared colors.', data: activeData.utility, suffix: 'utility' },
    { title: 'Semantics', desc: 'Role-based token aliases.', data: activeData.semantic, suffix: 'semantic' },
  ];

  return (
    <div className="fade-in">
      <SectionTitle title="JSON Export" sub={`Download token datasets for ${activeData.brand}.`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {cards.map(c => (
          <div key={c.title} style={{
            padding: 20, borderRadius: 'var(--radius)',
            background: 'var(--bg1)', border: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: 12
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{c.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 4 }}>{c.desc}</div>
            </div>
            <button
              onClick={() => downloadJSON(`${brand}-${c.suffix}.json`, c.data)}
              style={{
                marginTop: 'auto', padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                background: 'var(--bg2)', border: '1px solid var(--border)',
                color: 'var(--text)', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              Download JSON
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Semantic Tokens Table ─── */
function SemanticTokensPage() {
  const { brand, mode } = useTheme();

  return (
    <div className="fade-in">
      <SectionTitle title="Semantic Tokens" sub="Role-based aliases that map intent to primitive values." />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {Object.entries(semanticRoles).map(([category, info]) => {
          // Get actual tokens for this category from the source of truth
          const categoryTokens = semantic[category] || {};

          if (Object.keys(categoryTokens).length === 0) return null;

          return (
            <div key={category}>
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{category}</h3>
                <p style={{ fontSize: 13, color: 'var(--text3)' }}>{info.description}</p>
              </div>

              <div style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                background: 'var(--bg1)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text2)', width: '25%' }}>Token</th>
                      <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text2)', width: '40%' }}>Role</th>
                      <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text2)', width: '20%' }}>Value</th>
                      <th style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600, color: 'var(--text2)' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {info.tokens.map((token, i) => {
                      const name = token.name;
                      const role = token.role;
                      const refs = categoryTokens[name];

                      if (!refs || !refs[mode]) return null;
                      const resolved = resolveToken(refs[mode], brand, mode);

                      return (
                        <tr key={name} style={{ borderBottom: i === info.tokens.length - 1 ? 'none' : '1px solid var(--border)' }}>
                          <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <span style={{ fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{name}</span>
                              <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>var(--{category.toLowerCase()}-{name})</span>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                            <span style={{ color: 'var(--text2)', lineHeight: 1.5 }}>{role}</span>
                          </td>
                          <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: 6,
                                background: resolved, border: '1px solid var(--border)',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)', flexShrink: 0
                              }} />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text2)' }}>{resolved}</span>
                                <span style={{ fontSize: 11, color: 'var(--text3)' }}>{refs[mode]}</span>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', verticalAlign: 'top' }}>
                            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                              <CopyBadge text={resolved}><span style={{ fontSize: 10, fontWeight: 500, color: 'var(--text2)', background: 'var(--bg2)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)' }}>Hex</span></CopyBadge>
                              <CopyBadge text={`var(--${category.toLowerCase()}-${name})`}><span style={{ fontSize: 10, fontWeight: 500, color: 'var(--text2)', background: 'var(--bg2)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)' }}>Token</span></CopyBadge>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ColorPage() {
  const [tab, setTab] = useState('Primitives');
  const { brand, mode } = useTheme();

  // Get active brand metadata
  const brandData = brands[brand] || brands['wa-default'];
  const prims = brandData.primitives;

  return (
    <div>
      <SectionTitle title={`${brandData.label} Colors`} sub="Token-based color system. Primitives change per brand; utility resolves dynamically." />

      {/* Sticky Bar for Brand Selector & Tabs */}
      <div style={{
        position: 'sticky',
        top: 69, // Header height
        zIndex: 20,
        margin: '0 -44px 24px -44px', // Counter-act parent padding
        padding: '10px 44px',
        background: 'rgba(10, 10, 11, 0.9)', // Solid dark with slight transparency
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        <BrandSwitcher brand={brand} mode={mode} brandData={brandData} />
        <TabBar tabs={['Primitives', 'Utility', 'Semantic Tokens', 'JSON Export']} active={tab} onChange={setTab} />
      </div>

      {/* TAB: PRIMITIVES */}
      {tab === 'Primitives' && (
        <div className="fade-in">
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>
            Brand-specific core palettes. These are the raw ingredients that vary between brands.
          </p>
          {Object.entries(prims).map(([name, scale]) => (
            <SwatchGrid key={name} label={name} scale={scale} />
          ))}
        </div>
      )}

      {/* TAB: UTILITY */}
      {tab === 'Utility' && (
        <div className="fade-in">
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>
            Functional shared colors. This view dynamically resolves overrides when the brand is active.
          </p>
          {Object.entries(utility).map(([name, scale]) => {
            const resolvedScale = Object.keys(scale).reduce((acc, step) => {
              acc[step] = resolveToken(`${name}.${step}`, brand, mode);
              return acc;
            }, {});
            return <SwatchGrid key={name} label={name} scale={resolvedScale} />;
          })}
        </div>
      )}

      {/* TAB: SEMANTIC */}
      {tab === 'Semantic Tokens' && <SemanticTokensPage />}

      {/* TAB: JSON EXPORT */}
      {tab === 'JSON Export' && <JsonExportPage />}
    </div>
  );
}

// Typography, Spacing, Radii, Shadows, and ChartColors sections follow below...
export function TypographyPage() {
  const { brand, mode } = useTheme();
  const actionPrimary = resolveToken('Action.primary', brand, mode);
  const onAction = resolveToken('Content.on-action', brand, mode);

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, gap: 20 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>
            Typography Tokens
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text3)', marginTop: 4 }}>
            Technical reference for text styles and roles. Controlled by Inter typeface.
          </p>
        </div>
        <a
          href="https://fonts.google.com/download?family=Inter"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '8px 16px', borderRadius: 'var(--radius-sm)',
            background: actionPrimary, color: onAction,
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 10,
            transition: 'all 150ms', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.filter = 'none'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Inter Family
        </a>
      </div>

      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        background: 'var(--bg1)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
            <tr>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, color: 'var(--text2)', width: '20%' }}>Token</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, color: 'var(--text2)', width: '35%' }}>Role</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, color: 'var(--text2)', width: '20%' }}>Specs / Weight</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, color: 'var(--text2)' }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {typography.map((t, i) => (
              <tr
                key={t.token}
                className="typo-row"
                style={{
                  borderBottom: i === typography.length - 1 ? 'none' : '1px solid var(--border)',
                  transition: 'background 150ms'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                  <code style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent)',
                    background: 'var(--accent-subtle)',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontSize: 11
                  }}>
                    {t.token}
                  </code>
                </td>
                <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                  <div style={{ color: 'var(--text2)', lineHeight: 1.5 }}>
                    {t.role}
                  </div>
                </td>
                <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)' }}>{t.spec}</span>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>{t.weight}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                  <div style={{
                    fontFamily: t.family === 'Monospace' ? 'var(--font-mono)' : 'var(--font)',
                    fontSize: t.spec.split(' / ')[0],
                    lineHeight: t.spec.split(' / ')[1],
                    fontWeight: t.weight.match(/\d+/)?.[0] || 400,
                    color: 'var(--text)',
                    whiteSpace: 'nowrap'
                  }}>
                    {t.sample}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SpacingPage() {
  return (
    <div>
      <SectionTitle title="Spacing" sub="12 spacing tokens from 0px to 64px. Use multiples of 4." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {spacing.map(s => (
          <div key={s.token} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg1)', border: '1px solid var(--border)' }}>
            <div style={{ width: 60, fontSize: 12, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{s.token}</div>
            <div style={{ width: 40, fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{s.value}</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: parseInt(s.value) || 0, height: 16, background: 'var(--accent)', borderRadius: 2, transition: 'width 300ms ease' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RadiiPage() {
  const { radius } = useTheme();
  return (
    <div>
      <SectionTitle title="Border Radii" sub="10 radius tokens. Current radius mode shown in previews." />
      <div style={{ marginBottom: 16, padding: '6px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-bg)', border: '1px solid color-mix(in srgb, var(--accent), transparent 80%)', display: 'inline-block', fontSize: 11, color: 'var(--accent)' }}>
        Active radius mode: <strong>{radius}</strong>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {radii.map(r => (
          <div key={r.token} style={{ textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: r.value, background: 'var(--accent)', border: '2px solid var(--accent)', opacity: 0.85, transition: 'all 200ms' }} />
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>{r.token}</div>
            <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShadowsPage() {
  return (
    <div>
      <SectionTitle title="Shadows" sub="7 elevation levels for layering depth." />
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {shadows.map(s => (
          <div key={s.token} style={{ width: 100, height: 100, borderRadius: 'var(--radius)', background: 'var(--bg1)', border: '1px solid var(--border)', boxShadow: s.value, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{s.token}</div>
            <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--font-mono)', textAlign: 'center', padding: '0 6px', marginTop: 4, lineHeight: 1.3 }}>{s.value.slice(0, 28)}…</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartColorsPage() {
  return (
    <div>
      <SectionTitle title="Chart Colors" sub="5 categorical + 2 sentiment colors for data visualization." />
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {chartColors.categorical.map((c, i) => (
          <CopyBadge key={i} text={c}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: 'var(--radius)', background: c, border: '1px solid var(--border)' }} />
              <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>{c}</div>
            </div>
          </CopyBadge>
        ))}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Sentiment</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {Object.entries(chartColors.sentiment).map(([k, c]) => (
          <CopyBadge key={k} text={c}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: 'var(--radius)', background: c, border: '1px solid var(--border)' }} />
              <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>{k}</div>
            </div>
          </CopyBadge>
        ))}
      </div>
    </div>
  );
}