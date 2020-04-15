import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './bookings.model';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Get()
  index(): any {
    // return this.bookingsService.insertBooking();
    return this.bookingsService.getAll();
  }

  @Post()
  async test(@Body() post: Booking) {
    return await this.bookingsService.secret(post);
  }
}
