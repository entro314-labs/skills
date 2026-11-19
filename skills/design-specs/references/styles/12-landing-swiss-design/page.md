# Swiss Design / International Typographic Style Landing Page: Sample Data and Page Assembly

Part of the [Swiss Design / International Typographic Style Landing Page specification](index.md).

## Complete Page Assembly

```tsx
// app/page.tsx
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { WorkSection } from '@/sections/WorkSection';
import { AboutSection } from '@/sections/AboutSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { ContactSection } from '@/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <TestimonialsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```
