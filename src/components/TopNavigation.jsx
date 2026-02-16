import { useState, useEffect, useRef } from 'react';
import { useHover } from './useHover';

/* ═══════════════════════════════════════════════════
   TOP NAVIGATION — Pattern Component
   Orchestrates atoms and foundations from wa-ds
   ═══════════════════════════════════════════════════ */

// ─── Icon Components (SVG) ────────────────────────
// Using inline SVG until lucide-react is available

const MenuIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const UserIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ChevronDownIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const MailIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// ─── Button Component (using tokens) ───────────────
function Button({ variant = 'default', size = 'md', children, onClick, disabled, className = '' }) {
  const { hover, pressed, bind } = useHover();
  const h = { sm: 32, md: 36, lg: 40 }[size];
  const pad = { sm: '6px 12px', md: '8px 16px', lg: '10px 24px' }[size];
  const fs = { sm: 12, md: 13, lg: 14 }[size];

  const base = {
    height: h,
    padding: pad,
    fontSize: fs,
    borderRadius: 'var(--radius-sm)',
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    transition: 'all 120ms ease',
    opacity: disabled ? 0.4 : 1,
    transform: pressed && !disabled ? 'scale(0.96)' : 'scale(1)',
    border: 'none',
    outline: 'none',
  };

  const variants = {
    default: {
      ...base,
      background: pressed ? 'var(--accent-pressed)' : hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: '#fff',
      boxShadow: hover && !pressed ? '0 2px 8px color-mix(in srgb, var(--accent), transparent 70%)' : 'none',
    },
    secondary: {
      ...base,
      background: pressed ? 'var(--bg)' : hover ? 'var(--bg3)' : 'var(--bg2)',
      color: 'var(--text)',
      border: '1px solid ' + (hover ? 'var(--border-hover)' : 'var(--border)'),
    },
    outline: {
      ...base,
      background: hover ? 'rgba(255,255,255,0.04)' : 'transparent',
      color: 'var(--text)',
      border: '1px solid ' + (hover ? 'var(--text3)' : 'var(--border)'),
    },
    ghost: {
      ...base,
      background: pressed ? 'rgba(255,255,255,0.08)' : hover ? 'rgba(255,255,255,0.05)' : 'transparent',
      color: hover ? 'var(--text)' : 'var(--text2)',
    },
  };

  return (
    <button
      {...bind}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={variants[variant] || variants.default}
    >
      {children}
    </button>
  );
}

// ─── NavLink Component ──────────────────────────────
function NavLink({ href, children }) {
  const { hover, bind } = useHover();
  return (
    <a
      href={href}
      {...bind}
      style={{
        fontSize: 14,
        color: hover ? 'var(--accent)' : 'var(--text)',
        textDecoration: 'none',
        fontWeight: 400,
        transition: 'color 120ms',
        cursor: 'pointer',
      }}
    >
      {children}
    </a>
  );
}

// ─── DropdownMenu Component ────────────────────────
function DropdownMenu({ trigger, children, open, onOpenChange }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onOpenChange(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, onOpenChange]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div onClick={() => onOpenChange(!open)}>{trigger}</div>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: 200,
            background: 'var(--bg1)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '4px',
            boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgba(0,0,0,.1))',
            zIndex: 1000,
            fontFamily: 'var(--font)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownMenuItem({ children, onClick, icon }) {
  const { hover, bind } = useHover();
  return (
    <div
      {...bind}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderRadius: 'var(--radius-sm)',
        fontSize: 13,
        color: hover ? 'var(--text)' : 'var(--text2)',
        background: hover ? 'var(--bg2)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 120ms',
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </div>
  );
}

// ─── Main TopNavigation Component ──────────────────
export function TopNavigation({ isLoggedIn = false, userName = 'User-name', balance = '0.00', currency = 'USD' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [depositDropdownOpen, setDepositDropdownOpen] = useState(false);

  const navLinks = ['Inicio', 'Nosotros', 'Ayuda', 'Promociones', 'Pagos', 'Recargas'];

  return (
    <>
      <nav
        style={{
          width: '100%',
          background: 'var(--bg1)',
          borderBottom: '1px solid var(--border)',
          fontFamily: 'var(--font)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Desktop View */}
        <div
          className="desktop-nav"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: 64,
            maxWidth: 1440,
            margin: '0 auto',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <div
              style={{
                padding: '8px 16px',
                background: '#fff',
                borderRadius: 'var(--radius-sm)',
                color: '#000',
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
              }}
            >
              WA-PREPAGO
            </div>
          </div>

          {/* Navigation Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {navLinks.map((link) => (
              <NavLink key={link} href="#">
                {link}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {!isLoggedIn ? (
              <>
                <Button variant="secondary" size="md" onClick={() => {}}>
                  Login
                </Button>
                <Button variant="default" size="md" onClick={() => {}}>
                  Register
                </Button>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <UserIcon size={18} />
                  <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{userName}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                  Balance: {balance} {currency}
                </div>
                <DropdownMenu
                  open={depositDropdownOpen}
                  onOpenChange={setDepositDropdownOpen}
                  trigger={
                    <Button variant="default" size="md">
                      Deposit
                      <ChevronDownIcon size={16} />
                    </Button>
                  }
                >
                  <DropdownMenuItem onClick={() => {}}>Ver mi Billetera</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>Mis movimientos</DropdownMenuItem>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div
          className="mobile-nav"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            height: 28,
            width: 110,
          }}
        >
          <div
            style={{
              padding: '4px 8px',
              background: '#fff',
              borderRadius: 'var(--radius-sm)',
              color: '#000',
              fontSize: 10,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
            }}
          >
            WA
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {mobileMenuOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'var(--bg1)',
            padding: '24px',
            overflowY: 'auto',
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                padding: '8px 16px',
                background: '#fff',
                borderRadius: 'var(--radius-sm)',
                color: '#000',
                fontSize: 16,
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                display: 'inline-block',
                marginBottom: 24,
              }}
            >
              WA-PREPAGO
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: 16,
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontWeight: 400,
                  padding: '8px 0',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* User Info (if logged in) */}
          {isLoggedIn && (
            <div style={{ marginBottom: 24, padding: '16px', background: 'var(--bg2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <UserIcon size={20} />
                <span style={{ fontSize: 16, color: 'var(--text)', fontWeight: 600 }}>{userName}</span>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 16 }}>
                Balance: {balance} {currency}
              </div>
              <Button variant="default" size="md" onClick={() => {}} style={{ width: '100%' }}>
                Deposit
              </Button>
            </div>
          )}

          {/* Auth Buttons (if guest) */}
          {!isLoggedIn && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Button variant="secondary" size="lg" onClick={() => setMobileMenuOpen(false)} style={{ width: '100%' }}>
                Login
              </Button>
              <Button variant="default" size="lg" onClick={() => setMobileMenuOpen(false)} style={{ width: '100%' }}>
                Register
              </Button>
            </div>
          )}

          {/* Additional Menu Items */}
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <DropdownMenuItem icon={<MailIcon size={16} />} onClick={() => setMobileMenuOpen(false)}>
              Contact Support
            </DropdownMenuItem>
            <DropdownMenuItem icon={<PhoneIcon size={16} />} onClick={() => setMobileMenuOpen(false)}>
              Call Us
            </DropdownMenuItem>
            {isLoggedIn && (
              <>
                <DropdownMenuItem icon={<UserIcon size={16} />} onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>Sign out</DropdownMenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
