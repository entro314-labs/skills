---
title: 'Common Patterns & Solutions Guide'
description: 'For AI Assistants: Frequently used patterns, solutions, and troubleshooting.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Common Patterns & Solutions Guide

_For AI Assistants: Frequently used patterns, solutions, and troubleshooting_

## 🎯 Authentication Patterns

### NextAuth.js Setup with shadcn/ui

```bash
npm install next-auth
npm install @auth/prisma-adapter prisma @prisma/client
```

```typescript
// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
};
```

### Login Form Component

```tsx
'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid credentials');
        return;
      }

      toast.success('Logged in successfully');
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  async function signInWithGoogle() {
    setIsGoogleLoading(true);

    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign in</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to sign in
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          onClick={signInWithGoogle}
          disabled={isLoading || isGoogleLoading}
          className="w-full"
        >
          {isGoogleLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading || isGoogleLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      autoComplete="current-password"
                      disabled={isLoading || isGoogleLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading || isGoogleLoading} className="w-full">
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
```

### Protected Route Pattern

```tsx
// lib/auth-guard.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return session;
}

// Usage in pages
export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
    </div>
  );
}
```

---

## 📊 Data Fetching Patterns

### React Query Setup

```bash
npm install @tanstack/react-query
```

```tsx
// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Custom Hooks for API Calls

```tsx
// hooks/use-posts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async (): Promise<Post> => {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: Omit<Post, 'id' | 'createdAt'>) => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) throw new Error('Failed to create post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Post> & { id: string }) => {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) throw new Error('Failed to update post');
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', data.id] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete post');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
```

### Optimistic Updates Pattern

```tsx
'use client';

import { usePosts, useCreatePost, useDeletePost } from '@/hooks/use-posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export function PostList() {
  const { data: posts, isLoading, error } = usePosts();
  const createPost = useCreatePost();
  const deletePost = useDeletePost();

  const handleCreatePost = () => {
    createPost.mutate(
      {
        title: 'New Post',
        content: 'This is a new post',
        authorId: 'user-1',
      },
      {
        onSuccess: () => toast.success('Post created'),
        onError: () => toast.error('Failed to create post'),
      }
    );
  };

  const handleDeletePost = (id: string) => {
    deletePost.mutate(id, {
      onSuccess: () => toast.success('Post deleted'),
      onError: () => toast.error('Failed to delete post'),
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="space-y-4">
      <Button onClick={handleCreatePost} disabled={createPost.isPending}>
        {createPost.isPending ? 'Creating...' : 'Create Post'}
      </Button>

      {posts?.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeletePost(post.id)}
              disabled={deletePost.isPending}
              className="mt-2"
            >
              {deletePost.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## 🎨 Theme & Styling Patterns

### Dynamic Theme Switching

```tsx
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'System', value: 'system' },
];

const accentColors = [
  { name: 'Blue', value: 'blue', class: 'accent-blue' },
  { name: 'Green', value: 'green', class: 'accent-green' },
  { name: 'Purple', value: 'purple', class: 'accent-purple' },
  { name: 'Orange', value: 'orange', class: 'accent-orange' },
];

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Customize Theme</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-base font-medium">Theme</Label>
          <RadioGroup value={theme} onValueChange={setTheme}>
            {themes.map((themeOption) => (
              <div key={themeOption.value} className="flex items-center space-x-2">
                <RadioGroupItem value={themeOption.value} id={themeOption.value} />
                <Label htmlFor={themeOption.value}>{themeOption.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">Accent Color</Label>
          <div className="grid grid-cols-2 gap-2">
            {accentColors.map((color) => (
              <Button
                key={color.value}
                variant="outline"
                size="sm"
                onClick={() => {
                  document.documentElement.className =
                    document.documentElement.className.replace(/accent-\w+/, '') +
                    ` ${color.class}`;
                }}
              >
                <div className={`w-4 h-4 rounded-full mr-2 bg-${color.value}-500`} />
                {color.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### CSS Variables for Dynamic Theming

```css
/* globals.css - Extended theme system */
:root {
  /* Base theme variables */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  /* Dynamic accent colors */
  --accent-blue: oklch(0.64 0.15 240);
  --accent-green: oklch(0.7 0.15 150);
  --accent-purple: oklch(0.64 0.15 300);
  --accent-orange: oklch(0.75 0.15 60);

  /* Active accent (default to blue) */
  --accent-active: var(--accent-blue);
}

.accent-blue {
  --accent-active: var(--accent-blue);
}

.accent-green {
  --accent-active: var(--accent-green);
}

.accent-purple {
  --accent-active: var(--accent-purple);
}

.accent-orange {
  --accent-active: var(--accent-orange);
}

@theme inline {
  --color-accent-active: var(--accent-active);
}

/* Usage in components */
.btn-accent {
  background-color: var(--accent-active);
}
```

---

## 📱 Responsive Design Patterns

### Mobile-First Navigation

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">ACME Corp</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink href="/" className="flex items-center" onOpenChange={setIsOpen}>
              <span className="font-bold">ACME Corp</span>
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <MobileLink key={item.href} href={item.href} onOpenChange={setIsOpen}>
                    {item.name}
                  </MobileLink>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

interface MobileLinkProps {
  href: string;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
```

### Responsive Grid Patterns

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Auto-fit grid pattern
export function ResponsiveGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">{children}</div>
  );
}

// Breakpoint-based grid
export function BreakpointGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {children}
    </div>
  );
}

