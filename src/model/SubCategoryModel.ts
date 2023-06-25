import mongoose from 'mongoose';
import { ISubCategory } from '../interfaces';

const Schema = mongoose.Schema;

const subCategory = new Schema<ISubCategory>(
    {
        title: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const SubCategoryModel = mongoose.model<ISubCategory>('SubCategory', subCategory);

export default SubCategoryModel;
