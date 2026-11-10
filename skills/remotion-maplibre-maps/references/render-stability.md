# Moving-map render stability

Read this before building a moving 2D map scene or diagnosing a wavering render.

## Symptom and cause

If basemap detail shimmers or jitters during a pan or zoom, the likely cause is per-frame `map.jumpTo()`. Headless capture can resample vector hillshade and raster/satellite imagery differently from frame to frame. Tile retries, easing changes and label changes do not fix this; it is a renderer effect.

## Required pattern: fixed map plate

For any 2D pan/zoom:

1. Render the map canvas once, at the largest required zoom, in an oversized container. Size it from the camera route and keep each dimension below the browser's reliable WebGL render-buffer limit (commonly 4096 px). Do not blindly use 3x: a 1920x1080 composition becomes 5760 px wide and Chromium may silently downsample it, causing visible pixelation during the CSS zoom.
2. Keep the map's own camera static.
3. Each frame, compute the target centre and zoom, then move the canvas with CSS `translate` + `scale`.
4. Apply the same transform to every projected HTML overlay.
5. Keep animating GeoJSON data and paint properties imperatively (`setData`, `setPaintProperty`); only the renderer camera is frozen.

Keep pitch and bearing constant. Genuinely changing pitch/bearing or a terrain flythrough needs a 3D engine, which is outside this skill (the hosted terrain/imagery such engines use requires provider keys).

```ts
const baseZoom = Math.max(start.zoom, end.zoom);
const map = new maplibregl.Map({
  container,
  style,
  center: end.center,
  zoom: baseZoom,
  pitch: end.pitch ?? 0,
  bearing: end.bearing ?? 0,
  interactive: false,
  fadeDuration: 0,
  attributionControl: false,
  canvasContextAttributes: {preserveDrawingBuffer: true},
});

// Per Remotion frame. `camera` is the approved centre/zoom interpolation.
const projected = map.project(camera.center);
const scale = 2 ** (camera.zoom - baseZoom);
const plate = {
  transform: `translate(${width / 2 - projected.x * scale}px, ${height / 2 - projected.y * scale}px) scale(${scale})`,
  transformOrigin: '0 0',
};

// Convert a label's projected point with exactly the same plate transform.
const labelPoint = map.project(labelLngLat);
const labelX = labelPoint.x * scale + width / 2 - projected.x * scale;
const labelY = labelPoint.y * scale + height / 2 - projected.y * scale;
```

Apply `plate` to the wrapper that contains the map container. `map.project()` returns pixels in the static map's coordinates, so the same `scale` and offset move both the canvas and the overlays.

## Plate sizing and sharpness

- Render at the maximum zoom reached by any camera waypoint, including intermediate or hold cameras. The CSS scale must never exceed `1`; otherwise the plate is being enlarged.
- Centre the frozen map on the midpoint of the camera route's geographic extent, not automatically on the final camera. This minimizes required overscan.
- Keep the largest canvas dimension at or below 4096 px unless the actual render environment was tested with a larger `MAX_RENDERBUFFER_SIZE`.
- For 1920x1080, a 3840x2160 plate is a safe default. For 1080x1920, use roughly 2700x3840 when the route needs extra horizontal pan room.
- If the route cannot fit the plate at the required zoom, split the shot into two fixed plates with a deliberate editorial transition. Do not trade sharpness for one enormous canvas.
- Distinguish failure modes: repeating shimmer means the live renderer is moving; steadily soft tiles during a CSS push mean the fixed plate is underspecified, internally downsampled, or scaled above `1`.

## Verification

- Render a short MP4, not only a Studio preview.
- Inspect static terrain texture and imagery detail while the camera moves.
- If any underlying map detail wavers, use the fixed map plate. Do not approve it as a minor preview artifact.
- Render with `--gl=angle`, `preserveDrawingBuffer: true`, and `--concurrency=1` while validating.
