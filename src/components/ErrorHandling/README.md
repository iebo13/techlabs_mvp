# Unified Error Reporting System

This document explains the standardized error reporting system that eliminates
duplication and provides consistent error handling across the TechLabs MVP
application.

## Overview

The unified error reporting system replaces the previous scattered error
handling patterns with a single, comprehensive service that provides:

- **Consistent error data structure** across all error sources
- **Standardized severity levels** and error classification
- **Centralized error storage** and management
- **Reusable hooks** for React components
- **Type-safe error reporting** with TypeScript
- **Performance-optimized** error handling

## Architecture

### Core Components

1. **ErrorReportingService** - Central service for all error reporting
2. **Error Reporting Hooks** - React hooks for easy component integration
3. **ErrorBoundary** - React error boundary using unified service
4. **ErrorList & DebugPanel** - UI components for error visualization

### Error Types

```typescript
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'

export type ErrorSource =
  | 'javascript_error' // Global JavaScript errors
  | 'unhandled_rejection' // Unhandled Promise rejections
  | 'react_component' // React component errors
  | 'network_request' // API/network failures
  | 'image_load' // Image loading failures
  | 'performance' // Performance-related issues
  | 'user_action' // User interaction errors
  | 'validation' // Form validation errors
  | 'manual' // Manually reported errors

export type ErrorReport = {
  // Core error data
  id: string
  message: string
  source: ErrorSource
  severity: ErrorSeverity
  timestamp: number

  // Error details
  stack?: string
  cause?: string

  // Location data
  url: string
  route: string
  line?: number
  column?: number

  // Environment data
  userAgent: string
  buildVersion: string
  environment: string

  // Context data
  context?: ErrorContext
  additionalData?: Record<string, unknown>
}
```

## Usage Guide

### Basic Error Reporting

```typescript
import { useErrorReporting } from '@/components/ErrorHandling'

const MyComponent = () => {
  const { reportError } = useErrorReporting()

  const handleAction = async () => {
    try {
      // Some risky operation
      await riskyOperation()
    } catch (error) {
      // Report error with context
      reportError(error, {
        severity: 'medium',
        source: 'user_action',
        context: { action: 'handleAction', component: 'MyComponent' },
      })
    }
  }
}
```

### Component-Specific Error Reporting

```typescript
import { useComponentErrorReporting } from '@/components/ErrorHandling'

const MyComponent = () => {
  const { reportError, updateContext } =
    useComponentErrorReporting('MyComponent')

  useEffect(() => {
    // Update context with additional information
    updateContext({ userId: user.id, feature: 'dashboard' })
  }, [user.id])

  const handleError = (error: Error) => {
    // Automatically includes component name and context
    reportError(error, { action: 'data-load' })
  }
}
```

### Network Error Reporting

```typescript
import { useNetworkErrorReporting } from '@/components/ErrorHandling'

const ApiService = () => {
  const { withNetworkErrorReporting } = useNetworkErrorReporting()

  const fetchData = withNetworkErrorReporting(
    async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Request failed')
      return response.json()
    },
    (url: string) => url // URL extractor
  )
}
```

### Image Error Reporting

```typescript
import { useImageErrorReporting } from '@/components/ErrorHandling'

const ImageComponent = ({ src, alt }) => {
  const { createImageErrorHandler } = useImageErrorReporting()

  return (
    <img
      src={src}
      alt={alt}
      onError={createImageErrorHandler(src, () => {
        // Custom error handling
        setHasError(true)
      })}
    />
  )
}
```

### Form Validation Error Reporting

```typescript
import { useValidationErrorReporting } from '@/components/ErrorHandling'

const FormComponent = () => {
  const { reportValidationError } = useValidationErrorReporting()

  const validateField = (field: string, value: unknown) => {
    if (!value) {
      reportValidationError(field, value, 'required')
      return false
    }
    return true
  }
}
```

## Error Boundary Integration

The `ErrorBoundary` component now uses the unified service:

