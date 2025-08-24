# System Patterns - TechLabs MVP

## Current Architecture
```
src/
├── components/          # All components (flat structure)
├── pages/              # Page components
├── theme/              # MUI theme configuration
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── mocks/              # Mock data
├── test/               # Test setup
└── assets/             # Static assets
```

## Component Analysis

### Large Components (>220 lines)
1. **Carousel.tsx** (216 lines) - Complex carousel logic
2. **TrackChooser.tsx** (243 lines) - Track selection interface
3. **SiteFooter.tsx** (209 lines) - Footer with multiple sections
4. **HeaderNav.tsx** (196 lines) - Navigation header
5. **AccessibilityTester.tsx** (256 lines) - Accessibility testing tool

### Feature-Based Components
**Home Page Features:**
- Hero, HeroVideo, HeroSection
- WhyTechlabs, ValuePropCard
- TrustStrip, TrustStripSection
- NumbersBand, KpiStat
- SupportCta

**About Page Features:**
- MissionSection, TeamSection, TimelineSection
- AboutPageSections

**Events Page Features:**
- EventCard

**Stories Page Features:**
- StoriesCarousel, StoriesCarouselComponents
- StoryCard, StoryModal

**Tracks Page Features:**
- TrackCard, TrackChooser, TrackChooserSection

**Partners Page Features:**
- PartnerLogo

**Shared Components:**
- HeaderNav, SiteFooter, Logo
- CtaButton, NavLink, MobileDrawer
- Section, SectionHeading
- Faqs, FaqAccordion
- VideoEmbed, ContactSection
- Carousel, SkipToContent, Seo

## Current Patterns

### Component Patterns
- **Function Components**: All components use function syntax
- **Props Interface**: TypeScript interfaces for component props
- **MUI Integration**: Heavy use of MUI components and theming
- **Responsive Design**: Mobile-first approach with breakpoints

### State Management
- **Local State**: useState for component-specific state
- **Context**: Basic React Context usage
- **Form State**: React Hook Form for form management

### Data Flow
- **Mock Data**: Static JSON files in mocks directory
- **Props Drilling**: Data passed down through component hierarchy
- **Event Handling**: Callback props for user interactions

## Identified Issues

### Architectural Issues
1. **Flat Structure**: No feature-based organization
2. **Large Components**: Several components exceed 220 lines
3. **Mixed Concerns**: UI, logic, and data handling in single files
4. **No Custom Hooks**: Business logic embedded in components
5. **No Centralized Config**: Missing HTTP and app configuration

### Code Quality Issues
1. **Component Coupling**: Tight dependencies between components
2. **Inconsistent Patterns**: No standardized component patterns
3. **Missing Abstraction**: Repeated logic across components
4. **No Error Boundaries**: Missing error handling patterns

## Target Architecture

### Proposed Structure
```
src/
├── components/          # Shared components
│   ├── Buttons/
│   ├── Layouts/
│   ├── Forms/
│   └── Popups/
├── features/           # Feature-based organization
│   ├── home/
│   ├── about/
│   ├── events/
│   ├── stories/
│   ├── tracks/
│   └── partners/
├── hooks/              # Custom hooks
├── contexts/           # React contexts
├── config/             # App configuration
├── styles/             # Global styles
├── utils/              # Utility functions
└── types/              # TypeScript types
```

### Refactoring Strategy
1. **Extract Custom Hooks**: Move business logic to custom hooks
2. **Split Large Components**: Break down >220 line components
3. **Create Feature Folders**: Organize by domain/feature
4. **Establish Shared Components**: Categorize reusable components
5. **Add Missing Infrastructure**: Create config, hooks, contexts directories
