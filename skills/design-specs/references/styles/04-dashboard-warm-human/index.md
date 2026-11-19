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

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Layout System | 378 |
| [motion.md](motion.md) | Animation System; Animation Timing Reference | 113 |
| [components-1.md](components-1.md) | Component Specifications: Top Navigation (Greeting), Today's Summary Card, Streak Card, Progress Ring, Goals Grid | 698 |
| [components-2.md](components-2.md) | Component Specifications: Friendly Metric Card, Achievement Badge, Empty State, Insights Chart (Soft Area Chart), Bottom Navigation (Mobile); Button Components | 594 |
| [page.md](page.md) | Sample Data Structure | 60 |

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

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

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
