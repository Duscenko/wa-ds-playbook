// ═══════════════════════════════════════════════════
// WA DESIGN SYSTEM — TOKEN DATA  (Multi-brand)
// Source: Figma Variables
// ═══════════════════════════════════════════════════

// ─── BRAND PRIMITIVES ────────────────────────────

export const brands = {
  "wa-default": {
    label: "WA Default",
    color: "#0090ff",
    primitives: {
      "main-dark": { 100: "#0d1520", 200: "#111927", 300: "#0d2847", 400: "#003362", 500: "#004074", 600: "#104d87", 700: "#205d9e", 800: "#2870bd", 900: "#0090ff", 1000: "#3b9eff", 1100: "#70b8ff", 1200: "#c2e6ff" },
      "main-light": { 100: "#fbfdff", 200: "#f4faff", 300: "#e6f4fe", 400: "#d5efff", 500: "#c2e5ff", 600: "#acd8fc", 700: "#8ec8f6", 800: "#5eb1ef", 900: "#0090ff", 1000: "#0588f0", 1100: "#0d74ce", 1200: "#113264" },
      "neutral-dark": { 100: "#111113", 200: "#18191b", 300: "#212225", 400: "#272a2d", 500: "#2e3135", 600: "#363a3f", 700: "#43484e", 800: "#5a6169", 900: "#696e77", 1000: "#777b84", 1100: "#b0b4ba", 1200: "#edeef0" },
      "neutral-light": { 100: "#fcfcfd", 200: "#f8f9fa", 300: "#f1f3f5", 400: "#e9ecef", 500: "#dee2e6", 600: "#d7dbdf", 700: "#c1c8cd", 800: "#889096", 900: "#687076", 1000: "#4b5156", 1100: "#313538", 1200: "#11181c" },
    },
  },
  "belloa": {
    label: "Belloa",
    color: "#12A594",
    primitives: {
      "main-dark": { 100: "#0D1514", 200: "#111C1B", 300: "#0D2D2A", 400: "#023B37", 500: "#084843", 600: "#145750", 700: "#1C6961", 800: "#207E73", 900: "#12A594", 1000: "#0EB39E", 1100: "#0BD8B6", 1200: "#ADF0DD" },
      "main-light": { 100: "#FBFEFD", 200: "#F4FBF9", 300: "#E6F6F3", 400: "#D6F1EB", 500: "#C4EAE1", 600: "#ADE0D4", 700: "#92D1C3", 800: "#69BAA9", 900: "#0BC3AD", 1000: "#09B29E", 1100: "#067A6F", 1200: "#05312E" },
      "neutral-dark": { 100: "#101211", 200: "#171918", 300: "#202221", 400: "#272A29", 500: "#2E3130", 600: "#373B39", 700: "#444947", 800: "#5B625F", 900: "#63706B", 1000: "#717D79", 1100: "#B0B4BA", 1200: "#EDEEF0" },
      "neutral-light": { 100: "#FCFCFD", 200: "#F8F9FA", 300: "#F1F3F5", 400: "#E9ECEF", 500: "#DEE2E6", 600: "#D7DBDF", 700: "#C1C8CD", 800: "#889096", 900: "#687076", 1000: "#4B5156", 1100: "#313538", 1200: "#11181C" },
    },
  },
  "pickem": {
    label: "Pick'em",
    color: "#a242f5",
    primitives: {
      "main-dark": { 100: "#150e1d", 200: "#1d1329", 300: "#2f1747", 400: "#3d195f", 500: "#48206e", 600: "#7410c5", 700: "#7026d1", 800: "#8848c6", 900: "#a242f5", 1000: "#a64eed", 1100: "#d09cff", 1200: "#f8f0ff" },
      "main-light": { 100: "#fdfdfd", 200: "#fbfafc", 300: "#f7f4fa", 400: "#f2ebf9", 500: "#ecdef8", 600: "#e2c9f7", 700: "#d3abf6", 800: "#bc7af4", 900: "#a242f5", 1000: "#962af3", 1100: "#8317e1", 1200: "#2f1546" },
      "neutral-dark": { 100: "#1c191f", 200: "#2b272c", 300: "#332f35", 400: "#2e2a2f", 500: "#332f35", 600: "#3a363c", 700: "#423e45", 800: "#4d4951", 900: "#8a8892", 1000: "#9795a0", 1100: "#eeeef0", 1200: "#eeeef0" },
      "neutral-light": { 100: "#fdfcfd", 200: "#f9f8f9", 300: "#f4f2f4", 400: "#efecef", 500: "#e9e5e9", 600: "#e1dde1", 700: "#d8d2d9", 800: "#c1b8c2", 900: "#8e8492", 1000: "#847a88", 1100: "#766c7a", 1200: "#211029" },
    },
    utilityOverrides: {
      // RED: Using Radix Red values from your JSON
      "red-dark": { 100: "#191111", 200: "#201314", 300: "#3B1219", 400: "#500F1C", 500: "#611623", 600: "#72232D", 700: "#8C333A", 800: "#B54548", 900: "#E5484D", 1000: "#EC5D5E", 1100: "#FF9592", 1200: "#FFD1D9" },
      "red-light": { 100: "#fffcfc", 200: "#fff7f7", 300: "#feebec", 400: "#ffdbdc", 500: "#ffcdce", 600: "#fdbdbe", 700: "#f4a9aa", 800: "#eb8e90", 900: "#e5484d", 1000: "#dc3e42", 1100: "#ce2c31", 1200: "#641723" },

      // GREEN (Mapped to Grass/Lime from your JSON): Fixed for Table View
      "green-dark": { 100: "#11130C", 200: "#151A10", 300: "#1F2917", 400: "#29371D", 500: "#334423", 600: "#3D522A", 700: "#3D522A", 800: "#577538", 900: "#BDEE63", 1000: "#D4FF70", 1100: "#BDE56C", 1200: "#E3F7BA" },
      "green-light": { 100: "#fdfefb", 200: "#f8faf3", 300: "#f0f4e1", 400: "#e6edd1", 500: "#d8e5bc", 600: "#c6d9a0", 700: "#afc97e", 800: "#91b54c", 900: "#bdee63", 1000: "#b1e563", 1100: "#3b6500", 1200: "#1b3b28" },

      // YELLOW: Using Amber values from your JSON
      "yellow-dark": { 100: "#16120C", 200: "#1D180F", 300: "#302008", 400: "#3F2700", 500: "#4D3000", 600: "#5C3D05", 700: "#714F19", 800: "#8F6424", 900: "#FFC53D", 1000: "#FFD60A", 1100: "#FFCA16", 1200: "#FFE7B3" },
      "yellow-light": { 100: "#fefdfb", 200: "#fef9ed", 300: "#fff4d5", 400: "#ffecbc", 500: "#ffe3a2", 600: "#ffd386", 700: "#f3ba63", 800: "#ee9d2b", 900: "#ffc53d", 1000: "#ffb224", 1100: "#ad5700", 1200: "#4e2009" },

      // OVERLAYS: Values from your JSON
      "overlay-black": { 100: "rgba(0,0,0,0.02)", 200: "rgba(0,0,0,0.05)", 300: "rgba(0,0,0,0.10)", 400: "rgba(0,0,0,0.15)", 500: "rgba(0,0,0,0.20)", 600: "rgba(0,0,0,0.30)", 700: "rgba(0,0,0,0.40)", 800: "rgba(0,0,0,0.50)", 900: "rgba(0,0,0,0.60)", 1000: "rgba(0,0,0,0.75)", 1100: "rgba(0,0,0,0.85)", 1200: "rgba(0,0,0,0.95)" },
      "overlay-white": { 100: "rgba(249,250,251,0.03)", 200: "rgba(249,250,251,0.05)", 300: "rgba(249,250,251,0.07)", 400: "rgba(249,250,251,0.11)", 500: "rgba(249,250,251,0.14)", 600: "rgba(249,250,251,0.18)", 700: "rgba(249,250,251,0.24)", 800: "rgba(249,250,251,0.31)", 900: "rgba(249,250,251,0.44)", 1000: "rgba(249,250,251,0.50)", 1100: "rgba(249,250,251,0.65)", 1200: "rgba(249,250,251,0.92)" }
    },
    semanticOverrides: {
      "Action.primary": { dark: "main-dark.700", light: "main-light.900" },
      "Action.secondary": { dark: "main-dark.500", light: "main-light.700" },
      "Surface.accent": { dark: "main-dark.300", light: "main-light.300" }
    }
  },
  "manat": {
    label: "Manat",
    color: "#D91414",
    primitives: {
      "main-dark": { 100: "#170F0E", 200: "#201311", 300: "#3D120E", 400: "#540A07", 500: "#65110D", 600: "#762019", 700: "#903027", 800: "#BA3F35", 900: "#D91414", 1000: "#C80000", 1100: "#FF9081", 1200: "#FFD1C9" },
      "main-light": { 100: "#FFF9F8", 200: "#FEF1F0", 300: "#F9E3E1", 400: "#F3D6D2", 500: "#EBB9B2", 600: "#E19D94", 700: "#D67D72", 800: "#C55B4E", 900: "#D91414", 1000: "#C80000", 1100: "#822017", 1200: "#34120F" },
      "neutral-dark": { 100: "#111113", 200: "#18191B", 300: "#212225", 400: "#272A2D", 500: "#2E3135", 600: "#363A3F", 700: "#43484E", 800: "#5A6169", 900: "#696E77", 1000: "#777B84", 1100: "#B0B4BA", 1200: "#EDEEF0" },
      "neutral-light": { 100: "#FBFCFD", 200: "#F8F9FA", 300: "#F1F3F5", 400: "#E9ECEF", 500: "#DEE2E6", 600: "#CED4DA", 700: "#ADB5BD", 800: "#868E96", 900: "#495057", 1000: "#343A40", 1100: "#212529", 1200: "#111113" },
    },
    utilityOverrides: {
      "blue-dark": { 100: "#06131B", 200: "#0B1B26", 300: "#022A40", 400: "#003756", 500: "#004569", 600: "#00547D", 700: "#096695", 800: "#096695", 900: "#047BB3", 1000: "#166D9C", 1100: "#75C4F9", 1200: "#C7EEFF" },
      "blue-light": { 100: "#F0F9FF", 200: "#E0F2FE", 300: "#B9E6FE", 400: "#7DD3FC", 500: "#38BDF8", 600: "#0EA5E9", 700: "#0284C7", 800: "#0369A1", 900: "#047BB3", 1000: "#166D9C", 1100: "#0B4A6B", 1200: "#061D29" },
    }
  },
  "superbetin": {
    label: "Superbetin",
    color: "#1717C5",
    primitives: {
      "main-dark": { 100: "#030721", 200: "#091334", 300: "#09126f", 400: "#0f0798", 500: "#140fb4", 600: "#181fc9", 700: "#1e2ae5", 800: "#252fff", 900: "#1717c5", 1000: "#1e2ae6", 1100: "#90b3ff", 1200: "#cfe1ff" },
      "main-light": { 100: "#edeeef", 200: "#e6e9f0", 300: "#dae1f0", 400: "#cbd7f4", 500: "#b9cbf7", 600: "#a4bdf9", 700: "#8ca9f1", 800: "#6c8eea", 900: "#1717c5", 1000: "#2035da", 1100: "#213cc9", 1200: "#192b67" },
      "neutral-dark": { 100: "#111111", 200: "#191919", 300: "#222222", 400: "#2a2a2a", 500: "#313131", 600: "#3a3a3a", 700: "#484848", 800: "#606060", 900: "#727272", 1000: "#a0a0a0", 1100: "#d1d1d1", 1200: "#f1f1f1" },
      "neutral-light": { 100: "#f1f1f1", 200: "#e9e9e9", 300: "#e1e1e1", 400: "#d9d9d9", 500: "#cecece", 600: "#bbbbbb", 700: "#8c8c8c", 800: "#666666", 900: "#444444", 1000: "#222222", 1100: "#111111", 1200: "#050505" },
    },
    utilityOverrides: {
      "violet-light": { 100: "#edeeef", 200: "#e6e9f0", 300: "#dae1f0", 400: "#cbd7f4", 500: "#b9cbf7", 600: "#a4bdf9", 700: "#8ca9f1", 800: "#6c8eea", 900: "#1717c5", 1000: "#2035da", 1100: "#213cc9", 1200: "#192b67" },
      "violet-dark": { 100: "#030721", 200: "#091334", 300: "#09126f", 400: "#0f0798", 500: "#140fb4", 600: "#181fc9", 700: "#1e2ae5", 800: "#252fff", 900: "#1717c5", 1000: "#1e2ae6", 1100: "#90b3ff", 1200: "#cfe1ff" }
    }
  },
  spinpokio: {
    label: "Spinpokio",
    color: "#ffba1a", // Updated to the new Yellow-9
    primitives: {
      "main-dark": {
        "100": "#090703",
        "200": "#1b160e",
        "300": "#2d2008",
        "400": "#3d2700",
        "500": "#4b3100",
        "600": "#583f08",
        "700": "#6c511b",
        "800": "#896725",
        "900": "#ffba1a",
        "1000": "#f4b000",
        "1100": "#ffc537",
        "1200": "#ffe5b8"
      },
      "main-light": {
        // Keeping previous light scale for consistency unless you provide new light CSS
        "100": "#fdfdf9",
        "200": "#f8f6e6",
        "300": "#fff9db",
        "400": "#fff4bd",
        "500": "#fdf0a4",
        "600": "#f2e394",
        "700": "#e7d073",
        "800": "#dab82b",
        "900": "#ffe629",
        "1000": "#f5d90a",
        "1100": "#916a00",
        "1200": "#342400"
      },
      // Keep secondary and neutral as they are
      "secondary-light": { "100": "#fdfcfe", "200": "#f9f8ff", "300": "#f5f2ff", "400": "#ede9fe", "500": "#e4defc", "600": "#d9d0ff", "700": "#c7b9ff", "800": "#b39eff", "900": "#6e56cf", "1000": "#644fc1", "1100": "#5b49ac", "1200": "#20134b" },
      "secondary-dark": { "100": "#17151f", "200": "#1c1926", "300": "#2b253d", "400": "#332a4d", "500": "#3b3259", "600": "#473d69", "700": "#5a4f83", "800": "#796eb5", "900": "#6e56cf", "1000": "#7c66dc", "1100": "#9e8cfc", "1200": "#f1eeff" },
      "neutral-dark": { "100": "#070709", "200": "#1C1C23", "300": "#232323", "400": "#2A2A2A", "500": "#343A47", "600": "#303542", "700": "#373547", "800": "#433E54", "900": "#52427B", "1000": "#534A89", "1100": "#6658A3", "1200": "#B9B6C2" },
      "neutral-light": { "100": "#FFFFFF", "200": "#F4F4F4", "300": "#E0E0E0", "400": "#D1D1D1", "500": "#B9B6C2", "600": "#8D8D8D", "700": "#6F6F6F", "800": "#525252", "900": "#393939", "1000": "#262626", "1100": "#161616", "1200": "#000000" }
    },
    semanticOverrides: {
      // Main Text: Black in Light mode, White in Dark mode
      "Content.Primary": {
        "dark": "neutral-dark.1200",
        "light": "neutral-light.1200"
      },
      // Button Text: Always darkest black for contrast on Yellow
      "Content.on-action": {
        "dark": "neutral-dark.100",
        "light": "neutral-dark.100"
      },
      // Action Background: Brand Yellow
      "Action.primary": {
        "dark": "main-dark.900",
        "light": "main-light.900"
      }
    }
  },
};

