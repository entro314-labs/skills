# Fonts

Load every font explicitly. Never rely on system fallbacks: Studio preview and the headless render machine may have different fonts. Measuring text before the font is loaded gives wrong sizes ([text-and-measuring.md](text-and-measuring.md)).

## Google Fonts with @remotion/google-fonts

The recommended way. It is type-safe and blocks rendering until the font is ready. Install: `npx remotion add @remotion/google-fonts`.

```tsx
import {loadFont} from '@remotion/google-fonts/Lobster';

const {fontFamily} = loadFont();

export const MyComposition = () => <div style={{fontFamily}}>Hello World</div>;
```

Specify only the weights and subsets you need to keep the download small:

```tsx
import {loadFont} from '@remotion/google-fonts/Roboto';

const {fontFamily} = loadFont('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});
```

Call `loadFont()` at module top level or in a file imported early. If you need to know when the font is ready (for example before measuring), use `waitUntilDone()`:

```tsx
const {fontFamily, waitUntilDone} = loadFont();
await waitUntilDone();
```

Arabic and other non-Latin scripts need a font that actually covers them: [arabic-rtl-text.md](arabic-rtl-text.md).

## Local fonts with @remotion/fonts

Install: `npx remotion add @remotion/fonts`. Put the font file in `public/` and load it with `loadFont()`:

```tsx
import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

await loadFont({
  family: 'MyFont',
  url: staticFile('MyFont-Regular.woff2'),
});

export const MyComposition = () => <div style={{fontFamily: 'MyFont'}}>Hello World</div>;
```

Load each weight separately under the same family name:

```tsx
await Promise.all([
  loadFont({family: 'Inter', url: staticFile('Inter-Regular.woff2'), weight: '400'}),
  loadFont({family: 'Inter', url: staticFile('Inter-Bold.woff2'), weight: '700'}),
]);
```

Options: `family` (required, the CSS name), `url` (required), `format` (auto-detected from the extension), `weight`, `style` (`normal` or `italic`), `display` (font-display behavior, for example `"block"`).

## In a component

```tsx
import {loadFont} from '@remotion/google-fonts/Montserrat';

const {fontFamily} = loadFont('normal', {weights: ['400', '700'], subsets: ['latin']});

export const Title: React.FC<{text: string}> = ({text}) => (
  <h1 style={{fontFamily, fontSize: 80, fontWeight: 'bold'}}>{text}</h1>
);
```
