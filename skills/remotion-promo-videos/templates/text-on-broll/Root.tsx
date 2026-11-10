import {Composition, Folder} from 'remotion';
import {TextOnBroll} from './TextOnBroll';

/**
 * One composition per text variant, all sharing the same b-roll clip.
 * Programmatic registration is fine here: the variants are one intentionally controlled template.
 * `first` is [text] or [setup, punchline].
 */
const VARIANTS = [
	{id: 'stop-complaint', parts: ['Stop measuring progress by how busy everyone looks.']},
	{id: 'values', parts: ['Good work does not fit in a status column.']},
	{
		id: 'two-part-reveal',
		parts: ['They said the old way was good enough.', 'Then we shipped it in one afternoon.'],
	},
] as const;

export const RemotionRoot = () => (
	<Folder name="TextOnBroll">
		{VARIANTS.map((variant) => (
			<Composition
				key={variant.id}
				id={variant.id}
				component={TextOnBroll}
				width={1080}
				height={1920}
				fps={30}
				durationInFrames={240}
				defaultProps={{parts: [...variant.parts], splitSec: 3.6, topFraction: 0.3}}
			/>
		))}
	</Folder>
);
