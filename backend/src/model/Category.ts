import mongoose from 'mongoose';
import { ICategory } from '../interfaces';

const Schema = mongoose.Schema;

const category = new Schema<ICategory>(
    {
        title: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const CategoryModel = mongoose.model<ICategory>('Category', category);

export default CategoryModel;
