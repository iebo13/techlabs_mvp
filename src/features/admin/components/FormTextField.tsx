/**
 * FormTextField component
 * Reusable controlled text field for forms
 */

import React from 'react'
import type { Control, FieldValues, Path, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { TextField, type TextFieldProps } from '@mui/material'

type FormTextFieldProps<T extends FieldValues> = {
  readonly name: Path<T>
  readonly control: Control<T>
  readonly errors: FieldErrors<T>
  readonly label: string
  readonly multiline?: boolean
  readonly rows?: number
  readonly type?: TextFieldProps['type']
  readonly inputLabelProps?: TextFieldProps['InputLabelProps']
}

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  errors,
  label,
  multiline,
  rows,
  type,
  inputLabelProps,
}: FormTextFieldProps<T>): React.ReactElement => {
  const error = errors[name]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          multiline={multiline}
          rows={rows}
          type={type}
          InputLabelProps={inputLabelProps}
          error={Boolean(error)}
          helperText={error?.message as string}
        />
      )}
    />
  )
}
