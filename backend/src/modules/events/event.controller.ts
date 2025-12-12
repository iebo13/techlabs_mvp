import { Request, Response, NextFunction } from 'express';
import * as eventService from './event.service';
import { AppError } from '../../shared/utils/AppError';

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json({
      status: 'success',
      results: events.length,
      data: { events },
    });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).json({
      status: 'success',
      data: { event: newEvent },
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    if (!event) {
      return next(new AppError('No event found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { event },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await eventService.deleteEvent(req.params.id);
    if (!event) {
      return next(new AppError('No event found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
