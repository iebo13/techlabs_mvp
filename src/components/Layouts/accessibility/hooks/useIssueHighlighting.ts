import type { AccessibilityIssue } from '../types/accessibility.types'

/**
 * Custom hook for highlighting accessibility issues on the page
 */
export const useIssueHighlighting = () => {
  const highlightIssue = (issue: AccessibilityIssue) => {
    if (issue.element) {
      issue.element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      issue.element.style.outline = '2px solid red'
      issue.element.style.outlineOffset = '2px'

      // Remove outline after 3 seconds
      setTimeout(() => {
        if (issue.element) {
          issue.element.style.outline = ''
          issue.element.style.outlineOffset = ''
        }
      }, 3000)
    }
  }

  return {
    highlightIssue,
  }
}
