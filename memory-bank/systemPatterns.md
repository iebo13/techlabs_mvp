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

### Shared Primitives (MVP-19)

**Layout & Typography:**
- `Section` - Consistent page section wrapper
- `SectionHeading` - Typography hierarchy component
- `CTAButton` - Primary action buttons

**Content Cards:**
- `ValuePropCard` - Why TechLabs feature cards
- `TrackCard` - Track selection/display cards  
- `EventCard` - Event listing cards
- `KPIStat` - Number/metric display tiles

**Interactive Components:**
- `FAQAccordion` - Expandable Q&A sections
- `Carousel` - A11y-compliant content slider
- `VideoEmbed` - Modal video player with captions

**Brand Elements:**
- `PartnerLogo` - Consistent logo display

## Data Flow

**Mock Data Pipeline:**
1. JSON files in `src/mocks/` → Zod schema validation → TypeScript types
2. Files: `tracks.json`, `events.json`, `stories.json`, `partners.json`, `faq.json`, `home.json`, `content.json`

**State Management:**
- `sessionStorage` for track selection persistence (TrackChooser)
- URL params for track preferences (`/tracks?pref=comma-separated-ids`)
- React Context for theme/global state (no Redux for MVP)

**A11y State:**
- Focus management for modals and navigation
- Keyboard event handling for carousels and accordions
- Screen reader announcements for dynamic content

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
