# TechLabs MVP Project Brief

## Project Scope
Refactor the existing TechLabs MVP React application to follow the standardized frontend architecture defined in `.cursor/rules/frontend.mdc`.

## Current State
- **Framework**: React 19.1.1 with TypeScript
- **Styling**: MUI 7.3.1 with Emotion
- **Routing**: React Router 7.8.1
- **State Management**: React Context (basic implementation)
- **Form Handling**: React Hook Form 7.62.0 with Zod validation
- **Data Fetching**: React Query (TanStack Query) 5.85.5
- **Testing**: Jest
- **Build Tool**: Vite 7.1.2

## Current Structure Issues
1. **Flat component organization**: All components in single `src/components/` directory
2. **Missing feature-based organization**: No feature-specific folders
3. **No clear separation**: Shared vs feature-specific components mixed together
4. **Missing directories**: No `src/features/`, `src/hooks/`, `src/contexts/`, `src/config/`, `src/styles/`
5. **Large component files**: Several components exceed 200+ lines
6. **No centralized HTTP configuration**: Missing `src/config/http.ts`

## Refactoring Goals
1. **Reorganize by features**: Group related components, hooks, and logic by feature
2. **Create proper folder structure**: Implement the enforced folder structure from frontend rules
3. **Split large components**: Break down components >220 lines into smaller modules
4. **Establish shared components**: Create reusable component categories (Buttons, Layouts, Forms, Popups)
5. **Add missing infrastructure**: Create hooks, contexts, config, and styles directories
6. **Improve maintainability**: Follow DRY, KISS, and SoC principles

## Constraints
- **No breaking changes**: Maintain existing functionality during refactoring
- **Preserve tests**: Ensure all existing tests continue to pass
- **Maintain performance**: No performance regressions
- **Follow naming conventions**: Use established naming patterns
- **File size limits**: Keep files ≤220 lines
- **No classes**: Use function components and hooks only

## Success Criteria
- [ ] All components organized by feature or shared category
- [ ] No component files >220 lines
- [ ] Proper folder structure implemented
- [ ] All tests passing
- [ ] No functionality regressions
- [ ] Improved code maintainability
- [ ] Follow frontend rules compliance
