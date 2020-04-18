import * as mongoose from 'mongoose';

export const BookingsSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  description: String,
});

export interface Booking extends mongoose.Document {
  _id: string;
  name?: string;
  description?: string;
}