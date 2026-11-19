# Cinematic Dark Landing Page: Components

Part of the [Cinematic Dark Landing Page specification](index.md).

## Button Components

```css
@layer components {
  /* Standard cinematic button */
  .btn-cinematic {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 32px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #FAFAFA;
    border-radius: 8px;
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .btn-cinematic:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* With glow effect */
  .btn-cinematic-glow {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
  }

  .btn-cinematic-glow:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 0 30px 5px rgba(99, 102, 241, 0.2);
  }

  /* Solid variant */
  .btn-cinematic-solid {
    background: #FAFAFA;
    border-color: #FAFAFA;
    color: #050505;
  }

  .btn-cinematic-solid:hover {
    background: #E4E4E7;
    border-color: #E4E4E7;
  }

  /* Ghost variant */
  .btn-cinematic-ghost {
    padding: 8px 0;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.6);
  }

  .btn-cinematic-ghost:hover {
    color: #FAFAFA;
  }
}
```

---

## Icon System

Minimal, thin-stroke icons that match the cinematic aesthetic.

```tsx
// src/components/icons/CinematicIcons.tsx

export const ArrowRight = ({ className = '' }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowUpRight = ({ className = '' }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M4 12L12 4M12 4H6M12 4V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Twitter = ({ className = '' }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <path
      d="M2 2L16 16M2 16L9.5 8.5M16 2L9.5 8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GitHub = ({ className = '' }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <path
      d="M9 1C4.58 1 1 4.58 1 9C1 12.54 3.29 15.53 6.47 16.59C6.87 16.66 7.02 16.42 7.02 16.21C7.02 16.02 7.01 15.39 7.01 14.72C5 15.09 4.48 14.23 4.32 13.78C4.23 13.55 3.84 12.84 3.5 12.65C3.22 12.5 2.82 12.13 3.49 12.12C4.12 12.11 4.57 12.7 4.72 12.94C5.44 14.15 6.59 13.81 7.05 13.6C7.12 13.08 7.33 12.73 7.56 12.53C5.78 12.33 3.92 11.64 3.92 8.58C3.92 7.68 4.23 6.94 4.74 6.36C4.66 6.16 4.38 5.32 4.82 4.19C4.82 4.19 5.49 3.98 7.02 5.04C7.66 4.86 8.34 4.77 9.02 4.77C9.7 4.77 10.38 4.86 11.02 5.04C12.55 3.97 13.22 4.19 13.22 4.19C13.66 5.32 13.38 6.16 13.3 6.36C13.81 6.94 14.12 7.67 14.12 8.58C14.12 11.65 12.25 12.33 10.47 12.53C10.76 12.78 11.01 13.26 11.01 14.01C11.01 15.08 11 15.94 11 16.21C11 16.42 11.15 16.67 11.55 16.59C14.71 15.53 17 12.53 17 9C17 4.58 13.42 1 9 1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Discord = ({ className = '' }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <path
      d="M14.5 4.5C13.4 4 12.22 3.64 11 3.5C10.87 3.73 10.72 4.04 10.62 4.29C9.32 4.16 8.03 4.16 6.75 4.29C6.65 4.04 6.49 3.73 6.36 3.5C5.14 3.64 3.95 4 2.85 4.51C0.63 7.79 0.04 10.98 0.34 14.13C1.76 15.18 3.14 15.82 4.5 16.25C4.82 15.81 5.11 15.34 5.35 14.85C4.88 14.68 4.43 14.46 4 14.21C4.11 14.13 4.22 14.04 4.32 13.95C7.03 15.21 9.99 15.21 12.68 13.95C12.79 14.04 12.89 14.13 13 14.21C12.57 14.46 12.12 14.68 11.65 14.85C11.89 15.34 12.18 15.81 12.5 16.25C13.86 15.82 15.24 15.18 16.66 14.13C17.02 10.48 16.1 7.32 14.5 4.5ZM6 12.25C5.18 12.25 4.5 11.47 4.5 10.5C4.5 9.53 5.16 8.75 6 8.75C6.84 8.75 7.52 9.53 7.5 10.5C7.5 11.47 6.84 12.25 6 12.25ZM12 12.25C11.18 12.25 10.5 11.47 10.5 10.5C10.5 9.53 11.16 8.75 12 8.75C12.84 8.75 13.52 9.53 13.5 10.5C13.5 11.47 12.84 12.25 12 12.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
```
