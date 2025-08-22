# Active Context - TechLabs Website

## Current Focus: MVP-16 Stories Page

**Status**: Ready to implement  
**Epic**: EPIC-MVP-PAGES (Core Pages)
**Dependencies**: MVP-10 ✅ (completed)

## Immediate Task Details

### MVP-12 Acceptance Criteria (BDD) ✅ COMPLETED

- ✅ Highlight CTA block linking to `/support` (placeholder)
- ✅ Button text "Support Tech Education" routes correctly

### Technical Implementation ✅ COMPLETED

- ✅ `SupportCta.tsx` component with image + copy + CTA button
- ✅ Data from `support` object in `home.json`

### Tasks Breakdown ✅ COMPLETED

1. ✅ Implement section + CTA button
2. ✅ Test: link target routes correctly

---

### MVP-13 Acceptance Criteria (BDD) ✅ COMPLETED

- ✅ FAQ accordion with at least 2 items + "More questions" link to About `#faq`
- ✅ Keyboard and SR friendly; single-open behavior implemented
- ✅ First two questions match mocks

### Technical Implementation ✅ COMPLETED

- ✅ `Faqs.tsx` component with accordion functionality
- ✅ Data from `faqs` array in `home.json`
- ✅ Link to About page `#faq` anchor

### Tasks Breakdown ✅ COMPLETED

1. ✅ Implement accordion with single-open behavior
2. ✅ Add "More questions" link to About #faq
3. ✅ Test: toggle behavior, first two questions

## Recent Changes

- ✅ **MVP-15 COMPLETED**: Events Page (Upcoming/Past filters + pagination)
  - Created comprehensive events.json with 10 sample events (5 upcoming, 5 past)
  - Built EventCard component with proper accessibility, hover effects, and responsive design
  - Implemented EventsPage with Upcoming/Past/All tabs, event count display, and load more pagination
  - Added proper date formatting using date-fns library
  - Integrated with React Router navigation and existing app structure
  - Added "Want to host an event?" CTA section linking to /about#contact
  - Enhanced TracksPage to display preferred tracks when they exist
  - All tests pass, build successful, and linting clean
  - Ready for production use with responsive design and modern UI patterns

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
- ✅ **MVP-09 COMPLETED**: Why TechLabs (3 value cards + CTA)
  - Created ValuePropCard component for reusable feature cards with MUI icons
  - Implemented WhyTechlabs section component with "Totally free", "Networking", "Job Ready" cards
  - Added CTA button linking to /tracks with proper styling and accessibility
  - Fixed MUI icons import to avoid file system limits on Windows
  - Updated to MUI Grid v2 syntax (size prop instead of item/xs/md)
  - Comprehensive test coverage (9 tests total) for both components
  - All cards render correct titles, descriptions, and maintain accessible heading structure
  - Proper responsive design and keyboard navigation support

- ✅ **MVP-10 COMPLETED**: Stories Carousel (a11y controls, no autoplay)
  - Created StoriesCarousel component with full accessibility features
  - Implemented keyboard navigation (Arrow keys, Home/End) and screen reader announcements
  - Added responsive design: 1 card mobile, 2 tablet, 3 desktop with proper navigation controls
  - Built custom carousel without external dependencies for full control over accessibility
  - Added "See all stories" link routing to /stories page
  - Respects prefers-reduced-motion setting, no autoplay behavior
  - Comprehensive test suite (18 tests) covering all functionality, keyboard nav, and edge cases
  - Fixed MUI icons imports and TypeScript issues for Windows compatibility
  - Integrated into HomePage component and verified build success

- ✅ **MVP-11 COMPLETED**: Numbers Band (15 Cities, 600+ Graduates, 35 Mentors)
  - Created KpiStat component for individual metric tiles with consistent styling and accessibility
  - Implemented NumbersBand component with responsive grid layout and proper spacing
  - Added emoji icons (🏙️ Cities, 🎓 Graduates, 👥 Mentors) to avoid MUI import issues on Windows
  - Emphasized the "Graduates" metric with primary color styling
  - Used MUI Grid v2 syntax (size prop instead of item/xs/sm/md) for responsive behavior
  - Comprehensive test coverage (17 tests total) for both components
  - All metrics render correctly with proper accessibility structure
  - Integrated into HomePage component and verified build success

- ✅ **MVP-12 COMPLETED**: Support CTA (highlight CTA to /support)
  - Created SupportCta component with highlight card design and prominent CTA button
  - Implemented responsive layout with image (left) and content (right) sections
  - Added hover effects and smooth transitions for enhanced user experience
  - Used MUI Grid v2 syntax (size prop) for responsive behavior

- ✅ **MVP-14 COMPLETED**: Tracks Page (grid + inline expanders + query prefs)
  - Created comprehensive tracks.json with detailed information for 4 learning tracks
  - Implemented TrackCard component with expandable details, skills, projects, career paths
  - Built TracksPage with grid layout, track preferences display, and session storage integration
  - Added proper accessibility features: ARIA labels, keyboard navigation, screen reader support
  - Integrated with existing track chooser system for seamless user experience
  - Comprehensive test coverage: 12 tests for TrackCard, 13 tests for TracksPage
  - Fixed MUI icons mocking in test setup for ExpandMore/ExpandLess icons
  - All tests passing, build successful, and linting clean
  - Ready for production use with responsive design and modern UI patterns
  - Integrated with React Router navigation to /support route
  - Comprehensive test coverage (5 tests) covering rendering, navigation, and accessibility
  - Added to HomePage component and verified build success

- ✅ **MVP-13 COMPLETED**: FAQs (accordion + link to About #faq)
  - Created Faqs component with MUI Accordion for expandable FAQ sections
  - Implemented single-open behavior (only one panel open at a time)
  - Added "More Questions" button linking to /about#faq with proper styling
  - Used proper heading structure (H2 for section, no duplicate H3s)
  - Comprehensive test coverage (9 tests) covering rendering, accessibility, and behavior
  - Integrated into HomePage component and verified all tests pass
  - Fixed linting issues and ensured proper TypeScript typing

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
