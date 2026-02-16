// ═══════════════════════════════════════════════════
// WA COMPONENT DOCUMENTATION DATA
// 10 shadcn/ui atoms with full specs
// ═══════════════════════════════════════════════════

export const componentDocs = {
  button: {
    name: "Button", shadcn: "Button",
    description: "Primary interactive element. Triggers bets, deposits, navigation, and all user actions across Casino, Sportsbook, and Lottery.",
    variants: [
      { name: "Primary",     token: "Action.primary",     desc: "Main CTA — Place Bet, Deposit, Confirm" },
      { name: "Secondary",   token: "Action.secondary",   desc: "Supporting — Cancel, Back, View Details" },
      { name: "Outline",     token: "Border.default",     desc: "Outlined — secondary emphasis with border" },
      { name: "Ghost",       token: "transparent",        desc: "Minimal — toolbars, navigation, inline" },
      { name: "Destructive", token: "Status.critical-fg", desc: "Danger — Delete, Cancel Withdrawal" },
      { name: "Link",        token: "Content.accent",     desc: "Text link — inline links, breadcrumbs" },
    ],
    sizes: ["sm — h-8, px-3, text-xs", "md — h-9, px-4, text-sm (default)", "lg — h-10, px-6, text-sm", "icon — h-9, w-9, square"],
    tokens: [
      "Action.primary → background fill",
      "Content.on-action → text color on primary",
      "Border.active → focus ring color",
      "Action.disabled → disabled background + text opacity",
      "State.layer-hover → hover overlay",
      "State.layer-pressed → pressed overlay"
    ],
    a11y: [
      "Minimum 44×44px touch target on mobile",
      "Visible focus ring using Border.active token (2px offset)",
      "Use aria-disabled instead of disabled attribute",
      "Icon-only buttons require aria-label",
      "Loading state: aria-busy='true' + spinner",
    ],
    dos: ["Verb-first labels: 'Place Bet', not 'Bet'", "One primary button per visible section", "Show loading spinner for async actions", "Use outline for secondary paired with primary"],
    donts: ["Don't put >1 primary per card/section", "Don't disable without tooltip explaining why", "Don't use ghost variant for primary actions", "Don't use color alone to convey state"],
  },

  icons: {
    name: "Icons", shadcn: "lucide-react",
    description: "Lucide icon library for actions, navigation, status indicators, and decorative elements across all iGaming products.",
    variants: [
      { name: "Default",    token: "Content.secondary", desc: "Standard icon color" },
      { name: "Accent",     token: "Content.accent",    desc: "Active states, links" },
      { name: "Subtle",     token: "Content.subtle",    desc: "Decorative, low emphasis" },
      { name: "On Surface", token: "Content.on-action", desc: "Icons on colored backgrounds" },
      { name: "Status",     token: "Status.*-fg",       desc: "Success, warning, critical" },
    ],
    sizes: ["xs — 12px (inline, badges)", "sm — 16px (buttons, lists)", "md — 20px (default, nav)", "lg — 24px (headers, empty states)"],
    tokens: ["Content.secondary → default", "Content.accent → active/linked", "Content.subtle → decorative", "Status.*-fg → contextual status"],
    a11y: ["Decorative icons: aria-hidden='true'", "Meaningful icons: accessible label via aria-label", "Never rely on icon color alone for meaning", "Minimum 3:1 contrast ratio for meaningful icons"],
    dos: ["Consistent size per context (16px in nav, 20px in content)", "Always pair with text labels for actions", "Use Lucide exclusively — no mixing icon sets"],
    donts: ["Don't mix icon libraries (no FontAwesome + Lucide)", "Don't use icons smaller than 12px", "Don't use color as the only differentiator"],
  },

  alert: {
    name: "Alert", shadcn: "Alert",
    description: "Inline status banners for feedback, notifications, and system messages. Bet confirmations, KYC requirements, bonus alerts.",
    variants: [
      { name: "Info",     token: "Surface.accent",    desc: "Tips, feature announcements" },
      { name: "Success",  token: "Status.success-*",  desc: "Deposit complete, bet placed" },
      { name: "Warning",  token: "Status.warning-*",  desc: "Incomplete KYC, expiring bonus" },
      { name: "Critical", token: "Status.critical-*", desc: "Failed deposit, invalid input" },
    ],
    sizes: ["compact — icon + single line", "default — icon + title + description", "expanded — icon + title + desc + action buttons"],
    tokens: ["Status.*-bg → background fill", "Status.*-fg → icon and title color", "Border.* → left accent strip", "Content.Primary → title text"],
    a11y: ["role='alert' for critical (live region)", "role='status' for info/success", "aria-live='polite' for non-urgent updates", "Always use icon + text, never color alone"],
    dos: ["Place near the relevant content/action", "Include actionable next steps in description", "Dismissible for non-critical alerts"],
    donts: ["Don't stack more than 2 alerts", "Don't use for inline field validation (use Input error)", "Don't auto-dismiss critical alerts"],
  },

  badge: {
    name: "Badge", shadcn: "Badge",
    description: "Compact status labels and category tags. Bet status (Live, Won, Lost), game categories, bonus labels, notification counts.",
    variants: [
      { name: "Default",  token: "Surface.layer-2",   desc: "Categories, tags" },
      { name: "Primary",  token: "Action.primary",    desc: "Featured, active promotions" },
      { name: "Success",  token: "Status.success-*",  desc: "Won, Verified, Active" },
      { name: "Warning",  token: "Status.warning-*",  desc: "Pending, Expiring Soon" },
      { name: "Critical", token: "Status.critical-*", desc: "Lost, Expired, Blocked" },
      { name: "Live",     token: "gradient + pulse",  desc: "Pulsing indicator for live events" },
    ],
    sizes: ["sm — h-5, text-[10px]", "md — h-6, text-xs (default)", "lg — h-7, text-sm"],
    tokens: ["Variant-specific bg/fg pairs", "Border.subtle → outline variant border", "Content.on-action → filled variant text"],
    a11y: ["Don't use badge as sole information carrier", "Icon-only badges need sr-only text", "4.5:1 contrast ratio for badge text"],
    dos: ["1-2 words maximum", "Consistent variant per status type across app", "Combine with icons when helpful"],
    donts: ["Badges are not interactive (no click handlers)", "Maximum 3 badges per card/row", "Don't use decorative badges without meaning"],
  },

  card: {
    name: "Card", shadcn: "Card",
    description: "Content container for grouping related information. Game cards, bet slips, promotion tiles, account panels, transaction items.",
    variants: [
      { name: "Default",     token: "Surface.layer-1",   desc: "Standard content grouping" },
      { name: "Elevated",    token: "Surface.layer-2",   desc: "Featured content with shadow" },
      { name: "Interactive", token: "+ State.hover",      desc: "Clickable with hover/press states" },
      { name: "Accent",      token: "Surface.accent",    desc: "Active promotions, selected items" },
      { name: "Ghost",       token: "transparent+border", desc: "Minimal for dense lists" },
    ],
    sizes: ["compact — p-3 (transaction rows)", "default — p-4 (standard cards)", "spacious — p-6 (featured content)"],
    tokens: ["Surface.layer-1 → default background", "Surface.layer-2 → elevated background", "Border.default → card border", "State.layer-hover → hover overlay", "State.layer-pressed → pressed overlay"],
    a11y: ["Interactive cards: role='button' or <a> tag", "Card groups: use list semantics <ul>/<li>", "Focus indicator using Border.active", "Maintain heading hierarchy within cards"],
    dos: ["Consistent card patterns per content area", "Use Header / Content / Footer structure", "Hover state only on interactive cards"],
    donts: ["Don't nest interactive cards inside each other", "Maximum 3 content hierarchy levels", "Don't mix elevated and ghost in same group"],
  },

  checkbox: {
    name: "Checkbox", shadcn: "Checkbox",
    description: "Binary selection control. Terms acceptance, marketing preferences, multi-select filters, bet slip options.",
    variants: [
      { name: "Default",       token: "Border.default",   desc: "Unchecked → checked transition" },
      { name: "With Label",    token: "+ Content.Primary", desc: "Standard checkbox with text label" },
      { name: "Indeterminate", token: "Action.primary",    desc: "Partial selection in parent/child groups" },
      { name: "Error",         token: "Border.critical",   desc: "Required field validation" },
    ],
    sizes: ["sm — h-4, w-4 (dense UIs)", "md — h-5, w-5 (default)", "lg — h-6, w-6 (mobile/touch)"],
    tokens: ["Border.default → unchecked border", "Action.primary → checked background", "Content.on-action → checkmark color", "Border.critical → error state border"],
    a11y: ["Always pair with visible <label>", "Space key toggles the checkbox", "Use <fieldset> + <legend> for groups", "aria-invalid + aria-describedby for errors"],
    dos: ["Positive phrasing: 'Receive updates' not 'Don't send'", "Group related checkboxes with clear group label", "Show inline validation immediately"],
    donts: ["Don't use checkbox for on/off settings (use Switch)", "Don't pre-check consent or marketing checkboxes", "Never omit visible labels"],
  },

  dialog: {
    name: "Dialog", shadcn: "Dialog",
    description: "Modal overlay for confirmations, forms, and focused tasks. Deposit confirmations, bet slip reviews, account verification flows.",
    variants: [
      { name: "Default",      token: "Surface.layer-2",   desc: "Forms, confirmations, info" },
      { name: "Alert Dialog", token: "+ Status.critical",  desc: "Irreversible destructive actions" },
      { name: "Bottom Sheet", token: "Surface.layer-1",    desc: "Mobile slide-up panel" },
    ],
    sizes: ["sm — max-w-sm (simple confirms)", "md — max-w-md (forms, default)", "lg — max-w-lg (complex content)", "full — fullscreen on mobile"],
    tokens: ["Surface.layer-2 → dialog background", "Surface.Overlay → backdrop overlay", "Border.default → dialog border", "Content.Primary → heading text"],
    a11y: ["Focus trapped within dialog", "ESC key closes dialog", "Focus returns to trigger element on close", "role='dialog' + aria-labelledby for title", "Alert dialogs: role='alertdialog'"],
    dos: ["One focused task per dialog", "Clear close action (button + ESC)", "Descriptive title explaining the action"],
    donts: ["Don't nest dialogs inside dialogs", "Don't use for non-blocking informational content", "Don't auto-close when user is typing"],
  },

  input: {
    name: "Input Field", shadcn: "Input",
    description: "Text entry control for all forms. Login credentials, deposit amounts, search, bet amounts, registration fields.",
    variants: [
      { name: "Default",   token: "Surface.layer-1",  desc: "Standard text input" },
      { name: "With Icon", token: "+ Content.subtle",  desc: "Search icon, currency symbol" },
      { name: "With Addon",token: "+ Surface.layer-2", desc: "EUR, %, .com prefix/suffix" },
      { name: "Error",     token: "Border.critical",   desc: "Validation error state" },
      { name: "Disabled",  token: "Action.disabled",   desc: "Locked/readonly state" },
    ],
    sizes: ["sm — h-8, text-xs (dense tables)", "md — h-9, text-sm (default)", "lg — h-10, text-base (prominent forms)"],
    tokens: ["Surface.layer-1 → input background", "Border.default → default border", "Border.active → focus border + ring", "Border.critical → error border", "Content.Primary → input text", "Content.subtle → placeholder text"],
    a11y: ["Associate with <label> via htmlFor/id", "Error messages via aria-describedby", "Required fields: aria-required='true'", "Use autocomplete attributes for common fields"],
    dos: ["Use correct input type (email, number, tel)", "Show format hints in helper text", "Validate on blur, not on every keystroke"],
    donts: ["Don't use placeholder as the only label", "Don't disable paste on password fields", "Don't mask deposit amounts while typing"],
  },

  switchComp: {
    name: "Switch", shadcn: "Switch",
    description: "Toggle for immediate on/off settings. Notification preferences, odds format, dark mode, feature opt-in/out.",
    variants: [
      { name: "Off",      token: "Action.neutral",  desc: "Inactive/default state" },
      { name: "On",       token: "Action.primary",  desc: "Active state with transition" },
      { name: "Disabled", token: "Action.disabled",  desc: "Locked state (on or off)" },
    ],
    sizes: ["sm — h-4, w-7 (compact)", "md — h-5, w-9 (default)", "lg — h-6, w-11 (mobile/touch)"],
    tokens: ["Action.neutral → off track", "Action.primary → on track", "Content.on-action → thumb", "Border.active → focus ring"],
    a11y: ["role='switch' + aria-checked", "Space and Enter keys toggle", "Announce state change to screen readers", "Always pair with visible label"],
    dos: ["Only for settings with immediate effect", "Label on the left, switch on the right", "Indicate what 'on' means explicitly"],
    donts: ["Don't use for form submissions (use checkbox)", "Don't require a save action after toggle", "Don't use for irreversible actions"],
  },

  modal: {
    name: "Modal (Sheet)", shadcn: "Sheet",
    description: "Full overlay or slide-in panel. Bet slip panel, game info sidebar, filter sheets, multi-step registration/deposit flows.",
    variants: [
      { name: "Side (Right)", token: "Surface.layer-1", desc: "Desktop: bet slip, filters" },
      { name: "Bottom",       token: "Surface.layer-1", desc: "Mobile: action sheets, options" },
      { name: "Full Screen",  token: "Surface.page",    desc: "Mobile multi-step flows" },
    ],
    sizes: ["sm — max-w-sm (filters)", "md — max-w-md (bet slip)", "lg — max-w-lg (complex panels)", "full — fullscreen mobile flows"],
    tokens: ["Surface.layer-1 → sheet background", "Surface.Overlay → backdrop overlay", "Border.default → sheet edge border", "shadows.xl → sheet elevation shadow"],
    a11y: ["Focus trapped within sheet", "ESC key and swipe-down to dismiss", "Scroll locked on body when open", "Announce open/close to screen readers", "Return focus to trigger on close"],
    dos: ["Bottom sheet on mobile, side sheet on desktop", "Clear close affordance (X button + gestures)", "Sticky header when content scrolls"],
    donts: ["Don't open a sheet from within a sheet", "Don't use for simple confirmations (use Dialog)", "Don't permanently block content access"],
  },
};

export const componentIds = [
  "button", "icons", "alert", "badge", "card",
  "checkbox", "dialog", "input", "switchComp", "modal"
];
