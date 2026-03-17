import { useState } from 'react';

/* ─── CopyBadge ───────────────────────────────────
   Wraps children OR shows `text` as a clickable badge.
   Click → copies `text` to clipboard. */
export function CopyBadge({ text, children }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(text).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  // Wrap mode: children provided
  if (children) {
    return (
      <div onClick={handleClick} style={{ cursor: 'pointer', position: 'relative', display: 'inline-block' }}>
        {children}
        {copied && (
          <span style={{
            position: 'absolute', top: -6, right: -6,
            background: '#30a46c', color: '#fff',
            fontSize: 8, padding: '1px 4px', borderRadius: 4, fontWeight: 700,
          }}>✓ copied</span>
        )}
      </div>
    );
  }

  // Inline badge mode
  return (
    <button onClick={handleClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 4,
      background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
      fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text2)',
      cursor: 'pointer', transition: 'all 120ms',
    }}>
      {text}
      {copied && <span style={{ color: '#30a46c', fontSize: 10 }}>✓</span>}
    </button>
  );
}

/* ─── SectionTitle ────────────────────────────────
   Accepts `title` (string) OR `children`. */
export function SectionTitle({ title, children, sub }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{
        fontSize: 28, fontWeight: 700, color: 'var(--text)',
        fontFamily: 'var(--font-display)', letterSpacing: '-0.6px',
        lineHeight: 1.2,
      }}>{title || children}</h2>
      {sub && <p style={{ fontSize: 14, color: 'var(--text3)', marginTop: 6, lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

/* ─── TabBar ──────────────────────────────────────
   Accepts tabs as string[] OR {id, label}[]. */
export function TabBar({ tabs, active, onChange, variant = 'ribbon' }) {
  const isStrings = typeof tabs[0] === 'string';
  const isIsland = variant === 'island';

  return (
    <div style={{
      display: 'flex', 
      gap: 4, 
      padding: isIsland ? 4 : 2,
      borderRadius: isIsland ? 12 : 8, 
      background: isIsland ? 'rgba(255, 255, 255, 0.03)' : '#111111',
      width: 'fit-content',
    }}>
      {tabs.map(t => {
        const id = isStrings ? t : t.id;
        const label = isStrings ? t : t.label;
        const on = active === id;
        
        return (
          <button 
            key={id} 
            onClick={() => onChange(id)} 
            style={{
              padding: isIsland ? '6px 16px' : '7px 16px', 
              borderRadius: isIsland ? 8 : 6,
              fontSize: 12, 
              fontWeight: 600, 
              border: 'none',
              cursor: 'pointer', 
              fontFamily: 'var(--font)',
              textTransform: isIsland ? 'none' : 'uppercase',
              letterSpacing: isIsland ? '0' : '0.05em',
              background: on 
                ? (isIsland ? 'rgba(0, 144, 255, 0.12)' : 'color-mix(in srgb, var(--accent), transparent 85%)') 
                : 'transparent',
              color: on 
                ? (isIsland ? '#0090ff' : 'var(--accent)') 
                : 'var(--text3)',
              boxShadow: (on && isIsland)
                ? '0 0 0 1px rgba(0, 144, 255, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05)'
                : (on ? 'inset 0 0 0 1px color-mix(in srgb, var(--accent), transparent 80%)' : 'none'),
              transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── InfoCard ────────────────────────────────────
   Accepts `desc` (string) OR `children` for body. */
export function InfoCard({ icon, title, desc, children, color }) {
  return (
    <div style={{
      padding: 20, borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border)', background: 'var(--bg1)',
      transition: 'all var(--transition-slow)',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--border-hover)';
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {icon && <div style={{ fontSize: 24, marginBottom: 12, opacity: 0.9 }}>{icon}</div>}
      <div style={{
        fontWeight: 600, fontSize: 14, marginBottom: 6,
        color: color || 'var(--accent)', fontFamily: 'var(--font-display)',
        letterSpacing: '-0.2px',
      }}>{title}</div>
      <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6 }}>
        {desc || children}
      </p>
    </div>
  );
}

/* ─── ChevronDown ─────────────────────────────────
   Standard dropdown arrow. Rotates if `rotated` is true. */
export const ChevronDown = ({ size = 18, rotated = false, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
      display: 'block'
    }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
