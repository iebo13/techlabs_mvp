import { useEffect, useRef, useCallback } from 'react'

type UseFocusTrapOptions = {
  enabled?: boolean
  autoFocus?: boolean
  restoreFocus?: boolean
  initialFocus?: HTMLElement | null
}

const FOCUSABLE_SELECTORS = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ')

/** Gets all focusable elements within a container */
const getFocusableElements = (container: HTMLElement | null): HTMLElement[] => {
  if (!container) return []

  const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)

  return [...elements].filter(el => {
    const style = window.getComputedStyle(el)

    return style.display !== 'none' && style.visibility !== 'hidden' && !el.hasAttribute('inert')
  })
}

/**
 * Hook for trapping focus within a container element
 * Essential for modal dialogs and popups (WCAG 2.1 2.4.3)
 *
 * @example
 * const containerRef = useFocusTrap<HTMLDivElement>({ enabled: isOpen })
 * <div ref={containerRef}>Modal content</div>
 */
export const useFocusTrap = <T extends HTMLElement = HTMLDivElement>(options: UseFocusTrapOptions = {}) => {
  const { enabled = true, autoFocus = true, restoreFocus = true, initialFocus } = options

  const containerRef = useRef<T | null>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  // eslint-disable-next-line
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || event.key !== 'Tab') return

      const focusableElements = getFocusableElements(containerRef.current)

      if (focusableElements.length === 0) {
        event.preventDefault()

        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey) {
        if (activeElement === firstElement || !containerRef.current?.contains(activeElement)) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        if (activeElement === lastElement || !containerRef.current?.contains(activeElement)) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    },
    [enabled]
  )

  useEffect(() => {
    if (!enabled) {
      if (restoreFocus && previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus()
        previouslyFocusedRef.current = null
      }

      return
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement

    if (autoFocus) {
      const target = initialFocus || getFocusableElements(containerRef.current)[0]

      if (target) {
        requestAnimationFrame(() => {
          target.focus()
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, autoFocus, restoreFocus, initialFocus, handleKeyDown])

  return containerRef
}
