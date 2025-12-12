import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { eventApi } from '../api/events'
import type { CreateEventInput, UpdateEventInput } from '../types'

export const useEvents = () => {
  const queryClient = useQueryClient()

  const eventsQuery = useQuery({
    queryKey: ['admin', 'events'],
    queryFn: async () => {
      const { events } = await eventApi.getAll()
      return events
    },
  })

  const createEventMutation = useMutation({
    mutationFn: (data: CreateEventInput) => eventApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'events'] })
    },
  })

  const updateEventMutation = useMutation({
    mutationFn: (data: UpdateEventInput) => eventApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'events'] })
    },
  })

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => eventApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'events'] })
    },
  })

  return {
    events: eventsQuery.data ?? [],
    isLoading: eventsQuery.isLoading,
    isError: eventsQuery.isError,
    error: eventsQuery.error,
    createEvent: createEventMutation.mutateAsync,
    updateEvent: updateEventMutation.mutateAsync,
    deleteEvent: deleteEventMutation.mutateAsync,
  }
}