```typescript
import { ErrorBoundary } from '@/components/ErrorHandling'

const App = () => (
  <ErrorBoundary>
    <MyApplication />
  </ErrorBoundary>
)
```

## Error Management and Debugging

### Debug Panel

The debug panel provides a UI for viewing and managing errors:

```typescript
import { DebugPanel } from '@/components/ErrorHandling'

// Automatically shown in development, hidden in production
// unless localStorage.debug_enabled is set
const App = () => (
  <>
    <MyApplication />
    <DebugPanel />
  </>
)
```

### Programmatic Error Management

```typescript
import { useErrorManagement } from '@/components/ErrorHandling'

const ErrorManagerComponent = () => {
  const { getStoredErrors, clearStoredErrors, clearErrorById } =
    useErrorManagement()

  const handleClearAll = () => clearStoredErrors()

  const handleClearSpecific = (errorId: string) => clearErrorById(errorId)

  const errors = getStoredErrors()
}
```

## Configuration

### Severity Thresholds

```typescript
import { useErrorReportingConfig } from '@/components/ErrorHandling'

const ConfigComponent = () => {
  const { setSeverityThreshold } = useErrorReportingConfig()

  useEffect(() => {
    // Only report medium and above errors in production
    if (process.env.NODE_ENV === 'production') {
      setSeverityThreshold('medium')
    }
  }, [])
}
```

### Custom Error Handlers

```typescript
import { useErrorReportingConfig } from '@/components/ErrorHandling'

const TelemetryComponent = () => {
  const { addErrorHandler } = useErrorReportingConfig()

  useEffect(() => {
    const cleanup = addErrorHandler((report: ErrorReport) => {
      // Send to external monitoring service
      if (report.severity === 'critical') {
        sendToSentry(report)
      }
    })

    return cleanup
  }, [])
}
```

## Initialization

Initialize the service in your app entry point:

```typescript
// main.tsx
import { errorReportingService } from '@/components/ErrorHandling'

// Initialize before React app starts
errorReportingService.initialize()
```

## Benefits

### Eliminated Duplication

The unified system eliminates the previous duplication patterns found in:

- **ErrorMonitor.ts** - Manual error capture and normalization
- **ErrorBoundary.tsx** - React component error handling
- **Component error handlers** - Scattered try/catch blocks with inconsistent
  reporting

**Key improvements:**

- **Error Normalization**: Single source of truth for error data structure
- **ID Generation**: Consistent error ID generation across all sources
- **Metadata Collection**: Unified metadata collection (timestamp, userAgent,
  route, etc.)
- **Storage Management**: Centralized localStorage and memory management
- **Logging**: Consistent console logging and formatting

### Improved Type Safety

- **Strict TypeScript types** for all error-related data
- **Compile-time validation** of error sources and severity levels
- **IntelliSense support** for error context and options

### Enhanced Developer Experience

- **React hooks** for easy component integration
- **Automatic context management** for components
- **Debug panel** for error visualization
- **Comprehensive documentation** and examples

### Performance Optimizations

- **Severity filtering** to reduce noise
- **Queue management** to prevent memory leaks
- **Batched processing** for better performance
- **Configurable sampling** for production environments

## Best Practices

1. **Use appropriate severity levels**: Reserve 'critical' for
   application-breaking errors
2. **Provide meaningful context**: Include component names, user actions, and
   relevant data
3. **Don't over-report**: Use severity thresholds to reduce noise in production
4. **Test error scenarios**: Verify error reporting works in your components
5. **Monitor error patterns**: Use the debug panel and stored errors for
   insights

## Testing

The system includes comprehensive error reporting across:

- ✅ **React component errors** (ErrorBoundary)
- ✅ **Image loading failures** (OptimizedImage)
- ✅ **Global JavaScript errors** (window.onerror)
- ✅ **Unhandled Promise rejections** (unhandledrejection)
- ✅ **Manual error reporting** (component hooks)
- ✅ **Network request failures** (API calls)
- ✅ **Form validation errors** (user input)

All error sources now use the unified interface, eliminating duplication and
ensuring consistent error data across the application.
