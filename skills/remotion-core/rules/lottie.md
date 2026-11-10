# Lottie animations

Install: `npx remotion add @remotion/lottie`.

Load the animation JSON, hold the render with `delayRender()` until it arrives, then render with `<Lottie>`. Put the JSON in `public/` and fetch it with `staticFile()` (a remote URL also works if it allows CORS).

```tsx
import {Lottie, LottieAnimationData} from '@remotion/lottie';
import {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';

export const MyAnimation = () => {
  const [handle] = useState(() => delayRender('Loading Lottie animation'));
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch(staticFile('animation.json'))
      .then((data) => data.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, [handle]);

  if (!animationData) {
    return null;
  }

  return <Lottie animationData={animationData} style={{width: 400, height: 400}} />;
};
```

`<Lottie>` takes `style` for sizing, positioning and animating. The same `delayRender()` / `continueRender()` / `cancelRender()` pattern applies to any asynchronous data a component needs before a frame can be captured.
