import { httpClient } from '@/config/http'
import type { AdminEvent, CreateEventInput, UpdateEventInput } from '../types'

export const eventApi = {
  getAll: async (): Promise<{ events: AdminEvent[] }> => {
    return httpClient.get<{ events: AdminEvent[] }>('/events')
  },

  create: async (data: CreateEventInput): Promise<{ event: AdminEvent }> => {
    return httpClient.post<{ event: AdminEvent }, CreateEventInput>('/events', data)
  },

  update: async (data: UpdateEventInput): Promise<{ event: AdminEvent }> => {
    const { id, ...rest } = data
    if (!id) throw new Error('Event ID is required for update')
    return httpClient.patch<{ event: AdminEvent }, Partial<CreateEventInput>>(`/events/${id}`, rest)
  },

  delete: async (id: string): Promise<void> => {
    return httpClient.delete(`/events/${id}`)
  },
}
