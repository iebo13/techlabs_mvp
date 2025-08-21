# Active Context - TechLabs Website

## Current Focus: MVP-05 Hero

**Status**: Ready to implement  
**Epic**: EPIC-MVP-HOMEPAGE (Homepage)
**Dependencies**: MVP-03 ✅ (completed)

## Immediate Task Details

### MVP-05 Acceptance Criteria
- ✅ H1 "Learn **Tech** Skills for Free" with emphasis span "Tech"
- ✅ Subhead: "Blended learning · Local Community · Practical Projects"

### Technical Implementation
- `Hero.tsx`; use theme typography clamps (`clamp(34px, 7vw, 88px)`)
- Ensure there is a single page H1

### Tasks Breakdown
1. Build `Hero.tsx` layout & copy
2. Snapshot test for copy & structure

## Recent Changes

- ✅ **MVP-05 COMPLETED**: Hero
  - Created Hero component with responsive typography and proper semantic structure
  - Implemented H1 "Learn **Tech** Skills for Free" with emphasized "Tech" span
  - Added subhead "Blended learning · Local Community · Practical Projects" with middle dot separators
  - Used clamp() typography for responsive scaling across devices
  - Organized HomePage as separate page component for better structure
  - Added comprehensive Jest + RTL tests with snapshot testing
  - Ensured single H1 per page for SEO and accessibility

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
