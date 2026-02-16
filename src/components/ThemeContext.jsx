import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { brands, setActiveBrand } from '../data/tokens';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [brand, setBrandState] = useState('wa-default');
  const [mode, setMode] = useState('dark');
  const [radius, setRadius] = useState('default');

  const setBrand = useCallback((b) => {
    setBrandState(b);
    setActiveBrand(b);
  }, []);

  const accent = brands[brand]?.color || '#0090ff';

  const getCSSVars = useCallback(() => {
    const p = brands[brand]?.primitives || brands['wa-default'].primitives;
    const m = mode === 'dark' ? 'main-dark' : 'main-light';
    const n = mode === 'dark' ? 'neutral-dark' : 'neutral-light';

    const radiusMap = {
      sharp:   { sm: '0px',    md: '0px',    lg: '0px',    base: '0px'    },
      default: { sm: '4px',    md: '6px',    lg: '8px',    base: '10px'   },
      round:   { sm: '8px',    md: '12px',   lg: '16px',   base: '20px'   },
      full:    { sm: '9999px', md: '9999px', lg: '9999px', base: '9999px' },
    };
    const r = radiusMap[radius] || radiusMap.default;

    return {
      '--accent':         p[m]?.[900]  || '#0090ff',
      '--accent-hover':   p[m]?.[1000] || '#3b9eff',
      '--accent-pressed': p[m]?.[800]  || '#0077d4',
      '--accent-subtle':  p[m]?.[300]  || '#0d2847',
      '--accent-muted':   p[m]?.[1200] || '#c2e6ff',
      '--bg':             p[n]?.[100]  || '#111113',
      '--bg1':            p[n]?.[200]  || '#18191b',
      '--bg2':            p[n]?.[300]  || '#212225',
      '--bg3':            p[n]?.[400]  || '#272a2d',
      '--text':           p[n]?.[1200] || '#edeef0',
      '--text2':          p[n]?.[1100] || '#b0b4ba',
      '--text3':          p[n]?.[1000] || '#777b84',
      '--border':         p[n]?.[600]  || '#363a3f',
      '--border-hover':   p[n]?.[700]  || '#43484e',
      '--radius-sm':      r.sm,
      '--radius':         r.md,
      '--radius-lg':      r.lg,
      '--radius-base':    r.base,
    };
  }, [brand, mode, radius]);

  const value = useMemo(() => ({
    brand, setBrand,
    mode, setMode,
    radius, setRadius,
    accent, getCSSVars,
  }), [brand, setBrand, mode, setMode, radius, setRadius, accent, getCSSVars]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
  return ctx;
}
