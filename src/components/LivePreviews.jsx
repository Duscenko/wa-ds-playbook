import { useState } from 'react';
import { useHover } from './useHover';

// All components now use CSS variables so they auto-update with brand/mode changes

export function BtnPreview({ variant = 'default', size = 'md', children, disabled }) {
  const { hover, pressed, bind } = useHover();
  const h = { sm: 32, md: 36, lg: 40, icon: 36 }[size];
  const pad = { sm: '6px 12px', md: '8px 16px', lg: '10px 24px', icon: '0' }[size];
  const fs = { sm: 12, md: 13, lg: 14, icon: 13 }[size];
  const w = size === 'icon' ? 36 : undefined;

  const base = {
    height: h, padding: pad, width: w, fontSize: fs, borderRadius: 'var(--radius-sm)', fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    transition: 'all 120ms ease', opacity: disabled ? 0.4 : 1,
    transform: pressed && !disabled ? 'scale(0.96)' : 'scale(1)',
  };

  const vars = {
    default: { ...base, background: pressed ? 'var(--accent-pressed)' : hover ? 'var(--accent-hover)' : 'var(--accent)', color: '#fff', border: '1px solid transparent', boxShadow: hover && !pressed ? '0 2px 8px color-mix(in srgb, var(--accent), transparent 70%)' : 'none' },
    secondary: { ...base, background: pressed ? 'var(--bg)' : hover ? 'var(--bg3)' : 'var(--bg2)', color: 'var(--text)', border: '1px solid ' + (hover ? 'var(--border-hover)' : 'var(--border)') },
    outline: { ...base, background: hover ? 'rgba(255,255,255,0.04)' : 'transparent', color: 'var(--text)', border: '1px solid ' + (hover ? 'var(--text3)' : 'var(--border)') },
    ghost: { ...base, background: pressed ? 'rgba(255,255,255,0.08)' : hover ? 'rgba(255,255,255,0.05)' : 'transparent', color: hover ? 'var(--text)' : 'var(--text2)', border: '1px solid transparent' },
    destructive: { ...base, background: pressed ? '#c13639' : hover ? 'var(--red-hover)' : 'var(--red)', color: '#fff', border: '1px solid transparent', boxShadow: hover && !pressed ? '0 2px 8px rgba(229,72,77,0.3)' : 'none' },
    link: { ...base, background: 'transparent', color: hover ? 'var(--accent-hover)' : 'var(--accent)', border: 'none', padding: 0, height: 'auto', textDecoration: hover ? 'underline' : 'none' },
  };
  return <button {...bind} style={vars[variant] || vars.default} disabled={disabled}>{children}</button>;
}

export function BadgePreview({ variant = 'default', children }) {
  const { hover, bind } = useHover();
  const colors = {
    default: { bg: 'var(--bg2)', fg: 'var(--text)', border: 'var(--border)' },
    primary: { bg: 'var(--accent)', fg: '#fff', border: 'var(--accent)' },
    success: { bg: '#113b29', fg: '#30a46c', border: '#30a46c33' },
    warning: { bg: '#524202', fg: '#ffe629', border: '#ffe62933' },
    critical: { bg: '#500f1c', fg: '#e5484d', border: '#e5484d33' },
    live: { bg: '#dc262622', fg: '#e5484d', border: '#e5484d44' },
  };
  const c = colors[variant] || colors.default;
  return (
    <span {...bind} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 500, background: c.bg, color: c.fg, border: '1px solid ' + c.border, fontFamily: 'var(--font)', transition: 'all 120ms', transform: hover ? 'scale(1.05)' : 'scale(1)' }}>
      {variant === 'live' && <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#e5484d' }} className="pulse-dot" />}
      {children}
    </span>
  );
}

export function SwitchPreview({ defaultOn, disabled }) {
  const [on, setOn] = useState(!!defaultOn);
  const { hover, bind } = useHover();
  return (
    <button {...bind} onClick={() => !disabled && setOn(!on)} style={{ width: 38, height: 22, borderRadius: 9999, padding: 2, background: on ? (hover ? 'var(--accent-hover)' : 'var(--accent)') : (hover ? 'var(--bg3)' : 'var(--bg2)'), border: '1px solid ' + (on ? 'var(--accent)' : 'var(--border)'), cursor: disabled ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', transition: 'all 150ms', opacity: disabled ? 0.35 : 1, boxShadow: hover && !disabled ? '0 0 0 3px color-mix(in srgb, var(--accent), transparent 85%)' : 'none' }}>
      <div style={{ width: 18, height: 18, borderRadius: 9999, background: '#fff', transform: on ? 'translateX(16px)' : 'translateX(0)', transition: 'transform 150ms ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  );
}

export function CheckboxPreview({ label, defaultChecked, error }) {
  const [checked, setChecked] = useState(!!defaultChecked);
  const { hover, bind } = useHover();
  return (
    <label {...bind} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: hover ? 'var(--text)' : 'var(--text2)', fontFamily: 'var(--font)', transition: 'color 120ms' }}>
      <button onClick={() => setChecked(!checked)} style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid ' + (error ? '#e5484d' : checked ? 'var(--accent)' : hover ? 'var(--text3)' : 'var(--border)'), background: checked ? (hover ? 'var(--accent-hover)' : 'var(--accent)') : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 120ms', boxShadow: hover ? '0 0 0 3px color-mix(in srgb, var(--accent), transparent 85%)' : 'none' }}>
        {checked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </button>
      {label}
    </label>
  );
}

export function InputPreview({ label, placeholder, error, addon, icon, disabled, hint }) {
  const [focused, setFocused] = useState(false);
  const { hover, bind } = useHover();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 280 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 500, fontFamily: 'var(--font)', color: focused ? 'var(--accent)' : hover ? 'var(--text)' : 'var(--text2)', transition: 'color 150ms' }}>{label}</label>}
      <div {...bind} style={{ display: 'flex', alignItems: 'center', height: 38, borderRadius: 'var(--radius-sm)', border: '1px solid ' + (error ? '#e5484d' : focused ? 'var(--accent)' : hover ? 'var(--border-hover)' : 'var(--border)'), background: focused ? 'var(--bg)' : hover ? 'var(--bg2)' : 'var(--bg1)', padding: '0 12px', gap: 8, transition: 'all 150ms', opacity: disabled ? 0.4 : 1, boxShadow: focused ? '0 0 0 3px color-mix(in srgb, ' + (error ? '#e5484d' : 'var(--accent)') + ', transparent 85%)' : 'none' }}>
        {icon && <span style={{ color: 'var(--text3)', fontSize: 14 }}>{icon}</span>}
        <input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder || ''} disabled={disabled} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font)' }} />
        {addon && <span style={{ color: 'var(--text3)', fontSize: 12, fontWeight: 500 }}>{addon}</span>}
      </div>
      {error && <span style={{ fontSize: 11, color: '#e5484d' }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: 11, color: 'var(--text3)' }}>{hint}</span>}
    </div>
  );
}