// Container query grid
export function ContainerGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}

// Usage
export function GridDemo() {
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    content: `Content for item ${i + 1}`,
  }));

  return (
    <ResponsiveGrid>
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.content}</p>
          </CardContent>
        </Card>
      ))}
    </ResponsiveGrid>
  );
}
```

---

## 🔄 State Management Patterns

### Zustand Setup

```bash
npm install zustand
```

```typescript
// stores/use-auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: (user) => set({ user, isLoading: false }),
      logout: () => set({ user: null, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

// stores/use-app-store.ts
import { create } from 'zustand';

interface AppState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  theme: 'system',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setTheme: (theme) => set({ theme }),
}));
```

### Global Modal Management

```typescript
// stores/use-modal-store.ts
import { create } from 'zustand';

export type ModalType = 'createPost' | 'editPost' | 'deletePost' | 'confirmAction';

interface ModalData {
  post?: {
    id: string;
    title: string;
    content: string;
  };
  confirmAction?: {
    title: string;
    description: string;
    onConfirm: () => void;
  };
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
```

```tsx
// components/modals/modal-provider.tsx
'use client';

import { useEffect, useState } from 'react';
import { CreatePostModal } from './create-post-modal';
import { EditPostModal } from './edit-post-modal';
import { DeletePostModal } from './delete-post-modal';
import { ConfirmActionModal } from './confirm-action-modal';

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreatePostModal />
      <EditPostModal />
      <DeletePostModal />
      <ConfirmActionModal />
    </>
  );
}
```

---

## 🔍 Search & Filter Patterns

### Advanced Search Component

```tsx
'use client';

import { useState, useCallback, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@/hooks/use-debounce';

interface FilterState {
  search: string;
  category: string;
  status: string[];
  dateRange: string;
}

interface SearchableItem {
  id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'technology', label: 'Technology' },
  { value: 'design', label: 'Design' },
  { value: 'business', label: 'Business' },
];

const statuses = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

