# Warm Human Dashboard - Exhaustive Technical Specification

Generate a complete, production-ready dashboard application using Next.js, TypeScript, Tailwind CSS, and Motion. This specification defines every visual element, animation parameter, and interactive behavior. Do not deviate from these values.

**Design Inspiration:** Headspace (gentle, nurturing), Airbnb (warm hospitality), Calm (soothing), Duolingo (encouraging gamification), Apple Health (friendly data).

**Core Philosophy:** Data should feel like encouragement, not judgment. Empty states are invitations. Progress is celebrated. The interface should feel like a supportive companion, not a demanding tool. Prioritize emotional wellbeing over information density.

**Target Products:** Wellness apps, habit trackers, fitness dashboards, meditation apps, learning platforms, personal finance (friendly), journaling apps, mental health tracking, goal-setting tools.

---

## Output Requirements

- Single React component (or page with imported components)
- Next.js with App Router
- TypeScript strict mode
- Tailwind CSS for all styling
- Motion for gentle animations
- Light mode primary (dark mode optional)
- Mobile-first responsive design
- Include decorative background elements

---

## Dashboard Structure Overview

The dashboard consists of these elements:
1. Top Navigation (greeting + profile)
2. Today's Summary Section
3. Streak/Progress Cards
4. Goals/Habits Grid
5. Achievements Section
6. Insights/Charts
7. Motivational Empty States

---

## Color System

### CSS Custom Properties
```css
:root {
  /* Backgrounds */
  --bg-base: #FDF9F6;            /* Warm cream - page background */
  --bg-surface: #FFFFFF;          /* Cards, panels */
  --bg-elevated: #FFFFFF;         /* Modals, popovers */
  --bg-accent: #FFF4ED;           /* Soft peach tint - highlights */
  --bg-accent-secondary: #F0F7F4; /* Soft sage tint */
  --bg-accent-tertiary: #EEF4FD;  /* Soft blue tint */
  --bg-muted: #FAF6F3;            /* Subtle sections */

  /* Text */
  --text-primary: #2D2A26;        /* Warm dark brown - headlines */
  --text-secondary: #6B6560;      /* Body text */
  --text-muted: #9A9590;          /* Captions, labels */
  --text-inverse: #FFFFFF;        /* On colored backgrounds */
  --text-accent: #E85D3B;         /* Accent text */

  /* Accent Colors - Warm & Friendly */
  --accent-coral: #FF7F5C;        /* Primary accent - warm coral */
  --accent-coral-hover: #F06C48;
  --accent-coral-soft: rgba(255, 127, 92, 0.1);
  --accent-coral-softer: rgba(255, 127, 92, 0.05);

  --accent-sage: #7CB798;         /* Success, positive - sage green */
  --accent-sage-hover: #6AA588;
  --accent-sage-soft: rgba(124, 183, 152, 0.1);

  --accent-blue: #5B8DEF;         /* Info, links - friendly blue */
  --accent-blue-soft: rgba(91, 141, 239, 0.1);

  --accent-gold: #F5A623;         /* Achievements, stars */
  --accent-gold-soft: rgba(245, 166, 35, 0.15);

  --accent-lavender: #A78BFA;     /* Meditation, calm - soft purple */
  --accent-lavender-soft: rgba(167, 139, 250, 0.1);

  /* Semantic Colors */
  --success: #7CB798;
  --success-soft: rgba(124, 183, 152, 0.15);
  --warning: #F5A623;
  --warning-soft: rgba(245, 166, 35, 0.15);
  --error: #E85D3B;
  --error-soft: rgba(232, 93, 59, 0.15);

  /* Gradients */
  --gradient-warm: linear-gradient(135deg, #FFE4D9 0%, #FFD5C8 100%);
  --gradient-sage: linear-gradient(135deg, #D4EDE0 0%, #C4E3D4 100%);
  --gradient-sunset: linear-gradient(135deg, #FF7F5C 0%, #F5A623 100%);
  --gradient-calm: linear-gradient(135deg, #A78BFA 0%, #7CB798 100%);
  --gradient-progress: linear-gradient(90deg, #7CB798 0%, #5B8DEF 100%);

  /* Shadows - Soft & Warm */
  --shadow-sm: 0 2px 8px rgba(45, 42, 38, 0.04);
  --shadow-md: 0 4px 16px rgba(45, 42, 38, 0.06);
  --shadow-lg: 0 8px 32px rgba(45, 42, 38, 0.08);
  --shadow-xl: 0 16px 48px rgba(45, 42, 38, 0.10);
  --shadow-coral: 0 4px 16px rgba(255, 127, 92, 0.2);
  --shadow-hover: 0 12px 40px rgba(45, 42, 38, 0.10);

  /* Borders */
  --border-subtle: rgba(45, 42, 38, 0.06);
  --border-default: rgba(45, 42, 38, 0.10);

  /* Focus */
  --focus-ring: 0 0 0 3px rgba(255, 127, 92, 0.25);
}
```

