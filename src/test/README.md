# Testing Setup Documentation

This document outlines the comprehensive testing setup for the TechLabs MVP
project using **Jest + React Testing Library (RTL)** according to the specified
testing standards.

## Overview

Our testing stack follows the **Testing Trophy** approach with strong
integration tests and a healthy base of unit tests, targeting **70-80% code
coverage** while prioritizing meaningful test paths.

### Core Technologies

- **Jest**: Testing framework with TypeScript support
- **React Testing Library (RTL)**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Custom DOM matchers
- **Mock Service Worker (MSW)**: HTTP request mocking
- **Supertest**: Express server testing
- **ts-jest**: TypeScript transformer for Jest

## Project Structure

```
src/test/
├── README.md                 # This documentation
├── jest.setup.ts            # Global test setup
├── setup.test.ts            # Basic environment test
├── mocks/
│   ├── server.ts            # MSW server configuration
│   └── handlers.ts          # HTTP request handlers
└── utils/
    └── testUtils.tsx        # Test utilities and factories
```

## Configuration Files

- `jest.config.cjs`: Main Jest configuration
- `tsconfig.test.json`: TypeScript configuration for tests
- `src/test/jest.setup.ts`: Global setup and mocks

## Key Features

### 1. Environment Setup

- **jsdom**: Browser-like environment for component tests
- **Global Mocks**: IntersectionObserver, ResizeObserver, matchMedia
- **Console Management**: Filtered warnings for cleaner test output
- **Storage Mocks**: localStorage and sessionStorage utilities

### 2. HTTP Mocking (MSW)

- **Request Interception**: Network-level mocking
- **Default Handlers**: Common API endpoints pre-configured
- **Error Scenarios**: Built-in error and slow response handlers
- **Test Isolation**: Automatic handler reset between tests

### 3. React Component Testing

- **Provider Wrappers**: ThemeProvider, Router, QueryClient
- **Custom Render**: Pre-configured with all necessary providers
- **User Interactions**: userEvent setup for realistic user testing
- **Accessibility Focus**: Role-based queries prioritized

### 4. Data Factories

- **Test Data**: Factories for Users, Stories, Events
- **API Responses**: Mock response builders
- **Pagination**: Pre-configured paginated response factory

## Available NPM Scripts

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests with no failures on missing tests
npm run test:run

# Update snapshots
npm run test:update

# Debug tests
npm run test:debug

# Silent mode (minimal output)
npm run test:silent
```

## Writing Tests

### Basic Component Test

```tsx
import { renderWithProviders, screen } from '../test/utils/testUtils'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    renderWithProviders(<MyComponent />)

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const { user } = renderWithProviders(<MyComponent />)

    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/success/i)
  })
})
```

### Testing with MSW

```tsx
import { server } from '../test/mocks/server'
import { http, HttpResponse } from 'msw'

describe('API Integration', () => {
  it('handles API errors', async () => {
    // Override default handler for this test
    server.use(
      http.post('/api/contact', () => {
        return HttpResponse.json({ error: 'Server error' }, { status: 500 })
      })
    )

    renderWithProviders(<ContactForm />)
    // ... test implementation
  })
})
```

### Using Test Factories

```tsx
import { makeUser, makeStory } from '../test/utils/testUtils'

describe('UserProfile', () => {
  it('displays user information', () => {
    const testUser = makeUser({
      name: 'John Doe',
      email: 'john@example.com',
    })

    renderWithProviders(<UserProfile user={testUser} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })
})
```

## Best Practices

### ✅ DO

- Use **role-based queries** (`getByRole`, `getByLabelText`)
- Test **user-visible behavior**, not implementation details
- Use **userEvent** for interactions, not fireEvent
- Write tests that reflect **real usage patterns**
- Mock only **external boundaries** (APIs, time, file I/O)
- Keep tests **isolated** and **deterministic**
- Use **findBy\*** queries for async UI updates

### ❌ DON'T

- Test internal implementation details
- Use shallow rendering
- Assert on CSS classes unless user-observable
- Create cross-test dependencies
- Mock core business logic in integration tests
- Use `fireEvent` for user interactions (use `userEvent`)

## Coverage Goals

- **Statements**: 70%+
- **Branches**: 70%+
- **Functions**: 70%+
- **Lines**: 70%+

Focus on **meaningful coverage** over hitting 100% - prioritize critical
business paths and failure modes.

## Troubleshooting

### Common Issues

1. **"fetch is not defined"**: Ensured by jest-environment-jsdom setup
2. **MUI warnings**: Filtered in jest.setup.ts
3. **Async component updates**: Use `findBy*` queries or `waitFor`
4. **Router issues**: Use `MemoryRouter` in test utilities

### Debugging Tests

```bash
# Debug a specific test
npm run test:debug -- --testNamePattern="test name"

# Run tests in watch mode with verbose output
npm run test:watch -- --verbose

# Run a single test file
npm test -- MyComponent.test.tsx
```

## Integration with CI/CD

This setup is designed to work seamlessly in CI environments:

- **Deterministic**: No flaky tests due to timing issues
- **Fast**: Parallel execution where possible
- **Isolated**: Each test is independent
- **Coverage**: Generates reports for CI integration

## Future Enhancements

- **Visual regression testing** with Storybook
- **E2E testing** setup with Playwright (if needed)
- **Performance testing** utilities
- **Accessibility testing** automation with axe-core

---

For questions or improvements to this testing setup, please refer to the project
documentation or create an issue in the repository.