// ─── ACTIVE BRAND STATE ──────────────────────────

let activeBrand = "wa-default";

export function setActiveBrand(b) { activeBrand = b; }
export function getActiveBrand() { return activeBrand; }
export function getPrimitives() { return brands[activeBrand]?.primitives || brands["wa-default"].primitives; }

// ─── UTILITY (shared across ALL brands) ──────────

export const utility = {
  "red-dark": { 100: "#191111", 200: "#201314", 300: "#3b1219", 400: "#500f1c", 500: "#611623", 600: "#72232d", 700: "#8c333a", 800: "#b54548", 900: "#e5484d", 1000: "#ec5d5e", 1100: "#ff9592", 1200: "#ffd1d9" },
  "red-light": { 100: "#fffcfc", 200: "#fff7f7", 300: "#feebec", 400: "#ffdbdc", 500: "#ffcdce", 600: "#fdbdbe", 700: "#f4a9aa", 800: "#eb8e90", 900: "#e5484d", 1000: "#dc3e42", 1100: "#ce2c31", 1200: "#641723" },
  "green-dark": { 100: "#0e1512", 200: "#121b17", 300: "#132d21", 400: "#113b29", 500: "#174933", 600: "#20573e", 700: "#28684a", 800: "#2f7c57", 900: "#30a46c", 1000: "#33b074", 1100: "#3dd68c", 1200: "#b1f1cb" },
  "green-light": { 100: "#fbfefc", 200: "#f4fbf6", 300: "#e6f6eb", 400: "#d6f1df", 500: "#c4e8d1", 600: "#adddc0", 700: "#8eceaa", 800: "#5bb98b", 900: "#30a46c", 1000: "#2b9a66", 1100: "#218358", 1200: "#193b2d" },
  "yellow-dark": { 100: "#14120b", 200: "#1b180f", 300: "#2d2305", 400: "#362b00", 500: "#433500", 600: "#524202", 700: "#665417", 800: "#836a21", 900: "#ffe629", 1000: "#ffff57", 1100: "#f5e147", 1200: "#f6eeb4" },
  "yellow-light": { 100: "#fdfdf9", 200: "#fefce9", 300: "#fffab8", 400: "#fff394", 500: "#ffe770", 600: "#f3d768", 700: "#e4c767", 800: "#d5ae39", 900: "#ffe629", 1000: "#ffdc00", 1100: "#9e6c00", 1200: "#473b1f" },
  "overlay-black": { 100: "rgba(0,0,0,0.01)", 200: "rgba(0,0,0,0.03)", 300: "rgba(0,0,0,0.05)", 400: "rgba(0,0,0,0.07)", 500: "rgba(0,0,0,0.09)", 600: "rgba(0,0,0,0.11)", 700: "rgba(0,0,0,0.14)", 800: "rgba(0,0,0,0.22)", 900: "rgba(0,0,0,0.44)", 1000: "rgba(0,0,0,0.66)" },
  "overlay-white": { 100: "rgba(255,255,255,0.01)", 200: "rgba(255,255,255,0.03)", 300: "rgba(255,255,255,0.05)", 400: "rgba(255,255,255,0.07)", 500: "rgba(255,255,255,0.09)", 600: "rgba(255,255,255,0.11)", 700: "rgba(255,255,255,0.14)", 800: "rgba(255,255,255,0.22)", 900: "rgba(255,255,255,0.44)", 1000: "rgba(255,255,255,0.66)" },
};

