/**
 * EventForm component
 * Form for creating and editing events
 */

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { type AdminEvent, type CreateEventInput, CreateEventSchema, EventType } from '../types'
import { getDefaultEventValues } from '../utils'

type EventFormProps = {
  readonly open: boolean
  readonly event: AdminEvent | null
  readonly onSubmit: (data: CreateEventInput) => Promise<void>
  readonly onClose: () => void
}

export const EventForm: React.FC<EventFormProps> = ({ open, event, onSubmit, onClose }) => {
  const isEditMode = Boolean(event)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: event ?? getDefaultEventValues(),
  })

  // Reset form when event changes
  React.useEffect(() => {
    if (open) {
      reset(event ?? getDefaultEventValues())
    }
  }, [open, event, reset])

  const handleFormSubmit = async (data: CreateEventInput): Promise<void> => {
    await onSubmit(data)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Event' : 'Create Event'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
            />

            <Controller
              name="blurb"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  error={Boolean(errors.blurb)}
                  helperText={errors.blurb?.message}
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors.date)}
                  helperText={errors.date?.message}
                />
              )}
            />

            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Location"
                  fullWidth
                  error={Boolean(errors.location)}
                  helperText={errors.location?.message}
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.type)}>
                  <InputLabel>Event Type</InputLabel>
                  <Select {...field} label="Event Type">
                    <MenuItem value={EventType.UPCOMING}>Upcoming</MenuItem>
                    <MenuItem value={EventType.PAST}>Past</MenuItem>
                  </Select>
                  {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                </FormControl>
              )}
            />

            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image URL"
                  fullWidth
                  error={Boolean(errors.imageUrl)}
                  helperText={errors.imageUrl?.message}
                />
              )}
            />

            <Controller
              name="href"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Link URL"
                  fullWidth
                  error={Boolean(errors.href)}
                  helperText={errors.href?.message}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
