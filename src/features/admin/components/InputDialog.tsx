/**
 * InputDialog component
 * Reusable dialog for text input (replaces window.prompt)
 */

import React, { useRef, useState, useEffect, useId } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

type InputDialogProps = {
  readonly open: boolean
  readonly title: string
  readonly label: string
  readonly defaultValue?: string
  readonly onConfirm: (value: string) => void
  readonly onCancel: () => void
}

export const InputDialog: React.FC<InputDialogProps> = ({
  open,
  title,
  label,
  defaultValue = '',
  onConfirm,
  onCancel,
}) => {
  const [value, setValue] = useState(defaultValue)
  const titleId = useId()
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setValue(defaultValue)
    }
  }, [open, defaultValue])

  useEffect(() => {
    if (!open) return

    window.setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }, [open])

  const handleConfirm = (): void => {
    onConfirm(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleConfirm()
    }
  }

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth aria-labelledby={titleId}>
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <DialogContent>
        <TextField
          id={inputId}
          fullWidth
          label={label}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
