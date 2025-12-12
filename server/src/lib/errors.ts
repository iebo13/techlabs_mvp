import { ZodError } from 'zod'

export type ApiError = {
  code: string
  message: string
  details?: Record<string, unknown>
  traceId?: string
}

export type AppError = {
  status: number
  error: ApiError
}

export const createAppError = (
  status: number,
  code: string,
  message: string,
  details?: Record<string, unknown>
): AppError => ({
  status,
  error: {
    code,
    message,
    ...(details ? { details } : {}),
  },
})

export const mapUnknownError = (err: unknown): AppError => {
  if (err && typeof err === 'object' && 'status' in err && 'error' in err) {
    const maybeStatus = (err as { status?: unknown }).status
    const maybeError = (err as { error?: unknown }).error

    if (typeof maybeStatus === 'number' && maybeError && typeof maybeError === 'object') {
      return err as AppError
    }
  }

  if (err instanceof ZodError) {
    return createAppError(400, 'VALIDATION_ERROR', 'Invalid request', {
      issues: err.issues,
    })
  }

  if (err instanceof Error) {
    return createAppError(500, 'INTERNAL_ERROR', 'Unexpected server error')
  }

  return createAppError(500, 'INTERNAL_ERROR', 'Unexpected server error')
}
