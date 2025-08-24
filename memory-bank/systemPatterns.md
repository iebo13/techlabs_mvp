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

## Performance Optimization Patterns 🚀

### Current Performance Status
- **Lighthouse Score**: 0.45/1.0 (Poor)
- **Critical Issues**: Slow loading, missing images, poor Core Web Vitals
- **Target**: 0.9+ performance score

### Performance Optimization Patterns

#### 1. React Component Optimization
```typescript
// Memoized Components
export const Component = memo(({ props }) => {
  // Component logic
})

// Memoized Values
const expensiveValue = useMemo(() => {
  return heavyCalculation(props)
}, [props])

// Memoized Handlers
const handleClick = useCallback((event) => {
  // Handler logic
}, [dependencies])
```

#### 2. Bundle Optimization
```typescript
// Dynamic Imports
const LazyComponent = lazy(() => import('./LazyComponent'))

// Code Splitting
const routes = [
  {
    path: '/about',
    component: lazy(() => import('./pages/AboutPage'))
  }
]
```

#### 3. Image Optimization
```typescript
// Lazy Loading with Intersection Observer
const OptimizedImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting)
    )
    // Observer logic
  }, [])
  
  return (
    <img
      src={isInView ? src : placeholder}
      alt={alt}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      {...props}
    />
  )
}
```

#### 4. Performance Monitoring
```typescript
// Performance Hook
const usePerformance = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const duration = performance.now() - startTime
      // Log performance metrics
    }
  }, [componentName])
}
```

### Performance Issues & Solutions

#### Critical Issues Identified
1. **Missing Images (404s)**: Partner logos and hero images not found
2. **Slow Initial Load**: FCP: 4.4s, LCP: 5.5s (targets: <1.8s, <2.5s)
3. **Layout Instability**: CLS: 0.42 (target: <0.1)
4. **Resource Loading**: Inefficient asset loading and caching

#### Implementation Patterns

##### Phase 1: Image Optimization
```typescript
// Responsive Images with Modern Formats
<picture>
  <source srcSet={`${src}.webp`} type="image/webp" />
  <source srcSet={`${src}.avif`} type="image/avif" />
  <img src={`${src}.jpg`} alt={alt} loading="lazy" />
</picture>

// Image Preloading for Critical Images
<link rel="preload" as="image" href="/img/hero-bg.webp" />
```

##### Phase 2: Core Web Vitals
```typescript
// Critical CSS Inlining
const criticalCSS = `
  .hero-section { /* Critical styles */ }
  .above-fold { /* Above-the-fold styles */ }
`

// Resource Hints
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://cdn.example.com" />
<link rel="preload" as="style" href="/styles/critical.css" />
```

##### Phase 3: Advanced Performance
```typescript
// Progressive Hydration
const ProgressiveComponent = () => {
  const [isHydrated, setIsHydrated] = useState(false)
  
  useEffect(() => {
    // Defer hydration for non-critical components
    const timer = setTimeout(() => setIsHydrated(true), 1000)
    return () => clearTimeout(timer)
  }, [])
  
  return isHydrated ? <FullComponent /> : <SkeletonComponent />
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
```

### Performance Monitoring Patterns

#### Real User Monitoring (RUM)
```typescript
// Core Web Vitals Tracking
const trackCoreWebVitals = () => {
  // LCP tracking
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    const lastEntry = entries[entries.length - 1]
    // Send to analytics
  }).observe({ entryTypes: ['largest-contentful-paint'] })
  
  // FID tracking
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    entries.forEach((entry) => {
      // Send to analytics
    })
  }).observe({ entryTypes: ['first-input'] })
  
  // CLS tracking
  let clsValue = 0
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
        // Send to analytics
      }
    }
  }).observe({ entryTypes: ['layout-shift'] })
}
```

#### Performance Budgets
```typescript
// Bundle Size Budget
const bundleBudget = {
  main: '200KB',
  vendor: '150KB',
  css: '50KB'
}

// Performance Budget
const performanceBudget = {
  fcp: '1.8s',
  lcp: '2.5s',
  cls: '0.1',
  tbt: '200ms'
}
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

### Performance Issues 🚨
1. **Missing Images**: 404 errors for critical assets
2. **Slow Core Web Vitals**: FCP, LCP, and CLS above targets
3. **Bundle Size**: Initial bundle too large for fast loading
4. **Resource Loading**: Inefficient asset loading strategies
5. **Layout Instability**: Poor CLS score affecting UX

## Target Architecture

### Proposed Structure
```
src/
├── components/          # Shared components
│   ├── Buttons/
│   ├── Layouts/
│   ├── Forms/
│   └── Popups/
```

### Performance-First Architecture
```
src/
├── components/          # Shared components
├── features/           # Feature-based organization
├── performance/        # Performance optimization
│   ├── hooks/         # Performance hooks
│   ├── components/    # Performance components
│   ├── monitoring/    # Performance monitoring
│   └── optimization/  # Optimization utilities
├── assets/            # Optimized assets
│   ├── images/        # WebP/AVIF with fallbacks
│   ├── critical/      # Critical CSS and assets
│   └── lazy/          # Lazy-loaded assets
└── service-worker/    # Offline and caching
```

## Performance Optimization Roadmap

### Immediate Actions (Week 1)
1. **Fix Missing Images**: Resolve all 404 errors
2. **Image Optimization**: Implement WebP/AVIF with fallbacks
3. **Enhanced Lazy Loading**: Improve current implementation
4. **Performance Testing**: Validate improvements with Lighthouse

### Short-term Goals (Week 2)
1. **Bundle Optimization**: Reduce initial bundle size
2. **Critical CSS Inlining**: Inline above-the-fold styles
3. **Resource Hints**: Implement preload, prefetch, preconnect
4. **Service Worker**: Add caching and offline support

### Long-term Vision (Week 3+)
1. **Progressive Hydration**: Better Time to Interactive
2. **Virtual Scrolling**: For large lists and data tables
3. **Real User Monitoring**: Track actual performance metrics
4. **Performance Budgets**: Set and monitor performance targets
