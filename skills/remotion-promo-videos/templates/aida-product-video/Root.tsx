import {Composition} from 'remotion';
import {ProductAidaVideo} from './ProductAidaVideo';
import {samplePlan} from './sample-plan';
import {FPS, getPlanDuration} from './scene-types';

export const RemotionRoot = () => (
	<Composition
		id="ProductAida"
		component={ProductAidaVideo}
		width={1920}
		height={1080}
		fps={FPS}
		durationInFrames={getPlanDuration(samplePlan)}
		// Data-driven template: the plan is imported on purpose so `--props=plan.json` can replace it.
		// For a one-off video, inline the object instead so Studio can write edits back to this file.
		defaultProps={{plan: samplePlan}}
		calculateMetadata={({props}) => ({durationInFrames: getPlanDuration(props.plan)})}
	/>
);
