import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  findOne(@Param() params: any) {
    return this.categoryService.findOne(params.name);
  }

  @Post()
  postCategory(@Body() categoryData: Category) {
    return this.categoryService.post(categoryData);
  }

  @Get(':id/bookings')
  getBookings(@Param() params: any) {
    return this.categoryService.getBookings(params.id);
  }
}
