import React, { useState } from 'react'
import { Box, Button, Collapse, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import { AccessibilityIssueList } from './AccessibilityIssueList'
import { useAccessibilityChecks, useIssueHighlighting } from './hooks'

/**
 * AccessibilityTester - Development tool for checking common accessibility issues
 * Helps developers identify and fix accessibility problems during development
 * Should be removed or conditionally rendered in production
 */
export const AccessibilityTester: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useI18n()
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
      }}>
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Typography variant="h6" component="h2">
          {t('accessibility.title')}
        </Typography>
        <Button size="small" onClick={() => setIsExpanded(!isExpanded)} variant="outlined">
          {isExpanded ? t('common.hide') : t('common.show')}
        </Button>
      </Box>

      <Collapse in={isExpanded}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button size="small" onClick={handleRetest} variant="contained" color="primary">
              {t('debug.retest')}
            </Button>
            <Typography variant="body2" color="text.secondary">
              {errorCount} {t('common.errors')}, {warningCount} {t('common.warnings')}, {infoCount} {t('common.info')}
            </Typography>
          </Box>

          <AccessibilityIssueList issues={issues} onIssueClick={highlightIssue} />
        </Box>
      </Collapse>
    </Box>
  )
}
