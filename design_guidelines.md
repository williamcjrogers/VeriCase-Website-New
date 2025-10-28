# VeriCase Landing Page - Design System Guidelines

## Project Overview
**Platform**: Legal-Tech/Digital Forensics B2B SaaS  
**Target Audience**: Law firms, arbitrators, claims consultants, contractors, in-house counsel  
**Design Personality**: Trust, authority, precision, sophistication, minimalist, professional  
**Tech Stack**: FastAPI (Python) + React + MongoDB + Tailwind CSS + Shadcn UI

---

## GRADIENT RESTRICTION RULE

**CRITICAL CONSTRAINTS:**
- NEVER use dark/saturated gradient combos (e.g., purple/pink, blue-500 to purple-600)
- NEVER let gradients cover more than 20% of the viewport
- NEVER apply gradients to text-heavy content or reading areas
- NEVER use gradients on small UI elements (<100px width)
- NEVER stack multiple gradient layers in the same viewport

**ENFORCEMENT RULE:**
IF gradient area exceeds 20% of viewport OR impacts readability  
THEN fallback to solid colors or simple, two-color subtle gradients.

**ALLOWED GRADIENT USAGE:**
- Hero section background only (subtle, light gradients with high text contrast)
- Large decorative elements (not content blocks)
- Accent overlays (opacity < 0.1)

---

## Color System

### Primary Color Palette

```json
{
  "brand_colors": {
    "primary_dark": {
      "hex": "#1E293B",
      "name": "Slate Navy",
      "usage": "Main headings (H1, H2), navigation text, dark section backgrounds, footer background",
      "contrast": "Use with white text only"
    },
    "accent_teal": {
      "hex": "#0D9488",
      "name": "Forensic Teal",
      "usage": "Primary CTA buttons, links, hover states, timeline accent bars, active states, icons, progress indicators",
      "contrast": "Use with white text"
    },
    "text_secondary": {
      "hex": "#64748B",
      "name": "Neutral Grey",
      "usage": "Body text, descriptions, captions, secondary information",
      "contrast": "Use on white or light backgrounds"
    },
    "background_light": {
      "hex": "#F8FAFC",
      "name": "Soft Cloud",
      "usage": "Alternating section backgrounds, card backgrounds in dark sections",
      "contrast": "Use with dark text"
    },
    "surface_white": {
      "hex": "#FFFFFF",
      "name": "Pure White",
      "usage": "Main background, card surfaces, navigation background, content areas",
      "contrast": "Primary background color"
    },
    "border_subtle": {
      "hex": "#E2E8F0",
      "name": "Whisper Grey",
      "usage": "Card borders, dividers, separators, input borders",
      "contrast": "Subtle separation"
    }
  },
  "semantic_colors": {
    "success": {
      "hex": "#10B981",
      "usage": "Success states, completed tasks, positive indicators"
    },
    "warning": {
      "hex": "#F59E0B",
      "usage": "Warning states, pending items, caution indicators"
    },
    "error": {
      "hex": "#EF4444",
      "usage": "Error states, destructive actions, critical alerts"
    },
    "info": {
      "hex": "#3B82F6",
      "usage": "Informational messages, tooltips, help text"
    }
  },
  "text_hierarchy": {
    "heading_primary": "#1E293B",
    "heading_secondary": "#334155",
    "body_primary": "#64748B",
    "body_secondary": "#94A3B8",
    "caption": "#CBD5E1"
  }
}
```

### Color Usage Rules

1. **White Backgrounds First**: All cards, content areas, and main sections use #FFFFFF
2. **Teal for Action**: Only use #0D9488 for interactive elements (buttons, links, CTAs)
3. **Slate Navy for Authority**: Use #1E293B for headings and dark sections (max 1-2 sections)
4. **Grey for Readability**: Body text always uses #64748B on white backgrounds
5. **Borders are Subtle**: Always use #E2E8F0 for borders, never darker

---

## Typography System

### Font Family
**Primary Font**: 'Inter' (Google Fonts)  
**DO NOT USE**: system-ui, -apple-system, or fallback system fonts

