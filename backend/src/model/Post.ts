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
            type: Number
        },
        like: {
            type: Number
        },
        dislike: {
            type: Number
        },
        publishAt: {
            type: Date
        },
        photo: {
            type: String
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
