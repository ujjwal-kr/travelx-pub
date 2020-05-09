import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { RegistryController } from './registry.controller';
import { RegistryService } from './registry.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrySchema } from './registry.model';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { RoleGuardMiddleware } from './role-guard.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Registry', schema: RegistrySchema }]),
  ],
  controllers: [RegistryController],
  providers: [RegistryService],
})
export class RegistryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude(
        { path: 'registry', method: RequestMethod.POST },
        { path: 'registry/:id/verified', method: RequestMethod.PATCH },
        { path: 'registry/:id', method: RequestMethod.GET },
      )
      .forRoutes(RegistryController);

    consumer.apply(RoleGuardMiddleware).forRoutes({
      path: 'registry/:id/verified',
      method: RequestMethod.PATCH,
    });

    consumer
      .apply(UserMiddleware)
      .forRoutes(
        { path: 'registry', method: RequestMethod.POST },
        { path: 'registry/:id', method: RequestMethod.GET },
        { path: 'registry/user/:id', method: RequestMethod.GET }
      );
  }
}
