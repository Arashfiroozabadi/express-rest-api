import mongoose from 'mongoose';
import { IUser } from '../interfaces';

const Schema = mongoose.Schema;

const user = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        phone: {
            type: String
        }
    },
    { timestamps: true }
);

const UserModel = mongoose.model<IUser>('User', user);

export default UserModel;
