# Configuration Reference

This document provides detailed information about all configuration files in the
TechLabs MVP project.

## Configuration Files Overview

| File                   | Purpose                  | Format | Key Features                          |
| ---------------------- | ------------------------ | ------ | ------------------------------------- |
| `.editorconfig`        | Editor consistency       | INI    | Indentation, line endings, charset    |
| `.env.example`         | Environment template     | ENV    | Variable documentation                |
| `.gitignore`           | Git ignore patterns      | Text   | Build outputs, dependencies, OS files |
| `.lintstagedrc.cjs`    | Pre-commit linting       | JS     | Staged file linting and formatting    |
| `.nvmrc`               | Node.js version          | Text   | Version pinning for consistency       |
| `.prettierignore`      | Prettier ignore patterns | Text   | Files to skip formatting              |
| `.prettierrc.json`     | Prettier configuration   | JSON   | Code formatting rules                 |
| `commitlint.config.js` | Commit message rules     | JS     | Conventional commit validation        |
| `eslint.config.mjs`    | ESLint configuration     | JS     | Comprehensive linting rules           |
| `package.json`         | Project metadata         | JSON   | Dependencies, scripts, metadata       |
| `tsconfig.json`        | TypeScript root config   | JSON   | Project references                    |
| `tsconfig.app.json`    | App TypeScript config    | JSON   | App-specific TypeScript settings      |
| `tsconfig.node.json`   | Node TypeScript config   | JSON   | Node.js-specific settings             |
| `tsconfig.test.json`   | Test TypeScript config   | JSON   | Test-specific settings                |
| `vite.config.ts`       | Vite build config        | TS     | Build optimization, dev server        |

## Detailed Configuration

### TypeScript Configuration

#### `tsconfig.json` (Project References)

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.test.json" }
  ]
}
```

**Purpose**: Root configuration that references other TypeScript configs for
different contexts.

#### `tsconfig.app.json` (Application Code)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"]
      // ... other path mappings
    }
  },
  "include": ["src"]
}
```

**Key Features**:

- **Strict Type Checking**: Enabled for maximum type safety
- **Modern JavaScript**: Targets ES2022 with full DOM support
- **Path Mapping**: Absolute imports using `@/` prefix
- **React JSX**: Optimized for React 18+ with automatic JSX runtime

#### `tsconfig.test.json` (Test Files)

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {},
  "include": [
    "src/**/__tests__/**/*",
    "src/**/*.test.*",
    "src/**/*.spec.*",
    "src/test/**/*"
  ]
}
```

**Key Features**:

- **Extends App Config**: Inherits all app settings
- **Test File Patterns**: Includes common test file patterns

### Build Configuration

#### `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // ... other aliases
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        // ... optimization settings
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material'],
    // ... other optimizations
  },
})
```

**Key Features**:

- **React Integration**: Optimized React plugin with Emotion support
- **Bundle Analysis**: Visualizer plugin for bundle size analysis
- **Path Aliases**: Consistent with TypeScript path mapping
- **Build Optimization**: Modern ES2020 target with chunk optimization
- **Dependency Optimization**: Pre-bundled common dependencies

### Code Quality Configuration

#### `eslint.config.mjs`

```javascript
export default [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: react,
      'react-hooks': reactHooks,
      // ... other plugins
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // React rules
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
        },
      ],

      // Import rules
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          alphabetize: { order: 'asc' },
        },
      ],

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      // ... many more a11y rules

      // Security and performance rules
      'sonarjs/cognitive-complexity': ['error', 15],
      'unicorn/prefer-array-find': 'error',
      // ... other quality rules
    },
  },
]
```

**Key Features**:

- **Comprehensive Rule Set**: TypeScript, React, accessibility, security
- **No Classes Enforcement**: Prevents class usage in favor of functions
- **Strict Type Safety**: No `any` types allowed
- **Import Organization**: Automatic import sorting and grouping
- **Accessibility**: Full WCAG 2.1 AA compliance rules
- **Performance**: Rules to encourage performant patterns

#### `.prettierrc.json`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid",
  "overrides": [
    {
      "files": "*.json",
      "options": { "printWidth": 80 }
    },
    {
      "files": "*.md",
      "options": { "proseWrap": "always" }
    }
  ]
}
```

