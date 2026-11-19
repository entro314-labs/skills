# Master Design Prompts

> Base prompts engineered to produce genuinely unique, bespoke designs that avoid typical AI patterns.

---

## Table of Contents

1. [Dashboards](#dashboards)
   - [Neobrutalist Dashboard](#1-neobrutalist-dashboard)
   - [Elegant Minimal Dashboard (The Craft/Linear Fusion)](#2-elegant-minimal-dashboard)
   - [Developer-First Dark Dashboard](#3-developer-first-dark-dashboard)
   - [Warm Human Dashboard (Headspace/Airbnb)](#4-warm-human-dashboard)

2. [Landing Pages](#landing-pages)
   - [Neobrutalist Landing Page](#5-neobrutalist-landing-page)
   - [Warm Human Landing Page](#6-warm-human-landing-page)
   - [Editorial/Magazine Landing Page](#7-editorial-magazine-landing-page)
   - [Tech SaaS Premium (Linear/Supabase/Clerk Fusion)](#8-tech-saas-premium-landing-page)
   - [Cinematic Dark Landing Page](#9-cinematic-dark-landing-page)
   - [Playful Geometric Landing Page](#10-playful-geometric-landing-page)

3. [Bonus Styles](#bonus-styles)
   - [Japanese Minimalist](#11-japanese-minimalist)
   - [Swiss Design / International Typographic](#12-swiss-design)
   - [Retro-Futurist](#13-retro-futurist)

---

# Dashboards

---

## 1. Neobrutalist Dashboard

You are a senior product designer specializing in neobrutalist web interfaces. Design a dashboard that rejects polish in favor of raw, intentional ugliness that becomes beautiful through its honesty.

### Core Philosophy
Neobrutalism is NOT just "bold borders and bright colors" - it's a rejection of the homogeneous rounded-corner, soft-shadow SaaS aesthetic. Every element should feel deliberately placed, almost uncomfortably honest about being a UI element.

### Visual System

**Layout Structure:**
- NO rounded corners anywhere. Use `border-radius: 0` globally
- Thick, visible borders: `border: 3px solid black` minimum
- Elements should overlap intentionally using negative margins (`margin-left: -20px`)
- Grid with visible structure - consider showing the grid lines as design elements
- Asymmetric layouts using CSS Grid: `grid-template-columns: 1fr 2fr 1.5fr` (never equal columns)
- Cards stack with visible offset: `transform: translate(4px, 4px)` with solid shadow behind

**Color Palette:**
```css
--bg-primary: #FFFEF0; /* Warm off-white, almost paper */
--bg-secondary: #E8E4D9; /* Kraft paper tan */
--accent-hot: #FF5C00; /* Aggressive orange */
--accent-electric: #0066FF; /* Pure blue */
--accent-acid: #BFFF00; /* Acid green-yellow */
--text-primary: #1A1A1A; /* Near black */
--shadow: #1A1A1A; /* Solid black shadows, NO blur */
```

**Typography:**
- Display: Use a grotesque sans-serif with tight tracking (Space Grotesk, Inter Tight, or Darker Grotesque)
- Headlines: 48-64px, `font-weight: 800`, `letter-spacing: -0.03em`
- Body: 14-16px, `font-weight: 500`
- Labels: ALL CAPS with `letter-spacing: 0.1em`, 11px
- Monospace for all data/numbers (JetBrains Mono, IBM Plex Mono)

**Shadows & Depth:**
```css
/* NO soft shadows. Only hard-offset solid shadows */
.card {
  box-shadow: 4px 4px 0 #1A1A1A;
}
.card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #1A1A1A;
}
/* Or colored shadows for emphasis */
.card-accent {
  box-shadow: 6px 6px 0 #FF5C00;
}
```

**Interactive Elements:**

Buttons:
```css
.btn {
  border: 3px solid black;
  background: #BFFF00;
  padding: 12px 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 4px 4px 0 black;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 black;
}
.btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 black;
}
```

Form inputs:
- Thick borders, no background or very light tint
- Focus state: background becomes accent color, text inverts
- No subtle focus rings - make it obvious

**Data Visualization:**
- Bar charts with solid colors, thick borders around bars
- NO gradients on charts
- Grid lines visible and bold
- Consider "stacked box" visualization instead of traditional charts
- Numbers displayed in large monospace type as the primary visual

**Animation (Minimal & Intentional):**
- Use Framer Motion with `type: "tween"` NOT springs (springs are too "soft")
- Hover: `duration: 0.1`, `ease: "easeOut"` - snappy, not fluid
- Page transitions: hard cuts or very fast slides (200ms max)
- Loading states: rectangular progress bars, not spinners
- Consider intentionally "janky" animations - steps, not easing

**What to Avoid:**
- Rounded corners
- Soft shadows (blur > 0)
- Gradients
- Smooth, buttery animations
- Icons with fill (use stroke-only, 2px minimum)
- Generic card layouts

### Layout Example
```
┌─────────────────────────────────────────────────────────┐
│ [LOGO]  DASHBOARD    PROJECTS    SETTINGS    [■■■ USER]│
├─────────┬───────────────────────────────────────────────┤
│         │                                               │
│ NAV     │  ┌─────────────────┐  ┌─────────────────┐    │
│ ════    │  │ METRIC A        │  │ METRIC B        │    │
│         │  │ ████████████    │  │ ██████          │    │
│ > HOME  │  │ 2,847           │  │ 1,203           │    │
│ > DATA  │  └─────────────────┘  └─────────────────┘    │
│ > USERS │                                               │
│ > LOGS  │  ┌─────────────────────────────────────────┐ │
│         │  │ RECENT ACTIVITY                          │ │
│         │  │ ─────────────────────────────────────── │ │
│         │  │ 12:34  User X did thing                 │ │
│         │  │ 12:33  System event occurred            │ │
│         │  └─────────────────────────────────────────┘ │
└─────────┴───────────────────────────────────────────────┘
```

### Component Requirements
- `<DashboardShell>`: Main layout wrapper with visible grid structure
- `<MetricCard>`: Large number display with thick border, solid shadow
- `<DataTable>`: High-density table with alternating row backgrounds (not subtle gray, use the accent colors)
- `<NavItem>`: Text-only with arrow indicator (`>`) for active state
- `<StatusBadge>`: Uppercase, bordered, solid background colors

### Output
Single React component file. Next.js + TypeScript + Tailwind CSS. No external icon libraries - create simple SVG shapes inline. All animations via CSS transitions or Framer Motion `tween`.

---

## 2. Elegant Minimal Dashboard

You are a senior product designer combining the document-first beauty of Craft.do, the infrastructure clarity of Cal.com, and the micro-interaction polish of Linear.

### Core Philosophy
This dashboard should feel like a "control center for beautiful workspaces" - content-first, spatially aware, with movement that feels physics-based and premium. The opposite of cramped SaaS dashboards.

### Visual System

**Layout Structure:**
- Three-column layout using CSS Grid named areas:
```css
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr 320px;
  grid-template-areas: "sidebar main context";
  height: 100vh;
}
```
- Sidebar: Slim, clear hierarchy (logo, nav sections, spaces/projects)
- Main: Content surface that feels like a "canvas" with generous padding
- Context Panel: Collapsible, shows relevant info based on selection

**Spacing Philosophy:**
- Base unit: 8px
- Component padding: 16-24px
- Section spacing: 32-48px
- "Breathing room" - never let elements touch the edges of their containers

**Color Palette (Light Mode):**
```css
--bg-base: #FAFAFA;
--bg-surface: #FFFFFF;
--bg-elevated: #FFFFFF;
--border-subtle: rgba(0, 0, 0, 0.06);
--border-default: rgba(0, 0, 0, 0.1);
--text-primary: #1A1A1A;
--text-secondary: #666666;
--text-muted: #999999;
--accent: #6366F1; /* Indigo - choose your own */
--accent-soft: rgba(99, 102, 241, 0.1);
```

**Typography:**
- Font family: Inter, SF Pro, or similar neutral sans-serif
- Headings: `font-weight: 600`, never bold (700+)
- Body: `font-weight: 400`, 14-15px
- Labels/meta: `font-weight: 500`, 12-13px, `color: var(--text-secondary)`
- Line height: 1.5 for body, 1.3 for headings

**Shadows & Depth:**
```css
/* Layered shadows for natural depth */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
--shadow-md: 0 2px 4px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04);
--shadow-lg: 0 4px 8px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.04);
--shadow-hover: 0 8px 16px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.06);
```

**Card Styles (Craft.do inspiration):**
- Document/workspace cards with subtle backgrounds and optional "cover" color strips
- Mixed card sizes in grid: combine 1x1, 2x1, 1x2 cards
- Cards can have "style" indicators (minimal, editorial, notebook themes)
- Slight border-radius: 12-16px (NOT 24px - that's too bubbly)

### Animation System (Linear-style)

**Spring Physics Config (Framer Motion):**
```javascript
const springConfig = {
  gentle: { type: "spring", stiffness: 150, damping: 20 },
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  bouncy: { type: "spring", stiffness: 400, damping: 25 },
};
```

**Micro-interactions:**

Card hover:
```jsx
<motion.div
  whileHover={{
    y: -4,
    scale: 1.02,
    boxShadow: "0 8px 16px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.06)"
  }}
  transition={springConfig.gentle}
/>
```

Sidebar item selection:
```jsx
// Animated background pill that slides to selected item
<motion.div
  layoutId="sidebar-indicator"
  className="absolute inset-0 bg-accent-soft rounded-lg"
/>
```

Panel transitions:
```jsx
// Right panel slide
<motion.aside
  initial={{ x: 320, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 320, opacity: 0 }}
  transition={springConfig.snappy}
/>
```

**Custom Cursor Follower:**
```jsx
// Small circle (12px) following cursor with lerp
const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
// Use lerp (0.15 damping) in requestAnimationFrame
// Scale to 24px when hovering interactive elements
```

**Parallax Background Elements:**
- Subtle decorative shapes behind card grid
- Move at 0.3-0.5x scroll speed
- Low opacity (5-10%), large scale

### Interactive Patterns

**Command Palette (⌘K):**
- Modal with scale + opacity entrance (spring)
- Input auto-focused
- Results list with keyboard navigation
- Selected item has animated background (layoutId)

**Document Surface:**
- Feels like editing a beautiful card, not a text editor
- Block-based content (headings, text, callouts, checklists)
- Each block has subtle hover state indicating editability
- Drag handle appears on hover

### Component Requirements
- `<AppShell>`: Grid layout wrapper
- `<Sidebar>`: Navigation with animated selection indicator
- `<CardGrid>`: CSS Grid with mixed card sizes, stagger entrance animation
- `<DocCard>`: Card with optional cover, title, description, style badge
- `<ContextPanel>`: Collapsible side panel with smooth slide animation
- `<CommandPalette>`: Modal with spring animation, keyboard navigation

### Output
Single React component. Next.js + TypeScript + Tailwind. Framer Motion for all animations. CSS Grid with named areas.

---

## 3. Developer-First Dark Dashboard

You are designing a dashboard that feels like a premium developer tool - the aesthetic of Linear, Supabase Studio, and VS Code merged into a cohesive interface.

### Core Philosophy
High information density without feeling cramped. Keyboard-first interactions. Dark UI that's easy on the eyes for extended use. Feels like infrastructure, not consumer software.

### Visual System

**Layout:**
- Classic "IDE" layout: sidebar nav, main content, optional side inspector
- Tabs for different views within main content
- Tables with sticky headers, inline editing
- Code blocks styled like real editors (syntax highlighting, line numbers)

**Color Palette (Dark Mode):**
```css
--bg-base: #0A0A0B;
--bg-surface: #111113;
--bg-elevated: #1A1A1D;
--bg-hover: #222226;
--border-subtle: rgba(255, 255, 255, 0.06);
--border-default: rgba(255, 255, 255, 0.1);
--text-primary: #FAFAFA;
--text-secondary: #A1A1A6;
--text-muted: #666666;
--accent: #10B981; /* Emerald green - dev tool feel */
--accent-glow: rgba(16, 185, 129, 0.2);
--error: #EF4444;
--warning: #F59E0B;
```

**Typography:**
- UI: Inter or SF Pro, 13-14px
- Code/data: JetBrains Mono or Fira Code, 13px
- Labels: 11-12px, uppercase with letter-spacing for categories
- Monospace everywhere data appears (timestamps, IDs, metrics)

**Glassmorphism (Tasteful):**
```css
.panel-glass {
  background: rgba(26, 26, 29, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

**Glow Effects:**
```css
/* Accent glow on focus/active states */
.input:focus {
  box-shadow: 0 0 0 2px var(--accent-glow);
  border-color: var(--accent);
}
/* Subtle glow on important metrics */
.metric-card:hover {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
}
```

### Interactive Patterns

**Table UI:**
- Sticky header with sort indicators
- Row hover: subtle background change
- Row selection: checkbox column, accent background
- Inline editing: click cell to edit
- Pagination or infinite scroll

**Code Editor Region:**
- Monaco-style presentation (even if not functional)
- Line numbers in muted color
- Syntax highlighting for JSON/SQL/JavaScript
- Copy button on hover

**Keyboard Shortcuts:**
- Visible hints throughout UI (⌘K, ⌘/, etc.)
- Command palette for all actions
- Vim-style navigation optional

### Animation

**Minimal, Functional Motion:**
```javascript
const devSpring = {
  type: "spring",
  stiffness: 500,
  damping: 35,
};
```
- Fast transitions (150-200ms)
- Loading skeletons with shimmer
- Toast notifications slide in from corner
- Panel expansions are instant or very fast

### Component Requirements
- `<DevShell>`: IDE-style layout
- `<DataTable>`: High-density table with all features
- `<CodeBlock>`: Styled code display with copy button
- `<MetricCard>`: KPI display with optional sparkline
- `<LogViewer>`: Time-series log display with filters
- `<CommandBar>`: Top bar with keyboard shortcut hints

---

## 4. Warm Human Dashboard

You are designing a dashboard that feels like Headspace meets Airbnb - warm, friendly, and focused on human outcomes rather than raw data.

### Core Philosophy
Data should feel like encouragement, not judgment. Empty states are invitations. Progress is celebrated. The interface should feel like a supportive companion, not a demanding tool.

### Visual System

**Color Palette:**
```css
--bg-base: #FDF9F6; /* Warm cream */
--bg-surface: #FFFFFF;
--bg-accent: #FFF4ED; /* Soft peach tint */
--text-primary: #2D2A26; /* Warm dark brown */
--text-secondary: #6B6560;
--accent-primary: #FF7F5C; /* Warm coral */
--accent-secondary: #7CB798; /* Soft sage green */
--accent-tertiary: #5B8DEF; /* Friendly blue */
--success: #7CB798;
--warning: #F5A623;
```

**Typography:**
- Headlines: Serif font (Fraunces, Lora, Tiempos) - warmth and humanity
- Body: Sans-serif (Inter, General Sans) - readability
- Numbers: Slightly playful, rounded numerals if available

**Shapes & Corners:**
- Very rounded: `border-radius: 20-24px` for cards
- Blob shapes as decorative elements
- Organic, not geometric

**Illustrations:**
- Simple, friendly character illustrations or icons
- Organic blob shapes in backgrounds
- Warm gradient fills

### Data Presentation

**Gentle Gamification:**
- Streaks displayed prominently but not pressingly
- Progress rings instead of progress bars
- Achievements as friendly badges
- "You're doing great" states

**Charts:**
- Soft colors, rounded line caps
- Area charts with gradient fills
- No aggressive grid lines
- Labels are conversational ("This week you...")

### Animation

**Gentle Motion:**
```javascript
const warmSpring = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};
```
- Slow, nurturing transitions (400-600ms)
- Bounce on achievement unlock
- Gentle fades for page transitions
- Numbers count up slowly with ease-out

**Hover States:**
- Subtle lift (4px) with soft shadow increase
- Scale: 1.02 maximum
- Color shift: slightly warmer/lighter

### Component Requirements
- `<WarmShell>`: Layout with decorative background elements
- `<StreakCard>`: Celebrates ongoing engagement
- `<ProgressRing>`: Circular progress with gradient fill
- `<FriendlyMetric>`: Stat with encouraging label
- `<EmptyState>`: Warm illustration with inviting copy
- `<AchievementBadge>`: Unlockable reward display

---

# Landing Pages

---

## 5. Neobrutalist Landing Page

Apply the neobrutalist dashboard aesthetic to a marketing page. Same principles: thick borders, solid shadows, zero border-radius, intentional "ugliness."

### Additional Landing Page Elements

**Hero:**
- Massive headline (80-120px) in tight tracking
- Hard offset shadow on headline text
- Product screenshot with thick black border, angled 5-10 degrees
- CTA button with solid shadow, caps text

**Marquee:**
- Infinite scroll text (GSAP, `repeat: -1, ease: "none"`)
- Thick border top and bottom
- ALL CAPS, spaced letters
- Consider dual rows moving opposite directions

**Feature Sections:**
- Asymmetric grid: `grid-template-columns: 1fr 2fr` or `2fr 1fr`
- Feature cards with colored solid shadows (not all black)
- Numbers displayed huge as design elements

**Social Proof:**
- Logo wall with thick borders around each logo
- Testimonial cards with offset shadow, bold quote marks
- Stats displayed in huge monospace numbers

### What to Avoid
- Rounded testimonial cards
- Gradient backgrounds
- Smooth scroll (use native or intentionally "sticky" scroll)
- Generic icon sets

---

## 6. Warm Human Landing Page

Based on the Human-Centered Design Spec. For products like Headspace, wellness apps, home services, education platforms.

### Layout Philosophy
- Generous whitespace (150-200px between sections)
- Asymmetric two-column layouts (40/60 or 60/40)
- Overlapping elements with z-index layering
- Editorial-style image placements that break the grid

### Visual Elements

**Hero:**
- Large headline in serif font (54-72px)
- Single supporting paragraph
- One prominent CTA (not competing buttons)
- Large illustration or photography (60% width)
- Floating decorative circles in background

**Background Elements:**
- Large floating circles (soft gradients, semi-transparent)
- Paper texture at 3% opacity
- Organic blob shapes with soft edges
- Colored mountain/wave illustrations as section dividers

**Cards:**
- Large padding (40-60px)
- Very rounded corners (24px)
- Subtle hover lift (4px)
- Optional organic icon accent

### Animation

**Scroll Behavior (Lenis):**
```javascript
const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.2,
});
```

**Reveals:**
- Intersection Observer with `rootMargin: "-10%"` (earlier trigger)
- Fade + subtle translateY (20px → 0)
- Staggered delays: 150ms (slower than aggressive SaaS)
- Images: fade + scale (0.95 → 1)

**Continuous Motion:**
- Floating circles orbit slowly (4-6s per rotation)
- Background gradients shift (20s loop)
- Gentle pulse on accent elements (scale 1 → 1.03, 4s loop)

### Typography

**Display:**
- Serif for headlines: Fraunces, Tiempos, Lora
- Comfortable line-height (1.2)
- Warm gradient text optional (peach to coral)

**Body:**
- Sans-serif: Inter, General Sans
- Generous line-height (1.7)
- 70 character max line length

### Color Palette
```css
--bg: #F8F6F3; /* Warm cream */
--text: #2B2B2B; /* Earth brown */
--accent-coral: #FF7F6E;
--accent-sage: #6EC1B5;
--accent-lavender: #B4A7D6;
```

---

## 7. Editorial/Magazine Landing Page

For content-focused products, media brands, or when you want the page itself to feel like a designed publication.

### Layout Philosophy
- Newspaper/magazine grid with varied column spans
- Pull quotes and callouts that break the flow
- Images that bleed off-grid
- Section dividers as designed elements

### Grid System
```css
.editorial-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
/* Content spans vary: 5-7 columns, offset from center */
.article-body {
  grid-column: 2 / 8;
}
.pull-quote {
  grid-column: 8 / 12;
  margin-top: -100px; /* Overlap */
}
```

### Typography (The Star)
- Multiple font families: Serif for headlines, sans for body
- Dramatic size contrast: 96px headlines, 16px body
- Drop caps on opening paragraphs
- Pull quotes in italic serif, oversized
- Bylines and datelines in small caps

### Visual Treatments
- Images with art-directed crops (not generic rectangles)
- Duotone or color overlay treatments
- Text wrapping around images
- Dividers: thick lines, decorative symbols, or whitespace

### Animation
- Minimal - let typography do the work
- Page scroll reveals for images
- Parallax on full-bleed images
- Subtle hover on interactive elements only

---

## 8. Tech SaaS Premium Landing Page

Fusion of Linear, Supabase, Clerk - the best of modern dev-focused marketing with EXTRA polish.

### Core Philosophy
Every element should feel like it was meticulously crafted. The page should feel like a demo of the product's quality. Premium through attention to detail, not through flashiness.

### Layout

**Hero:**
- Left: Tight headline + short subcopy (dev/infra tone)
- Right: Layered product mockup at slight angle
- Use 12-column CSS Grid with named areas
- NO 3-column feature card row (the most generic pattern)

**Subsequent Sections:**
- Alternating layouts, never the same pattern twice
- Full-bleed dark sections with light content sections
- "Sections that breathe" - each feels like a standalone story

### Visual System

**Color (Dark + Accent):**
```css
--bg-dark: #0A0A0B;
--bg-section: #111113;
--text-light: #FAFAFA;
--accent: #10B981; /* Or brand-specific */
--accent-glow: rgba(16, 185, 129, 0.15);
--gradient-start: #6366F1;
--gradient-end: #10B981;
```

**Glassmorphism:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
}
```

**Glow Effects:**
```css
.accent-glow {
  box-shadow: 0 0 40px rgba(16, 185, 129, 0.2);
}
.text-glow {
  text-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
}
```

### Technical Showcases (The Differentiator)

**Canvas Particle System:**
```javascript
// Mouse-reactive particles in hero
// Particles drift, attract toward cursor
// force = 50 / Math.pow(distance, 2)
// Trail effect with semi-transparent clear
```

**SVG Path Drawing:**
```javascript
// Network/connection lines that draw on scroll
// stroke-dasharray: pathLength
// stroke-dashoffset: pathLength → 0
// duration: 1.5s, ease: "power2.out"
```

**Animated Data Visualization:**
- Line graphs with animated path drawing
- Force-directed node graphs (d3-force)
- Interactive grids that morph on hover

**Custom Cursor:**
```javascript
// 20px circle, position: fixed
// Lerp to mouse position (0.15 damping)
// Scale 1.5x on hover over interactive elements
// mix-blend-mode: difference (optional)
```

### Animation System

**Scroll Effects (Lenis + GSAP):**
```javascript
// Smooth scroll with velocity tracking
// Velocity-based blur: filter: blur(${velocity * 0.3}px)
// Parallax layers at different speeds
```

**Framer Motion Springs:**
```javascript
const premiumSpring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};
```

**Entrance Animations:**
- Hero content staggers in (100ms delay between elements)
- Product mockups parallax into view
- Feature cards reveal with y-translation + opacity
- Integration logos pop in with scale

**Hover States:**
- Cards: translateY(-8px), shadow depth increase
- Buttons: scale(1.05) with spring easing
- Code blocks: subtle glow
- Integration badges: rotate(-2deg)

### Interactive Components

**Dashboard Mockup:**
- Position at 45° angle: `transform: rotateX(-15deg) rotateY(15deg)`
- Multi-layer shadows for depth
- "Live" state: blinking indicators, updating timestamps
- Internal charts that animate

**Code Blocks:**
- Syntax highlighting with brand colors
- Line numbers
- Copy button with success feedback
- Cursor blink animation

**Comparison Table:**
- Animated checkmarks appearing on scroll
- Hover row highlighting

### Typography

**Display:**
- Large headings: 72-120px
- Gradient text: `background: linear-gradient; -webkit-background-clip: text`
- Tight line-height: 1.1

**Technical:**
- Monospace for code, metrics, technical terms
- Uppercase labels with `letter-spacing: 0.1em`

---

## 9. Cinematic Dark Landing Page

Linear's "liquid glass" aesthetic taken further. For products that want to feel like a movie, not a website.

### Layout Philosophy
- Maximum negative space
- One visual focus per viewport
- Sparse content - every word counts
- Depth-of-field feeling with blur layers

### Visual System

**Background:**
- Pure black or near-black (#050505)
- Subtle noise texture at 3% opacity
- Gradient orbs in background (very low opacity, large scale)
- Multiple blur layers at different depths

**Glass Panels:**
```css
.glass-hero {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

**Light Effects:**
- Product shots with simulated studio lighting
- Rim lights on edges of glass elements
- Accent color glows behind key elements

### Animation

**Scroll (Lenis with slow lerp):**
```javascript
const lenis = new Lenis({
  lerp: 0.07, // Slower for cinematic feel
  duration: 1.5,
});
```

**Parallax Layers:**
- Background orbs: 0.3x scroll speed
- Product mockups: 0.8x scroll speed
- Text: 1x (normal)
- Creates depth as you scroll

**Subtle Continuous Motion:**
- Glass panels shift with mouse position (2-3px max)
- Background gradients slowly pulse (20s cycle)
- Occasional light "flare" across glass surfaces

### Typography
- Minimal text - large, impactful headlines only
- Font-weight animation on scroll into view (300 → 500)
- Consider animated letter-spacing on hover

---

## 10. Playful Geometric Landing Page

For creative tools, design products, or when you want energetic optimism.

### Layout Philosophy
- Overlapping geometric shapes as structural elements
- Rotated containers (2-5 degrees)
- Shapes that extend beyond their containers
- Grid that shifts at different breakpoints

### Visual System

**Shapes:**
- Circles, triangles, rounded rectangles
- Shapes overlap and intersect
- Use shapes as containers for content
- Animated shapes in background

**Color:**
```css
--blue: #3B82F6;
--pink: #EC4899;
--yellow: #FBBF24;
--green: #10B981;
--purple: #8B5CF6;
/* Use boldly - this is playful */
```

**Texture:**
- Subtle noise overlay
- Gradient meshes
- Consider halftone dots or patterns

### Animation

**Energetic but Controlled:**
```javascript
const playfulSpring = {
  type: "spring",
  stiffness: 200,
  damping: 15, // Lower damping = more bounce
};
```

**Shape Animations:**
- Shapes rotate slowly (30s per rotation)
- Shapes scale on scroll
- Intersecting shapes animate when interacting

**Hover States:**
- More dramatic: scale(1.1), rotate(5deg)
- Color shifts
- Shapes "react" to cursor proximity

---

# Bonus Styles

---

## 11. Japanese Minimalist

Inspired by muji, Japanese design principles, and wabi-sabi aesthetics.

### Core Principles
- Ma (negative space) is as important as content
- Asymmetry over symmetry
- Natural materials feeling (wood, paper, stone textures)
- Imperfection as beauty

### Visual System

**Colors:**
```css
--bg: #FAF9F7; /* Rice paper */
--text: #1A1A1A;
--accent: #C7372F; /* Vermillion red */
--secondary: #2D5A4A; /* Forest green */
--stone: #8B8680;
```

**Typography:**
- Consider mixing Japanese-influenced type with Western
- Extreme size contrast
- Vertical text optional for accents

**Layout:**
- Massive whitespace
- Off-center compositions
- Single focal point per section
- Grid-breaking placements

### Animation
- Nearly imperceptible transitions
- Fades that take 800ms+
- Movement like paper settling

---

## 12. Swiss Design

International Typographic Style. Grid perfection, typography as the design system.

### Core Principles
- The grid is sacred
- Typography IS the design
- Objectivity and clarity
- No decoration for decoration's sake

### Visual System

**Grid:**
```css
.swiss-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}
/* Mathematical precision in all placements */
```

**Typography:**
- Helvetica, Univers, Akzidenz-Grotesk
- Headlines: Bold, tight tracking, possibly rotated
- Body: Regular weight, generous leading
- All text on baseline grid

**Colors:**
- Black, white, one accent (red, blue)
- No gradients
- Color as information, not decoration

**Layout:**
- Strong horizontal and vertical lines
- Photos cropped to grid
- Text aligned to invisible baseline grid

### Animation
- Minimal to none
- If any: precise, mechanical movements
- No easing - linear only

---

## 13. Retro-Futurist

Bridging 1960s space-age optimism with modern capabilities.

### Visual System

**Colors:**
```css
--bg: #0D1B2A; /* Deep space navy */
--text: #E0E1DD;
--orange: #F77F00;
--teal: #00B4D8;
--cream: #EAE2B7;
```

**Typography:**
- Geometric sans-serifs (Futura, Avant Garde)
- Stencil fonts for headings
- ALL CAPS with wide letter-spacing
- Retro numerals

**Elements:**
- Atomic/orbit motifs
- Starburst shapes
- Oval and pill shapes
- Diagonal lines and stripes

### Animation
- Orbiting elements
- Pulsing glows
- "Scanning" line effects
- Typewriter text reveal

---

# Usage Notes

## How to Use These Prompts

1. **Select the appropriate prompt** for your use case
2. **Customize the product description** where indicated
3. **Specify your tech stack** if different from defaults
4. **Add specific features** you need for your product
5. **Request section-by-section** implementation for best results

## Iteration Strategy

Per the AI insight you gathered:
- Iterate section by section rather than requesting full pages
- Reject first output if it feels generic - demand structural changes
- Ask for specific animation libraries/techniques upfront
- Provide screenshot references alongside text prompts when possible

## Technical Defaults

Unless specified otherwise, prompts assume:
- Next.js + React + TypeScript
- Tailwind CSS
- Framer Motion for animations
- Output as single React component file

## Anti-Patterns to Avoid

Always explicitly tell the AI to NOT do these:
- 3-column equal-width feature card grids
- Centered hero with text-over-image
- Generic rounded cards with soft shadows
- Gradient backgrounds with floating shapes (unless intentional)
- Stock icon libraries (Heroicons, Lucide as generic)
- "Trust the process" / "Built with love" style copy
