# Warm Human Dashboard: Components (1 of 2)

Part of the [Warm Human Dashboard specification](index.md).

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
