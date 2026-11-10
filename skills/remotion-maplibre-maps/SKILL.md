---
name: remotion-maplibre-maps
description: Make deterministic animated maps in Remotion without any account, API key or token, using MapLibre GL JS plus Turf for route reveals, markers, labels, country or region highlights and camera moves, or a static locator image for simple location shots. Use when the user wants a map animation, animated flight or travel route, geographic explainer, line-drawing on a map, or a location locator in a Remotion video. Covers render stability (fixed map plate), smooth camera paths, and WebGL render flags.
---

# Remotion maps (no keys, no accounts)

Pick one technique per shot.

| Shot | Technique |
| --- | --- |
| Location context only; nothing animates | [Static map](#static-map) |
| Animated routes, markers, labels, highlighted regions, modest 2D reframing | [MapLibre](#maplibre) |

Not covered: Mapbox (needs an access token), MapTiler (needs an API key), and CesiumJS flythroughs (need hosted terrain/imagery or 3D-tile providers with API keys). If the user insists on one of those, tell them it needs an account with that provider and that the render-stability and camera-path guidance below still applies to any WebGL map renderer.

## Static map

A single image is the smallest, fastest and most deterministic option.

1. Export a map image at the composition's final aspect ratio and at least the rendered pixel size.
2. Put it in `public/` and render it with `staticFile()`.
3. Draw fixed labels and markers as ordinary Remotion elements; animate them with `interpolate()` / `spring()`.

```tsx
import {CanvasImage, staticFile} from 'remotion';

export const StaticMap: React.FC = () => (
  <CanvasImage
    src={staticFile('locator-map.png')}
    style={{width: '100%', height: '100%', objectFit: 'cover'}}
  />
);
```

(`<Img>` also works for a plain image.)

## MapLibre

MapLibre GL JS renders the map; Turf does the geodesy. Coordinates in MapLibre, Turf and GeoJSON are `[longitude, latitude]`.

```bash
npm i maplibre-gl @turf/turf     # or bun i / yarn add / pnpm i
```

Do not install `@types/maplibre-gl`: MapLibre ships its own types. Import the CSS once: `import 'maplibre-gl/dist/maplibre-gl.css';`

### Core rules

- Use `@turf/turf` for great-circle routes, distances, slicing lines (`lineSliceAlong`) and positions along a route (`along`). Do not hand-roll them unless the user wants a custom non-geodesic effect.
- Draw lines, markers and labels as GeoJSON sources plus map layers. Avoid DOM `Marker` elements unless HTML markers are requested.
- Make the map deterministic: `interactive: false`, `fadeDuration: 0`, `attributionControl: false`, `canvasContextAttributes: {preserveDrawingBuffer: true}`.
- Drive all animation from `useCurrentFrame()`. No CSS transitions or browser timers.
- Gate map loading and every per-frame update with `delayRender()` / `continueRender()` (from `useDelayRender()`).
- Before the first `continueRender`: add sources and layers, apply the frame-0 camera with `jumpTo()`, then wait for `idle`.
- Per frame: update data, move the camera, `map.once('idle', ...)`, then `map.triggerRepaint()` so `idle` fires even if nothing changed.
- Do not call `mapInstance.remove()` in a cleanup function; it can interfere with Remotion's render lifecycle.
- Keep the loaded map in React state and skip per-frame work until it is set.
- **Keep the camera static by default.** Per-frame `jumpTo()` on a moving camera can shimmer in headless capture. Read [references/render-stability.md](references/render-stability.md) before moving it; the fix is a fixed map plate moved with CSS.
- This technique does not give real terrain, changing pitch/bearing or banking. Treat anything beyond a modest 2D reframe as unsupported and verify a short MP4 first.
- Keep any required provider attribution visible, check the terms of the chosen style and tile source before rendering, and record the source and effective date of custom or disputed geography.
- Inspect rendered pixels (a `remotion still` or short MP4) at every required aspect ratio, not only Studio playback.
- Make marker radii and label sizes large enough for the composition resolution (e.g. circle radius 12, text size 28 at 1080p).

### Base styles

- Zero-setup demo: `style: 'https://demotiles.maplibre.org/style.json'` (the stock MapLibre demo style; no key, but it is fetched at render time and meant for demos).
- Any valid MapLibre style JSON URL works. Use the provider's terms and attribution rules.
- Fully local, no tile service: pass a style object whose only sources are your own GeoJSON (for example country polygons from an open dataset you downloaded). Pass the parsed GeoJSON object as `data` rather than a URL.

```ts
import type {StyleSpecification} from 'maplibre-gl';
import countries from './countries.json'; // GeoJSON FeatureCollection you downloaded

const style: StyleSpecification = {
  version: 8,
  sources: {countries: {type: 'geojson', data: countries as GeoJSON.FeatureCollection}},
  layers: [
    {id: 'background', type: 'background', paint: {'background-color': '#0e1a24'}},
    {id: 'country-fill', type: 'fill', source: 'countries', paint: {'fill-color': '#1f3a4d'}},
    {id: 'country-border', type: 'line', source: 'countries', paint: {'line-color': '#5f8aa6', 'line-width': 1.5}},
  ],
};
```

Text `symbol` layers need a `glyphs` URL (font stacks). A local style has none, so render labels as HTML overlays instead, see [references/line-and-label-animation.md](references/line-and-label-animation.md).

### Basic map

```tsx
import {useEffect, useRef, useState} from 'react';
import {useDelayRender, useVideoConfig} from 'remotion';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const zurich: [number, number] = [8.5417, 47.3769];

export const MyComposition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {delayRender, continueRender} = useDelayRender();
  const {width, height} = useVideoConfig();
  const [loadingHandle] = useState(() => delayRender('Loading map'));

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    maplibregl.setWorkerUrl(
      URL.createObjectURL(
        new Blob(
          [`import "https://unpkg.com/maplibre-gl@${maplibregl.getVersion()}/dist/maplibre-gl-worker.mjs";`],
          {type: 'text/javascript'},
        ),
      ),
    );

    const mapInstance = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: zurich,
      zoom: 7,
      interactive: false,
      attributionControl: false,
      fadeDuration: 0,
      canvasContextAttributes: {preserveDrawingBuffer: true},
    });

    mapInstance.on('load', () => {
      mapInstance.jumpTo({center: zurich, zoom: 7});
      mapInstance.once('idle', () => {
        continueRender(loadingHandle);
      });
    });
  }, [continueRender, loadingHandle]);

  return <div ref={containerRef} style={{width, height, position: 'absolute'}} />;
};
```

The `setWorkerUrl` blob loads the MapLibre worker from a CDN (unpkg) at the installed version, which makes the worker loadable inside the Remotion bundle. It is a network fetch at render time, like the style URL.

### Animated routes, markers and labels

- Full animated great-circle flight route (Turf line reveal, separate camera route, `calculateCameraOptionsFromTo`, frame-0 preparation): [references/maplibre-route.md](references/maplibre-route.md).
- Line reveal with a draw head, multi-segment border draws, country sequences, HTML labels projected each frame, label anchors, basemap clutter stripping: [references/line-and-label-animation.md](references/line-and-label-animation.md).
- Smooth camera routes (Chaikin smoothing, constant ground speed, look-ahead heading, centerline preparation): [references/camera-path.md](references/camera-path.md).
- Moving-camera shimmer and the fixed map plate recipe: [references/render-stability.md](references/render-stability.md).

### Gotcha: layer objects

When building layer objects programmatically, omit optional properties that are absent. Use `...(layer.filter ? {filter: layer.filter} : {})`; never pass `filter: undefined`. An undefined filter can hide the layer while separately created halo or border layers still draw, giving missing fills and halos with no colored core.

## Rendering

WebGL map renders need ANGLE and low concurrency:

```bash
npx remotion render <composition-id> out/video.mp4 --gl=angle --concurrency=1
```

Use `bunx` (or the project's package runner) as appropriate. Validate with `npx remotion still <id> out.png --frame=N --gl=angle` first. See `remotion-rendering` for general render flags.
