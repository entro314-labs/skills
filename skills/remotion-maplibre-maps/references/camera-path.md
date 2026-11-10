# Smooth camera paths along a route

A camera that flies "straight, snaps to a new heading, flies straight" looks cheap. These rules apply to any map camera driven from `useCurrentFrame()`, whether it feeds MapLibre `jumpTo()`, the CSS center/zoom of a fixed map plate, or a 3D engine.

Four properties matter, in order:

1. **Continuous curvature.** Round corners with repeated Chaikin corner cutting. Three passes is the default; four is softer, two is tighter.
2. **Constant ground speed.** Move by arc length, never by source-point index (unequal point spacing creates speed bumps).
3. **Minimized amplitude.** For detailed centerlines (rivers, roads), damp the path toward its straight start-to-end chord.
4. **Enough length.** The path must be at least `travelKm + 2 * lookAheadKm` long so the look-ahead aim never clamps at the end.

Keep authored control points sparse and intentional. Smoothing cannot rescue a route that zig-zags across the subject repeatedly.

## Chaikin smoothing (dependency-free)

```ts
export type LngLat = [number, number];

// Each pass replaces every segment by its quarter and three-quarter points.
export const smoothPath = (source: LngLat[], passes = 3): LngLat[] => {
  if (source.length < 2) {
    throw new Error('A camera path needs at least two points');
  }

  // Keep adjacent longitudes continuous for routes that cross the antimeridian.
  const unwrapped: LngLat[] = [source[0]];
  for (let index = 1; index < source.length; index++) {
    const [lng, lat] = source[index];
    const previous = unwrapped[index - 1][0];
    let adjusted = lng;
    while (adjusted - previous > 180) adjusted -= 360;
    while (adjusted - previous < -180) adjusted += 360;
    unwrapped.push([adjusted, lat]);
  }

  let curve = unwrapped;
  for (let pass = 0; pass < Math.max(0, passes); pass++) {
    const next: LngLat[] = [curve[0]];
    for (let i = 0; i < curve.length - 1; i++) {
      const a = curve[i];
      const b = curve[i + 1];
      next.push(
        [a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25],
        [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75],
      );
    }
    next.push(curve[curve.length - 1]);
    curve = next;
  }
  return curve;
};
```

## Per-frame camera: position, heading, bank

Build the smoothed route once (module level), then every frame walk it by arc length with Turf:

```ts
import * as turf from '@turf/turf';

const route = turf.lineString(smoothPath(controlPoints, 3));
const pathKm = turf.length(route);

const cameraAt = (progress: number) => {
  const dCam = Math.min(travelKm, pathKm - lookAheadKm * 2) * progress;
  const cam = turf.along(route, dCam).geometry.coordinates;
  const aim = turf.along(route, dCam + lookAheadKm).geometry.coordinates;
  const aim2 = turf.along(route, dCam + lookAheadKm * 2).geometry.coordinates;
  const heading = turf.bearing(cam, aim); // degrees, 0 = north, clockwise
  let turn = turf.bearing(aim, aim2) - heading; // turn rate probe
  while (turn > 180) turn -= 360;
  while (turn < -180) turn += 360;
  return {center: cam, heading, turn};
};
```

- **Position**: the point `dCam` km along the path (constant speed = `travelKm / durationSeconds`; a slow glide reads as cinematic, too fast reads as rushed).
- **Heading**: bearing from the camera point to a real point `lookAheadKm` further along the same path. A far aim averages wiggle and leads into bends; a local-tangent aim spins the camera at every kink.
- **Bank (roll)**, for engines that support roll: lean into the turn using `turn` (bearing change between the aim point and a point `2 * lookAheadKm` ahead): `roll = clamp(turn * gain, -maxBank, maxBank)`. Because the path is smooth, the bank eases in and out.
- **Altitude / zoom**: interpolate separately from route progress (`interpolate(progress, [...], [...])`), so the camera can zoom out, travel and zoom back in.

Pitch conventions differ between engines: MapLibre pitch is measured from nadir (0 = looking straight down, higher = toward the horizon), while many 3D engines use 0 = horizon with negative values looking down. Convert explicitly (`enginePitch = -(90 - mapLibrePitch)`) and test with one still.

## Preparing a detailed centerline (river, road)

Do not use Douglas-Peucker simplification (`turf.simplify`) for camera paths: it concentrates curvature at the few remaining points, producing straight-then-corner motion. Instead:

1. **Clip** a window of the source line starting at the reach where the shot opens.
2. **Resample** to even arc-length spacing (about 0.1 km).
3. **Moving-average smooth** with a window of about +-2.8 km, two passes. This turns meanders into continuous curves.
4. **Dampen** toward the straight start-to-end chord by a fixed fraction `DAMP` (0 is dead straight, 1 is the full river; about 0.45 is a gentle swerve). This is the single amplitude knob.
5. Apply `smoothPath()` to the result for the final rounding.

```ts
const prepareCenterline = (line: Feature<LineString>, stepKm = 0.1, windowPoints = 28, passes = 2, damp = 0.45): LngLat[] => {
  const km = turf.length(line);
  const even: LngLat[] = [];
  for (let d = 0; d <= km; d += stepKm) {
    even.push(turf.along(line, d).geometry.coordinates as LngLat);
  }

  let smooth = even;
  for (let pass = 0; pass < passes; pass++) {
    const src = smooth;
    smooth = src.map((_, i) => {
      const lo = Math.max(0, i - windowPoints);
      const hi = Math.min(src.length - 1, i + windowPoints);
      let sx = 0;
      let sy = 0;
      for (let j = lo; j <= hi; j++) {
        sx += src[j][0];
        sy += src[j][1];
      }
      const n = hi - lo + 1;
      return [sx / n, sy / n] as LngLat;
    });
  }

  // Local planar approximation: lng scaled by cos(lat), km per degree
  const [lng0, lat0] = smooth[0];
  const kx = 111.32 * Math.cos((lat0 * Math.PI) / 180);
  const ky = 110.57;
  const toXY = (p: LngLat): LngLat => [(p[0] - lng0) * kx, (p[1] - lat0) * ky];
  const toLngLat = (p: LngLat): LngLat => [lng0 + p[0] / kx, lat0 + p[1] / ky];

  const a = toXY(smooth[0]);
  const b = toXY(smooth[smooth.length - 1]);
  const ab: LngLat = [b[0] - a[0], b[1] - a[1]];
  const len2 = ab[0] ** 2 + ab[1] ** 2;

  return smooth.map((p) => {
    const q = toXY(p);
    const t = ((q[0] - a[0]) * ab[0] + (q[1] - a[1]) * ab[1]) / len2;
    const onChord: LngLat = [a[0] + t * ab[0], a[1] + t * ab[1]];
    return toLngLat([onChord[0] + (q[0] - onChord[0]) * damp, onChord[1] + (q[1] - onChord[1]) * damp]);
  });
};
```

Validate by sampling the heading every ~1.5 km: the deltas between samples should be small and change gradually. Big jumps mean corners. Prefer high-resolution source data (about 0.3 km vertex spacing, e.g. exported from OpenStreetMap) over coarse global datasets, which are too rough for narrow valleys.

Always render one still at a middle frame (framing, bank, look-ahead) before rendering the full video.