### Tailwind Theme
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-cream-50: #FFFDFB;
  --color-cream-100: #FDF9F6;
  --color-cream-200: #FAF6F3;
  --color-cream-300: #F5F0EC;
  --color-warm-brown-900: #2D2A26;
  --color-warm-brown-700: #4A4540;
  --color-warm-brown-500: #6B6560;
  --color-warm-brown-300: #9A9590;
  --color-coral-50: rgba(255, 127, 92, 0.05);
  --color-coral-100: rgba(255, 127, 92, 0.1);
  --color-coral-200: #FFCAB8;
  --color-coral-400: #FF9A7D;
  --color-coral-500: #FF7F5C;
  --color-coral-600: #F06C48;
  --color-sage-50: rgba(124, 183, 152, 0.1);
  --color-sage-100: #D4EDE0;
  --color-sage-200: #B8DFC8;
  --color-sage-400: #8FC7A6;
  --color-sage-500: #7CB798;
  --color-sage-600: #6AA588;
  --color-friendly-blue: #5B8DEF;
  --color-friendly-gold: #F5A623;
  --color-friendly-lavender: #A78BFA;

  --font-serif: Fraunces, Lora, Georgia, serif;
  --font-sans: Inter, "General Sans", system-ui, sans-serif;

  --text-display: 36px;
  --text-display--line-height: 1.2;
  --text-display--letter-spacing: -0.02em;
  --text-heading-lg: 28px;
  --text-heading-lg--line-height: 1.25;
  --text-heading-lg--letter-spacing: -0.01em;
  --text-heading-md: 24px;
  --text-heading-md--line-height: 1.3;
  --text-heading-md--letter-spacing: -0.01em;
  --text-heading-sm: 20px;
  --text-heading-sm--line-height: 1.35;
  --text-title: 18px;
  --text-title--line-height: 1.4;
  --text-body-lg: 16px;
  --text-body-lg--line-height: 1.6;
  --text-body: 15px;
  --text-body--line-height: 1.6;
  --text-body-sm: 14px;
  --text-body-sm--line-height: 1.5;
  --text-caption: 13px;
  --text-caption--line-height: 1.4;
  --text-label: 12px;
  --text-label--line-height: 1.4;
  --text-label--letter-spacing: 0.02em;

  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-3xl: 24px;
  --radius-4xl: 32px;
  --radius-blob: 60% 40% 30% 70% / 60% 30% 70% 40%;

  --spacing-safe: env(safe-area-inset-bottom);

  --animate-float: float 6s ease-in-out infinite;
  --animate-pulse-soft: pulse-soft 3s ease-in-out infinite;
  --animate-bounce-gentle: bounce-gentle 0.6s ease-out;
  --animate-count-up: count-up 1s ease-out;
  --animate-confetti: confetti 0.8s ease-out forwards;

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulse-soft {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  @keyframes bounce-gentle {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes confetti {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    100% { transform: scale(1) rotate(360deg); opacity: 0; }
  }
}

/* No theme entry needed in v4: spacing 18, spacing 22 */
```

---

## Typography System

### Font Stack
```css
/* Serif - Headlines (Warmth & Humanity) */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap');

/* Sans - Body (Readability) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### Typography Classes
```css
/* Display Headlines - Serif */
.heading-display {
  font-family: var(--font-serif);
  font-size: 36px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.heading-lg {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.heading-md {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.heading-sm {
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
}

/* Body Text */
.body-lg {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.body {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.body-sm {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Labels & Captions */
.caption {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-muted);
}

.label {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* Numbers - Friendly */
.stat-number {
  font-family: var(--font-serif);
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--text-primary);
}

/* Encouraging Text */
.encouraging {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent-coral);
}
```

---

## Layout System

### App Shell
```tsx
<div className="warm-shell">
  {/* Decorative Background Elements */}
  <div className="background-decorations">
    <div className="blob blob-1" />
    <div className="blob blob-2" />
    <div className="blob blob-3" />
  </div>

  {/* Content */}
  <div className="content-wrapper">
    <header className="top-nav">...</header>
    <main className="main-content">...</main>
    <nav className="bottom-nav">...</nav>
  </div>
</div>
```

```css
.warm-shell {
  min-height: 100vh;
  background: var(--bg-base);
  position: relative;
  overflow-x: hidden;
}

.background-decorations {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.blob {
  position: absolute;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  filter: blur(60px);
  opacity: 0.4;
  animation: float 8s ease-in-out infinite;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(255, 127, 92, 0.15) 0%, rgba(255, 127, 92, 0.05) 100%);
  top: -10%;
  right: -10%;
  animation-delay: 0s;
}

.blob-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(124, 183, 152, 0.15) 0%, rgba(124, 183, 152, 0.05) 100%);
  bottom: 20%;
  left: -8%;
  animation-delay: -2s;
}

.blob-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(167, 139, 250, 0.05) 100%);
  top: 40%;
  right: -5%;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
}

@media (min-width: 768px) {
  .content-wrapper {
    max-width: 800px;
    padding: 0 40px;
    padding-bottom: 40px;
  }
}
```

---

## Component Specifications

### Top Navigation (Greeting)

```tsx
<header className="top-nav">
  <div className="greeting-section">
    <div className="time-greeting">Good morning,</div>
    <h1 className="user-name">Sarah</h1>
  </div>

  <div className="nav-actions">
    <button className="notification-btn">
      <BellIcon />
      {hasNotifications && <span className="notification-dot" />}
    </button>
    <button className="profile-btn">
      <img src={avatar} alt="" className="avatar" />
    </button>
  </div>
</header>
```

```css
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 24px;
}

