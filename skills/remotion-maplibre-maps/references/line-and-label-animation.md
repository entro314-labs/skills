# Line, border and label animation on a MapLibre map

Techniques for a geographic explainer: a line (river, route, pipeline) draws across the map, regions it enters light up in sequence, and HTML labels rise in. Colors and durations below are examples; take real values from the production's own tokens.

## 1. Render harness (per frame)

Init the map once (ref guard). On `load`: strip clutter if needed, add sources and layers, then `once('idle')` and `continueRender`. Per frame:

```
delayRender -> setData / setPaintProperty -> map.once('idle', continueRender) -> map.triggerRepaint()
```

Animate data and paint properties imperatively. Move the camera only through the fixed map plate ([render-stability.md](render-stability.md)).

## 2. Timing model: seconds, derived beat length

Key everything off seconds (`t = frame / fps`), not abstract reveal units. The line draws over a window; each region triggers when the line reaches it and then runs a fixed-duration sequence. The beat is exactly as long as the sequences need.

```ts
const LINE_START = 0.3, LINE_END = 8.0;              // line draws over this window (seconds)
const BORDER_S = 2.5, FILL_S = 1.0, LABEL_S = 0.7;   // per-region sequence, constant durations
const trigger = (c: string) => LINE_START + META[c].stop * (LINE_END - LINE_START);
// beat length = max over regions of (trigger + BORDER_S + FILL_S + LABEL_S) + tail
const reveal = interpolate(t, [LINE_START, LINE_END], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  easing: Easing.bezier(0.645, 0.045, 0.355, 1),
});
```

Drive each border draw by time since its trigger, not by a slice of the line reveal; otherwise long or complex borders flash by in a fraction of a second.

## 3. Line reveal with a draw head

`turf.lineSliceAlong(line, 0, km)` reveals the line. A bright "head" is the last few percent of the drawn line in its own brighter layers, faded out when the line completes.

```ts
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const drawnKm = lineKm * reveal;
(map.getSource('line') as GeoJSONSource).setData(
  turf.lineSliceAlong(line, 0, Math.max(0.001, drawnKm)),
);
const headKm = lineKm * 0.03;
(map.getSource('line-head') as GeoJSONSource).setData(
  turf.lineSliceAlong(line, Math.max(0, drawnKm - headKm), Math.max(0.001, drawnKm)),
);

let headFade = 0;
if (reveal > 0.002 && reveal < 0.999) headFade = 1;
else if (reveal >= 0.999) headFade = 1 - clamp01((t - LINE_END) / 0.5); // fade out at the end
map.setPaintProperty('line-head-glow', 'line-opacity', 0.85 * headFade);
map.setPaintProperty('line-head', 'line-opacity', headFade);
```

Layers, bottom to top: `line-glow` (soft colored, wide, blurred) -> `line-core` (bright, narrow) -> `line-head-glow` (wide, blurred) -> `line-head` (white, slightly wider than the core). No dark casing is needed when the core is bright enough to read over every fill.

Lines from tiled vector sources are split at tile boundaries and have no global order, so only draw ordered GeoJSON you own when the draw direction carries meaning. Opacity, color, width, blur and fill changes are safe on any layer.

## 4. Region sequence: border draws, fill blooms, label rises

Each region, once triggered by the line, runs three sequential phases. The border is a darker shade of the region color.

```ts
const lt = t - trigger(c); // local seconds since trigger

// 1) border draws on over a constant BORDER_S
const bp = interpolate(clamp01(lt / BORDER_S), [0, 1], [0, 1], {easing: Easing.bezier(0.645, 0.045, 0.355, 1)});
(map.getSource(`trail-${c}`) as GeoJSONSource).setData(sliceBorder(DRAW[c], 0, DRAW[c].total * bp));

// 2) fill blooms in (opacity overshoots, then settles) after the border completes
const fp = clamp01((lt - BORDER_S) / FILL_S);
const fo = interpolate(fp, [0, 0.6, 1], [0, FILL_OPACITY * 1.25, FILL_OPACITY], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  easing: Easing.bezier(1 / 3, 1, 2 / 3, 1),
});
map.setPaintProperty(`fill-${c}`, 'fill-opacity', fp <= 0 ? 0 : fo);

// 3) label rises in after the fill
const lp = clamp01((lt - BORDER_S - FILL_S) / LABEL_S);
```

