import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
