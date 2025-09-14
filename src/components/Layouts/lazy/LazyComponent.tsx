import React, { Suspense, lazy } from 'react'
import { LoadingFallback } from '@/components'

type LazyComponentProps = {
  importFn: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>
  fallback?: React.ReactNode
  props?: Record<string, unknown>
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
  importFn,
  fallback = <LoadingFallback variant="component" />,
  props = {},
}) => {
  const Component = lazy(importFn)

  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  )
}
