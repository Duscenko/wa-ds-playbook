import { useState } from 'react';
import { semantic, resolveToken, brands } from '../data/tokens';
import { componentDocs, componentIds } from '../data/components';
import { useTheme } from '../components/ThemeContext';
import { CopyBadge, SectionTitle, TabBar, InfoCard } from '../components/UI';
import { BtnPreview, BadgePreview, SwitchPreview, CheckboxPreview, InputPreview, AlertPreview, CardPreview, DialogPreview, SheetPreview } from '../components/LivePreviews';
import { TopNavigation } from '../components/TopNavigation';

export function TokensPage() {
  const { brand, mode } = useTheme();
  const brandData = brands[brand] || brands['wa-default'];
  return (
    <div>
      <SectionTitle title="Semantic Tokens" sub="Complete reference of semantic tokens resolved for the selected brand and mode." />
      <div style={{ marginBottom: 16, padding: '6px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-bg)', border: '1px solid color-mix(in srgb, var(--accent), transparent 80%)', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--accent)' }}>
        <span style={{ width: 8, height: 8, borderRadius: 9999, background: brandData.color }} />
        Resolved for: <strong>{brandData.label}</strong> · {mode}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: 'var(--font)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text3)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>Group</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text3)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>Token</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text3)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>Reference</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text3)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>Resolved</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text3)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(semantic).map(([group, tokens]) =>
              Object.entries(tokens).map(([name, refs], i) => {
                const ref = refs[mode];
                const hex = resolveToken(ref, brand);
                return (
                  <tr key={group + name} style={{ borderBottom: '1px solid var(--border)' }}>
                    {i === 0 && <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text)', verticalAlign: 'top' }} rowSpan={Object.keys(tokens).length}>{group}</td>}
                    <td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', color: 'var(--text2)' }}>{name}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', color: 'var(--text3)', fontSize: 11 }}>{ref}</td>
                    <CopyBadge text={hex}><td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', color: 'var(--text3)', fontSize: 11, cursor: 'pointer' }}>{hex}</td></CopyBadge>
                    <td style={{ padding: '8px 12px' }}><div style={{ width: 24, height: 24, borderRadius: 4, background: hex, border: '1px solid var(--border)' }} /></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ComponentsOverview({ onNavigate }) {
  return (
    <div>
      <SectionTitle title="Components" sub="10 documented components built on shadcn/ui with full token mapping." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {componentIds.map(cid => {
          const c = componentDocs[cid];
          return (
            <button key={cid} onClick={() => onNavigate('c-' + cid)} style={{ padding: 16, borderRadius: 'var(--radius)', background: 'var(--bg1)', border: '1px solid var(--border)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font)', transition: 'all 150ms', color: 'var(--text)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{c.variants?.length || 0} variants</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const COMPONENT_PREVIEWS = {
  button: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <BtnPreview variant="default">Place Bet</BtnPreview>
        <BtnPreview variant="secondary">Details</BtnPreview>
        <BtnPreview variant="outline">Filter</BtnPreview>
        <BtnPreview variant="ghost">Cancel</BtnPreview>
        <BtnPreview variant="destructive">Delete</BtnPreview>
        <BtnPreview variant="link">Learn More</BtnPreview>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <BtnPreview variant="default" size="sm">Small</BtnPreview>
        <BtnPreview variant="default" size="md">Medium</BtnPreview>
        <BtnPreview variant="default" size="lg">Large</BtnPreview>
        <BtnPreview variant="default" size="icon">+</BtnPreview>
      </div>
    </div>
  ),
  badge: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <BadgePreview variant="default">Default</BadgePreview>
      <BadgePreview variant="primary">Deposit</BadgePreview>
      <BadgePreview variant="success">Won</BadgePreview>
      <BadgePreview variant="warning">Pending</BadgePreview>
      <BadgePreview variant="critical">Failed</BadgePreview>
      <BadgePreview variant="live">LIVE</BadgePreview>
    </div>
  ),
  switch: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <SwitchPreview />
      <SwitchPreview defaultOn />
      <SwitchPreview disabled />
    </div>
  ),
  checkbox: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CheckboxPreview label="Accept Terms & Conditions" />
      <CheckboxPreview label="Enable Notifications" defaultChecked />
      <CheckboxPreview label="Invalid selection" error />
    </div>
  ),
  input: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InputPreview label="Bet Amount" placeholder="0.00" addon="EUR" />
      <InputPreview label="Search Games" placeholder="Search…" icon="🔍" />
      <InputPreview label="Email" placeholder="user@example.com" error="Invalid email address" />
    </div>
  ),
  alert: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <AlertPreview variant="info" title="Processing">Your deposit is being processed.</AlertPreview>
      <AlertPreview variant="success" title="Deposit Complete">$50.00 has been added to your account.</AlertPreview>
      <AlertPreview variant="warning" title="KYC Required">Please verify your identity to continue.</AlertPreview>
      <AlertPreview variant="critical" title="Payment Failed">Your transaction could not be completed.</AlertPreview>
    </div>
  ),
  card: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <CardPreview title="Book of Dead" image interactive footer={<><BtnPreview variant="default" size="sm">Play Now</BtnPreview><BtnPreview variant="ghost" size="sm">Demo</BtnPreview></>}>Popular slot game with Egyptian theme.</CardPreview>
      <CardPreview title="Welcome Bonus" image>Get 100% up to €200 on your first deposit.</CardPreview>
    </div>
  ),
  dialog: () => <DialogPreview />,
  icons: () => (
    <div style={{ padding: 20, borderRadius: 'var(--radius)', background: 'var(--bg1)', border: '1px solid var(--border)' }}>
      <p style={{ fontSize: 13, color: 'var(--text2)' }}>Icons use Lucide icon library. Recommended size: 16–24px. Color via <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg2)', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>currentColor</code>.</p>
      <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
        {['⚙️', '🏠', '👤', '🔔', '💰', '🎰', '⚽', '📊'].map((icon, i) => (
          <div key={i} style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--bg2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{icon}</div>
        ))}
      </div>
    </div>
  ),
  sheet: () => <SheetPreview />,
};

export function ComponentDetailPage({ componentId }) {
  const [tab, setTab] = useState('Preview');
  const doc = componentDocs[componentId];
  if (!doc) return <div style={{ color: 'var(--text3)' }}>Component not found.</div>;

  const PreviewComp = COMPONENT_PREVIEWS[componentId];

  return (
    <div>
      <SectionTitle title={doc.name} sub={doc.description} />
      <TabBar tabs={['Preview', 'Variants', 'Tokens', 'Accessibility', 'Guidelines']} active={tab} onChange={setTab} />

      {tab === 'Preview' && (
        <div className="fade-in" style={{ padding: 24, borderRadius: 'var(--radius)', background: 'var(--bg1)', border: '1px solid var(--border)' }}>
          {PreviewComp ? <PreviewComp /> : <div style={{ color: 'var(--text3)', fontSize: 13 }}>No live preview available.</div>}
        </div>
      )}

      {tab === 'Variants' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {doc.variants?.map(v => (
            <div key={v.name} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', minWidth: 100 }}>{v.name}</div>
              <div style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{v.token}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', flex: 1 }}>{v.desc}</div>
            </div>
          ))}
          {doc.sizes && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Sizes</div>
              {doc.sizes.map(s => <div key={s} style={{ fontSize: 12, color: 'var(--text2)', padding: '4px 0', fontFamily: 'var(--font-mono)' }}>{s}</div>)}
            </div>
          )}
        </div>
      )}

      {tab === 'Tokens' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {doc.tokens?.map(t => (
            <div key={t} style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg1)', border: '1px solid var(--border)', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text2)' }}>{t}</div>
          ))}
        </div>
      )}

      {tab === 'Accessibility' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {doc.a11y?.map((a, i) => (
            <div key={i} style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg1)', border: '1px solid var(--border)', fontSize: 12, color: 'var(--text2)', display: 'flex', gap: 8 }}>
              <span style={{ color: '#30a46c' }}>✓</span> {a}
            </div>
          ))}
        </div>
      )}

      {tab === 'Guidelines' && (
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#30a46c', marginBottom: 8 }}>✓ Do</div>
            {doc.dos?.map((d, i) => <div key={i} style={{ fontSize: 12, color: 'var(--text2)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', background: '#30a46c08', border: '1px solid #30a46c20', marginBottom: 4 }}>{d}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e5484d', marginBottom: 8 }}>✕ Don't</div>
            {doc.donts?.map((d, i) => <div key={i} style={{ fontSize: 12, color: 'var(--text2)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', background: '#e5484d08', border: '1px solid #e5484d20', marginBottom: 4 }}>{d}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}

export function PatternsPage() {
  return (
    <div>
      <SectionTitle title="Patterns" sub="Common UI patterns composed from components. Switch brands above to see white-label theming in action." />
      
      {/* TopNavigation Pattern */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 16, fontFamily: 'var(--font-display)' }}>TopNavigation</h3>
        <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 24, lineHeight: 1.6 }}>
          Main navigation pattern that orchestrates atoms and foundations. Supports Guest and Logged-in states with responsive mobile/desktop layouts.
        </p>
        
        {/* Guest Variant */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Guest State</div>
          <div style={{ 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius-lg)', 
            overflow: 'hidden',
            background: 'var(--bg)',
          }}>
            <TopNavigation isLoggedIn={false} />
            <div style={{ padding: 24, background: 'var(--bg1)', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
                &lt;TopNavigation isLoggedIn={'{false}'} /&gt;
              </div>
            </div>
          </div>
        </div>

        {/* Logged-in Variant */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Logged-in State</div>
          <div style={{ 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius-lg)', 
            overflow: 'hidden',
            background: 'var(--bg)',
          }}>
            <TopNavigation 
              isLoggedIn={true} 
              userName="John Doe" 
              balance="1,250.50" 
              currency="USD" 
            />
            <div style={{ padding: 24, background: 'var(--bg1)', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
                &lt;TopNavigation isLoggedIn={'{true}'} userName="John Doe" balance="1,250.50" /&gt;
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Note */}
        <InfoCard title="Responsive Design" color="var(--accent)">
          The TopNavigation automatically adapts between desktop and mobile layouts at the 768px breakpoint. 
          On mobile, the navigation collapses to a compact 110×28px header with a hamburger menu that expands to show all navigation items and user actions.
        </InfoCard>
      </div>
    </div>
  );
}