export function AdvancedSearch({
  items,
  onResults,
}: {
  items: SearchableItem[];
  onResults: (results: SearchableItem[]) => void;
}) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    status: [],
    dateRange: 'all',
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  const filteredResults = useMemo(() => {
    return items.filter((item) => {
      // Search filter
      const matchesSearch =
        debouncedSearch === '' || item.title.toLowerCase().includes(debouncedSearch.toLowerCase());

      // Category filter
      const matchesCategory = filters.category === 'all' || item.category === filters.category;

      // Status filter
      const matchesStatus = filters.status.length === 0 || filters.status.includes(item.status);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, debouncedSearch, filters.category, filters.status]);

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: 'all',
      status: [],
      dateRange: 'all',
    });
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category !== 'all') count++;
    if (filters.status.length > 0) count++;
    if (filters.dateRange !== 'all') count++;
    return count;
  }, [filters]);

  // Update results when filters change
  React.useEffect(() => {
    onResults(filteredResults);
  }, [filteredResults, onResults]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
          {activeFilterCount > 0 && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear ({activeFilterCount})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          <Select
            value={filters.category}
            onValueChange={(value) => updateFilter('category', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start">
                <Filter className="mr-2 h-4 w-4" />
                Status
                {filters.status.length > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {filters.status.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <div className="p-4 space-y-2">
                {statuses.map((status) => (
                  <div key={status.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={status.value}
                      checked={filters.status.includes(status.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter('status', [...filters.status, status.value]);
                        } else {
                          updateFilter(
                            'status',
                            filters.status.filter((s) => s !== status.value)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={status.value}>{status.label}</Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary">
                Search: {filters.search}
                <button
                  onClick={() => updateFilter('search', '')}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.category !== 'all' && (
              <Badge variant="secondary">
                Category: {categories.find((c) => c.value === filters.category)?.label}
                <button
                  onClick={() => updateFilter('category', 'all')}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.status.map((status) => (
              <Badge key={status} variant="secondary">
                Status: {statuses.find((s) => s.value === status)?.label}
                <button
                  onClick={() =>
                    updateFilter(
                      'status',
                      filters.status.filter((s) => s !== status)
                    )
                  }
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredResults.length} of {items.length} results
        </div>
      </CardContent>
    </Card>
  );
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

---

## 🚨 Error Handling Patterns

### Global Error Boundary

```tsx
// components/error-boundary.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Send to error reporting service
    // reportError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <CardTitle>Something went wrong</CardTitle>
              </div>
              <CardDescription>
                An unexpected error occurred. Please try refreshing the page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-sm">
                  <summary className="cursor-pointer text-muted-foreground">Error Details</summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                    {this.state.error.message}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              <div className="flex space-x-2">
                <Button
                  onClick={() => this.setState({ hasError: false })}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button onClick={() => window.location.reload()} className="flex-1">
                  Reload Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### API Error Handler

```typescript
// lib/api-error-handler.ts
export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'APIError';
  }
}

export async function handleAPIResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new APIError(response.status, response.statusText, errorData);
  }

  return response.json();
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}
```

---

## 📋 Form Validation Patterns

### Complex Form with Field Dependencies

```tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const createUserSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    userType: z.enum(['personal', 'business']),
    companyName: z.string().optional(),
    acceptTerms: z.boolean(),
    newsletter: z.boolean(),
    preferredContact: z.enum(['email', 'phone', 'both']),
    phone: z.string().optional(),
  })
  .refine(
    (data) => {
      // If business user, company name is required
      if (data.userType === 'business' && !data.companyName) {
        return false;
      }
      return true;
    },
    {
      message: 'Company name is required for business accounts',
      path: ['companyName'],
    }
  )
  .refine(
    (data) => {
      // If phone contact preferred, phone is required
      if ((data.preferredContact === 'phone' || data.preferredContact === 'both') && !data.phone) {
        return false;
      }
      return true;
    },
    {
      message: 'Phone number is required for phone contact',
      path: ['phone'],
    }
  )
  .refine((data) => data.acceptTerms, {
    message: 'You must accept the terms and conditions',
    path: ['acceptTerms'],
  });

export function ComplexUserForm() {
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      userType: 'personal',
      companyName: '',
      acceptTerms: false,
      newsletter: false,
      preferredContact: 'email',
      phone: '',
    },
  });

  const userType = useWatch({
    control: form.control,
    name: 'userType',
  });

  const preferredContact = useWatch({
    control: form.control,
    name: 'preferredContact',
  });

  function onSubmit(values: z.infer<typeof createUserSchema>) {
    console.log(values);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="personal" />
                        <FormLabel className="font-normal">Personal</FormLabel>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="business" />
                        <FormLabel className="font-normal">Business</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {userType === 'business' && (
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="preferredContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Contact Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contact method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(preferredContact === 'phone' || preferredContact === 'both') && (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I accept the terms and conditions</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newsletter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Subscribe to newsletter</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
```

This comprehensive patterns and solutions guide provides AI assistants with the most commonly needed
implementations for building modern React applications with the Next.js 15+, Tailwind CSS 4+, and
shadcn/ui 2.7+ stack.
