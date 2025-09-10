# Import Aliases

This project uses import aliases to simplify imports and make them more
maintainable. Instead of using relative paths like
`../../../components/Layouts/Section`, you can use clean aliases like
`@/components/Layouts/Section`.

## Available Aliases

| Alias            | Path               | Description                           |
| ---------------- | ------------------ | ------------------------------------- |
| `@/*`            | `src/*`            | Root source directory                 |
| `@/components/*` | `src/components/*` | Reusable UI components                |
| `@/features/*`   | `src/features/*`   | Feature-specific components and logic |
| `@/hooks/*`      | `src/hooks/*`      | Custom React hooks                    |
| `@/utils/*`      | `src/utils/*`      | Utility functions                     |
| `@/types/*`      | `src/types/*`      | TypeScript type definitions           |
| `@/theme/*`      | `src/theme/*`      | Theme configuration                   |
| `@/config/*`     | `src/config/*`     | Configuration files                   |
| `@/contexts/*`   | `src/contexts/*`   | React contexts                        |
| `@/styles/*`     | `src/styles/*`     | Global styles                         |
| `@/assets/*`     | `src/assets/*`     | Static assets                         |
| `@/mocks/*`      | `src/mocks/*`      | Mock data and schemas                 |

## Usage Examples

### Before (Relative Imports)

```typescript
import { Section } from '../../../components/Layouts/Section'
import { HomePage } from '../page/HomePage'
import homeData from '../../../mocks/home.json'
import type { HomeData } from '../../../types/home'
```

### After (Alias Imports)

```typescript
import { Section } from '@/components/Layouts/Section'
import { HomePage } from '../page/HomePage'
import homeData from '@/mocks/home.json'
import type { HomeData } from '@/types/home'
```

## Configuration Files

The aliases are configured in:

1. **TypeScript**: `tsconfig.app.json` - Path mapping for type checking and
   IntelliSense
2. **Vite**: `vite.config.ts` - Build-time resolution

## Benefits

- **Cleaner imports**: No more counting `../` levels
- **Easier refactoring**: Move files without breaking imports
- **Better readability**: Clear indication of what you're importing
- **Consistent structure**: Standardized import patterns across the project

## Migration Guide

To convert existing relative imports to aliases:

1. **For components**: Replace `../../../components/` with `@/components/`
2. **For features**: Replace `../../../features/` with `@/features/`
3. **For utils**: Replace `../../../utils/` with `@/utils/`
4. **For types**: Replace `../../../types/` with `@/types/`
5. **For mocks**: Replace `../../../mocks/` with `@/mocks/`

## IDE Support

Most IDEs (VS Code, WebStorm, etc.) will automatically provide autocomplete and
navigation for these aliases. Make sure your IDE is using the correct TypeScript
configuration.

## Best Practices

1. **Use aliases for cross-feature imports**: When importing from different
   features or shared components
2. **Keep relative imports for local imports**: When importing from the same
   feature or closely related files
3. **Be consistent**: Once you start using aliases in a file, use them
   consistently throughout that file
4. **Prefer specific aliases**: Use `@/components/` instead of `@/` when
   importing components for better clarity

## Troubleshooting

If you encounter issues with aliases:

1. **Restart your IDE**: Sometimes IDEs need to be restarted to pick up new
   TypeScript configurations
2. **Check TypeScript errors**: Make sure there are no TypeScript compilation
   errors
3. **Verify configuration**: Ensure all three config files (tsconfig, vite,
   jest) have the alias configuration
4. **Clear cache**: Try clearing your IDE's cache or restarting the development
   server
