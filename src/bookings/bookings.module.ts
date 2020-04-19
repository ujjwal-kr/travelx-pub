import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsSchema } from './bookings.model';
import { AdminMiddleware } from './admin.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingsSchema }]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude(
        { path: 'bookings', method: RequestMethod.GET },
        { path: 'bookings/:id', method: RequestMethod.GET },
      )
      .forRoutes(BookingsController);
  }
}
