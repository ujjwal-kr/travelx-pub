import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([{name: 'Users', schema: UserSchema}])]
})
export class AuthModule {}
