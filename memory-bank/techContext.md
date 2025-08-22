# Technical Context - TechLabs Website

## Core Stack

**Frontend Framework**: React 18.x with TypeScript (strict mode)
**Build Tool**: Vite
**UI Library**: MUI v7 (Material-UI design system)
**Routing**: React Router 7.x
**Styling**: MUI theme system with design tokens

## Key Libraries

- **Forms**: React Hook Form 7.x + Zod validation
- **State**: React Context Provider (no Redux for MVP)
- **Data Fetching**: React Query 5.x (installed, reserved for V2)
- **Testing**: vitest + React Testing Library
- **Icons**: MUI Icons

## Development Tools

- **Linting**: ESLint (Airbnb + TypeScript + React + Hooks + Unicorn)
- **Formatting**: Prettier
- **Version Control**: Git with Conventional Commits
- **Package Manager**: npm

## Build & Quality

- **Bundler**: Vite with TypeScript path mapping
- **Testing Strategy**: Unit tests for critical flows, snapshot tests for components
- **Performance**: Code splitting, lazy loading, tree shaking
- **CI/CD**: Optional GitHub Actions for lint + test + build

## File Structure Standards

```
src/
├── app/           # App setup, providers, routing config
├── pages/         # Page-level components
├── components/    # Reusable UI components
├── theme/         # MUI theme and design tokens
├── mocks/         # JSON data with Zod schemas
├── types/         # TypeScript type definitions
└── utils/         # Helper functions, date utils, etc.
```

## Configuration Files

- `.nvmrc` - Node version pinning
- `.editorconfig` - Editor consistency
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript strict mode
- `.eslintrc.js` - Linting rules
- `.prettierrc` - Code formatting

## Data Validation

- **Zod schemas** for all mock data validation
- **TypeScript strict mode** with no `any` types
- **Runtime validation** at data boundaries

## Performance Targets

- **Lighthouse**: Performance ≥ 85, A11y ≥ 95, Best Practices ≥ 90
- **Core Web Vitals**: LCP < 2.5s on 4G
- **Bundle size**: Code splitting for optimal chunks

## Browser Support

- Modern browsers (ES2020+)
- Mobile-first responsive design
- Progressive enhancement for older browsers
