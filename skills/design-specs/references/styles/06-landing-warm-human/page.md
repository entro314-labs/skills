# Warm Human Landing Page: Sample Data and Page Assembly

Part of the [Warm Human Landing Page specification](index.md).

## Sample Data Structure

```typescript
// Features
const features = [
  {
    id: 1,
    icon: MeditationIcon,
    title: "Guided meditations",
    description: "Expert-led sessions for every mood and moment. From 3-minute quick resets to deep 30-minute journeys.",
    image: "/features/meditation.jpg",
    points: [
      "100+ guided sessions",
      "New content weekly",
      "Offline access"
    ],
  },
  // ... more features
];

// Testimonials
const testimonials = [
  {
    id: 1,
    quote: "Serenity helped me find 10 minutes of peace in my chaotic day. It's become my morning ritual.",
    name: "Sarah Chen",
    role: "Busy parent of three",
    avatar: "/avatars/sarah.jpg",
  },
  // ... more testimonials
];

// Pricing Plans
const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with basics',
    monthlyPrice: 0,
    annualPrice: 0,
    cta: 'Start Free',
    featured: false,
    features: [
      '5 guided meditations',
      'Daily mindfulness tips',
      'Basic progress tracking',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'For committed practitioners',
    monthlyPrice: 12,
    annualPrice: 9,
    cta: 'Get Plus',
    featured: true,
    features: [
      'Unlimited meditations',
      'Sleep stories',
      'Mood tracking',
      'Offline access',
      'Personal insights',
    ],
  },
  // ... more plans
];
```
