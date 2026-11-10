/**
 * Brand-agnostic building blocks for promo videos.
 *
 * Every colour and font comes from a `Brand` object, so nothing is hardcoded to a product.
 * All motion is driven by `useCurrentFrame()`; there are no CSS transitions or animations.
 * Delays are in frames. Convert from seconds with the composition's `fps` at the call site.
 */
import type {LucideIcon} from 'lucide-react';
import type {CSSProperties, ReactNode} from 'react';
import {
	AbsoluteFill,
	Easing,
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export type Brand = {
	name: string;
	accent: string;
	background: string;
	foreground: string;
	muted: string;
	fontFamily: string;
};

const CLAMP = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const PUSH = Easing.bezier(0.16, 1, 0.3, 1);

/** Slowly rotating two-colour gradient. Mount it OUTSIDE the scene sequences so it persists across cuts. */
export const AnimatedGradient = ({
	from,
	to,
	degreesPerFrame = 0.4,
}: {
	readonly from: string;
	readonly to: string;
	readonly degreesPerFrame?: number;
}) => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(${135 + frame * degreesPerFrame}deg, ${from}, ${to})`,
			}}
		/>
	);
};

/** Icon + title + description card that rises into place. Pass a lucide-react icon, never an emoji. */
export const FeatureCard = ({
	icon: Icon,
	title,
	description,
	brand,
	delayFrames = 0,
}: {
	readonly icon: LucideIcon;
	readonly title: string;
	readonly description: string;
	readonly brand: Brand;
	readonly delayFrames?: number;
}) => {
	const t = useCurrentFrame() - delayFrames;
	return (
		<div
			style={{
				opacity: interpolate(t, [0, 12], [0, 1], CLAMP),
				translate: interpolate(t, [0, 18], ['0px 40px', '0px 0px'], {
					...CLAMP,
					easing: PUSH,
				}),
				background: 'rgba(255,255,255,0.08)',
				border: '1px solid rgba(255,255,255,0.18)',
				borderRadius: 28,
				padding: 40,
				color: brand.foreground,
				fontFamily: brand.fontFamily,
			}}
		>
			<Icon size={56} color={brand.accent} strokeWidth={2} />
			<h3 style={{fontSize: 44, margin: '24px 0 12px'}}>{title}</h3>
			<p style={{fontSize: 30, margin: 0, color: brand.muted, lineHeight: 1.3}}>
				{description}
			</p>
		</div>
	);
};

/** Number that counts up from 0. `en-US` formatting keeps renders identical across machines. */
export const StatCounter = ({
	value,
	label,
	brand,
	suffix = '',
	delayFrames = 0,
	durationFrames = 45,
}: {
	readonly value: number;
	readonly label: string;
	readonly brand: Brand;
	readonly suffix?: string;
	readonly delayFrames?: number;
	readonly durationFrames?: number;
}) => {
	const t = useCurrentFrame() - delayFrames;
	const shown = Math.round(
		interpolate(t, [0, durationFrames], [0, value], {...CLAMP, easing: PUSH}),
	);
	return (
		<div style={{textAlign: 'center', fontFamily: brand.fontFamily}}>
			<div
				style={{
					fontSize: 140,
					fontWeight: 800,
					lineHeight: 1,
					color: brand.foreground,
					fontVariantNumeric: 'tabular-nums',
				}}
			>
				{shown.toLocaleString('en-US')}
				{suffix}
			</div>
			<div
				style={{
					fontSize: 36,
					letterSpacing: 4,
					textTransform: 'uppercase',
					color: brand.muted,
					marginTop: 16,
				}}
			>
				{label}
			</div>
		</div>
	);
};

/** Pill button that pops in with a spring, with a light sweep once it has landed. */
export const CtaButton = ({
	text,
	brand,
	delayFrames = 0,
}: {
	readonly text: string;
	readonly brand: Brand;
	readonly delayFrames?: number;
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame - delayFrames;
	const pop = spring({frame: t, fps, config: {damping: 12, stiffness: 200}});
	return (
		<div
			style={{
				position: 'relative',
				display: 'inline-block',
				overflow: 'hidden',
				scale: pop,
				padding: '28px 72px',
				borderRadius: 999,
				background: brand.accent,
				color: brand.background,
				fontFamily: brand.fontFamily,
				fontSize: 52,
				fontWeight: 800,
			}}
		>
			{text}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
					translate: `${interpolate(t, [fps, fps * 2], [-100, 100], CLAMP)}% 0`,
				}}
			/>
		</div>
	);
};

/** Word-by-word headline reveal. Word level (not letter level) keeps text readable and fast. */
export const KineticText = ({
	text,
	style,
	delayFrames = 0,
	staggerFrames = 3,
}: {
	readonly text: string;
	readonly style?: CSSProperties;
	readonly delayFrames?: number;
	readonly staggerFrames?: number;
}) => {
	const frame = useCurrentFrame();
	return (
		<div style={{display: 'flex', flexWrap: 'wrap', columnGap: '0.28em', ...style}}>
			{text.split(' ').map((word, i) => {
				const t = frame - delayFrames - i * staggerFrames;
				return (
					<span
						key={`${i}-${word}`}
						style={{
							display: 'inline-block',
							opacity: interpolate(t, [0, 10], [0, 1], CLAMP),
							translate: interpolate(t, [0, 14], ['0em 0.5em', '0em 0em'], {
								...CLAMP,
								easing: PUSH,
							}),
						}}
					>
						{word}
					</span>
				);
			})}
		</div>
	);
};

/** Typed terminal window. `lines` are typed one character per `framesPerChar` frames. */
export const TerminalWindow = ({
	lines,
	brand,
	framesPerChar = 1,
}: {
	readonly lines: readonly string[];
	readonly brand: Brand;
	readonly framesPerChar?: number;
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const typed = lines.join('\n').slice(0, Math.floor(frame / framesPerChar));
	const rows = typed.split('\n');
	const cursorOn = Math.floor(frame / (fps / 2)) % 2 === 0;
	return (
		<div
			style={{
				background: '#0d1117',
				border: '1px solid rgba(255,255,255,0.14)',
				borderRadius: 24,
				padding: 36,
				fontFamily: 'ui-monospace, Menlo, monospace',
				fontSize: 38,
				lineHeight: 1.5,
				color: brand.foreground,
			}}
		>
			<div style={{display: 'flex', gap: 12, marginBottom: 28}}>
				{['#ff5f57', '#febc2e', '#28c840'].map((c) => (
					<div key={c} style={{width: 20, height: 20, borderRadius: 10, background: c}} />
				))}
			</div>
			{rows.map((row, i) => (
				<div key={i}>
					<span style={{color: brand.accent}}>$ </span>
					{row}
					{i === rows.length - 1 && cursorOn ? '▌' : ''}
				</div>
			))}
		</div>
	);
};

/** Slow push-in (or pull-out) on a still image, for photo galleries. Place it inside a `Sequence`. */
export const KenBurnsImage = ({
	src,
	direction = 'in',
	travel = 0.12,
}: {
	readonly src: string;
	readonly direction?: 'in' | 'out';
	readonly travel?: number;
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const range = direction === 'in' ? [1, 1 + travel] : [1 + travel, 1];
	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			<Img
				src={src}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					scale: interpolate(frame, [0, durationInFrames], range, {
						...CLAMP,
						output: 'perceptual-scale',
					}),
				}}
			/>
		</AbsoluteFill>
	);
};

/** Closing card: logo, one headline, one CTA, one URL. Hold it for at least 2 seconds. */
export const EndCard = ({
	logoSrc,
	headline,
	cta,
	url,
	brand,
}: {
	readonly logoSrc: string;
	readonly headline: ReactNode;
	readonly cta: string;
	readonly url: string;
	readonly brand: Brand;
}) => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill
			style={{
				background: brand.background,
				color: brand.foreground,
				fontFamily: brand.fontFamily,
				alignItems: 'center',
				justifyContent: 'center',
				gap: 48,
				textAlign: 'center',
				padding: 100,
			}}
		>
			<Img
				src={logoSrc}
				style={{width: 220, opacity: interpolate(frame, [0, 15], [0, 1], CLAMP)}}
			/>
			<div style={{fontSize: 96, fontWeight: 800, lineHeight: 1.05}}>{headline}</div>
			<CtaButton text={cta} brand={brand} delayFrames={10} />
			<div
				style={{
					fontSize: 44,
					color: brand.muted,
					opacity: interpolate(frame, [20, 35], [0, 1], CLAMP),
				}}
			>
				{url}
			</div>
		</AbsoluteFill>
	);
};
