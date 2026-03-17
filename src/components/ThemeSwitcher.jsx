import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { ChevronDown } from './UI';
import { Search, Moon, Sun } from 'lucide-react';

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
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', height: 40,
          borderRadius: 'var(--radius, 6px)',
          background: 'var(--bg2)', border: '1px solid var(--border)',
          cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font)',
          color: 'var(--text)', transition: 'all 150ms',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--bg3)';
          e.currentTarget.style.borderColor = 'var(--border-hover)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg2)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }}
      >
        {current?.icon && <span style={{ fontSize: 16 }}>{current.icon}</span>}
        <span style={{ fontWeight: 500, fontSize: 13 }}>{current?.label || value}</span>
        <ChevronDown size={16} rotated={open} color="var(--text3)" />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 6,
          zIndex: 50, background: 'var(--bg1)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius, 6px)',
          padding: 6, minWidth: 140,
          boxShadow: '0 12px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
        }}>
          {options.map(o => (
            <button
              key={o.id}
              onClick={() => { onChange(o.id); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 12px', borderRadius: 5,
                border: 'none', textAlign: 'left',
                background: value === o.id ? 'var(--accent-subtle)' : 'transparent',
                color: value === o.id ? 'var(--accent)' : 'var(--text2)',
                cursor: 'pointer', fontSize: 13, fontWeight: 500,
                transition: 'all 120ms',
              }}
              onMouseEnter={e => {
                if (value !== o.id) {
                  e.currentTarget.style.background = 'var(--bg2)';
                  e.currentTarget.style.color = 'var(--text)';
                }
              }}
              onMouseLeave={e => {
                if (value !== o.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text2)';
                }
              }}
            >
              {o.icon && <span style={{ fontSize: 16 }}>{o.icon}</span>}
              <span style={{ flex: 1 }}>{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Search Input ────────────────────────────── */
function SearchInput({ value, onChange, placeholder }) {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 40,
        width: expanded || value ? 200 : 40,
        borderRadius: 'var(--radius, 6px)',
        background: 'var(--bg2)',
        border: expanded ? '1px solid var(--accent)' : '1px solid var(--border)',
        overflow: 'hidden',
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: expanded ? '0 0 0 2px var(--accent-subtle)' : 'none',
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
          color: expanded ? 'var(--accent)' : 'var(--text3)',
          transition: 'color 200ms',
        }}
      >
        <Search size={16} />
      </button>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => {
          if (!value) setExpanded(false);
        }}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--text)',
          fontSize: 13,
          paddingRight: 12,
          opacity: expanded || value ? 1 : 0,
          transition: 'opacity 200ms',
        }}
      />
    </div>
  );
}

/* ─── Theme Switcher (Mode + Search) ─────────────────── */
export default function ThemeSwitcher({ searchValue, onSearchChange }) {
  const { mode, setMode } = useTheme();

  const modeOptions = [
    { id: 'dark', label: 'Dark', icon: <Moon size={16} /> },
    { id: 'light', label: 'Light', icon: <Sun size={16} /> },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <SearchInput 
        value={searchValue} 
        onChange={onSearchChange} 
        placeholder="Search documentation..." 
      />
      <Dropdown value={mode} options={modeOptions} onChange={setMode} />
    </div>
  );
}