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

  async getOne(id, userId, isAdmin) {
    try {
      const registry = await this.registryModel.findById(id);
      if (isAdmin == true) return registry;
      if (registry.userId == userId) return registry;
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Booking Does Not Exist On Registry',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getByUser(userId, body) {
    try{
      const registries = await this.registryModel.find({ userId });
      if (body.isAdmin == true) return registries;
      if (body.userId == userId) return registries;
      throw new HttpException("Not Authorized", HttpStatus.UNAUTHORIZED);
    } catch {
      throw new HttpException(
        'No registry data By user',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async post(registryData: Registry) {
    try {
      const data: any = {
        _id: new mongoose.Types.ObjectId(),
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


  async booked(id) {
    try {
      const registry: Registry = await this.registryModel.findById(id);
      registry.booked = true;
      await registry.save();
    } catch {
      throw new HttpException(
        'Booking Does Not Exist On Registry',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async verifyBooking(id, body) {
    try {
      const registry: Registry = await this.registryModel.findById(id);
      if (registry.userId != body.claimedUser)
        throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
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
