# Colour themes

The Graphite palette transcribes the user-supplied reference: five surfaces, three text colours, primary and error. Percentages and dp labels in that image are descriptive; the actual opaque hex colours are retained. Midnight, Pine, Umber and Ink and their recommended accent sets are original curated palettes.

Edit `dist/colour-themes.json` to extend this study. `roles` supplies ordered labels and groups. Each theme supplies an id, name, token map and recommended accent-set id. Each accent set supplies an id, name and token map. Controls and swatches are generated from this data; no selector markup needs editing. New tokens appear in swatches and CSS/JSON exports automatically. Add a CSS variable use in the preview when a new role should affect an interface element. Missing tokens fall back to the first theme/set. Preserve existing role names for compatibility. Error remains a semantic role rather than a second decorative accent. All values should be six-digit hex colours.

Saved combinations are browser-local and identify themes/sets by stable ids. Changing a theme chooses its recommended accent set; choosing an accent set overrides that recommendation. Export includes merged tokens and an automatically chosen button foreground. Contrast checks use WCAG relative luminance and cover specific displayed pairs, not full accessibility certification.
