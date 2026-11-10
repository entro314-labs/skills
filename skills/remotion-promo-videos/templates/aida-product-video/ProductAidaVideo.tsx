/**
 * Data-driven AIDA animatic: one scene card per plan entry, joined by TransitionSeries.
 * It is a working skeleton. Replace `SceneCard` backgrounds with real product surfaces,
 * keep the plan + timing structure.
 */
import {loadFont} from '@remotion/google-fonts/Inter';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {TRANSITION_FRAMES} from './scene-types';
import type {AidaPlan, AidaScene, AidaStage} from './scene-types';

// Swap for the brand font. Loading through @remotion/google-fonts keeps renders identical on every machine.
const {fontFamily} = loadFont('normal', {weights: ['400', '800'], subsets: ['latin']});

const STAGE_BACKGROUND: Record<AidaStage, string> = {
	attention: 'linear-gradient(135deg, #1f2937 0%, #7f1d1d 100%)',
	interest: 'linear-gradient(135deg, #0f172a 0%, #164e63 100%)',
	desire: 'linear-gradient(135deg, #172554 0%, #1e3a8a 100%)',
	action: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',
};

const STAGE_LABEL: Record<AidaStage, string> = {
	attention: 'Attention',
	interest: 'Interest',
	desire: 'Desire',
	action: 'Action',
};

/**
 * Vary the cut by narrative turn: a wipe for the reveal, slides between use cases, a fade to close.
 * Called as a plain function, not rendered as a component: TransitionSeries only accepts
 * TransitionSeries.Sequence / .Transition / .Overlay as direct children.
 */
const transitionInto = (stage: AidaStage, key: string) => {
	const timing = linearTiming({durationInFrames: TRANSITION_FRAMES});
	switch (stage) {
		case 'attention':
		case 'interest':
			return (
				<TransitionSeries.Transition
					key={key}
					presentation={wipe({direction: 'from-left'})}
					timing={timing}
				/>
			);
		case 'desire':
			return (
				<TransitionSeries.Transition
					key={key}
					presentation={slide({direction: 'from-right'})}
					timing={timing}
				/>
			);
		case 'action':
			return <TransitionSeries.Transition key={key} presentation={fade()} timing={timing} />;
	}
};

const SceneCard = ({
	scene,
	incentive,
}: {
	readonly scene: AidaScene;
	readonly incentive: string;
}) => {
	const frame = useCurrentFrame();
	const {width} = useVideoConfig();
	// Official minimums are 84px headline / 44px support at 1080px wide. Scale with width.
	const u = width / 1080;
	return (
		<AbsoluteFill
			style={{
				background: STAGE_BACKGROUND[scene.stage],
				color: '#f8fafc',
				fontFamily,
				justifyContent: 'center',
				padding: `${100 * u}px ${80 * u}px`,
			}}
		>
			<div style={{fontSize: 28 * u, letterSpacing: 6 * u, opacity: 0.8, marginBottom: 32 * u}}>
				{STAGE_LABEL[scene.stage].toUpperCase()}
			</div>
			<h1
				style={{
					fontSize: 84 * u,
					lineHeight: 1.05,
					margin: 0,
					fontWeight: 800,
					opacity: interpolate(frame, [0, 10], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}),
					translate: interpolate(frame, [0, 18], [`0px ${40 * u}px`, '0px 0px'], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
						easing: Easing.bezier(0.16, 1, 0.3, 1),
					}),
				}}
			>
				{scene.headline}
			</h1>
			{scene.subheadline && scene.stage !== 'action' ? (
				<p
					style={{
						fontSize: 44 * u,
						lineHeight: 1.2,
						margin: `${28 * u}px 0 0`,
						opacity: interpolate(frame, [10, 24], [0, 0.9], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					{scene.subheadline}
				</p>
			) : null}
			{scene.stage === 'action' ? (
				<div
					style={{
						marginTop: 56 * u,
						alignSelf: 'flex-start',
						padding: `${18 * u}px ${40 * u}px`,
						borderRadius: 999,
						background: '#f8fafc',
						color: '#052e16',
						fontSize: 44 * u,
						fontWeight: 800,
					}}
				>
					{incentive}
				</div>
			) : null}
		</AbsoluteFill>
	);
};

export const ProductAidaVideo = ({plan}: {readonly plan: AidaPlan}) => (
	<TransitionSeries>
		{plan.scenes.flatMap((scene, i) => [
			...(i > 0 ? [transitionInto(scene.stage, `${scene.id}-in`)] : []),
			<TransitionSeries.Sequence
				key={scene.id}
				name={scene.id}
				durationInFrames={scene.durationInFrames}
			>
				<SceneCard scene={scene} incentive={plan.incentive} />
			</TransitionSeries.Sequence>,
		])}
	</TransitionSeries>
);
