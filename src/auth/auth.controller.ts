import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './authDto';

@Controller('auth')
export class AuthController {
    constructor(private userService: AuthService){}

    @Post('login')
    async login(@Body() userDto: LoginDto) {
        return await this.userService.findByLogin(userDto);
    }

    @Post('register')
    async register(@Body() userDto: RegisterDto) {
        return this.userService.create(userDto);
    }
}
