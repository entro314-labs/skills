/**
 * Bold on-screen text over a looping vertical b-roll clip.
 *
 * `parts` has one entry for a single line, or two for a setup -> punchline reveal
 * (hard cut at `splitSec`, no fade or spring: the text is simply there).
 * Put the clip at public/bg-video.mp4. It must be your own footage or licensed stock.
 */
import {Video} from '@remotion/media';
import {loadFont} from '@remotion/google-fonts/Inter';
import {AbsoluteFill, Sequence, staticFile, useVideoConfig} from 'remotion';

const {fontFamily} = loadFont('normal', {weights: ['800'], subsets: ['latin']});

export type TextOnBrollProps = {
	/** One line, or [setup, punchline]. */
	parts: string[];
	/** Where the punchline replaces the setup. Ignored for a single part. */
	splitSec: number;
	/** Vertical position of the text block's top edge, as a fraction of the height. */
	topFraction: number;
};

/** Longer text gets a smaller size. Values are for a 1080px-wide canvas; scaled by width. */
export const fontSizeForText = (text: string): number => {
	const words = text.trim().split(/\s+/).length;
	if (words <= 5) return 84;
	if (words <= 8) return 72;
	if (words <= 15) return 60;
	return 52;
};

const OverlayText = ({
	text,
	topFraction,
}: {
	readonly text: string;
	readonly topFraction: number;
}) => {
	const {width, height} = useVideoConfig();
	return (
		<div
			style={{
				position: 'absolute',
				top: height * topFraction,
				left: '50%',
				translate: '-50% 0',
				width: '85%',
				textAlign: 'center',
				fontFamily,
				fontWeight: 800,
				fontSize: fontSizeForText(text) * (width / 1080),
				lineHeight: 1.15,
				letterSpacing: '-0.02em',
				color: 'white',
				// paintOrder keeps the fill full-weight; a centred stroke would eat into the letters.
				WebkitTextStroke: '2.5px rgba(0,0,0,0.9)',
				paintOrder: 'stroke fill',
				textShadow: '0 3px 12px rgba(0,0,0,0.5)',
			}}
		>
			{text}
		</div>
	);
};

export const TextOnBroll = ({parts, splitSec, topFraction}: TextOnBrollProps) => {
	const {fps} = useVideoConfig();
	const splitFrame = Math.round(splitSec * fps);
	const [first, second] = parts;

	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			<Video
				src={staticFile('bg-video.mp4')}
				muted
				loop
				objectFit="cover"
				style={{width: '100%', height: '100%'}}
			/>
			{second === undefined ? (
				<OverlayText text={first} topFraction={topFraction} />
			) : (
				<>
					<Sequence durationInFrames={splitFrame}>
						<OverlayText text={first} topFraction={topFraction} />
					</Sequence>
					<Sequence from={splitFrame}>
						<OverlayText text={second} topFraction={topFraction} />
					</Sequence>
				</>
			)}
		</AbsoluteFill>
	);
};
