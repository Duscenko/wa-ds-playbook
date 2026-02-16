import { useState, useEffect, useRef } from 'react';
import { useHover } from '../useHover';
import { BtnPreview } from '../LivePreviews';

/* ═══════════════════════════════════════════════════
   TOP NAVIGATION — Pattern Component (Pixel-Perfect)
   Based on Figma node: 58236-22687
   ═══════════════════════════════════════════════════ */

// ─── Icon Components (SVG - matching lucide-react style) ───
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

const SearchIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

// ─── NavLink Component with Active State ──────────────
function NavLink({ href, children, isActive = false }) {
  const { hover, bind } = useHover();
  return (
    <a
      href={href}
      {...bind}
      style={{
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: 400,
        color: isActive ? '#fff' : 'var(--text)',
        background: isActive ? 'var(--accent)' : 'transparent',
        padding: isActive ? '6px 12px' : '6px 0',
        borderRadius: isActive ? 'var(--radius-sm)' : 0,
        textDecoration: 'none',
        transition: 'all 120ms',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </a>
  );
}

// ─── DropdownMenu Component ────────────────────────────
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
      <div onClick={() => onOpenChange(!open)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: 220,
            background: 'var(--bg1)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '4px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,.1)',
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

function DropdownMenuItem({ children, onClick, icon, isDestructive = false }) {
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
        color: isDestructive ? 'var(--red)' : (hover ? 'var(--text)' : 'var(--text2)'),
        background: hover ? 'var(--bg2)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 120ms',
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>{icon}</span>}
      {children}
    </div>
  );
}

