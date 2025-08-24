import React, { useEffect, useState } from 'react'

import {
  Alert,
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'

type AccessibilityIssue = {
  type: 'error' | 'warning' | 'info'
  message: string
  element?: HTMLElement
  selector?: string
}

/**
 * AccessibilityTester - Development tool for checking common accessibility issues
 * Helps developers identify and fix accessibility problems during development
 * Should be removed or conditionally rendered in production
 */
export const AccessibilityTester: React.FC = () => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (import.meta.env.DEV) {
      runAccessibilityChecks()
    }
  }, [])

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

  const handleRetest = () => {
    runAccessibilityChecks()
  }

  const handleIssueClick = (issue: AccessibilityIssue) => {
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

  if (!import.meta.env.DEV) {
    return null
  }

  const errorCount = issues.filter(i => i.type === 'error').length
  const warningCount = issues.filter(i => i.type === 'warning').length
  const infoCount = issues.filter(i => i.type === 'info').length

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        maxWidth: 400,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" component="h2">
          A11y Checker
        </Typography>
        <Button size="small" onClick={() => setIsExpanded(!isExpanded)} variant="outlined">
          {isExpanded ? 'Hide' : 'Show'}
        </Button>
      </Box>

      <Collapse in={isExpanded}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button size="small" onClick={handleRetest} variant="contained" color="primary">
              Retest
            </Button>
            <Typography variant="body2" color="text.secondary">
              {errorCount} errors, {warningCount} warnings, {infoCount} info
            </Typography>
          </Box>

          {issues.length === 0 ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              No accessibility issues found! 🎉
            </Alert>
          ) : (
            <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
              {issues.map(issue => (
                <ListItem
                  key={`issue-${issue.type}-${issue.message.slice(0, 20).replace(/\s+/g, '-')}`}
                  component="div"
                  onClick={() => handleIssueClick(issue)}
                  sx={{
                    border: '1px solid',
                    borderColor:
                      issue.type === 'error'
                        ? 'error.main'
                        : issue.type === 'warning'
                          ? 'warning.main'
                          : 'info.main',
                    borderRadius: 1,
                    mb: 1,
                    cursor: 'pointer',
                  }}
                >
                  <ListItemText
                    primary={issue.message}
                    secondary={issue.selector}
                    primaryTypographyProps={{
                      variant: 'body2',
                      color:
                        issue.type === 'error'
                          ? 'error.main'
                          : issue.type === 'warning'
                            ? 'warning.main'
                            : 'info.main',
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      color: 'text.secondary',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Typography variant="caption" color="text.secondary">
            Click on issues to highlight them on the page
          </Typography>
        </Box>
      </Collapse>
    </Box>
  )
}
