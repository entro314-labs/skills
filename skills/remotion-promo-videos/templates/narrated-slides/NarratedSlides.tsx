/**
 * Narrated illustrated short: one full-bleed image per beat, slow push-in, one narration track.
 *
 * Slide times come from the narration (word timestamps or measured sentence ends), not from a
 * fixed grid. The last slide should be a quiet closing image that loops back to the first;
 * add no end card if the platform auto-loops.
 */
import {Audio} from '@remotion/media';
import {AbsoluteFill, Sequence, staticFile, useVideoConfig} from 'remotion';
import {KenBurnsImage} from '../components/promo-components';

export type Slide = {
	/** File inside public/, for example "slides/01.png". */
	image: string;
	/** When the slide appears, in seconds from the start of the narration. */
	startSec: number;
};

export type NarratedSlidesProps = {
	narration: string;
	slides: Slide[];
	/** Total length in seconds, normally narration length plus a short tail. Read by Root's calculateMetadata. */
	totalSec: number;
	/** Optional music file inside public/, played quietly under the narration. */
	music?: string;
};

export const NarratedSlides = ({narration, slides, music}: NarratedSlidesProps) => {
	const {fps, durationInFrames} = useVideoConfig();
	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			{slides.map((slide, i) => {
				const from = Math.round(slide.startSec * fps);
				const next = slides[i + 1];
				const end = next ? Math.round(next.startSec * fps) : durationInFrames;
				return (
					<Sequence key={slide.image} from={from} durationInFrames={end - from}>
						<KenBurnsImage
							src={staticFile(slide.image)}
							direction={i % 2 === 0 ? 'in' : 'out'}
						/>
					</Sequence>
				);
			})}
			<Audio src={staticFile(narration)} />
			{music ? <Audio src={staticFile(music)} volume={0.12} loop /> : null}
		</AbsoluteFill>
	);
};
