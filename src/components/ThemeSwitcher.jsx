import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { brands } from '../data/tokens';

function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = options.find(o => o.id === value);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', borderRadius: 'var(--radius-sm, 4px)',
          background: 'var(--bg2)', border: '1px solid var(--border)',
          cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font)',
          color: 'var(--text)', transition: 'all 120ms',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        {current?.dot && <span style={{ width: 8, height: 8, borderRadius: 9999, background: current.dot, flexShrink: 0 }} />}
        <span style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        <span style={{ fontWeight: 600 }}>{current?.label || value}</span>
        <span style={{ fontSize: 8, color: 'var(--text3)' }}>▾</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 50,
          background: 'var(--bg1)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius, 6px)', padding: 4, minWidth: 140,
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}>
          {options.map(o => (
            <button
              key={o.id}
              onClick={() => { onChange(o.id); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                padding: '6px 10px', borderRadius: 4, border: 'none',
                background: value === o.id ? 'var(--accent-bg)' : 'transparent',
                color: value === o.id ? 'var(--accent)' : 'var(--text2)',
                cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font)',
                textAlign: 'left', transition: 'all 100ms',
              }}
              onMouseEnter={e => { if (value !== o.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { if (value !== o.id) e.currentTarget.style.background = 'transparent'; }}
            >
              {o.dot && <span style={{ width: 10, height: 10, borderRadius: 9999, background: o.dot, border: value === o.id ? '2px solid var(--accent)' : '1px solid var(--border)' }} />}
              {o.icon && <span style={{ fontSize: 13 }}>{o.icon}</span>}
              {o.label}
              {value === o.id && <span style={{ marginLeft: 'auto', fontSize: 10 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ThemeSwitcher() {
  const { brand, setBrand, mode, setMode, radius, setRadius } = useTheme();

  const brandOptions = Object.entries(brands).map(([id, b]) => ({
    id, label: b.label, dot: b.color,
  }));

  const modeOptions = [
    { id: 'dark', label: 'Dark', icon: '🌙' },
    { id: 'light', label: 'Light', icon: '☀️' },
  ];

  const radiusOptions = [
    { id: 'sharp', label: 'Sharp' },
    { id: 'default', label: 'Default' },
    { id: 'round', label: 'Round' },
    { id: 'full', label: 'Full' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Dropdown label="Brand" value={brand} options={brandOptions} onChange={setBrand} />
      <Dropdown label="Mode" value={mode} options={modeOptions} onChange={setMode} />
      <Dropdown label="Radius" value={radius} options={radiusOptions} onChange={setRadius} />
    </div>
  );
}
