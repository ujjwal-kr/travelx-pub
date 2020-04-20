import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, JwtService, JwtStrategy],
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  exports: [AuthService],
})
export class AuthModule {}
