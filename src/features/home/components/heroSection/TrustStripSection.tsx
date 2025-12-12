import { useEffect, useRef, useState } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { PartnerLogo, type Partner } from '@/features/partners'
import { useI18n } from '@/hooks'

type TrustStripSectionProps = {
  readonly partners: Partner[]
}

const ITEM_GAP = 80
const SPEED = 1

export const TrustStripSection: React.FC<TrustStripSectionProps> = ({ partners }) => {
  const theme = useTheme()
  const { t } = useI18n()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [isPaused, setIsPaused] = useState(prefersReducedMotion)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const positionsRef = useRef<number[]>([])
  const animationRef = useRef<number>(0)
  const itemWidthRef = useRef<number>(0)

  useEffect(() => {
    setIsPaused(prefersReducedMotion)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (partners.length === 0) return

    itemRefs.current = itemRefs.current.slice(0, partners.length)

    const calculateItemWidth = (): number => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0
      const baseWidth = Math.floor(containerWidth / partners.length)
      const minWidth = 220

      return Math.max(baseWidth, minWidth)
    }

    const initializePositions = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0

      itemWidthRef.current = calculateItemWidth()

      positionsRef.current = partners.map((_, index) => containerWidth + index * (itemWidthRef.current + ITEM_GAP))

      itemRefs.current.forEach((el, index) => {
        const position = positionsRef.current.at(index)

        if (el && position !== undefined) {
          el.style.transform = `translateX(${position}px)`
          el.style.width = `${itemWidthRef.current}px`
        }
      })
    }

    const findRightmostPosition = (): number => {
      if (positionsRef.current.length === 0) return 0

      return Math.max(...positionsRef.current)
    }

    const animate = () => {
      const itemWidth = itemWidthRef.current

      positionsRef.current = positionsRef.current.map((currentPos, idx) => {
        let newPos = currentPos - SPEED

        if (newPos < -itemWidth) {
          const rightmost = findRightmostPosition()

          newPos = rightmost + itemWidth + ITEM_GAP
        }

        const el = itemRefs.current.at(idx)

        if (el) {
          el.style.transform = `translateX(${newPos}px)`
        }

        return newPos
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (!isPaused) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    const initTimeout = setTimeout(() => {
      initializePositions()
      startAnimation()
    }, 50)

    const handleResize = () => {
      cancelAnimationFrame(animationRef.current)
      initializePositions()
      startAnimation()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(initTimeout)
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [partners, isPaused])

  return (
    <Box
      ref={containerRef}
      role="region"
      aria-label={t('partners.trustStrip.ariaLabel', { defaultValue: 'Our trusted partners' })}
      aria-live={isPaused ? 'off' : 'polite'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => !prefersReducedMotion && setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => !prefersReducedMotion && setIsPaused(false)}
      sx={{
        backgroundColor: theme.palette.grey[300],
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        height: 70,
      }}>
      {partners.map((partner, index) => (
        <Box
          key={partner.name}
          ref={(el: HTMLDivElement | null) => {
            // eslint-disable-next-line
            itemRefs.current[index] = el
          }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: isPaused ? 'auto' : 'transform',
          }}>
          <PartnerLogo partner={partner} />
        </Box>
      ))}
    </Box>
  )
}
