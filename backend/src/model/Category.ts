import {ICategory} from '@interfaces';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const category = new Schema<ICategory>({
    title: {
        type: String,
        required: true
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, {timestamps: true});

const CategoryModel = mongoose.model<ICategory>('Category', category);

export default CategoryModel;
