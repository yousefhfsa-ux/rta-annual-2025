# RTA Annual Report 2025 — Interactive Web Edition

A standalone, animated **RTL Arabic** "living report" built from
`EXP_8255_RTA_Annual Report 2025_AR_V6.pdf`. Scroll-driven, with animated
illustrations and the full report content page-by-page.

## Brand
The design follows the official **RTA Brand Expression Guidelines (April 2024)** —
*"Make. Move. Transform."* — not the report cover's older navy/honeycomb look.
- **Palette:** primary `--red #ed0000` + `--blue #161c8f`; 8 secondaries
  (yellow `#ffb700`, orange `#ff7000`, magenta `#d000ad`, purple `#7f30c7`,
  blue `#025ee0`, teal `#00afb8`, green `#00b054`, olive `#a1a521`).
- **System:** modular solid-colour blocks, sharp edges, the red **swoosh** brandmark,
  bold type. Each chapter maps to a palette colour.
- **Fonts:** the real RTA fonts (RTA Office / RTA / Myriad Pro) that were dropped in
  the `RTA/Font` folder did **not** transfer — only macOS `._` metadata stubs arrived,
  and the copies embedded in both PDFs are subsetted bare-CFF with no Arabic shaping.
  So this uses the **RTAOffice** WOFF2 (Latin + numerals) extracted from the report
  plus **Tajawal** for Arabic UI text. Drop the real `.ttf/.otf` into `assets/fonts/`
  and add `@font-face` rules to make Arabic fully authentic.

## Run it
Just open `index.html` over any static server (it loads JS/images, so `file://`
won't work in all browsers). Quick local server:

```
python -m http.server 5050 --directory .
# → http://localhost:5050
```

Deploy: upload the whole folder to any static host (the web team's CDN, S3,
Netlify, etc.). No build step, no backend.

## What's inside
- **Animated hero** — honeycomb canvas (the cover motif), 20-year anniversary mark, Burj skyline parallax.
- **KPI bar** — count-up headline numbers.
- **12 colour-coded chapters** — each with a parallax photo divider, animated stat cards (count-ups), and the section's original pages revealed on scroll.
- **One fully element-animated scene** (Operational performance, spread 53): the report's
  own transit illustration with its vehicles **actually moving**. Each vehicle (metro, taxi,
  cyclist) is cut out of the real art (`build/scene.py`), its original spot rebuilt by
  per-row reconstruction (the scene is horizontally banded), and the cut-outs flow across a
  static "plate" that keeps every number intact. Output lives in `assets/scenes/transit/`.
- **Four placement-safe illustrations** (Year, Competitive, Sustainability, HR): the full
  report illustration shown with **all numbers/stats visible** (the earlier crops clipped
  them), revealed with a wipe and a slow cinematic Ken-Burns drift. These scenes are either
  diagrammatic (globe, HR team) or too crowded to cut vehicles cleanly, so they're animated
  at the page level rather than per-element.

To add another fully-animated scene, copy a block in `build/scene.py`: give each moving
element a bounding box + a `clean_x` (a column of pure background on the same rows), run it,
then point the chapter's `scene:` field at the new folder in `data.js`.
- **Faithful page gallery** — all 116 spreads as crisp images, so nothing from the report is lost.

## Structure
```
index.html              page shell + hero
assets/css/style.css    design system (navy/red brand, RTL)
assets/js/data.js       chapter model: titles, colours, spread ranges, stats  ← edit here
assets/js/app.js        animations, count-ups, honeycomb, scroll reveal, SVG showcases
assets/pages/           spread_000.jpg … spread_115.jpg  (faithful rendered pages)
assets/hero/            hero photos used in dividers
assets/scenes/transit/  plate + cut-out vehicle PNGs + scene.json (animated scene)
assets/fonts/           RTAOffice web fonts (Latin + numerals)
assets/brand/           official assets extracted from the RTA Guidelines (see BRAND.md)
  ├─ logo/              exact vector swoosh (logo-red.svg, logo-white.svg knockout)
  ├─ icons/             15 official RTA icons (metro, bus, taxi, marine, … transparent PNG)
  ├─ illustrations/     flat object infographics + poster examples
  └─ BRAND.md           palette hex, logo rules, typography, grid reference
build/brand_assets.py   re-extracts icons + illustrations from the 2016 guideline PDF
assets/img/             full photo library extracted from the PDF (swap-in ready)
build/extract.py        the extraction script (re-run if the PDF changes)
build/content.json      per-page Arabic text + image placements
```

## Editing
- **Add/adjust a stat or chapter colour:** `assets/js/data.js`.
- **Tweak the scene/illustration motion:** the `.scene*` rules in `style.css`
  (`flowL`/`flowR` traffic, `sunbob`, `kenburns`) and `buildScene`/`staticIll` in
  `assets/js/app.js`. Which illustration a section uses is set by the `scene:` /
  `staticIll:` field in `data.js`.
- **Re-extract from a new PDF:** `python build/extract.py`, then re-render spreads.

## Fonts
- **RTA** — the official brand font, recovered as complete `.otf` files from the
  **Heat-Awareness campaign package** and converted to `assets/fonts/RTA-*.woff2`.
  It covers **Latin + Arabic with full GSUB shaping**, so the entire UI — headlines,
  Arabic body text, stat numbers, the logo wordmark — is now set in the authentic RTA
  face (Regular 400, Bold 700/900). Source OTFs are kept in `assets/fonts/` too.
- **Tajawal** (Google Fonts) is retained only as a fallback for any glyph the 2-weight
  RTA family doesn't include.
- (The guideline/report PDFs only embedded subsetted, unshaped copies — the campaign
  package was the source that finally provided shaping-capable Arabic.)

## Notes
- Stat figures are taken from the report's infographic spreads. Verify against the
  final source before public launch.
- Body text is shown via the original rendered pages (perfect typesetting) rather than
  re-typed, to avoid Arabic ligature errors from PDF text extraction.
