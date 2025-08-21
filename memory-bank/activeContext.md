# Active Context - TechLabs Website

## Current Focus: MVP-03 Header & Navigation

**Status**: Ready to implement  
**Epic**: EPIC-MVP-SHELL (App Shell)
**Dependencies**: MVP-02 ✅ (completed)

## Immediate Task Details

### MVP-03 Acceptance Criteria
- ✅ Header visible and sticky; logo → "/"; client-side routing for nav items
- ✅ <960px burger opens Drawer with same links; ESC closes; focus trap  
- ✅ CTAs: **Start Learning** → `#tracks` on home or `/tracks`; **Join our team** → `/careers` (placeholder)
- ✅ Add elevation after 8px scroll; use middle dots `·` in copy; "About Us" capitalization

### Technical Implementation
- Components: MUI `AppBar`, `Menu`, `Drawer`, `IconButton`, `ListItemButton`
- Router: React Router 7 `<Link>`
- A11y: keyboard nav, aria, drawer focus trap

### Tasks Breakdown
1. Implement `HeaderNav.tsx` desktop & mobile
2. Create `NavLink` with active state
3. A11y tests (keyboard nav, aria, drawer focus trap)

## Recent Changes

- ✅ **MVP-02 COMPLETED**: Theme & Design Tokens
  - Created comprehensive MUI theme with design tokens
  - Implemented Section and SectionHeading components
  - Added ThemeProvider and CssBaseline integration
  - Documented theme system with usage examples
  - Verified WCAG AA color contrast compliance

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
