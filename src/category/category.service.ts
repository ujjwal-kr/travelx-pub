import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.model';
import { BookingsService } from 'src/bookings/bookings.service';
import * as mongoose from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(@InjectModel('Categories') private readonly categoryModel: Model<Category>, private bookingsService: BookingsService) {}

    async getAll(){
        return await this.categoryModel.find();
    }

    async findOne(name: string) {
        return await this.categoryModel.findOne({name});
    }

    async getBookings(id) {
        const category: Category = await this.categoryModel.findById(id);
        if (!category) throw new HttpException("Category Dosen't Exist", HttpStatus.NOT_FOUND);
        try{
            return await this.bookingsService.getByCategory(category.name);
        } catch {
            throw new HttpException("Bookings not found", HttpStatus.NOT_FOUND); 
        }
    }

    async post(categoryData: Category) {
        try{
            const RAWname = categoryData.name
            const name =  RAWname.toLowerCase;
            const category = {
                name: name,
                id: new mongoose.Types.ObjectId
            }
            const newCategory = await this.categoryModel.create(category);
            return newCategory;

        } catch(e) {
            throw new HttpException("Validation Error", HttpStatus.BAD_REQUEST)
        }
    }
}
