import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtService } from './jwt.service';
import { KEY } from 'src/secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.jwtService.validateUser(payload);
    if (!user)
      return done(
        new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED),
        false,
      );

    return done(null, user, payload.iat);
  }
}
