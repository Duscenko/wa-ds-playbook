export const semanticRoles = {
    Content: {
        groupDescription: "Text and icon hierarchy.",
        tokens: [
            { name: "Primary", role: "Main text color for headings and body content." },
            { name: "on-action", role: "Text color used on top of primary action buttons." },
            { name: "secondary", role: "Secondary text for subtitles and supporting information." },
            { name: "subtle", role: "Placeholder text and disabled states." },
            { name: "inverse", role: "Text color for use on dark/inverse backgrounds." },
            { name: "accent", role: "Highlighted text for links or emphasized data." }
        ]
    },
    Action: {
        groupDescription: "Interactive elements and controls.",
        tokens: [
            { name: "primary", role: "Primary call-to-action buttons and links." },
            { name: "neutral", role: "Secondary buttons and neutral interactive elements." },
            { name: "secondary", role: "Tertiary actions or outlined buttons." },
            { name: "disabled", role: "Non-interactive state for actions." }
        ]
    },
    Surface: {
        groupDescription: "Container backgrounds and elevation.",
        tokens: [
            { name: "page", role: "Default application background color." },
            { name: "layer-1", role: "Primary container background (cards, panels)." },
            { name: "layer-2", role: "Secondary container background (modals, dropdowns)." },
            { name: "inverse", role: "High-contrast background for tooltips or toasts." },
            { name: "accent", role: "Highlighted surface for active states or focus areas." },
            { name: "Overlay", role: "Semi-transparent backdrop for modals." }
        ]
    },
    Status: {
        groupDescription: "System feedback indicators.",
        tokens: [
            { name: "critical-bg", role: "Background for error states and destructive actions." },
            { name: "critical-fg", role: "Text/Icon color for error states." },
            { name: "warning-bg", role: "Background for warning alerts." },
            { name: "warning-fg", role: "Text/Icon color for warning alerts." },
            { name: "success-bg", role: "Background for success confirmations." },
            { name: "success-fg", role: "Text/Icon color for success confirmations." }
        ]
    },
    Border: {
        groupDescription: "Dividers and boundaries.",
        tokens: [
            { name: "default", role: "Default border for cards and inputs." },
            { name: "subtle", role: "Low-contrast dividers." },
            { name: "active", role: "Border color for active or selected states." },
            { name: "accent", role: "Highlighted border for focused elements." },
            { name: "focus", role: "Focus ring color for accessibility." },
            { name: "critical", role: "Border color for error states." },
            { name: "warning", role: "Border color for warning states." },
            { name: "success", role: "Border color for success states." }
        ]
    }
};
