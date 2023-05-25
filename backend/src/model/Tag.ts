import { ITag } from '@interfaces';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tag = new Schema<ITag>(
    {
        title: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const TagModel = mongoose.model<ITag>('Tag', tag);

export default TagModel;
