import * as mongoose from 'mongoose';

export const RegistrySchema = new mongoose.Schema({
    userId: {type: String, required: true},
    category: {type: String, required: true},
    bookingId: {type: String, required: true},
    booked: {type: Boolean, default: false},
    verified: {type: Boolean, default: false}
})

export interface Registry extends mongoose.Document {
    id: string;
    userId?: string;
    category?: string;
    bookingId?: string;
    booked?: boolean;
    verified?: boolean;
}