import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsModule } from './bookings/bookings.module';
import { RegistryModule } from './registry/registry.module';

@Module({
  imports: [
    BookingsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/travelx', {
      useNewUrlParser: true,
    }),
    RegistryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
