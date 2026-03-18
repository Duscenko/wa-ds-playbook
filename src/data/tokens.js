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
    color: "#12a594",
    primitives: {
      "main-dark": { 100: "#0d1514", 200: "#111c1b", 300: "#0d2d2a", 400: "#023b37", 500: "#084843", 600: "#145750", 700: "#1c6961", 800: "#207e73", 900: "#12a594", 1000: "#0eb39e", 1100: "#0bd8b6", 1200: "#adf0dd" },
      "main-dark-alpha": { 100: "rgba(0, 222, 171, 0.02)", 200: "rgba(18, 251, 230, 0.047)", 300: "rgba(0, 255, 230, 0.118)", 400: "rgba(0, 255, 233, 0.176)", 500: "rgba(0, 255, 234, 0.231)", 600: "rgba(28, 255, 232, 0.294)", 700: "rgba(46, 253, 232, 0.373)", 800: "rgba(50, 255, 231, 0.459)", 900: "rgba(19, 255, 228, 0.624)", 1000: "rgba(13, 255, 224, 0.682)", 1100: "rgba(10, 254, 213, 0.839)", 1200: "rgba(184, 255, 235, 0.937)" },
      "main-light": { 100: "#fbfefd", 200: "#f4fbf9", 300: "#e6f6f3", 400: "#d6f1eb", 500: "#c4eae1", 600: "#ade0d4", 700: "#92d1c3", 800: "#69baa9", 900: "#0bc3ad", 1000: "#09b29e", 1100: "#067a6f", 1200: "#05312e" },
      "main-light-alpha": { 100: "rgba(0, 204, 153, 0.02)", 200: "rgba(0, 170, 128, 0.055)", 300: "rgba(0, 204, 153, 0.098)", 400: "rgba(0, 199, 149, 0.149)", 500: "rgba(0, 182, 137, 0.22)", 600: "rgba(0, 161, 123, 0.314)", 700: "rgba(0, 155, 115, 0.447)", 800: "rgba(0, 149, 115, 0.678)", 900: "rgba(0, 158, 130, 0.902)", 1000: "rgba(0, 145, 119, 0.929)", 1100: "rgba(0, 109, 91, 0.969)", 1200: "rgba(0, 45, 34, 0.941)" },
      "neutral-dark": { 100: "#101211", 200: "#171918", 300: "#202221", 400: "#272a29", 500: "#2e3130", 600: "#373b39", 700: "#444947", 800: "#5b625f", 900: "#63706b", 1000: "#717d79", 1100: "#b0b4ba", 1200: "#edeef0" },
      "neutral-light": { 100: "#fcfcfd", 200: "#f8f9fa", 300: "#f1f3f5", 400: "#e9ecef", 500: "#dee2e6", 600: "#d7dbdf", 700: "#c1c8cd", 800: "#889096", 900: "#687076", 1000: "#4b5156", 1100: "#313538", 1200: "#11181c" },
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
    color: "#d91414",
    primitives: {
      "main-dark": { 100: "#170f0e", 200: "#201311", 300: "#3d120e", 400: "#540a07", 500: "#65110d", 600: "#762019", 700: "#903027", 800: "#ba3f35", 900: "#d91414", 1000: "#c80000", 1100: "#ff9081", 1200: "#ffd1c9" },
      "main-alpha": { 100: "rgba(217, 20, 20, 0.02)", 200: "rgba(217, 20, 20, 0.05)", 300: "rgba(217, 20, 20, 0.1)", 400: "rgba(217, 20, 20, 0.15)", 500: "rgba(217, 20, 20, 0.2)", 600: "rgba(217, 20, 20, 0.3)", 700: "rgba(217, 20, 20, 0.4)", 800: "rgba(217, 20, 20, 0.5)", 900: "rgba(217, 20, 20, 0.6)", 1000: "rgba(217, 20, 20, 0.75)", 1100: "rgba(217, 20, 20, 0.85)", 1200: "rgba(217, 20, 20, 0.95)" },
      "secondary-dark": { 100: "#06131b", 200: "#0b1b26", 300: "#022a40", 400: "#003756", 500: "#004569", 600: "#00547d", 700: "#096695", 800: "#096695", 900: "#047bb3", 1000: "#166d9c", 1100: "#75c4f9", 1200: "#c7eeff" },
      "secondary-alpha": { 100: "rgba(4, 123, 179, 0.02)", 200: "rgba(4, 123, 179, 0.05)", 300: "rgba(4, 123, 179, 0.1)", 400: "rgba(4, 123, 179, 0.15)", 500: "rgba(4, 123, 179, 0.2)", 600: "rgba(4, 123, 179, 0.3)", 700: "rgba(4, 123, 179, 0.4)", 800: "rgba(4, 123, 179, 0.5)", 900: "rgba(4, 123, 179, 0.6)", 1000: "rgba(4, 123, 179, 0.75)", 1100: "rgba(4, 123, 179, 0.85)", 1200: "rgba(4, 123, 179, 0.95)" },
      "neutral-dark": { 100: "#111113", 200: "#18191b", 300: "#212225", 400: "#272a2d", 500: "#2e3135", 600: "#363a3f", 700: "#43484e", 800: "#5a6169", 900: "#696e77", 1000: "#777b84", 1100: "#b0b4ba", 1200: "#edeef0" },
    },
  },
  "superbetin": {
    label: "Superbetin",
    color: "#1717c5",
    primitives: {
      "main-dark":  { 100: "#030721", 200: "#091334", 300: "#09126f", 400: "#0f0798", 500: "#140fb4", 600: "#181fc9", 700: "#1e2ae5", 800: "#252fff", 900: "#1717c5", 1000: "#1e2ae6", 1100: "#90b3ff", 1200: "#cfe1ff" },
      "main-light": { 100: "#fafaff", 200: "#f2f2ff", 300: "#e8e8ff", 400: "#d8d8ff", 500: "#c0c0ff", 600: "#a0a0f0", 700: "#8080e0", 800: "#5050d0", 900: "#1717c5", 1000: "#1010b0", 1100: "#0c0c90", 1200: "#080860" },
      "main-alpha": { 100: "rgba(23, 23, 197, 0.02)", 200: "rgba(23, 23, 197, 0.05)", 300: "rgba(23, 23, 197, 0.1)", 400: "rgba(23, 23, 197, 0.15)", 500: "rgba(23, 23, 197, 0.2)", 600: "rgba(23, 23, 197, 0.3)", 700: "rgba(23, 23, 197, 0.4)", 800: "rgba(23, 23, 197, 0.5)", 900: "rgba(23, 23, 197, 0.6)", 1000: "rgba(23, 23, 197, 0.75)", 1100: "rgba(23, 23, 197, 0.85)", 1200: "rgba(23, 23, 197, 0.95)" },
      "secondary-dark":  { 100: "#041f12", 200: "#072d1c", 300: "#0a3c25", 400: "#0d4c2e", 500: "#116040", 600: "#167550", 700: "#1c8f64", 800: "#22aa78", 900: "#66f4ae", 1000: "#3cf490", 1100: "#1ef47e", 1200: "#e6fcfe" },
      "secondary-light": { 100: "#e6fcfe", 200: "#d6fbf4", 300: "#c6faeb", 400: "#b6f9e0", 500: "#a6f8d6", 600: "#96f7cc", 700: "#86f6c2", 800: "#76f5b8", 900: "#66f4ae", 1000: "#3cf490", 1100: "#1ef47e", 1200: "#0fb45c" },
      "secondary-alpha": { 100: "rgba(80, 246, 158, 0.02)", 200: "rgba(80, 246, 158, 0.05)", 300: "rgba(80, 246, 158, 0.1)", 400: "rgba(80, 246, 158, 0.15)", 500: "rgba(80, 246, 158, 0.2)", 600: "rgba(80, 246, 158, 0.3)", 700: "rgba(80, 246, 158, 0.4)", 800: "rgba(80, 246, 158, 0.5)", 900: "rgba(80, 246, 158, 0.6)", 1000: "rgba(80, 246, 158, 0.75)", 1100: "rgba(80, 246, 158, 0.85)", 1200: "rgba(80, 246, 158, 0.95)" },
      "neutral-dark":  { 100: "#0d0d17", 200: "#13131f", 300: "#1a1a27", 400: "#20202f", 500: "#272737", 600: "#2f2f40", 700: "#3c3c4e", 800: "#50506a", 900: "#636380", 1000: "#7a7a96", 1100: "#b0b0c8", 1200: "#ededf5" },
      "neutral-light": { 100: "#f1f1f1", 200: "#e9e9e9", 300: "#e1e1e1", 400: "#d9d9d9", 500: "#cecece", 600: "#bbbbbb", 700: "#8c8c8c", 800: "#666666", 900: "#444444", 1000: "#222222", 1100: "#111111", 1200: "#050505" },
    },
  },
  "spinpokio": {
    label: "Spinpokio",
    color: "#ffba1a",
    primitives: {
      "main-dark": { 100: "#090703", 200: "#1b160e", 300: "#2d2008", 400: "#3d2700", 500: "#4b3100", 600: "#583f08", 700: "#6c511b", 800: "#896725", 900: "#ffba1a", 1000: "#f4b000", 1100: "#ffc537", 1200: "#ffe5b8" },
      "main-alpha": { 100: "rgba(255, 186, 26, 0.02)", 200: "rgba(255, 186, 26, 0.05)", 300: "rgba(255, 186, 26, 0.1)", 400: "rgba(255, 186, 26, 0.15)", 500: "rgba(255, 186, 26, 0.2)", 600: "rgba(255, 186, 26, 0.3)", 700: "rgba(255, 186, 26, 0.4)", 800: "rgba(255, 186, 26, 0.5)", 900: "rgba(255, 186, 26, 0.6)", 1000: "rgba(255, 186, 26, 0.75)", 1100: "rgba(255, 186, 26, 0.85)", 1200: "rgba(255, 186, 26, 0.95)" },
      "secondary-dark": { 100: "#170a31", 200: "#1d1238", 300: "#28154c", 400: "#311163", 500: "#3a1076", 600: "#45138a", 700: "#550fab", 800: "#830fff", 900: "#51279c", 1000: "#7c66dc", 1100: "#ba9fff", 1200: "#efe9ff" },
      "secondary-alpha": { 100: "rgba(84, 0, 239, 0.03)", 200: "rgba(106, 0, 255, 0.06)", 300: "rgba(84, 0, 251, 0.19)", 400: "rgba(98, 0, 255, 0.29)", 500: "rgba(94, 0, 255, 0.36)", 600: "rgba(95, 21, 255, 0.43)", 700: "rgba(127, 49, 253, 0.53)", 800: "rgba(131, 60, 254, 0.6)", 900: "rgba(101, 30, 255, 0.7)", 1000: "rgba(93, 0, 254, 0.8)", 1100: "rgba(136, 106, 255, 0.9)", 1200: "rgba(214, 202, 255, 0.95)" },
      "neutral-dark": { 100: "#070709", 200: "#1c1c23", 300: "#191920", 400: "#2a2a2a", 500: "#343a47", 600: "#303542", 700: "#373547", 800: "#433e54", 900: "#52427b", 1000: "#847fa3", 1100: "#b9b6c2", 1200: "#e5e4e8" },
    },
    semanticOverrides: {
      "Content.Primary": { dark: "neutral-dark.1200", light: "neutral-light.1200" },
      "Content.on-action": { dark: "neutral-dark.100", light: "neutral-dark.100" },
      "Action.primary": { dark: "main-dark.900", light: "main-light.900" },
    },
  },
  "turkbet": {
    label: "Turkbet",
    color: "#ff0000",
    primitives: {
      "main-dark": { 100: "#160b0b", 200: "#1e0c0c", 300: "#3b0e0d", 400: "#4d0a09", 500: "#5c100f", 600: "#741412", 700: "#8d1d1b", 800: "#b32321", 900: "#ff0000", 1000: "#ff2e2e", 1100: "#ff9595", 1200: "#ffeded" },
      "main-alpha": { 100: "rgba(255, 0, 0, 0.02)", 200: "rgba(255, 0, 0, 0.05)", 300: "rgba(255, 0, 0, 0.1)", 400: "rgba(255, 0, 0, 0.15)", 500: "rgba(255, 0, 0, 0.2)", 600: "rgba(255, 0, 0, 0.3)", 700: "rgba(255, 0, 0, 0.4)", 800: "rgba(255, 0, 0, 0.5)", 900: "rgba(255, 0, 0, 0.6)", 1000: "rgba(255, 0, 0, 0.75)", 1100: "rgba(255, 0, 0, 0.85)", 1200: "rgba(255, 0, 0, 0.95)" },
      "neutral-dark": { 100: "#0f0f12", 200: "#16161a", 300: "#1c1c21", 400: "#212126", 500: "#27272e", 600: "#2e2e36", 700: "#383842", 800: "#4a4a55", 900: "#60606d", 1000: "#727280", 1100: "#b0b0bc", 1200: "#eeeeef" },
    },
  },
  "betsat": {
    label: "Betsat",
    color: "#4cc2d1",
    primitives: {
      "main-dark": { 100: "#0b1a1c", 200: "#0e2225", 300: "#112e32", 400: "#143a40", 500: "#174a52", 600: "#1c6d7a", 700: "#258ca0", 800: "#34abbc", 900: "#4cc2d1", 1000: "#5ed3e2", 1100: "#a0e6ef", 1200: "#d1f4f8" },
      "main-alpha": { 100: "rgba(76, 194, 209, 0.02)", 200: "rgba(76, 194, 209, 0.05)", 300: "rgba(76, 194, 209, 0.1)", 400: "rgba(76, 194, 209, 0.15)", 500: "rgba(76, 194, 209, 0.2)", 600: "rgba(76, 194, 209, 0.3)", 700: "rgba(76, 194, 209, 0.4)", 800: "rgba(76, 194, 209, 0.5)", 900: "rgba(76, 194, 209, 0.6)", 1000: "rgba(76, 194, 209, 0.75)", 1100: "rgba(76, 194, 209, 0.85)", 1200: "rgba(76, 194, 209, 0.95)" },
      "secondary-dark": { 100: "#1a1805", 200: "#242008", 300: "#36300a", 400: "#48400e", 500: "#5a5012", 600: "#8c8100", 700: "#b3a500", 800: "#d9c800", 900: "#f6e545", 1000: "#f8eb6c", 1100: "#faf29e", 1200: "#fdfbe6" },
      "secondary-alpha": { 100: "rgba(246, 229, 69, 0.02)", 200: "rgba(246, 229, 69, 0.05)", 300: "rgba(246, 229, 69, 0.1)", 400: "rgba(246, 229, 69, 0.15)", 500: "rgba(246, 229, 69, 0.2)", 600: "rgba(246, 229, 69, 0.3)", 700: "rgba(246, 229, 69, 0.4)", 800: "rgba(246, 229, 69, 0.5)", 900: "rgba(246, 229, 69, 0.6)", 1000: "rgba(246, 229, 69, 0.75)", 1100: "rgba(246, 229, 69, 0.85)", 1200: "rgba(246, 229, 69, 0.95)" },
      "neutral-dark": { 100: "#1a1129", 200: "#25173b", 300: "#2d1b4a", 400: "#362059", 500: "#3d2566", 600: "#452973", 700: "#4d2d7d", 800: "#6b4f99", 900: "#8971b5", 1000: "#b3afbb", 1100: "#e1d7f5", 1200: "#ffffff" },
      "neutral-alpha": { 100: "rgba(77, 45, 125, 0.02)", 200: "rgba(77, 45, 125, 0.05)", 300: "rgba(77, 45, 125, 0.1)", 400: "rgba(77, 45, 125, 0.15)", 500: "rgba(77, 45, 125, 0.2)", 600: "rgba(77, 45, 125, 0.3)", 700: "rgba(77, 45, 125, 0.4)", 800: "rgba(77, 45, 125, 0.5)", 900: "rgba(77, 45, 125, 0.6)", 1000: "rgba(77, 45, 125, 0.75)", 1100: "rgba(77, 45, 125, 0.85)", 1200: "rgba(77, 45, 125, 0.95)" },
    },
  },
  "f12": {
    label: "F12",
    color: "#bef23e",
    primitives: {
      "main-dark": { 100: "#121804", 200: "#1a2206", 300: "#233108", 400: "#2d3f0a", 500: "#39510c", 600: "#7da614", 700: "#96c618", 800: "#a9e01b", 900: "#bef23e", 1000: "#ccf565", 1100: "#dcf98b", 1200: "#f3fbe2" },
      "main-alpha": { 100: "rgba(190, 242, 62, 0.02)", 200: "rgba(190, 242, 62, 0.05)", 300: "rgba(190, 242, 62, 0.1)", 400: "rgba(190, 242, 62, 0.15)", 500: "rgba(190, 242, 62, 0.2)", 600: "rgba(190, 242, 62, 0.3)", 700: "rgba(190, 242, 62, 0.4)", 800: "rgba(190, 242, 62, 0.5)", 900: "rgba(190, 242, 62, 0.6)", 1000: "rgba(190, 242, 62, 0.75)", 1100: "rgba(190, 242, 62, 0.85)", 1200: "rgba(190, 242, 62, 0.95)" },
      "neutral-dark": { 100: "#0f1112", 200: "#16181a", 300: "#1c1e20", 400: "#232529", 500: "#292c31", 600: "#31343a", 700: "#3e4246", 800: "#51565b", 900: "#63696f", 1000: "#798088", 1100: "#b1b4b9", 1200: "#eeeeef" },
    },
  },
  "spin": {
    label: "Spin",
    color: "#fdbd24",
    primitives: {
      "main-dark": { 100: "#1a1304", 200: "#242008", 300: "#36300a", 400: "#48400e", 500: "#5a5012", 600: "#8c6914", 700: "#b3861a", 800: "#d9a320", 900: "#fdbd24", 1000: "#fecb4f", 1100: "#feda7a", 1200: "#fff9eb" },
      "main-alpha": { 100: "rgba(253, 189, 36, 0.02)", 200: "rgba(253, 189, 36, 0.05)", 300: "rgba(253, 189, 36, 0.1)", 400: "rgba(253, 189, 36, 0.15)", 500: "rgba(253, 189, 36, 0.2)", 600: "rgba(253, 189, 36, 0.3)", 700: "rgba(253, 189, 36, 0.4)", 800: "rgba(253, 189, 36, 0.5)", 900: "rgba(253, 189, 36, 0.6)", 1000: "rgba(253, 189, 36, 0.75)", 1100: "rgba(253, 189, 36, 0.85)", 1200: "rgba(253, 189, 36, 0.95)" },
      "secondary-dark": { 100: "#11061f", 200: "#190a2e", 300: "#220e3d", 400: "#2c124c", 500: "#37165c", 600: "#42167a", 700: "#4f1b94", 800: "#571da1", 900: "#5e1fad", 1000: "#7a3ec2", 1100: "#a787d6", 1200: "#f4ebff" },
      "secondary-alpha": { 100: "rgba(94, 31, 173, 0.02)", 200: "rgba(94, 31, 173, 0.05)", 300: "rgba(94, 31, 173, 0.1)", 400: "rgba(94, 31, 173, 0.15)", 500: "rgba(94, 31, 173, 0.2)", 600: "rgba(94, 31, 173, 0.3)", 700: "rgba(94, 31, 173, 0.4)", 800: "rgba(94, 31, 173, 0.5)", 900: "rgba(94, 31, 173, 0.6)", 1000: "rgba(94, 31, 173, 0.75)", 1100: "rgba(94, 31, 173, 0.85)", 1200: "rgba(94, 31, 173, 0.95)" },
      "neutral-dark": { 100: "#0a021a", 200: "#11032d", 300: "#1b0545", 400: "#25075e", 500: "#2f0976", 600: "#390b8e", 700: "#452e76", 800: "#520088", 900: "#60459b", 1000: "#7b5fba", 1100: "#a687d6", 1200: "#ffffff" },
    },
  },
  "livescore": {
    label: "Livescore",
    color: "#ff7f32",
    primitives: {
      "main-dark": { 100: "#1a0d05", 200: "#2d1609", 300: "#45220d", 400: "#663214", 500: "#8a441a", 600: "#b35822", 700: "#d66a29", 800: "#f5792f", 900: "#ff7f32", 1000: "#ff914d", 1100: "#ffb380", 1200: "#ffedd6" },
      "main-alpha": { 100: "rgba(255, 127, 50, 0.02)", 200: "rgba(255, 127, 50, 0.05)", 300: "rgba(255, 127, 50, 0.1)", 400: "rgba(255, 127, 50, 0.15)", 500: "rgba(255, 127, 50, 0.2)", 600: "rgba(255, 127, 50, 0.3)", 700: "rgba(255, 127, 50, 0.4)", 800: "rgba(255, 127, 50, 0.5)", 900: "rgba(255, 127, 50, 0.6)", 1000: "rgba(255, 127, 50, 0.75)", 1100: "rgba(255, 127, 50, 0.85)", 1200: "rgba(255, 127, 50, 0.95)" },
      "neutral-dark": { 100: "#121212", 200: "#181818", 300: "#1c1c1c", 400: "#242424", 500: "#2e2e2e", 600: "#383838", 700: "#4a4a4a", 800: "#616161", 900: "#8a8a8a", 1000: "#b3b3b3", 1100: "#d6d6d6", 1200: "#eeeeee" },
    },
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