`sliceBorder` reveals part of a complete, possibly multi-segment border as a `MultiLineString`, slicing each segment by cumulative length so no joins are invented across gaps:

```ts
type BorderDraw = {segLines: Feature<LineString>[]; cum: number[]; segLen: number[]; total: number};

const sliceBorder = (d: BorderDraw, fromKm: number, toKm: number) => {
  const out: Position[][] = [];
  for (let i = 0; i < d.segLines.length; i++) {
    const start = d.cum[i];
    const end = start + d.segLen[i];
    const a = Math.max(fromKm, start);
    const b = Math.min(toKm, end);
    if (b - a <= 0.0008) continue;
    out.push(turf.lineSliceAlong(d.segLines[i], a - start, b - start).geometry.coordinates);
  }
  return turf.multiLineString(out);
};
```

Build `segLines` from each exterior ring of the region polygon, `segLen` with `turf.length`, and `cum` as the running sum.

## 5. Preparing the geodata

Do this once in a Node script (using `@turf/turf`) and import or `staticFile()` the baked results.

- **Line**: one clean `LineString` ordered source to end. Simplify it (`turf.simplify`, tolerance around `0.006` degrees) so a wide-zoom draw reads as one smooth thread. If the source is many ways or braided channels, route a single path through the network first (graph shortest path); do not greedily chain nearest endpoints, which bounces between parallel channels.
- **Regions**: polygons tagged with a `country` (or region) property in a single GeoJSON source, filtered per region for fills.
- **`stop`** (when a region lights up): walk the line points; the first point inside a region (`turf.booleanPointInPolygon`) gives the arc-length fraction where the line enters it. The region where the line starts gets `0`.
- **`anchor`** (label position): the pole of inaccessibility, i.e. the most interior point, not the centroid (centroids get pulled to edges). Clip the region to a per-region "story" bbox first so a large region centers on the relevant area, then add a small operator nudge.

```ts
const poleOfInaccessibility = (poly: Feature<Polygon>): Position => {
  const bb = turf.bbox(poly);
  const boundary = turf.lineString(poly.geometry.coordinates[0]); // exterior ring
  const N = 46;
  let best: Position = [bb[0], bb[1]];
  let bestD = -1;
  for (let i = 0; i <= N; i++) {
    for (let j = 0; j <= N; j++) {
      const lng = bb[0] + ((bb[2] - bb[0]) * i) / N;
      const lat = bb[1] + ((bb[3] - bb[1]) * j) / N;
      const pt = turf.point([lng, lat]);
      if (!turf.booleanPointInPolygon(pt, poly)) continue;
      const d = turf.pointToLineDistance(pt, boundary);
      if (d > bestD) {
        bestD = d;
        best = [lng, lat];
      }
    }
  }
  return best;
};
```

- **`border`**: keep every exterior ring from the complete named source geometry. Never clip a region or shared border to the framed bbox and never drop an off-screen segment; the renderer handles a `MultiLineString` by cumulative length.

Record the source and effective date of every custom layer in the production notes. Keep provider-derived and custom layers visually distinct when they carry different evidentiary weight.

## 6. Labels: HTML overlay projected each frame

Labels are React elements, not map symbols, for full typography control (and they need no `glyphs` source). Project each anchor to screen pixels every frame and keep the result in state; exclude `labels` from the effect dependencies.

```ts
const p = map.project(META[c].anchor); // lngLat -> screen px, respects the live camera
pos[c] = {x: p.x, y: p.y, reveal: lp};
setLabels(pos);
```

Render each label with `pointerEvents: 'none'`, an uppercase region name, a short accent divider and a rise-and-fade entrance driven by `reveal`. With a fixed map plate, transform the projected point with the plate transform ([render-stability.md](render-stability.md)).

## 7. Basemap clutter

When using a style with labels you do not want, strip them on `load`:

```ts
for (const layer of map.getStyle().layers) {
  if (layer.type === 'symbol' || /other border/i.test(layer.id)) map.removeLayer(layer.id);
}
```

`symbol` layers are the place, water and road labels. Admin border layer ids vary per style, so inspect the loaded style and remove inner administrative borders as needed while keeping the context borders the production requires. Hide leftover attribution controls by CSS only where the provider terms allow it (`.maplibregl-ctrl-attrib`, `.maplibregl-ctrl-bottom-left`, `.maplibregl-ctrl-bottom-right`); otherwise keep attribution visible.
