# Developer-First Dark Dashboard: Sample Data and Page Assembly

Part of the [Developer-First Dark Dashboard specification](index.md).

## Sample Data Structure

```typescript
// Table data
const users = [
  {
    id: 'usr_abc123xyz',
    email: 'john@example.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
  },
  // ... more users
];

// Logs data
const logs = [
  {
    timestamp: '2024-01-15 10:30:45',
    level: 'info',
    message: 'Database connection established',
  },
  {
    timestamp: '2024-01-15 10:30:46',
    level: 'error',
    message: 'Failed to authenticate user: invalid credentials',
  },
  // ... more logs
];

// Navigation
const navigation = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
      { id: 'logs', icon: ActivityIcon, label: 'Logs', badge: 'Live' },
      { id: 'analytics', icon: ChartIcon, label: 'Analytics' },
    ],
  },
  // ... more sections
];
```
