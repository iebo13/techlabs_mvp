/**
 * StoryFormFields component
 * Form fields for story creation/editing
 */

import React from 'react'
import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { type CreateStoryInput, TrackKey } from '../types'
import { getTrackLabel } from '../utils'
import { FormTextField } from './FormTextField'

type AchievementItem = {
  id: string
  value: string
}

type StoryFormFieldsProps = {
  readonly control: Control<CreateStoryInput>
  readonly errors: FieldErrors<CreateStoryInput>
  readonly achievementItems: AchievementItem[]
  readonly onAddAchievement: () => void
  readonly onRemoveAchievement: (id: string) => void
  readonly onAchievementChange: (id: string, value: string) => void
}

export const StoryFormFields: React.FC<StoryFormFieldsProps> = ({
  control,
  errors,
  achievementItems,
  onAddAchievement,
  onRemoveAchievement,
  onAchievementChange,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormTextField name="title" control={control} errors={errors} label="Title" />
      <FormTextField name="excerpt" control={control} errors={errors} label="Excerpt" multiline rows={2} />
      <FormTextField
        name="fullDescription"
        control={control}
        errors={errors}
        label="Full Description"
        multiline
        rows={4}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="track"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={Boolean(errors.track)}>
              <InputLabel>Track</InputLabel>
              <Select {...field} label="Track">
                {Object.values(TrackKey).map(track => (
                  <MenuItem key={track} value={track}>
                    {getTrackLabel(track)}
                  </MenuItem>
                ))}
              </Select>
              {errors.track && <FormHelperText>{errors.track.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <FormTextField name="trackLabel" control={control} errors={errors} label="Track Label" />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormTextField name="currentRole" control={control} errors={errors} label="Current Role" />
        <FormTextField name="company" control={control} errors={errors} label="Company" />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormTextField name="location" control={control} errors={errors} label="Location" />
        <FormTextField name="graduationDate" control={control} errors={errors} label="Graduation Date" />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormTextField name="imageUrl" control={control} errors={errors} label="Image URL" />
        <FormTextField name="href" control={control} errors={errors} label="Link URL" />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <InputLabel sx={{ flexGrow: 1 }}>Achievements</InputLabel>
          <IconButton size="small" onClick={onAddAchievement} aria-label="Add achievement">
            <AddIcon />
          </IconButton>
        </Box>
        {achievementItems.map((item, index) => (
          <Box key={item.id} sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              value={item.value}
              onChange={e => onAchievementChange(item.id, e.target.value)}
              label={`Achievement ${index + 1}`}
              fullWidth
              size="small"
              error={Boolean(errors.achievements?.[index])}
              helperText={errors.achievements?.[index]?.message}
            />
            <IconButton
              size="small"
              color="error"
              onClick={() => onRemoveAchievement(item.id)}
              disabled={achievementItems.length === 1}
              aria-label={`Remove achievement ${index + 1}`}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
