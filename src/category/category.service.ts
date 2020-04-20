import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
    constructor(@InjectModel('Categories') private readonly categoryModel: Model<Category>) {}

    async getAll(){
        return this.categoryModel.find();
    }

    async findOne(name: string) {
        return this.categoryModel.findOne({name});
    }

    async post(categoryData: any) {
        try{
            this.categoryModel.create(categoryData)
        } catch(e) {
            throw new HttpException("Validation Error", HttpStatus.BAD_REQUEST)
        }
    }
}
