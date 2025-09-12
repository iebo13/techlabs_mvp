import React, { useState } from 'react'
import { Box, Button, Collapse, Typography } from '@mui/material'
import { AccessibilityIssueList } from './AccessibilityIssueList'
import { useAccessibilityChecks, useIssueHighlighting } from './hooks'

/**
 * AccessibilityTester - Development tool for checking common accessibility issues
 * Helps developers identify and fix accessibility problems during development
 * Should be removed or conditionally rendered in production
 */
export const AccessibilityTester: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { issues, runAccessibilityChecks } = useAccessibilityChecks()
  const { highlightIssue } = useIssueHighlighting()

  const handleRetest = () => {
    runAccessibilityChecks()
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

          <AccessibilityIssueList issues={issues} onIssueClick={highlightIssue} />
        </Box>
      </Collapse>
    </Box>
  )
}
