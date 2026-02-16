import { createContext, useContext, useState, useCallback } from 'react';
import { brands, setActiveBrand, resolveToken } from '../data/tokens';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [brand, setBrandState] = useState('wa-default');
  const [mode, setMode] = useState('dark');
  const [radius, setRadius] = useState('default');

  const setBrand = useCallback((b) => {
    setBrandState(b);
    setActiveBrand(b);
  }, []);

  // Resolve a semantic token to hex for current brand + mode
  const resolve = useCallback((ref) => {
    return resolveToken(ref, brand);
  }, [brand]);

  // Get the accent color for current brand
  const accent = brands[brand]?.color || '#0090ff';

  // Get CSS variable overrides based on current brand
  const getCSSVars = useCallback(() => {
    const p = brands[brand]?.primitives || brands['wa-default'].primitives;
    const m = mode === 'dark' ? 'main-dark' : 'main-light';
    const n = mode === 'dark' ? 'neutral-dark' : 'neutral-light';

    const radiusMap = {
      sharp: { sm: '2px', md: '4px', lg: '6px', base: '8px' },
      default: { sm: '4px', md: '6px', lg: '8px', base: '10px' },
      round: { sm: '8px', md: '12px', lg: '16px', base: '20px' },
      full: { sm: '9999px', md: '9999px', lg: '9999px', base: '9999px' },
    };
    const r = radiusMap[radius] || radiusMap.default;

    return {
      '--accent': p[m]?.[900] || '#0090ff',
      '--accent-hover': p[m]?.[1000] || '#3b9eff',
      '--accent-pressed': p[m]?.[800] || '#0077d4',
      '--accent-bg': (p[m]?.[900] || '#0090ff') + '12',
      '--accent-subtle': p[m]?.[300] || '#0d2847',
      '--bg': mode === 'dark' ? (p[n]?.[100] || '#111113') : (p[n]?.[100] || '#fcfcfd'),
      '--bg1': mode === 'dark' ? (p[n]?.[200] || '#18191b') : (p[n]?.[200] || '#f8f9fa'),
      '--bg2': mode === 'dark' ? (p[n]?.[300] || '#212225') : (p[n]?.[300] || '#f1f3f5'),
      '--bg3': mode === 'dark' ? (p[n]?.[400] || '#272a2d') : (p[n]?.[400] || '#e9ecef'),
      '--text': mode === 'dark' ? (p[n]?.[1200] || '#edeef0') : (p[n]?.[1200] || '#11181c'),
      '--text2': mode === 'dark' ? (p[n]?.[1100] || '#b0b4ba') : (p[n]?.[1100] || '#313538'),
      '--text3': mode === 'dark' ? (p[n]?.[1000] || '#777b84') : (p[n]?.[1000] || '#4b5156'),
      '--border': mode === 'dark' ? (p[n]?.[600] || '#363a3f') : (p[n]?.[600] || '#d7dbdf'),
      '--border-hover': mode === 'dark' ? (p[n]?.[700] || '#43484e') : (p[n]?.[700] || '#c1c8cd'),
      '--radius-sm': r.sm,
      '--radius': r.md,
      '--radius-lg': r.lg,
      '--radius-base': r.base,
    };
  }, [brand, mode, radius]);

  return (
    <ThemeContext.Provider value={{ brand, setBrand, mode, setMode, radius, setRadius, accent, resolve, getCSSVars }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
