/**
 * TagsInput component
 * Input for managing blog post tags
 */

import React, { useState } from 'react'
import { Box, Button, Chip, TextField, Typography } from '@mui/material'

type TagsInputProps = {
  readonly tags: string[]
  readonly onTagsChange: (tags: string[]) => void
}

export const TagsInput: React.FC<TagsInputProps> = ({ tags, onTagsChange }) => {
  const [tagInput, setTagInput] = useState('')

  const handleAddTag = (): void => {
    const tag = tagInput.trim().toLowerCase()

    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag])
    }

    setTagInput('')
  }

  const handleRemoveTag = (tagToRemove: string): void => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        Tags
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          id="tags-input"
          size="small"
          label="Add a tag"
          helperText="Press Enter to add the tag."
          FormHelperTextProps={{ id: 'tags-helper-text' }}
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-describedby="tags-helper-text"
          sx={{ flexGrow: 1 }}
        />
        <Button type="button" variant="outlined" onClick={handleAddTag} disabled={!tagInput.trim()}>
          Add
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {tags.map(tag => (
          <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} size="small" />
        ))}
      </Box>
    </Box>
  )
}