// ─── SEMANTIC ────────────────────────────────────

export const semantic = {
  Content: {
    Primary: { dark: "neutral-dark.1200", light: "neutral-light.1200" },
    "on-action": { dark: "neutral-dark.1200", light: "neutral-light.100" },
    secondary: { dark: "neutral-dark.1100", light: "neutral-light.1100" },
    subtle: { dark: "neutral-dark.1000", light: "neutral-light.1000" },
    inverse: { dark: "neutral-dark.100", light: "neutral-light.100" },
    accent: { dark: "main-dark.900", light: "main-light.900" },
  },
  Action: {
    primary: { dark: "main-dark.600", light: "main-light.900" },
    neutral: { dark: "neutral-dark.200", light: "neutral-light.400" },
    secondary: { dark: "neutral-dark.1200", light: "neutral-light.600" },
    disabled: { dark: "overlay-white.300", light: "neutral-light.400" },
  },
  Surface: {
    page: { dark: "neutral-dark.100", light: "neutral-light.100" },
    "layer-1": { dark: "neutral-dark.200", light: "neutral-light.200" },
    "layer-2": { dark: "neutral-dark.400", light: "neutral-light.400" },
    accent: { dark: "main-dark.300", light: "main-light.1100" },
    inverse: { dark: "neutral-dark.1100", light: "neutral-light.1200" },
    Overlay: { dark: "overlay-black.1000", light: "overlay-black.1000" },
  },
  Status: {
    "critical-bg": { dark: "red-dark.400", light: "red-light.1100" },
    "critical-fg": { dark: "red-dark.1000", light: "red-light.1000" },
    "warning-fg": { dark: "yellow-dark.1000", light: "yellow-light.800" },
    "warning-bg": { dark: "yellow-dark.600", light: "yellow-light.1000" },
    "success-fg": { dark: "green-dark.1000", light: "green-dark.900" },
    "success-bg": { dark: "green-dark.600", light: "green-light.1100" },
  },
  Border: {
    default: { dark: "neutral-dark.600", light: "neutral-light.600" },
    accent: { dark: "main-dark.700", light: "main-dark.1000" },
    subtle: { dark: "overlay-white.400", light: "neutral-light.400" },
    active: { dark: "main-dark.900", light: "main-light.900" },
    critical: { dark: "red-dark.800", light: "red-light.1000" },
    warning: { dark: "yellow-dark.800", light: "yellow-light.800" },
    success: { dark: "green-dark.800", light: "green-light.900" },
  },
};

