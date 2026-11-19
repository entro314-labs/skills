# Warm Human Dashboard: Brief

The short version of this style. The exhaustive specification starts at [index.md](index.md).

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
