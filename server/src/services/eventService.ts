import { Event, type IEvent } from '../models/index.js'
import type { PaginationParams, PaginatedResponse } from '../types/index.js'
import { logger } from '../config/logger.js'

type CreateEventInput = {
  title: string
  slug: string
  type: IEvent['type']
  date: string
  location: string
  blurb: string
  description?: string
  imageUrl?: string
  registrationUrl?: string
  capacity?: number
  isPublished?: boolean
}

type UpdateEventInput = Partial<CreateEventInput>

export const getAllEvents = async (params: PaginationParams): Promise<PaginatedResponse<IEvent>> => {
  const { page, limit, sort = 'date', order = 'desc' } = params

  const skip = (page - 1) * limit
  const sortOrder = order === 'asc' ? 1 : -1

  const [events, total] = await Promise.all([
    Event.find().sort({ [sort]: sortOrder }).skip(skip).limit(limit),
    Event.countDocuments(),
  ])

  return {
    data: events,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

export const getEventById = async (id: string): Promise<IEvent> => {
  const event = await Event.findById(id)

  if (!event) {
    throw new Error('Event not found')
  }

  return event
}

export const createEvent = async (input: CreateEventInput): Promise<IEvent> => {
  const event = await Event.create(input)

  logger.info({ eventId: event._id, title: event.title }, 'Event created')

  return event
}

export const updateEvent = async (id: string, input: UpdateEventInput): Promise<IEvent> => {
  const event = await Event.findByIdAndUpdate(id, input, { new: true, runValidators: true })

  if (!event) {
    throw new Error('Event not found')
  }

  logger.info({ eventId: event._id, title: event.title }, 'Event updated')

  return event
}

export const deleteEvent = async (id: string): Promise<void> => {
  const event = await Event.findByIdAndDelete(id)

  if (!event) {
    throw new Error('Event not found')
  }

  logger.info({ eventId: id }, 'Event deleted')
}
