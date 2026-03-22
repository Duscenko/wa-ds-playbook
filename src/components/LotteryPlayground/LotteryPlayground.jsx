import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';
import { ChevronDown } from '../UI';

/* ─── Lottery Theme Definitions ────────────────────── */
const LOTTERY_THEMES = [
  {
    id: 'euromillions',
    label: 'EuroMillions',
    emoji: '🇪🇺',
    accent: '#003087',
    accentHover: '#00408F',
    headerGradient: 'linear-gradient(135deg, #003087 0%, #0050B3 60%, #FFD700 100%)',
    ballBg: 'linear-gradient(135deg, #003087 0%, #0050B3 100%)',
    ballColor: '#fff',
    specialBallBg: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    specialBallColor: '#003087',
    specialLabel: 'Lucky Star',
    buttonBg: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    buttonColor: '#003087',
    mainCount: 5, mainMax: 50,
    specialCount: 2, specialMax: 12,
    jackpot: '€215M',
    nextDraw: '2026-03-24',
    currency: '€',
  },
  {
    id: 'powerball',
    label: 'Powerball',
    emoji: '🇺🇸',
    accent: '#CC0000',
    accentHover: '#AA0000',
    headerGradient: 'linear-gradient(135deg, #CC0000 0%, #990000 60%, #002868 100%)',
    ballBg: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
    ballColor: '#fff',
    specialBallBg: 'linear-gradient(135deg, #CC0000 0%, #8B0000 100%)',
    specialBallColor: '#fff',
    specialLabel: 'Powerball',
    buttonBg: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
    buttonColor: '#fff',
    mainCount: 5, mainMax: 69,
    specialCount: 1, specialMax: 26,
    jackpot: '$345M',
    nextDraw: '2026-03-25',
    currency: '$',
  },
  {
    id: 'mega-millions',
    label: 'Mega Millions',
    emoji: '💰',
    accent: '#0050A0',
    accentHover: '#003D7A',
    headerGradient: 'linear-gradient(135deg, #0050A0 0%, #003D7A 50%, #FFD700 100%)',
    ballBg: 'linear-gradient(135deg, #0050A0 0%, #003D7A 100%)',
    ballColor: '#fff',
    specialBallBg: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    specialBallColor: '#0050A0',
    specialLabel: 'Mega Ball',
    buttonBg: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    buttonColor: '#0050A0',
    mainCount: 5, mainMax: 70,
    specialCount: 1, specialMax: 25,
    jackpot: '$180M',
    nextDraw: '2026-03-26',
    currency: '$',
  },
  {
    id: 'mega-sena',
    label: 'Mega Sena',
    emoji: '🇧🇷',
    accent: '#007A2F',
    accentHover: '#005C22',
    headerGradient: 'linear-gradient(135deg, #007A2F 0%, #005C22 60%, #FFDF00 100%)',
    ballBg: 'linear-gradient(135deg, #007A2F 0%, #005C22 100%)',
    ballColor: '#fff',
    specialBallBg: 'linear-gradient(135deg, #FFDF00 0%, #FFC000 100%)',
    specialBallColor: '#007A2F',
    specialLabel: 'Bonus',
    buttonBg: 'linear-gradient(135deg, #007A2F 0%, #005C22 100%)',
    buttonColor: '#fff',
    mainCount: 6, mainMax: 60,
    specialCount: 0, specialMax: 0,
    jackpot: 'R$120M',
    nextDraw: '2026-03-26',
    currency: 'R$',
  },
  {
    id: 'uk-lotto',
    label: 'UK Lotto',
    emoji: '🇬🇧',
    accent: '#FFB800',
    accentHover: '#E0A200',
    headerGradient: 'linear-gradient(135deg, #FFB800 0%, #E07000 60%, #CC0000 100%)',
    ballBg: 'linear-gradient(135deg, #FFB800 0%, #E07000 100%)',
    ballColor: '#fff',
    specialBallBg: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
    specialBallColor: '#fff',
    specialLabel: 'Bonus Ball',
    buttonBg: 'linear-gradient(135deg, #FFB800 0%, #E07000 100%)',
    buttonColor: '#fff',
    mainCount: 6, mainMax: 59,
    specialCount: 1, specialMax: 59,
    jackpot: '£7.8M',
    nextDraw: '2026-03-25',
    currency: '£',
  },
  {
    id: 'superenalotto',
    label: 'SuperEnalotto',
    emoji: '🇮🇹',
    accent: '#E84600',
    accentHover: '#C03800',
    headerGradient: 'linear-gradient(135deg, #E84600 0%, #C03800 50%, #009246 100%)',
    ballBg: 'linear-gradient(135deg, #E84600 0%, #C03800 100%)',
    ballColor: '#fff',
    specialBallBg: 'linear-gradient(135deg, #009246 0%, #006B32 100%)',
    specialBallColor: '#fff',
    specialLabel: 'Jolly',
    buttonBg: 'linear-gradient(135deg, #E84600 0%, #C03800 100%)',
    buttonColor: '#fff',
    mainCount: 6, mainMax: 90,
    specialCount: 1, specialMax: 90,
    jackpot: '€45M',
    nextDraw: '2026-03-25',
    currency: '€',
  },
  {
    id: 'la-primitiva',
    label: 'La Primitiva',
    emoji: '🇪🇸',
    accent: '#7C3AED',
    accentHover: '#6D28D9',
    headerGradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 50%, #C2410C 100%)',
    ballBg: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
    ballColor: '#fff',
    specialBallBg: 'linear-gradient(135deg, #C2410C 0%, #9A3412 100%)',
    specialBallColor: '#fff',
    specialLabel: 'Complementario',
    buttonBg: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
    buttonColor: '#fff',
    mainCount: 6, mainMax: 49,
    specialCount: 1, specialMax: 9,
    jackpot: '€8.3M',
    nextDraw: '2026-03-28',
    currency: '€',
  },
  {
    id: 'el-gordo',
    label: 'El Gordo',
    emoji: '🎄',
    accent: '#DC2626',
    accentHover: '#B91C1C',
    headerGradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #FFD700 100%)',
    ballBg: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
    ballColor: '#fff',
    specialBallBg: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    specialBallColor: '#DC2626',
    specialLabel: 'Clave',
    buttonBg: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
    buttonColor: '#fff',
    mainCount: 5, mainMax: 54,
    specialCount: 1, specialMax: 10,
    jackpot: '€84M',
    nextDraw: '2026-03-29',
    currency: '€',
  },
  {
    id: 'oz-lotto',
    label: 'OZ Lotto',
    emoji: '🇦🇺',
    accent: '#0D9488',
    accentHover: '#0B7B70',
    headerGradient: 'linear-gradient(135deg, #0D9488 0%, #065F56 50%, #F59E0B 100%)',
    ballBg: 'linear-gradient(135deg, #0D9488 0%, #065F56 100%)',
    ballColor: '#fff',
    specialBallBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    specialBallColor: '#fff',
    specialLabel: 'Supp',
    buttonBg: 'linear-gradient(135deg, #0D9488 0%, #065F56 100%)',
    buttonColor: '#fff',
    mainCount: 7, mainMax: 45,
    specialCount: 2, specialMax: 45,
    jackpot: 'A$10M',
    nextDraw: '2026-03-25',
    currency: 'A$',
  },
  {
    id: 'irish-lotto',
    label: 'Irish Lotto',
    emoji: '🍀',
    accent: '#15803D',
    accentHover: '#166534',
    headerGradient: 'linear-gradient(135deg, #15803D 0%, #166534 50%, #F59E0B 100%)',
    ballBg: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
    ballColor: '#fff',
    specialBallBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    specialBallColor: '#fff',
    specialLabel: 'Bonus',
    buttonBg: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
    buttonColor: '#fff',
    mainCount: 6, mainMax: 47,
    specialCount: 1, specialMax: 47,
    jackpot: '€5.5M',
    nextDraw: '2026-03-28',
    currency: '€',
  },
];

