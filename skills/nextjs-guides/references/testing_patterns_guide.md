---
title: 'Testing Patterns & Examples Guide'
description: 'For AI Assistants: Comprehensive testing strategies for Next.js apps.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Testing Patterns & Examples Guide

_For AI Assistants: Comprehensive testing strategies for Next.js apps_

## 🧪 Testing Stack Overview

### Recommended Testing Tools

```bash
# Unit & Integration Testing
npm install -D vitest @vitejs/plugin-react
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event happy-dom

# E2E Testing
npm install -D @playwright/test

# Visual Testing
npm install -D @storybook/react @storybook/addon-essentials

# API Testing
npm install -D supertest
```

---

## ⚙️ Test Configuration Setup

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.next'],
    globals: true,
    css: true,
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'src/app/**/loading.tsx',
        'src/app/**/not-found.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Test Setup File

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

// Global test setup
beforeAll(() => {
  // Mock Next.js router
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    resolvedTheme: 'light',
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));
```

### Test Utilities

```tsx
// src/test/utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';

// Create a test query client
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

export function renderWithProviders(
  ui: ReactElement,
  { queryClient = createTestQueryClient(), ...renderOptions }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
}

// Mock user factory
export function createMockUser(overrides = {}) {
  return {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    ...overrides,
  };
}

// Mock API response factory
export function createMockApiResponse<T>(data: T, options = {}) {
  return {
    ok: true,
    status: 200,
    json: async () => data,
    ...options,
  };
}

// Re-export everything from testing library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
```

---

## 🧩 Component Testing Patterns

### Basic Component Tests

```tsx
// src/components/ui/button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/utils';
import { Button } from './button';

describe('Button', () => {
  it('renders with correct text', () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    renderWithProviders(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant styles correctly', () => {
    renderWithProviders(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive');
  });

  it('forwards refs correctly', () => {
    const ref = { current: null };
    renderWithProviders(<Button ref={ref}>Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
```

### Form Testing Patterns

```tsx
// src/components/forms/contact-form.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, userEvent, waitFor } from '@/test/utils';
import { ContactForm } from './contact-form';

// Mock the submit action
const mockSubmitAction = vi.fn();
vi.mock('@/app/actions', () => ({
  submitContactForm: mockSubmitAction,
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    renderWithProviders(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    // Try to submit empty form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    mockSubmitAction.mockResolvedValue({ success: true });

    renderWithProviders(<ContactForm />);

    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello world!');

    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockSubmitAction).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world!',
      });
    });
  });

  it('handles submission errors', async () => {
    const user = userEvent.setup();
    mockSubmitAction.mockRejectedValue(new Error('Submission failed'));

    renderWithProviders(<ContactForm />);

    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello world!');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });
  });
});
```

### Hook Testing

```tsx
// src/hooks/use-local-storage.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './use-local-storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('returns stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated-value');
    });

    expect(result.current[0]).toBe('updated-value');
    expect(localStorage.getItem('test-key')).toBe('"updated-value"');
  });

  it('handles JSON parsing errors gracefully', () => {
    localStorage.setItem('test-key', 'invalid-json');

    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });
});
```

---

## 🔄 API Testing Patterns

### Route Handler Testing

```typescript
// src/app/api/users/route.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from './route';

// Mock the database
const mockDb = {
  user: {
    findMany: vi.fn(),
    create: vi.fn(),
  },
};

vi.mock('@/lib/db', () => ({
  db: mockDb,
}));

describe('/api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET', () => {
    it('returns list of users', async () => {
      const mockUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ];

      mockDb.user.findMany.mockResolvedValue(mockUsers);

      const request = new NextRequest('http://localhost:3000/api/users');
      const response = await GET(request);

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toEqual({ users: mockUsers });
      expect(mockDb.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('handles database errors', async () => {
      mockDb.user.findMany.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/users');
      const response = await GET(request);

      expect(response.status).toBe(500);

      const data = await response.json();
      expect(data).toEqual({ error: 'Internal server error' });
    });
  });

  describe('POST', () => {
    it('creates a new user', async () => {
      const newUser = { id: '3', name: 'Bob Wilson', email: 'bob@example.com' };
      mockDb.user.create.mockResolvedValue(newUser);

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Bob Wilson',
          email: 'bob@example.com',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(request);

      expect(response.status).toBe(201);

      const data = await response.json();
      expect(data).toEqual(newUser);
      expect(mockDb.user.create).toHaveBeenCalledWith({
        data: {
          name: 'Bob Wilson',
          email: 'bob@example.com',
        },
      });
    });

    it('validates request body', async () => {
      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: '', // Invalid: empty name
          email: 'invalid-email', // Invalid: malformed email
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(request);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.error).toBe('Validation failed');
    });
  });
});
```

### Server Action Testing

```typescript
// src/app/actions.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPost, updatePost } from './actions';

