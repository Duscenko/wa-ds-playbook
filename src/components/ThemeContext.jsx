import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { brands, setActiveBrand, utility, resolveToken } from '../data/tokens';

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
    const brandData = brands[brand] || brands['wa-default'];
    const m = mode === 'dark' ? 'main-dark' : 'main-light';
    const n = mode === 'dark' ? 'neutral-dark' : 'neutral-light';

    const utilityVars = {};
    // Families to expose as variables
    ['overlay-black', 'overlay-white', 'red', 'green', 'yellow', 'blue'].forEach(fam => {
      const modeSuffix = mode === 'dark' ? '-dark' : '-light';
      const fullFamily = fam.includes('overlay') ? fam : `${fam}${modeSuffix}`;

      // We'll iterate steps 100-1200
      [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].forEach(step => {
        const val = resolveToken(`${fullFamily}.${step}`, brand, mode);
        if (val !== '#555') {
          utilityVars[`--${fullFamily}-${step}`] = val;
        }
      });
    });

    const radiusMap = {
      sharp: { sm: '0px', md: '0px', lg: '0px', base: '0px' },
      default: { sm: '4px', md: '6px', lg: '8px', base: '10px' },
      round: { sm: '8px', md: '12px', lg: '16px', base: '20px' },
      full: { sm: '9999px', md: '9999px', lg: '9999px', base: '9999px' },
    };
    const r = radiusMap[radius] || radiusMap.default;

    return {
      ...utilityVars,
      '--accent': resolveToken(`${m}.900`, brand, mode),
      '--accent-hover': resolveToken(`${m}.1000`, brand, mode),
      '--accent-pressed': resolveToken(`${m}.800`, brand, mode),
      '--accent-subtle': resolveToken(`${m}.300`, brand, mode),
      '--accent-muted': resolveToken(`${m}.1200`, brand, mode),
      '--bg': resolveToken(`${n}.100`, brand, mode),
      '--bg1': resolveToken(`${n}.200`, brand, mode),
      '--bg2': resolveToken(`${n}.300`, brand, mode),
      '--bg3': resolveToken(`${n}.400`, brand, mode),
      '--text': resolveToken(`${n}.1200`, brand, mode),
      '--text2': resolveToken(`${n}.1100`, brand, mode),
      '--text3': resolveToken(`${n}.1000`, brand, mode),
      '--border': resolveToken(`${n}.600`, brand, mode),
      '--border-hover': resolveToken(`${n}.700`, brand, mode),
      '--radius-sm': r.sm,
      '--radius': r.md,
      '--radius-lg': r.lg,
      '--radius-base': r.base,
    };
  }, [brand, mode, radius]);

  const value = useMemo(() => ({
    brand, setBrand,
    mode, setMode,
    radius, setRadius,
    accent, getCSSVars,
    resolveToken,
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
