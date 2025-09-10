# TechLabs MVP Setup Guide

## Project Overview

This is a React 18 + TypeScript + Vite application with comprehensive
development tooling and optimization features.

## Quick Start

### Prerequisites

- **Node.js**: Version 20.18.0+ (use `.nvmrc` file)
- **npm**: Version 10+ (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd techlabs_mvp

# Use correct Node.js version (if using nvm)
nvm use

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Workflow

```bash
# Development server with hot reload
npm run dev

# Development server exposed to network
npm run dev:host

# Run tests in watch mode
npm run test

# Run linting and type checking
npm run check

# Fix linting and formatting issues
npm run check:fix
```

## Project Structure

### Configuration Files

```
techlabs_mvp/
├── .editorconfig          # Editor consistency settings
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore patterns
├── .lintstagedrc.cjs      # Lint-staged configuration
├── .nvmrc                 # Node.js version specification
├── .prettierignore        # Prettier ignore patterns
├── .prettierrc.json       # Prettier formatting rules
├── commitlint.config.js   # Commit message linting
├── eslint.config.mjs      # ESLint configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript root configuration
├── tsconfig.app.json      # App TypeScript configuration
├── tsconfig.node.json     # Node.js TypeScript configuration
├── tsconfig.test.json     # Test TypeScript configuration
├── vite.config.ts         # Vite build configuration
```

### Source Structure

```
src/
├── components/            # Shared UI components
│   ├── Buttons/          # Button components
│   ├── Forms/            # Form components
│   ├── Layouts/          # Layout components
│   └── Popups/           # Modal and popup components
├── features/             # Feature-based modules
│   ├── about/            # About page feature
│   ├── events/           # Events feature
│   ├── home/             # Home page feature
│   ├── partners/         # Partners feature
│   ├── stories/          # Stories feature
│   └── tracks/           # Learning tracks feature
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── theme/                # MUI theme configuration
├── config/               # App configuration
├── contexts/             # React contexts
├── styles/               # Global styles
├── assets/               # Static assets
├── mocks/                # Mock data for development
└── test/                 # Test utilities and setup
```

## Environment Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Copy environment template
cp .env.example .env

# Edit with your settings
nano .env
```

### Available Environment Variables

- `NODE_ENV`: Environment mode (development/production)
- `VITE_APP_NAME`: Application name
- `VITE_APP_VERSION`: Application version
- `VITE_ENABLE_PERFORMANCE_MONITORING`: Enable performance tracking
- `VITE_ENABLE_DEBUG_MODE`: Enable debug features
- `VITE_HMR_PORT`: Hot Module Replacement port
- `VITE_HMR_HOST`: Hot Module Replacement host

## Development Tools

### Code Quality

- **ESLint**: Comprehensive linting with TypeScript, React, and accessibility
  rules
- **Prettier**: Code formatting with consistent style
- **TypeScript**: Strict type checking with modern configuration
- **Commitlint**: Conventional commit message validation

### Testing

- **Jest**

### Performance

- **Bundle Analyzer**: Analyze bundle size and composition
- **Lighthouse**: Performance auditing and optimization
- **Web Vitals**: Core Web Vitals monitoring

## Scripts Reference

### Development Scripts

```bash
npm run dev          # Start development server
npm run dev:host     # Start dev server accessible to network
npm run dev:debug    # Start with debug mode enabled
npm run dev:no-hmr   # Start without hot module replacement
```

### Build Scripts

```bash
npm run build         # Production build
npm run build:analyze # Build with bundle analysis
npm run build:clean   # Clean and rebuild
npm run preview       # Preview production build
npm run analyze       # View bundle analyzer
```

### Testing Scripts

```bash
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage report
npm run test:watch    # Run tests in watch mode
```

### Code Quality Scripts

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Fix linting errors automatically
npm run format        # Check code formatting
npm run format:fix    # Fix formatting automatically
npm run typecheck     # Check TypeScript types
npm run typecheck:watch # Watch mode type checking
```

### Performance Scripts

```bash
npm run lighthouse     # Run Lighthouse audit
npm run lighthouse:ci  # Run Lighthouse for CI
npm run performance    # Full performance audit
```

### Utility Scripts

```bash
npm run clean         # Clean build artifacts
npm run unimported    # Find unused imports
npm run check         # Run all quality checks
npm run check:fix     # Fix all auto-fixable issues
npm run check:all     # Run all checks including coverage
```

## Git Workflow

### Pre-commit Hooks

Automated quality checks run before each commit:

1. **Lint-staged**: Lint and format only staged files
2. **Type checking**: Ensure TypeScript compiles
3. **Unit tests**: Run test suite
4. **Security checks**: Basic security validation

### Commit Message Format

Use conventional commits:

```
type(scope): description

feat(auth): add user authentication
fix(ui): resolve button styling issue
docs(setup): update installation guide
test(utils): add unit tests for date helpers
```

## Troubleshooting

### Common Issues

**EMFILE errors during testing:**

- Tests are configured to run sequentially to prevent file handle issues
- If you still encounter issues, try `npm run test:run` instead of
  `npm run test`

**HMR not working:**

- Check if ports 3000 and 24678 are available
- Try `npm run dev:debug` for more verbose output

**TypeScript errors:**

- Run `npm run typecheck` to see all type errors
- Check if all dependencies are installed: `npm install`

**Build failures:**

- Clear cache: `npm run clean`
- Rebuild: `npm run build:clean`

### Performance Issues

**Slow development server:**

- Check if you have many large files in the project
- Try `npm run dev:no-hmr` to disable hot reloading

**Large bundle size:**

- Run `npm run build:analyze` to see bundle composition
- Check for unused dependencies: `npm run unimported`

## IDE Setup

### Recommended VS Code Extensions

- **TypeScript**: Built-in TypeScript support
- **ESLint**: Real-time linting
- **Prettier**: Code formatting
- **Vite**: Vite integration
- **Thunder Client**: API testing (if needed)

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Deployment

### Build for Production

```bash
# Clean build
npm run build:clean

# Verify build
npm run preview

# Run performance audit
npm run performance
```

### Environment Variables in Production

Ensure these environment variables are set:

```bash
NODE_ENV=production
VITE_APP_NAME="TechLabs MVP"
VITE_APP_VERSION="1.0.0"
VITE_ENABLE_PERFORMANCE_MONITORING=true
```

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Run quality checks**: `npm run check:all`
5. **Commit your changes**: `git commit -m "feat: add amazing feature"`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Standards

- **File size limit**: 220 lines per file
- **No classes**: Use function components and hooks
- **Strict TypeScript**: No `any` types allowed
- **Named exports**: Prefer named over default exports
- **Accessibility**: Follow WCAG 2.1 AA guidelines

## Support

For issues and questions:

1. **Check this documentation** first
2. **Review the troubleshooting section**
3. **Check existing GitHub issues**
4. **Create a new issue** with detailed reproduction steps

## Performance Targets

- **Lighthouse Performance**: Score ≥ 90
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: Optimized for fast loading
