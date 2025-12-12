# Project Progress - TechLabs MVP

## Status
- Frontend app builds and checks run locally.

## Accessibility Improvements (Dec 2025)
- **Fixed landmark structure**: Removed nested `<main>` tags in routed pages so there’s only one main landmark (`App.tsx` -> `#main-content`).
- **Reduced motion support**: Skip link and About FAQ hash scrolling now respect `prefers-reduced-motion`.
- **ARIA fixes**:
  - Removed incorrect `aria-hidden`/role overrides on the Stories filter `Select`.
  - Added `aria-controls` wiring and description linkage for the mobile navigation drawer.
  - Added missing `aria-label`s for admin editor toolbar icon buttons.
  - Added accessible name for admin table search input.
- **Carousel**: Added screen-reader keyboard instructions and scoped arrow-key handling to the carousel region.
- **Modal focus**: Video modal focuses the close button on open.

## Quality Gates
- `npm install` completed.
- `npm run precommit` passes (typecheck + jest).