/* ─── Countdown hook (simple) ─────────────────────── */
function useCountdown(targetDateStr) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDateStr) - new Date();
      if (diff <= 0) return setTime({ days: 0, hours: 0, minutes: 0 });
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      setTime({ days, hours, minutes });
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [targetDateStr]);
  return time;
}

/* ─── Section Label ───────────────────────────────── */
const SectionLabel = ({ label, sub }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)', fontFamily: 'var(--font)', marginBottom: 4 }}>
      {label}
    </div>
    {sub && <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'var(--font)' }}>{sub}</div>}
  </div>
);

/* ─── Preview Card wrapper ────────────────────────── */
const PreviewCard = ({ label, children, noPad }) => (
  <div style={{ marginBottom: 40 }}>
    <SectionLabel label={label} />
    <div style={{
      borderRadius: 12,
      border: '1px solid var(--border)',
      background: 'var(--bg1)',
      overflow: 'hidden',
      padding: noPad ? 0 : 24,
    }}>
      {children}
    </div>
  </div>
);

/* ─── Jackpot Hero Card ───────────────────────────── */
function JackpotHeroCard({ theme }) {
  const { days, hours, minutes } = useCountdown(theme.nextDraw);
  const label = days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`;

  return (
    <div style={{
      background: theme.headerGradient,
      borderRadius: 20,
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
      minHeight: 200,
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 200, height: 200, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 4, fontFamily: 'var(--font)' }}>
          {theme.emoji} {theme.label}
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: 8, fontFamily: 'var(--font)' }}>
          Current Jackpot
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 16, fontFamily: 'var(--font-display, var(--font))', letterSpacing: '-1px' }}>
          {theme.jackpot}
        </div>

        {/* Countdown bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Next Draw
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#FFD700', fontFamily: 'var(--font)' }}>
              ⏱ {label}
            </span>
          </div>
          <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.15)' }}>
            <div style={{
              height: '100%', borderRadius: 99,
              width: `${Math.min(100, (days / 7) * 100)}%`,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))',
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        <button style={{
          background: theme.buttonBg,
          color: theme.buttonColor,
          border: 'none',
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'var(--font)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}>
          🎰 Play Now
        </button>
      </div>
    </div>
  );
}

/* ─── Number Ball ─────────────────────────────────── */
function Ball({ n, selected, onClick, bg, color, size = 36, fontSize = 13 }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size, height: size,
        borderRadius: '50%',
        background: selected ? bg : 'var(--bg2)',
        color: selected ? color : 'var(--text3)',
        border: selected ? 'none' : '1.5px solid var(--border)',
        fontSize,
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 150ms cubic-bezier(0.34,1.56,0.64,1)',
        transform: selected ? 'scale(1.08)' : 'scale(1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font)',
        boxShadow: selected ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
        flexShrink: 0,
      }}
    >
      {n}
    </button>
  );
}

/* ─── Number Picker Widget ────────────────────────── */
function NumberPicker({ theme }) {
  const totalMain = theme.mainMax;
  const totalSpecial = theme.specialMax;
  const [selected, setSelected] = useState(new Set());
  const [selectedSpecial, setSelectedSpecial] = useState(new Set());

  const toggleMain = (n) => {
    setSelected(prev => {
      const s = new Set(prev);
      if (s.has(n)) { s.delete(n); return s; }
      if (s.size >= theme.mainCount) return prev;
      s.add(n); return s;
    });
  };

  const toggleSpecial = (n) => {
    setSelectedSpecial(prev => {
      const s = new Set(prev);
      if (s.has(n)) { s.delete(n); return s; }
      if (s.size >= theme.specialCount) return prev;
      s.add(n); return s;
    });
  };

  const mainDone = selected.size === theme.mainCount;
  const specialDone = !theme.specialCount || selectedSpecial.size === theme.specialCount;
  const complete = mainDone && specialDone;

  return (
    <div style={{ userSelect: 'none' }}>
      {/* Main numbers */}
      <div style={{ marginBottom: theme.specialCount ? 20 : 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text3)', fontFamily: 'var(--font)' }}>
            Pick {theme.mainCount} numbers (1–{totalMain})
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: selected.size === theme.mainCount ? '#22c55e' : 'var(--accent)', fontFamily: 'var(--font)' }}>
            {selected.size} / {theme.mainCount}
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gap: 4,
        }}>
          {Array.from({ length: totalMain }, (_, i) => i + 1).map(n => (
            <Ball
              key={n} n={n}
              selected={selected.has(n)}
              onClick={() => toggleMain(n)}
              bg={theme.ballBg}
              color={theme.ballColor}
              size={34} fontSize={12}
            />
          ))}
        </div>
      </div>

      {/* Special numbers */}
      {theme.specialCount > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text3)', fontFamily: 'var(--font)' }}>
              {theme.specialLabel} (1–{totalSpecial})
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: selectedSpecial.size === theme.specialCount ? '#22c55e' : 'var(--accent)', fontFamily: 'var(--font)' }}>
              {selectedSpecial.size} / {theme.specialCount}
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(totalSpecial, 12)}, 1fr)`,
            gap: 4,
            maxWidth: Math.min(totalSpecial, 12) * 38,
          }}>
            {Array.from({ length: totalSpecial }, (_, i) => i + 1).map(n => (
              <Ball
                key={n} n={n}
                selected={selectedSpecial.has(n)}
                onClick={() => toggleSpecial(n)}
                bg={theme.specialBallBg}
                color={theme.specialBallColor}
                size={34} fontSize={12}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add to cart */}
      <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
        <button
          onClick={() => { setSelected(new Set()); setSelectedSpecial(new Set()); }}
          style={{
            padding: '10px 20px',
            borderRadius: 10,
            border: '1.5px solid var(--border)',
            background: 'transparent',
            color: 'var(--text2)',
            fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'var(--font)',
          }}
        >
          Clear
        </button>
        <button
          disabled={!complete}
          style={{
            flex: 1,
            padding: '10px 20px',
            borderRadius: 10,
            border: 'none',
            background: complete ? theme.buttonBg : 'var(--bg3)',
            color: complete ? theme.buttonColor : 'var(--text3)',
            fontSize: 13, fontWeight: 700,
            cursor: complete ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--font)',
            transition: 'all 150ms',
          }}
        >
          {complete ? '✅ Add to Cart' : `Select ${theme.mainCount - selected.size > 0 ? theme.mainCount - selected.size + ' more' : (theme.specialCount - selectedSpecial.size) + ' ' + theme.specialLabel}`}
        </button>
      </div>
    </div>
  );
}

