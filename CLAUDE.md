# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Essential Commands

### Development

```bash
npm run dev                # Start development
npm run build             # Build for production
npm run preview           # Preview production build
```

### Testing

```bash
npm run test              # Run all tests with vitest
npm run test:ui           # Run tests with UI
npm run test:run          # Run tests once (CI mode)
npm run test:coverage     # Generate test coverage report
```

### Code Quality

```bash
npm run lint              # ESLint checking
npm run lint:fix          # Auto-fix ESLint issues
npm run typecheck         # TypeScript type checking
npm run typecheck:watch   # Watch mode for TypeScript
npm run format            # Check Prettier formatting
npm run format:fix        # Auto-fix Prettier formatting
npm run check             # Run lint + typecheck + test + format
npm run check:fix         # Run lint:fix + format:fix
npm run check:all         # Run all checks + coverage
npm run precommit         # Pre-commit hook: lint:staged + typecheck + test
```

### Utilities

```bash
npm run clean             # Clean dist, cache, coverage
npm run build:analyze     # Build with bundle analysis
npm run analyze           # View bundle analyzer (requires build first)
npm run lighthouse        # Run Lighthouse audit (requires preview server)
npm run performance       # Full performance test (build + preview + lighthouse)
npm run unimported        # Find unused imports
npm run convert-imports   # Convert imports script
npm run prepare           # Setup Husky hooks
```

## Architecture Overview

### Project Type

**Frontend-only TechLabs website MVP** - No backend integration, uses local JSON
mocks with Zod validation.

### Tech Stack

- **Core**: React 19 + TypeScript + Vite
- **UI Library**: MUI v7 + Emotion
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: TanStack React Query v5
- **Testing**: Vitest + React Testing Library
- **Styling**: MUI theme system + CSS-in-JS
- **Performance**: Built-in performance monitoring
- **Accessibility**: Built-in accessibility testing tools
- **Deployment**: Firebase hosting

### Key Features

- **Performance Monitoring**: Custom performance utilities with Web Vitals
  tracking
- **Accessibility**: Built-in accessibility tester component and WCAG compliance
- **Lazy Loading**: Route-based code splitting with manual chunk optimization
- **Form Handling**: Track selection with session storage persistence
- **Bundle Analysis**: Built-in bundle size analysis and optimization

## Development Patterns

### Development Patterns

- **Functional components only** with React.FC for typed props
- **Lazy loading** for all main pages with Suspense boundaries
- **Custom hooks** for reusable logic (useCarouselNavigation, useTrackSelection)
- **Memoization** used selectively for performance optimization
- **Error boundaries** with accessibility-focused error handling
- **Path aliases** configured (`@/components`, `@/features`, etc.)
- **Local mocks** in `/src/mocks/` with Zod validation schemas
- **Session storage** for track selection persistence

## File Structure

```
src/
├── components/              # Shared UI components
│   ├── Buttons/            # Button components (CtaButton, SquareCheckbox)
│   ├── Forms/              # Form components (FaqAccordion, VideoEmbed)
│   ├── Layouts/            # Layout components (HeaderNav, Footer, SEO)
│   └── Popups/             # Modal/popup components
├── features/               # Feature-based organization
│   ├── home/               # Homepage (Hero, NumbersBand, TrustStrip)
│   ├── tracks/             # Track selection (TrackChooser, TrackCard)
│   ├── events/             # Events listing and display
│   ├── stories/            # Success stories with carousel
│   ├── partners/           # Partner logos and information
│   └── about/              # About page (Team, Mission, Timeline)
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions (performance, date, persistence)
├── mocks/                  # JSON data files with schemas
├── theme/                  # MUI theme configuration
├── config/                 # App configuration (Firebase, HTTP)
└── types/                  # TypeScript type definitions
```

### Feature Structure

Each feature follows consistent organization:

```
features/<feature>/
├── page/                   # Main page component
├── components/             # Feature-specific components
├── api/                    # API calls (currently unused - mock data)
├── hooks/                  # Feature-specific hooks
├── contexts/               # Feature-specific contexts
├── types/                  # Feature-specific TypeScript types
├── utils/                  # Feature-specific utilities
└── index.ts               # Feature exports
```

## Development Best Practices

### React & TypeScript Patterns

1. **Component Definition**:

```typescript
type ButtonProps = {
  readonly variant: 'primary' | 'secondary'
  readonly onClick: () => void
  readonly disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  disabled = false,
}) => {
  // Implementation
}
```

2. **Custom Hooks**:

```typescript
export const useUserAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Hook logic
  return { user, loading, login, logout }
}
```

3. **Context Providers**:

```typescript
type AuthContextType = {
  readonly user: User | null
  readonly login: (credentials: LoginCredentials) => Promise<void>
  readonly logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
```

### Data Management Patterns

1. **Mock Data with Validation**:

```typescript
// mocks/tracks.json + schemas.ts
const trackSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.string(),
})

export const validateTracks = (data: unknown) => trackSchema.array().parse(data)
```

2. **Session Storage Persistence**:

```typescript
// utils/persistence.ts
export const persistTrackSelection = (trackId: string) => {
  sessionStorage.setItem('selectedTrack', trackId)
}

export const getPersistedTrackSelection = (): string | null => {
  return sessionStorage.getItem('selectedTrack')
}
```

### Validation with Zod

```js
const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['user', 'admin'])
});

const CreateUserData = z.infer<typeof createUserSchema>;
```

## Code Quality Standards

### File Size Limits

