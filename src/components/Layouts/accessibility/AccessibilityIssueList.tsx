import React from 'react'
import { Alert, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import type { AccessibilityIssueListProps } from './types/accessibility.types'

/**
 * AccessibilityIssueList - Renders the list of accessibility issues
 * Extracted from AccessibilityTester for better separation of concerns
 */
export const AccessibilityIssueList: React.FC<AccessibilityIssueListProps> = ({ issues, onIssueClick }) => {
  const { t } = useI18n()

  if (issues.length === 0) {
    return (
      <Alert severity="success" sx={{ mb: 2 }}>
        {t('accessibility.noIssues')}
      </Alert>
    )
  }

  return (
    <>
      <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
        {issues.map((issue, index) => {
          const elementId = issue.element?.id || issue.element?.className || 'no-element'
          const uniqueId = `${issue.type}-${issue.selector || 'no-selector'}-${elementId}-${index}`

          return (
            <ListItem
              key={uniqueId}
              component="div"
              onClick={() => onIssueClick(issue)}
              sx={{
                border: '1px solid',
                borderColor:
                  issue.type === 'error' ? 'error.main' : issue.type === 'warning' ? 'warning.main' : 'info.main',
                borderRadius: 1,
                mb: 1,
                cursor: 'pointer',
              }}>
              <ListItemText
                primary={issue.message}
                secondary={issue.selector}
                primaryTypographyProps={{
                  variant: 'body2',
                  color:
                    issue.type === 'error' ? 'error.main' : issue.type === 'warning' ? 'warning.main' : 'info.main',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                  color: 'text.secondary',
                }}
              />
            </ListItem>
          )
        })}
      </List>

      <Typography variant="caption" color="text.secondary">
        {t('accessibility.clickToHighlight')}
      </Typography>
    </>
  )
}
