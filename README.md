# UI Atlas

**Hosting: GitHub Pages. No ChatGPT Sites or Cloudflare configuration.**

A searchable visual palette of **101 studies, 56 sources, and all 20 requested styles**. Includes a four-part scrolling lab and a real two-page Barba transition.

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

## Design Prompts reference

Design Prompts is included as an art-direction source with selected Newsprint, Swiss Minimalist, Botanical and Maximalism references. Four original local compositions now run in `design-prompts.html` and the gallery, with links to the official references. Newsprint includes section filters and article dialogs; Swiss offers list/grid views and a geometric interaction; Botanical offers original SVG plant illustrations, specimen selection and care accordions; Maximalism includes poster parallax, palette remixes and a demo ticket builder. These are style studies, not copied upstream prompts or components.

## Paper Neuro Noise

An actual Paper Neuro Noise shader is integrated into the gallery and `neuro-noise.html`. The playground offers the four official Default, Sensation, Bloodstream and Ghost presets; colour, brightness, contrast, scale, speed and rotation controls; pause/reset; an optional original headline; and copying the current React usage. Vanilla package `@paper-design/shaders@0.0.81` is pinned. Run `npm run build:paper` to refresh the selected shader bundle and retained LICENSE/NOTICE. It requires WebGL2 and disposes offscreen instances.

## Componentry trio

Actual Hover Transition, Circuit Board and Scroll Choreography components run in `componentry.html` and isolated gallery previews. Hover supports all eight upstream effects and editable direction, timing and colour. The circuit graph supports theme/grid controls, pulse speed, trace width and an illustrative node-error state. Scroll Choreography runs the actual 300vh sequence, with Start/Move/Stack/Expand navigation and a static reduced-motion image grid.

Source is pinned to `b602c2872fea85c9f2464016ce3bbe0af17b51b4`. `npm run build:componentry` rebuilds the compiled demo application from ignored source cache. The scroll gallery uses the upstream demo’s public Unsplash image URLs at a smaller delivery size; image availability depends on Unsplash. MIT attribution and image/source notes are retained in `dist/COMPONENTRY_LICENSE.txt` and `dist/COMPONENTRY_NOTES.txt`.

## Shader Gradient scroll system

`shadergradient-scroll.html` runs actual `@shadergradient/react@2.4.20` and React Three Fiber 9.3.0 in an original four-chapter scroll system: full-screen surface, framed browser, changing atmosphere and 3D volume. One scroll progress drives framing, colour/camera interpolation and word reveals. Chapter buttons, gradient pause, grain and camera orbit controls allow inspection. Reduced motion offers static chapter selection.

The earlier Atmospheric Mesh is still labelled as an original CSS study. `npm run build:shadergradient` rebuilds the new demo. The small Framer web adapter disables Framer-only live reload. Renderer/dependency attribution is preserved in `dist/SHADERGRADIENT_NOTICES.txt`, and the original choreography source is published as `dist/shadergradient-demo-source.txt`.

## Mobile drawer

`drawer.html` and the gallery Mobile drawer preview run actual Vaul 1.1.2, replacing the earlier CSS approximation. Supports gesture-driven dismissal, overlay dismissal, Escape, focus containment and reduced motion. The full-page example preserves native touch dimensions; the embedded preview stays inside its card. Build with `npm run build:drawer`. Retained licenses are in `dist/VAUL_NOTICES.txt`. Upstream currently marks Vaul unmaintained.

## Design skill comparison lab

`skills.html` compares a conventional baseline and selected guidance from Impeccable, Taste Skill and the Awesome Design Skills Editorial recipe. Same fictional workshop brief, copy, schedule, prices and reference imagery; differences in hierarchy, composition and visual language are intentional. Each treatment is available in the gallery. These are original illustrative guidance studies, not complete upstream workflow runs or quality benchmarks. No skills were installed globally. See `dist/skill-lab/NOTES.txt` for the exact scope and sources. Remote Unsplash reference photos require network access.

## Gallery presentation

Newer studies use short titles and source attribution in the metadata. Compact library effects and controls keep an immediate local screenshot visible while their live renderer loads; full-page studies keep a screenshot in the gallery and run interactively when opened. The screenshots in `dist/assets/previews/` are captures of the local demos; refresh them after a visual change to the corresponding study.

Compact gallery effects and controls (React Bits, shadcn picks, Circuit Board and Hover Transition) run live when visible, with an immediate captured preview retained until the component signals readiness. Whole-page stories and direction/skill studies keep static gallery previews. Offscreen instances dispose, and Pause motion is forwarded to live frames.



The later pastel colour shift has been rolled back. Original renderer palettes and surfaces are restored; current SVG artwork, layouts, focused gallery previews, stronger particle visibility and live-preview readiness remain in place. Neuro Noise uses its original official presets again.

Starfield and particle typography use a dedicated high-contrast treatment: dark, larger points on a light surface, with denser ATLAS lettering. This readability adjustment is independent of the colour rollback elsewhere.

## Skiper UI & Amicro

Three actual free Skiper picks: expanding strips (52), progressive blur (41), and smooth caret (106). One actual MIT Amicro component: CardScatterSpread. Compact demos have immediate captured previews and mount live in the visible gallery. Original Atlas artwork, attribution and adaptation notes are included.

Spline remains in the source directory as a tool reference. Its Mini Home embed was removed because loading and GPU cost were too high for this atlas.

`npm run build:interactions` rebuilds the four compact demos. Selected upstream source is retained in `interaction-lab/upstream/`; source snapshots, licenses and adaptations are recorded in `dist/INTERACTION_NOTICES.txt` and `dist/AMICRO_LICENSE.txt`.

## Transition studies

`transition-studies.html` has two original GSAP demonstrations: a clip-path reveal with an adjustable origin, and a zoom-through portal. Both offer replay, a progress slider, immediate gallery previews and reduced-motion scene changes. They also appear under Scroll & motion. They are original transition studies, not upstream Amicro or Skiper components.
