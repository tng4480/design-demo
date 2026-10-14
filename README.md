# UI Atlas

**Hosting: GitHub Pages. No ChatGPT Sites or Cloudflare configuration.**

A searchable visual palette of **83 live studies, 49 sources, and all 20 requested styles**. Includes a four-part scrolling lab and a real two-page Barba transition.

## Run locally

```sh
cd design-demo
npm start
```

Open http://127.0.0.1:4173. `dist/` is a complete static frontend; the pinned animation libraries are already vendored. Google Fonts are optional and have system-font fallbacks. No API keys, database, backend or AI calls are required.

## Explore

- **Explore:** filter by source, style, effort, category; search and sort.
- **Source directory:** official examples, GitHub popularity snapshots, licenses, framework notes and reference captures for the main listed sources.
- **Style index:** 20 distinct visual treatments, linked to local studies.
- **Scroll & motion:** full-page GSAP pinning, horizontal travel, type reveals, stacked cards, optional Lenis smoothing, and a real Barba page transition.
- **My shortlist:** browser-local favorites, comparison of up to three studies, Markdown export.
- Open a study to see its caveats, upstream example, installation starting point, local markup, CSS and interaction source.

## What these demos mean

Most previews are **original HTML/CSS/JavaScript studies**, not upstream component copies. Library-driven demonstrations run pinned Motion, GSAP, Three.js, Vanta, Lenis or Barba and are labelled accordingly. Official examples and screenshots let you assess upstream appearance separately. No paid Osmo, Framer, Motion+, Aceternity or other premium source has been redistributed.

The source license shown is the **upstream source's license**, not a claim that a local original study contains that source's code. Exact implementation fidelity is described in each study's note. A CSS mesh differs from Shadergradient's renderer; the glass study differs from Kokonut's SVG refraction; the local chart does not contain Bklit/Visx.

Research was checked **14 October 2026** using official sites/docs and GitHub repositories. Rounded GitHub counts are dated observations, not a live ranking or quality score. Effort and fit are editorial judgments. `colors.co` could not be resolved; **Coolors is added separately**, without silently correcting the supplied domain. Some external inspiration animations were not fully inspected. Hosted pricing and terms can change.

## Source & maintenance

- `dist/catalog.json`: complete downloadable directory.
- `research/`: primary-source research, including evidence links and unresolved items.
- `dist/engines.js` / `effects.css`: local study implementations.
- `dist/scroll-lab.js`: full-page motion implementation.
- `dist/transitions/`: Barba demo.
- `scripts/generate-catalog.mjs`: builds the catalog from research plus local study definitions.
- `scripts/vendor.mjs`: refreshes pinned dependency files and notices after installation.
- `npm run check`: catalog, syntax, asset and license-notice checks.
- `dist/THIRD_PARTY_NOTICES.txt`: vendored library licenses.

## Verification

Browser checks cover desktop and mobile layouts, filters, source/style navigation, study details, saved choices, comparison, command search, onboarding progress, color controls, pause motion, scroll-lab controls and real page navigation. Continuous canvas and WebGL work mounts only near the viewport and is disposed offscreen. Reduced motion is respected and can be toggled. This is an exploration directory, not a claim of production certification of every linked third-party component.

The catalog is saved and editable in this workspace. No PR has been created.

## Vanta

Five actual Vanta effects are integrated: NET, FOG, WAVES, GLOBE and TOPOLOGY. Topology uses p5.js 1.1.9 to accumulate flowing contour lines, with accent colour and fresh-pattern controls. Vanta 0.5.24 uses Three.js r134, isolated from the gallery’s modern Three.js r180. At most two Vanta instances run simultaneously. Opening a study disposes the background gallery renderers; offscreen effects are destroyed. Pause motion stops animation updates. Invalid WebGL receives a fallback. Vanta, p5.js and both Three.js licenses are retained.


## GitHub Pages

GitHub Pages serves the `gh-pages` branch. The source stays on `main`; the published branch contains only `dist/`. No server runs in production.

After committing a change to `main`, run `npm run publish` to update the live site. The publishing script preserves Pages branch history and requires GitHub CLI authentication.

## Interactive 3D studies

The isometric playground supports building on empty plots, dragging to rotate, quarter-turn controls, and resetting the town. The cinematic chapter preview embeds the actual three-scene camera journey, including chapter navigation, wheel/swipe/keyboard input and reduced motion. Both are original Three.js demonstrations.

## Tabler Icons and helmet hover

The icon explorer uses 6,238 actual Tabler SVGs from pinned version 3.49.0, with outline/filled search, category filters, size/stroke/color controls and SVG copy/download. Tabler’s MIT license is retained in `dist/TABLER_LICENSE.txt`. Refresh the icon catalog with `node scripts/tabler-assets.mjs` after installing dependencies.

The helmet hover demo uses an original procedural Three.js model and a screen-space material reveal. Pointer motion reveals coloured surfaces through a wireframe; Show full, Lock reveal and Reset provide keyboard/touch alternatives. The reference site and its asset rights remain in the source directory.

## React Bits shortlist

Eight actual React Bits components run in isolated React previews: Aurora, Silk, Orb, Blur Text, Rotating Text, Tilted Card, Glass Icons and Pixel Transition. Open `react-bits.html` for the larger playground with replay, pause, alternate looks, colour/speed controls and usage examples. Text, SVG artwork and icons are original demo content.

Upstream is pinned to commit `496968c4117e21278f13917201b7d615bc5e7450`. `npm run build:react-bits` fetches the selected source into ignored `.cache/` when absent, then builds the demo application. Raw upstream components are not redistributed as a kit. Preserve `dist/REACT_BITS_LICENSE.txt` and review its MIT + Commons Clause conditions.

## shadcn ecosystem picks

`shadcn.html` presents four focused demos: an actual shadcn resizable workspace, actual Animate UI tab transitions, an actual Kibo comparison slider with keyboard support added, and six real tweakcn presets on a shadcn product composition. The source directory also includes coss ui (the current destination of Origin UI) and ReUI.

Registry metadata, official components and blocks were reviewed on 14 October 2026. Source revisions and selected files are pinned in `research/shadcn-snapshots.json`; run `npm run build:shadcn` to rebuild. Raw upstream components stay in ignored `.cache/`; compiled demo applications and retained licenses are published. `dist/SHADCN_NOTICES.txt` includes source and direct dependency notices.
