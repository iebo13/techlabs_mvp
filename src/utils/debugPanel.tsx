import React, { useState, useEffect } from 'react'
import {
  ErrorOutline as BugIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { Box, Fab, Drawer, Typography, List, Button, Divider, Alert, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { errorMonitor } from '@/utils/errorMonitor'

type ErrorData = {
  message: string
  timestamp: number
  url: string
  route?: string
  line?: number
  column?: number
  stack?: string
  buildVersion?: string
  additionalData?: Record<string, unknown>
}

export const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState<ErrorData[]>([])

  useEffect(() => {
    const loadErrors = () => {
      const storedErrors = errorMonitor.getStoredErrors()

      setErrors(storedErrors)
    }

    loadErrors()

    const interval = setInterval(loadErrors, 5000)

    return () => clearInterval(interval)
  }, [])

  if (import.meta.env.PROD && !localStorage.getItem('debug_enabled')) {
    return null
  }

  const handleDownloadErrors = () => {
    const errorData = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      errors,
    }

    const blob = new Blob([JSON.stringify(errorData, null, 2)], { type: 'application/json' })

    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')

    a.href = url
    a.download = `error-report-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClearErrors = () => {
    errorMonitor.clearStoredErrors()
    setErrors([])
  }

  const formatTimestamp = (timestamp: number) => new Date(timestamp).toLocaleString()

  const getSeverityColor = (message: string) => {
    if (message.includes('Error') || message.includes('error')) return 'error'
    if (message.includes('Warning') || message.includes('warning')) return 'warning'

    return 'info'
  }

  const renderErrorDetails = (error: ErrorData) => (
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

  return (
    <>
      <Fab
        color="secondary"
        aria-label="debug"
        sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 9998 }}
        onClick={() => setIsOpen(true)}
      >
        <BugIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400, p: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Debug Panel</Typography>
          <Button startIcon={<CloseIcon />} onClick={() => setIsOpen(false)} size="small">
            Close
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This panel shows captured errors and performance metrics for debugging purposes.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button
              startIcon={<DownloadIcon />}
              onClick={handleDownloadErrors}
              size="small"
              variant="outlined"
              disabled={errors.length === 0}
            >
              Download Errors
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={handleClearErrors}
              size="small"
              variant="outlined"
              color="error"
              disabled={errors.length === 0}
            >
              Clear All
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Total Errors:</strong> {errors.length}
            </Typography>
          </Alert>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {errors.length === 0 ? (
          <Typography color="text.secondary">No errors captured yet. This is good! 🎉</Typography>
        ) : (
          <List>
            {errors.map(error => (
              <Accordion key={`error-${error.timestamp}-${error.message}`} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Chip
                        label={getSeverityColor(error.message)}
                        size="small"
                        color={getSeverityColor(error.message)}
                      />
                      <Typography variant="caption">{formatTimestamp(error.timestamp)}</Typography>
                    </Box>
                    <Typography variant="body2" noWrap>
                      {error.message}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>{renderErrorDetails(error)}</AccordionDetails>
              </Accordion>
            ))}
          </List>
        )}
      </Drawer>
    </>
  )
}
