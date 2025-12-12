# Active Context - TechLabs MVP

## Current Focus
- Improve site accessibility (WCAG 2.1 AA) across pages and shared components.

## Recent Changes
- **Landmarks**: Removed nested `<main>` elements from routed pages so the app-level `main` (`#main-content`) is the single main landmark.
- **Reduced motion**: Skip link and About “#faq” deep-link scrolling now respect `prefers-reduced-motion`.
- **ARIA cleanup**: Removed incorrect `aria-hidden`/role overrides from the Stories track filter `Select`.
- **Carousel**: Added screen-reader keyboard instructions and scoped arrow-key handling to the carousel region (no global document listener).
- **Mobile nav**: Connected `aria-controls` from the mobile menu button to the drawer via matching drawer `id`; added drawer description linkage.
- **Admin UI**: Added missing accessible names for rich-text editor toolbar icon buttons; added an accessible name for the admin table search input.
- **Modals**: Video modal focuses the close button on open using `requestAnimationFrame`.

## Notes / Decisions
- Keep `App.tsx` as the single owner of the `<main id="main-content">` landmark; route pages should not render their own `<main>`.

## Next Steps
- Spot-check remaining interactive components (forms, drawers, modals) for keyboard/focus flow and accessible names.
- Keep using the in-app `AccessibilityTester` during development and avoid shipping it in production.
