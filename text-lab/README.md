# Text studies

Actual Motion-Primitives TextEffect, pinned to 120f64f6ca60348e251f929e9c81f11ccbe45eda. MIT license in dist/MOTION_PRIMITIVES_LICENSE.txt. Upstream adaptations: cn import replaced with clsx (utility classes supplied in local CSS); AnimatePresence uses sync mode so outgoing headings retain their layout height during exit. This prevents their centered wrapper collapsing and shifting the text. Original layout, scroll controller and line-mask variants.

Build: npm run build:text. Studies are accessed inside Atlas. text-preview.html is an internal iframe entry point and redirects standalone visits to Explore. Gallery cycles chapters only while mounted/visible. Reduced motion and Atlas pause show static semantic text.
