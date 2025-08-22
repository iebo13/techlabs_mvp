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
- ✅ **HERO SECTION UNIFICATION COMPLETED**: Combined Hero, TrackChooser, and TrustStrip into single HeroSection component
  - Created unified HeroSection.tsx component combining all three sections
  - Maintained all existing functionality: track selection persistence, navigation, accessibility
  - Updated HomePage.tsx to use new HeroSection component
  - Improved visual hierarchy and spacing in unified layout
  - All tests pass and build successful
- ✅ **MVP-08 COMPLETED**: Video Banner (Modal + Captions)
  - HeroVideo component with poster image, play button overlay, and 00:45 duration badge
  - VideoEmbed modal component with HTML5 video, ESC/overlay close, and keyboard focus trap
  - Captions track (.vtt) for accessibility with English subtitles
  - Respects prefers-reduced-motion preference, no autoplay behavior
  - Comprehensive test suites for both components (21+ tests total)
  - Proper ARIA labels and keyboard navigation support
  - Responsive design with mobile/desktop optimizations

- ✅ **FIGMA DESIGN ALIGNMENT COMPLETED**: Major design improvements to match Figma
  - Updated brand pink color to #FF2D63 across theme and components
  - Enhanced TrackChooser section with proper typography (40-48px, extra-bold, tight line-height)
  - Added pink sub-headline "& Become a digital shaper of tomorrow"
  - Improved card container styling: reduced shadow, grey border, larger radius (32-40px), proper max-width (640-720px)
  - Enhanced checkbox styling: 18px square, 2px pink border, 4px corner radius, improved spacing
  - Updated start button: "Start learning" text, 56px height, pill radius, no elevation
  - Improved deadline note with hourglass icon and proper styling
  - Fixed navigation casing: "About Us" → "About us"
  - Added pink focus states for accessibility
  - Increased vertical spacing between hero and track chooser sections
  - Enhanced typography weights and contrast throughout

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
