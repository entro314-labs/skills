/**
 * Messenger-style chat conversation mockup in a phone frame.
 *
 * - Data-driven: the whole video is an array of `ChatEvent`s with times in seconds.
 * - Auto-scroll without hand-tuned keyframes: the list is bottom-anchored and every new row
 *   grows from 0fr to 1fr, so older rows glide upward as messages arrive.
 * - Everything is derived from `useCurrentFrame()`; no CSS transitions or animations.
 */
import {loadFont} from '@remotion/google-fonts/Inter';
import {Audio} from '@remotion/media';
import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type ChatEvent =
	| {
			readonly kind: 'message';
			readonly from: 'me' | 'them';
			readonly text: string;
			readonly time: string;
			readonly atSec: number;
	  }
	| {readonly kind: 'typing'; readonly atSec: number; readonly durationSec: number};

export type ChatProps = {
	contactName: string;
	contactStatus: string;
	/** One letter shown in the round avatar. */
	avatarLetter: string;
	events: ChatEvent[];
	sound: boolean;
};

const {fontFamily} = loadFont('normal', {weights: ['400', '600', '700'], subsets: ['latin']});

const THEME = {
	screen: '#0b141a',
	header: '#1f2c34',
	outgoing: '#005c4b',
	incoming: '#1f2c34',
	text: '#e9edef',
	muted: '#8696a0',
	accent: '#00a884',
	read: '#53bdeb',
	backdrop: 'linear-gradient(180deg, #0f1a2e 0%, #162447 50%, #1f4068 100%)',
};

const SFX_INCOMING = 'https://remotion.media/ding.wav';
const SFX_OUTGOING = 'https://remotion.media/mouse-click.wav';
const CLAMP = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const PUSH = Easing.bezier(0.16, 1, 0.3, 1);

/** Length of the video: last event plus a tail so the final message can be read. */
export const getChatDuration = (
	events: readonly ChatEvent[],
	fps: number,
	tailSec = 2,
): number => {
	const lastSec = Math.max(
		...events.map((e) => (e.kind === 'typing' ? e.atSec + e.durationSec : e.atSec)),
	);
	return Math.round((lastSec + tailSec) * fps);
};

