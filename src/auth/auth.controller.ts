import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './authDto';
import { JwtService } from './jwt.service';
import { AuthGuard } from '@nestjs/passport';

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
    };

    const token = await this.jwtService.signPayload(payload);
    return { user, token };
  }

  @Get('secret')
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    return { auth: 'works' };
  }

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    return this.userService.create(userDto);
  }
}
