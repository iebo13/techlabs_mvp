import { useState, useEffect } from 'react'
import type { AccessibilityIssue } from '../types/accessibility.types'
import {
  checkImages,
  checkHeadings,
  checkFormControls,
  checkButtons,
  checkLinks,
  checkARIA,
  checkKeyboardNavigation,
  checkLandmarks,
} from './checkers'

/**
 * Custom hook for running comprehensive accessibility checks
 * Covers WCAG 2.1 AA guidelines for common accessibility issues
 */
export const useAccessibilityChecks = () => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([])

  const runAccessibilityChecks = () => {
    const newIssues: AccessibilityIssue[] = []

    checkImages(newIssues)
    checkHeadings(newIssues)
    checkFormControls(newIssues)
    checkButtons(newIssues)
    checkLinks(newIssues)
    checkARIA(newIssues)
    checkKeyboardNavigation(newIssues)
    checkLandmarks(newIssues)

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
