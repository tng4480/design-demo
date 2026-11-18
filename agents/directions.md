# UI Atlas: design directions

Each direction is a complete starting system. Pick one per project (see https://tng4480.github.io/design-demo/agents/guide.md), paste its tokens and font link, then build only from those values. Study links open self-contained code or the gallery entry; ids resolve in https://tng4480.github.io/design-demo/agents/studies.md.

| id | name | best for |
|---|---|---|
| `quiet-product` | Quiet product | saas, b2b, dashboard, app, startup, developer, api |
| `dark-technical` | Dark technical | ai, llm, model, infrastructure, devtools, developer, cli |
| `editorial-catalogue` | Editorial catalogue | portfolio, gallery, archive, collection, catalogue, library, directory |
| `newsprint` | Newsprint | blog, news, newsletter, magazine, journal, essay, publication |
| `swiss-grid` | Swiss grid | agency, architecture, architect, studio, design studio, conference, exhibition |
| `operational-enterprise` | Operational enterprise | internal, enterprise, operations, ops, admin, back office, inventory |
| `casework-service` | Casework and service | form, service, government, public, council, healthcare, clinic |
| `warm-consumer` | Warm consumer | consumer, mobile, fitness, health, habit, personal finance, budget |
| `organic-botanical` | Organic botanical | wellness, spa, cafe, bakery, restaurant, food, plants |
| `bold-maximal` | Bold maximal | festival, music, concert, event, party, campaign, launch |
| `neo-brutal` | Neo brutal | indie, creator, hackathon, side project, newsletter tool, no-code, template |
| `luxury-deco` | Luxury deco | hotel, luxury, jewellery, jewelry, fine dining, wine, gala |
| `retro-playful` | Retro playful | game, gaming, retro, arcade, pixel, fan site, nostalgia |
| `immersive-showcase` | Immersive showcase | product launch, hardware, device, car, creative studio, 3d, award |
| `data-report` | Data report | report, annual report, research, survey, results, board, executive |

---

## Quiet product (`quiet-product`)

Neutral, precise software UI where the product itself is the hero.

**Fits:** saas, b2b, dashboard, app, startup, developer, api, productivity, analytics, crm, platform, tool, settings, admin, workspace, ai, assistant. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #fbfbfa;
  --surface: #ffffff;
  --ink: #111214;
  --muted: #5d6168;
  --line: #e5e5e2;
  --accent: #0f6e64;
  --on-accent: #ffffff;
  --font-display: 'Geist', system-ui, sans-serif;
  --font-body: 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
}
```

- **Type:** Geist for display, Geist for body, Geist Mono for mono. 14/15 body, 13 UI labels, 20 / 28 / 44 / 64 headings, tight -0.02em on headings. One family in two or three weights. Mono for numbers, ids, keyboard hints and code only.
- **Shape:** radius 8px controls, 12px cards; 1px hairlines carry structure; shadows only on floating layers; Comfortable: 8px grid, 40px tall controls.
- **Layout:**
  - Show the real product UI big in the first screen, inside a framed app window, working on believable data.
  - Feature sections pair one sentence with one real UI fragment each; vary the fragment, never repeat an icon grid.
  - Left-aligned text on a 12-column grid; centre only the closing call to action.
- **Motion:** Micro only: tab indicators that slide, 150-200ms ease-out on hover and press, number tickers. Content stays still while scrolling.
- **Copy:** Plain verbs and specifics: what it does, for whom, one measurable fact. Buttons say verb + object (Start a trial, Invite your team).
- Swap the accent for the brand colour but keep one accent only.
- Every number on the page is real or clearly a product mock.

**Signature (pick one):** [Resizable workspace](https://tng4480.github.io/design-demo/index.html#study=sc-workspace), [Command palette](https://tng4480.github.io/design-demo/index.html#study=command-palette)
**Supporting:** [Contrast-first colour scale](https://tng4480.github.io/design-demo/studies/contrast-scale.html), [Animated tabs](https://tng4480.github.io/design-demo/index.html#study=sc-animated-tabs), [Command palette](https://tng4480.github.io/design-demo/index.html#study=command-palette), [Onboarding checklist](https://tng4480.github.io/design-demo/index.html#study=onboarding), [Contextual AI bar](https://tng4480.github.io/design-demo/index.html#study=contextual-ai), [Live line chart](https://tng4480.github.io/design-demo/index.html#study=live-chart), [Hold to confirm](https://tng4480.github.io/design-demo/index.html#study=hold-action), [Mobile drawer](https://tng4480.github.io/design-demo/index.html#study=drawer)
**Motion:** [Spring switcher](https://tng4480.github.io/design-demo/index.html#study=motion-spring)
**Sources:** [shadcn/ui](https://ui.shadcn.com/docs/components) (MIT), [Animate UI](https://animate-ui.com/) (MIT + Commons Clause), [Kibo UI](https://www.kibo-ui.com/) (MIT for the public component source), [Motion](https://motion.dev) (Core MIT), [Bklit UI](https://bklit.com) (Chart source MIT), [Tabler Icons](https://tabler.io/icons) (MIT)
**Full-page references:** https://tng4480.github.io/design-demo/shadcn.html

---

## Dark technical (`dark-technical`)

Dark, exact and a little cinematic, for infrastructure, AI and developer tools.

**Fits:** ai, llm, model, infrastructure, devtools, developer, cli, security, cloud, database, gpu, crypto, terminal, observability, launch, agent. **Mode:** dark.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #0b0d0c;
  --surface: #141716;
  --ink: #ecefea;
  --muted: #9aa19b;
  --line: #262a28;
  --accent: #c6f36b;
  --on-accent: #10140b;
  --font-display: 'Inter Tight', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

- **Type:** Inter Tight for display, Inter for body, JetBrains Mono for mono. 15 body, 12 mono labels in caps with 0.08em tracking, 56-88 hero. Mono labels and code blocks give it texture; headings stay sans and tight.
- **Shape:** radius 6px, sharp-leaning; 1px lines at ~10% white; glow only on the one accent element; Generous section spacing, dense inside panels.
- **Layout:**
  - Hero: one-line claim, a terminal or code sample that really runs, and one signature visual behind or beside it.
  - Diagrams of how data flows (beams, circuit lines) explain the product better than icon cards.
  - Changelog-style proof: versions, latency numbers, regions, commands.
- **Motion:** One ambient visual in the hero, paused offscreen; everything else static or 150ms. Respect reduced motion.
- **Copy:** Terse and technical. Show the command, the number, the guarantee. No hype words.
- Use dist/colour-themes.html to pick semantic dark colours with measured contrast.
- Pick exactly one signature visual; the rest of the page is type, code and lines.

**Signature (pick one):** [Ordered dither](https://tng4480.github.io/design-demo/studies/dither.html), [Neuro noise](https://tng4480.github.io/design-demo/index.html#study=paper-neuro-noise), [Circuit board](https://tng4480.github.io/design-demo/index.html#study=componentry-circuit), [ASCII geometry](https://tng4480.github.io/design-demo/index.html#study=ascii-orbit), [Vanta / NET](https://tng4480.github.io/design-demo/index.html#study=vanta-net), [Wireframe orbit](https://tng4480.github.io/design-demo/index.html#study=wire-orbit)
**Supporting:** [Connection beams](https://tng4480.github.io/design-demo/index.html#study=beam-network), [Command palette](https://tng4480.github.io/design-demo/index.html#study=command-palette), [Cursor spotlight](https://tng4480.github.io/design-demo/index.html#study=spotlight-card), [Departure board](https://tng4480.github.io/design-demo/index.html#study=split-display), [Dark colour themes](https://tng4480.github.io/design-demo/index.html#study=colour-themes)
**Motion:** [Letter by letter](https://tng4480.github.io/design-demo/index.html#study=te-letters), [Text scroll](https://tng4480.github.io/design-demo/index.html#study=su-text-scroll)
**Sources:** [Paper Shaders](https://shaders.paper.design/) (Apache-2.0), [Componentry](https://componentry.dev) (MIT), [Magic UI](https://magicui.design/docs/components/magic-card) (MIT for public repo), [React Bits](https://reactbits.dev/get-started/index) (MIT + Commons Clause), [shadcn/ui](https://ui.shadcn.com/docs/components) (MIT), [Atlas colour themes](https://tng4480.github.io/design-demo/colour-themes.html) (Original study)
**Full-page references:** https://tng4480.github.io/design-demo/colour-themes.html, https://tng4480.github.io/design-demo/neuro-noise.html

---

## Editorial catalogue (`editorial-catalogue`)

Warm paper, a serif display face and mono catalogue labels, like a museum catalogue.

**Fits:** portfolio, gallery, archive, collection, catalogue, library, directory, museum, studio, designer, photographer, curated, index, resource, showcase. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #f6f3ec;
  --surface: #fffdf8;
  --ink: #1b1e19;
  --muted: #5f6458;
  --line: #e1dccf;
  --accent: #b23e22;
  --on-accent: #ffffff;
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
}
```

