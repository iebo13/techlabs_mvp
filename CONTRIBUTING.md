# Contributing to TechLabs Website

## Development Setup

1. **Node.js**: Use Node 20 (see `.nvmrc`)
2. **Install dependencies**: `npm install`
3. **Start development**: `npm run dev`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Code Standards

### TypeScript

- **Strict mode**: No `any` types allowed
- Use `type` for props/unions, `interface` for extension
- Prefer named exports over default exports

### React

- **Functional components only**: No classes
- Use React.FC for components with props
- Props should be readonly

### Styling

- **MUI v7**: Use theme system and design tokens
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG AA compliance required

### File Organization

```
src/
├── app/           # App setup, providers, routing
├── pages/         # Page-level components
├── components/    # Reusable UI components
├── theme/         # MUI theme and design tokens
├── mocks/         # JSON data with Zod validation
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

### Naming Conventions

- **Files**: camelCase (enforced by ESLint)
- **Components**: PascalCase
- **Functions/variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

### Git Workflow

- **Conventional Commits**: Use standard commit message format
- **Small PRs**: Keep changes focused and reviewable
- **Tests required**: All new features need tests

### Testing

- **Jest**:
- Focus on user behavior, not implementation

## Architecture

### Frontend-Only MVP

- No backend integration
- All data from local mocks with Zod validation
- sessionStorage for track selection persistence

### Accessibility Requirements

- WCAG AA compliance (contrast ≥ 4.5:1)
- Keyboard navigation support
- Screen reader compatibility
- Skip links and focus management

### Performance Targets

- **Lighthouse**: Performance ≥ 85, A11y ≥ 95, Best Practices ≥ 90
- **Core Web Vitals**: LCP < 2.5s on 4G
- Code splitting and lazy loading where appropriate
