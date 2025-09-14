import React, { Suspense, useRef, useEffect, useState, memo } from 'react'
import { Box, Skeleton, Fade } from '@mui/material'
import { createObserverManager } from '@/utils/intersectionObserver'

type LazyIntersectionProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
  minHeight?: number
}

const DefaultSkeleton: React.FC<{ minHeight: number }> = ({ minHeight }) => (
  <Fade in timeout={500}>
    <Box sx={{ py: 2 }}>
      <Skeleton
        variant="rectangular"
        height={minHeight}
        sx={{
          borderRadius: 2,
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '200% 0' },
            '100%': { backgroundPosition: '-200% 0' },
          },
        }}
      />
    </Box>
  </Fade>
)

DefaultSkeleton.displayName = 'DefaultSkeleton'

export const LazyIntersection: React.FC<LazyIntersectionProps> = memo(
  ({ children, fallback, rootMargin = '100px', threshold = 0.1, minHeight = 200 }) => {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const observerManager = useRef(createObserverManager())

    useEffect(() => {
      if (ref.current) {
        const manager = observerManager.current

        manager.observe(
          ref.current,
          () => {
            setIsVisible(true)
          },
          {
            rootMargin,
            threshold,
          }
        )

        return () => manager.cleanup()
      }
    }, [rootMargin, threshold])

    const defaultFallback = fallback || <DefaultSkeleton minHeight={minHeight} />

    return (
      <div ref={ref}>{isVisible ? <Suspense fallback={defaultFallback}>{children}</Suspense> : defaultFallback}</div>
    )
  }
)

LazyIntersection.displayName = 'LazyIntersection'
