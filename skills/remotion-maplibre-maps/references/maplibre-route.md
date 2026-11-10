# Animated great-circle route (MapLibre + Turf)

Recommended pattern for a route animation:

- Turf builds the route and the markers.
- Turf slices the route (`lineSliceAlong`) for the line reveal.
- The camera follows its own route (`cameraRoute`), separate from the animated line (`targetRoute`), via MapLibre's `calculateCameraOptionsFromTo()`.
- Frame 0 is prepared (sources, layers, camera) before the first `continueRender()`.
- Route progress and camera altitude are animated separately, so the camera can zoom out, travel, and zoom back in.

```tsx
import * as turf from '@turf/turf';
import {useEffect, useRef, useState} from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useDelayRender,
	useVideoConfig,
} from 'remotion';
import * as maplibregl from 'maplibre-gl';
import {type GeoJSONSource, type Map} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const zurich: [number, number] = [8.5417, 47.3769];
const newYork: [number, number] = [-74.006, 40.7128];

const greatCircleLine = (from: [number, number], to: [number, number]) => {
	const route = turf.greatCircle(from, to, {npoints: 100});

	if (route.geometry.type === 'LineString') {
		return turf.lineString(route.geometry.coordinates);
	}

	// Great-circle routes crossing the antimeridian can become MultiLineString.
	// Keep the example valid by choosing the longest segment.
	const longestSegment = route.geometry.coordinates.reduce((longest, segment) => {
		return segment.length > longest.length ? segment : longest;
	});

	return turf.lineString(longestSegment);
};

const targetRoute = greatCircleLine(zurich, newYork);
const targetRouteDistance = turf.length(targetRoute);

const cameraRoute = greatCircleLine(zurich, newYork);
const cameraRouteDistance = turf.length(cameraRoute);

const cityMarkers = turf.featureCollection([
	turf.point(zurich, {name: 'Zurich'}),
	turf.point(newYork, {name: 'New York'}),
]);

const clampProgress = (progress: number) => Math.min(1, Math.max(0, progress));

const distanceAlong = (totalDistance: number, progress: number) => {
	// Keep the route non-empty at progress 0; Turf can error on zero-length slices.
	return Math.max(0.001, totalDistance * clampProgress(progress));
};

const getPartialTargetRoute = (progress: number) => {
	return turf.lineSliceAlong(
		targetRoute,
		0,
		distanceAlong(targetRouteDistance, progress),
	);
};

const getCameraOptions = (
	map: Map,
	progress: number,
	cameraAltitudeMeters: number,
	cameraLatitudeOffset: number,
) => {
	const target = turf.along(
		targetRoute,
		distanceAlong(targetRouteDistance, progress),
	).geometry.coordinates;
	const camera = turf.along(
		cameraRoute,
		distanceAlong(cameraRouteDistance, progress),
	).geometry.coordinates;

	return map.calculateCameraOptionsFromTo(
		new maplibregl.LngLat(camera[0], camera[1] - cameraLatitudeOffset),
		cameraAltitudeMeters,
		new maplibregl.LngLat(target[0], target[1]),
	);
};

export const MyComposition = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const frame = useCurrentFrame();
	const {delayRender, continueRender} = useDelayRender();
	const {durationInFrames, height, width} = useVideoConfig();
	const [map, setMap] = useState<Map | null>(null);
	const [loadingHandle] = useState(() => delayRender('Loading MapLibre map'));

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
			canvasContextAttributes: {
				preserveDrawingBuffer: true,
			},
		});

		mapInstance.on('load', () => {
			mapInstance.addSource('trace', {
				type: 'geojson',
				data: getPartialTargetRoute(0),
			});

			mapInstance.addLayer({
				id: 'trace-line',
				type: 'line',
				source: 'trace',
				layout: {
					'line-cap': 'round',
					'line-join': 'round',
				},
				paint: {
					'line-color': '#111111',
					'line-width': 7,
				},
			});

			mapInstance.addSource('city-markers', {
				type: 'geojson',
				data: cityMarkers,
			});

			mapInstance.addLayer({
				id: 'city-marker-dots',
				type: 'circle',
				source: 'city-markers',
				paint: {
					'circle-color': '#f03b20',
					'circle-radius': 12,
					'circle-stroke-color': '#ffffff',
					'circle-stroke-width': 4,
				},
			});

			mapInstance.addLayer({
				id: 'city-marker-labels',
				type: 'symbol',
				source: 'city-markers',
				layout: {
					'text-allow-overlap': true,
					'text-anchor': 'top',
					'text-field': ['get', 'name'],
					'text-offset': [0, 0.9],
					'text-size': 28,
				},
				paint: {
					'text-color': '#111111',
					'text-halo-color': '#ffffff',
					'text-halo-width': 3,
				},
			});

			mapInstance.jumpTo(getCameraOptions(mapInstance, 0, 180000, 1.1));
			mapInstance.once('idle', () => {
				setMap(mapInstance);
				continueRender(loadingHandle);
			});
		});
	}, [continueRender, loadingHandle]);

	useEffect(() => {
		if (!map) {
			return;
		}

		const handle = delayRender('Rendering MapLibre frame');
		const timelineProgress = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
		const travelProgress = interpolate(timelineProgress, [0.2, 0.82], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.645, 0.045, 0.355, 1),
		});
		const cameraAltitudeMeters = interpolate(
			timelineProgress,
			[0, 0.28, 0.74, 1],
			[180000, 2200000, 2200000, 180000],
			{
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
				easing: Easing.bezier(0.645, 0.045, 0.355, 1),
			},
		);
		const cameraLatitudeOffset = interpolate(
			timelineProgress,
			[0, 0.28, 0.74, 1],
			[1.1, 8, 8, 1.1],
			{
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
				easing: Easing.bezier(0.645, 0.045, 0.355, 1),
			},
		);
		const trace = map.getSource('trace') as GeoJSONSource | undefined;

		trace?.setData(getPartialTargetRoute(travelProgress));
		map.jumpTo(
			getCameraOptions(
				map,
				travelProgress,
				cameraAltitudeMeters,
				cameraLatitudeOffset,
			),
		);

		map.once('idle', () => continueRender(handle));
		// Force an idle event even if the camera parameters are unchanged from the previous frame.
		map.triggerRepaint();
	}, [continueRender, delayRender, durationInFrames, frame, map]);

	return (
		<AbsoluteFill style={{backgroundColor: '#e8eef3'}}>
			<div ref={containerRef} style={{height, position: 'absolute', width}} />
		</AbsoluteFill>
	);
};
```

