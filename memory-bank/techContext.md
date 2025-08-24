# Tech Context - TechLabs MVP

## Current Tech Stack

### Core Framework
- **React**: 19.1.1 (latest stable)
- **TypeScript**: ~5.8.3 (strict mode enabled)
- **Vite**: 7.1.2 (build tool and dev server)

### UI & Styling
- **Material-UI (MUI)**: 7.3.1
- **Emotion**: 11.14.0 (CSS-in-JS)
- **Roboto Font**: 5.2.6 (MUI default font)

### State Management & Data
- **React Query (TanStack Query)**: 5.85.5 (data fetching)
- **React Hook Form**: 7.62.0 (form management)
- **Zod**: 4.0.17 (validation)

### Routing
- **React Router**: 7.8.1 (client-side routing)

### Testing
- **Vitest**: 3.2.4 (test runner)
- **React Testing Library**: 16.3.0 (component testing)
- **Jest DOM**: 6.8.0 (DOM testing utilities)
- **User Event**: 14.6.1 (user interaction simulation)

### Development Tools
- **ESLint**: 9.33.0 (linting)
- **Prettier**: 3.6.2 (code formatting)
- **Husky**: 9.1.7 (git hooks)
- **Commitlint**: 19.8.1 (commit message validation)

## Current Configuration

### TypeScript Config
- **Strict Mode**: Enabled
- **No Implicit Any**: Enforced
- **Module Resolution**: ES modules
- **Target**: ES2020

### ESLint Configuration
- **Airbnb Config**: Base configuration
- **TypeScript ESLint**: 8.40.0
- **React ESLint**: 7.37.5
- **React Hooks**: 5.2.0
- **JSX A11y**: 6.10.2 (accessibility)
- **Unicorn**: 60.0.0 (additional rules)

### Build Configuration
- **Vite**: Fast HMR and optimized builds
- **ES Modules**: Native ES module support
- **Tree Shaking**: Automatic dead code elimination

## Current Constraints

### Performance Requirements
- **LCP Target**: <2.5s (4G connection)
- **Bundle Size**: Optimized for fast loading
- **Code Splitting**: Route-based splitting

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Support**: Responsive design required
- **Accessibility**: WCAG 2.1 AA compliance

### Development Constraints
- **File Size Limit**: ≤220 lines per file
- **No Classes**: Function components only
- **Strict Typing**: No `any` types allowed
- **Named Exports**: Prefer named over default exports

## Missing Infrastructure

### Required Directories
- `src/features/` - Feature-based organization
- `src/hooks/` - Custom hooks
- `src/contexts/` - React contexts
- `src/config/` - App configuration
- `src/styles/` - Global styles

### Required Files
- `src/config/http.ts` - HTTP client configuration
- `src/hooks/` - Custom hooks for business logic
- `src/contexts/` - Global state management
- `src/styles/` - Global CSS and theme extensions

## Dependencies Analysis

### Core Dependencies
- **React Ecosystem**: All dependencies are latest stable
- **MUI Integration**: Properly configured with Emotion
- **Form Handling**: React Hook Form + Zod validation
- **Data Fetching**: React Query for server state

### Development Dependencies
- **Testing Stack**: Complete testing setup
- **Code Quality**: ESLint + Prettier + Husky
- **Type Safety**: TypeScript with strict configuration

## Migration Considerations

### Breaking Changes
- **React 19**: Latest version with new features
- **MUI 7**: Latest version with improved performance
- **React Router 7**: Latest version with new APIs

### Compatibility
- **All Dependencies**: Compatible with current setup
- **Build Process**: Vite handles all modern features
- **Testing**: Vitest provides fast test execution

## Performance Optimizations

### Current Optimizations
- **Vite**: Fast development and optimized builds
- **Tree Shaking**: Automatic dead code elimination
- **Code Splitting**: Route-based splitting
- **MUI**: Optimized bundle with tree shaking

### Planned Optimizations
- **Component Splitting**: Smaller, focused components
- **Custom Hooks**: Reusable logic extraction
- **Lazy Loading**: Component-level code splitting
- **Bundle Analysis**: Monitor bundle size improvements
