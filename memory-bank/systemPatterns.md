# System Patterns - TechLabs Website

## Architecture Overview

**Frontend-only MVP** with client-side routing and mocked data

## Component Architecture

```
src/
├── app/           # App shell, providers, routing
├── pages/         # Page components (Homepage, Tracks, etc.)
├── components/    # Reusable UI components
├── theme/         # MUI theme and design tokens
├── mocks/         # JSON data files with Zod validation
└── types/         # TypeScript type definitions
```

## Key Component Patterns

### Page Structure

- `<header>` → `<main>` → `<footer>` landmarks
- Each page has consistent section wrapper pattern
- Single H1 per page (SEO + a11y)

### Component Hierarchy

```
App
├── HeaderNav (sticky, responsive)
├── Pages/
│   ├── Homepage/
│   │   ├── Hero
│   │   ├── TrackChooser (with persistence)
│   │   ├── TrustStrip
│   │   ├── HeroVideo (modal)
│   │   ├── WhyTechlabs
│   │   ├── StoriesCarousel
│   │   ├── NumbersBand
│   │   ├── SupportCta
│   │   └── Faqs
│   ├── TracksPage
│   ├── EventsPage
│   ├── StoriesPage
│   └── PartnersPage
└── SiteFooter
```

### Shared Primitives

- `CTAButton`, `SectionHeading`, `KPIStat`
- `ValuePropCard`, `TrackCard`, `EventCard`
- `PartnerLogo`, `FAQAccordion`, `Carousel`

## Data Flow

1. Mock JSON files → Zod validation → TypeScript types
2. `sessionStorage` for track selection persistence
3. URL params for track preferences (`/tracks?pref=ids`)

## Responsive Strategy

- Breakpoints: xs≤600, sm, md, lg, xl
- Mobile-first approach with progressive enhancement
- Sticky header with elevation after scroll
- Adaptive typography: `clamp(34px, 7vw, 88px)` for hero H1

## Accessibility Patterns

- Skip links, focus management, ARIA labels
- Keyboard navigation for all interactive elements
- Color contrast ≥ 4.5:1, reduced motion support
- Screen reader announcements for dynamic content
