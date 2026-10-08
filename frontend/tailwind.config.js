/** @type {import('tailwindcss').Config} */
// Design system: "The Working Record". Tokens mirror the CSS variables in src/index.css.
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2.5rem' },
      screens: { '2xl': '1280px' },
    },
    // Only the weights that are loaded exist, so nothing can be synthesised.
    fontWeight: { normal: '400', medium: '500', semibold: '600' },
    extend: {
      colors: {
        ink: { DEFAULT: '#132842', 950: '#0A1424' },
        navy: '#0F1F36',
        graphite: '#515A68',
        mist: '#BAC2CE',
        azure: { 50: '#FFEDE2', 300: '#FF8C4A', 500: '#E0601F', 700: '#C2410C' },
        parchment: { DEFAULT: '#F4F5F7', 300: '#E8EBEF' },
        paper: '#FFFFFF',
        rule: { DEFAULT: '#D4D9E0', strong: '#6E7886' },
        brass: { 400: '#FF7D33', 700: '#B4441A' },
        signal: { DEFAULT: '#A8352A', 300: '#EE8E7E' },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        display: ['"Newsreader"', '"Newsreader Fallback"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', '"IBM Plex Sans Fallback"', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"IBM Plex Mono Fallback"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        masthead: ['clamp(1.875rem, 0.529rem + 5.524vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        numeral: ['clamp(4rem, 2.514rem + 6.095vw, 8rem)', { lineHeight: '0.9' }],
        display: ['clamp(2.25rem, 1.507rem + 3.048vw, 4.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h2: ['clamp(2rem, 1.536rem + 1.905vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        h3: ['clamp(1.375rem, 1.236rem + 0.571vw, 1.75rem)', { lineHeight: '1.2' }],
        stat: ['clamp(1.875rem, 1.457rem + 1.714vw, 3rem)', { lineHeight: '1.05' }],
        lead: ['clamp(1.125rem, 1.056rem + 0.286vw, 1.3125rem)', { lineHeight: '1.55' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        small: ['0.9375rem', { lineHeight: '1.55' }],
        caption: ['0.875rem', { lineHeight: '1.5' }],
        meta: ['0.8125rem', { lineHeight: '1.45' }],
        label: ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.08em' }],
      },
      borderRadius: { none: '0', sm: '2px', DEFAULT: '2px', md: '4px', lg: 'var(--radius)' },
      boxShadow: { paper: 'var(--shadow-paper)', lift: 'var(--shadow-lift)' },
      // At most about 75 characters a line in IBM Plex Sans (68ch allowed about 89).
      maxWidth: { measure: '56ch' },
      transitionTimingFunction: {
        settle: 'cubic-bezier(0.2,0,0,1)',
        exit: 'cubic-bezier(0.4,0,1,1)',
        glide: 'cubic-bezier(0.45,0,0.2,1)',
      },
      // Bespoke keyframes (word-settle, slip-fade, lens-sweep, rule-draw, stamp) live in index.css.
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 200ms ease-out',
        'accordion-up': 'accordion-up 200ms ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
