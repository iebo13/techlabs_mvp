/**
 * Shared intersection observer utility with consistent cleanup patterns
 * Consolidates observer logic from OptimizedImage, LazyIntersection, and other components
 */

export type ObserverCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void

export type ObserverOptions = IntersectionObserverInit & {
  /** Auto-disconnect after first intersection (default: true) */
  disconnectOnIntersection?: boolean
}

/**
 * Creates an intersection observer with consistent cleanup patterns
 * Handles automatic disconnection and cleanup to prevent memory leaks
 */
export const createManagedObserver = (
  callback: ObserverCallback,
  options: ObserverOptions = {}
): IntersectionObserver => {
  const { disconnectOnIntersection = true, ...observerOptions } = options

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...observerOptions,
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry, observer)

        if (disconnectOnIntersection) {
          observer.disconnect()
        }
      }
    })
  }, defaultOptions)

  return observer
}

/**
 * Hook-like observer manager for React components
 * Provides consistent observer lifecycle management
 */
export const createObserverManager = () => {
  let observer: IntersectionObserver | null = null
  let isConnected = false

  const observe = (element: Element, callback: ObserverCallback, options: ObserverOptions = {}) => {
    // Clean up existing observer
    disconnect()

    observer = createManagedObserver(callback, options)
    observer.observe(element)
    isConnected = true

    return observer
  }

  const disconnect = () => {
    if (observer && isConnected) {
      observer.disconnect()
      observer = null
      isConnected = false
    }
  }

  const cleanup = disconnect // Alias for better semantic clarity

  return {
    observe,
    disconnect,
    cleanup,
    get isConnected() {
      return isConnected
    },
  }
}

/**
 * Specialized observer for image lazy loading with built-in cleanup
 * Replaces the duplicated logic in OptimizedImage
 */
export const createImageLazyLoader = (
  onIntersect: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  return createManagedObserver(
    (entry, _observer) => {
      onIntersect(entry)
      // Automatically disconnects after intersection due to default disconnectOnIntersection: true
    },
    {
      rootMargin: '50px',
      threshold: 0.1,
      disconnectOnIntersection: true,
      ...options,
    }
  )
}

/**
 * Specialized observer for lazy component loading
 * Replaces the duplicated logic in LazyIntersection
 */
export const createComponentLazyLoader = (
  onIntersect: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  return createManagedObserver(
    (entry, _observer) => {
      onIntersect(entry)
      // Automatically disconnects after intersection due to default disconnectOnIntersection: true
    },
    {
      rootMargin: '100px',
      threshold: 0.1,
      disconnectOnIntersection: true,
      ...options,
    }
  )
}

/**
 * Enhanced cleanup utility for React components
 * Ensures proper observer cleanup in component lifecycles
 */
export const useObserverCleanup = () => {
  const observers: IntersectionObserver[] = []

  const addObserver = (observer: IntersectionObserver) => {
    observers.push(observer)

    return observer
  }

  const cleanup = () => {
    observers.forEach(observer => observer.disconnect())
    observers.length = 0
  }

  return {
    addObserver,
    cleanup,
  }
}
