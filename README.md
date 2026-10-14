# wooley.dev

Matthew Wooley's site. It's built with Astro 7 and strict TypeScript, and deployed by Cloudflare Pages from `master`. Every other branch gets a preview at `<branch>.wooley-dev.pages.dev`.

```bash
npm ci
npm run dev       # http://localhost:4321
npm run build     # astro check (strictest TS), then a static build into dist/
npm run preview
```

## What's where

| Change | Edit |
|---|---|
| Name, title, tagline, about text, email, LinkedIn | `src/data/profile.ts` |
| Jobs (dates are `YYYY-MM`; `end: null` means current) | `src/data/experience.yaml` |
| Home-page highlight cards | `src/data/highlights.yaml` |
| Education, certifications (badge image + verify link), skills | `src/data/*.yaml` |
| Field types and validation for all the above | `src/content.config.ts` (Zod schemas; a bad date fails the build) |
| Social cards (`/og/<page>.png`, rendered at build time) | `src/lib/og.ts` |
| Colours, layout, print styles | `src/styles/global.css` |
| Security headers, CSP, caching | `public/_headers` |
| The only JavaScript (theme toggle, print button) | `public/site.js` |
| CI budgets | `lighthouserc.json`, `.github/workflows/ci.yml` |

## Guarantees CI enforces

- `astro check` passes under `astro/tsconfigs/strictest`.
- Lighthouse scores: performance ≥ 95, accessibility 100, best practices ≥ 95, SEO 100, on every page.
- No broken internal links.

## Notes

- **No third-party requests.** The font is self-hosted through Astro's Fonts API, with a metric-matched fallback so text doesn't shift. The AWS badge is a local copy.
- **The CSP is `script-src 'self'`.** Adding analytics or embeds means editing `public/_headers` first.
- **`security.txt` expires 2027-10-01.** Bump it before then.