- **Maximum 220 lines per file** - split into smaller modules if exceeded
- Prefer composition over large monolithic components/functions

### Naming Conventions

- **Folders**: camelCase (`userProfile/`, `navBar/`)
- **Variables/Functions**: camelCase (`isUserLoggedIn`, `fetchUserData`)
- **Components/Files**: PascalCase (`UserProfile.tsx`, `NavBar.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useUserAuth`, `useFetchData`)
- **Types/Interfaces**: PascalCase (`UserProps`, `ApiResponse`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_ATTEMPTS`)

### TypeScript Standards

- **Strict mode enabled** - zero tolerance for `any`
- **Prefer enums** for categorical values exposed in UI/logic
- **Use `type` for props/unions**, `interface` only for extension
- **Named exports preferred** for better tree-shaking
- **Readonly props** to prevent mutations

### Security Requirements

1. **Input Validation**: All external inputs validated with zod
2. **Authentication**: JWT-based with proper token handling
3. **Authorization**: Principle of least privilege
4. **Logging**: Never log secrets, PII, or sensitive data
5. **Database**: Parameterized queries, proper indexing

### Performance Guidelines

- **Frontend**: Target LCP < 2.5s, code-split routes, tree-shake unused code
- **Backend**: Avoid N+1 queries, index slow queries, paginate by default
- **React**: Avoid premature `useCallback`/`useMemo` optimization

## Testing Strategy

### Frontend Testing

```typescript
// Component testing with vitest
describe('Button Component', () => {
  it('should render with correct variant', () => {
    render(<Button variant="primary" onClick={mockFn} />);
    expect(screen.getByRole('button')).toHaveClass('primary');
  });
});

// Hook testing
describe('useUserAuth', () => {
  it('should return user data when authenticated', async () => {
    const { result } = renderHook(() => useUserAuth());
    // Test implementation
  });
});
```

### Performance & Bundle Testing

```typescript
// Performance utilities testing
describe('Performance Utils', () => {
  it('should track Core Web Vitals', async () => {
    const metrics = await performanceMonitor.getCoreWebVitals()
    expect(metrics.lcp).toBeLessThan(2500)
  })
})

// Bundle analysis
describe('Bundle Analysis', () => {
  it('should keep main bundle under size limit', async () => {
    const stats = await getBundleStats()
    expect(stats.mainBundle.size).toBeLessThan(500000) // 500KB
  })
})
```

## Error Handling

### Frontend Error Boundaries

```typescript
export const RouteErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error) => telemetry.captureException(error)}
    >
      {children}
    </ErrorBoundary>
  );
};
```

### Performance Error Handling

```typescript
// Performance monitoring with error tracking
export const performanceErrorHandler = (error: Error) => {
  console.error('Performance tracking error:', error)

  // Track performance issues without breaking user experience
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
    })
  }
}
```

## Git Workflow

### Commit Standards

- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`,
  `test:`
- **Small PRs**: Focus on single feature/fix with tests and description
- **Pre-commit checks**: Always run `npm run precommit` before commit

### CI/CD Gates

- ✅ **Linting**: ESLint with Airbnb config passes
- ✅ **Type checking**: Zero TypeScript errors
- ✅ **Tests**: All test suites pass
- ✅ **Build**: Production build succeeds
- ✅ **Security**: No vulnerabilities in dependencies

### Workflow Steps

1. **Identify** reusable pattern or insight
2. **Validate** with user when non-obvious or high-impact
3. **Implement** following architectural patterns
4. **Test** thoroughly with proper coverage
5. **Run** `npm run check` and fix any errors
6. **Commit** with conventional commit message
7. **Create PR** with clear description and tests

## Performance & Bundle Optimization

### Bundle Optimization

- **Manual chunk splitting** by feature and vendor libraries
- **Lazy loading** for all main routes
- **Bundle analysis** tools built-in (`npm run analyze`)
- **Tree shaking** optimized for MUI and other libraries

### Runtime Performance

- **Web Vitals monitoring** with performance utilities
- **Optimized images** with lazy loading
- **Carousel performance** with keyboard navigation and auto-play controls
- **Memory leak prevention** in video components

### Accessibility Performance

- **Skip links** for keyboard navigation
- **Focus management** in modals and carousels
- **Screen reader** optimizations
- **Automated accessibility testing** component

## Firebase Integration

The project is configured for Firebase hosting:

- **Hosting**: Firebase hosting setup in `firebase.json`
- **Config**: Firebase config in `src/config/firebase.ts`
- **Build**: Optimized for Firebase deployment with proper routing

## Performance Targets

- **Lighthouse Performance**: ≥ 85
- **Lighthouse Accessibility**: ≥ 95
- **Lighthouse Best Practices**: ≥ 90
- **Core Web Vitals**: LCP < 2.5s on 4G
- **Bundle Size**: Monitor with built-in analysis tools

## Common Development Tasks

### Adding a New Feature

1. Create feature directory: `src/features/<feature>/`
2. Add page component in `page/` directory
3. Create feature-specific components in `components/`
4. Add route to `App.tsx` with lazy loading
5. Export from `index.ts` for clean imports

### Adding Form with Validation

1. Use React Hook Form with Zod resolver
2. Define schema in appropriate feature or shared location
3. Implement error handling with MUI form helpers
4. Add form validation tests

### Performance Optimization

1. Use `npm run build:analyze` to check bundle size
2. Check lazy loading implementation for large components
3. Use `npm run lighthouse` for performance auditing
4. Monitor Web Vitals with built-in performance tools
