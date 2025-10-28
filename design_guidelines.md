# VeriCase Landing Page - Complete Design System Guidelines

## 🎯 Design Philosophy

**Core Principle**: Transform from cluttered, bleak corporate design to a vibrant, energetic, and spacious premium B2B SaaS experience that emphasizes business value over technical specifications.

**Brand Personality**: Confident, powerful, fast, intelligent, comprehensive - "nobody else can do this"

**Visual Strategy**: Generous spacing, vibrant colors, clean layouts, strong hierarchy, engaging visuals

---

## 🚨 GRADIENT RESTRICTION RULE

### NEVER:
- Use dark/saturated gradient combos (e.g., purple/pink, blue-500 to purple-600, purple-500 to pink-500)
- Let gradients cover more than 20% of the viewport
- Apply gradients to text-heavy content or reading areas
- Use gradients on small UI elements (<100px width)
- Stack multiple gradient layers in the same viewport
- Use dark gradients for logo, testimonial, footer sections

### ENFORCEMENT RULE:
**IF** gradient area exceeds 20% of viewport OR impacts readability  
**THEN** fallback to solid colors or simple, two-color light gradients

### ALLOWED GRADIENT USAGE:
- Hero section background (light to lighter gradients only)
- Large CTA buttons (subtle, light gradients)
- Decorative accent elements
- Section dividers or overlays (minimal, subtle)

---

## 🎨 Color System

### Primary Palette

```json
{
  "primary": {
    "teal": {
      "50": "#E6F7F7",
      "100": "#B3EBEB",
      "200": "#80DFDF",
      "300": "#4DD3D3",
      "400": "#1AC7C7",
      "500": "#069494",
      "600": "#057676",
      "700": "#045858",
      "800": "#033A3A",
      "900": "#021C1C"
    },
    "coral": {
      "50": "#FFF0ED",
      "100": "#FFD4C9",
      "200": "#FFB8A5",
      "300": "#FF9C81",
      "400": "#FF8559",
      "500": "#FF7F50",
      "600": "#E6673A",
      "700": "#CC4F24",
      "800": "#B3370E",
      "900": "#991F00"
    },
    "orange": {
      "50": "#FFF4E6",
      "100": "#FFE0B3",
      "200": "#FFCC80",
      "300": "#FFB84D",
      "400": "#FFA41A",
      "500": "#FD5901",
      "600": "#E64F01",
      "700": "#CC4501",
      "800": "#B33B01",
      "900": "#993101"
    }
  },
  "neutral": {
    "white": "#FFFFFF",
    "gray": {
      "50": "#F8FAFC",
      "100": "#F1F5F9",
      "200": "#E2E8F0",
      "300": "#CBD5E1",
      "400": "#94A3B8",
      "500": "#64748B",
      "600": "#475569",
      "700": "#334155",
      "800": "#1E293B",
      "900": "#0F172A"
    }
  },
  "accent": {
    "warmGold": "#FFD700",
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#EF4444"
  }
}
```

### Color Usage Guidelines

**Backgrounds:**
- Primary background: `#FFFFFF` (white)
- Secondary background: `#F8FAFC` (gray-50)
- Card backgrounds: `#FFFFFF` with subtle shadow
- Section alternating: White and `#F8FAFC`

**Text Colors:**
- Primary headings: `#0F172A` (gray-900)
- Secondary headings: `#334155` (gray-700)
- Body text: `#475569` (gray-600)
- Muted text: `#64748B` (gray-500)
- Light text on dark: `#FFFFFF`

**Interactive Elements:**
- Primary CTA: `#069494` (teal-500) with hover `#057676` (teal-600)
- Secondary CTA: `#FF7F50` (coral-500) with hover `#E6673A` (coral-600)
- Accent highlights: `#FD5901` (orange-500)
- Links: `#069494` (teal-500) with underline on hover

**Borders & Dividers:**
- Default border: `#E2E8F0` (gray-200)
- Subtle divider: `#F1F5F9` (gray-100)
- Focus ring: `#069494` (teal-500) with 2px width

### Gradient Specifications (Use Sparingly)

**Hero Section Only (Max 20% viewport):**
```css
/* Light Teal to White - Horizontal */
background: linear-gradient(135deg, #E6F7F7 0%, #FFFFFF 100%);

/* Subtle Coral Accent - For decorative elements only */
background: linear-gradient(90deg, #FFF0ED 0%, #FFFFFF 100%);
```

