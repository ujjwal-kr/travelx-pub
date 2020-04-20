import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true, unique: true },
});

export interface Category extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name?: any;
}
