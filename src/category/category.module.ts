import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.model';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
    BookingsModule,
  ],
  exports: [CategoryService]
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude(
        { path: 'categories', method: RequestMethod.GET },
        { path: 'categories/:name', method: RequestMethod.GET },
        { path: 'categories/:name/bookings', method: RequestMethod.GET },
      )
      .forRoutes(CategoryController);
  }
}
