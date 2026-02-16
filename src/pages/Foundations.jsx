import { useState } from 'react';
import { brands, utility, semantic, resolveToken, spacing, radii, typography, shadows, chartColors } from '../data/tokens';
import { useTheme } from '../components/ThemeContext';
import { CopyBadge, SectionTitle, TabBar, InfoCard } from './UI';

function SwatchGrid({ scale, label }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>{label}</div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {Object.entries(scale).map(([step, hex]) => (
          <CopyBadge key={step} text={hex}>
            <div style={{ width: 56, textAlign: 'center' }}>
              <div style={{ width: 56, height: 40, borderRadius: 'var(--radius-sm)', background: hex, border: '1px solid var(--border)' }} />
              <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 3, fontFamily: 'var(--font-mono)' }}>{step}</div>
              <div style={{ fontSize: 8, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{typeof hex === 'string' && hex.startsWith('rgba') ? 'alpha' : hex}</div>
            </div>
          </CopyBadge>
        ))}
      </div>
    </div>
  );
}

export function ColorPage() {
  const [tab, setTab] = useState('Primitives');
  const { brand, mode } = useTheme();
  const brandData = brands[brand] || brands['wa-default'];
  const prims = brandData.primitives;

  return (
    <div>
      <SectionTitle title="Color" sub="Token-based color system. Primitives change per brand; utility stays shared." />
      <div style={{ marginBottom: 8, padding: '6px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-bg)', border: '1px solid color-mix(in srgb, var(--accent), transparent 80%)', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--accent)' }}>
        <span style={{ width: 8, height: 8, borderRadius: 9999, background: brandData.color }} />
        Viewing: <strong>{brandData.label}</strong> · {mode}
      </div>
      <TabBar tabs={['Primitives', 'Utility', 'Semantic']} active={tab} onChange={setTab} />
      {tab === 'Primitives' && (
        <div className="fade-in">
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>Brand-specific colors. Only these change between brands — everything else resolves through them.</p>
          {Object.entries(prims).map(([name, scale]) => <SwatchGrid key={name} label={name} scale={scale} />)}
        </div>
      )}
      {tab === 'Utility' && (
        <div className="fade-in">
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>Shared across all brands. Status colors, overlays.</p>
          {Object.entries(utility).map(([name, scale]) => <SwatchGrid key={name} label={name} scale={scale} />)}
        </div>
      )}
      {tab === 'Semantic' && (
        <div className="fade-in">
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>Semantic tokens resolve to primitives/utility based on brand + mode. Current: <strong>{brandData.label}</strong> · <strong>{mode}</strong></p>
          {Object.entries(semantic).map(([group, tokens]) => (
            <div key={group} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{group}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(tokens).map(([name, refs]) => {
                  const resolved = resolveToken(refs[mode], brand);
                  return (
                    <CopyBadge key={name} text={resolved}>
                      <div style={{ width: 120, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--bg1)', border: '1px solid var(--border)' }}>
                        <div style={{ width: '100%', height: 32, borderRadius: 4, background: resolved, border: '1px solid var(--border)', marginBottom: 6 }} />
                        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text)' }}>{name}</div>
                        <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{refs[mode]}</div>
                        <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{resolved}</div>
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

export function TypographyPage() {
  return (
    <div>
      <SectionTitle title="Typography" sub="8 text styles using Inter. Sizes in px, line-heights optimized for readability." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {typography.map(t => (
          <div key={t.name} style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '14px 16px', borderRadius: 'var(--radius)', background: 'var(--bg1)', border: '1px solid var(--border)' }}>
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