**Key Features**:

- **Consistent Style**: Standardized formatting across the project
- **Modern JavaScript**: No semicolons, single quotes, ES5 trailing commas
- **File-Specific Rules**: Different formatting for JSON and Markdown
- **Readability**: 100-character line limit for code readability

### Development Tools Configuration

#### `.lintstagedrc.cjs`

```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,yml,yaml,css,scss}': ['prettier --write'],
}
```

**Purpose**: Automatically lint and format only staged files before commit.

#### `commitlint.config.js`

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'ci',
        'build',
      ],
    ],
  },
}
```

**Purpose**: Enforces conventional commit message format for consistent git
history.

### Environment Configuration

#### `.env.example`

```bash
# Application Configuration
NODE_ENV=development
VITE_APP_NAME=TechLabs MVP
VITE_APP_VERSION=0.0.0

# Feature Flags
VITE_ENABLE_PERFORMANCE_MONITORING=false
VITE_ENABLE_DEBUG_MODE=false

# Development Settings
VITE_HMR_PORT=24678
VITE_HMR_HOST=127.0.0.1
```

**Purpose**: Documents all available environment variables with sensible
defaults.

### Editor Configuration

#### `.editorconfig`

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
max_line_length = 80
```

**Purpose**: Ensures consistent editor behavior across different IDEs and team
members.

## Configuration Best Practices

### 1. Path Aliases Consistency

All TypeScript configs and Vite config should have matching path aliases:

```typescript
// Both tsconfig.app.json and vite.config.ts should have:
"@/*": ["src/*"]
"@/components/*": ["src/components/*"]
"@/features/*": ["src/features/*"]
// ... etc
```

### 2. Environment Variable Naming

Follow the `VITE_` prefix convention for client-side variables:

```bash
# ✅ Good
VITE_API_BASE_URL=https://api.example.com
VITE_ENABLE_FEATURE_X=true

# ❌ Bad
API_BASE_URL=https://api.example.com  # Won't be available in client
REACT_APP_API_URL=https://api.example.com  # Wrong prefix for Vite
```

### 3. ESLint Rule Consistency

Keep related rules in sync across different file contexts:

```javascript
// Both test and app configs should have consistent TypeScript rules
'@typescript-eslint/no-explicit-any': 'error'
'@typescript-eslint/consistent-type-definitions': ['error', 'type']
```

### 4. Build Optimization Alignment

Ensure Vite and TypeScript targets are compatible:

```typescript
// vite.config.ts
build: { target: 'es2020' }

// tsconfig.app.json
"target": "ES2022"  // Should be same or newer than Vite target
```

## Troubleshooting Configuration Issues

### Path Alias Not Working

1. **Check TypeScript config**: Ensure path is in `tsconfig.app.json`
2. **Check Vite config**: Ensure alias is in `vite.config.ts`
3. **Restart dev server**: Changes to config require restart

### ESLint Errors

1. **Check file patterns**: Ensure files match the `files` array in eslint
   config
2. **Check parser**: Ensure correct TypeScript config is referenced
3. **Clear cache**: Delete `node_modules/.cache` and restart

### Build Failures

1. **Check TypeScript errors**: Run `npm run typecheck`
2. **Check Vite config**: Ensure all imports are resolvable
3. **Clear build cache**: Run `npm run clean` then rebuild

### Test Configuration Issues

1. **Check setup files**: Ensure test setup file exists and is properly imported
2. **Check test patterns**: Ensure test files match the include patterns

## Migration Notes

### Updating Configuration

When updating configuration files:

1. **Update all related configs**: Path aliases, TypeScript targets, etc.
2. **Test thoroughly**: Run all scripts to ensure nothing breaks
3. **Update documentation**: Keep this reference up to date
4. **Clear caches**: Always clear caches after config changes

### Version Compatibility

Current configuration is optimized for:

- **Node.js**: 20.18.0+
- **TypeScript**: 5.8+
- **Vite**: 7.1+
- **React**: 18.3+
- **ESLint**: 9.33+

When upgrading dependencies, ensure configuration compatibility.
