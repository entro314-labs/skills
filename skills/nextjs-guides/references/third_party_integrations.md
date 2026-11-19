---
trigger: model_decision
description: when working with third-party services, API integrations, payment processing, email services, media management, maps, geolocation, data visualization
---

# Next.js Third-Party Service Integrations Rules

## Payment Processing

### Stripe Integration

- Use Stripe 18.1.0 for payments and subscriptions
- Implement server-side webhooks for event handling
- Use client-side Stripe.js Elements components
- Implement secure Checkout flows

```typescript
// lib/stripe.ts
import { Stripe } from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-15',
  appInfo: {
    name: 'My Next.js App',
    version: '1.0.0',
  },
});
```

```typescript
// app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle completed checkout
        break;
      // Handle other events
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
```

## Email Services

### Resend Integration

- Use Resend 4.5.1 for transactional emails
- Create React-based email templates
- Implement email verification and password reset flows
- Set up proper email delivery tracking

```typescript
// lib/email.ts
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(user: { email: string; name: string }) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@example.com',
      to: user.email,
      subject: 'Welcome to Example',
      react: WelcomeEmail({ name: user.name }),
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
```

```typescript
// emails/welcome.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
  Button,
} from '@react-email/components';

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Heading>Welcome, {name}!</Heading>
          <Text>We're excited to have you on board.</Text>
          <Button
            href="https://example.com/dashboard"
            style={{ background: '#4F46E5', color: 'white', padding: '12px 24px' }}
          >
            Get Started
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

## Media Management

### Cloudinary Integration

- Use Cloudinary 2.6.0 for image and video optimization
- Integrate with Next.js Image component
- Implement proper asset transformation and delivery
- Set up secure uploads with authenticated endpoints

```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export function buildCloudinaryUrl(publicId: string, options: any = {}) {
  return cloudinary.url(publicId, {
    secure: true,
    ...options,
  });
}
```

```typescript
// components/cloudinary-image.tsx
import Image from 'next/image';
import { buildCloudinaryUrl } from '@/lib/cloudinary';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio?: number;
  priority?: boolean;
}

export function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  aspectRatio,
  priority = false,
}: CloudinaryImageProps) {
  const imageUrl = buildCloudinaryUrl(publicId, {
    width,
    height,
    crop: 'fill',
    aspect_ratio: aspectRatio,
  });
  
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className="object-cover"
    />
  );
}
```

## Maps & Geolocation

### Mapbox Integration

- Use Mapbox GL 3.12.0 for interactive maps
- Implement proper map rendering and interaction
- Apply consistent styling and theming
- Optimize for mobile performance

```typescript
// components/map.client.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  initialCenter: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    label?: string;
  }>;
}

export function Map({ initialCenter, zoom = 12, markers = [] }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom,
    });
    
    map.current.on('load', () => setLoaded(true));
    
    return () => {
      map.current?.remove();
    };
  }, [initialCenter, zoom]);
  
  // Add markers when map is loaded
  useEffect(() => {
    if (!loaded || !map.current) return;
    
    // Remove existing markers
    document.querySelectorAll('.mapboxgl-marker').forEach(el => el.remove());
    
    // Add new markers
    markers.forEach(marker => {
      const el = document.createElement('div');
      el.className = 'mapboxgl-marker';
      el.style.backgroundColor = '#4F46E5';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      
      new mapboxgl.Marker(el)
        .setLngLat(marker.position)
        .setPopup(marker.label ? new mapboxgl.Popup().setText(marker.label) : undefined)
        .addTo(map.current!);
    });
  }, [loaded, markers]);
  
  return <div ref={mapContainer} className="w-full h-[500px] rounded-lg" />;
}
```

## Data Visualization

### Chart Implementation

- Use Recharts 2.15.3 for React-based charts
- Implement proper responsive charts
- Apply consistent theming and styling
- Optimize for performance with windowing for large datasets

```typescript
// components/charts/bar-chart.client.tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface BarChartProps {
  data: DataPoint[];
  dataKey: string;
  barColor?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
}

export function CustomBarChart({
  data,
  dataKey,
  barColor = '#4F46E5',
  xAxisLabel,
  yAxisLabel,
  height = 400,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis
          dataKey="name"
          label={xAxisLabel ? { value: xAxisLabel, position: 'bottom' } : undefined}
        />
        <YAxis
          label={
            yAxisLabel
              ? { value: yAxisLabel, angle: -90, position: 'left' }
              : undefined
          }
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            borderRadius: '6px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            border: 'none',
          }}
        />
        <Legend verticalAlign="top" />
        <Bar dataKey={dataKey} fill={barColor} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
```
