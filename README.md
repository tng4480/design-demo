# UI Atlas

**Hosting: GitHub Pages. No ChatGPT Sites or Cloudflare configuration.**

A searchable visual palette of **68 live studies, 42 sources, and all 20 requested styles**. Includes a four-part scrolling lab and a real two-page Barba transition.

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

Four actual Vanta effects are integrated: NET, FOG, WAVES and GLOBE. Vanta 0.5.24 uses Three.js r134, isolated from the gallery’s modern Three.js r180. At most two Vanta instances run simultaneously. Opening a study disposes the background gallery renderers; offscreen effects are destroyed. Pause motion stops animation updates. Invalid WebGL receives a fallback. Vanta source and both Three.js licenses are retained.


## GitHub Pages

GitHub Pages serves the `gh-pages` branch. The source stays on `main`; the published branch contains only `dist/`. No server runs in production.

After committing a change to `main`, run `npm run publish` to update the live site. The publishing script preserves Pages branch history and requires GitHub CLI authentication.

## Souradip-inspired cinematic chapters

The newly added `journey.html` is an original real-time Three.js camera study with chapter buttons, wheel/swipe/keyboard navigation and reduced motion. Direct inspection of souradip.com showed video-backed camera transitions and paper-collage artwork. That production workflow differs from this procedural 3D study; no source footage or artwork is copied into the demo. A screenshot is retained as an attributed reference in the source directory.