**Primary CTA Button (Subtle only):**
```css
/* Very subtle teal gradient */
background: linear-gradient(180deg, #069494 0%, #057676 100%);
```

---

## 📐 Spacing System

### Core Principle: GENEROUS, CONSISTENT, BREATHABLE

**Critical Rule**: Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

### Spacing Scale (Tailwind Classes)

```json
{
  "spacing": {
    "xs": "0.5rem",     // 8px  - space-2
    "sm": "0.75rem",    // 12px - space-3
    "md": "1rem",       // 16px - space-4
    "lg": "1.5rem",     // 24px - space-6
    "xl": "2rem",       // 32px - space-8
    "2xl": "3rem",      // 48px - space-12
    "3xl": "4rem",      // 64px - space-16
    "4xl": "6rem",      // 96px - space-24
    "5xl": "8rem",      // 128px - space-32
    "6xl": "12rem"      // 192px - space-48
  }
}
```

### Section Spacing

**Vertical Section Padding:**
- Hero section: `py-24 md:py-32 lg:py-40` (96px → 128px → 160px)
- Major sections: `py-20 md:py-28 lg:py-32` (80px → 112px → 128px)
- Minor sections: `py-16 md:py-20 lg:py-24` (64px → 80px → 96px)
- Between features: `space-y-16 md:space-y-20 lg:space-y-24`

**Horizontal Container Padding:**
- Mobile: `px-6` (24px)
- Tablet: `px-8` (32px)
- Desktop: `px-12` (48px)
- Max width: `max-w-7xl mx-auto` (1280px)

**Component Spacing:**
- Between heading and subheading: `space-y-4 md:space-y-6` (16px → 24px)
- Between text and CTA: `space-y-8 md:space-y-10` (32px → 40px)
- Between cards in grid: `gap-8 md:gap-10 lg:gap-12` (32px → 40px → 48px)
- Card internal padding: `p-8 md:p-10 lg:p-12` (32px → 40px → 48px)

**List Item Spacing:**
- Between list items: `space-y-6 md:space-y-8` (24px → 32px)
- Icon to text gap: `gap-4 md:gap-5` (16px → 20px)

---

## 🔤 Typography System

### Font Stack

**Primary Font (Headings):** Space Grotesk
**Secondary Font (Body):** Manrope

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap');

:root {
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Manrope', sans-serif;
}
```

### Type Scale & Hierarchy

```json
{
  "typography": {
    "h1": {
      "mobile": "text-4xl",      // 36px
      "tablet": "text-5xl",      // 48px
      "desktop": "text-6xl",     // 60px
      "weight": "font-bold",     // 700
      "lineHeight": "leading-tight",  // 1.25
      "letterSpacing": "tracking-tight",
      "font": "font-heading"
    },
    "h2": {
      "mobile": "text-3xl",      // 30px
      "tablet": "text-4xl",      // 36px
      "desktop": "text-5xl",     // 48px
      "weight": "font-bold",     // 700
      "lineHeight": "leading-tight",
      "letterSpacing": "tracking-tight",
      "font": "font-heading"
    },
    "h3": {
      "mobile": "text-2xl",      // 24px
      "tablet": "text-3xl",      // 30px
      "desktop": "text-4xl",     // 36px
      "weight": "font-semibold", // 600
      "lineHeight": "leading-snug",   // 1.375
      "letterSpacing": "tracking-tight",
      "font": "font-heading"
    },
    "h4": {
      "mobile": "text-xl",       // 20px
      "tablet": "text-2xl",      // 24px
      "desktop": "text-3xl",     // 30px
      "weight": "font-semibold", // 600
      "lineHeight": "leading-snug",
      "font": "font-heading"
    },
    "subheading": {
      "mobile": "text-base",     // 16px
      "tablet": "text-lg",       // 18px
      "desktop": "text-xl",      // 20px
      "weight": "font-medium",   // 500
      "lineHeight": "leading-relaxed",  // 1.625
      "font": "font-body"
    },
    "body": {
      "size": "text-base",       // 16px
      "weight": "font-normal",   // 400
      "lineHeight": "leading-relaxed",  // 1.625
      "font": "font-body"
    },
    "bodyLarge": {
      "mobile": "text-lg",       // 18px
      "tablet": "text-xl",       // 20px
      "weight": "font-normal",   // 400
      "lineHeight": "leading-relaxed",
      "font": "font-body"
    },
    "small": {
      "size": "text-sm",         // 14px
      "weight": "font-normal",   // 400
      "lineHeight": "leading-normal",   // 1.5
      "font": "font-body"
    },
    "caption": {
      "size": "text-xs",         // 12px
      "weight": "font-medium",   // 500
      "lineHeight": "leading-normal",
      "font": "font-body"
    }
  }
}
```

### Typography Usage Examples

**Hero Headline:**
```jsx
<h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
  Make Time Your Ally, Not Your Enemy