export function AlertPreview({ variant = 'info', title, children }) {
  const { hover, bind } = useHover();
  const configs = {
    info: { bg: 'color-mix(in srgb, var(--accent), transparent 92%)', border: 'color-mix(in srgb, var(--accent), transparent 70%)', fg: 'var(--accent-hover)', icon: 'ℹ' },
    success: { bg: '#30a46c10', border: '#30a46c30', fg: '#3dd68c', icon: '✓' },
    warning: { bg: '#ffe62910', border: '#ffe62930', fg: '#ffe629', icon: '⚠' },
    critical: { bg: '#e5484d10', border: '#e5484d30', fg: '#ec5d5e', icon: '✕' },
  };
  const c = configs[variant] || configs.info;
  return (
    <div {...bind} style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: 'var(--radius)', background: c.bg, border: '1px solid ' + c.border, maxWidth: 420, fontFamily: 'var(--font)', transition: 'all 120ms', transform: hover ? 'translateX(3px)' : 'none', boxShadow: hover ? '0 2px 8px rgba(0,0,0,0.15)' : 'none' }}>
      <span style={{ width: 22, height: 22, borderRadius: 9999, flexShrink: 0, background: 'color-mix(in srgb, ' + c.fg + ', transparent 85%)', color: c.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{c.icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.fg, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{children}</div>
      </div>
    </div>
  );
}

export function CardPreview({ title, children, interactive, image, footer }) {
  const { hover, pressed, bind } = useHover();
  return (
    <div {...bind} style={{ width: 240, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid ' + (hover && interactive ? 'var(--accent)' : 'var(--border)'), background: hover ? 'var(--bg2)' : 'var(--bg1)', cursor: interactive ? 'pointer' : 'default', transition: 'all 180ms ease', transform: pressed && interactive ? 'scale(0.98)' : hover && interactive ? 'translateY(-3px)' : 'none', boxShadow: hover && interactive ? '0 8px 24px rgba(0,0,0,0.35)' : 'none' }}>
      {image && <div style={{ height: 100, background: 'linear-gradient(135deg, var(--accent-subtle), var(--bg2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', fontSize: 12 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
      </div>}
      <div style={{ padding: 14, fontFamily: 'var(--font)' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{children}</div>
        {footer && <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>{footer}</div>}
      </div>
    </div>
  );
}

export function DialogPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <BtnPreview variant="default"><span onClick={() => setOpen(true)}>Open Dialog</span></BtnPreview>
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setOpen(false)}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} />
          <div className="fade-in" onClick={e => e.stopPropagation()} style={{ position: 'relative', background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28, width: 380, maxWidth: '90vw', fontFamily: 'var(--font)', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Confirm Deposit</h3>
            <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 24, lineHeight: 1.6 }}>You are about to deposit <strong style={{ color: 'var(--text)' }}>$50.00</strong> to your account.</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <BtnPreview variant="outline"><span onClick={() => setOpen(false)}>Cancel</span></BtnPreview>
              <BtnPreview variant="default"><span onClick={() => setOpen(false)}>Confirm Deposit</span></BtnPreview>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SheetPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <BtnPreview variant="secondary"><span onClick={() => setOpen(true)}>Open Bet Slip</span></BtnPreview>
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999 }} onClick={() => setOpen(false)}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
          <div className="slide-right" onClick={e => e.stopPropagation()} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 340, background: 'var(--bg1)', borderLeft: '1px solid var(--border)', padding: 24, fontFamily: 'var(--font)', overflowY: 'auto', boxShadow: '-8px 0 32px rgba(0,0,0,0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>Bet Slip</h3>
              <BtnPreview variant="ghost"><span onClick={() => setOpen(false)}>✕</span></BtnPreview>
            </div>
            <div style={{ padding: 14, borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg)', marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>Premier League · Today 20:00</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Manchester United to Win</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text2)' }}>vs Chelsea FC</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>@2.45</span>
              </div>
            </div>
            <InputPreview label="Stake Amount" placeholder="0.00" addon="EUR" />
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginTop: 16, borderTop: '1px solid var(--border)', fontSize: 13 }}>
              <span style={{ color: 'var(--text2)' }}>Potential Win</span>
              <span style={{ fontWeight: 700, color: '#3dd68c' }}>€0.00</span>
            </div>
            <div style={{ marginTop: 8 }}><BtnPreview variant="default" size="lg">Place Bet</BtnPreview></div>
          </div>
        </div>
      )}
    </div>
  );
}
