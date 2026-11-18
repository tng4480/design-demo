# UI Atlas: rules per medium

Read only the section for your medium. Study links go to https://tng4480.github.io/design-demo/studies/<id>.html (or `index.html#study=<id>` for gallery studies).

## Web page (marketing, landing, portfolio, docs)

- First screen: what it is, for whom, one hard fact and the main action, all visible at 1440×900 and at 390 px wide.
- Show the real subject large: the product UI, the place, the work, the object. A mood visual never replaces it.
- Each section carries one idea with its own visual; vary the composition section to section.
- Content max width 1200–1320 px; body text 16–18 px at 60–75 characters per line.
- Mobile: one column, buttons full width, tap targets ≥ 44 px, no horizontal scroll.
- Start from: the direction's signature study, then `liquid-glass` or `variable-type` only if the direction calls for one.

## App UI (dashboard, tool, admin, mobile app)

- Design the working state first: real-looking data, a selected item, a filled form. Then empty, loading and error states.
- Density follows use: all-day tools are compact (32–36 px rows); occasional consumer tasks are roomy (44 px+).
- Navigation is predictable: side nav or top tabs on desktop, bottom bar or sheet on mobile.
- Status shows as colour plus icon plus word. Destructive actions confirm or undo.
- Motion is functional: panels slide, indicators move, numbers update. 150–250 ms.
- Start from: `sc-workspace`, `command-palette`, `sc-animated-tabs`, `drawer`, `hold-action`, `m3-expressive`, `contrast-scale`.

## Poster and print (event poster, flyer, cover, zine)

- Fix the format first: A-series 1:√2 (e.g. 1190×1684 units for A-sized SVG), US Letter 8.5×11, or square for covers.
- Build on a visible modular grid (e.g. 6 columns × 8 rows) with margins ≥ 5% of the short side.
- One dominant element (a word set huge, one shape, one photograph); the info block (what, when, where, price) sits in a consistent corner.
- Two or three colours plus paper. For risograph, design per ink layer.
- Check at thumbnail size: the title must read at 10% scale.
- Export SVG or PDF; outline text or ship the font. 300 dpi for raster print.
- Start from: `swiss-poster`, `riso-poster`, `bauhaus-poster`, `halftone-poster`, `grain-gradient`.

## Chart and data graphic

- The title is the finding as a sentence ("Cycling share has quadrupled since 2014"), not the topic ("Cycling share").
- Highlight one series in the accent; others grey. Label lines and bars directly; drop the legend when labels fit.
- Bars start at zero. Lines may not; say so when they don't. Use tabular figures.
- Light horizontal gridlines only; no 3D, no pie charts with more than three slices.
- Many categories over time → small multiples on a shared scale, not one spaghetti chart.
- Always a source line: what, when, who. Mark illustrative data as illustrative.
- Start from: `annotated-chart`, `live-chart`, `contrast-scale` (chart colours).

## Slides and presentations

- 16:9 (1920×1080). One idea per slide; the headline is the takeaway as a full sentence.
- At most ~30 words of body; large numbers with small units.
- Fixed margins (≈6% of width) and a quiet footer (talk title, page number).
- One accent for the thing that matters; a dark variant only for section or title slides.
- Start from: `annotated-chart` (chart slides), `grain-gradient` (backgrounds), the direction's tokens for everything else.

## Social image (og:image, post, story, thumbnail)

- Sizes: og:image 1200×630; square post 1080×1080; portrait 1080×1350; story 1080×1920; YouTube thumbnail 1280×720.
- Title ≥ 64 px at full size, ≤ ~60 characters, at most three lines; must read at 400 px wide.
- 60 px safe margins; nothing essential in the outer 5% (platforms crop). Logo small, one corner.
- Start from: `swiss-poster` and `riso-poster` (composition), `grain-gradient` (backgrounds).

## Brand identity

- Deliver a sheet: mark, wordmark, lockups, clear space, colour roles with contrast ratios, type pairing with a specimen, two applications.
- Three to five colours with named roles; every text pair states its contrast.
- The mark must work at 16 px (favicon) and in one colour.
- Start from: `contrast-scale`, `colour-themes`, `business-fonts`.

## Pattern, texture and generative art

- Seed everything; record the seed with the output so it can be reproduced.
- Limit the palette (three to five colours with weights); palette and density decide quality more than the algorithm.
- Keep a margin of paper around generative art meant for print.
- For backgrounds behind text, keep contrast low and put text on a solid layer.
- Start from: `flow-field`, `truchet-pattern`, `grain-gradient`, `dither`, `mesh-surface`.

## Infographic and diagram

- One reading direction; numbered steps; 3–6 steps or stages.
- Each step: a verb phrase, a time or date, one sentence. Highlight the current or key step.
- One icon family at one stroke weight; connectors simpler than the content.
- Reflow to vertical on narrow screens.
- Start from: `beam-network`, `componentry-circuit`, `blueprint-system`.
