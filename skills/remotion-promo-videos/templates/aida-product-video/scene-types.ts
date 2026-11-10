export const FPS = 30;

/** Frames shared by two adjacent scenes during a transition. Keep it between 8 and 18. */
export const TRANSITION_FRAMES = 12;

export type AidaStage = 'attention' | 'interest' | 'desire' | 'action';

export type AidaScene = {
	id: string;
	stage: AidaStage;
	durationInFrames: number;
	headline: string;
	subheadline?: string;
	/** Narration line for this scene. Also used to cross-check duration (about 2.5 words per second). */
	voiceover: string;
	/** What visual should replace the placeholder background (still, screen capture, insert). */
	assetHint?: string;
};

export type AidaPlan = {
	productName: string;
	cta: string;
	incentive: string;
	scenes: AidaScene[];
};

/** Total length once adjacent scenes overlap by TRANSITION_FRAMES. */
export const getPlanDuration = (plan: AidaPlan): number =>
	plan.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0) -
	TRANSITION_FRAMES * Math.max(0, plan.scenes.length - 1);
