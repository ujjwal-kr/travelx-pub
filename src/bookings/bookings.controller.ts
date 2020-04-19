import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './bookings.model';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Get()
  async index() {
    return this.bookingsService.getAll();
  }

  @Get(':id/user')
  async getUser(@Param() id) {
    return await this.bookingsService.getUser(id.id);
  }

  @Post()
  async postBooking(@Body() booking: Booking) {
    return await this.bookingsService.insertBooking(booking);
  }

  @Get(':id')
  async findOne(@Param() id: any) {
    return await this.bookingsService.getOne(id.id);
  }

  @Delete(':id')
  async deleteOne(@Param() id: any) {
    return this.bookingsService.delete(id.id);
  }
}
