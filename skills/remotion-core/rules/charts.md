# Charts and data visualization

Build charts with regular React: HTML, SVG, or D3.js. Disable all animations built into charting libraries; they run on their own clock and cause flickering during rendering. Drive every animation from `useCurrentFrame()`.

## Staggered bars

Animate each bar's height with a spring that starts a few frames after the previous one. A complete example (axes, labels, spring-driven bars, `loadFont`) is in [assets/charts-bar-chart.tsx](assets/charts-bar-chart.tsx); it offsets the spring with `frame - i * 5 - 10`, which is equivalent to `delay`.

```tsx
const STAGGER_DELAY = 5;
const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const bars = data.map((item, i) => {
  const height = spring({
    frame,
    fps,
    delay: i * STAGGER_DELAY,
    config: {damping: 200},
  });
  return <div key={item.label} style={{height: height * item.value}} />;
});
```

## Pie chart

Animate segments with `stroke-dashoffset`, rotated so they start at 12 o'clock.

```tsx
const frame = useCurrentFrame();

const progress = interpolate(frame, [0, 100], [0, 1], {extrapolateRight: 'clamp'});

const circumference = 2 * Math.PI * radius;
const segmentLength = (value / total) * circumference;
const offset = interpolate(progress, [0, 1], [segmentLength, 0]);

<circle
  r={radius}
  cx={center}
  cy={center}
  fill="none"
  stroke={color}
  strokeWidth={strokeWidth}
  strokeDasharray={`${segmentLength} ${circumference}`}
  strokeDashoffset={offset}
  transform={`rotate(-90 ${center} ${center})`}
/>;
```

## Data-driven videos

Pass the data as composition props (or fetch it in [calculateMetadata](calculate-metadata.md)) and derive every value from the frame, for example `progress = interpolate(frame, [0, 60], [0, 1], {extrapolateRight: 'clamp'})` scaling each bar or counter. Prefer fetching in `calculateMetadata` or passing data as props over network calls inside components.
