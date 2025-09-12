import React from 'react'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import {
  Box,
  Typography,
  List,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import type { ErrorReport } from './ErrorReportingService'

// Legacy type alias for backward compatibility
export type ErrorData = ErrorReport

const ErrorDetails: React.FC<{ error: ErrorReport }> = ({ error }) => (
  <Box sx={{ fontSize: '0.875rem' }}>
    <Typography variant="subtitle2" gutterBottom>
      Error Details:
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
      <strong>URL:</strong> {error.url}
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
      <strong>Route:</strong> {error.route}
    </Typography>
    {error.line && (
      <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
        <strong>Location:</strong> Line {error.line}
        {error.column ? `, Col ${error.column}` : ''}
      </Typography>
    )}
    {error.buildVersion && (
      <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
        <strong>Build:</strong> {error.buildVersion}
      </Typography>
    )}

    {error.stack && (
      <>
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          Stack Trace:
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            whiteSpace: 'pre-wrap',
            backgroundColor: 'grey.100',
            p: 1,
            borderRadius: 1,
            maxHeight: 200,
            overflow: 'auto',
          }}
        >
          {error.stack}
        </Typography>
      </>
    )}

    {error.additionalData && (
      <>
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          Additional Data:
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            whiteSpace: 'pre-wrap',
            backgroundColor: 'grey.100',
            p: 1,
            borderRadius: 1,
          }}
        >
          {JSON.stringify(error.additionalData, null, 2)}
        </Typography>
      </>
    )}
  </Box>
)

export const ErrorList: React.FC<{ errors: ErrorReport[] }> = ({ errors }) => {
  const formatTimestamp = (timestamp: number) => new Date(timestamp).toLocaleString()

  const getSeverityColor = (message: string) => {
    if (message.includes('Error') || message.includes('error')) return 'error'
    if (message.includes('Warning') || message.includes('warning')) return 'warning'

    return 'info'
  }

  if (errors.length === 0) {
    return <Typography color="text.secondary">No errors captured yet. This is good! 🎉</Typography>
  }

  return (
    <List>
      {errors.map(error => (
        <Accordion key={`error-${error.id}`} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip
                  label={error.severity || getSeverityColor(error.message)}
                  size="small"
                  color={getSeverityColor(error.message)}
                />
                <Chip label={error.source} size="small" variant="outlined" />
                <Typography variant="caption">{formatTimestamp(error.timestamp)}</Typography>
              </Box>
              <Typography variant="body2" noWrap>
                {error.message}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <ErrorDetails error={error} />
          </AccordionDetails>
        </Accordion>
      ))}
    </List>
  )
}
