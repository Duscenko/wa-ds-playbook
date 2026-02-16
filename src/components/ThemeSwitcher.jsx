import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { brands } from '../data/tokens';

/* ─── Generic Dropdown ────────────────────────────── */
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
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', height: 30,
          borderRadius: 'var(--radius-sm, 4px)',
          background: 'var(--bg2)', border: '1px solid var(--border)',
          cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font)',
          color: 'var(--text)', transition: 'all 120ms',
        }}
      >
        {current?.dot && (
          <span style={{
            width: 8, height: 8, borderRadius: 9999,
            background: current.dot, flexShrink: 0,
          }} />
        )}
        <span style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontWeight: 600, fontSize: 11 }}>{current?.label || value}</span>
        <span>▾</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4,
          zIndex: 50, background: 'var(--bg1)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius, 6px)',
          padding: 4, minWidth: 150,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}>
          {options.map(o => (
            <button
              key={o.id}
              onClick={() => { onChange(o.id); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '7px 10px', borderRadius: 4,
                border: 'none', textAlign: 'left',
                background: value === o.id ? 'rgba(162, 66, 245, 0.1)' : 'transparent',
                color: value === o.id ? '#a242f5' : 'var(--text2)',
                cursor: 'pointer', fontSize: 12,
              }}
            >
              {o.dot && <span style={{ width: 10, height: 10, borderRadius: 9999, background: o.dot }} />}
              <span style={{ flex: 1 }}>{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Theme Switcher (3 controles) ─────────────────── */
export default function ThemeSwitcher() {
  const { brand, setBrand, mode, setMode, radius, setRadius } = useTheme();

  // Forzamos las opciones para asegurar que Pick'em aparezca
  const brandOptions = [
    { id: 'wa-default', label: 'WA Default', dot: '#0090ff' },
    { id: 'belloa',     label: 'Belloa',     dot: '#12A594' },
    { id: 'pickem',     label: "Pick'em",    dot: '#a242f5' }
  ];

  const modeOptions = [
    { id: 'dark',  label: 'Dark',  icon: '🌙' },
    { id: 'light', label: 'Light', icon: '☀️' },
  ];

  const radiusOptions = [
    { id: 'sharp',   label: 'Sharp'   },
    { id: 'default', label: 'Default' },
    { id: 'round',   label: 'Round'   },
    { id: 'full',    label: 'Full'    },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Dropdown label="Brand"  value={brand}  options={brandOptions}  onChange={setBrand}  />
      <Dropdown label="Mode"   value={mode}   options={modeOptions}   onChange={setMode}   />
      <Dropdown label="Radius" value={radius} options={radiusOptions} onChange={setRadius} />
    </div>
  );
}