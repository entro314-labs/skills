# Formats, safe zones and multi-format output

## Canvases

Work on these logical canvases at 30 fps. Use 60 fps only when the motion and source footage justify it; resolution and frame rate are separate decisions.

| Layout | Logical canvas | Use |
| --- | --- | --- |
| Landscape 16:9 | 1920 x 1080 | YouTube, LinkedIn, X, web, pre-roll |
| Portrait 9:16 | 1080 x 1920 | Reels, TikTok, Shorts, Stories |
| Feed 4:5 | 1080 x 1350 | Instagram and X feed, chat mockups |
| Square 1:1 | 1080 x 1080 | Feed posts on every platform; safest cross-posting format |

Platform limits, as seen in the source material (a snapshot; check the platform's current creator or ad documentation before publishing, and distinguish organic posts from ads and account-specific limits):

| Platform | Ratio | Max length | Max file size |
| --- | --- | --- | --- |
| Instagram Reels | 9:16 | 90 s | 4 GB |
| TikTok | 9:16 | 60 s default (10 min where enabled) | 287 MB |
| YouTube Shorts | 9:16 | 60 s | 256 MB |
| Instagram feed | 1:1 or 4:5 | 60 s | 4 GB |
| YouTube | 16:9 | 12 h | 256 GB |
| LinkedIn | 1:1 or 16:9 | 10 min | 5 GB |
| X | 16:9 or 1:1 | 2 min 20 s | 512 MB |
| Stories | 9:16 | about 15 s per story | trim to fit |

H.264 + AAC, which Remotion renders by default, is accepted everywhere listed. Platforms recompress uploads, so inspect the delivered file, not only the master.

## Safe zones and text size

All values are for a 1080 px wide canvas; multiply by `width / 1080` for other widths.

- General margins: keep key text at least 80 px from the sides and 100 px from the top and bottom.
- Text floors: main headline at least 84 px, important supporting text at least 44 px. Secondary labels (timestamps, tags) may be smaller but must not carry anything the viewer has to read.
- Vertical 9:16 platform UI: the top about 180 px (status bar, header) and the bottom about 280 px (caption, username, buttons) can be covered. Effective area is about 1080 x 1460 in the middle. Keep critical text in the middle 76% of the height, none in the top 10% or bottom 15%.
- Hook text bold; thin weights disappear on a phone. High contrast: white on dark or dark on light.
- Backgrounds full-bleed (never letterbox). Dark solids or restrained gradients work behind text.
- Text over footage: white, extra-bold, thin dark stroke plus soft shadow, about 85% of the frame width. Longer text steps down in size (see `short-form-styles.md`).
- Check every scene at phone size, including covers and the CTA frame.
- For a 1080 px wide composition the official video-first rule applies: decide what the viewer should notice first in each scene and build the frame around it; add no redundant elements.

## One project, several formats

Share scene components, register one `<Composition>` per format, and adapt sizes from `useVideoConfig()`:

```tsx
import {AbsoluteFill, Composition, Folder, useVideoConfig} from 'remotion';

type Props = {headline: string};

const Headline = ({headline}: Props) => {
	const {width, height} = useVideoConfig();
	const u = width / 1080;
	const portrait = height > width;
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				padding: `${(portrait ? 280 : 100) * u}px ${80 * u}px`,
				background: '#0b1120',
				color: 'white',
			}}
		>
			<h1 style={{fontSize: 84 * u, margin: 0}}>{headline}</h1>
		</AbsoluteFill>
	);
};

export const RemotionRoot = () => (
	<Folder name="Launch">
		<Composition id="Launch-Vertical" component={Headline} width={1080} height={1920} fps={30} durationInFrames={450} defaultProps={{headline: 'One place for every issue'}} />
		<Composition id="Launch-Square" component={Headline} width={1080} height={1080} fps={30} durationInFrames={450} defaultProps={{headline: 'One place for every issue'}} />
		<Composition id="Launch-Landscape" component={Headline} width={1920} height={1080} fps={30} durationInFrames={450} defaultProps={{headline: 'One place for every issue'}} />
	</Folder>
);
```

Recompose rather than center-crop: for portrait and feed editions use fewer, larger elements, new close-ups and rewritten line breaks. A dense desktop dashboard does not survive an automatic crop.

Folder names accept letters, numbers and hyphens only.

## Rendering per format

Preview in Studio first (`npx remotion studio`); render only when the user explicitly asks for the file. See `remotion-rendering` for flags and automation.

```bash
npx remotion render Launch-Vertical out/launch-vertical.mp4
npx remotion render Launch-Square out/launch-square.mp4
npx remotion render Launch-Landscape out/launch-landscape.mp4 --crf=18
npx remotion render ProductAida out/aida.mp4 --props=plan.json
npx remotion render Launch-Vertical out/frames --frames=0,45,90 --image-format=png   # stills for review
```

Masters at 2x: render the same logical composition with `--scale=2` (flag documented in `remotion-rendering`; 1920x1080 becomes 3840x2160, 1080x1920 becomes 2160x3840). That is four times the pixels, so it only helps when the sources hold that detail (vectors, real components, native-resolution captures); an upscaled 1080p recording does not become 4K. Derive upload files from the master rather than re-encoding lossy files repeatedly.
