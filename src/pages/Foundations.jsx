import { useState, useRef, useEffect } from 'react';
import { brands, utility, semantic, resolveToken, spacing, radii, typography, shadows, chartColors } from '../data/tokens';
import { useTheme } from '../components/ThemeContext';
import { CopyBadge, SectionTitle, TabBar } from '../components/UI';

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
        <span style={{ fontSize: 10, color: 'var(--text3)', marginLeft: 2 }}>▾</span>
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

  // Generate brand options dynamically from tokens.js
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
      marginBottom: 24,
      padding: 16,
      background: 'var(--bg1)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
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

export function ColorPage() {
  const [tab, setTab] = useState('Primitives');
  const { brand, mode } = useTheme();

  // Get active brand metadata
  const brandData = brands[brand] || brands['wa-default'];
  const prims = brandData.primitives;

  return (
    <div>
      <SectionTitle title="Color" sub="Token-based color system. Primitives change per brand; utility resolves dynamically." />

      {/* Brand & Mode Status Indicator */}
      <BrandSwitcher brand={brand} mode={mode} brandData={brandData} />

      <TabBar tabs={['Primitives', 'Utility', 'Semantic']} active={tab} onChange={setTab} />

      {/* TAB: PRIMITIVES - Raw brand colors */}
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

      {/* TAB: UTILITY - Dynamic resolution for Pick'em Overrides */}
      {tab === 'Utility' && (
        <div className="fade-in">
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>
            Functional shared colors. This view dynamically resolves Pick'em overrides (Yellow, Mint, Grass) when the brand is active.
          </p>
          {Object.entries(utility).map(([name, scale]) => {
            // MAGIC: Resolve each step via resolveToken to catch brand-specific overrides
            const resolvedScale = Object.keys(scale).reduce((acc, step) => {
              acc[step] = resolveToken(`${name}.${step}`, brand, mode);
              return acc;
            }, {});

            return <SwatchGrid key={name} label={name} scale={resolvedScale} />;
          })}
        </div>
      )}

      {/* TAB: SEMANTIC - Intent-based tokens */}
      {tab === 'Semantic' && (
        <div className="fade-in">
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>
            Tokens describing UI intent. They resolve to primitives or utilities based on brand and mode selection.
          </p>
          {Object.entries(semantic).map(([group, tokens]) => (
            <div key={group} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{group}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(tokens).map(([name, refs]) => {
                  // Resolve semantic token using active brand and current mode
                  const resolved = resolveToken(refs[mode], brand, mode);
                  return (
                    <CopyBadge key={name} text={resolved}>
                      <div style={{
                        width: 140,
                        padding: 10,
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg1)',
                        border: '1px solid var(--border)'
                      }}>
                        <div style={{
                          width: '100%',
                          height: 32,
                          borderRadius: 4,
                          background: resolved,
                          border: '1px solid var(--border)',
                          marginBottom: 6
                        }} />
                        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {name}
                        </div>
                        <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                          Ref: {refs[mode]}
                        </div>
                        <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {resolved}
                        </div>
                      </div>
                    </CopyBadge>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Typography, Spacing, Radii, Shadows, and ChartColors sections follow below...
export function TypographyPage() {
  return (
    <div>
      <SectionTitle title="Typography" sub="8 text styles using Inter. Sizes in px, line-heights optimized for readability." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {typography.map(t => (
          <div key={t.name} style={{ display: 'flex', alignItems: baseline, gap: 20, padding: '14px 16px', borderRadius: 'var(--radius)', background: 'var(--bg1)', border: '1px solid var(--border)' }}>
            <div style={{ width: 140, fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
              <div style={{ fontWeight: 600, color: 'var(--text2)' }}>{t.name}</div>
              {t.size}px / {t.lineHeight}px · {t.weight}
            </div>
            <div style={{ fontSize: t.size, lineHeight: t.lineHeight + 'px', letterSpacing: t.letterSpacing, fontWeight: t.weight, color: 'var(--text)', fontFamily: 'var(--font)' }}>
              The quick brown fox
            </div>
          </div>
        ))}
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