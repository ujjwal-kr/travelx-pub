import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './authDto';
import { JwtService } from './jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() userDto: LoginDto) {
    const user = await this.userService.findByLogin(userDto);
    const payload = {
      email: user.email,
      role: user.role,
      id: user.id
    };

    const token = await this.jwtService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    return this.userService.create(userDto);
  }
}
