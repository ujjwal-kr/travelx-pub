import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { RegistryService } from './registry.service';
import { Registry } from './registry.model';

@Controller('registry')
export class RegistryController {
  constructor(private registryService: RegistryService) {}

  @Get()
  async getAll() {
    return await this.registryService.getAll();
  }

  @Get('verified')
  async getVerified() {
    return this.registryService.getVerified();
  }

  @Get('pending')
  async getPending() {
    return this.registryService.getPeding()
  }

  @Get('booked')
  async getBooked() {
    return this.registryService.getBooked();
  }

  @Get('booking/:id')
  async getByBooking(@Param() params) {
    return await this.registryService.getByBooking(params.id);
  }

  @Get(':id')
  async getOne(@Param() params: any, @Body() body) {
    return await this.registryService.getOne(
      params.id,
      body.userId,
      body.isAdmin,
    );
  }

  @Get('user/:id')
  async getByUser(@Param() params: any, @Body() body) {
    return await this.registryService.getByUser(params.id, body);
  }

  @Post()
  async postRegistry(@Body() registry: Registry) {
    return await this.registryService.post(registry);
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    return await this.registryService.delete(params.id);
  }

  @Patch(':id/booked')
  async toggleBooked(@Param() params) {
    return await this.registryService.booked(params.id);
  }

  @Patch(':id/verified')
  async verifyBooking(@Param() params, @Body() body) {
    return await this.registryService.verifyBooking(params.id, body);
  }
}
