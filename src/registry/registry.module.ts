import { Module } from '@nestjs/common';
import { RegistryController } from './registry.controller';
import { RegistryService } from './registry.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrySchema } from './registry.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Registry', schema: RegistrySchema}])],
  controllers: [RegistryController],
  providers: [RegistryService],
})
export class RegistryModule {}
