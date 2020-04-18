import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private authService: AuthService) {}

  async signPayload(payload: any) {
    return sign(payload, 'secret', { expiresIn: '18h' });
  }

  async validateUser(payload: any) {
    return await this.authService.findByPayload(payload);
  }
}
