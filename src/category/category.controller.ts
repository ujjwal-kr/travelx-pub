import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  findOne(@Param() params: any) {
    return this.categoryService.findOne(params.name)
  }

  @Post()
  postCategory(@Body() categoryData: any) {
    return this.categoryService.post(categoryData);
  }
}
