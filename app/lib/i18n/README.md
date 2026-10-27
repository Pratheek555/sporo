# Website languages

English keeps the existing public URLs. French uses `/fr` and the navigation links
retain the selected language. `proxy.ts` rewrites English URLs to the internal
`/en` route tree; `/en/...` redirects to the original public URL.

The dictionaries contain the main interface and page copy. Service and neighbourhood
articles have matching French JSON files alongside their English content modules.
Keep slugs, related service IDs, Markdown markers and link/image destinations intact
when editing translations. French punctuation spacing is applied at render time.

The initial long-form French articles were machine-translated from the English
source, with terminology, captions and formatting corrections. A fluent French
editor should review the copy for idiom and tone when making editorial updates.
There is no translation API or third-party translation script in the running site.

The original display font has no accented characters. French uses the self-hosted
Barlow Condensed font so accented headings stay visually consistent.

Run `node scripts/verify-i18n.mjs` to check dictionary parity, complete article
coverage, Markdown structure, preserved destinations and language switching.
