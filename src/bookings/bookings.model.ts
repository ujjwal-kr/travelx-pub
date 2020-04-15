import * as mongoose from 'mongoose';

export const BookingsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
});

export interface Booking extends mongoose.Document {
  id?: string;
  name?: string;
  description?: string;
}
