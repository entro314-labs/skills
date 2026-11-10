import {Composition} from 'remotion';
import {NarratedSlides} from './NarratedSlides';

export const RemotionRoot = () => (
	<Composition
		id="NarratedShort"
		component={NarratedSlides}
		width={1080}
		height={1920}
		fps={30}
		// Placeholder; calculateMetadata sets the real length from totalSec.
		durationInFrames={900}
		defaultProps={{
			narration: 'narration.mp3',
			totalSec: 30,
			slides: [
				{image: 'slides/01.png', startSec: 0},
				{image: 'slides/02.png', startSec: 3},
				{image: 'slides/03.png', startSec: 6.5},
			],
		}}
		calculateMetadata={({props}) => ({
			durationInFrames: Math.round(props.totalSec * 30),
		})}
	/>
);