## Notes

- `distanceAlong()` keeps the slice length above zero (`Math.max(0.001, ...)`); Turf can error on zero-length slices at progress 0.
- `greatCircleLine()` collapses a possible antimeridian `MultiLineString` to its longest segment. For a route that really crosses the antimeridian, build each segment explicitly instead.
- For a visually straight line (not geodesic), use a plain GeoJSON `LineString` between the two points instead of `turf.greatCircle()`.
- Camera altitude is in meters. `cameraLatitudeOffset` (degrees) places the camera south of the target, which tilts the view toward it.
- Unless asked, do not add glow effects or extra decorative points.
- `calculateCameraOptionsFromTo()` produces pitch and bearing, so this live-camera pattern must be checked for shimmer in a rendered MP4. If the basemap detail wavers, switch to the fixed map plate in [render-stability.md](render-stability.md) and keep pitch and bearing constant.

## Markers and labels as map layers

```ts
mapInstance.addSource('markers', {
  type: 'geojson',
  data: turf.featureCollection([turf.point([-118.2437, 34.0522], {name: 'Los Angeles'})]),
});

mapInstance.addLayer({
  id: 'marker-dots',
  type: 'circle',
  source: 'markers',
  paint: {
    'circle-color': '#f03b20',
    'circle-radius': 12,
    'circle-stroke-color': '#ffffff',
    'circle-stroke-width': 4,
  },
});

mapInstance.addLayer({
  id: 'marker-labels',
  type: 'symbol',
  source: 'markers',
  layout: {
    'text-allow-overlap': true,
    'text-anchor': 'top',
    'text-field': ['get', 'name'],
    'text-offset': [0, 0.9],
    'text-size': 28,
  },
  paint: {
    'text-color': '#111111',
    'text-halo-color': '#ffffff',
    'text-halo-width': 3,
  },
});
```

`symbol` text layers require a style with a `glyphs` entry (the demo style has one; a purely local GeoJSON style does not). Without glyphs, use HTML labels, see [line-and-label-animation.md](line-and-label-animation.md).
