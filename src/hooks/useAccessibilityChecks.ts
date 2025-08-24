import { useState, useEffect } from 'react'

export type AccessibilityIssue = {
  type: 'error' | 'warning' | 'info'
  message: string
  element?: HTMLElement
  selector?: string
}

/**
 * Custom hook for running accessibility checks
 * Extracts business logic from AccessibilityTester component
 */
export const useAccessibilityChecks = () => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([])

  const runAccessibilityChecks = () => {
    const newIssues: AccessibilityIssue[] = []

    // Check for missing alt text on images
    const images = document.querySelectorAll('img')

    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        newIssues.push({
          type: 'error',
          message: `Image missing alt text: ${img.src || `Image ${index + 1}`}`,
          element: img,
          selector: `img:nth-child(${index + 1})`,
        })
      }
    })

    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let previousLevel = 0

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))

      if (level > previousLevel + 1) {
        newIssues.push({
          type: 'warning',
          message: `Heading hierarchy skip: ${heading.tagName} (${heading.textContent?.slice(0, 50)})`,
          element: heading as HTMLElement,
          selector: `${heading.tagName.toLowerCase()}:nth-child(${index + 1})`,
        })
      }

      previousLevel = level
    })

    // Check for multiple H1 tags
    const h1Tags = document.querySelectorAll('h1')

    if (h1Tags.length > 1) {
      newIssues.push({
        type: 'error',
        message: `Multiple H1 tags found: ${h1Tags.length} H1 elements`,
        selector: 'h1',
      })
    }

    // Check for proper form labels
    const formInputs = document.querySelectorAll('input, select, textarea')

    formInputs.forEach((input, index) => {
      const id = input.getAttribute('id')
      const label = input.getAttribute('aria-label')
      const hasLabel = document.querySelector(`label[for="${id}"]`)

      if (!id && !label && !hasLabel) {
        newIssues.push({
          type: 'warning',
          message: `Form input missing label: ${input.tagName.toLowerCase()}`,
          element: input as HTMLElement,
          selector: `${input.tagName.toLowerCase()}:nth-child(${index + 1})`,
        })
      }
    })

    // Check for sufficient color contrast (basic check)
    const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6')

    textElements.forEach(element => {
      const style = window.getComputedStyle(element)
      const color = style.color
      const backgroundColor = style.backgroundColor

      // Basic contrast check (this is simplified - real contrast checking needs more sophisticated analysis)
      if (color === backgroundColor) {
        newIssues.push({
          type: 'warning',
          message: 'Potential contrast issue: text and background colors are the same',
          element: element as HTMLElement,
        })
      }
    })

    // Check for keyboard navigation
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]'
    )

    interactiveElements.forEach(element => {
      const tabIndex = element.getAttribute('tabindex')

      if (tabIndex === '-1' && !element.hasAttribute('aria-hidden')) {
        newIssues.push({
          type: 'info',
          message: 'Element with tabindex="-1" - ensure this is intentional for accessibility',
          element: element as HTMLElement,
        })
      }
    })

    setIssues(newIssues)
  }

  useEffect(() => {
    if (import.meta.env.DEV) {
      runAccessibilityChecks()
    }
  }, [])

  return {
    issues,
    runAccessibilityChecks,
  }
}
