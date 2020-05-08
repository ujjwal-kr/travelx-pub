import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { RegistryService } from './registry.service';
import { Registry } from './registry.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('registry')
export class RegistryController {
  constructor(private registryService: RegistryService) {}

  @Get()
  async getAll() {
    return await this.registryService.getAll();
  }

  @Get(':id')
  async getOne(@Param() params: any, @Body() body) {
    return await this.registryService.getOne(
      params.id,
      body.userId,
      body.isAdmin,
    );
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
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
