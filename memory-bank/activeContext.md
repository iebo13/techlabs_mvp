# Active Context - TechLabs Website

## Current Focus: MVP-09 Why TechLabs

**Status**: Ready to implement  
**Epic**: EPIC-MVP-HOMEPAGE (Homepage)
**Dependencies**: MVP-08 ✅ (completed)

## Immediate Task Details

### MVP-09 Acceptance Criteria (BDD)
- ⏸️ Cards: "Totally free", "Networking", "Job Ready"; CTA below
- ⏸️ Copy from `home.json` features array

### Technical Implementation
- `WhyTechlabs.tsx`; `ValuePropCard` component
- 3 value cards with icons and CTA to `/tracks`

### Tasks Breakdown
1. Build section and cards
2. Tests: card titles render

## Recent Changes

- ✅ **MVP-05 COMPLETED**: Hero (see details in progress.md)
- ✅ **MVP-06 COMPLETED**: Track Chooser + Deadline + Persistence (see details in progress.md)
- ✅ **MVP-07 COMPLETED**: Trust Strip (Award + Logos) (see details in progress.md)
- ✅ **MVP-08 COMPLETED**: Video Banner (Modal + Captions)
  - HeroVideo component with poster image, play button overlay, and 00:45 duration badge
  - VideoEmbed modal component with HTML5 video, ESC/overlay close, and keyboard focus trap
  - Captions track (.vtt) for accessibility with English subtitles
  - Respects prefers-reduced-motion preference, no autoplay behavior
  - Comprehensive test suites for both components (21+ tests total)
  - Proper ARIA labels and keyboard navigation support
  - Responsive design with mobile/desktop optimizations

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
