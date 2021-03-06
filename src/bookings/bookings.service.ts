import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './bookings.model';
import * as mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
    private authService: AuthService
  ) {}

  private sanitize(booking: Booking): Booking {
    booking.userId = null;
    return booking;
  }

  private sanitizeArray(bookings: Booking[]) {
    bookings.map(booking => {
      booking.userId = null;
    });
    return bookings;
  }

  async insertBooking(newBooking: Booking) {
    try {
      try{
        const catNameRAW = newBooking.category;
        const catName = await catNameRAW.toLowerCase();
        const data = {
          _id: new mongoose.Types.ObjectId(),
          name: newBooking.name,
          description: newBooking.description,
          userId: newBooking.userId,
          category: catName
        };
        const bookingData = await this.bookingModel.create(data);
        return this.sanitize(bookingData);
      } catch (e) {
        throw new HttpException('Validation Error', HttpStatus.NOT_ACCEPTABLE);
      }
    } catch (e) {
      throw new HttpException('Validation Error', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async getOne(id) {
    try {
      const booking = await this.bookingModel.findById(id);
      if (booking == null || !booking)
        throw new HttpException('Booking Not Found', HttpStatus.NOT_FOUND);
      return this.sanitize(booking);
    } catch {
      throw new HttpException('Booking Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async getAll() {
    try {
      const bookings = await this.bookingModel.find();
      return this.sanitizeArray(bookings);
    } catch (e) {
      throw new HttpException('Booking Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async getUser(id) {
    const booking: Booking = await this.bookingModel.findById(id);
    const userId = booking.userId;
    return await this.authService.getUser(userId, userId);
  }

  async getByCategory(name: any) {
    return this.bookingModel.find({ category: name });
  }

  async delete(id) {
    try {
      return await this.bookingModel.findByIdAndDelete(id);
    } catch {
      throw new HttpException('Booking Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
