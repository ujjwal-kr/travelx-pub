import { Injectable } from '@nestjs/common';
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
}
