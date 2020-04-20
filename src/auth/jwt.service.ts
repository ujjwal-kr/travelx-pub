import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { sign } from 'jsonwebtoken';
import { KEY } from 'src/secret';

@Injectable()
export class JwtService {
  constructor(private authService: AuthService) {}

  async signPayload(payload: any) {
    return sign(payload, KEY, { expiresIn: '18h' }); // returns the token
  }

  async validateUser(payload: any) {
    return await this.authService.findByPayload(payload);
  }
}
