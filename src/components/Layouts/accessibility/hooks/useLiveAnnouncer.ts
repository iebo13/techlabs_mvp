import { useEffect, useRef } from 'react'

type Politeness = 'polite' | 'assertive'

/**
 * Hook for announcing dynamic content changes to screen readers
 * Uses ARIA live regions for accessibility compliance (WCAG 2.1 4.1.3)
 *
 * @example
 * const { announce } = useLiveAnnouncer()
 * announce('Form submitted successfully', 'polite')
 */
export const useLiveAnnouncer = () => {
  const politeRegionRef = useRef<HTMLDivElement | null>(null)
  const assertiveRegionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const existingPolite = document.getElementById('a11y-polite-announcer')
    const existingAssertive = document.getElementById('a11y-assertive-announcer')

    if (!existingPolite) {
      const politeRegion = document.createElement('div')

      politeRegion.id = 'a11y-polite-announcer'
      politeRegion.setAttribute('role', 'status')
      politeRegion.setAttribute('aria-live', 'polite')
      politeRegion.setAttribute('aria-atomic', 'true')
      politeRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      `
      document.body.appendChild(politeRegion)
      politeRegionRef.current = politeRegion
    } else {
      politeRegionRef.current = existingPolite as HTMLDivElement
    }

    if (!existingAssertive) {
      const assertiveRegion = document.createElement('div')

      assertiveRegion.id = 'a11y-assertive-announcer'
      assertiveRegion.setAttribute('role', 'alert')
      assertiveRegion.setAttribute('aria-live', 'assertive')
      assertiveRegion.setAttribute('aria-atomic', 'true')
      assertiveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      `
      document.body.appendChild(assertiveRegion)
      assertiveRegionRef.current = assertiveRegion
    } else {
      assertiveRegionRef.current = existingAssertive as HTMLDivElement
    }
  }, [])

  /**
   * Announce a message to screen readers
   * @param message - The message to announce
   * @param politeness - 'polite' for non-urgent updates, 'assertive' for urgent/error messages
   */
  const announce = (message: string, politeness: Politeness = 'polite') => {
    const region = politeness === 'assertive' ? assertiveRegionRef.current : politeRegionRef.current

    if (region) {
      region.textContent = ''
      requestAnimationFrame(() => {
        region.textContent = message
      })
    }
  }

  /**
   * Clear the current announcement
   */
  const clear = (politeness: Politeness = 'polite') => {
    const region = politeness === 'assertive' ? assertiveRegionRef.current : politeRegionRef.current

    if (region) {
      region.textContent = ''
    }
  }

  return {
    announce,
    clear,
  }
}