/** Renders `**bold**` and `` `code` `` spans; everything else is plain text. */
const renderRichText = (text: string): ReactNode[] =>
	text.split(/(`[^`]+`)/g).flatMap((part, i) => {
		if (part.startsWith('`') && part.endsWith('`')) {
			return [
				<span
					key={i}
					style={{
						background: 'rgba(0,0,0,0.35)',
						padding: '0.1em 0.35em',
						borderRadius: 6,
						fontFamily: 'ui-monospace, Menlo, monospace',
						fontSize: '0.88em',
						display: 'inline-block',
						maxWidth: '100%',
						overflowWrap: 'anywhere',
					}}
				>
					{part.slice(1, -1)}
				</span>,
			];
		}
		return part.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
			chunk.startsWith('**') && chunk.endsWith('**') ? (
				<strong key={`${i}-${j}`}>{chunk.slice(2, -2)}</strong>
			) : (
				chunk
			),
		);
	});

/** Collapsible row. `endFrame` makes it disappear again (used by the typing indicator). */
const Row = ({
	startFrame,
	endFrame,
	children,
}: {
	readonly startFrame: number;
	readonly endFrame?: number;
	readonly children: (progress: number) => ReactNode;
}) => {
	const frame = useCurrentFrame();
	if (frame < startFrame || (endFrame !== undefined && frame >= endFrame)) {
		return null;
	}
	const enter = interpolate(frame, [startFrame, startFrame + 9], [0, 1], {
		...CLAMP,
		easing: PUSH,
	});
	const exit =
		endFrame === undefined
			? 1
			: interpolate(frame, [endFrame - 6, endFrame], [1, 0], CLAMP);
	const progress = Math.min(enter, exit);
	return (
		<div style={{display: 'grid', gridTemplateRows: `${progress}fr`}}>
			<div style={{minHeight: 0, overflow: 'hidden'}}>{children(progress)}</div>
		</div>
	);
};

const Bubble = ({
	event,
	progress,
	s,
}: {
	readonly event: Extract<ChatEvent, {kind: 'message'}>;
	readonly progress: number;
	readonly s: number;
}) => {
	const mine = event.from === 'me';
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: mine ? 'flex-end' : 'flex-start',
				padding: `${6 * s}px ${16 * s}px`,
				opacity: progress,
				scale: interpolate(progress, [0, 1], [0.85, 1], {output: 'perceptual-scale'}),
				transformOrigin: mine ? 'bottom right' : 'bottom left',
			}}
		>
			<div
				style={{
					background: mine ? THEME.outgoing : THEME.incoming,
					color: THEME.text,
					borderRadius: 18 * s,
					padding: `${14 * s}px ${18 * s}px`,
					maxWidth: '86%',
					fontSize: 34 * s,
					lineHeight: 1.35,
					whiteSpace: 'pre-wrap',
					wordBreak: 'break-word',
				}}
			>
				{renderRichText(event.text)}
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: 8 * s,
						marginTop: 6 * s,
						fontSize: 22 * s,
						color: THEME.muted,
					}}
				>
					<span>{event.time}</span>
					{mine ? <span style={{color: THEME.read}}>{'✓✓'}</span> : null}
				</div>
			</div>
		</div>
	);
};

const TypingDots = ({progress, s}: {readonly progress: number; readonly s: number}) => {
	const frame = useCurrentFrame();
	return (
		<div style={{display: 'flex', padding: `${6 * s}px ${16 * s}px`, opacity: progress}}>
			<div
				style={{
					background: THEME.incoming,
					borderRadius: 18 * s,
					padding: `${20 * s}px ${26 * s}px`,
					display: 'flex',
					gap: 8 * s,
				}}
			>
				{[0, 1, 2].map((i) => (
					<div
						key={i}
						style={{
							width: 14 * s,
							height: 14 * s,
							borderRadius: 7 * s,
							background: THEME.muted,
							translate: `0px ${Math.sin(frame * 0.5 + i) * 5 * s}px`,
						}}
					/>
				))}
			</div>
		</div>
	);
};

export const ChatVideo = ({
	contactName,
	contactStatus,
	avatarLetter,
	events,
	sound,
}: ChatProps) => {
	const {fps, width, height} = useVideoConfig();
	// Phone keeps a roughly 1:2 shape and fits the canvas; `s` scales every inner measurement.
	const phoneH = height * 0.94;
	const phoneW = Math.min(width * 0.86, phoneH * 0.5);
	const s = phoneW / 620;

	return (
		<AbsoluteFill
			style={{
				background: THEME.backdrop,
				fontFamily,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					width: phoneW,
					height: phoneH,
					background: '#000',
					borderRadius: 55 * s,
					padding: 12 * s,
					boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
					position: 'relative',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 20 * s,
						left: '50%',
						translate: '-50% 0',
						width: 125 * s,
						height: 35 * s,
						borderRadius: 20 * s,
						background: '#000',
						zIndex: 10,
					}}
				/>
				<div
					style={{
						width: '100%',
						height: '100%',
						borderRadius: 45 * s,
						overflow: 'hidden',
						background: THEME.screen,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<div
						style={{
							background: THEME.header,
							padding: `${64 * s}px ${24 * s}px ${20 * s}px`,
							display: 'flex',
							alignItems: 'center',
							gap: 16 * s,
						}}
					>
						<div
							style={{
								width: 60 * s,
								height: 60 * s,
								borderRadius: 30 * s,
								background: THEME.accent,
								color: THEME.screen,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 32 * s,
								fontWeight: 700,
							}}
						>
							{avatarLetter}
						</div>
						<div>
							<div style={{color: THEME.text, fontSize: 32 * s, fontWeight: 600}}>
								{contactName}
							</div>
							<div style={{color: THEME.muted, fontSize: 22 * s}}>{contactStatus}</div>
						</div>
					</div>
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-end',
							overflow: 'hidden',
							paddingBottom: 48 * s,
						}}
					>
						{events.map((event, i) => {
							const start = Math.round(event.atSec * fps);
							return event.kind === 'typing' ? (
								<Row
									key={i}
									startFrame={start}
									endFrame={start + Math.round(event.durationSec * fps)}
								>
									{(p) => <TypingDots progress={p} s={s} />}
								</Row>
							) : (
								<Row key={i} startFrame={start}>
									{(p) => <Bubble event={event} progress={p} s={s} />}
								</Row>
							);
						})}
					</div>
				</div>
			</div>
			{sound
				? events.flatMap((event, i) =>
						event.kind === 'message'
							? [
									<Audio
										key={i}
										src={event.from === 'me' ? SFX_OUTGOING : SFX_INCOMING}
										from={Math.round(event.atSec * fps)}
										volume={0.5}
									/>,
								]
							: [],
					)
				: null}
		</AbsoluteFill>
	);
};
