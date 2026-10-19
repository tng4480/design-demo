# Text studies

Actual Motion-Primitives TextEffect, pinned to 120f64f6ca60348e251f929e9c81f11ccbe45eda. MIT license in dist/MOTION_PRIMITIVES_LICENSE.txt. Upstream adaptations: cn import replaced with clsx (utility classes supplied in local CSS); AnimatePresence uses sync mode so outgoing headings retain their layout height during exit. This prevents their centered wrapper collapsing and shifting the text. Original layout, scroll controller and line-mask variants.

Build: npm run build:text. Full page: text-studies.html. Gallery cycles chapters only while mounted/visible; full page maps scroll position to active chapter. Reduced motion and Atlas pause show static semantic text.
