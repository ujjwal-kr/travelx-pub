import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './bookings.model';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
  ) {}

  async insertBooking() {
    const newBooking = { name: 'Meow', description: 'LOL' };
    try{
      const bookingData = await this.bookingModel.create(newBooking);
      return bookingData;
    } catch(e) {
      return e.message
    }
    
  }

  async getAll() {
    try{
      return await this.bookingModel.find();
    }
    catch (e){
      return e.message
    }
  }

  async secret(post) {
    const secret = {
      code: post.passcode,
      secret: 'SECRET STUFF',
    };
    return secret;
  }
}
