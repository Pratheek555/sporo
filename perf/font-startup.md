# Display font startup regression

Verified on October 1, 2026 in the Codex in-app Chromium browser.

Opening a fresh tab with the original Akzidenz font blocked the renderer for
roughly 20 seconds. A production PerformanceObserver recorded a 17,840 ms
long task. A CPU profile located the stall in a synchronous layout read.
Reloading an existing tab could hide the problem because font work was cached.

Font isolation confirmed the cause. Replacing only Akzidenz with a system font
removed the delay. Disabling the testimonial scroll timeline, balanced text
wrapping, text stroke, or font hinting individually did not remove it.

The web font retains the original glyph coordinates for larger contours and
removes tiny distress contours with polygon area below 32 square font units.
It also removes hinting. Character mappings, advance widths, and kerning match
the source, and every previously visible glyph still has an outline.

| Measurement | Original | Web font |
| --- | ---: | ---: |
| Outline points | 393,510 | 114,577 |
| Font bytes | 418,456 | 98,012 |
| Fresh production tab startup | About 20 s | About 1 s |

After the fix, production navigation reached DOMContentLoaded at 242 ms and
the load event at 604 ms. An uncached production navigation with six-times CPU
slowdown reached the load event at 3,705 ms, with a largest observed long task
of 53 ms. These measurements describe this local environment, not a network
performance guarantee.

The homepage, contact navigation, studio loader and book opening, and native
horizontal testimonial scrolling were verified. Build and lint passed.

To regenerate the font, install `fonttools[woff]` in a tooling environment and
run `python perf/optimize-display-font.py`. The original font is preserved as
the source. No Python tooling is needed to build or serve the application.

To check for recurrence, open a fresh browser tab with the cache disabled and
inspect buffered `longtask` entries with PerformanceObserver. Test both normal
CPU speed and six-times slowdown. Check that the browser requests
`AkzidenzFreena-BoldCondense-web.woff2`, and verify the lettering visually.
