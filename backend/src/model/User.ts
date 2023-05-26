import mongoose from 'mongoose';
import { IUser } from '../interfaces';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY as string;
const Schema = mongoose.Schema;

const user = new Schema<IUser>(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        phone: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        token: {
            type: String
        }
    },
    { timestamps: true }
);

user.methods.generateAuthToken = async function() {
    const expiresIn = '2d';
    const user = this;
    const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn });
    user.token = token;
    await user.save();
    return token;
};

const UserModel = mongoose.model<IUser>('User', user);

export default UserModel;
