# Retro-Futurist Landing Page: Sample Data and Page Assembly

Part of the [Retro-Futurist Landing Page specification](index.md).

## Complete Page Assembly

```tsx
// app/page.tsx
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { StatsSection } from '@/sections/StatsSection';
import { TechnologySection } from '@/sections/TechnologySection';
import { TimelineSection } from '@/sections/TimelineSection';
import { CTASection } from '@/sections/CTASection';
import { ContactSection } from '@/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <TechnologySection />
        <TimelineSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```