.greeting-section {
  display: flex;
  flex-direction: column;
}

.time-greeting {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.user-name {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 500;
  color: var(--text-primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.notification-btn,
.profile-btn {
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-surface);
  border: none;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s ease;
}

.notification-btn:hover,
.profile-btn:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.notification-btn svg {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
}

.notification-dot {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 8px;
  height: 8px;
  background: var(--accent-coral);
  border: 2px solid var(--bg-surface);
  border-radius: 50%;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
```

---

### Today's Summary Card

```tsx
<motion.div
  className="summary-card"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  <div className="summary-header">
    <span className="summary-label">Today's Progress</span>
    <span className="summary-date">December 12</span>
  </div>

  <div className="summary-content">
    <div className="summary-main">
      <p className="summary-message">
        You're on a roll! <span className="encouraging">Keep it up.</span>
      </p>
    </div>

    <div className="summary-stats">
      <div className="summary-stat">
        <span className="stat-value">3/5</span>
        <span className="stat-label">Goals completed</span>
      </div>
      <div className="summary-stat">
        <span className="stat-value">15</span>
        <span className="stat-label">Minutes meditated</span>
      </div>
    </div>
  </div>

  <div className="summary-progress">
    <div className="progress-bar">
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        animate={{ width: '60%' }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      />
    </div>
  </div>
</motion.div>
```

```css
.summary-card {
  background: var(--gradient-warm);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.summary-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-date {
  font-size: 13px;
  color: var(--text-muted);
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-message {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.3;
}

.summary-stats {
  display: flex;
  gap: 24px;
}

.summary-stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.summary-progress {
  margin-top: 20px;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-coral);
  border-radius: 4px;
}
```

---

### Streak Card

```tsx
<motion.div
  className="streak-card"
  whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
>
  <div className="streak-icon">
    <FlameIcon />
  </div>

  <div className="streak-content">
    <div className="streak-number">
      <motion.span
        key={streakCount}
        initial={{ scale: 1.2, color: '#F5A623' }}
        animate={{ scale: 1, color: '#2D2A26' }}
        transition={{ duration: 0.4 }}
      >
        {streakCount}
      </motion.span>
    </div>
    <div className="streak-label">day streak</div>
    <p className="streak-message">
      Amazing! You've been consistent for {streakCount} days.
    </p>
  </div>

  <div className="streak-calendar">
    {weekDays.map((day, index) => (
      <div
        key={index}
        className={`calendar-day ${day.completed ? 'completed' : ''} ${day.today ? 'today' : ''}`}
      >
        <span className="day-letter">{day.letter}</span>
        {day.completed && <CheckIcon />}
      </div>
    ))}
  </div>
</motion.div>
```

```css
.streak-card {
  background: var(--bg-surface);
  border-radius: 24px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.streak-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-gold-soft);
  border-radius: 16px;
  margin-bottom: 16px;
}

.streak-icon svg {
  width: 28px;
  height: 28px;
  color: var(--accent-gold);
}

.streak-content {
  margin-bottom: 20px;
}

.streak-number {
  font-family: var(--font-serif);
  font-size: 48px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1;
}

.streak-label {
  font-size: 18px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.streak-message {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 8px;
}

.streak-calendar {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background: var(--bg-muted);
  border-radius: 16px;
}

.calendar-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.day-letter {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
}

.calendar-day .check-circle {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-surface);
  border: 2px solid var(--border-default);
  border-radius: 50%;
}

.calendar-day.completed .check-circle {
  background: var(--accent-sage);
  border-color: var(--accent-sage);
}

.calendar-day.completed svg {
  width: 16px;
  height: 16px;
  color: white;
}

.calendar-day.today {
  position: relative;
}

.calendar-day.today::after {
  content: '';
  position: absolute;
  bottom: -8px;
  width: 4px;
  height: 4px;
  background: var(--accent-coral);
  border-radius: 50%;
}
```

---

### Progress Ring

```tsx
const ProgressRing = ({ progress, size = 120, strokeWidth = 8, color = 'coral' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring-wrapper" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          className="progress-ring-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle */}
        <motion.circle
          className={`progress-ring-progress ${color}`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
          }}
        />
      </svg>

      <div className="progress-ring-content">
        <motion.span
          className="progress-ring-value"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        >
          {progress}%
        </motion.span>
      </div>
    </div>
  );
};
```

```css
.progress-ring-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring-bg {
  fill: none;
  stroke: var(--bg-muted);
}

.progress-ring-progress {
  fill: none;
  stroke-linecap: round;
}

.progress-ring-progress.coral {
  stroke: url(#gradient-coral);
}

.progress-ring-progress.sage {
  stroke: var(--accent-sage);
}

.progress-ring-progress.blue {
  stroke: var(--accent-blue);
}

/* SVG Gradient Definition */
<defs>
  <linearGradient id="gradient-coral" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stopColor="#FF7F5C" />
    <stop offset="100%" stopColor="#F5A623" />
  </linearGradient>
</defs>

.progress-ring-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.progress-ring-value {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
}
```

---

### Goals Grid

```tsx
<section className="goals-section">
  <div className="section-header">
    <h2 className="section-title">Today's Goals</h2>
    <button className="add-goal-btn">
      <PlusIcon />
    </button>
  </div>

  <div className="goals-grid">
    {goals.map((goal, index) => (
      <motion.div
        key={goal.id}
        className={`goal-card ${goal.completed ? 'completed' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
        onClick={() => toggleGoal(goal.id)}
      >
        <div className={`goal-icon ${goal.category}`}>
          <goal.icon />
        </div>
        <h3 className="goal-title">{goal.title}</h3>
        <p className="goal-subtitle">{goal.subtitle}</p>
        <div className="goal-progress">
          <div
            className="goal-progress-fill"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
        {goal.completed && (
          <motion.div
            className="goal-check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <CheckIcon />
          </motion.div>
        )}
      </motion.div>
    ))}
  </div>
</section>
```

```css
.goals-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--text-primary);
}

.add-goal-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-coral-soft);
  border: none;
  border-radius: 50%;
  color: var(--accent-coral);
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-goal-btn:hover {
  background: var(--accent-coral);
  color: white;
  transform: scale(1.05);
}

.add-goal-btn svg {
  width: 18px;
  height: 18px;
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 480px) {
  .goals-grid {
    grid-template-columns: 1fr;
  }
}

.goal-card {
  position: relative;
  background: var(--bg-surface);
  border-radius: 20px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s ease;
}

.goal-card.completed {
  opacity: 0.7;
}

.goal-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  margin-bottom: 12px;
}

.goal-icon.meditation {
  background: var(--accent-lavender-soft);
  color: var(--accent-lavender);
}

.goal-icon.exercise {
  background: var(--accent-coral-soft);
  color: var(--accent-coral);
}

.goal-icon.water {
  background: var(--accent-blue-soft);
  color: var(--accent-blue);
}

.goal-icon.reading {
  background: var(--accent-sage-soft);
  color: var(--accent-sage);
}

.goal-icon svg {
  width: 22px;
  height: 22px;
}

.goal-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.goal-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.goal-progress {
  height: 6px;
  background: var(--bg-muted);
  border-radius: 3px;
  overflow: hidden;
}

.goal-progress-fill {
  height: 100%;
  background: var(--gradient-progress);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.goal-check {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-sage);
  border-radius: 50%;
  color: white;
}

.goal-check svg {
  width: 14px;
  height: 14px;
}
```

---

### Friendly Metric Card

```tsx
<motion.div
  className="metric-card"
  whileHover={{ y: -4 }}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
>
  <div className="metric-icon">
    <HeartIcon />
  </div>

  <div className="metric-content">
    <div className="metric-value">
      <CountUp end={85} duration={1.5} />
      <span className="metric-unit">bpm</span>
    </div>
    <div className="metric-label">Resting Heart Rate</div>
    <p className="metric-insight">
      <TrendingDownIcon />
      <span>3 bpm lower than last week</span>
    </p>
  </div>

  <div className="metric-chart">
    <Sparkline data={heartRateData} color="coral" />
  </div>
</motion.div>
```

```css
.metric-card {
  background: var(--bg-surface);
  border-radius: 20px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.metric-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-coral-soft);
  border-radius: 14px;
  margin-bottom: 16px;
}

.metric-icon svg {
  width: 24px;
  height: 24px;
  color: var(--accent-coral);
}

.metric-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 4px;
}

.metric-value span:first-child {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 600;
  color: var(--text-primary);
}

.metric-unit {
  font-size: 16px;
  color: var(--text-muted);
}

.metric-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.metric-insight {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--accent-sage);
}

.metric-insight svg {
  width: 14px;
  height: 14px;
}

.metric-chart {
  margin-top: 16px;
  height: 48px;
}
```

---

### Achievement Badge

```tsx
<motion.div
  className={`achievement-badge ${unlocked ? 'unlocked' : 'locked'}`}
  initial={unlocked ? { scale: 0.8 } : false}
  animate={unlocked ? { scale: 1 } : false}
  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
  whileHover={unlocked ? { scale: 1.05 } : {}}
>
  <div className="badge-icon">
    {unlocked ? <achievement.icon /> : <LockIcon />}
  </div>
  <div className="badge-content">
    <h4 className="badge-title">{achievement.title}</h4>
    <p className="badge-description">{achievement.description}</p>
  </div>
  {unlocked && (
    <motion.div
      className="badge-sparkle"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: 2 }}
    >
      <SparkleIcon />
    </motion.div>
  )}
</motion.div>
```

```css
.achievement-badge {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-surface);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.achievement-badge.locked {
  opacity: 0.5;
}

.achievement-badge.unlocked {
  background: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%);
}

.badge-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-gold-soft);
  border-radius: 14px;
  flex-shrink: 0;
}

.achievement-badge.unlocked .badge-icon {
  background: var(--accent-gold);
}

.badge-icon svg {
  width: 26px;
  height: 26px;
  color: var(--accent-gold);
}

.achievement-badge.unlocked .badge-icon svg {
  color: white;
}

.badge-content {
  flex: 1;
}

.badge-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.badge-description {
  font-size: 13px;
  color: var(--text-secondary);
}

.badge-sparkle {
  position: absolute;
  top: 8px;
  right: 8px;
  color: var(--accent-gold);
}

.badge-sparkle svg {
  width: 20px;
  height: 20px;
}
```

---

### Empty State

```tsx
<motion.div
  className="empty-state"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <div className="empty-illustration">
    {/* Warm, friendly illustration */}
    <div className="illustration-blob" />
    <EmptyStateIcon />
  </div>

  <h3 className="empty-title">No activities yet</h3>
  <p className="empty-description">
    Start your journey by adding your first goal.
    Every small step counts!
  </p>

  <button className="empty-action">
    <PlusIcon />
    Add Your First Goal
  </button>
</motion.div>
```

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 24px;
}

.empty-illustration {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.illustration-blob {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--gradient-warm);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  opacity: 0.5;
  animation: float 6s ease-in-out infinite;
}

.empty-illustration svg {
  width: 80px;
  height: 80px;
  color: var(--accent-coral);
  position: relative;
  z-index: 1;
}

.empty-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-description {
  font-size: 15px;
  color: var(--text-secondary);
  max-width: 280px;
  margin-bottom: 24px;
  line-height: 1.6;
}

.empty-action {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: var(--accent-coral);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-coral);
  transition: all 0.3s ease;
}

.empty-action:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 24px rgba(255, 127, 92, 0.3);
}

.empty-action svg {
  width: 18px;
  height: 18px;
}
```

---

### Insights Chart (Soft Area Chart)

```tsx
<div className="insights-card">
  <div className="insights-header">
    <h3 className="insights-title">This Week</h3>
    <select className="insights-select">
      <option>Meditation</option>
      <option>Exercise</option>
      <option>Sleep</option>
    </select>
  </div>

  <div className="insights-chart">
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={weekData}>
        <defs>
          <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF7F5C" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#FF7F5C" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9A9590', fontSize: 12 }}
        />
        <YAxis hide />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#FF7F5C"
          strokeWidth={3}
          fill="url(#gradientFill)"
          strokeLinecap="round"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>

  <p className="insights-summary">
    You've meditated for <strong>45 minutes</strong> this week.
    That's 15 minutes more than last week!
  </p>
</div>
```

```css
.insights-card {
  background: var(--bg-surface);
  border-radius: 24px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  margin-bottom: 24px;
}

.insights-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.insights-title {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
}

.insights-select {
  padding: 8px 12px;
  background: var(--bg-muted);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
}

.insights-chart {
  margin-bottom: 16px;
}

.insights-summary {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.insights-summary strong {
  color: var(--text-primary);
  font-weight: 600;
}
```

---

### Bottom Navigation (Mobile)

```tsx
<nav className="bottom-nav">
  {navItems.map((item) => (
    <button
      key={item.id}
      className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
      onClick={() => setActiveNav(item.id)}
    >
      <div className="nav-icon-wrapper">
        <item.icon />
        {activeNav === item.id && (
          <motion.div
            className="nav-indicator"
            layoutId="nav-indicator"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </div>
      <span className="nav-label">{item.label}</span>
    </button>
  ))}
</nav>
```

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
}

@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  }
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-icon-wrapper {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item svg {
  width: 24px;
  height: 24px;
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.nav-item.active svg {
  color: var(--accent-coral);
}

.nav-indicator {
  position: absolute;
  inset: -6px;
  background: var(--accent-coral-soft);
  border-radius: 12px;
  z-index: -1;
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.nav-item.active .nav-label {
  color: var(--accent-coral);
}
```

---

## Button Components

```css
/* Primary Button */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  color: white;
  background: var(--accent-coral);
  border: none;
  border-radius: 14px;
  box-shadow: var(--shadow-coral);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 24px rgba(255, 127, 92, 0.3);
}

.btn-primary:active {
  transform: scale(0.98);
}

/* Secondary Button */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  background: var(--bg-surface);
  border: 2px solid var(--border-default);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--bg-muted);
  border-color: var(--text-muted);
}

/* Ghost Button */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--accent-coral);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  background: var(--accent-coral-softer);
  border-radius: 10px;
}
```

---

## Animation System

### Spring Configurations (Gentle)
```typescript
// Warm, nurturing animations
const warmSpring = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
};

// Card hover (gentle lift)
const cardHoverSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
};

// Achievement unlock (bouncy)
const achievementSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
};

// Number counter
const countUpConfig = {
  duration: 1.5,
  ease: [0.25, 0.46, 0.45, 0.94],
};
```

### Entrance Animations
```typescript
// Staggered cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: warmSpring,
  },
};

// Page transition
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: 'easeInOut' },
};
```

### Celebration Animation
```typescript
// Confetti burst on achievement
const celebrationVariants = {
  initial: { scale: 0, rotate: 0 },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [0, -10, 10, 0],
    transition: {
      duration: 0.6,
      times: [0, 0.6, 1],
      ease: 'easeOut',
    },
  },
};

// Sparkle effect
const sparkleVariants = {
  animate: {
    scale: [0.5, 1, 0.5],
    opacity: [0, 1, 0],
    transition: {
      duration: 1,
      repeat: 2,
      ease: 'easeInOut',
    },
  },
};
```

---

## Animation Timing Reference

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Card hover | 0.3s | ease |
| Page transition | 0.4s | ease-in-out |
| Number count-up | 1.5s | ease-out |
| Progress fill | 1s | ease-out |
| Achievement unlock | 0.6s | spring (400/15) |
| Stagger delay | 0.1s | - |
| Float animation | 6s loop | ease-in-out |
| Spring stiffness | 100-400 | - |

---

## Required npm Packages

```bash
npm install motion
npm install recharts                    # For charts
npm install react-countup               # For number animation
npm install @radix-ui/react-dialog      # For modals
npm install @radix-ui/react-progress    # For progress components
npm install clsx tailwind-merge         # For utilities
npm install lucide-react                # For icons
```

Install the current releases. The versions this spec was checked against are in the stack table in the skill's SKILL.md.

---

## Sample Data Structure

```typescript
// Goals
const goals = [
  {
    id: 1,
    icon: MeditationIcon,
    category: 'meditation',
    title: 'Morning Meditation',
    subtitle: '10 minutes',
    progress: 100,
    completed: true,
  },
  {
    id: 2,
    icon: WalkIcon,
    category: 'exercise',
    title: 'Daily Walk',
    subtitle: '5,000 steps',
    progress: 67,
    completed: false,
  },
  // ... more goals
];

// Achievements
const achievements = [
  {
    id: 1,
    icon: FlameIcon,
    title: 'Week Warrior',
    description: '7 day streak completed',
    unlocked: true,
  },
  {
    id: 2,
    icon: StarIcon,
    title: 'Early Bird',
    description: 'Meditate before 7am',
    unlocked: false,
  },
  // ... more achievements
];

// Week data for chart
const weekData = [
  { day: 'Mon', value: 15 },
  { day: 'Tue', value: 20 },
  { day: 'Wed', value: 10 },
  { day: 'Thu', value: 25 },
  { day: 'Fri', value: 15 },
  { day: 'Sat', value: 30 },
  { day: 'Sun', value: 20 },
];
```

---

## Final Notes

This specification prioritizes **emotional wellbeing and encouragement** over information density. Every interaction should make the user feel supported and motivated.

Key principles:
1. **Warm, soft colors** - Cream backgrounds, coral accents, sage greens
2. **Serif headlines** - Add humanity and warmth
3. **Rounded everything** - 20-24px border radius, blob shapes
4. **Gentle animations** - Slow springs, soft fades, nurturing motion
5. **Encouraging copy** - "You're doing great", "Keep it up"
6. **Celebrate progress** - Streaks, badges, confetti
7. **Inviting empty states** - Not cold or judgmental
8. **Mobile-first** - Thumb-friendly, generous touch targets

Generate the complete dashboard following these specifications exactly. Do not improvise or add elements not specified here.
