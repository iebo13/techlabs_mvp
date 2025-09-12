import React, { useState, useEffect } from 'react'
import {
  ErrorOutline as BugIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { Box, Fab, Drawer, Typography, Button, Divider, Alert } from '@mui/material'
import { ErrorList } from './ErrorList'
import type { ErrorReport } from './ErrorReportingService'
import { useErrorManagement } from './hooks/useErrorReporting'

export const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState<ErrorReport[]>([])
  const { getStoredErrors, clearStoredErrors } = useErrorManagement()

  useEffect(() => {
    const loadErrors = () => {
      const storedErrors = getStoredErrors()

      setErrors(storedErrors)
    }

    loadErrors()

    const interval = setInterval(loadErrors, 5000)

    return () => clearInterval(interval)
  }, [getStoredErrors])

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
    clearStoredErrors()
    setErrors([])
  }

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
        <ErrorList errors={errors} />
      </Drawer>
    </>
  )
}
