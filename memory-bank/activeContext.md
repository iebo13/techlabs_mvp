# Active Context - TechLabs Website

## Current Focus: MVP-08 Video Banner

**Status**: Ready to implement  
**Epic**: EPIC-MVP-HOMEPAGE (Homepage)
**Dependencies**: MVP-07 ✅ (completed)

## Immediate Task Details

### MVP-08 Acceptance Criteria (BDD)
- ⏸️ Poster shows play button and `00:45` badge (aria-label duration)
- ⏸️ Modal opens on play; ESC or overlay click closes; keyboard trap in modal
- ⏸️ Captions track available

### Technical Implementation
- `HeroVideo.tsx` + `VideoEmbed` component; `.vtt` captions
- Respect `prefers-reduced-motion`; no autoplay

### Tasks Breakdown
1. Implement video card & modal w/ focus trap
2. Add captions & aria labels
3. Tests: open/close via keyboard

## Recent Changes

- ✅ **MVP-05 COMPLETED**: Hero (see details in progress.md)
- ✅ **MVP-06 COMPLETED**: Track Chooser + Deadline + Persistence (see details in progress.md)
- ✅ **MVP-07 COMPLETED**: Trust Strip (Award + Logos)
  - TrustStrip component with Google.org Impact Challenge award line
  - Partner logo grid with 4+ logos from mock data, lazy-loaded images
  - Proper alt text using organization names for accessibility
  - Responsive design with Grid v2 API (xs: 6, sm: 3, md: 3 layout)
  - Grayscale hover effects and focus management for linked partners
  - Comprehensive test suite (11 tests) covering all acceptance criteria
  - Screen reader context and semantic structure

## Decisions Made

- Using MUI 7.x theme system over custom CSS
- Dark-friendly approach from start (not afterthought)
- Section wrapper pattern for consistent page layout
- Typography clamps for responsive text sizing

## Upcoming Decisions Needed

- Exact color palette refinement (primary/#ff3366 is starter)
- Typography scale specifics  
- Custom component variants vs MUI defaults
- Breakpoint customization beyond MUI defaults

## Cross-Epic Awareness

**Header Navigation (MVP-03)** will immediately need:
- Theme breakpoints for responsive behavior
- Typography tokens for nav links
- Z-index layering for sticky header

**Homepage sections (MVP-05+)** will need:
- Section wrapper component
- Heading hierarchy and styling
- Responsive typography (esp. Hero clamp sizing)

## Quality Gates

- Theme contrast verification (WCAG AA)
- Component consistency check
- Documentation completeness
- Responsive behavior validation

## Files to Focus On

**Creating:**
- `src/theme/theme.ts` - Main theme configuration
- `src/theme/README.md` - Theme documentation  
- `src/components/Section.tsx` - Layout wrapper
- `src/components/SectionHeading.tsx` - Typography component

**Updating:**
- `src/App.tsx` - Add ThemeProvider wiring
- `src/main.tsx` - Ensure CssBaseline integration
