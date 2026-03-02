# dev-piyush vs main: Style Changes + Potential Breaks

This checklist focuses on changes introduced in dev-piyush that differ from main. It highlights style/UX changes and other potential breaking behavior.

## Status After Revert (2026-02-26)
- [x] Logo carousel visuals restored to main styling
- [x] Hero layout restored; mobile dots removed
- [x] Hover/cursor affordances restored for interactive elements
- [x] Bolts carousel hover-pause restored
- [x] $color-cta-hover restored in tokens
- [x] Assets check: no references to Primary.png or Secondary.png in src/
- [ ] Careers filter locale logic (verify behavior in non-EN locales)
- [ ] Sanity image URL extension assumption (verify non-JPG assets)
- [ ] Sanity helper throw risk (avoid usage or implement)
- [ ] Sanity content completeness (verify in CMS)

## Style/UX Deltas (Dev vs Main)

### 1) Logo Carousel Visuals
- Change: Logos now use grayscale + lower opacity via `.logo-img` class; blend mode moved to the image itself.
- Risk: Brand/logo visibility may be reduced compared to main; may look lighter/duller.
- Files:
  - src/app/features/home/components/logo-carousel/logo-carousel.component.html
  - src/app/features/home/components/logo-carousel/logo-carousel.component.scss
- Verify:
  - Logos look acceptable on desktop and mobile.
  - Compare before/after contrast and visibility.

### 2) Hero Layout Changes
- Change: Hero section overflow/spacing adjusted; new mobile dots background added.
- Risk: Layout shifts at smaller breakpoints; possible overlap or spacing differences vs main.
- Files:
  - src/app/shared/components/hero/hero.component.html
- Verify:
  - Check mobile spacing and any new decorative dots placement.
  - Ensure hero text spacing/line-height matches prior design intent.

### 3) Removed Hover/Cursor Effects (Product + Shared)
- Change: Cursor/hover transitions removed from multiple buttons/links (e.g., cursor-pointer, hover:opacity).
- Risk: Reduced affordance; perceived interactivity may drop vs main.
- Files (examples):
  - src/app/features/product/components/agentic-actions/agentic-actions.component.html
  - src/app/features/product/components/bolts-section/bolts-section.component.html
  - src/app/features/product/components/integrations-section/integrations-section.component.html
  - src/app/features/product/components/lia-chat/lia-chat.component.html
  - src/app/shared/components/final-cta/final-cta.component.html
  - src/app/shared/components/founder-card/founder-card.component.html
- Verify:
  - Hover feedback is still acceptable for clickable items.
  - Check that CTA/button affordances are not weakened.

### 4) Bolts Section: Hover-Pause Removed
- Change: `.carousel-track:hover { animation-play-state: paused; }` removed.
- Risk: Carousel no longer pauses on hover; could hurt usability.
- Files:
  - src/app/features/product/components/bolts-section/bolts-section.component.scss
- Verify:
  - Confirm if hover-pause is required by design.

### 5) Token Change
- Change: `$color-cta-hover` removed from tokens.
- Risk: If used elsewhere, hover colors may default or break.
- Files:
  - src/styles/tokens/_colors.scss
- Verify:
  - Search for usage of `$color-cta-hover` to ensure no missing variable.

### 6) Asset Replacement
- Change: New asset added; two assets removed.
- Risk: Any references to removed assets will break image display.
- Files:
  - src/assets/images/Group 3011.png (new)
  - src/assets/images/Primary.png (deleted)
  - src/assets/images/Secondary.png (deleted)
- Verify:
  - Ensure no template references to deleted images remain.

## Potential Functional/Behavior Breaks (Non-Style)

### A) Careers Filter Logic vs Localized Values
- Change: Role department/location can be localized, but filters compare against fixed English strings.
- Risk: Filtering may return no results in non-English locales.
- Files:
  - src/app/features/careers/components/open-roles/open-roles.component.ts
  - src/app/features/careers/components/open-roles/open-roles.component.html
- Verify:
  - Switch locale and test department/location filters.

### B) Sanity Image URL Assumptions
- Change: Manual URL creation assumes `.jpg` extension.
- Risk: If assets are PNG/WebP, images can break.
- Files:
  - src/app/features/home/components/logo-carousel/logo-carousel.component.ts
  - src/app/features/about-us/about-us.component.ts
- Verify:
  - Validate logo and team images render across assets with non-JPG formats.

### C) Sanity Helper Throws at Runtime
- Change: getImageUrl() in sanity.helpers.ts throws error if called.
- Risk: If used, it will crash the app.
- Files:
  - src/app/core/services/sanity.helpers.ts
- Verify:
  - Ensure getImageUrl() is not referenced anywhere.

### D) Increased Sanity Dependencies
- Change: Many sections now depend on Sanity content; missing fields can render empty text.
- Risk: Empty UI if Sanity documents are incomplete.
- Files (examples):
  - src/app/features/product/product.component.html
  - src/app/features/home/home.component.html
  - src/app/shared/components/footer/footer.component.html
- Verify:
  - Sanity documents for home/product/footer are fully populated.

## Quick Checks
- Run the app and compare visual diffs for:
  1) Home hero + logo carousel
  2) Product section buttons/hover states
  3) Bolts carousel hover behavior
  4) Footer link sections populated from Sanity
- Switch locales (en/de/fr/it) and test:
  - Careers filters
  - Home and product localized text
  - Contact and legal pages

