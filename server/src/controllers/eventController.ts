import type { Request, Response } from 'express'
import { eventService } from '../services/index.js'
import { logger } from '../config/logger.js'

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, sort, order } = req.query

    const result = await eventService.getAllEvents({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      sort: sort as string,
      order: order as 'asc' | 'desc',
    })

    res.json(result)
  } catch (error) {
    logger.error({ error }, 'Get all events failed')

    res.status(500).json({
      error: {
        code: 'GET_EVENTS_FAILED',
        message: 'Failed to retrieve events',
      },
    })
  }
}

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const event = await eventService.getEventById(id)

    res.json({
      data: event,
    })
  } catch (error) {
    logger.error({ error }, 'Get event failed')

    res.status(404).json({
      error: {
        code: 'EVENT_NOT_FOUND',
        message: 'Event not found',
      },
    })
  }
}

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await eventService.createEvent(req.body)

    res.status(201).json({
      data: event,
    })
  } catch (error) {
    logger.error({ error }, 'Create event failed')

    res.status(400).json({
      error: {
        code: 'CREATE_EVENT_FAILED',
        message: error instanceof Error ? error.message : 'Failed to create event',
      },
    })
  }
}

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const event = await eventService.updateEvent(id, req.body)

    res.json({
      data: event,
    })
  } catch (error) {
    logger.error({ error }, 'Update event failed')

    res.status(400).json({
      error: {
        code: 'UPDATE_EVENT_FAILED',
        message: error instanceof Error ? error.message : 'Failed to update event',
      },
    })
  }
}

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    await eventService.deleteEvent(id)

    res.status(204).send()
  } catch (error) {
    logger.error({ error }, 'Delete event failed')

    res.status(404).json({
      error: {
        code: 'DELETE_EVENT_FAILED',
        message: error instanceof Error ? error.message : 'Failed to delete event',
      },
    })
  }
}