**Import Statement** (add to index.css):
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
```

### Typography Scale

```json
{
  "typography": {
    "h1": {
      "desktop": "text-6xl lg:text-7xl",
      "mobile": "text-4xl sm:text-5xl",
      "font_weight": "font-extrabold",
      "weight_value": 800,
      "line_height": "leading-tight",
      "letter_spacing": "tracking-tight",
      "color": "#1E293B",
      "usage": "Hero section main headline only"
    },
    "h2": {
      "desktop": "text-4xl lg:text-5xl",
      "mobile": "text-3xl sm:text-4xl",
      "font_weight": "font-bold",
      "weight_value": 700,
      "line_height": "leading-tight",
      "letter_spacing": "tracking-tight",
      "color": "#1E293B",
      "usage": "Section headings, major feature titles"
    },
    "h3": {
      "desktop": "text-2xl lg:text-3xl",
      "mobile": "text-xl sm:text-2xl",
      "font_weight": "font-semibold",
      "weight_value": 600,
      "line_height": "leading-snug",
      "letter_spacing": "tracking-normal",
      "color": "#1E293B",
      "usage": "Card titles, subsection headings"
    },
    "h4": {
      "desktop": "text-xl",
      "mobile": "text-lg",
      "font_weight": "font-semibold",
      "weight_value": 600,
      "line_height": "leading-snug",
      "color": "#334155",
      "usage": "Feature names, list headings"
    },
    "body_large": {
      "size": "text-lg",
      "font_weight": "font-normal",
      "weight_value": 400,
      "line_height": "leading-relaxed",
      "color": "#64748B",
      "usage": "Hero subheadline, important descriptions"
    },
    "body": {
      "size": "text-base",
      "font_weight": "font-normal",
      "weight_value": 400,
      "line_height": "leading-relaxed",
      "color": "#64748B",
      "usage": "Default body text, paragraphs, descriptions"
    },
    "body_small": {
      "size": "text-sm",
      "font_weight": "font-normal",
      "weight_value": 400,
      "line_height": "leading-relaxed",
      "color": "#64748B",
      "usage": "Secondary information, helper text"
    },
    "caption": {
      "size": "text-xs",
      "font_weight": "font-bold",
      "weight_value": 700,
      "line_height": "leading-normal",
      "letter_spacing": "tracking-wider uppercase",
      "color": "#0D9488",
      "usage": "Section labels, category tags, overlines"
    },
    "button_text": {
      "size": "text-sm",
      "font_weight": "font-semibold",
      "weight_value": 600,
      "letter_spacing": "tracking-wide",
      "usage": "All button labels"
    }
  }
}
```

### Text Hierarchy Rules

1. **One H1 per page**: Only in hero section
2. **H2 for sections**: Each major section gets one H2
3. **Body text color**: Always #64748B on white backgrounds
4. **Captions in teal**: Use uppercase + bold + teal (#0D9488) for section labels
5. **Line height**: Use `leading-relaxed` for all body text (1.625)

---

## Spacing System

### Spacing Scale (Tailwind)

```json
{
  "spacing": {
    "section_vertical": {
      "desktop": "py-24 lg:py-32",
      "mobile": "py-16",
      "usage": "Between major sections"
    },
    "section_horizontal": {
      "container": "px-6 lg:px-8 max-w-7xl mx-auto",
      "usage": "All section containers"
    },
    "component_spacing": {
      "xl": "space-y-16",
      "lg": "space-y-12",
      "md": "space-y-8",
      "sm": "space-y-6",
      "xs": "space-y-4"
    },
    "card_padding": {
      "default": "p-8",
      "compact": "p-6",
      "mobile": "p-4 sm:p-6"
    },
    "grid_gaps": {
      "large": "gap-12 lg:gap-16",
      "medium": "gap-8 lg:gap-12",
      "small": "gap-6 lg:gap-8"
    }
  }
}
```

### Spacing Rules

1. **Generous Whitespace**: Use 2-3x more spacing than feels comfortable
2. **Consistent Vertical Rhythm**: All sections use py-24 lg:py-32
3. **Grid Gaps**: Always use gap-8 lg:gap-12 for feature grids
4. **Card Padding**: Standard is p-8, never less than p-6
5. **Max Width**: All content containers use max-w-7xl mx-auto

---

## Component Patterns

### Button System

```json
{
  "buttons": {
    "primary_cta": {
      "component": "Button from ./components/ui/button",
      "variant": "default",
      "size": "lg",
      "classes": "bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-semibold px-8 py-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
      "usage": "Main CTAs, hero buttons, primary actions",
      "data_testid": "primary-cta-button"
    },
    "secondary_cta": {
      "component": "Button from ./components/ui/button",
      "variant": "outline",
      "size": "lg",
      "classes": "border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488]/5 font-semibold px-8 py-3 rounded-lg transition-all duration-200",
      "usage": "Secondary actions, alternative CTAs",
      "data_testid": "secondary-cta-button"
    },
    "ghost_button": {
      "component": "Button from ./components/ui/button",
      "variant": "ghost",
      "classes": "text-[#64748B] hover:text-[#0D9488] hover:bg-[#0D9488]/5 transition-colors duration-200",
      "usage": "Navigation links, subtle actions",
      "data_testid": "ghost-button"
    },
    "button_states": {
      "hover": "hover:scale-[1.02] hover:shadow-md transition-all duration-200",
      "focus": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:ring-offset-2",
      "active": "active:scale-[0.98]",
      "disabled": "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    }
  }
}
```

### Card Components

```json
{
  "cards": {
    "feature_card": {
      "component": "Card from ./components/ui/card",
      "structure": "Card > CardHeader > CardTitle + CardDescription > CardContent",
      "classes": "bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#0D9488]/20",
      "icon_area": "w-12 h-12 rounded-lg bg-[#0D9488]/10 flex items-center justify-center mb-6",
      "icon_color": "text-[#0D9488]",
      "title_classes": "text-xl font-semibold text-[#1E293B] mb-3",
      "description_classes": "text-base text-[#64748B] leading-relaxed",
      "data_testid": "feature-card"
    },
    "audience_card": {
      "component": "Card from ./components/ui/card",
      "classes": "bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
      "header_accent": "h-1 w-16 bg-[#0D9488] rounded-full mb-6",
      "title_classes": "text-2xl font-bold text-[#1E293B] mb-4",
      "list_classes": "space-y-3 text-[#64748B]",
      "list_item_icon": "text-[#0D9488] mr-3",
      "data_testid": "audience-card"
    },
    "stats_card": {
      "component": "Card from ./components/ui/card",
      "classes": "bg-white border border-[#E2E8F0] rounded-xl p-6 text-center",
      "number_classes": "text-4xl font-extrabold text-[#1E293B] mb-2",
      "label_classes": "text-sm font-medium text-[#64748B] uppercase tracking-wide",
      "data_testid": "stats-card"
    },
    "document_preview_card": {
      "component": "Card from ./components/ui/card",
      "classes": "bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200",
      "thumbnail_area": "w-full h-48 bg-[#F8FAFC] rounded-md mb-4 flex items-center justify-center",
      "ocr_highlight": "bg-[#0D9488]/10 border-l-2 border-[#0D9488] px-3 py-2 text-sm text-[#64748B]",
      "data_testid": "document-preview-card"
    }
  }
}
```

### Badge/Tag Components

```json
{
  "badges": {
    "classification_tag": {
      "component": "Badge from ./components/ui/badge",
      "variant": "secondary",
      "classes": "bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
      "usage": "Document classifications, categories, status indicators",
      "data_testid": "classification-badge"
    },
    "status_badge": {
      "component": "Badge from ./components/ui/badge",
      "variants": {
        "active": "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20",
        "pending": "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
        "completed": "bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20"
      },
      "data_testid": "status-badge"
    }
  }
}
```

### Timeline Components

```json
{
  "timeline": {
    "container": {
      "classes": "relative pl-8 border-l-2 border-[#E2E8F0]",
      "accent_bar": "absolute left-0 top-0 w-0.5 h-full bg-[#0D9488]",
      "usage": "Chronology visualizations, process flows"
    },
    "timeline_item": {
      "classes": "relative mb-8 last:mb-0",
      "dot": "absolute -left-[33px] w-4 h-4 rounded-full bg-[#0D9488] border-4 border-white shadow-sm",
      "content_classes": "bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm",
      "date_classes": "text-xs font-bold text-[#0D9488] uppercase tracking-wide mb-2",
      "title_classes": "text-lg font-semibold text-[#1E293B] mb-2",
      "description_classes": "text-sm text-[#64748B]",
      "data_testid": "timeline-item"
    },
    "gantt_bar": {
      "container": "relative h-8 bg-[#F8FAFC] rounded-md overflow-hidden",
      "progress_bar": "absolute left-0 top-0 h-full bg-[#0D9488] rounded-md transition-all duration-300",
      "label": "absolute inset-0 flex items-center px-3 text-xs font-semibold text-white",
      "data_testid": "gantt-bar"
    }
  }
}
```

---

## Layout System

### Grid Patterns

```json
{
  "layouts": {
    "hero_section": {
      "container": "max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32",
      "grid": "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center",
      "text_column": "lg:col-span-5",
      "visual_column": "lg:col-span-4",
      "stats_column": "lg:col-span-3",
      "background": "relative bg-white",
      "background_pattern": "absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30",
      "data_testid": "hero-section"
    },
    "feature_grid": {
      "container": "max-w-7xl mx-auto px-6 lg:px-8 py-24",
      "grid": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12",
      "usage": "3-column feature cards",
      "data_testid": "feature-grid"
    },
    "two_column_section": {
      "container": "max-w-7xl mx-auto px-6 lg:px-8 py-24",
      "grid": "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
      "image_column": "order-2 lg:order-1",
      "text_column": "order-1 lg:order-2",
      "usage": "Document Intelligence section, alternating content",
      "data_testid": "two-column-section"
    },
    "dark_section": {
      "container": "bg-[#1E293B] py-24 lg:py-32",
      "inner_container": "max-w-7xl mx-auto px-6 lg:px-8",
      "text_color": "text-white",
      "heading_color": "text-white",
      "description_color": "text-[#CBD5E1]",
      "usage": "Construction Add-In section, max 1 per page",
      "data_testid": "dark-section"
    },
    "audience_cards_section": {
      "container": "max-w-7xl mx-auto px-6 lg:px-8 py-24",
      "grid": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
      "usage": "Target audience cards",
      "data_testid": "audience-cards-section"
    }
  }
}
```

### Navigation

```json
{
  "navigation": {
    "header": {
      "container": "sticky top-0 z-50 w-full bg-white border-b border-[#E2E8F0] backdrop-blur-sm bg-white/95",
      "inner": "max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between",
      "logo_area": "flex items-center space-x-2",
      "logo_text": "text-xl font-bold text-[#1E293B]",
      "nav_links": "hidden md:flex items-center space-x-8",
      "link_classes": "text-sm font-medium text-[#64748B] hover:text-[#0D9488] transition-colors duration-200",
      "cta_area": "flex items-center space-x-4",
      "data_testid": "main-navigation"
    },
    "footer": {
      "container": "bg-[#1E293B] text-white py-16",
      "inner": "max-w-7xl mx-auto px-6 lg:px-8",
      "grid": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12",
      "column_heading": "text-sm font-bold text-white uppercase tracking-wide mb-4",
      "link_classes": "text-sm text-[#CBD5E1] hover:text-white transition-colors duration-200",
      "bottom_bar": "border-t border-[#334155] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center",
      "data_testid": "main-footer"
    }
  }
}
```

---

## Micro-Interactions & Motion

### Animation Principles

```json
{
  "animations": {
    "button_hover": {
      "scale": "hover:scale-[1.02]",
      "shadow": "hover:shadow-md",
      "duration": "transition-all duration-200",
      "active": "active:scale-[0.98]"
    },
    "card_hover": {
      "shadow": "hover:shadow-lg",
      "translate": "hover:-translate-y-1",
      "border": "hover:border-[#0D9488]/20",
      "duration": "transition-all duration-300"
    },
    "link_hover": {
      "color": "hover:text-[#0D9488]",
      "underline": "hover:underline underline-offset-4",
      "duration": "transition-colors duration-200"
    },
    "fade_in_up": {
      "initial": "opacity-0 translate-y-4",
      "animate": "opacity-100 translate-y-0",
      "duration": "transition-all duration-500",
      "usage": "Section entrances, card reveals"
    },
    "progress_bar": {
      "duration": "transition-all duration-300",
      "easing": "ease-out",
      "usage": "Gantt bars, loading states"
    }
  }
}
```

### Hover States

1. **Buttons**: Scale up 2%, add shadow, 200ms duration
2. **Cards**: Lift up 4px, increase shadow, 300ms duration
3. **Links**: Change color to teal, add underline, 200ms duration
4. **Images**: Slight zoom (scale-105), 300ms duration
5. **Icons**: Rotate or bounce slightly, 200ms duration

---

## Special Visual Elements

### Grid Pattern Background

```json
{
  "grid_pattern": {
    "css_classes": "absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30",
    "usage": "Hero section background only",
    "parent_container": "relative",
    "z_index": "z-0 (content should be z-10)"
  }
}
```

### OCR Highlight Component

```json
{
  "ocr_highlight": {
    "container": "bg-[#0D9488]/10 border-l-2 border-[#0D9488] px-3 py-2 rounded-r-md",
    "text": "text-sm text-[#64748B] font-mono",
    "highlight_text": "bg-[#0D9488]/20 px-1 rounded",
    "usage": "Document preview cards, search results",
    "data_testid": "ocr-highlight"
  }
}
```

### Stats Display

```json
{
  "stats_display": {
    "container": "grid grid-cols-1 gap-6",
    "stat_item": "text-center",
    "number": "text-4xl lg:text-5xl font-extrabold text-[#1E293B] mb-2",
    "label": "text-sm font-medium text-[#64748B] uppercase tracking-wide",
    "accent_line": "w-12 h-1 bg-[#0D9488] mx-auto mb-4 rounded-full",
    "data_testid": "stats-display"
  }
}
```

---

## Image Assets

### Image URLs by Category

```json
{
  "image_urls": {
    "hero_section": {
      "description": "Professional office workspace for hero visual",
      "url": "https://images.unsplash.com/photo-1674460640980-7447ce277b0b",
      "alt": "Modern professional workspace",
      "usage": "Hero section visual column"
    },
    "document_analysis": {
      "description": "Document analysis and data visualization",
      "urls": [
        "https://images.unsplash.com/photo-1606327054581-899eb5e6d1dc",
        "https://images.unsplash.com/photo-1686061593213-98dad7c599b9"
      ],
      "alt": "Document analysis and forensic investigation",
      "usage": "Document Intelligence section, feature illustrations"
    },
    "background_patterns": {
      "description": "Subtle geometric patterns for section backgrounds",
      "url": "https://images.unsplash.com/photo-1692530943891-589e88b780a1",
      "alt": "Geometric pattern background",
      "usage": "Section dividers, decorative elements (use with low opacity)"
    },
    "team_collaboration": {
      "description": "Professional team workspace",
      "urls": [
        "https://images.unsplash.com/photo-1758630737403-1bda34e3f98e",
        "https://images.unsplash.com/photo-1637665627832-dcd730049fbb"
      ],
      "alt": "Professional legal team collaboration",
      "usage": "About section, team features, testimonials background"
    }
  }
}
```

---

## Component Library References

### Shadcn UI Components to Use

```json
{
  "component_paths": {
    "button": "./components/ui/button",
    "card": "./components/ui/card",
    "badge": "./components/ui/badge",
    "separator": "./components/ui/separator",
    "navigation_menu": "./components/ui/navigation-menu",
    "accordion": "./components/ui/accordion",
    "dialog": "./components/ui/dialog",
    "tooltip": "./components/ui/tooltip",
    "tabs": "./components/ui/tabs",
    "scroll_area": "./components/ui/scroll-area"
  },
  "usage_notes": {
    "button": "Use for all CTAs and interactive actions. Customize with teal colors.",
    "card": "Primary container for features, audience cards, stats. Always use white background.",
    "badge": "For tags, classifications, status indicators. Use teal variant.",
    "separator": "For section dividers. Use border-[#E2E8F0].",
    "navigation_menu": "For main header navigation. Sticky with backdrop blur.",
    "accordion": "For FAQ sections, expandable content.",
    "dialog": "For modals, forms, detailed views.",
    "tooltip": "For additional information on hover.",
    "tabs": "For content organization, feature toggles.",
    "scroll_area": "For long content lists, document previews."
  }
}
```

---

## Accessibility Requirements

### WCAG Compliance

```json
{
  "accessibility": {
    "color_contrast": {
      "text_on_white": "Minimum 4.5:1 ratio (WCAG AA)",
      "text_on_dark": "White text on #1E293B meets AAA",
      "teal_on_white": "#0D9488 on white meets AA for large text only",
      "body_text": "#64748B on white meets AA"
    },
    "focus_states": {
      "all_interactive": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:ring-offset-2",
      "keyboard_navigation": "Ensure all interactive elements are keyboard accessible"
    },
    "data_testid_requirements": {
      "all_buttons": "data-testid with descriptive name (e.g., 'hero-cta-button')",
      "all_cards": "data-testid='feature-card' or 'audience-card'",
      "all_sections": "data-testid='section-name'",
      "all_forms": "data-testid for inputs, labels, submit buttons",
      "navigation": "data-testid='main-navigation', 'footer-navigation'"
    },
    "alt_text": {
      "all_images": "Descriptive alt text for all images",
      "decorative_images": "alt='' for purely decorative images"
    },
    "semantic_html": {
      "headings": "Proper heading hierarchy (h1 > h2 > h3)",
      "landmarks": "Use <header>, <nav>, <main>, <section>, <footer>",
      "lists": "Use <ul>, <ol> for lists, not divs"
    }
  }
}
```

---

## Responsive Design Breakpoints

```json
{
  "breakpoints": {
    "mobile": "< 640px (default)",
    "sm": "640px (sm:)",
    "md": "768px (md:)",
    "lg": "1024px (lg:)",
    "xl": "1280px (xl:)",
    "2xl": "1536px (2xl:)"
  },
  "responsive_patterns": {
    "typography": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl",
      "h2": "text-3xl sm:text-4xl lg:text-5xl",
      "body": "text-sm sm:text-base"
    },
    "spacing": {
      "section_padding": "py-16 lg:py-24 xl:py-32",
      "container_padding": "px-4 sm:px-6 lg:px-8"
    },
    "grids": {
      "feature_grid": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      "two_column": "grid-cols-1 lg:grid-cols-2",
      "stats": "grid-cols-2 lg:grid-cols-4"
    },
    "navigation": {
      "mobile": "Hidden menu, hamburger icon",
      "desktop": "Full horizontal navigation"
    }
  }
}
```

---

## Instructions to Main Agent

### Implementation Priority

1. **Setup Phase**:
   - Import Inter font from Google Fonts in index.css
   - Update CSS custom properties in index.css with VeriCase color palette
   - Verify all Shadcn UI components are available

2. **Color System Implementation**:
   - Replace all default colors with VeriCase palette
   - Primary: #1E293B (Slate Navy)
   - Accent: #0D9488 (Forensic Teal)
   - Text: #64748B (Neutral Grey)
   - Background: #FFFFFF (White) and #F8FAFC (Light sections)
   - Borders: #E2E8F0

3. **Typography Setup**:
   - Apply Inter font family globally
   - Use font-extrabold (800) for H1
   - Use font-bold (700) for H2
   - Use font-semibold (600) for H3, H4
   - Body text always #64748B with leading-relaxed

4. **Component Customization**:
   - Customize Button component with teal colors
   - Ensure all Cards use white background with subtle borders
   - Create Badge variants with teal accent
   - Add hover states to all interactive elements

5. **Layout Structure**:
   - Sticky navigation with white background and border
   - Hero section with grid pattern background
   - Feature grid: 3 columns on desktop
   - One dark section maximum (Construction Add-In)
   - Two-column layout for Document Intelligence
   - 3-column audience cards
   - Multi-column footer with dark background

6. **Special Components**:
   - Timeline with teal accent bars
   - Gantt-style progress bars
   - Document preview cards with OCR highlights
   - Stats cards with large numbers
   - Classification badges/tags

7. **Micro-Interactions**:
   - Button hover: scale-[1.02] + shadow-md
   - Card hover: -translate-y-1 + shadow-lg
   - Link hover: text-[#0D9488] + underline
   - All transitions: 200-300ms duration

8. **Accessibility**:
   - Add data-testid to ALL interactive elements
   - Ensure focus states on all buttons and links
   - Proper heading hierarchy
   - Alt text for all images
   - Keyboard navigation support

9. **Responsive Behavior**:
   - Mobile-first approach
   - Stack grids on mobile (grid-cols-1)
   - Reduce padding on mobile (py-16 vs py-24)
   - Hide navigation on mobile, show hamburger
   - Adjust typography scale for mobile

10. **Performance**:
    - Lazy load images below the fold
    - Use webp format for images where possible
    - Minimize gradient usage (max 20% viewport)
    - Optimize font loading with display=swap

### Critical Rules

1. **NO DARK GRADIENTS**: Never use purple, pink, or dark blue gradients
2. **WHITE BACKGROUNDS**: All content areas use #FFFFFF
3. **TEAL FOR ACTION**: Only use #0D9488 for CTAs and interactive elements
4. **GENEROUS SPACING**: Use py-24 lg:py-32 for sections
5. **ONE H1 PER PAGE**: Only in hero section
6. **INTER FONT ONLY**: Do not use system fonts
7. **DATA-TESTID REQUIRED**: All interactive elements must have data-testid
8. **SUBTLE BORDERS**: Always use #E2E8F0 for borders
9. **BODY TEXT COLOR**: Always #64748B on white backgrounds
10. **MAX ONE DARK SECTION**: Only Construction Add-In section uses dark background

### File Structure

```
/app/frontend/src/
├── components/
│   ├── ui/ (Shadcn components - DO NOT MODIFY)
│   ├── Hero.jsx (Hero section with grid pattern)
│   ├── Navigation.jsx (Sticky header)
│   ├── FeatureGrid.jsx (3-column features)
│   ├── DarkSection.jsx (Construction Add-In)
│   ├── DocumentIntelligence.jsx (2-column layout)
│   ├── AudienceCards.jsx (3-column cards)
│   ├── Timeline.jsx (Custom timeline component)
│   ├── GanttBar.jsx (Progress bar component)
│   ├── Footer.jsx (Multi-column footer)
│   └── ...
├── App.jsx (Main landing page)
├── App.css (Component-specific styles)
└── index.css (Global styles, font import, color tokens)
```

### CSS Custom Properties to Add

```css
/* Add to index.css after Tailwind imports */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