// ─── RESOLVE TOKEN (brand-aware) ─────────────────

export function resolveToken(tokenPath, brand, mode) {
  const brandData = brands[brand] || brands["wa-default"];

  // 1. Check for Semantic Overrides in the brand
  if (brandData.semanticOverrides?.[tokenPath]) {
    const override = brandData.semanticOverrides[tokenPath][mode];
    return resolvePrimitive(override, brandData, mode);
  }

  // 2. Resolve from global Semantic mapping
  const [category, name] = tokenPath.split('.');
  const path = semantic[category]?.[name]?.[mode];

  if (path) {
    return resolvePrimitive(path, brandData, mode);
  }

  // 3. Fallback: Check if it's a direct Primitive/Utility link (e.g., "main-dark.900")
  return resolvePrimitive(tokenPath, brandData, mode);
}

function resolvePrimitive(path, brandData, mode) {
  if (!path) return "#000000";
  if (path.startsWith("#") || path.startsWith("rgba")) return path;

  const [group, scale] = path.split('.');

  // Look in brand primitives first, then global utilities
  return brandData.primitives?.[group]?.[scale] ||
    brandData.utilityOverrides?.[group]?.[scale] ||
    utility[group]?.[scale] ||
    "#000000";
}

// ─── FOUNDATIONS DATA ────────────────────────────

