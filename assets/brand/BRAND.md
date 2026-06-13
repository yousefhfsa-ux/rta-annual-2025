# RTA Brand Reference

Extracted from **RTA Brand Expression Guidelines** (the 2016 and 2024 editions are
the same system — *"Make. Move. Transform."*). Use this as the source of truth for
the web edition.

## Positioning
**Make. Move. Transform.** — RTA imagines a new way of living that is smarter,
smoother and safer, advancing the happiness of every resident and traveller.

Personality traits: Engaging · Innovative · Considerate · Committed · Transparent · Confident.

## Colour palette
2 primary + 8 secondary. Each colour maps to a positive emotion.

| Role | Name | Emotion | Hex |
|------|------|---------|-----|
| Primary | Red | determined | `#ed0000` |
| Primary | Blue | safe | `#161c8f` |
| Secondary | Yellow | happy | `#ffb700` |
| Secondary | Orange | fascinated | `#ff7000` |
| Secondary | Magenta | inspired | `#d000ad` |
| Secondary | Purple | imaginery | `#7f30c7` |
| Secondary | Blue (bright) | relaxed | `#025ee0` |
| Secondary | Teal | unique | `#00afb8` |
| Secondary | Green | optimistic | `#00b054` |
| Secondary | Olive | grounded | `#a1a521` |

> Use the **correct value** of each swatch — when used right, colour becomes a key
> visual asset. (Hex values sampled directly from the guideline swatches.)

## Logo (brandmark)
The red **swoosh** triangle with the RTA wordmark.
- Primary version: **red** mark. On a colour background the mark is **white**
  (with the wordmark knocked out). Preferred backdrop is RTA red, or any secondary swatch.
- Clear space = the height of the "RTA" wordmark. Minimum size 5 mm (mark) / 10 mm (with govt lockup).
- **Do not recreate or alter** — use the artworked files. Exact vector extracted to
  `logo/logo-red.svg` and `logo/logo-white.svg` (white-knockout for colour backgrounds).
- Exact swoosh path: `M0 147.2C159.6 102.7 272.3 88.8 409.2 76.5C375.8 46.6 341.9 21.9 304.6 0C211.3 34.9 98.9 92.8 0 147.2Z` (viewBox `0 0 410 148`).

## Typography
- Brand font: **RTA** (family "RTA" / "RTA Bold") — covers **Latin + Arabic** with full
  **GSUB/GPOS shaping** (Arabic letters join correctly). Headlines are heavy weights,
  tight leading, often set in **blue** or **red**.
- The complete `.otf` files were recovered from the **Heat-Awareness campaign package**
  (`HeatAwareness_*/Fonts/RTA-Regular.otf`, `RTA-Bold.otf`) — the guideline PDFs only
  embedded subsetted, unshaped copies. Source OTFs + web `RTA-*.woff2` now live in
  `../fonts/` and are used site-wide. **Tajawal** remains only as a fallback for any
  glyph the 2-weight RTA family lacks.

## Grid & layout
- A **modular grid** of solid-colour blocks (sharp rectangles) is the core device —
  flexible, bold, distinct. The logo sits top-right; headlines run large.
- Illustrations depict whole scenes (front/mid/back planes, closely cropped, vibrant,
  deliberately "human"). Infographics show single objects on a solid colour background.

## Extracted assets (this folder)
- `icons/` — 15 official icons: marine, marine-fast, ferry, water-bus, metro, tram,
  bus, taxi, pin, briefcase, locate, tunnel, parking, car-share, service (transparent PNG).
- `illustrations/` — object infographics on colour (`object-*.jpg`) + poster examples (`poster-*.jpg`).
- `logo/` — `logo-red.svg`, `logo-white.svg`.
