import {Composition} from 'remotion';
import {ChatVideo, getChatDuration} from './ChatVideo';

export const RemotionRoot = () => (
	<Composition
		id="ChatDemo"
		component={ChatVideo}
		// 4:5 feed canvas. Use 1080x1920 for Reels/TikTok/Shorts, 1080x1080 for square.
		width={1080}
		height={1350}
		fps={30}
		// Placeholder; calculateMetadata sets the real length from the events.
		durationInFrames={300}
		defaultProps={{
			contactName: 'Assistant',
			contactStatus: 'online',
			avatarLetter: 'A',
			sound: true,
			events: [
				{kind: 'message', from: 'me', text: 'Can you summarize this week’s support tickets?', time: '9:18 AM', atSec: 0.7},
				{kind: 'typing', atSec: 2.4, durationSec: 1.6},
				{kind: 'message', from: 'them', text: 'Sure. **42 tickets** came in, 31 are closed.', time: '9:18 AM', atSec: 4.2},
				{kind: 'typing', atSec: 6.2, durationSec: 1.8},
				{kind: 'message', from: 'them', text: 'Top issue: login loops on mobile.\nFix is queued in `release-2.4`.', time: '9:19 AM', atSec: 8.2},
				{kind: 'message', from: 'me', text: 'Great, send that to the team.', time: '9:20 AM', atSec: 11.2},
			],
		}}
		calculateMetadata={({props}) => ({
			durationInFrames: getChatDuration(props.events, 30),
		})}
	/>
);