export const spacing = [
  { token: "0x", ref: "0", value: "0px" },
  { token: "3xs", ref: "0.5", value: "2px" },
  { token: "2xs", ref: "1", value: "4px" },
  { token: "xs", ref: "2", value: "8px" },
  { token: "sm", ref: "3", value: "12px" },
  { token: "md", ref: "4", value: "16px" },
  { token: "lg", ref: "5", value: "20px" },
  { token: "xl", ref: "6", value: "24px" },
  { token: "2xl", ref: "8", value: "32px" },
  { token: "3xl", ref: "10", value: "40px" },
  { token: "4xl", ref: "12", value: "48px" },
  { token: "5xl", ref: "16", value: "64px" },
];

export const radii = [
  { token: "sharp", value: "0px" },
  { token: "xs", value: "2px" },
  { token: "sm", value: "4px" },
  { token: "md", value: "6px" },
  { token: "lg", value: "8px" },
  { token: "base", value: "10px" },
  { token: "xl", value: "12px" },
  { token: "2xl", value: "16px" },
  { token: "3xl", value: "24px" },
  { token: "full", value: "9999px" },
];

export const typography = [
  {
    token: "heading-01",
    role: "Main page titles and marketing feature headers.",
    spec: "48px / 52px",
    weight: "SemiBold (600)",
    sample: "The quick brown fox"
  },
  {
    token: "heading-02",
    role: "Section headers and modal titles.",
    spec: "30px / 32px",
    weight: "SemiBold (600)",
    sample: "The quick brown fox"
  },
  {
    token: "heading-03",
    role: "Card titles and subsection headers.",
    spec: "24px / 28.8px",
    weight: "SemiBold (600)",
    sample: "The quick brown fox"
  },
  {
    token: "heading-04",
    role: "Labels for heavy UI elements or small titles.",
    spec: "20px / 24px",
    weight: "SemiBold (600)",
    sample: "The quick brown fox"
  },
  {
    token: "paragraph-lg",
    role: "Lead paragraphs and introductory text.",
    spec: "18px / 22px",
    weight: "Regular (400) / Medium (500)",
    sample: "The quick brown fox jumps over the lazy dog."
  },
  {
    token: "paragraph-md",
    role: "Default body copy for most components.",
    spec: "16px / 20px",
    weight: "Regular (400) / Medium (500)",
    sample: "The quick brown fox jumps over the lazy dog."
  },
  {
    token: "paragraph-sm",
    role: "Secondary text, captions, and helper messages.",
    spec: "14px / 18px",
    weight: "Regular (400) / Medium (500)",
    sample: "The quick brown fox jumps over the lazy dog."
  },
  {
    token: "paragraph-xs",
    role: "Legal text, timestamps, and metadata.",
    spec: "12px / 14px",
    weight: "Regular (400) / Medium (500)",
    sample: "The quick brown fox jumps over the lazy dog."
  },
  {
    token: "monospace",
    role: "Code snippets, API keys, and financial data alignment.",
    spec: "16px / 24px",
    weight: "Regular (400)",
    family: "Monospace",
    sample: "r8s9-f2k3-9d2s"
  }
];

export const shadows = [
  { token: "2xs", value: "0 1px 0 rgba(0,0,0,.03)" },
  { token: "xs", value: "0 1px 2px rgba(0,0,0,.04)" },
  { token: "sm", value: "0 2px 4px rgba(0,0,0,.05)" },
  { token: "md", value: "0 4px 8px -1px rgba(0,0,0,.07)" },
  { token: "lg", value: "0 10px 15px -3px rgba(0,0,0,.1)" },
  { token: "xl", value: "0 20px 25px -5px rgba(0,0,0,.12)" },
  { token: "2xl", value: "0 25px 50px -12px rgba(0,0,0,.18)" },
];

export const chartColors = {
  categorical: ["#f54a00", "#009689", "#104e64", "#ffb900", "#fe9a00"],
  sentiment: { positive: "#009689", negative: "#f54a00" },
};
