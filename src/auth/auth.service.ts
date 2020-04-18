import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto, LoginDto } from './authDto';

@Injectable()
export class AuthService {
    constructor(@InjectModel('Users') private readonly userModel: Model<User>){}

    async findByLogin(userDto: LoginDto) {
        return null;
    }

    async create(userDto: RegisterDto) {
        return null;
    }

}
