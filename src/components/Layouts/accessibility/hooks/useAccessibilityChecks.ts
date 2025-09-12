import { useState, useEffect, useCallback } from 'react'
import type { AccessibilityIssue } from '../types/accessibility.types'

/**
 * Custom hook for running accessibility checks
 * Extracts business logic from AccessibilityTester component
 */
export const useAccessibilityChecks = () => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([])

  const generateUniqueSelector = (element: Element, index: number): string => {
    // Try to use ID first
    if (element.id) {
      return `#${element.id}`
    }

    // Try to use a unique class combination
    if (element.classList.length > 0) {
      const classes = [...element.classList].slice(0, 2).join('.')

      return `${element.tagName.toLowerCase()}.${classes}`
    }

    // Use tag name with position and context
    const parent = element.parentElement

    if (parent) {
      const parentTag = parent.tagName.toLowerCase()
      const parentId = parent.id ? `#${parent.id}` : parentTag

      return `${parentId} > ${element.tagName.toLowerCase()}:nth-child(${index + 1})`
    }

    // Fallback to tag with index
    return `${element.tagName.toLowerCase()}:nth-child(${index + 1})`
  }
  // eslint-disable-next-line
  const runAccessibilityChecks = useCallback(() => {
    const newIssues: AccessibilityIssue[] = []

    // Check for missing alt text on images
    const images = document.querySelectorAll('img')

    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        newIssues.push({
          type: 'error',
          message: `Image missing alt text: ${img.src || `Image ${index + 1}`}`,
          element: img,
          selector: generateUniqueSelector(img, index),
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
          selector: generateUniqueSelector(heading, index),
        })
      }

      previousLevel = level
    })

    // Check for multiple H1 tags
    const h1Tags = document.querySelectorAll('h1')

    if (h1Tags.length > 1) {
      h1Tags.forEach((h1, index) => {
        newIssues.push({
          type: 'error',
          message: `Multiple H1 tags found: ${h1Tags.length} H1 elements`,
          element: h1 as HTMLElement,
          selector: generateUniqueSelector(h1, index),
        })
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
          selector: generateUniqueSelector(input, index),
        })
      }
    })

    // Check for sufficient color contrast (basic check)
    const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6')

    textElements.forEach((element, index) => {
      const style = window.getComputedStyle(element)
      const color = style.color
      const backgroundColor = style.backgroundColor

      // Basic contrast check (this is simplified - real contrast checking needs more sophisticated analysis)
      if (color === backgroundColor) {
        newIssues.push({
          type: 'warning',
          message: 'Potential contrast issue: text and background colors are the same',
          element: element as HTMLElement,
          selector: generateUniqueSelector(element, index),
        })
      }
    })

    // Check for keyboard navigation
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]'
    )

    interactiveElements.forEach((element, index) => {
      const tabIndex = element.getAttribute('tabindex')

      if (tabIndex === '-1' && !element.hasAttribute('aria-hidden')) {
        newIssues.push({
          type: 'info',
          message: 'Element with tabindex="-1" - ensure this is intentional for accessibility',
          element: element as HTMLElement,
          selector: generateUniqueSelector(element, index),
        })
      }
    })

    setIssues(newIssues)
  }, [])

  useEffect(() => {
    if (import.meta.env.DEV) {
      runAccessibilityChecks()
    }
  }, [runAccessibilityChecks])

  return {
    issues,
    runAccessibilityChecks,
  }
}
