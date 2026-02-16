import { useState } from 'react';

export function CopyBadge({ text, children }) {
  const [copied, setCopied] = useState(false);
  const handleClick = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1200); };
  if (children) {
    return <div onClick={handleClick} style={{ cursor: 'pointer', position: 'relative', display: 'inline-block' }}>
      {children}
      {copied && <span style={{ position: 'absolute', top: -6, right: -6, background: '#30a46c', color: '#fff', fontSize: 8, padding: '1px 4px', borderRadius: 4, fontWeight: 700 }}>✓</span>}
    </div>;
  }
  return (
    <button onClick={handleClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text2)', cursor: 'pointer', transition: 'all 120ms' }}>
      {text} {copied && <span style={{ color: '#30a46c', fontSize: 10 }}>✓</span>}
    </button>
  );
}

export function SectionTitle({ title, children, sub }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>{title || children}</h2>
      {sub && <p style={{ fontSize: 14, color: 'var(--text3)', marginTop: 4 }}>{sub}</p>}
    </div>
  );
}

export function TabBar({ tabs, active, onChange }) {
  const isStringArray = typeof tabs[0] === 'string';
  return (
    <div style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 8, background: 'var(--bg2)', width: 'fit-content', marginBottom: 24 }}>
      {tabs.map(t => {
        const id = isStringArray ? t : t.id;
        const label = isStringArray ? t : t.label;
        return (
          <button key={id} onClick={() => onChange(id)} style={{
            padding: '7px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500,
            cursor: 'pointer', border: 'none', fontFamily: 'var(--font)',
            background: active === id ? 'rgba(255,255,255,0.08)' : 'transparent',
            color: active === id ? 'var(--text)' : 'var(--text3)',
            transition: 'all 120ms',
          }}>{label}</button>
        );
      })}
    </div>
  );
}

export function InfoCard({ icon, title, desc, children, color }) {
  return (
    <div style={{ padding: 18, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg1)', transition: 'border-color 200ms' }}>
      {icon && <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>}
      <div style={{ fontWeight: 600, color: color || 'var(--accent)', fontSize: 14, marginBottom: 4, fontFamily: 'var(--font-display)' }}>{title}</div>
      <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>{desc || children}</p>
    </div>
  );
}
