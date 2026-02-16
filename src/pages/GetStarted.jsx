import { SectionTitle, InfoCard } from '../components/UI';

export function IntroductionPage() {
  return (
    <div style={{ maxWidth: 700 }}>
      <SectionTitle sub="Welcome to the WA Technology Design System">Introduction</SectionTitle>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7, marginBottom: 28, fontSize: 15 }}>
        The WA Design System is the single source of truth for building consistent, accessible, and scalable
        user interfaces across all WA Technology products — Casino, Sportsbook, and Lottery.
      </p>
      <p style={{ color: 'var(--text3)', lineHeight: 1.7, marginBottom: 32, fontSize: 14 }}>
        Built on <strong style={{ color: 'var(--text)' }}>shadcn/ui</strong> with{' '}
        <strong style={{ color: 'var(--text)' }}>Figma Variables</strong>, it supports white-label theming
        across multiple brands (Belloa, Pick'em, and more) while maintaining WCAG 2.1 AA compliance
        in both dark and light modes.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <InfoCard title="Scalable" desc="3-tier token architecture enables unlimited brand themes by swapping only primitive values." />
        <InfoCard title="Accessible" desc="WCAG 2.1 AA compliant. Every token tested for contrast in dark and light modes." color="var(--green)" />
        <InfoCard title="Consistent" desc="Shared utility colors across all brands. Only the 'main' primitive changes per theme." color="var(--yellow)" />
      </div>
    </div>
  );
}

export function PrinciplesPage() {
  const principles = [
    { title: "Brand Agnostic by Default", desc: "Utility colors (red, green, yellow, overlays) are global and shared across ALL brands. Only the primitive 'main' palette changes per brand. This ensures consistency in status indicators, feedback, and functional UI across products." },
    { title: "Semantic First, Always", desc: "Never use raw hex values in components. Always reference semantic tokens (Content.Primary, Action.primary, etc.) that auto-resolve per theme and mode. This makes theming automatic and prevents hard-coded color drift." },
    { title: "Dark & Light Native", desc: "Every semantic token carries both dark and light mode values. The system resolves the correct value automatically based on the active mode. No separate stylesheets or conditional logic needed." },
    { title: "Minimal Surface, Maximum Clarity", desc: "iGaming interfaces are inherently information-dense. Our spacing, typography, and component sizing are optimized to present maximum information without sacrificing readability or touch targets." },
  ];

  return (
    <div style={{ maxWidth: 700 }}>
      <SectionTitle sub="Core design principles that guide every decision">Principles</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {principles.map((p, i) => (
          <div key={i} style={{ padding: 18, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg1)', display: 'flex', gap: 14 }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 600, flexShrink: 0, marginTop: 2 }}>0{i + 1}</span>
            <div>
              <h3 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-display)' }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenArchitecturePage() {
  const tiers = [
    { level: "1", name: "Primitives", color: "#0090ff", desc: "Raw color values defined per brand. Contains the 'main' palette (brand color) and 'neutral' palette (grayscale). Swapping primitives creates a completely new brand theme.", example: "main-dark.900 → #0090ff" },
    { level: "2", name: "Utility", color: "#30a46c", desc: "Global functional colors shared across ALL brands: red (errors/danger), green (success), yellow (warnings), and overlay scales. These never change between brands — a 'success' green is always the same green.", example: "green-dark.900 → #30a46c" },
    { level: "3", name: "Semantic", color: "#e5484d", desc: "Context-aware tokens that reference primitives or utilities. Organized by purpose: Content, Action, Surface, Status, Border. Each token stores both dark and light mode values.", example: "Action.primary → {main-dark.600}" },
  ];

  return (
    <div style={{ maxWidth: 700 }}>
      <SectionTitle sub="Three-tier system for scalable theming">Token Architecture</SectionTitle>
      <div style={{ padding: 24, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg1)' }}>
        {tiers.map((t, i) => (
          <div key={t.level} style={{ display: 'flex', gap: 16, marginBottom: i < tiers.length - 1 ? 24 : 0 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, flexShrink: 0,
              background: t.color + '18', color: t.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14,
            }}>T{t.level}</div>
            <div>
              <h4 style={{ fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>{t.name}</h4>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 6 }}>{t.desc}</p>
              <code style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: t.color, background: t.color + '12', padding: '3px 8px', borderRadius: 4 }}>{t.example}</code>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: 14, borderRadius: 8, background: 'var(--accent-bg)', border: '1px solid #0090ff22', fontSize: 13, color: 'var(--text2)' }}>
        <strong style={{ color: 'var(--accent)' }}>How theming works:</strong> To create a new brand, duplicate the primitives file, change only the 'main' values, and all semantic tokens resolve automatically. Zero component code changes needed.
      </div>
    </div>
  );
}
