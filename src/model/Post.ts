import mongoose from 'mongoose';
import { IPost } from '../interfaces';

const Schema = mongoose.Schema;

const post = new Schema<IPost>(
    {
        title: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        abstract: {
            type: String,
            default: null
        },
        readingTime: {
            type: Number,
            default: 0
        },
        like: {
            type: Number,
            default: 0
        },
        dislike: {
            type: Number,
            default: 0
        },
        publishAt: {
            type: Date
        },
        photo: {
            type: String
        },
        status: {
            type: String,
            enum: ['PUBLISH', 'DRAFT', 'ARCHIVE'],
            default: 'DRAFT'
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category'
            }
        ],
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag'
            }
        ]
    },
    { timestamps: true }
);

const PostModel = mongoose.model<IPost>('Post', post);

export default PostModel;
