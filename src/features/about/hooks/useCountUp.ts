import { useEffect, useRef, useState } from 'react'

type UseCountUpOptions = {
  readonly end: number
  readonly duration?: number
  readonly suffix?: string
  readonly prefix?: string
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export const useCountUp = ({ end, duration = 2000, suffix = '', prefix = '' }: UseCountUpOptions) => {
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const element = ref.current

    if (!element || hasAnimatedRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting || hasAnimatedRef.current) return

        hasAnimatedRef.current = true
        observer.disconnect()

        const start = performance.now()
        let frameId = 0

        const step = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const easedProgress = easeOutCubic(progress)
          const current = Math.round(easedProgress * end)
          const formatted = new Intl.NumberFormat().format(current)

          setDisplayValue(`${prefix}${formatted}${suffix}`)

          if (progress < 1) {
            frameId = requestAnimationFrame(step)
          }
        }

        frameId = requestAnimationFrame(step)

        // Store cleanup reference
        element.dataset.frameId = String(frameId)
      },
      { threshold: 0.3 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      const storedId = element.dataset.frameId

      if (storedId) {
        cancelAnimationFrame(Number(storedId))
      }
    }
  }, [end, duration, suffix, prefix])

  return { ref, displayValue }
}