</h1>
```

**Hero Subheadline:**
```jsx
<p className="font-body text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-gray-600 max-w-2xl">
  From Chaos to Clarity in Construction Disputes
</p>
```

**Section Heading:**
```jsx
<h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900">
  Extract mass data at the blink of an eye
</h2>
```

**Body Text:**
```jsx
<p className="font-body text-base leading-relaxed text-gray-600">
  Build true chronologies nobody else can. Intelligently indexed for instant access.
</p>
```

---

## 🎭 Component Patterns

### Button System

**Primary Button (Pill/Capsule Style):**
```jsx
<button 
  data-testid="primary-cta-button"
  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-teal-500 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200 hover:scale-105 hover:shadow-lg"
>
  Get Started
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
</button>
```

**Secondary Button:**
```jsx
<button 
  data-testid="secondary-cta-button"
  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-teal-600 bg-white border-2 border-teal-500 rounded-full hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200"
>
  Learn More
</button>
```

**Accent Button (Coral):**
```jsx
<button 
  data-testid="accent-cta-button"
  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-coral-500 rounded-full hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 transition-colors duration-200 hover:scale-105 hover:shadow-lg"
>
  Book a Demo
</button>
```

**Button Sizes:**
- Small: `px-6 py-3 text-sm`
- Medium (default): `px-8 py-4 text-base`
- Large: `px-10 py-5 text-lg`

### Card Component

**Feature Card:**
```jsx
<div 
  data-testid="feature-card"
  className="group relative bg-white rounded-2xl p-8 md:p-10 lg:p-12 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-teal-300"
>
  {/* Icon Container */}
  <div className="flex items-center justify-center w-16 h-16 mb-6 bg-teal-100 rounded-xl group-hover:bg-teal-500 transition-colors duration-300">
    <svg className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Icon path */}
    </svg>
  </div>
  
  {/* Content */}
  <h3 className="font-heading text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
    Feature Title
  </h3>
  <p className="font-body text-base leading-relaxed text-gray-600">
    Feature description with generous spacing and clear hierarchy.
  </p>
</div>
```

**Testimonial Card:**
```jsx
<div 
  data-testid="testimonial-card"
  className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-200"
>
  {/* Quote */}
  <div className="mb-6">
    <svg className="w-10 h-10 text-teal-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
    </svg>
  </div>
  
  <p className="font-body text-lg leading-relaxed text-gray-700 mb-6">
    "Testimonial content here with proper spacing and readability."
  </p>
  
  {/* Author */}
  <div className="flex items-center gap-4">
    <img 
      src="author-image.jpg" 
      alt="Author name"
      className="w-12 h-12 rounded-full object-cover"
    />
    <div>
      <p className="font-body font-semibold text-gray-900">Author Name</p>
      <p className="font-body text-sm text-gray-600">Position, Company</p>
    </div>
  </div>
</div>
```

### Navigation Component

**Header Navigation:**
```jsx
<nav 
  data-testid="main-navigation"
  className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
>
  <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
    <div className="flex items-center justify-between h-20">
      {/* Logo */}
      <div className="flex items-center">
        <span className="font-heading text-2xl font-bold text-gray-900">
          VeriCase
        </span>
        <span className="ml-3 font-body text-sm text-gray-500">
          Records, Records... VeriCase
        </span>
      </div>
      
      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <a 
          href="#features" 
          className="font-body text-base font-medium text-gray-600 hover:text-teal-600 transition-colors duration-200"
        >
          Features
        </a>
        <a 
          href="#pricing" 
          className="font-body text-base font-medium text-gray-600 hover:text-teal-600 transition-colors duration-200"
        >
          Pricing
        </a>
        <a 
          href="#about" 
          className="font-body text-base font-medium text-gray-600 hover:text-teal-600 transition-colors duration-200"
        >
          About
        </a>
      </div>
      
      {/* CTA */}
      <button 
        data-testid="nav-cta-button"
        className="px-6 py-3 text-sm font-semibold text-white bg-teal-500 rounded-full hover:bg-teal-600 transition-colors duration-200"
      >
        Get Started
      </button>
    </div>
  </div>