- **Type:** Instrument Serif for display, Geist for body, Geist Mono for mono. 15 body, 11 mono labels, 44 section heads, 72-92 hero; serif at regular weight, italic for one emphasised word. Serif only for display. Numbered items (No 001) in mono with the accent colour.
- **Shape:** radius 16px cards, pill buttons and filters; 1px warm lines, dashed dividers inside cards; Airy; cards with an inner mat around images.
- **Layout:**
  - Treat each item as a numbered plate: mounted image, number, title, one line, metadata row.
  - Large serif section heads left-aligned with a short sans line under them.
  - Filters as pill rows above the grid; detail opens as a large stage with a spec sheet beside it.
- **Motion:** Cards lift 2px and images zoom 1.03 on hover; dialogs rise in once. Nothing animates on scroll.
- **Copy:** Curatorial and specific: say what each thing is and why it was chosen, in one line.
- The atlas home page itself is the reference build of this direction.

**Signature (pick one):** [Hover transition](https://tng4480.github.io/design-demo/index.html#study=componentry-hover), [Horizontal collection](https://tng4480.github.io/design-demo/index.html#study=horizontal-scroll), [Clip path reveal](https://tng4480.github.io/design-demo/index.html#study=tx-clip)
**Supporting:** [Variable-weight headline](https://tng4480.github.io/design-demo/studies/variable-type.html), [Card fan](https://tng4480.github.io/design-demo/index.html#study=am-spread), [Expanding strips](https://tng4480.github.io/design-demo/index.html#study=su-expand), [Image comparison](https://tng4480.github.io/design-demo/index.html#study=sc-comparison), [Tilted artwork](https://tng4480.github.io/design-demo/index.html#study=rb-tilted-card)
**Motion:** [Vertical image reveal](https://tng4480.github.io/design-demo/index.html#study=im-reveal), [Image crossfade](https://tng4480.github.io/design-demo/index.html#study=im-fade)
**Sources:** [Componentry](https://componentry.dev) (MIT), [Motion](https://motion.dev) (Core MIT), [Kibo UI](https://www.kibo-ui.com/) (MIT for the public component source), [GSAP + ScrollTrigger](https://gsap.com/) (Custom Standard License)
**Full-page references:** https://tng4480.github.io/design-demo/index.html, https://tng4480.github.io/design-demo/atlas-refresh.css

---

## Newsprint (`newsprint`)

Columns, rules and strong serif headlines for reading-first sites.

**Fits:** blog, news, newsletter, magazine, journal, essay, publication, writing, article, editorial, media, podcast, review, zine. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #f4f1ea;
  --surface: #fbf9f4;
  --ink: #16130f;
  --muted: #5a554c;
  --line: #1613101f;
  --accent: #b3261e;
  --on-accent: #ffffff;
  --font-display: 'Newsreader', Georgia, serif;
  --font-body: 'Newsreader', Georgia, serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}
```

- **Type:** Newsreader for display, Newsreader for body, IBM Plex Mono for mono. 18-19 body at 1.6 line height and 65ch measure; 40-110 headlines in bold serif; small caps for kickers. Serif body is fine here because reading is the job. Sans only for UI chrome.
- **Shape:** radius 0; Hairline and double rules between sections, column rules between columns; Dense front page, spacious article page.
- **Layout:**
  - Front page as a multi-column grid with a lead story, secondary stories and a briefs column.
  - Article page: one column, generous margins, pull quotes and figure captions.
  - Section filters as a text row under the masthead.
- **Motion:** Almost none: underline draws on links, dialogs fade. Reading wins.
- **Copy:** Headlines that state the news; standfirsts that add the second fact. Bylines and dates are real.
- Rules and columns do the decorating, so imagery can be sparse and black-and-white or halftone.

**Signature (pick one):** [Newsprint](https://tng4480.github.io/design-demo/index.html#study=dp-newsprint)
**Supporting:** [Annotated line chart](https://tng4480.github.io/design-demo/studies/annotated-chart.html), [Print, meet pixels](https://tng4480.github.io/design-demo/index.html#study=halftone-poster), [Through the frame](https://tng4480.github.io/design-demo/index.html#study=te-lines)
**Sources:** [Design Prompts](https://www.designprompts.dev/) (Publicly accessible prompt gallery), [Google Fonts](https://fonts.google.com/) (Font licenses vary by family)
**Full-page references:** https://tng4480.github.io/design-demo/design-prompts.html?demo=newsprint

---

## Swiss grid (`swiss-grid`)

Strict grid, big grotesk type, one red, lots of white.

**Fits:** agency, architecture, architect, studio, design studio, conference, exhibition, museum, typography, consultancy, index, projects, event, schedule. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #ffffff;
  --surface: #f2f2f2;
  --ink: #0a0a0a;
  --muted: #555555;
  --line: #0a0a0a;
  --accent: #d71921;
  --on-accent: #ffffff;
  --font-display: 'Inter Tight', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

- **Type:** Inter Tight for display, Inter for body, JetBrains Mono for mono. Huge contrast: 15 body, 120+ display in 600 weight, -0.04em tracking; numbers set large. One grotesk family. Hierarchy from size and position, never from colour.
- **Shape:** radius 0; Solid 1-2px black rules; Strict 12-column grid with visible alignment; asymmetric white space.
- **Layout:**
  - Project index as a table: number, name, year, discipline, with hover image preview.
  - Asymmetric compositions: text hangs from the grid lines, images bleed to one column edge.
  - Toggle between list and grid views of work.
- **Motion:** Instant or 120ms. A single geometric interaction is enough.
- **Copy:** Short labels, numbers and facts. Let the grid speak.
- Red marks one thing per screen: the active item, the date, the main action.

**Signature (pick one):** [Swiss event poster](https://tng4480.github.io/design-demo/studies/swiss-poster.html), [Swiss minimalism](https://tng4480.github.io/design-demo/index.html#study=dp-swiss), [Geometric editorial](https://tng4480.github.io/design-demo/index.html#study=bauhaus-layout)
**Supporting:** [Hover transition](https://tng4480.github.io/design-demo/index.html#study=componentry-hover), [Expanding strips](https://tng4480.github.io/design-demo/index.html#study=su-expand), [Departure board](https://tng4480.github.io/design-demo/index.html#study=split-display)
**Motion:** [Clip path reveal](https://tng4480.github.io/design-demo/index.html#study=tx-clip)
**Sources:** [Design Prompts](https://www.designprompts.dev/) (Publicly accessible prompt gallery), [css-doodle](https://css-doodle.com/) (MIT component), [Componentry](https://componentry.dev) (MIT)
**Full-page references:** https://tng4480.github.io/design-demo/design-prompts.html?demo=swiss

---

## Operational enterprise (`operational-enterprise`)

Dense, calm and keyboard-friendly UI for people who work in it all day.

**Fits:** internal, enterprise, operations, ops, admin, back office, inventory, logistics, erp, transactions, finance, banking, data table, monitoring, fleet, compliance. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #f4f4f4;
  --surface: #ffffff;
  --ink: #161616;
  --muted: #525252;
  --line: #e0e0e0;
  --accent: #0f62fe;
  --on-accent: #ffffff;
  --font-display: 'IBM Plex Sans', system-ui, sans-serif;
  --font-body: 'IBM Plex Sans', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}
```

- **Type:** IBM Plex Sans for display, IBM Plex Sans for body, IBM Plex Mono for mono. 14 body, 12 table and label text, 20 / 28 page titles; tabular numbers everywhere. Plex throughout. Tabular figures for any column of numbers.
- **Shape:** radius 0-4px; Hairlines and zebra-free tables; status shown with colour plus icon plus word; Compact: 32px rows, 8px grid, persistent side navigation.
- **Layout:**
  - Shell: side navigation, breadcrumb header, page title with primary action at the right.
  - Tables with sticky headers, filters, bulk actions and a detail side panel.
  - Status, owner and next step visible on every record.
- **Motion:** Functional only: panel slides, row highlight, progress. Nothing decorative.
- **Copy:** Labels say exactly what the field holds. Errors say what happened and what to do next.
- Design the empty, loading and error states with the same care as the full table.

**Signature (pick one):** [Operational enterprise](https://tng4480.github.io/design-demo/index.html#study=business-operations)
**Supporting:** [Contrast-first colour scale](https://tng4480.github.io/design-demo/studies/contrast-scale.html), [Compact data view](https://tng4480.github.io/design-demo/index.html#study=svelte-pattern), [Resizable workspace](https://tng4480.github.io/design-demo/index.html#study=sc-workspace), [Command palette](https://tng4480.github.io/design-demo/index.html#study=command-palette), [Hold to confirm](https://tng4480.github.io/design-demo/index.html#study=hold-action), [Live line chart](https://tng4480.github.io/design-demo/index.html#study=live-chart)
**Sources:** [IBM Carbon Design System](https://carbondesignsystem.com/) (Apache 2.0), [shadcn/ui](https://ui.shadcn.com/docs/components) (MIT), [shadcn-svelte](https://shadcn-svelte.com/docs) (MIT), [Tabler Icons](https://tabler.io/icons) (MIT)
**Full-page references:** https://tng4480.github.io/design-demo/business-styles.html

---

## Casework and service (`casework-service`)

Clear, trustworthy flows for forms, cases and public or support services.

**Fits:** form, service, government, public, council, healthcare, clinic, patient, support, helpdesk, claims, insurance, application, booking, case, nonprofit, charity. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #ffffff;
  --surface: #f3f5f7;
  --ink: #0f1419;
  --muted: #4b5560;
  --line: #d5dbe1;
  --accent: #0b5cad;
  --on-accent: #ffffff;
  --font-display: 'Public Sans', system-ui, sans-serif;
  --font-body: 'Public Sans', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}
```

- **Type:** Public Sans for display, Public Sans for body, IBM Plex Mono for mono. 16-17 body (never smaller), 19 labels in 600, 32 / 48 headings. Readable before stylish. Large tap targets and visible labels.
- **Shape:** radius 4px; 2px borders on inputs, thick focus rings in a high-contrast colour; One question or one task per screen.
- **Layout:**
  - Step-by-step flows with a progress indicator and a check-your-answers page before submit.
  - Case pages: status timeline, what happens next, who to contact.
  - Content pages use a 65ch column with clear headings and summary boxes.
- **Motion:** Practically none. Confirmation states and focus moves must be obvious.
- **Copy:** Plain English at reading age 9-12. Tell people what they need before they start and how long it takes.
- Every error message names the field and how to fix it, next to the field.

**Signature (pick one):** [Casework and service](https://tng4480.github.io/design-demo/index.html#study=business-casework)
**Supporting:** [Contrast-first colour scale](https://tng4480.github.io/design-demo/studies/contrast-scale.html), [Onboarding checklist](https://tng4480.github.io/design-demo/index.html#study=onboarding), [Mobile drawer](https://tng4480.github.io/design-demo/index.html#study=drawer), [Hold to confirm](https://tng4480.github.io/design-demo/index.html#study=hold-action)
**Sources:** [Cloudscape Design System](https://cloudscape.design/) (Apache 2.0), [shadcn/ui](https://ui.shadcn.com/docs/components) (MIT), [Vaul](https://vaul.emilkowal.ski/) (MIT), [Humanizer](https://github.com/blader/humanizer) (MIT)
**Full-page references:** https://tng4480.github.io/design-demo/business-styles.html

---

## Warm consumer (`warm-consumer`)

Rounded, friendly and tactile for apps people use on their phones.

**Fits:** consumer, mobile, fitness, health, habit, personal finance, budget, education, learning, kids, family, pets, social, wellbeing, meditation, recipes. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Figtree:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #fff8f1;
  --surface: #ffffff;
  --ink: #2a1d14;
  --muted: #6e5e52;
  --line: #f0e2d4;
  --accent: #c2410c;
  --on-accent: #ffffff;
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body: 'Figtree', system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
}
```

- **Type:** Bricolage Grotesque for display, Figtree for body, Geist Mono for mono. 16 body, 600 weight UI, 32 / 48 / 64 headings with slight negative tracking. Characterful display face, plain body face.
- **Shape:** radius 16-24px cards, fully rounded buttons; Soft fills over borders; one soft shadow level; Roomy, thumb-sized controls (44px+).
- **Layout:**
  - Show the app in a phone frame on the first screen, mid-task, with real-looking content.
  - Sections pair a short benefit with one screen of the app or one illustration.
  - Bottom sheets and big toggles on mobile; one main action per screen.
- **Motion:** Springy and short: switches, rings filling, sheets snapping. 200-350ms springs.
- **Copy:** Second person, warm and specific. Name the outcome the person gets this week.
- Change the accent to the brand colour, keeping the warm off-white ground.

**Signature (pick one):** [Expressive controls](https://tng4480.github.io/design-demo/studies/m3-expressive.html), [Activity rings](https://tng4480.github.io/design-demo/index.html#study=activity-rings), [Soft sculpted controls](https://tng4480.github.io/design-demo/index.html#study=clay-toggle)
**Supporting:** [Grain gradient](https://tng4480.github.io/design-demo/studies/grain-gradient.html), [Spring switcher](https://tng4480.github.io/design-demo/index.html#study=motion-spring), [Mobile drawer](https://tng4480.github.io/design-demo/index.html#study=drawer), [Glass music player](https://tng4480.github.io/design-demo/index.html#study=glass-player), [Onboarding checklist](https://tng4480.github.io/design-demo/index.html#study=onboarding), [Animated icons](https://tng4480.github.io/design-demo/index.html#study=su-icons), [Animated tabs](https://tng4480.github.io/design-demo/index.html#study=sc-animated-tabs)
**Motion:** [Blurred type](https://tng4480.github.io/design-demo/index.html#study=rb-blur-text)
**Sources:** [Motion](https://motion.dev) (Core MIT), [Kokonut UI](https://kokonutui.com) (Free catalog MIT), [Vaul](https://vaul.emilkowal.ski/) (MIT), [Uiverse](https://uiverse.io/) (Official site states all UI elements MIT), [Animate UI](https://animate-ui.com/) (MIT + Commons Clause)

---

## Organic botanical (`organic-botanical`)

Earthy colour, serif warmth and natural imagery for lifestyle and food brands.

**Fits:** wellness, spa, cafe, bakery, restaurant, food, plants, florist, garden, skincare, beauty, yoga, farm, shop, boutique, candles, tea, coffee. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700&family=Karla:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #f3efe6;
  --surface: #fbf8f2;
  --ink: #22301f;
  --muted: #59644f;
  --line: #dcd5c4;
  --accent: #7a4b2a;
  --on-accent: #ffffff;
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Karla', system-ui, sans-serif;
  --font-mono: 'DM Mono', ui-monospace, monospace;
}
```

- **Type:** Fraunces for display, Karla for body, DM Mono for mono. 16-17 body, 40-96 display in Fraunces with soft optical size. Fraunces at low weight with italic accents; Karla keeps body text calm.
- **Shape:** radius Organic: 24px, arched image frames for one feature; Thin warm lines; no hard shadows; Relaxed, photograph-led.
- **Layout:**
  - Real photographs lead: produce, rooms, hands at work. Square or arched frames.
  - Menu, products or treatments as a calm list with prices, not as cards with icons.
  - Visit block early: hours, street and booking in one place.
- **Motion:** Image crossfades and gentle hover zoom only.
- **Copy:** Sensory and concrete: name the ingredient, the place, the hour.
- Photography carries this style. Use real or clearly labelled stand-in photographs.

**Signature (pick one):** [Botanical](https://tng4480.github.io/design-demo/index.html#study=dp-botanical)
**Supporting:** [Variable-weight headline](https://tng4480.github.io/design-demo/studies/variable-type.html), [Truchet pattern](https://tng4480.github.io/design-demo/studies/truchet-pattern.html), [Organic wave assets](https://tng4480.github.io/design-demo/index.html#study=wave-assets), [Image crossfade](https://tng4480.github.io/design-demo/index.html#study=im-fade), [Hover transition](https://tng4480.github.io/design-demo/index.html#study=componentry-hover), [Organic shape morph](https://tng4480.github.io/design-demo/index.html#study=liquid-morph)
**Motion:** [Horizontal image push](https://tng4480.github.io/design-demo/index.html#study=im-push)
**Sources:** [Design Prompts](https://www.designprompts.dev/) (Publicly accessible prompt gallery), [Haikei](https://haikei.app/) (Asset export rights not independently verified), [Anime.js](https://animejs.com/documentation/) (MIT public engine), [Motion](https://motion.dev) (Core MIT)
**Full-page references:** https://tng4480.github.io/design-demo/design-prompts.html?demo=botanical

---

## Bold maximal (`bold-maximal`)

Loud colour, huge type and collage for events, music and campaigns.

**Fits:** festival, music, concert, event, party, campaign, launch, fashion, streetwear, club, art, poster, tickets, gaming community, creator. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #fff3d6;
  --surface: #ffffff;
  --ink: #1a0f2e;
  --muted: #4a3d5c;
  --line: #1a0f2e;
  --accent: #ff4d1f;
  --on-accent: #1a0f2e;
  --font-display: 'Anton', system-ui, sans-serif;
  --font-body: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'Space Mono', ui-monospace, monospace;
}
```

- **Type:** Anton for display, Space Grotesk for body, Space Mono for mono. 16 body; display 120-240 uppercase, condensed, tight leading. Condensed display at poster sizes. Mix in one script or serif word only if the brand has one.
- **Shape:** radius Mixed on purpose: pills, circles and hard rectangles; 2-3px ink outlines, offset shadows; Layered and packed, but one clear action per screen.
- **Layout:**
  - Poster-like hero: date, place and line-up set as huge type, layered with cut-out imagery.
  - Line-up or schedule as giant typographic lists.
  - Ticket builder or tier picker as the main interaction.
- **Motion:** Kinetic headlines and marquee once per page; parallax limited to poster layers.
- **Copy:** Punchy and factual: what, when, where, who, how much. Energy comes from type, not adjectives.
- Pick the palette from the brand or the poster art; keep body text dark on light for reading.

**Signature (pick one):** [Two-ink riso poster](https://tng4480.github.io/design-demo/studies/riso-poster.html), [Maximalism](https://tng4480.github.io/design-demo/index.html#study=dp-maximalism), [Type in motion](https://tng4480.github.io/design-demo/index.html#study=kinetic-headline)
**Supporting:** [Grain gradient](https://tng4480.github.io/design-demo/studies/grain-gradient.html), [Make some noise](https://tng4480.github.io/design-demo/index.html#study=comic-badge), [Electric CTA](https://tng4480.github.io/design-demo/index.html#study=neon-button), [Analog after hours](https://tng4480.github.io/design-demo/index.html#study=vhs-title), [Print, meet pixels](https://tng4480.github.io/design-demo/index.html#study=halftone-poster), [An evening in gold](https://tng4480.github.io/design-demo/index.html#study=deco-ticket)
**Motion:** [Text scroll](https://tng4480.github.io/design-demo/index.html#study=su-text-scroll), [Rotating headline](https://tng4480.github.io/design-demo/index.html#study=rb-rotating-text), [Timeline choreography](https://tng4480.github.io/design-demo/index.html#study=gsap-stagger)
**Sources:** [Design Prompts](https://www.designprompts.dev/) (Publicly accessible prompt gallery), [Magic UI](https://magicui.design/docs/components/magic-card) (MIT for public repo), [React Bits](https://reactbits.dev/get-started/index) (MIT + Commons Clause), [GSAP + ScrollTrigger](https://gsap.com/) (Custom Standard License), [Uiverse](https://uiverse.io/) (Official site states all UI elements MIT)
**Full-page references:** https://tng4480.github.io/design-demo/design-prompts.html?demo=maximalism

---

## Neo brutal (`neo-brutal`)

Flat colour blocks, thick outlines and hard shadows for opinionated indie products.

**Fits:** indie, creator, hackathon, side project, newsletter tool, no-code, template, student, pricing, waitlist, community, open source. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #fdf6e3;
  --surface: #ffffff;
  --ink: #000000;
  --muted: #3d3d3d;
  --line: #000000;
  --accent: #ffd23f;
  --on-accent: #000000;
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'Space Mono', ui-monospace, monospace;
}
```

- **Type:** Space Grotesk for display, Space Grotesk for body, Space Mono for mono. 16 body, 700 headings, 48-96 display. One quirky grotesk. Mono for prices and tags.
- **Shape:** radius 0-8px; 3px black borders on everything interactive; 4px offset hard shadows; Chunky.
- **Layout:**
  - Cards and buttons with hard shadows that press down on click.
  - Pricing as three bold blocks in different flat colours, with the honest limits listed.
  - Sticker-like badges for status and highlights.
- **Motion:** Press and lift on buttons (translate 2-4px with the shadow). Nothing floaty.
- **Copy:** Blunt and funny where honest. Say the limits out loud.
- Use two or three flat block colours beside the accent, each with black text.

**Signature (pick one):** [No-nonsense pricing](https://tng4480.github.io/design-demo/index.html#study=brutal-pricing)
**Supporting:** [Two-ink riso poster](https://tng4480.github.io/design-demo/studies/riso-poster.html), [Hard-shadow actions](https://tng4480.github.io/design-demo/index.html#study=brutal-button), [Sketchbook card](https://tng4480.github.io/design-demo/index.html#study=sketch-card), [Make some noise](https://tng4480.github.io/design-demo/index.html#study=comic-badge), [8-bit loader](https://tng4480.github.io/design-demo/index.html#study=pixel-loader)
**Sources:** [Neobrutalism Components](https://www.neobrutalism.dev/docs) (MIT), [Rough.js](https://roughjs.com/) (MIT), [Magic UI](https://magicui.design/docs/components/magic-card) (MIT for public repo)

---

## Luxury deco (`luxury-deco`)

Deep colour, fine gold lines and high-contrast serifs for hospitality and luxury.

**Fits:** hotel, luxury, jewellery, jewelry, fine dining, wine, gala, wedding, cocktail, bar, theatre, spa resort, perfume, watch, estate. **Mode:** dark.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #0f1d18;
  --surface: #162822;
  --ink: #f3ead7;
  --muted: #b7ab92;
  --line: #c9a96155;
  --accent: #c9a961;
  --on-accent: #0f1d18;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Jost', system-ui, sans-serif;
  --font-mono: 'Jost', ui-monospace, monospace;
}
```

- **Type:** Cormorant Garamond for display, Jost for body, Jost for mono. 16 body in Jost with wide tracked caps labels (0.2em), 48-110 display in Cormorant 500. High-contrast serif display; geometric sans for small caps labels.
- **Shape:** radius 0, or arched tops for one frame; Fine 1px gold rules, stepped deco corners, symmetrical frames; Spacious and centred.
- **Layout:**
  - Symmetrical, centred compositions with framed photography.
  - Reservation or enquiry block always one step away.
  - Menus, rooms or collections as elegant lists with fine rules.
- **Motion:** Slow fades (400-600ms) and line draws; nothing bouncy.
- **Copy:** Understated and exact. Fewer words, specific nouns, no superlatives.
- Gold is for lines and small marks; large areas stay deep colour or photograph.

**Signature (pick one):** [An evening in gold](https://tng4480.github.io/design-demo/index.html#study=deco-ticket), [Deco identity](https://tng4480.github.io/design-demo/index.html#study=deco-mark)
**Supporting:** [Grain gradient](https://tng4480.github.io/design-demo/studies/grain-gradient.html), [Fluted glass](https://tng4480.github.io/design-demo/index.html#study=fluted-glass), [Hover transition](https://tng4480.github.io/design-demo/index.html#study=componentry-hover), [Image crossfade](https://tng4480.github.io/design-demo/index.html#study=im-fade)
**Motion:** [Clip path reveal](https://tng4480.github.io/design-demo/index.html#study=tx-clip)
**Sources:** [Framer Marketplace](https://www.framer.com/marketplace/components/) (Per-asset), [Paper Shaders](https://shaders.paper.design/) (Apache-2.0), [Componentry](https://componentry.dev) (MIT)

---

## Retro playful (`retro-playful`)

Pixel art, old desktops and 8-bit feedback for games and nostalgic microsites.

**Fits:** game, gaming, retro, arcade, pixel, fan site, nostalgia, jam, toy, quiz, 8-bit, mod, discord. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Grotesk:wght@400;500;600;700&family=VT323&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #e8e3d3;
  --surface: #ffffff;
  --ink: #1d1b26;
  --muted: #4e4a5c;
  --line: #1d1b26;
  --accent: #c42d36;
  --on-accent: #ffffff;
  --font-display: 'Press Start 2P', system-ui, sans-serif;
  --font-body: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'VT323', ui-monospace, monospace;
}
```

- **Type:** Press Start 2P for display, Space Grotesk for body, VT323 for mono. 16 body; pixel font only for short headings and labels at 12-24px. Pixel fonts are hard to read; keep body text in a normal sans.
- **Shape:** radius 0; Pixel borders (box-shadow steps) or bevelled windows; Chunky, playful.
- **Layout:**
  - UI as a game screen or old desktop: windows, panels, status bars.
  - Pixel loaders and pixel reveals for transitions.
  - Scores, levels and progress as the main visual language.
- **Motion:** Stepped (steps() easing), short, with sound off by default.
- **Copy:** Game-like and short: verbs, scores, levels.
- Keep a non-pixel font for anything longer than a phrase.

**Signature (pick one):** [Pixel control panel](https://tng4480.github.io/design-demo/index.html#study=pixel-console), [Retro desktop window](https://tng4480.github.io/design-demo/index.html#study=retro-window)
**Supporting:** [Ordered dither](https://tng4480.github.io/design-demo/studies/dither.html), [8-bit loader](https://tng4480.github.io/design-demo/index.html#study=pixel-loader), [Pixel reveal](https://tng4480.github.io/design-demo/index.html#study=rb-pixel-transition), [Retro horizon](https://tng4480.github.io/design-demo/index.html#study=retro-grid), [Departure board](https://tng4480.github.io/design-demo/index.html#study=split-display)
**Motion:** [Stairs preloader](https://tng4480.github.io/design-demo/index.html#study=su-preloader)
**Sources:** [NES.css](https://nostalgic-css.github.io/NES.css/) (MIT), [98.css](https://jdan.github.io/98.css/) (MIT), [css-doodle](https://css-doodle.com/) (MIT component), [React Bits](https://reactbits.dev/get-started/index) (MIT + Commons Clause)

---

## Immersive showcase (`immersive-showcase`)

One 3D or shader centrepiece and scroll-told chapters, for launches with budget.

**Fits:** product launch, hardware, device, car, creative studio, 3d, award, immersive, experience, campaign site, portfolio wow, interactive, webgl. **Mode:** dark.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #0a0b10;
  --surface: #13151d;
  --ink: #f2f3f7;
  --muted: #a1a5b3;
  --line: #272a36;
  --accent: #ff6a3d;
  --on-accent: #0a0b10;
  --font-display: 'Inter Tight', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

- **Type:** Inter Tight for display, Inter for body, JetBrains Mono for mono. 16 body, 72-160 display, chapter numbers in mono. Type stays simple so the scene carries the drama.
- **Shape:** radius 12px; Minimal; the scene is the frame; One idea per screen.
- **Layout:**
  - Hero is the object or scene, big and whole, with one line of copy and one action.
  - Chapters advance with scroll, each showing a different view or part.
  - Specs and buying or contact details in a calm, static final section.
- **Motion:** Scroll-linked inside the story section only; provide a static fallback and pause controls.
- **Copy:** Short lines per chapter, each naming one feature and one number.
- Budget: one WebGL context in view at a time, disposed offscreen, with a still image fallback.

**Signature (pick one):** [Liquid glass lens](https://tng4480.github.io/design-demo/studies/liquid-glass.html), [Floating 3D sculpture](https://tng4480.github.io/design-demo/index.html#study=3d-sculpture), [Helmet hover reveal](https://tng4480.github.io/design-demo/index.html#study=helmet-hover), [Cinematic chapter journey](https://tng4480.github.io/design-demo/index.html#study=cinematic-chapters), [Gradient scroll story](https://tng4480.github.io/design-demo/index.html#study=shadergradient-scroll), [Silk](https://tng4480.github.io/design-demo/index.html#study=rb-silk)
**Supporting:** [Pinned product story](https://tng4480.github.io/design-demo/index.html#study=pinned-story), [Scroll choreography](https://tng4480.github.io/design-demo/index.html#study=componentry-scroll), [Zoom through](https://tng4480.github.io/design-demo/index.html#study=tx-zoom)
**Motion:** [Smooth scroll comparison](https://tng4480.github.io/design-demo/index.html#study=lenis-flow), [Page shutter transition](https://tng4480.github.io/design-demo/index.html#study=page-shutter), [Stacking stories](https://tng4480.github.io/design-demo/index.html#study=osmo-stack)
**Sources:** [Drei / React Three Fiber](https://drei.docs.pmnd.rs/) (MIT), [Shader Gradient](https://shadergradient.co) (MIT upstream), [GSAP + ScrollTrigger](https://gsap.com/) (Custom Standard License), [Lenis](https://lenis.dev/) (MIT), [Barba.js](https://barba.js.org/) (MIT), [React Bits](https://reactbits.dev/get-started/index) (MIT + Commons Clause)
**Full-page references:** https://tng4480.github.io/design-demo/shadergradient-scroll.html, https://tng4480.github.io/design-demo/journey.html, https://tng4480.github.io/design-demo/scroll-lab.html

---

## Data report (`data-report`)

Editorial reporting that leads with the finding and supports it with clear charts.

**Fits:** report, annual report, research, survey, results, board, executive, kpi, metrics, data story, insights, investor, impact, climate. **Mode:** light.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #fafaf8;
  --surface: #ffffff;
  --ink: #171717;
  --muted: #545454;
  --line: #e3e3df;
  --accent: #1f5f8b;
  --on-accent: #ffffff;
  --font-display: 'Source Serif 4', Georgia, serif;
  --font-body: 'Source Sans 3', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}
```

- **Type:** Source Serif 4 for display, Source Sans 3 for body, IBM Plex Mono for mono. 17 body, 40-64 serif headlines that state the finding; big numbers 64-120 in sans with tabular figures. Serif for findings, sans for data and labels.
- **Shape:** radius 4px; Light rules; charts without boxes; Reading column plus wide chart breakouts.
- **Layout:**
  - Each section opens with the finding as a sentence, then the chart, then the caveat.
  - Key numbers in a row with what changed and over what period.
  - Charts direct-labelled, one highlighted series, the rest grey.
- **Motion:** Charts draw once when shown; numbers do not tick on every scroll.
- **Copy:** Lead with the number and what it means. Give the period, the sample and the source.
- One highlight colour per chart; label series directly instead of a legend.

**Signature (pick one):** [Annotated line chart](https://tng4480.github.io/design-demo/studies/annotated-chart.html), [Editorial business reporting](https://tng4480.github.io/design-demo/index.html#study=business-report)
**Supporting:** [Live line chart](https://tng4480.github.io/design-demo/index.html#study=live-chart), [Color scale builder](https://tng4480.github.io/design-demo/index.html#study=color-scale), [Activity rings](https://tng4480.github.io/design-demo/index.html#study=activity-rings)
**Sources:** [IBM Carbon Design System](https://carbondesignsystem.com/) (Apache 2.0), [Bklit UI](https://bklit.com) (Chart source MIT), [ColorKit.io](https://colorkit.io/) (Hosted tool)
**Full-page references:** https://tng4480.github.io/design-demo/business-styles.html