/* ─── Lottery Banner Card ─────────────────────────── */
function LotteryBannerCard({ theme, size = 'hero' }) {
  const { days, hours, minutes } = useCountdown(theme.nextDraw);
  const label = days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`;
  const isHero = size === 'hero';

  return (
    <div style={{
      background: theme.headerGradient,
      borderRadius: 16,
      padding: isHero ? '24px 20px' : '16px',
      position: 'relative',
      overflow: 'hidden',
      minHeight: isHero ? 180 : 140,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: isHero ? 22 : 16, fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display, var(--font))', marginBottom: 4 }}>
          {theme.emoji} {theme.label}
        </div>
        <div style={{ fontSize: isHero ? 32 : 22, fontWeight: 900, color: '#FFD700', lineHeight: 1, fontFamily: 'var(--font-display, var(--font))' }}>
          {theme.jackpot}
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font)' }}>
          Draw in <span style={{ fontWeight: 700, color: '#FFD700' }}>{label}</span>
        </div>
        <button style={{
          background: theme.buttonBg,
          color: theme.buttonColor,
          border: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'var(--font)',
        }}>
          Play →
        </button>
      </div>
    </div>
  );
}

/* ─── Ticket Line Widget ──────────────────────────── */
function TicketLines({ theme }) {
  const exampleLines = [
    { main: [7, 14, 23, 36, 45], special: [3, 9] },
    { main: [2, 19, 28, 41, 50], special: [1, 7] },
    { main: [11, 22, 33, 44, 48], special: [5, 12] },
  ].slice(0, theme.specialCount > 0 ? 3 : 3).map(l => ({
    ...l,
    main: l.main.slice(0, theme.mainCount),
    special: l.special.slice(0, theme.specialCount),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {exampleLines.map((line, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 16px',
          borderRadius: 10,
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', fontFamily: 'var(--font)', minWidth: 48 }}>
            Line {i + 1}
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flex: 1 }}>
            {line.main.map(n => (
              <div key={n} style={{
                width: 28, height: 28, borderRadius: '50%',
                background: theme.ballBg,
                color: theme.ballColor,
                fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font)',
              }}>{n}</div>
            ))}
            {line.special.map((n, j) => (
              <div key={`s${j}`} style={{
                width: 28, height: 28, borderRadius: '50%',
                background: theme.specialBallBg,
                color: theme.specialBallColor,
                fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font)',
              }}>{n}</div>
            ))}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font)' }}>
            {theme.currency}3.50
          </div>
          <button style={{
            width: 24, height: 24, borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text3)',
            cursor: 'pointer', fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>
      ))}

      {/* Cart footer */}
      <div style={{
        marginTop: 8,
        padding: '14px 16px',
        borderRadius: 10,
        background: theme.accent + '15',
        border: `1px solid ${theme.accent}30`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font)' }}>3 lines · 1 draw</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font)' }}>{theme.currency}10.50</div>
        </div>
        <button style={{
          background: theme.buttonBg,
          color: theme.buttonColor,
          border: 'none',
          borderRadius: 10,
          padding: '10px 24px',
          fontSize: 14, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'var(--font)',
        }}>
          Checkout →
        </button>
      </div>
    </div>
  );
}

/* ─── Welcome Modal Preview ───────────────────────── */
function WelcomeModalPreview({ theme }) {
  const { days, hours, minutes } = useCountdown(theme.nextDraw);
  const label = days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: 320,
        borderRadius: 24,
        overflow: 'hidden',
        background: theme.headerGradient,
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
      }}>
        <div style={{ padding: '28px 24px 24px', textAlign: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
            width: 160, height: 160, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
            filter: 'blur(20px)', pointerEvents: 'none',
          }} />

          <div style={{ fontSize: 48, marginBottom: 8 }}>{theme.emoji}</div>

          <h2 style={{ fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 6, fontFamily: 'var(--font-display, var(--font))' }}>
            Welcome to {theme.label}!
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 20, fontFamily: 'var(--font)' }}>
            Hey Player! 🌟 Ready to win big?
          </p>

          {/* Jackpot counter */}
          <div style={{
            background: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: 16,
            padding: '16px',
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)', marginBottom: 4, fontFamily: 'var(--font)' }}>
              Current Jackpot
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, color: '#fff', lineHeight: 1, fontFamily: 'var(--font-display, var(--font))' }}>
              {theme.jackpot}
            </div>
          </div>

          {/* Countdown */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font)' }}>Next Draw</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#FFD700', fontFamily: 'var(--font)' }}>⏱ {label}</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.15)' }}>
              <div style={{ height: '100%', width: `${Math.min(100, (days / 7) * 100)}%`, borderRadius: 99, background: 'linear-gradient(90deg, #34D399, #FFD700)' }} />
            </div>
          </div>

          <button style={{
            width: '100%', padding: '14px',
            borderRadius: 12, border: 'none',
            background: theme.buttonBg,
            color: theme.buttonColor,
            fontSize: 16, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font)',
            marginBottom: 10,
          }}>
            🎰 Play Now!
          </button>
          <button style={{
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)',
          }}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Color Tokens Swatch ─────────────────────────── */
function ColorSwatches({ theme }) {
  const swatches = [
    { label: 'Accent / Primary', color: theme.accent },
    { label: 'Accent Hover', color: theme.accentHover },
    { label: 'Ball Background', value: theme.ballBg, isGradient: true },
    { label: 'Ball Text', color: theme.ballColor, bg: theme.accent },
    { label: 'Special Ball', value: theme.specialBallBg, isGradient: true },
    { label: 'CTA Button', value: theme.buttonBg, isGradient: true },
    { label: 'Button Text', color: theme.buttonColor, bg: theme.accent },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {swatches.map((s) => (
        <div key={s.label} style={{ textAlign: 'center', minWidth: 72 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 10,
            background: s.isGradient ? s.value : (s.bg || s.color),
            border: '1px solid var(--border)',
            margin: '0 auto 6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {s.color && !s.isGradient && (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.color }} />
            )}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font)', lineHeight: 1.3 }}>{s.label}</div>
          {s.color && !s.isGradient && <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--font-mono, monospace)' }}>{s.color}</div>}
        </div>
      ))}
    </div>
  );
}

/* ─── Lottery Dropdown ────────────────────────────── */
function LotteryDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LOTTERY_THEMES.find(t => t.id === value);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

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
          color: 'var(--text)',
        }}
      >
        <span style={{ fontSize: 16 }}>{current?.emoji}</span>
        <span style={{ fontWeight: 500 }}>{current?.label || 'Select lottery'}</span>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: current?.accent, flexShrink: 0 }} />
        <ChevronDown size={16} rotated={open} color="var(--text3)" />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 6,
          zIndex: 100, background: 'var(--bg1)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius, 6px)',
          padding: 6, minWidth: 200,
          boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          maxHeight: 360, overflowY: 'auto',
        }}>
          {LOTTERY_THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => { onChange(t.id); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '9px 12px', borderRadius: 5,
                border: 'none', textAlign: 'left',
                background: value === t.id ? 'var(--accent-subtle)' : 'transparent',
                color: value === t.id ? 'var(--accent)' : 'var(--text2)',
                cursor: 'pointer', fontSize: 13, fontWeight: 500,
                transition: 'all 120ms', fontFamily: 'var(--font)',
              }}
              onMouseEnter={e => { if (value !== t.id) { e.currentTarget.style.background = 'var(--bg2)'; e.currentTarget.style.color = 'var(--text)'; } }}
              onMouseLeave={e => { if (value !== t.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; } }}
            >
              <span style={{ fontSize: 18 }}>{t.emoji}</span>
              <span style={{ flex: 1 }}>{t.label}</span>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.accent, flexShrink: 0 }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ──────────────────────────────── */
export default function LotteryPlayground({ stickyTop = 69 }) {
  const [activeLottery, setActiveLottery] = useState('euromillions');
  const theme = LOTTERY_THEMES.find(t => t.id === activeLottery) || LOTTERY_THEMES[0];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ── Sticky top bar ── */}
      <div style={{
        position: 'sticky', top: stickyTop, zIndex: 30,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        padding: '0 32px',
        height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font)' }}>
            Lottery UI — White-Label Preview
          </span>
          <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font)' }}>
            {LOTTERY_THEMES.length} themes
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font)' }}>Active theme:</span>
          <LotteryDropdown value={activeLottery} onChange={setActiveLottery} />
        </div>
      </div>

      {/* ── Theme pill strip ── */}
      <div style={{
        padding: '16px 32px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', gap: 8, overflowX: 'auto',
      }}>
        {LOTTERY_THEMES.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveLottery(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 99,
              border: activeLottery === t.id ? `2px solid ${t.accent}` : '1.5px solid var(--border)',
              background: activeLottery === t.id ? t.accent + '15' : 'transparent',
              cursor: 'pointer', whiteSpace: 'nowrap',
              fontSize: 12, fontWeight: activeLottery === t.id ? 700 : 500,
              color: activeLottery === t.id ? t.accent : 'var(--text2)',
              fontFamily: 'var(--font)',
              transition: 'all 150ms',
            }}
          >
            <span>{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '36px 32px', maxWidth: 1100, margin: '0 auto' }}>

        {/* Theme color tokens */}
        <PreviewCard label="Color Tokens">
          <ColorSwatches theme={theme} />
        </PreviewCard>

        {/* Jackpot hero card */}
        <PreviewCard label="Jackpot Hero Card" sub="Full-width promotional card for home page and landing">
          <JackpotHeroCard theme={theme} />
        </PreviewCard>

        {/* Banner cards grid */}
        <PreviewCard label="Lottery Banner Cards" sub="Grid cards for home page lottery listing">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {LOTTERY_THEMES.slice(0, 3).map(t => (
              <LotteryBannerCard key={t.id} theme={t} size="compact" />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <LotteryBannerCard theme={theme} size="hero" />
            <LotteryBannerCard theme={LOTTERY_THEMES[(LOTTERY_THEMES.findIndex(t => t.id === activeLottery) + 1) % LOTTERY_THEMES.length]} size="hero" />
          </div>
        </PreviewCard>

        {/* Number picker */}
        <PreviewCard label="Number Picker" sub="Interactive ball grid — select your lucky numbers">
          <NumberPicker theme={theme} />
        </PreviewCard>

        {/* Ticket lines */}
        <PreviewCard label="Ticket Lines / Cart" sub="Selected number lines with checkout summary">
          <TicketLines theme={theme} />
        </PreviewCard>

        {/* Welcome modal */}
        <PreviewCard label="Welcome Modal" sub="First-visit popup promoting the jackpot">
          <WelcomeModalPreview theme={theme} />
        </PreviewCard>

        {/* Theme comparison */}
        <PreviewCard label="Theme Comparison" sub="All 10 lottery themes side by side — hero card scaled">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {LOTTERY_THEMES.map(t => (
              <div
                key={t.id}
                onClick={() => setActiveLottery(t.id)}
                style={{
                  borderRadius: 12, overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeLottery === t.id ? `2px solid ${t.accent}` : '2px solid transparent',
                  transition: 'all 150ms',
                  transform: activeLottery === t.id ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                <div style={{
                  background: t.headerGradient,
                  padding: '12px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{t.emoji}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'var(--font)' }}>{t.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: '#FFD700', fontFamily: 'var(--font)' }}>{t.jackpot}</div>
                </div>
                <div style={{ padding: 8, background: 'var(--bg1)' }}>
                  <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 6 }}>
                    {[7, 14, 23, 36, 45].slice(0, t.mainCount > 5 ? 5 : t.mainCount).map(n => (
                      <div key={n} style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: t.ballBg,
                        color: t.ballColor,
                        fontSize: 8, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font)',
                      }}>{n}</div>
                    ))}
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--text3)', textAlign: 'center', fontFamily: 'var(--font)' }}>
                    {t.mainCount} of {t.mainMax}{t.specialCount > 0 ? ` + ${t.specialCount} ${t.specialLabel}` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PreviewCard>

      </div>
    </div>
  );
}