</nav>
```

### Shadcn UI Components to Use

**From `/app/frontend/src/components/ui/`:**

1. **Button** (`button.jsx`) - Use for all CTAs with custom styling
2. **Card** (`card.jsx`) - Base for feature cards, testimonials
3. **Badge** (`badge.jsx`) - For tags, labels, status indicators
4. **Accordion** (`accordion.jsx`) - For FAQ sections
5. **Tabs** (`tabs.jsx`) - For feature comparisons, pricing tiers
6. **Dialog** (`dialog.jsx`) - For modals, video demos
7. **Tooltip** (`tooltip.jsx`) - For additional information on hover
8. **Separator** (`separator.jsx`) - For section dividers
9. **Avatar** (`avatar.jsx`) - For testimonials, team members
10. **Carousel** (`carousel.jsx`) - For testimonial sliders, case studies

**Import Example:**
```jsx
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
```

---

## 🎬 Motion & Micro-interactions

### Animation Principles

**Critical Rule**: Every interaction needs micro-animations. Static = dead.

### Hover States

**Buttons:**
```css
/* Scale + Shadow */
.button-hover {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.button-hover:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px -5px rgba(6, 148, 148, 0.3);
}
```

**Cards:**
```css
/* Lift + Border Color */
.card-hover {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  border-color: #069494;
}
```

**Links:**
```css
/* Underline Slide */
.link-hover {
  position: relative;
  transition: color 0.2s ease;
}
.link-hover::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #069494;
  transition: width 0.3s ease;
}
.link-hover:hover::after {
  width: 100%;
}
```

### Entrance Animations

**Fade In Up (for sections):**
```jsx
// Using Framer Motion (already in package.json)
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* Content */}
</motion.div>
```

**Stagger Children (for lists):**
```jsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item, index) => (
    <motion.div
      key={index}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Scroll Animations

**Parallax Effect (for hero section):**
```jsx
import { useScroll, useTransform, motion } from 'framer-motion';

const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, 150]);

<motion.div style={{ y }}>
  {/* Hero content */}
</motion.div>
```

### Loading States

**Skeleton Loader:**
```jsx
import { Skeleton } from './components/ui/skeleton';

<div className="space-y-4">
  <Skeleton className="h-12 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-5/6" />
</div>
```

---

## 📱 Layout Patterns

### Hero Section Layout

**Structure:**
```jsx
<section 
  data-testid="hero-section"
  className="relative min-h-screen flex items-center py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 overflow-hidden"
  style={{
    background: 'linear-gradient(135deg, #E6F7F7 0%, #FFFFFF 100%)'
  }}
>
  <div className="max-w-7xl mx-auto w-full">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Left Column - Content */}
      <div className="space-y-8">
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-teal-200">
          <span className="font-body text-sm font-medium text-teal-600">
            Records, Records... VeriCase
          </span>
        </div>
        
        {/* Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
          Make Time Your Ally, Not Your Enemy
        </h1>
        
        {/* Subheadline */}
        <p className="font-body text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-gray-600 max-w-2xl">
          From Chaos to Clarity in Construction Disputes
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 text-base font-semibold text-white bg-teal-500 rounded-full hover:bg-teal-600 transition-colors duration-200 hover:scale-105">
            Get Started
          </button>
          <button className="px-8 py-4 text-base font-semibold text-teal-600 bg-white border-2 border-teal-500 rounded-full hover:bg-teal-50 transition-colors duration-200">
            Watch Demo
          </button>
        </div>
        
        {/* Social Proof */}
        <div className="flex items-center gap-6 pt-4">
          <div className="flex -space-x-2">
            {/* Avatar images */}
          </div>
          <p className="font-body text-sm text-gray-600">
            Trusted by 500+ legal teams
          </p>
        </div>
      </div>
      
      {/* Right Column - Visual */}
      <div className="relative">
        {/* Chronology Lens Image or Dashboard Preview */}
        <img 
          src="/chronology-lens.jpg" 
          alt="VeriCase Chronology Lens"
          className="w-full h-auto rounded-2xl shadow-2xl"
        />
        
        {/* Floating Stats Cards */}
        <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
          <p className="font-body text-2xl font-bold text-teal-600">10x</p>
          <p className="font-body text-sm text-gray-600">Faster Analysis</p>
        </div>
      </div>
    </div>
  </div>
  
  {/* Decorative Elements */}
  <div className="absolute top-20 right-20 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-30"></div>
  <div className="absolute bottom-20 left-20 w-48 h-48 bg-coral-100 rounded-full blur-3xl opacity-30"></div>
</section>
```

### Features Section Layout (Bento Grid)

**Structure:**
```jsx
<section 
  data-testid="features-section"
  className="py-20 md:py-28 lg:py-32 px-6 md:px-8 lg:px-12 bg-white"
>
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-16 md:mb-20 space-y-4">
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900">
        What VeriCase Does FOR You
      </h2>
      <p className="font-body text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        Transform construction disputes from chaos to clarity
      </p>
    </div>
    
    {/* Bento Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
      {/* Feature Card 1 - Large */}
      <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 md:p-10 lg:p-12 border border-teal-100">
        <div className="flex items-center justify-center w-16 h-16 mb-6 bg-teal-500 rounded-xl">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* Icon */}
          </svg>
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Extract mass data at the blink of an eye
        </h3>
        <p className="font-body text-base leading-relaxed text-gray-600">
          Process years of construction records in seconds, not weeks.
        </p>
      </div>
      
      {/* Feature Card 2 - Small */}
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300">
        {/* Content */}
      </div>
      
      {/* Continue pattern... */}
    </div>
  </div>
</section>
```

### Value Propositions Section

**8 Core Features Layout:**
```jsx
<section 
  data-testid="value-props-section"
  className="py-20 md:py-28 lg:py-32 px-6 md:px-8 lg:px-12 bg-gray-50"
>
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
      {[
        {
          title: "Extract mass data at the blink of an eye",
          description: "Process years of records instantly"
        },
        {
          title: "Build true chronologies nobody else can",
          description: "Create comprehensive timelines automatically"
        },
        {
          title: "Intelligently indexed for instant access",
          description: "Find any document in seconds"
        },
        {
          title: "Respond quickly in high-paced adjudications",
          description: "Stay ahead of tight deadlines"
        },
        {
          title: "Auto-select evidence for rebuttals",
          description: "AI-powered evidence matching"
        },
        {
          title: "Uncover years of true contemporaneous records",
          description: "Complete historical visibility"
        },
        {
          title: "All in 1 place: auto-bundle, tag evidence, fileshare",
          description: "Unified platform for all needs"
        },
        {
          title: "Discuss heads of claims with team members",
          description: "Collaborative dispute resolution"
        }
      ].map((feature, index) => (
        <div 
          key={index}
          data-testid={`value-prop-${index}`}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300 group"
        >
          <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">
            {feature.title}
          </h3>
          <p className="font-body text-sm leading-relaxed text-gray-600">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Pricing Section

**Structure:**
```jsx
<section 
  data-testid="pricing-section"
  className="py-20 md:py-28 lg:py-32 px-6 md:px-8 lg:px-12 bg-white"
>
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16 space-y-4">
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
        Simple, Transparent Pricing
      </h2>
      <p className="font-body text-base sm:text-lg text-gray-600">
        Choose the plan that fits your needs. All prices in £ (GBP)
      </p>
    </div>
    
    {/* Pricing Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
      {/* Starter Plan */}
      <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-gray-200 hover:border-teal-300 transition-all duration-300">
        <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-2">Starter</h3>
        <div className="mb-6">
          <span className="font-heading text-4xl font-bold text-gray-900">£299</span>
          <span className="font-body text-gray-600">/month</span>
        </div>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-teal-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="font-body text-gray-600">Up to 1,000 documents</span>
          </li>
          {/* More features */}
        </ul>
        <button className="w-full px-8 py-4 text-base font-semibold text-teal-600 bg-white border-2 border-teal-500 rounded-full hover:bg-teal-50 transition-colors duration-200">
          Get Started
        </button>
      </div>
      
      {/* Professional Plan - Featured */}
      <div className="bg-teal-500 rounded-2xl p-8 md:p-10 border-2 border-teal-600 relative transform md:scale-105 shadow-xl">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-coral-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
        <h3 className="font-heading text-2xl font-semibold text-white mb-2">Professional</h3>
        <div className="mb-6">
          <span className="font-heading text-4xl font-bold text-white">£599</span>
          <span className="font-body text-teal-100">/month</span>
        </div>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-white mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="font-body text-white">Up to 10,000 documents</span>
          </li>
          {/* More features */}
        </ul>
        <button className="w-full px-8 py-4 text-base font-semibold text-teal-600 bg-white rounded-full hover:bg-gray-50 transition-colors duration-200">
          Get Started
        </button>
      </div>
      
      {/* Enterprise Plan */}
      <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-gray-200 hover:border-teal-300 transition-all duration-300">
        {/* Similar structure */}
      </div>
    </div>
  </div>
</section>
```

---

## 🖼️ Image Assets

### Image URLs by Category

```json
{
  "hero_section": {
    "primary": "https://images.unsplash.com/photo-1541888915364-aaeed51d238b",
    "description": "Construction team aerial view - professional collaboration",
    "usage": "Hero section right column, main visual"
  },
  "team_collaboration": {
    "url": "https://images.pexels.com/photos/7876306/pexels-photo-7876306.jpeg",
    "description": "Legal professionals in meeting discussing documents",
    "usage": "About section, team features"
  },
  "construction_site": {
    "url": "https://images.unsplash.com/photo-1589559375424-c3fa757c3094",
    "description": "Construction workers on site with safety gear",
    "usage": "Industry context, testimonials background"
  },
  "dashboard_analytics": {
    "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    "description": "Performance analytics dashboard on laptop",
    "usage": "Features section, product showcase"
  },
  "data_visualization": {
    "url": "https://images.unsplash.com/photo-1686061593213-98dad7c599b9",
    "description": "Analytics dashboard with data charts",
    "usage": "Chronology features, data extraction visuals"
  },
  "abstract_pattern": {
    "url": "https://images.unsplash.com/photo-1759267787407-57bc7349abc7",
    "description": "Abstract teal and orange geometric pattern",
    "usage": "Background decorative elements, section dividers"
  },
  "team_overview": {
    "url": "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg",
    "description": "Aerial view of team collaboration",
    "usage": "Testimonials, case studies"
  }
}
```

---

## ♿ Accessibility Guidelines

### Color Contrast

**WCAG AA Compliance (Minimum 4.5:1 for normal text, 3:1 for large text):**

✅ **Passing Combinations:**
- Gray-900 (#0F172A) on White (#FFFFFF) - 18.5:1
- Gray-700 (#334155) on White (#FFFFFF) - 11.2:1
- Gray-600 (#475569) on White (#FFFFFF) - 8.6:1
- Teal-500 (#069494) on White (#FFFFFF) - 4.8:1
- White (#FFFFFF) on Teal-500 (#069494) - 4.8:1
- White (#FFFFFF) on Coral-500 (#FF7F50) - 3.2:1 (large text only)

### Focus States

**All interactive elements MUST have visible focus states:**

```css
/* Button Focus */
.button:focus-visible {
  outline: 2px solid #069494;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(6, 148, 148, 0.1);
}

/* Link Focus */
.link:focus-visible {
  outline: 2px solid #069494;
  outline-offset: 4px;
  border-radius: 2px;
}

/* Input Focus */
.input:focus-visible {
  outline: none;
  border-color: #069494;
  box-shadow: 0 0 0 3px rgba(6, 148, 148, 0.1);
}
```

### ARIA Labels

**Add descriptive labels for screen readers:**

```jsx
// Navigation
<nav aria-label="Main navigation">
  {/* Nav content */}
</nav>

// Button with icon only
<button aria-label="Close dialog">
  <svg>...</svg>
</button>

// Form input
<label htmlFor="email" className="sr-only">Email address</label>
<input 
  id="email" 
  type="email" 
  placeholder="Enter your email"
  aria-required="true"
/>
```

---

## 🧪 Testing Attributes

### Data-TestId Convention

**All interactive and key informational elements MUST include `data-testid` attributes:**

**Naming Convention**: `kebab-case` that defines the element's role, not appearance

**Examples:**

```jsx
// Navigation
<nav data-testid="main-navigation">
<button data-testid="nav-cta-button">
<a data-testid="nav-features-link">

// Hero Section
<section data-testid="hero-section">
<h1 data-testid="hero-headline">
<button data-testid="hero-primary-cta">
<button data-testid="hero-secondary-cta">

// Features
<section data-testid="features-section">
<div data-testid="feature-card-0">
<div data-testid="feature-card-1">

// Value Propositions
<section data-testid="value-props-section">
<div data-testid="value-prop-0">

// Pricing
<section data-testid="pricing-section">
<div data-testid="pricing-card-starter">
<div data-testid="pricing-card-professional">
<div data-testid="pricing-card-enterprise">
<button data-testid="pricing-cta-starter">

// Footer
<footer data-testid="footer">
<a data-testid="footer-link-privacy">
```

---

## 📦 Additional Libraries & Installation

### Required Libraries

**Already Installed:**
- React
- Tailwind CSS
- Shadcn UI components
- Framer Motion
- Lucide React (for icons)

### Lucide React Icons

**Installation**: Already in package.json

**Usage:**
```jsx
import { 
  Zap, 
  BarChart3, 
  Search, 
  Clock, 
  Target, 
  Calendar, 
  Package, 
  MessageSquare,
  ArrowRight,
  Check
} from 'lucide-react';

// In component
<Zap className="w-8 h-8 text-teal-600" />
<ArrowRight className="w-5 h-5" />
```

**Icon Mapping for Features:**
- Extract data: `<Zap />` or `<Database />`
- Chronologies: `<BarChart3 />` or `<Timeline />`
- Indexed access: `<Search />` or `<FileSearch />`
- Quick response: `<Clock />` or `<Zap />`
- Auto-select evidence: `<Target />` or `<Crosshair />`
- Contemporaneous records: `<Calendar />` or `<History />`
- All in one place: `<Package />` or `<Layers />`
- Team discussion: `<MessageSquare />` or `<Users />`

---

## 🎯 Key Messaging & Content Guidelines

### Tagline
**"Records, Records... VeriCase"**

### Main Headline
**"Make Time Your Ally, Not Your Enemy"**

### Subheadline
**"From Chaos to Clarity in Construction Disputes"**

### 8 Core Value Propositions

1. **Extract mass data at the blink of an eye**
   - Focus: Speed, efficiency, automation
   - Tone: Powerful, confident

2. **Build true chronologies nobody else can**
   - Focus: Unique capability, competitive advantage
   - Tone: Bold, distinctive

3. **Intelligently indexed for instant access**
   - Focus: Smart technology, ease of use
   - Tone: Intelligent, accessible

4. **Respond quickly in high-paced adjudications**
   - Focus: Speed, reliability under pressure
   - Tone: Confident, dependable

5. **Auto-select evidence for rebuttals**
   - Focus: AI-powered, time-saving
   - Tone: Innovative, efficient

6. **Uncover years of true contemporaneous records**
   - Focus: Comprehensive, thorough
   - Tone: Trustworthy, complete

7. **All in 1 place: auto-bundle, tag evidence, fileshare**
   - Focus: Unified platform, simplicity
   - Tone: Convenient, integrated

8. **Discuss heads of claims with team members**
   - Focus: Collaboration, teamwork
   - Tone: Cooperative, connected

### Tone of Voice

**Do:**
- Be confident and powerful
- Focus on business outcomes
- Use active, strong verbs
- Emphasize speed and intelligence
- Highlight unique capabilities

**Don't:**
- Use technical jargon (avoid "PST" and similar)
- Be passive or uncertain
- Focus on features over benefits
- Use corporate-speak or buzzwords
- Downplay capabilities

### UK Market Specifics

- Use £ (GBP) for all pricing
- Use British English spelling (e.g., "organisation" not "organization")
- Reference UK legal/construction context where relevant
- Consider UK data protection regulations (GDPR) in messaging

---

## 🚀 Implementation Instructions for Main Agent

### Step 1: Setup & Configuration

1. **Update `tailwind.config.js`:**
```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#E6F7F7',
          100: '#B3EBEB',
          200: '#80DFDF',
          300: '#4DD3D3',
          400: '#1AC7C7',
          500: '#069494',
          600: '#057676',
          700: '#045858',
          800: '#033A3A',
          900: '#021C1C',
        },
        coral: {
          50: '#FFF0ED',
          100: '#FFD4C9',
          200: '#FFB8A5',
          300: '#FF9C81',
          400: '#FF8559',
          500: '#FF7F50',
          600: '#E6673A',
          700: '#CC4F24',
          800: '#B3370E',
          900: '#991F00',
        },
        orange: {
          50: '#FFF4E6',
          100: '#FFE0B3',
          200: '#FFCC80',
          300: '#FFB84D',
          400: '#FFA41A',
          500: '#FD5901',
          600: '#E64F01',
          700: '#CC4501',
          800: '#B33B01',
          900: '#993101',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

2. **Update `index.css`:**
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-body text-gray-600 bg-white;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading text-gray-900;
  }
}
```

### Step 2: Component Structure

**Create these components in `/app/frontend/src/components/`:**

1. `Navigation.js` - Header navigation
2. `Hero.js` - Hero section
3. `Features.js` - Features bento grid
4. `ValueProps.js` - 8 core value propositions
5. `Pricing.js` - Pricing cards
6. `Testimonials.js` - Customer testimonials
7. `CTA.js` - Call-to-action section
8. `Footer.js` - Footer

### Step 3: Responsive Breakpoints

**Use Tailwind's responsive prefixes consistently:**
- `sm:` - 640px and up (mobile landscape, small tablets)
- `md:` - 768px and up (tablets)
- `lg:` - 1024px and up (laptops, desktops)
- `xl:` - 1280px and up (large desktops)

**Mobile-first approach:**
```jsx
// Start with mobile styles, add larger breakpoints
<div className="px-6 md:px-8 lg:px-12">
<h1 className="text-4xl sm:text-5xl lg:text-6xl">
```

### Step 4: Animation Implementation

**Add scroll animations to all major sections:**
```jsx
import { motion } from 'framer-motion';

