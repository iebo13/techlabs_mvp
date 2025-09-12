# TechLabs MVP

A modern React application built with TypeScript, Vite, and MUI, featuring
comprehensive development tooling and performance optimization.

## Quick Start

### Prerequisites

- **Node.js** 20.18.0+ (check `.nvmrc`)
- **npm** 10+ (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd techlabs_mvp

# Use correct Node.js version (if using nvm)
nvm use

# Run automated setup
npm run setup
```

The setup script will:

- ✅ Validate Node.js version
- ✅ Create environment file from template
- ✅ Install dependencies
- ✅ Setup Git hooks
- ✅ Validate project structure
- ✅ Run quality checks
- ✅ Test production build

### Manual Setup (Alternative)

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Setup Git hooks
npm run prepare

# Validate setup
npm run validate
```

## Development

```bash
# Start development server
npm run dev

# Run tests
npm run test

# Run all quality checks
npm run check
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Tech Stack

### Core

- **React** 18.3+ with TypeScript
- **Vite** 7.1+ for fast development and optimized builds
- **MUI** 7.3+ for UI components and theming

### Development Tools

- **ESLint** with comprehensive rules (TypeScript, React, A11y, Security)
- **Prettier** for consistent code formatting
- **jest** for testing
- **Husky** for Git hooks and quality gates

### Performance

- **Bundle Analysis** with rollup-plugin-visualizer
- **Lighthouse** integration for performance auditing
- **Web Vitals** monitoring

## Project Structure

```
src/
├── components/           # Shared UI components
│   ├── Buttons/         # Button components
│   ├── Forms/           # Form components
│   ├── Layouts/         # Layout components
│   └── Popups/          # Modal and popup components
├── features/            # Feature-based modules
│   ├── about/           # About page feature
│   ├── events/          # Events feature
│   ├── home/            # Home page feature
│   ├── partners/        # Partners feature
│   ├── stories/         # Stories feature
│   └── tracks/          # Learning tracks feature
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── theme/               # MUI theme configuration
├── config/              # App configuration
├── contexts/            # React contexts
├── styles/              # Global styles
├── assets/              # Static assets
├── mocks/               # Mock data for development
└── test/                # Test utilities and setup
```

## Available Scripts

### Development

```bash
npm run dev              # Start development server
npm run dev:host         # Start dev server accessible to network
npm run dev:debug        # Start with debug mode enabled
```

### Building

```bash
npm run build            # Production build
npm run build:analyze    # Build with bundle analysis
npm run preview          # Preview production build
```

### Testing

```bash
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Run tests with coverage
```

### Code Quality

```bash
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors automatically
npm run format           # Check code formatting
npm run format:fix       # Fix formatting automatically
npm run typecheck        # Check TypeScript types
```

### Quality Gates

```bash
npm run check            # Run all quality checks
npm run check:fix        # Fix all auto-fixable issues
npm run check:all        # Run all checks including coverage
```

### Performance

```bash
npm run lighthouse       # Run Lighthouse audit
npm run performance      # Full performance audit
npm run analyze          # View bundle analyzer
```

### Setup & Maintenance

```bash
npm run setup            # Automated project setup
npm run validate         # Validate project configuration
npm run clean            # Clean build artifacts
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Application
VITE_APP_NAME=TechLabs MVP
VITE_APP_VERSION=1.0.0

# Features
VITE_ENABLE_PERFORMANCE_MONITORING=false
VITE_ENABLE_DEBUG_MODE=false

# Development
VITE_HMR_PORT=24678
VITE_HMR_HOST=127.0.0.1
```

### Path Aliases

The project uses absolute imports with `@/` prefix:

```typescript
import { Button } from '@/components/Buttons/CtaButton'
import { useTrackSelection } from '@/hooks/useTrackSelection'
import { formatDate } from '@/utils/date'
```

## Code Standards

### TypeScript

- **Strict mode enabled** - No `any` types allowed
- **Consistent type definitions** - Use `type` instead of `interface`
- **Modern target** - ES2022 with full DOM support

### React

- **Function components only** - No classes allowed
- **Arrow function syntax** - For named components
- **Memoization** - Use React.memo judiciously for performance
- **Hooks** - Custom hooks for business logic

### Code Quality

- **File size limit** - 220 lines per file maximum
- **Import organization** - Automatic sorting and grouping
- **Accessibility** - WCAG 2.1 AA compliance required
- **Security** - Security rules for safe coding practices

## Performance Targets

- **Lighthouse Performance Score**: ≥ 90
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Run quality checks**: `npm run check:all`
5. **Commit changes**: Use conventional commit format
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Commit Format

```
type(scope): description

feat(auth): add user authentication
fix(ui): resolve button styling issue
docs(setup): update installation guide
```

## Troubleshooting

### Common Issues

**Dependencies not installing:**

```bash
# Clear cache and reinstall
npm run clean
npm install
```

**TypeScript errors:**

```bash
# Check all type errors
npm run typecheck
```

**Build failures:**

```bash
# Clean and rebuild
npm run build:clean
```

**Test failures:**

```bash
# Run tests with verbose output
npm run test:run -- --reporter=verbose
```

### Getting Help

1. **Check the documentation** in `docs/`
2. **Run setup validation**: `npm run validate`
3. **Check existing issues** on GitHub
4. **Create a new issue** with reproduction steps

## Documentation

- **[Setup Guide](docs/setup-guide.md)** - Detailed setup instructions
- **[Configuration Reference](docs/configuration-reference.md)** - All
  configuration options
- **[Performance Optimization](docs/performance-optimization.md)** - Performance
  best practices

## License

This project is private and proprietary.

---

**Built with ❤️ by iebo**
