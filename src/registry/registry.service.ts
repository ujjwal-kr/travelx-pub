import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registry } from './registry.model';
import * as mongoose from 'mongoose';

@Injectable()
export class RegistryService {
  constructor(
    @InjectModel('Registry') private readonly registryModel: Model<Registry>,
  ) {}

  async getAll() {
    return this.registryModel.find();
  }

  async getOne(id) {
    try {
      return this.registryModel.findById(id);
    } catch {
      throw new HttpException(
        'Booking Does Not Exist On Registry',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async post(registryData: Registry) {
    try {
      const data: any = {
        id: new mongoose.Types.ObjectId(),
        userId: registryData.userId,
        category: registryData.category,
        bookingId: registryData.bookingId,
      };
      const newRegistryData = await this.registryModel.create(data);
      return newRegistryData;
    } catch {
      throw new HttpException('Validation Error', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id) {
    try {
      return this.registryModel.findByIdAndDelete(id);
    } catch {
      throw new HttpException(
        'Booking Does Not Exist On Registry',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async toggleBooked(id, body) {
    try {
      const registry: Registry = await this.registryModel.findById(id);
      if (registry.userId != body.claimedUser)
        throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
      registry.booked = !registry.booked;
      await registry.save();
    } catch {
      throw new HttpException(
        'Booking Does Not Exist On Registry',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async verifyBooking(id) {
    try {
      const registry: Registry = await this.registryModel.findById(id);
      registry.verified = true;
      await registry.save();
    } catch {
      throw new HttpException(
        'Booking Does Not Exist On Registry',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