// ─── Main TopNavigation Component ──────────────────────
export function TopNavigation({ 
  isLoggedIn = false, 
  userName = 'User name', 
  balance = '0.00', 
  currency = 'USD',
  activeLink = 'Home' // Active navigation link
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Navigation links from Figma design
  const navLinks = ['Home', 'Live Preview', 'Docs', 'About', 'Resources', 'Blog', 'Legal'];

  // Desktop navigation height: 72px (exact from Figma)
  const DESKTOP_NAV_HEIGHT = 72;
  // Mobile navigation dimensions: 110x28px (exact from Figma)
  const MOBILE_NAV_WIDTH = 110;
  const MOBILE_NAV_HEIGHT = 28;

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: `${DESKTOP_NAV_HEIGHT}px`, // Exact height from Figma
            maxWidth: 1440,
            margin: '0 auto',
          }}
        >
          {/* Logo - WA-DS 2 BETA (exact from Figma) */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <div
              style={{
                padding: '8px 16px',
                background: '#fff',
                borderRadius: 'var(--radius-sm)',
                borderTopRightRadius: 'var(--radius-base)', // Rounded corners on right side only
                borderBottomRightRadius: 'var(--radius-base)',
                color: '#000',
                fontSize: 14,
                lineHeight: '20px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                whiteSpace: 'nowrap',
              }}
            >
              WA-DS 2 BETA
            </div>
          </div>

          {/* Navigation Links - Gap: 32px (exact from Figma) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px', // Exact gap from Figma
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {navLinks.map((link) => (
              <NavLink 
                key={link} 
                href="#" 
                isActive={link === activeLink}
              >
                {link}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {!isLoggedIn ? (
              <>
                {/* Login Button - using BtnPreview with exact styling */}
                <BtnPreview variant="secondary" size="md">
                  Login
                </BtnPreview>
                {/* Register Button */}
                <BtnPreview variant="default" size="md">
                  Register
                </BtnPreview>
              </>
            ) : (
              <>
                {/* User Icon */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 8,
                  height: 36,
                }}>
                  <UserIcon size={18} />
                </div>
                
                {/* Balance Display */}
                <div style={{ 
                  fontSize: 13, 
                  lineHeight: '20px',
                  color: 'var(--text)', 
                  whiteSpace: 'nowrap',
                }}>
                  {balance} {currency}
                </div>
                
                {/* Deposit Button */}
                <BtnPreview variant="default" size="md">
                  Deposit
                </BtnPreview>

                {/* User Menu Dropdown */}
                <DropdownMenu
                  open={userMenuOpen}
                  onOpenChange={setUserMenuOpen}
                  trigger={
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        height: 36,
                        background: 'var(--bg2)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text)',
                        fontSize: 13,
                        fontWeight: 400,
                        fontFamily: 'var(--font)',
                        cursor: 'pointer',
                        transition: 'all 120ms',
                      }}
                    >
                      {userName}
                      <ChevronDownIcon size={16} />
                    </button>
                  }
                >
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); }}>
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); }}>
                    Live Previews
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); }}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); }}>
                    Deposit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); }}>
                    Promotions
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); }}>
                    Support
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); }}>
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); }}>
                    Affiliate Program
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setUserMenuOpen(false); }}>
                    Refer a Friend
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => { setUserMenuOpen(false); }}
                    isDestructive={true}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Mobile View - 110x28px (exact from Figma) */}
        <div
          className="mobile-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            height: `${MOBILE_NAV_HEIGHT}px`, // Exact: 28px
            width: `${MOBILE_NAV_WIDTH}px`, // Exact: 110px
          }}
        >
          {/* Logo - Compact version */}
          <div
            style={{
              padding: '2px 6px',
              background: '#fff',
              borderRadius: 'var(--radius-sm)',
              color: '#000',
              fontSize: 10,
              lineHeight: '14px',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              whiteSpace: 'nowrap',
            }}
          >
            WA
          </div>
          
          {/* Right side: Search + Deposit (if logged in) + Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Search Icon */}
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text)',
                cursor: 'pointer',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchIcon size={16} />
            </button>
            
            {/* Deposit Button (if logged in) */}
            {isLoggedIn && (
              <div style={{ height: 24, display: 'flex', alignItems: 'center' }}>
                <BtnPreview variant="default" size="sm">
                  Deposit
                </BtnPreview>
              </div>
            )}
            
            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text)',
                cursor: 'pointer',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileMenuOpen ? <XIcon size={16} /> : <MenuIcon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full height sidebar */}
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
          {/* Logo */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                padding: '8px 16px',
                background: '#fff',
                borderRadius: 'var(--radius-sm)',
                borderTopRightRadius: 'var(--radius-base)',
                borderBottomRightRadius: 'var(--radius-base)',
                color: '#000',
                fontSize: 16,
                lineHeight: '24px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                display: 'inline-block',
                marginBottom: 24,
              }}
            >
              WA-DS 2 BETA
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
                  lineHeight: '24px',
                  color: link === activeLink ? '#fff' : 'var(--text)',
                  background: link === activeLink ? 'var(--accent)' : 'transparent',
                  padding: link === activeLink ? '8px 12px' : '8px 0',
                  borderRadius: link === activeLink ? 'var(--radius-sm)' : 0,
                  textDecoration: 'none',
                  fontWeight: 400,
                  transition: 'all 120ms',
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
                <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--text)', fontWeight: 600 }}>{userName}</span>
              </div>
              <div style={{ fontSize: 14, lineHeight: '20px', color: 'var(--text2)', marginBottom: 16 }}>
                {balance} {currency}
              </div>
              <div style={{ width: '100%', display: 'flex' }}>
                <BtnPreview variant="default" size="md">
                  Deposit
                </BtnPreview>
              </div>
            </div>
          )}

          {/* Auth Buttons (if guest) */}
          {!isLoggedIn && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              <BtnPreview variant="secondary" size="lg">
                Login
              </BtnPreview>
              <BtnPreview variant="default" size="lg">
                Register
              </BtnPreview>
            </div>
          )}

          {/* Additional Menu Items (if logged in) */}
          {isLoggedIn && (
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>
                Live Previews
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>
                Promotions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>
                Support
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>
                Affiliate Program
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>
                Refer a Friend
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setMobileMenuOpen(false)}
                isDestructive={true}
              >
                Logout
              </DropdownMenuItem>
            </div>
          )}
        </div>
      )}
    </>
  );
}
