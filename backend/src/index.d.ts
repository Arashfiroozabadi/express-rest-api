import { IUser } from './interfaces';

declare global {
    namespace Express {
        interface Request {
            t: (...args: any) => string;
            user: IUser;
            fileName: string
        }
    }
}
export {};
