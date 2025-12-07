/**
 * BlogPostForm component
 * Full-page blog post editor dialog
 */

import React, { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { type BlogPost, type CreateBlogPostInput, CreateBlogPostSchema } from '../types'
import { getDefaultBlogPostValues, generateSlug } from '../utils'
import { BlogEditor } from './BlogEditor'
import { BlogPostMetadata } from './BlogPostMetadata'
import { TagsInput } from './TagsInput'

type BlogPostFormProps = {
  readonly open: boolean
  readonly post: BlogPost | null
  readonly onSubmit: (data: CreateBlogPostInput) => void
  readonly onClose: () => void
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({ open, post, onSubmit, onClose }) => {
  const isEditMode = Boolean(post)
  const defaultValues = post ?? getDefaultBlogPostValues()

  const [content, setContent] = useState(defaultValues.content)
  const [tags, setTags] = useState<string[]>(defaultValues.tags)

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateBlogPostInput>({
    resolver: zodResolver(CreateBlogPostSchema),
    defaultValues,
  })

  const title = watch('title')

  // Reset form when post changes
  useEffect(() => {
    if (open) {
      const values = post ?? getDefaultBlogPostValues()

      reset(values)
      setContent(values.content)
      setTags(values.tags)
    }
  }, [open, post, reset])

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditMode && title) {
      setValue('slug', generateSlug(title))
    }
  }, [title, isEditMode, setValue])

  // Sync content and tags with form
  useEffect(() => {
    setValue('content', content)
  }, [content, setValue])

  useEffect(() => {
    setValue('tags', tags)
  }, [tags, setValue])

  const handleFormSubmit = (data: CreateBlogPostInput): void => {
    onSubmit({ ...data, content, tags })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {isEditMode ? 'Edit Post' : 'Create New Post'}
          </Typography>
          <Button color="inherit" onClick={handleSubmit(handleFormSubmit)} disabled={isSubmitting}>
            {isEditMode ? 'Update' : 'Publish'}
          </Button>
        </Toolbar>
      </AppBar>

      <DialogContent sx={{ p: 0 }}>
        <Box component="form" sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
          {/* Title */}
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Post title..."
                fullWidth
                variant="standard"
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                slotProps={{
                  input: {
                    sx: { fontSize: '2.5rem', fontWeight: 700, '&::before, &::after': { display: 'none' } },
                  },
                }}
                sx={{ mb: 3 }}
              />
            )}
          />

          {/* Excerpt */}
          <Controller
            name="excerpt"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Write a short excerpt..."
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                error={Boolean(errors.excerpt)}
                helperText={errors.excerpt?.message}
                sx={{ mb: 3 }}
              />
            )}
          />

          {/* Rich Text Editor */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Content
            </Typography>
            <BlogEditor content={content} onChange={setContent} placeholder="Tell your story..." />
            {errors.content && (
              <FormHelperText error sx={{ mt: 1 }}>
                {errors.content.message}
              </FormHelperText>
            )}
          </Box>

          {/* Metadata */}
          <Box sx={{ mb: 3 }}>
            <BlogPostMetadata control={control} errors={errors} />
          </Box>

          {/* Tags */}
          <TagsInput tags={tags} onTagsChange={setTags} />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained" disabled={isSubmitting}>
          {isEditMode ? 'Update Post' : 'Create Post'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
