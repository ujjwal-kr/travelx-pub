import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './bookings.model';
import * as mongoose from 'mongoose';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
  ) {}

  async insertBooking(newBooking) {
    try {
      const data = {
        _id: new mongoose.Types.ObjectId(),
        name: newBooking.name,
        description: newBooking.description,
      };
      const bookingData = await this.bookingModel.create(data);
      return bookingData;
    } catch (e) {
      return e.message;
    }
  }

  async getOne(id) {
    try {
      return await this.bookingModel.findById(id);
    } catch {
      return new NotFoundException();
    }
  }

  async getAll() {
    try {
      return await this.bookingModel.find();
    } catch (e) {
      return e.message;
    }
  }
}
