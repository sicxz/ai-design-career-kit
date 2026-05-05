# Verification

Date: 2026-05-05

## Manual Checks

- [x] Confirm local-file readiness: `index.html` uses relative `styles.css` and `script.js` references, and both files are present.
- [x] Open the folder through a local static server.
- [x] Confirm `foundry.css` is included locally and the page uses the Foundry `.foundry`, `f-topbar`, `f-button`, `f-section-head`, `f-table`, and callout patterns.
- [x] Confirm cards and sections use black/gray emphasis instead of blue, green, amber, or red signal color.
- [x] Confirm the page does not require Canvas, login, remote assets, or API access.
- [x] Confirm all guide content is visible with JavaScript enabled.
- [x] Confirm all guide content is visible with JavaScript disabled.
- [x] Confirm copy buttons copy text or fall back to visible manual-selection guidance.
- [x] Confirm dark/light theme toggle changes the Foundry theme without saving student data.
- [x] Confirm keyboard focus is visible on navigation links, buttons, details controls, and checklist inputs.
- [x] Confirm desktop layout has no overlapping or clipped text.
- [x] Confirm tablet layout has no overlapping or clipped text.
- [x] Confirm mobile layout has no horizontal scrolling, overlapping text, or covered content.
- [x] Confirm wording avoids inflated professional claims.
- [x] Confirm independent study, resume, LinkedIn/about, portfolio, interview, and evidence sections are present.

## Notes

- Previewed at `http://127.0.0.1:8123/ai-design-career-kit/index.html`.
- Playwright blocks `file://` navigation in this environment, so direct-file browser inspection was represented by the local-file readiness check above.
- Desktop screenshot: `verification-screenshots/desktop.png`.
- Mobile screenshot: `verification-screenshots/mobile.png`.
- Reworked the page to use the portable Foundry system from `foundry.css`, with the page-specific layout in `styles.css`.
- Monochrome pass completed after review: page-level signal tokens now resolve to neutral Foundry values, and card/section emphasis uses black rules, grey surfaces, and typography.
- The comparison table intentionally scrolls inside its own wrapper on narrow screens. The page itself does not horizontally scroll.
