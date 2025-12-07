/**
 * BlogPostMetadata component
 * Metadata fields for blog post (slug, author, featured image, status)
 */

import React from 'react'
import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { type CreateBlogPostInput, BlogPostStatus } from '../types'

type BlogPostMetadataProps = {
  readonly control: Control<CreateBlogPostInput>
  readonly errors: FieldErrors<CreateBlogPostInput>
}

export const BlogPostMetadata: React.FC<BlogPostMetadataProps> = ({ control, errors }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
      <Controller
        name="slug"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Slug"
            fullWidth
            error={Boolean(errors.slug)}
            helperText={errors.slug?.message ?? 'URL-friendly version of the title'}
          />
        )}
      />

      <Controller
        name="author"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Author"
            fullWidth
            error={Boolean(errors.author)}
            helperText={errors.author?.message}
          />
        )}
      />

      <Controller
        name="featuredImage"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Featured Image URL" fullWidth helperText="Optional cover image URL" />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.status)}>
            <InputLabel>Status</InputLabel>
            <Select {...field} label="Status">
              <MenuItem value={BlogPostStatus.DRAFT}>Draft</MenuItem>
              <MenuItem value={BlogPostStatus.PUBLISHED}>Published</MenuItem>
            </Select>
            {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </Box>
  )
}
