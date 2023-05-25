import {IComment} from '@interfaces';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tag = new Schema<IComment>({
    msg: {
        type: String,
        required: true
    },
    like: {
        type: Number
    },
    dislike: {
        type: Number
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const CommentModel = mongoose.model<IComment>('Comment', tag);

export default CommentModel;
