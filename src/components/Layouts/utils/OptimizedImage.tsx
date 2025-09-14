import React, { useState, useRef, useEffect, memo } from 'react'
import { Box, Skeleton } from '@mui/material'
import { createImageObserver } from '@/components/PerformanceMonitoring/PerformanceUtils'

type OptimizedImageProps = {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  placeholder?: string
  lazy?: boolean
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
  sizes?: string
  srcSet?: string
}

export const OptimizedImage: React.FC<OptimizedImageProps> = memo(
  ({
    src,
    alt,
    width,
    height,
    placeholder,
    lazy = true,
    priority = false,
    className,
    style,
    onLoad,
    onError,
    sizes,
    srcSet,
  }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(!lazy || priority)
    const [hasError, setHasError] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    const handleLoad = () => {
      setIsLoaded(true)
      onLoad?.()
    }

    const handleError = () => {
      setHasError(true)
      onError?.()
    }

    useEffect(() => {
      if (!lazy || priority || !imgRef.current) return

      const observer = createImageObserver(
        entry => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer?.disconnect()
          }
        },
        { rootMargin: '50px' }
      )

      observerRef.current = observer
      observer.observe(imgRef.current)

      return () => {
        observer.disconnect()
      }
    }, [lazy, priority])

    useEffect(() => {
      if (priority && src) {
        const link = document.createElement('link')

        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)

        return () => {
          if (document.head.contains(link)) {
            document.head.removeChild(link)
          }
        }
      }
    }, [priority, src])

    const defaultImageStyles = {
      width: width || 'auto',
      height: height || 'auto',
      objectFit: 'cover' as const,
      transition: 'opacity 0.3s ease-in-out',
      opacity: isLoaded ? 1 : 0,
    }

    const skeletonStyles = {
      width: width || '100%',
      height: height || '200px',
    }

    if (hasError) {
      return (
        <Box
          sx={{
            width: width || '100%',
            height: height || '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.200',
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}>
          Failed to load image
        </Box>
      )
    }

    return (
      <Box
        ref={imgRef}
        className={className}
        style={style}
        sx={{
          position: 'relative',
          width: width || '100%',
          height: height || 'auto',
          overflow: 'hidden',
        }}>
        {!isLoaded && <Skeleton variant="rectangular" sx={skeletonStyles} animation="wave" />}

        {isInView && (
          <img
            src={src}
            alt={alt}
            style={defaultImageStyles}
            onLoad={handleLoad}
            onError={handleError}
            loading={lazy && !priority ? 'lazy' : 'eager'}
            decoding="async"
            sizes={sizes}
            srcSet={srcSet}
          />
        )}

        {placeholder && !isLoaded && (
          <img
            src={placeholder}
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.5,
            }}
          />
        )}
      </Box>
    )
  }
)

OptimizedImage.displayName = 'OptimizedImage'
