# Shared Components Library

This directory contains all reusable UI components for the TechLabs website. Components are organized by functionality and follow consistent design patterns.

## Component Categories

### 🎯 **Shared UI Components** (MVP-19)

Core reusable components that can be used across multiple pages:

- **`CTAButton`** - Call-to-action button with routing support
- **`FAQAccordion`** - Expandable FAQ component with single-open behavior
- **`Carousel`** - Generic carousel for any content type

### 🏗️ **Layout Components**

Foundation components for consistent page structure:

- **`Section`** - Page section wrapper with consistent spacing
- **`SectionHeading`** - Typography component for section titles

### 📊 **Data Display Components**

Components for presenting information:

- **`KpiStat`** - Key performance indicator tile
- **`ValuePropCard`** - Feature/benefit card
- **`TrackCard`** - Learning track information card
- **`EventCard`** - Event information card
- **`PartnerLogo`** - Partner organization logo
- **`StoryCard`** - Graduate success story card

### 🎮 **Interactive Components**

User interaction components:

- **`VideoEmbed`** - Video player with modal and captions
- **`SquareCheckbox`** - Custom checkbox component

### 🧭 **Navigation Components**

Site navigation and structure:

- **`HeaderNav`** - Main navigation header
- **`NavLink`** - Navigation link with active state
- **`MobileDrawer`** - Mobile navigation drawer
- **`SiteFooter`** - Site footer with links

### 📄 **Page-Specific Components**

Components designed for specific pages:

- **`Hero`** - Hero section component
- **`HeroSection`** - Unified hero section
- **`HeroVideo`** - Hero video component
- **`TrackChooser`** - Track selection interface
- **`TrustStrip`** - Partner logos and awards
- **`StoriesCarousel`** - Stories showcase carousel
- **`NumbersBand`** - Statistics display
- **`SupportCta`** - Support call-to-action
- **`Faqs`** - FAQ section component

## Usage Examples

### CTAButton

```tsx
import { CTAButton } from '@/components'

// Internal routing
<CTAButton to="/tracks" variant="contained">
  Start Learning
</CTAButton>

// External link
<CTAButton href="https://example.com" variant="outlined">
  Visit External Site
</CTAButton>

// Regular button
<CTAButton onClick={handleClick} variant="text">
  Click Me
</CTAButton>
```

### FAQAccordion

```tsx
import { FAQAccordion } from '@/components'

const faqs = [
  { q: "What is TechLabs?", a: "TechLabs is..." },
  { q: "How much does it cost?", a: "It's completely free!" }
]

<FAQAccordion
  faqs={faqs}
  maxWidth="md"
  showBorder={true}
  singleOpen={true}
/>
```

### Carousel

```tsx
import { Carousel } from '@/components'

const items = [/* your items */]

<Carousel
  items={items}
  renderItem={(item, index) => <YourItemComponent item={item} />}
  itemsPerView={3}
  showNavigation={true}
  autoPlay={false}
/>
```

## Design Principles

### 🎨 **Consistency**

- All components use MUI theme tokens
- Consistent spacing, typography, and colors
- Unified hover states and transitions

### ♿ **Accessibility**

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### 📱 **Responsiveness**

- Mobile-first design approach
- Breakpoint-aware layouts
- Touch-friendly interactions

### 🚀 **Performance**

- Minimal re-renders
- Lazy loading where appropriate
- Optimized bundle size

## Component Guidelines

### Props Interface

- Use TypeScript interfaces for all props
- Provide sensible defaults
- Include JSDoc comments for complex props

### Styling

- Use MUI `sx` prop for component-specific styles
- Leverage theme tokens for consistency
- Avoid hardcoded values

### Testing

- Each component should have comprehensive tests
- Test accessibility features
- Test responsive behavior
- Test edge cases

### Documentation

- Clear JSDoc comments
- Usage examples
- Props documentation
- Accessibility notes

## File Organization

```
src/components/
├── __tests__/           # Component tests
├── data/               # Component data files
├── index.ts            # Export all components
├── README.md           # This documentation
├── CTAButton.tsx       # Shared UI component
├── FAQAccordion.tsx    # Shared UI component
├── Carousel.tsx        # Shared UI component
├── Section.tsx         # Layout component
├── SectionHeading.tsx  # Layout component
└── ...                 # Other components
```

## Adding New Components

1. **Create the component file** with proper TypeScript types
2. **Add comprehensive tests** in `__tests__/` directory
3. **Export from `index.ts`** for easy importing
4. **Update this README** with usage examples
5. **Follow naming conventions** and design patterns

## Testing

Run component tests:

```bash
npm test -- --run src/components/__tests__/
```

Run specific component tests:

```bash
npm test -- ComponentName.test.tsx
```

## Build Verification

Ensure all components build correctly:

```bash
npm run build
npm run lint
```

## Dependencies

- **MUI 7.x** - UI component library
- **React 18.x** - UI framework
- **TypeScript** - Type safety
- **React Router 7** - Navigation (for routing components)
- **date-fns** - Date utilities (for date-related components)