// Mock dependencies
const mockDb = {
  post: {
    create: vi.fn(),
    update: vi.fn(),
    findUnique: vi.fn(),
  },
};

const mockRevalidatePath = vi.fn();
const mockRedirect = vi.fn();

vi.mock('@/lib/db', () => ({ db: mockDb }));
vi.mock('next/cache', () => ({ revalidatePath: mockRevalidatePath }));
vi.mock('next/navigation', () => ({ redirect: mockRedirect }));

describe('Server Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createPost', () => {
    it('creates a post successfully', async () => {
      const mockPost = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        slug: 'test-post',
      };

      mockDb.post.create.mockResolvedValue(mockPost);

      const formData = new FormData();
      formData.append('title', 'Test Post');
      formData.append('content', 'Test content');

      await createPost(formData);

      expect(mockDb.post.create).toHaveBeenCalledWith({
        data: {
          title: 'Test Post',
          content: 'Test content',
          slug: 'test-post',
        },
      });

      expect(mockRevalidatePath).toHaveBeenCalledWith('/blog');
      expect(mockRedirect).toHaveBeenCalledWith('/blog/test-post');
    });

    it('handles validation errors', async () => {
      const formData = new FormData();
      formData.append('title', ''); // Invalid: empty title
      formData.append('content', 'Test content');

      await expect(createPost(formData)).rejects.toThrow('Title is required');
      expect(mockDb.post.create).not.toHaveBeenCalled();
    });
  });
});
```

---

## 🎭 E2E Testing with Playwright

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

### Page Object Model

```typescript
// e2e/pages/login-page.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.getByTestId('error-message');
  }

  async goto() {
    await this.page.goto('/auth/signin');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectErrorMessage(message: string) {
    await this.errorMessage.waitFor();
    await this.page.getByText(message).waitFor();
  }
}
```

### E2E Test Examples

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';

test.describe('Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('user@example.com', 'password123');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('user@example.com', 'wrongpassword');

    await loginPage.expectErrorMessage('Invalid credentials');
    await expect(page).toHaveURL('/auth/signin');
  });

  test('should validate email format', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid-email', 'password123');

    await expect(page.getByText('Invalid email address')).toBeVisible();
  });
});
```

### API Testing with Playwright

```typescript
// e2e/api.spec.ts
import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('should create a new user', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const user = await response.json();
    expect(user).toMatchObject({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  test('should handle validation errors', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: '',
        email: 'invalid-email',
      },
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error.error).toBe('Validation failed');
  });
});
```

---

## 📊 Visual Testing with Storybook

### Storybook Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': '/src',
        },
      },
    });
  },
};

export default config;
```

### Component Stories

```tsx
// src/components/ui/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Download className="mr-2 h-4 w-4" />
        Download
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </>
    ),
  },
};

// Interaction test
export const ClickTest: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await step('Click button', async () => {
      await userEvent.click(button);
    });
  },
};
```

---

## 🚀 Testing Best Practices

### Test Organization

```
src/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── button.test.tsx
│   │   └── button.stories.tsx
│   └── forms/
│       ├── contact-form.tsx
│       └── contact-form.test.tsx
├── hooks/
│   ├── use-local-storage.ts
│   └── use-local-storage.test.ts
├── lib/
│   ├── utils.ts
│   └── utils.test.ts
└── test/
    ├── setup.ts
    ├── utils.tsx
    └── mocks/
        ├── handlers.ts
        └── server.ts
```

### Test Coverage Configuration

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### CI/CD Test Pipeline

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci
      - run: npm run test:coverage

      - uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e

      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

### Testing Checklist

**Unit Tests:**

- [ ] All utility functions tested
- [ ] Component prop variations tested
- [ ] Error states handled
- [ ] Event handlers tested
- [ ] Accessibility tested

**Integration Tests:**

- [ ] Form submissions tested
- [ ] API integrations tested
- [ ] State management tested
- [ ] Route navigation tested

**E2E Tests:**

- [ ] Critical user journeys tested
- [ ] Authentication flows tested
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness

**Performance Tests:**

- [ ] Bundle size monitored
- [ ] Core Web Vitals measured
- [ ] Load time thresholds set

This comprehensive testing guide provides AI assistants with the patterns and examples needed to
implement robust testing strategies for modern Next.js applications.