<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* Section content */}
</motion.section>
```

---

## ✅ Common Mistakes to Avoid

### **Don't:**
1. ❌ Use dark purple, dark blue, dark pink, dark red, dark orange in any gradient
2. ❌ Mix multiple gradient directions in same section
3. ❌ Use gradients on small UI elements
4. ❌ Skip responsive font sizing
5. ❌ Forget hover and focus states
6. ❌ Use cramped spacing (always go generous)
7. ❌ Center-align body text (disrupts reading flow)
8. ❌ Apply universal transitions (breaks transforms)
9. ❌ Use emoji characters for icons
10. ❌ Forget `data-testid` attributes
11. ❌ Use technical jargon in copy
12. ❌ Make sections feel cluttered
13. ❌ Use $ instead of £ for pricing
14. ❌ Ignore mobile-first approach
15. ❌ Skip animation on interactive elements

### **Do:**
1. ✅ Keep gradients for hero sections and major CTAs only (max 20% viewport)
2. ✅ Use solid colors for content and reading areas
3. ✅ Maintain consistent spacing using the spacing system
4. ✅ Test on mobile devices with touch interactions
5. ✅ Include accessibility features (focus states, contrast)
6. ✅ Use the pill/capsule button style for primary actions
7. ✅ Add generous whitespace between sections
8. ✅ Use Lucide React icons consistently
9. ✅ Add `data-testid` to all interactive elements
10. ✅ Focus on business value in messaging
11. ✅ Use £ (GBP) for all pricing
12. ✅ Implement smooth scroll animations
13. ✅ Test keyboard navigation
14. ✅ Optimize images with lazy loading
15. ✅ Follow mobile-first responsive design

---

# General UI UX Design Guidelines

## Critical Rules

### Transitions
- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms

### Text Alignment
- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text

### Icons
- NEVER: use AI assistant Emoji characters like `🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇` etc for icons
- Always use **Lucide React** library already installed in the package.json

## Design Principles

### Spacing
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

### Interactions
- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead.

### Visual Enhancement
- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.

### Component Library
- **IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc
- You **MUST** always use `/app/frontend/src/components/ui/` only as a primary components as these are modern and stylish component

### Export Conventions
- Components MUST use named exports (export const ComponentName = ...)
- Pages MUST use default exports (export default function PageName() {...})

---

**END OF DESIGN GUIDELINES**