@layer base {
  :root {
    /* VeriCase Color System */
    --vericase-primary: #1E293B;
    --vericase-accent: #0D9488;
    --vericase-text-secondary: #64748B;
    --vericase-bg-light: #F8FAFC;
    --vericase-surface: #FFFFFF;
    --vericase-border: #E2E8F0;
    
    /* Semantic Colors */
    --vericase-success: #10B981;
    --vericase-warning: #F59E0B;
    --vericase-error: #EF4444;
    --vericase-info: #3B82F6;
    
    /* Update Shadcn tokens */
    --background: 0 0% 100%;
    --foreground: 215 25% 17%;
    --primary: 173 80% 29%;
    --primary-foreground: 0 0% 100%;
    --accent: 173 80% 29%;
    --accent-foreground: 0 0% 100%;
    --border: 214 32% 91%;
    --ring: 173 80% 29%;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

---

## Common Mistakes to Avoid

### ❌ Don't:
- Use dark purple, dark blue, or dark pink gradients
- Apply gradients to more than 20% of viewport
- Use system fonts instead of Inter
- Center-align all text (disrupts reading flow)
- Use emoji icons (🤖💡📊) - use FontAwesome or Lucide React
- Apply universal transitions (transition: all)
- Use dark backgrounds for more than 1 section
- Forget data-testid attributes
- Use colors other than the defined palette
- Create cramped layouts with insufficient spacing

### ✅ Do:
- Use white backgrounds for all content areas
- Apply teal (#0D9488) only for CTAs and accents
- Use generous spacing (py-24 lg:py-32)
- Add hover states to all interactive elements
- Include data-testid on all buttons, cards, sections
- Use Inter font for all text
- Maintain proper heading hierarchy
- Ensure WCAG AA contrast ratios
- Test on mobile devices
- Use Shadcn UI components as base

---

## Design Personality Summary

**VeriCase embodies**:
- **Trust**: Through consistent use of slate navy and professional typography
- **Authority**: Via bold headings, generous whitespace, and structured layouts
- **Precision**: With clean borders, subtle shadows, and organized grids
- **Sophistication**: Through restrained color palette and refined interactions
- **Minimalism**: By focusing on content, avoiding clutter, and using whitespace strategically

**Visual Tone**: Serious but approachable, modern but timeless, professional but not cold.

---

## Additional Libraries & Tools

### Recommended Installations

```json
{
  "additional_libraries": {
    "icons": {
      "library": "lucide-react",
      "installation": "npm install lucide-react",
      "usage": "Import icons: import { CheckCircle, ArrowRight, FileText } from 'lucide-react'",
      "style": "Use size={20} className='text-[#0D9488]' for teal icons"
    },
    "animations": {
      "library": "framer-motion",
      "installation": "npm install framer-motion",
      "usage": "For scroll animations, page transitions, card reveals",
      "example": "import { motion } from 'framer-motion'"
    },
    "forms": {
      "library": "react-hook-form",
      "installation": "npm install react-hook-form",
      "usage": "For contact forms, demo request forms",
      "validation": "Use with zod for schema validation"
    }
  }
}
```

### Icon Usage Guidelines

```json
{
  "icons": {
    "source": "lucide-react",
    "color": "#0D9488 (teal) for primary icons",
    "size": "20px (size={20}) for inline icons, 24px for feature icons",
    "stroke_width": "2 (default)",
    "usage_examples": {
      "features": "CheckCircle, Shield, FileText, Clock, Users",
      "navigation": "Menu, X, ChevronDown, ArrowRight",
      "actions": "Download, Upload, Search, Filter, Settings",
      "status": "CheckCircle, AlertCircle, XCircle, Info"
    }
  }
}
```

---

## Testing Checklist

### Visual Testing
- [ ] All text is readable (contrast meets WCAG AA)
- [ ] Hover states work on all interactive elements
- [ ] Focus states are visible for keyboard navigation
- [ ] Spacing is consistent across sections
- [ ] Typography hierarchy is clear
- [ ] Colors match the defined palette exactly
- [ ] No dark gradients are used
- [ ] White backgrounds on all content areas
- [ ] Teal accent used only for CTAs and highlights

### Functional Testing
- [ ] All buttons have data-testid attributes
- [ ] All cards have data-testid attributes
- [ ] All sections have data-testid attributes
- [ ] Navigation is sticky and functional
- [ ] Mobile menu works (hamburger icon)
- [ ] All links navigate correctly
- [ ] Forms validate properly
- [ ] Images load with proper alt text

### Responsive Testing
- [ ] Layout works on mobile (< 640px)
- [ ] Layout works on tablet (768px - 1024px)
- [ ] Layout works on desktop (> 1024px)
- [ ] Typography scales appropriately
- [ ] Grids stack properly on mobile
- [ ] Navigation adapts to mobile
- [ ] Spacing adjusts for smaller screens
- [ ] Images are responsive

### Performance Testing
- [ ] Images are optimized (webp format)
- [ ] Fonts load efficiently (display=swap)
- [ ] No layout shift on page load
- [ ] Animations are smooth (60fps)
- [ ] Page loads in < 3 seconds
- [ ] No console errors
- [ ] Lighthouse score > 90

---

## Brand Attributes

**VeriCase is**:
- Sophisticated (not flashy)
- Trustworthy (not cold)
- Precise (not rigid)
- Professional (not boring)
- Modern (not trendy)
- Authoritative (not intimidating)
- Minimal (not sparse)
- Clear (not simplistic)

**VeriCase is NOT**:
- Consumer-focused
- Playful or casual
- Colorful or vibrant
- Trendy or experimental
- Cluttered or busy
- Generic or template-like

---

## Final Notes

This design system is crafted specifically for B2B legal-tech professionals who value precision, trust, and sophistication. Every design decision—from the restrained color palette to the generous whitespace—reinforces VeriCase's position as a premium, reliable platform for digital forensics and legal case management.

The main agent should follow these guidelines strictly, ensuring that the final implementation feels human-made, visually appealing, and conversion-optimized, while maintaining the professional, authoritative tone required for the legal-tech industry.

**Key Success Metrics**:
- Visual hierarchy guides users naturally through content
- CTAs are clear and compelling (teal buttons stand out)
- Trust is established through consistent, professional design
- Content is easy to scan and digest
- Mobile experience is seamless
- Accessibility standards are met
- Brand personality is evident in every detail

---

## General UI UX Design Guidelines

### Universal Restrictions

**CRITICAL: Transition Rules**
- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms.
- Always add transitions for specific interactive elements like button, input excluding transforms
- Example: `transition-colors duration-200` or `transition-shadow duration-300`

**CRITICAL: Text Alignment**
- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file.
- This disrupts the human natural reading flow of text
- Only center-align specific elements like headings or CTAs, not the entire app

**CRITICAL: Icon Usage**
- NEVER use AI assistant Emoji characters like `🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇` etc for icons.
- Always use **lucide-react** library (already installed in package.json)
- Example: `import { CheckCircle, ArrowRight } from 'lucide-react'`

### Gradient Enforcement

**GRADIENT RESTRICTION RULE**
- NEVER use dark/saturated gradient combos (e.g., purple/pink, blue-500 to purple-600, purple-500 to pink-500, green-500 to blue-500, red to pink)
- NEVER use dark gradients for logo, testimonial, footer etc
- NEVER let gradients cover more than 20% of the viewport
- NEVER apply gradients to text-heavy content or reading areas
- NEVER use gradients on small UI elements (<100px width)
- NEVER stack multiple gradient layers in the same viewport

**ENFORCEMENT RULE:**
- If gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
- Section backgrounds (not content backgrounds)
- Hero section header content (dark to light to dark color)
- Decorative overlays and accent elements only
- Hero section with 2-3 mild colors
- Gradients can be horizontal, vertical, or diagonal

**For VeriCase specifically:**
- Use subtle gradients only in hero section background
- Prefer solid colors throughout the rest of the page
- If gradients are used, keep them light and minimal (e.g., white to #F8FAFC)

### Interaction Design

**Micro-Animations**
- Every interaction needs micro-animations - hover states, transitions, entrance animations
- Static = dead. Add life to the interface.
- Use 200-300ms duration for most transitions
- Scale, shadow, and color changes on hover

**Spacing Philosophy**
- Use 2-3x more spacing than feels comfortable
- Cramped designs look cheap
- Generous whitespace = premium feel
- VeriCase uses py-24 lg:py-32 for sections

**Visual Texture**
- Subtle grain textures, noise overlays for depth
- Custom cursors for interactive elements (optional)
- Selection states with teal highlight
- Loading animations for async actions

### Component Design

**Component Reuse**
- Prioritize using pre-existing components from `src/components/ui` when applicable
- Create new components that match the style and conventions of existing components
- Examine existing components to understand the project's component patterns

**IMPORTANT: Component Library**
- Do not use HTML based components like dropdown, calendar, toast etc.
- You **MUST** always use `/app/frontend/src/components/ui/` only as primary components
- These are modern, accessible, and stylish Shadcn UI components

**Best Practices**
- Use Shadcn/UI as the primary component library for consistency and accessibility
- Import path: `./components/ui/[component-name]`

**Export Conventions**
- Components MUST use named exports: `export const ComponentName = ...`
- Pages MUST use default exports: `export default function PageName() {...}`

**Toasts**
- Use `sonner` for toasts
- Sonner component located in `/app/frontend/src/components/ui/sonner.jsx`

### Visual Design Principles

**Color Usage**
- Before generating UI, infer the visual style from the problem statement
- Set global design tokens immediately (primary, secondary, accent, background, foreground)
- Don't make the background dark as a default step
- Understand the problem first and define colors accordingly
- For VeriCase: Professional, light backgrounds with teal accents

**Contrast & Readability**
- Ensure good contrast between font and background
- Making sure that every text is visible when revamping colors
- WCAG AA minimum (4.5:1 for normal text)
- VeriCase: #64748B on white meets AA standards

**Visual Hierarchy**
- Consistent visual hierarchy throughout the application
- Use size, weight, and color to establish importance
- VeriCase: H1 (extrabold) > H2 (bold) > H3 (semibold) > Body (normal)

### Accessibility Requirements

**Data-TestID Attributes**
- All interactive and key informational elements **MUST** include a `data-testid` attribute
- This applies to buttons, links, form inputs, menus, and any element that a user interacts with
- Use kebab-case convention that defines the element's role, not its appearance
- Example: `data-testid="login-form-submit-button"`
- This creates a stable interface for tests, preventing them from breaking due to style changes

**Keyboard Navigation**
- All interactive elements must be keyboard accessible
- Visible focus states on all focusable elements
- Tab order should be logical and intuitive

**Screen Readers**
- Use semantic HTML (header, nav, main, section, footer)
- Proper heading hierarchy (h1 > h2 > h3)
- Alt text for all images (empty alt="" for decorative images)

### Performance Optimization

**Image Optimization**
- Use webp format where possible
- Lazy load images below the fold
- Provide appropriate alt text
- Use responsive images with srcset

**Font Loading**
- Use `display=swap` for Google Fonts
- Preload critical fonts
- Limit font weights to only what's needed
- VeriCase uses Inter: 400, 600, 700, 800

**CSS Optimization**
- Avoid universal transitions (`transition: all`)
- Use specific transition properties
- Minimize gradient usage
- Use CSS custom properties for theming

### Responsive Design

**Mobile-First Approach**
- Design for mobile first, then scale up
- Stack grids on mobile (grid-cols-1)
- Reduce padding on mobile
- Hide/show elements appropriately
- VeriCase: py-16 on mobile, py-24 lg:py-32 on desktop

**Breakpoints**
- Mobile: < 640px (default)
- Tablet: 768px (md:)
- Desktop: 1024px (lg:)
- Large: 1280px (xl:)

**Touch Targets**
- Minimum 44x44px for touch targets
- Adequate spacing between interactive elements
- Larger buttons on mobile

### Brand Consistency

**Establish Brand Attributes**
- Sophisticated, motivating, trustworthy (for VeriCase)
- Inform all visual decisions with brand personality
- Consistent tone throughout the application
- VeriCase: Professional, precise, authoritative, minimal

**Visual Personality**
- Tone should match the target audience
- VeriCase: Serious but approachable, modern but timeless
- Avoid generic, template-like designs
- Create distinctive, memorable experiences

---

**End of Design Guidelines**

This comprehensive design system ensures that VeriCase's landing page will be professional, trustworthy, and conversion-optimized while maintaining the highest standards of accessibility and user experience. The main agent should implement these guidelines with precision and attention to detail, creating a landing page that truly represents the sophistication and authority of the VeriCase platform.
