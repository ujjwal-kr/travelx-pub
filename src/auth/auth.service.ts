import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto, LoginDto } from './authDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  private sanitize(user: User) {
    user.password = null;
    return user;
  }

  async findByLogin(userDto: LoginDto) {
    const { email, password } = userDto;
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new HttpException('User Does not exist', HttpStatus.UNAUTHORIZED);

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitize(user);
    } else throw new HttpException('Wrong Password', HttpStatus.UNAUTHORIZED);
  }

  async create(userDto: RegisterDto) {
    const { email } = userDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userModel.create(userDto);
    return this.sanitize(newUser);
  }

  async getUser(id, body) {
    try{
      const user = this.userModel.findById(id);
      if (body.userId == id) return user;
      if (body.isAdmin == true) return user;
      throw new HttpException("Not Authorized", HttpStatus.UNAUTHORIZED)
    } catch {
      throw new HttpException("Not Authorized", HttpStatus.UNAUTHORIZED)
    }
  }

  async getAll() {
    return await this.userModel.find();
  }

  async findByPayload(payload: any) {
    const { email } = payload;
    return this.userModel.findOne({ email });
  }
}
