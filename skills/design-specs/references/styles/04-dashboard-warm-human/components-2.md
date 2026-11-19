# Warm Human Dashboard: Components (2 of 2)

Part of the [Warm Human Dashboard specification](index.md).

## Component Specifications (continued)

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
