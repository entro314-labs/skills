# Editorial/Magazine Landing Page: Components

Part of the [Editorial/Magazine Landing Page specification](index.md).

## Link Styling Component

```tsx
interface EditorialLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function EditorialLink({ href, children, external }: EditorialLinkProps) {
  return (
    <a
      href={href}
      className="editorial-link"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}
```
