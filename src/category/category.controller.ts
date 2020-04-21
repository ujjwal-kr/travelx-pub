import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    return await this.categoryService.findOne(params.name);
  }

  @Post()
  async postCategory(@Body() categoryData: Category) {
    return await this.categoryService.post(categoryData);
  }

  @Get(':id/bookings')
  async getBookings(@Param() params: any) {
    return await this.categoryService.getBookings(params.id);
  }

  @Get(':id')
  async delete(@Param() params: any) {
    return await this.categoryService.delete(params.id);
  }
}
