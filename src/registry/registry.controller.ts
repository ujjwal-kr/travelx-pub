import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { Registry } from './registry.model';

@Controller('registry')
export class RegistryController {
    constructor(private registryService: RegistryService){}

    @Get()
    async getAll() {
        return await this.registryService.getAll();
    }

    @Get()
    async getOne(@Param() params: any) {
        return await this.registryService.getOne(params.id)
    }

    @Post()
    async postRegistry(@Body() registry: Registry){
        return await this.registryService.post(registry);
    }

    @Delete(':id')
    async delete(@Param() params: any) {
        return await this.registryService.delete(params.id);
    }

    @Patch(':id/booked')
    async toggleBooked(@Param() params) {
        return await this.registryService.toggleBooked(params.id)
    }

    @Patch(':id/verified')
    async verifyBooking(@Param() params) {
        return await this.registryService.verifyBooking(params.id);
    }
}
