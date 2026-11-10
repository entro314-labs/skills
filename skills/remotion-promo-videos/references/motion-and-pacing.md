# Motion, pacing, style and audio

Promo videos should read as motion graphics, not as a slideshow. All motion comes from `useCurrentFrame()`; CSS `transition`, CSS `animation` and Tailwind animation classes do not render deterministically in Remotion. Use `scale`, `translate`, `rotate` style properties with inline `interpolate()` (add `output: 'perceptual-scale'` for scale) and `Easing.bezier()` / `Easing.spring()`. For the full API see `remotion-core`.

## Avoid / pursue

Avoid:

- Fading to black between scenes
- Centered text on a flat background as the only visual
- The same transition for every cut, and linear, robotic easing
- Static screens: every scene needs 3-5 timed moments (enter, emphasis, exit)
- Emoji as icons; use vector icons (for example `lucide-react`) or the product's own artwork

Pursue:

- Overlap: the next scene starts before the current one ends
- Layers: background, midground, foreground moving at different rates
- Spring-like easing for organic motion
- Mixed rhythm: 2-3 s punchy scenes beside 4-5 s dramatic ones
- Elements that persist across scenes (an anchor shape, a background)
- Custom transitions (clip-path reveals, 3D flips, morphs) for hero moments

## Transition techniques

Implementation mechanics (TransitionSeries, presentations, overlays, duration math, custom presentations) are in `remotion-transitions`. Note that a transition shortens the timeline by its length because both scenes play during it.

| Technique | What happens |
| --- | --- |
| Morph / scale | An element grows to fill the screen and becomes the next scene's background |
| Wipe | A colored shape sweeps across and reveals the next scene |
| Zoom-through | The camera pushes into an element and emerges in the new scene |
| Clip-path reveal | A circle or polygon grows from a point |
| Persistent anchor | One element stays while its surroundings change |
| Directional flow | Scene 1 exits right, scene 2 enters from the right |
| Split / unfold | The screen divides and panels slide apart |
| Perspective flip | The scene rotates on the Y axis |

Rules of thumb: transitions of 8-18 frames at 30 fps; a direct cut when the story turns sharply; a quick wipe or slide for a momentum shift; a dissolve only to soften emotionally. Vary the choice by narrative beat instead of repeating one preset, and save custom presentations for the hero moments.

## Timing reference

| Feel | Duration | Use |
| --- | --- | --- |
| Micro | 0.1-0.2 s | small shifts, feedback |
| Snappy | 0.2-0.4 s | element entrances, position changes |
| Standard | 0.5-0.8 s | scene transitions, major reveals |
| Dramatic | 1.0-1.5 s | hero moments, cinematic reveals |

Spring configs for `spring({frame, fps, config})`: snappy `{stiffness: 400, damping: 30}`, bouncy `{stiffness: 300, damping: 15}`, smooth `{stiffness: 120, damping: 25}`; `{damping: 200}` gives a push with no bounce. Limit how many properties animate at once; scale + opacity + position is the default before anything fancier.

Pacing: hook inside the first 3 s, no scene longer than about 5 s without a new element, one message per scene, final CTA frame held at least 2 s.

## Persistent layers

Place persistent elements outside the scene `Sequence`s or `TransitionSeries`, and drive them from the global frame. A frame-driven anchor that glides to a new position at each scene start:

```tsx
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const TARGETS = [
	{x: 100, y: 100, scale: 1, opacity: 0.3},
	{x: 800, y: 200, scale: 2, opacity: 0.5},
	{x: 400, y: 600, scale: 0.5, opacity: 1},
];

export const PersistentShape = ({sceneStarts}: {readonly sceneStarts: number[]}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const index = Math.max(0, sceneStarts.filter((s) => frame >= s).length - 1);
	const from = TARGETS[Math.max(0, index - 1)];
	const to = TARGETS[index];
	const p = interpolate(frame - sceneStarts[index], [0, 0.8 * fps], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const mix = (a: number, b: number) => interpolate(p, [0, 1], [a, b]);
	return (
		<div
			style={{
				position: 'absolute',
				width: 128,
				height: 128,
				borderRadius: 64,
				background: '#f97316',
				translate: `${mix(from.x, to.x)}px ${mix(from.y, to.y)}px`,
				scale: mix(from.scale, to.scale),
				opacity: mix(from.opacity, to.opacity),
			}}
		/>
	);
};
```

Gotcha: a full-frame background (`AbsoluteFill`, positioned) paints above non-positioned siblings that come later in the DOM. Give the content wrappers `position: 'relative'` or build them from `AbsoluteFill`, otherwise cards silently disappear behind the background.

## Visual style

- Typography: one display font and one body font at most; massive headlines with tight tracking; mix weights for hierarchy; keep text short because viewers cannot pause. Load fonts through `@remotion/google-fonts` or local fonts so every machine renders the same.
- Color: use the product's real palette and accents. Avoid default purple/indigo gradients unless the brand uses them. A single dark tone or subtle gradient beats stacked textures.
- Layout: asymmetric, off-center type; edge-aligned elements for tension; generous whitespace; depth used sparingly (one backdrop blur or one gradient).
- Prefer visual metaphors and outcomes over UI tours. Show who uses the product, when, and what changes.
- Text sizes and safe zones: `formats-and-safe-zones.md`.

## Quality tests before delivery

- Mute test: does the story follow without sound?
- Squint test: is the hierarchy visible when squinting?
- Timing test: does motion feel natural, not robotic?
- Consistency test: do similar elements behave similarly?
- Slideshow test: would it pass for a slide deck? If so, add layering and overlap.
- Loop test (when it should loop): does the last frame lead cleanly into the first?
- Inspect stills of the hook, each hero scene, a mid-transition frame and the CTA, then play the whole video at normal speed.

## Audio

- Voiceover is the primary channel; music sits under it. Lower the music while narration plays and keep it sparse during problem framing; let it lift near the CTA.
- Add short transition SFX only where they reinforce movement. Remotion hosts a set of effects at `https://remotion.media/` (for example `whoosh.wav`, `whip.wav`, `switch.wav`, `mouse-click.wav`, `ding.wav`).
- Ducking is a frame-driven volume curve on `<Audio>` from `@remotion/media`:

```tsx
import {Audio} from '@remotion/media';
import {interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const Music = ({voStartSec, voEndSec}: {voStartSec: number; voEndSec: number}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const a = voStartSec * fps;
	const b = voEndSec * fps;
	return (
		<Audio
			src={staticFile('music.mp3')}
			loop
			volume={interpolate(frame, [a - 10, a, b, b + 20], [0.35, 0.12, 0.12, 0.35], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
			})}
		/>
	);
};
```

- Check levels on laptop speakers and on a phone speaker. Use music you own or have a license for, and note its source in the handoff.

### Narration from a local audio file

Any TTS or recorded voice works as long as it is a file under `public/`. On macOS the built-in `say` is enough for a scratch track:

```bash
say -r 170 -o public/narration/scene-1.aiff "Open one dashboard and prioritize the right work."
ffmpeg -i public/narration/scene-1.aiff public/narration/scene-1.mp3
ffprobe -v error -show_entries format=duration -of csv=p=0 public/narration/scene-1.mp3
```

Set each scene's length to the measured audio duration plus about 0.8 s, either by hand or in `calculateMetadata`. Write narration as speech at roughly 120-150 words per minute.
