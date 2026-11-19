# Elegant Minimal Dashboard: Sample Data and Page Assembly

Part of the [Elegant Minimal Dashboard specification](index.md).

## Sample Data Structure

```typescript
// Documents
const documents = [
  {
    id: '1',
    title: 'Q4 Product Roadmap',
    description: 'Strategic planning document for Q4 initiatives and feature releases.',
    icon: DocumentIcon,
    cover: '#6366F1',
    style: 'Minimal',
    updatedAt: '2h ago',
    createdAt: 'Oct 15, 2024',
    owner: 'Sarah Chen',
    tags: ['Product', 'Strategy'],
    size: 'wide',
  },
  {
    id: '2',
    title: 'Brand Guidelines',
    description: 'Complete brand identity system including logos, colors, and typography.',
    icon: PaletteIcon,
    cover: '#10B981',
    style: 'Editorial',
    updatedAt: '1d ago',
    createdAt: 'Sep 28, 2024',
    owner: 'Mike Johnson',
    tags: ['Design', 'Brand'],
    size: 'default',
  },
  // ... more documents
];

// Navigation
const navigation = [
  {
    title: 'Overview',
    items: [
      { id: 'home', icon: HomeIcon, label: 'Home' },
      { id: 'inbox', icon: InboxIcon, label: 'Inbox', badge: 3 },
      { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
      { id: 'tasks', icon: TasksIcon, label: 'Tasks' },
    ],
  },
  {
    title: 'Workspaces',
    items: [
      { id: 'product', icon: FolderIcon, label: 'Product', color: '#6366F1' },
      { id: 'marketing', icon: FolderIcon, label: 'Marketing', color: '#10B981' },
      { id: 'engineering', icon: FolderIcon, label: 'Engineering', color: '#F59E0B' },
    ],
  },
];

// Command palette results
const commandResults = [
  { id: '1', icon: DocumentIcon, label: 'New Document', shortcut: '⌘N' },
  { id: '2', icon: FolderIcon, label: 'New Workspace', shortcut: '⌘⇧N' },
  { id: '3', icon: SearchIcon, label: 'Search Documents', shortcut: '⌘F' },
  { id: '4', icon: SettingsIcon, label: 'Settings', shortcut: '⌘,' },
  // ... more commands
];
```
