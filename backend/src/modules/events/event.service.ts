import { EventModel, IEvent } from './event.model';

export const getAllEvents = async (): Promise<IEvent[]> => {
  return EventModel.find().sort({ date: 1 });
};

export const createEvent = async (data: Partial<IEvent>): Promise<IEvent> => {
  return EventModel.create(data);
};

export const updateEvent = async (id: string, data: Partial<IEvent>): Promise<IEvent | null> => {
  return EventModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteEvent = async (id: string): Promise<IEvent | null> => {
  return EventModel.findByIdAndDelete(id);
};
