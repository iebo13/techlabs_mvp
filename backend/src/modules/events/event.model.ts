import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  blurb: string;
  date: string;
  location: string;
  type: 'upcoming' | 'past';
  imageUrl: string;
  href: string;
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    blurb: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['upcoming', 'past'], required: true },
    imageUrl: { type: String, required: true },
    href: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const EventModel = mongoose.model<IEvent>('Event', EventSchema);
