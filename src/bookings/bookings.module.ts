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
import { AdminTestMiddleware } from './admin-test.middleware';

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
      .apply(AdminTestMiddleware)
      .forRoutes(
        { path: 'bookings', method: RequestMethod.POST },
        { path: 'bookings', method: RequestMethod.PATCH },
      );
  }
}
