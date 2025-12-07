/**
 * PartnerForm component
 * Form for creating and editing partners
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
import { type AdminPartner, type CreatePartnerInput, CreatePartnerSchema } from '../types'
import { getDefaultPartnerValues } from '../utils'

const PARTNER_TIERS = ['platinum', 'gold', 'silver', 'bronze'] as const
const PARTNER_CATEGORIES = [
  'Technology',
  'Finance',
  'Telecommunications',
  'E-commerce',
  'Consulting',
  'Manufacturing',
] as const

type PartnerFormProps = {
  readonly open: boolean
  readonly partner: AdminPartner | null
  readonly onSubmit: (data: CreatePartnerInput) => void
  readonly onClose: () => void
}

export const PartnerForm: React.FC<PartnerFormProps> = ({ open, partner, onSubmit, onClose }) => {
  const isEditMode = Boolean(partner)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePartnerInput>({
    resolver: zodResolver(CreatePartnerSchema),
    defaultValues: partner ?? getDefaultPartnerValues(),
  })

  // Reset form when partner changes
  React.useEffect(() => {
    if (open) {
      reset(partner ?? getDefaultPartnerValues())
    }
  }, [open, partner, reset])

  const handleFormSubmit = (data: CreatePartnerInput): void => {
    onSubmit(data)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Partner' : 'Create Partner'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Partner Name"
                  fullWidth
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="tier"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.tier)}>
                  <InputLabel>Tier</InputLabel>
                  <Select {...field} label="Tier">
                    {PARTNER_TIERS.map(tier => (
                      <MenuItem key={tier} value={tier}>
                        {tier.charAt(0).toUpperCase() + tier.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.tier && <FormHelperText>{errors.tier.message}</FormHelperText>}
                </FormControl>
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.category)}>
                  <InputLabel>Category</InputLabel>
                  <Select {...field} label="Category">
                    {PARTNER_CATEGORIES.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
                </FormControl>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Website URL"
                  fullWidth
                  type="url"
                  error={Boolean(errors.website)}
                  helperText={errors.website?.message}
                />
              )}
            />

            <Controller
              name="logoUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Logo URL"
                  fullWidth
                  error={Boolean(errors.logoUrl)}
                  helperText={errors.logoUrl?.message}
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
