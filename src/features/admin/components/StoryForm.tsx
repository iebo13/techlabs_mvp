/**
 * StoryForm component
 * Form for creating and editing stories
 */

import React, { useState, useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { type AdminStory, type CreateStoryInput, CreateStorySchema } from '../types'
import { getDefaultStoryValues, generateId } from '../utils'
import { StoryFormFields } from './StoryFormFields'

type AchievementItem = {
  id: string
  value: string
}

type StoryFormProps = {
  readonly open: boolean
  readonly story: AdminStory | null
  readonly onSubmit: (data: CreateStoryInput) => void
  readonly onClose: () => void
}

const createAchievementItems = (values: string[]): AchievementItem[] =>
  values.map(value => ({ id: generateId(), value }))

export const StoryForm: React.FC<StoryFormProps> = ({ open, story, onSubmit, onClose }) => {
  const isEditMode = Boolean(story)
  const defaultValues = story ?? getDefaultStoryValues()
  const idCounterRef = useRef(0)

  const [achievementItems, setAchievementItems] = useState<AchievementItem[]>(() =>
    createAchievementItems(defaultValues.achievements)
  )

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateStoryInput>({
    resolver: zodResolver(CreateStorySchema),
    defaultValues,
  })

  // Reset form when story changes
  useEffect(() => {
    if (open) {
      const values = story ?? getDefaultStoryValues()

      reset(values)
      setAchievementItems(createAchievementItems(values.achievements))
    }
  }, [open, story, reset])

  // Sync achievements with form
  useEffect(() => {
    setValue(
      'achievements',
      achievementItems.map(item => item.value)
    )
  }, [achievementItems, setValue])

  const handleFormSubmit = (data: CreateStoryInput): void => {
    onSubmit({ ...data, achievements: achievementItems.map(item => item.value) })
    onClose()
  }

  const handleAddAchievement = (): void => {
    idCounterRef.current += 1
    setAchievementItems(prev => [...prev, { id: `new-${idCounterRef.current}`, value: '' }])
  }

  const handleRemoveAchievement = (id: string): void => {
    setAchievementItems(prev => prev.filter(item => item.id !== id))
  }

  const handleAchievementChange = (id: string, value: string): void => {
    setAchievementItems(prev => prev.map(item => (item.id === id ? { ...item, value } : item)))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Story' : 'Create Story'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <StoryFormFields
            control={control}
            errors={errors}
            achievementItems={achievementItems}
            onAddAchievement={handleAddAchievement}
            onRemoveAchievement={handleRemoveAchievement}
            onAchievementChange={handleAchievementChange}
          />
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
