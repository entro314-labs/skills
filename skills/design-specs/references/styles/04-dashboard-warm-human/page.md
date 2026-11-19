# Warm Human Dashboard: Sample Data and Page Assembly

Part of the [Warm Human Dashboard specification](index.md).

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
