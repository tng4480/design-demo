# UI Atlas: design guide for agents

UI Atlas is a curated library of design directions, live studies and vetted sources for interfaces, websites and graphics (posters, charts, slides, social images, identities, generative art). Use it to make a deliberate design instead of a default one.

Everything here is plain text you can fetch:

- Directions (complete design systems): https://tng4480.github.io/design-demo/agents/directions.md
- Rules per medium (web page, app, poster, chart, slides…): https://tng4480.github.io/design-demo/agents/media.md
- Every study, with links to its code and a preview image: https://tng4480.github.io/design-demo/agents/studies.md
- Every source, with licence and install line: https://tng4480.github.io/design-demo/agents/sources.md
- Machine-readable: https://tng4480.github.io/design-demo/agents/directions.json and https://tng4480.github.io/design-demo/catalog.json

## The process

Work through these steps in order. Each ends on a condition you can check.

1. **Read the brief.** Write down five things: the *medium* (web page, app UI, poster, chart, slides, social image, identity, pattern or artwork), the *subject* (what is sold, shown or argued), the *audience*, the *one main action or point*, and the *real material* you have (logo, colours, photographs, screenshots, data, copy). Done when all five are written; mark anything missing as missing rather than guessing.

2. **Pick one direction.** Open directions.md. Match the brief's subject and audience against each direction's *Fits* line and read the one-line descriptions of the two or three closest. Choose one. When two fit, take the quieter one; when the brand has its own colours or fonts, keep the direction's structure and swap in the brand's values. Done when you can state the direction's id and one sentence on why it suits this subject.

3. **Read the rules for your medium** in media.md. They set canvas size, hierarchy and the checks specific to that medium. Done when you have read your medium's section.

4. **Choose elements within the budget.** From the direction's study list (or studies.md when you need something it lacks): at most **one signature** element and **two to four supporting** elements. For each, open its study page, read the comment at the top of the file, and take the *technique* (structure, CSS, script), not the demo's sample words or data. Done when every chosen element has a stated job in this design, such as "the hero visual" or "explains the three steps".

5. **Build from the tokens.** Paste the direction's `:root` tokens and font link first, then build every surface from those variables: colour, type scale, radius, spacing. Swap the accent for the brand colour when there is one; keep a single accent. Done when no colour or font in the output is outside the token set.

6. **Write the words.** Headings name the thing or state the point; buttons are a verb and an object; every number is real, or clearly sample data in a mock. Use the subject's own vocabulary. Done when every heading and button passes those three tests.

7. **Check.** Go through the checklist below and fix each miss. Done when every line holds.

## The budget

Restraint is what separates a designed page from a generated one. Spend it like this:

- **One** signature element per page or artwork (a shader, a 3D object, a kinetic headline, a big poster composition). Everything else supports it.
- **One** accent colour, used for the main action and the single most important mark on each screen.
- **Two** typefaces at most (display + body), plus a mono only for numbers, code or labels.
- **One** motion idea per screen; everything else answers the pointer (hover, press, focus) and then rests.

## Defaults and decisions

Generated design looks generic because every choice is the most common one. Replace each default with a decision:

| The default | The decision |
|---|---|
| Purple-to-blue gradient hero | The direction's ground colour, a photograph of the real subject, or its one signature study |
| Inter for everything | The direction's display + body pairing |
| Three feature cards with icons | One real fragment of the product per feature, or a list with specifics |
| Centred text everywhere | Left-aligned text on a grid; centre only short closing statements |
| Glass, glow and blur on every surface | Solid surfaces; glass only on one floating control over imagery |
| Fade-in on every section | Content in place on load; motion only where it explains something |
| "Unlock", "seamless", "elevate", "revolutionise" | Concrete nouns, numbers and the subject's own words |
| Stock testimonials and invented logos | Real proof from the brief, or nothing |
| Chart with legend, rainbow series and a topic title | Title that states the finding, one highlight colour, direct labels |
| Emoji as icons | One icon family (Lucide or Phosphor) at one stroke weight |

## Checklist

- The first screen (or the artwork at thumbnail size) says what it is and for whom, without scrolling or squinting.
- Every colour comes from the tokens; text pairs meet 4.5:1 contrast (3:1 for large text and icons).
- Two typefaces at most; sizes follow the direction's scale.
- One signature element; it does a job tied to the subject.
- Everything aligns to one grid with equal outer margins.
- Every interactive element visibly responds to hover, press and keyboard focus.
- Motion respects `prefers-reduced-motion`; nothing essential is hidden until it animates.
- Copy is specific: headings name things, buttons are verb + object, numbers are real or marked as samples.
- Licences are respected (see below) and credits are in one footer line where needed.

## Using study code

- Studies under `studies/` are single self-contained HTML files. View source, copy what you need, and replace sample text and data.
- Older studies run inside the gallery; open them at `index.html#study=<id>`. Their code is bundled, so build from the linked upstream source and its install line instead.
- A study marked "Original study" was written for the atlas; its upstream link is the production library to use for the real thing.
- Check each source's licence in sources.md before shipping. "Inspiration only" sources are for looking at, not copying.
