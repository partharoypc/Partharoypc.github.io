# Partha Roy — Software Engineer | Android & Full-Stack Web

Live: https://partharoypc.github.io/
Play portfolio: https://play.google.com/store/apps/dev?id=8108071590254123611 (Data Matrix Lab)

Software Engineer, Data Matrix Lab — Play Store apps with real users.
Focus: Android (Java/Kotlin/MVVM), full-stack web (PHP/Laravel, JS), on-device AI, Bangla products, network tools, data work.

## What's inside
- `index.html` — About → Selected Apps (curated, filterable) → Technical Projects → Experience & Education → Skills → Contact
- `apps.json` — machine-readable catalog mirroring the app cards in `index.html` (devId 8108071590254123611)
- Apps link straight to Play Store, builds link to GitHub
- Zero-build static site, light minimal UI, fully responsive + JSON-LD `Person` and `ItemList` schema
- SEO/PWA extras: `robots.txt`, `sitemap.xml`, `site.webmanifest`, custom `404.html`, `.nojekyll`

## Architecture
Pure static site — no build step, no dependencies, no framework. Three shared assets:
- `assets/css/style.css` — all styling, driven by the `:root` design tokens
- `assets/js/main.js` — scroll progress, mobile menu, typing effect, scrollspy, reveal-on-scroll, app filter
- `assets/img/` — `icon.png` (brand/favicon/avatar) and `assets/img/apps/` (one icon per app)

## Maintenance
`index.html` is the source of truth for the app cards (`#projGrid`). `apps.json` and the JSON-LD
`ItemList` are hand-maintained mirrors of that list — when you add, remove, reorder or recategorize an app,
update all three so they stay in sync:
1. `index.html` — the `<article class="work proj">` card + its `data-cat` filter
2. `apps.json` — the matching entry (`name`, `package`, `url`, `track`, `filter`, optional `website`/`featured`)
3. `index.html` — the JSON-LD `ItemList` `itemListElement`

Filter categories (`data-cat` / `filter`): `all`, `ai`, `edu`, `util`, `net`, `web`.

> `404.html` and `site.webmanifest` reference assets with root-absolute paths (`/assets/...`) so they keep
> working when GitHub Pages serves the 404 page from a deep URL.

## Key links
- Play dev: https://play.google.com/store/apps/dev?id=8108071590254123611
- GitHub: https://github.com/partharoypc
- Site: datamatrixlab.com (via Play listing)

## Run locally
Just open `index.html`, or:
```powershell
npx serve .
```

## Customize
- Colors: `assets/css/style.css` → `:root`
- Typing: `assets/js/main.js` → `words[]`
- Apps: `index.html` → `#projGrid` (filters: all/ai/edu/util/net/web)
