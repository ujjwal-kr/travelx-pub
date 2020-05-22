import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { JwtService } from './jwt.service';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';
import { UserMiddleware } from 'src/middlewares/user.middleware';

@Module({
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes({ path: 'auth/users', method: RequestMethod.GET });

    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'auth/users/:id', method: RequestMethod.GET });
  }
}
